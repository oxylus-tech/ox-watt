from __future__ import annotations
from django.core.exceptions import ValidationError, PermissionDenied
from django.db import models
from django.db.models import Max, Value, Q
from django.db.models.functions import Concat, Substr
from django.utils.translation import gettext_lazy as _

from .save_hook import SaveHook, SaveHookQuerySet


__all__ = ("TreeNodeQuerySet", "TreeNode")


class TreeNodeQuerySet(SaveHookQuerySet):
    def root_nodes(self) -> TreeNodeQuerySet:
        """Return root nodes."""
        return self.filter(level=0)

    def find_clone(self, node, **lookups) -> TreeNodeQuerySet:
        """
        Search for a node that would be the same as this one.
        This is used in order to search for colliding paths.

        :param node: node to look.
        :param **lookup: extra filters to add.
        """
        lookups.update(
            {
                "parent_id": node.parent,
                "path": node.get_path(),
            }
        )
        self = self.filter(**lookups)
        if node.pk:
            return self.exclude(pk=node.pk)
        return self

    def descendants(self, node, inclusive: bool = False) -> TreeNodeQuerySet:
        """Return all descendants of a node, order by default by level and path.

        :param node: the node to check on
        :param inclusive: if True, includes the node too
        """
        level = node.level if inclusive else node.level + 1
        return self.filter(tree_id=node.tree_id, level__gte=level, path__startswith=node.path).order_by(
            "level", self.model.path_part_attr
        )

    def children(self, node) -> TreeNodeQuerySet:
        """Return direct children for the provided node."""
        return self.filter(level=node.level + 1).descendants(node)

    def ancestors(self, node, inclusive: bool = False) -> TreeNodeQuerySet:
        """Return all ancestors of a node, order by default by level.

        :param node: the node to check on
        :param inclusive: if True, includes the node too
        """
        sep = self.model.path_sep
        if node.level > 0:
            parts = node.path.split(sep)[1:]
            q = Q()
            for i in range(0, len(parts) - 1):
                q |= Q(tree_id=node.tree_id, level=i, path=sep + sep.join(parts[: i + 1]))

            if inclusive:
                q |= Q(pk=node.pk)
            return self.filter(q).order_by("level")
        # root node
        return self.filter(pk=node.pk) if inclusive else self.none()


class TreeNode(SaveHook):
    """Represent a tree node, using mechanism similar to MPTT.

    Each node has:

    - :py:attr:`tree_id`: an actual tree id. If None provided, it will generate
      a new one (there can be multiple trees).
    - :py:attr:`level`: node depth in the tree
    - :py:attr:`parent`: parent node.
    - :py:attr:`path`: full path to the node using its name and his parents'.

    The path is generated and **must not be directly set**. Use instead the
    adequate methods, as :py:meth:`move_to`.

    To construct it, it looks up for the field declared by :py:attr:`path_part_attr`.
    The default field is ``name``, but is not provided by this model.

    Operations
    ----------

    .. code-block:: python

        # ...
        from ox.utils.models import TreeNode

        class MyNode(TreeNode):
            name = models.CharField(max_length=64)

        # Create a node
        root_node = MyNode.objects.create(name="")
        child_1 = MyModel.objects.create(name="child-1", parent=root_node)
        child_2 = MyModel.objects.create(name="child-2", parent=root_node)

        # Move a node
        child_2.move_to(child_1)
        root_node.insert(child_2)

        # Get relatives as queryset
        child_1.get_siblings()      # sibling nodes
        child_1.get_children()      # direct descendants
        child_1.get_descendants()   # all descendants
        child_1.get_descendants(inclusive=True)   # all descendants including self
        child_2.get_ancestors()     # all ancestors
        child_2.get_ancestors(inclusive=True)     # all ancestors including self


    """

    tree_id = models.PositiveIntegerField(_("Tree id"), blank=True)
    level = models.PositiveIntegerField(_("Tree level"), default=0, blank=True)
    parent = models.ForeignKey("self", models.CASCADE, null=True, blank=True, related_name="children")
    path = models.CharField(_("Path"), max_length=512, db_index=True)

    path_part_attr = "name"
    """ Attribute to get path from (as part of it) """
    path_sep = "/"
    """ Path separator """
    path_unique = True
    """ If True, ensure path is unique for each parent. """

    objects = TreeNodeQuerySet.as_manager()

    class Meta:
        abstract = True

    def on_save(self, fields=None):
        """Ensure tree id, level and path are set.

        It also :py:meth:`validate_node` and update children's values.
        """
        if self.parent:
            self.tree_id = self.parent.tree_id
            self.level = self.parent.level + 1
        elif self.tree_id is None:
            tree_id = type(self).objects.aggregate(Max("tree_id"))["tree_id__max"] or 0
            self.tree_id = tree_id + 1
            self.level = 0
        else:
            # this can happen too: set level to 0
            self.level = 0

        super().on_save(fields)
        self.validate_node()

        path = self.get_path()
        if path != self.path:
            self.sync_node(self.path, path)

    def validate_node(self, queryset=None):
        """Validate the node.

        :yield ValidationError: if a path exists for parent and should be unique.
        """
        cls = type(self)

        # check for circular dependency graph
        if self.parent and self.get_descendants().filter(parent=self.parent).exists():
            raise ValidationError(f"The parent {cls._meta.verbose_name} is nested under this one.")

        if cls.path_unique:
            path = self.get_path()  # ensure to have actual path
            query = cls.objects.find_clone(self)
            if query.exists():
                raise ValidationError(
                    {self.path_part_attr: f"Another {cls._meta.verbose_name} exists for this path `{path}`."}
                )

    def sync_node(self, initial_path, target_path):
        """
        Ensure to synchronize data from database (or other by subclass) after
        node have been validated.

        This method is only run if the original path and new path differs.
        """
        old_len = len(initial_path or "")
        self.get_descendants().update(path=Concat(Value(target_path + "/"), Substr("path", old_len + 2)))
        self.path = target_path

    def get_path(self) -> str:
        """Return path for self and the provided parent."""
        attr = getattr(self, self.path_part_attr)
        prefix = self.parent and self.parent.path or ""
        if prefix.endswith(self.path_sep):
            prefix = prefix[: -len(self.path_sep)]
        return f"{prefix}{self.path_sep}{attr}"

    def move_to(self, parent: TreeNode | None, save: bool = True):
        """
        Insert node into the provided parent.

        :param parent: parent node (or ``None`` for root node)
        :param save: save instance if True
        """
        self.parent = parent
        if parent is None:
            self.tree_id = None
        if save:
            self.save()
        else:
            self.on_save()

    def insert(self, child: TreeNode, save: bool = True):
        """
        Insert child into self.

        :param child: child node to insert
        :param save: save instance if True
        """
        child.move_to(self, save)

    def get_tree(self):
        """Return queryset of nodes of the same tree."""
        return type(self).objects.filter(tree_id=self.tree_id)

    def get_siblings(self, inclusive: bool = False) -> TreeNodeQuerySet:
        """Return queryset to node siblings.

        :param inclusive: whether to include self.
        """
        query = type(self).objects.filter(parent_id=self.parent_id)
        if not inclusive and self.pk:
            query = query.exclude(pk=self.pk)
        return query

    def get_children(self) -> TreeNodeQuerySet:
        """Return direct children for this node."""
        return type(self).objects.children(self)

    def get_descendants(self, inclusive: bool = False) -> TreeNodeQuerySet:
        """Return a queryset to all descendants (shortcut to :py:meth:`TreeNodeQuerySet.descendants`).

        :param inclusive: whether to include self.
        """
        return type(self).objects.descendants(self, inclusive)

    def get_ancestors(self, inclusive: bool = False) -> TreeNodeQuerySet:
        """Return a queryset to all ancestors (shortcut to :py:meth:`TreeNodeQuerySet.ancestors`).

        :param inclusive: whether to include self.
        """
        return type(self).objects.ancestors(self, inclusive)

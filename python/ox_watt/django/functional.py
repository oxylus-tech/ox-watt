from __future__ import annotations
from copy import copy
from graphlib import TopologicalSorter
from typing import Any, Iterable


__all__ = ("Owned", "dependency_order")


class Owned:
    """Class designed to be owned by a parent one, referencing it.

    The ``_owner`` attribute is set **after** instanciation, using
    :py:meth:`contribute`. This method ensure to create a shallow
    copy of self that can be referenced by owner class.
    """

    _owner = None

    def contribute(self, owner):
        """Copy self, assign owner and return."""
        self = copy(self)
        self._owner = owner
        return self


def dependency_order(items: Iterable[Any], attr: str = "dependencies") -> list[Any]:
    """:return: a list of items topologically sorted by dependency."""
    graph = TopologicalSorter()
    todo = [*items]
    done = set()
    for item in todo:
        if deps := getattr(item, attr, None):
            deps = [dep for dep in deps]
        else:
            deps = []
        graph.add(item, *deps)

        done.add(item)
        todo.extend(a for a in deps if a not in done)
    return list(graph.static_order())

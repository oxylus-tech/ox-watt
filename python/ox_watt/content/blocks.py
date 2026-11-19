from dataclasses import dataclass

from bs4 import BeautifulSoup, Tag
from django.utils.translation import gettext_lazy as _


__all__ = ("DynamicBlock", "VariableBlock", "IfVariableBlock")


@dataclass
class DynamicBlock:
    """
    This declare a dynamic block that user can use on the rich text editor
    to add template behaviors.

    The default implementation takes a lookup tag and attribute in which
    the value is stored, and replace the matching elements with :py:attr:`repl`
    substitution string.
    """

    name: str
    """ Programmatic name designating the block.

    This is used by frontend text editor to know which capabilities are available
    for rendering user content.
    """
    inline: bool = False
    """ Rendered block is inline. """
    repl: str = ""
    """ Replacement string formatted with the result of :py:meth:`validate` """

    label: str = ""
    """ Label displayed to user (as on menu activator). """
    icon: str = ""
    """ Dynamic block's icon. """

    group: str = ""
    """ Allows to group blocks by behaviors (used by frontend). """

    @property
    def tag(self):
        return self.inline and "span" or "div"

    def run(self, renderer, soup):
        """Convert dynamic block into Django template code."""
        for node in soup.find_all(self.tag, {"data-block": self.name}):
            print(self.name, self.tag, node)
            values = self.validate(renderer, node)
            if values is not None:
                self.convert_node(node, values)
        return soup

    def convert_node(self, node: Tag, values: dict[str, str]):
        """
        Convert a single node into Django template.

        Default behavior: replace node with :py:attr:`repl` formatted using
        ``values`` attribute.

        :param node: element tag to replace
        :param values: values returned by :py:meth:`validate`
        """
        new_code = self.repl.format(**values)
        node.replace_with(BeautifulSoup(new_code, "html.parser"))

    def validate(self, renderer, el) -> dict[str, str] | None:
        """Validate and return replacement values used to format :py:attr:`repl`.

        Default implementation returns a dict with ``content`` as element's content;

        :returns: the value or None if validation failed.

        .. important:: The value is not sanitized by default!
        """
        content = "".join(str(c) for c in el.contents)
        return {"content": content}


@dataclass
class VariableBlock(DynamicBlock):
    """A block linked to a single variable.

    The default implementation is used for rendering the variable.
    """

    repl: str = "{{{{ {variable} }}}}"
    name: str = "variable"
    group: str = "variable"

    inline: bool = True
    label: str = _("Insert a variable")
    icon: str = "mdi-variable"

    def validate(self, renderer, el):
        """Ensure provided attribute matches a renderer variable."""
        variable = el.get("data-block-variable")
        if variable and variable in renderer.variables:
            # TODO: test if variables in renderer
            return {**super().validate(renderer, el), "variable": variable}


@dataclass
class IfVariableBlock(VariableBlock):
    """A condition based on the existence of the provided variable."""

    repl: str = "{{% if {variable} %}}{content}{{% endif %}}"
    group: str = "variable"
    name: str = "ifvariable"
    inline: bool = False

    label: str = _("Display content if variable is set.")
    icon: str = "mdi-application-variable-outline"

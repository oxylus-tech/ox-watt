from collections import namedtuple
from dataclasses import dataclass, field
from pathlib import Path
from functools import cached_property
from typing import Iterable

from bs4 import BeautifulSoup, Tag
from django.template import Engine, Template

from . import blocks as o_blocks


__all__ = ("Renderer",)


VariableInfo = namedtuple("VariableInfo", ["label", "description", "optional"], defaults=("", False))
""" Informations related to a variable declared in :py:class:`Renderer`.

Used to display information to user.
"""


@dataclass
class Renderer:
    """
    Base class for rendering content.

    This class ensures:
        - contenerization: only provided template classes can be loaded.
        - the correct rendering between frontend editor blocks and template conversion.
    """

    template_libraries = {
        "cache": "django.templatetags.cache",
        "i18n": "django.templatetags.i18n",
        "l10n": "django.templatetags.l10n",
        # 'static': 'django.templatetags.static',
        "tz": "django.templatetags.tz",
    }
    """ Libraries provided by template engine. """

    # template_name: str = "index.html"
    # """ Name of default template file to render """
    # template_dirs: Iterable[str|Path] = field(default_factory=list)

    blocks: list[o_blocks.DynamicBlock] = field(
        default_factory=lambda: [
            o_blocks.VariableBlock(),
            o_blocks.IfVariableBlock(),
        ]
    )
    """ Dynamic blocks used to generate templates. """

    variables: dict[str, VariableInfo] = field(default_factory=dict)
    """ Allowed variables. """

    template_dirs: list[Path | str] = field(default_factory=list)

    @cached_property
    def engine(self):
        """Engine to use in order to render templates."""
        return Engine(dirs=self.get_template_dirs(), app_dirs=False, libraries=self.template_libraries)

    def compile(self, source: str) -> Template:
        """
        From provided source code, return a Template instance.

        It runs blocks in order to transform user's dynamic blocks into jinja
        template code.

        This is what you'll use to transform user's rich text content into
        a template.
        """
        soup = BeautifulSoup(source, "html.parser")

        def process(node):
            if not isinstance(node, (BeautifulSoup, Tag)):
                return

            # Recursive processing, starting
            for child in node.children:
                process(child)

            for block in self.blocks:
                block.run(self, node)

        process(soup)
        return self.engine.from_string(str(soup))

    def get_template_dirs(self) -> Iterable[str]:
        """Return template directory lookup."""
        # Ensure to use strings as path
        return [f"{dir}" for dir in self.template_dirs]

    # FIXME: the whole stack below may disappear


#
#     def render(self, template: Template | None = None, **kwargs) -> str:
#         """
#         Render content from template (default to configured one)
#
#         :param template: if provided use this template and do not :py:meth:`get_template`.
#         :param **kwargs: extra context values.
#         """
#         if template is None:
#             template = self.get_template()
#
#         context = self.get_context_data(**kwargs)
#         return template.render(Context(context))
#
#     def get_template(self) -> Template:
#         """ Return template used by renderer. """
#         template_names = self.get_template_name()
#         return self.engine.get_template(template_names)
# #
#     def get_template_name(self) -> str:
#         """ Return template names to render. """
#         return self.template_name
#
#     def get_context_data(self, **kwargs):
#         """Return context to pass down to template."""
#         return kwargs
#
#
# class TemplatePackRenderer(Renderer):
#     """
#     Renderer for a TemplatePack bundle.
#     Render :py:class:`~.models.Content` for a specific :py:class:`~.models.Bundle`.
#     """
#     pack: models.TemplatePack
#
#     def get_template_dirs(self):
#         """ Add template pack directory for lookups. """
#         return [self.pack.get_template_dir()] + super().get_template_dirs
#
#     def get_template_names(self):
#         """ Nest each :py:attr:`template_name` under pack's directory. """
#         names = super().get_template_names()
#         return list(itertools.chain(
#             (f"{self.pack.slug}/{name}" for name in names),
#             names,
#         ))
#
#     def get_context_data(self, **kwargs):
#         """Return context to pass down to template."""
#         return { **kwargs, "pack": self.pack}


renderer: Renderer = Renderer(blocks=[])
"""
This renderer provide basic rendering without extra blocks.

This is used for rich text editor for comments, etc.
"""

block_renderer: Renderer = Renderer()
""" This renderer provides dynamic blocks rendering. """

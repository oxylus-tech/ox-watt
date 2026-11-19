import { defineComponent as P, ref as D, inject as G, computed as M, resolveComponent as We, createElementBlock as $, createCommentVNode as V, openBlock as d, Fragment as O, createBlock as y, withCtx as u, renderList as L, mergeProps as w, createVNode as g, createTextVNode as B, toDisplayString as A, withModifiers as N, unref as e, mergeModels as me, useModel as fe, renderSlot as f, useAttrs as Q, createElementVNode as q, useSlots as H, reactive as ie, onErrorCaptured as Ge, onMounted as se, createSlots as W, resolveDynamicComponent as Je, normalizeProps as T, guardReactiveProps as E, watch as X, onUnmounted as Qe, Teleport as He, withDirectives as Ye, vShow as Xe, shallowRef as Ze, h as Oe, defineAsyncComponent as et, normalizeClass as tt, withKeys as he } from "vue";
import { useRouter as ge, filterSlots as re, useApp as lt, createRouter as at, getCountryFlag as st, t as k, useAction as ot, usePanel as Se, States as nt, useSection as it, useModelPanel as rt, exposeRefs as ut, useQuery as dt, ifNotEqualFn as pt, defineAsyncComponent as ct, tKey as mt, rules as ft, useModelList as vt, Query as yt, ifNotEqual as gt, useModelEditor as bt, useGuard as kt } from "@oxylus/ox";
import { E as Ce, n as Ae, a3 as $t, l as ue, w as Vt, O as wt, t as ye, S as Ot, q as ht } from "./router.js";
import { V as xt, b as Z, d as _t, e as St, f as te, g as Ct, h as At, i as ae, j as Mt, k as Me, l as U, n as Lt, o as Bt, p as Le, q as Be, r as be, s as Pt, t as Pe, u as Te, v as Tt, w as ce, x as Et, y as Ee, z as ke, A as Ut, B as Ft, C as It, D as Ue, E as oe, F as Fe, G as jt, H as zt, I as Dt, J as qt, K as xe, L as Nt, M as Rt, N as Kt, O as Wt, P as Gt, Q as Jt, R as Ie, S as Qt, T as je, U as Ht, W as Yt } from "./vuetify.js";
import "axios";
import { components as Xt } from "@oxylus/ox/vendor";
const Zt = /* @__PURE__ */ P({
  __name: "OxAppNavItem",
  props: {
    name: {},
    title: {},
    url: {},
    permission: {},
    type: {},
    items: {},
    order: {}
  },
  setup(m) {
    const c = m;
    D(null);
    const n = G("user"), o = ge();
    M(() => !c.auto || o.location.panel == c.name);
    function s(t) {
      return t.permission && !n.can(t.permission) ? !1 : t.items ? t.items.some((p) => s(p)) : !0;
    }
    function r() {
      const t = { panel: c.name, href: c.url, view: null };
      o.go(t);
    }
    return (t, p) => {
      const l = We("ox-app-nav-item", !0);
      return s(c) ? (d(), $(O, { key: 0 }, [
        c.type == "group" ? (d(), y(xt, {
          key: 0,
          value: c.name
        }, {
          activator: u(({ props: a }) => [
            g(Z, w(a, {
              title: c.title,
              "prepend-icon": c.icon
            }), null, 16, ["title", "prepend-icon"])
          ]),
          default: u(() => [
            (d(!0), $(O, null, L(c.items, (a, i) => (d(), y(l, w({
              key: i,
              ref_for: !0
            }, a, {
              type: a.type == "group" ? "subheader" : a.type
            }), null, 16, ["type"]))), 128))
          ]),
          _: 1
        }, 8, ["value"])) : c.type == "subheader" ? (d(), $(O, { key: 1 }, [
          g(_t, null, {
            default: u(() => [
              B(A(c.title), 1)
            ]),
            _: 1
          }),
          c.items ? (d(!0), $(O, { key: 0 }, L(c.items, (a) => (d(), y(l, w({ ref_for: !0 }, a), null, 16))), 256)) : V("", !0)
        ], 64)) : (d(), y(Z, {
          key: 2,
          active: e(o).location.panel == c.name,
          value: c.name,
          "prepend-icon": c.icon,
          title: c.title,
          onClick: N(r, ["stop"])
        }, null, 8, ["active", "value", "prepend-icon", "title"]))
      ], 64)) : V("", !0);
    };
  }
}), el = {
  __name: "OxAppNav",
  props: /* @__PURE__ */ me({
    /** The list of items */
    items: Array
  }, {
    drawer: {},
    drawerModifiers: {}
  }),
  emits: ["update:drawer"],
  setup(m) {
    const c = ge(), n = fe(m, "drawer"), o = D([]), s = m, r = M(() => (t(s.items), s.items));
    function t(l) {
      o.value = p(l);
    }
    function p(l) {
      if (c.location.panel) {
        for (const a of l)
          if (a.items) {
            const i = p(a.items);
            if (i)
              return [i, a.name];
          } else if (a.name == c.location.panel)
            return [a.name];
      }
    }
    return (l, a) => (d(), y(St, {
      modelValue: n.value,
      "onUpdate:modelValue": a[1] || (a[1] = (i) => n.value = i),
      theme: "dark"
    }, {
      append: u(() => [
        g(te, null, {
          default: u(() => [
            f(l.$slots, "append")
          ]),
          _: 3
        })
      ]),
      default: u(() => [
        f(l.$slots, "prepend"),
        g(te, {
          opened: o.value,
          "onUpdate:opened": a[0] || (a[0] = (i) => o.value = i),
          density: "compact"
        }, {
          default: u(() => [
            (d(!0), $(O, null, L(r.value, (i, v) => (d(), y(Zt, w({
              key: v,
              ref_for: !0
            }, i), null, 16))), 128))
          ]),
          _: 1
        }, 8, ["opened"])
      ]),
      _: 3
    }, 8, ["modelValue"]));
  }
}, tl = /* @__PURE__ */ P({
  __name: "OxAppBar",
  setup(m) {
    const c = Q(), n = ge(), o = M(() => {
      var l;
      const p = (l = n.panel.value) == null ? void 0 : l.title;
      return p && e(p) || null;
    }), s = M(() => {
      var l;
      const p = (l = n.panel.value) == null ? void 0 : l.icon;
      return p && e(p) || null;
    }), r = M(() => {
      var p, l;
      return (l = (p = n.panel) == null ? void 0 : p.value) == null ? void 0 : l.views;
    }), t = M(() => {
      var a;
      if (!(r != null && r.value.size))
        return;
      const p = {};
      for (var l of r.value.values())
        p[a = l.category] ?? (p[a] = []), p[l.category].push(l);
      return Ce.filter((i) => p[i]).map((i) => [i, p[i]]);
    });
    return (p, l) => (d(), y(Ct, w({ color: "primary" }, e(c)), {
      default: u(() => [
        f(p.$slots, "prepend"),
        g(At, null, {
          default: u(() => [
            o.value ? (d(), $(O, { key: 0 }, [
              s.value ? (d(), y(ae, {
                key: 0,
                icon: s.value
              }, null, 8, ["icon"])) : V("", !0),
              B(" " + A(o.value), 1)
            ], 64)) : f(p.$slots, "title", { key: 1 })
          ]),
          _: 3
        }),
        l[1] || (l[1] = q("div", { id: "app-bar-after-title" }, null, -1)),
        l[2] || (l[2] = q("div", { id: "app-bar-actions" }, " ", -1)),
        f(p.$slots, "actions"),
        r.value && r.value.size > 1 ? (d(), y(Mt, {
          key: 0,
          class: "ml-3",
          color: "secondary",
          density: "compact",
          variant: "tonal",
          modelValue: e(n).location.view,
          "onUpdate:modelValue": l[0] || (l[0] = (a) => e(n).location.view = a),
          mandatory: ""
        }, {
          default: u(() => [
            (d(!0), $(O, null, L(t.value, ([a, i], v) => (d(), $(O, null, [
              v != 0 ? (d(), y(Me, { key: 0 })) : V("", !0),
              (d(!0), $(O, null, L(i, (b) => (d(), y(U, {
                value: b.name,
                disabled: b.disabled === !0,
                title: b.title,
                "aria-label": b.title
              }, {
                default: u(() => [
                  b.icon ? (d(), y(ae, { key: 0 }, {
                    default: u(() => [
                      B(A(b.icon), 1)
                    ]),
                    _: 2
                  }, 1024)) : (d(), $(O, { key: 1 }, [
                    B(A(b.title), 1)
                  ], 64))
                ]),
                _: 2
              }, 1032, ["value", "disabled", "title", "aria-label"]))), 256))
            ], 64))), 256))
          ]),
          _: 1
        }, 8, ["modelValue"])) : V("", !0),
        f(p.$slots, "append")
      ]),
      _: 3
    }, 16));
  }
}), ll = { class: "mr-2" }, al = {
  class: "nav-home",
  href: "/"
};
var _e;
const sl = /* @__PURE__ */ P({
  __name: "OxApp",
  props: {
    apiUrl: {},
    logo: {},
    dataEl: { default: (_e = document.body.dataset) == null ? void 0 : _e.appData },
    models: {},
    data: {}
  },
  setup(m) {
    const c = H();
    re(c, "panels.");
    const n = m, o = ie({ drawer: !0 }), s = lt(n), r = at();
    Ge((l, a, i) => {
      s.state.error(`${l}`);
    });
    const t = M(() => {
      const l = c.panels;
      return l ? l() : [];
    });
    async function p(l) {
      await fetch(`${n.apiUrl}ox/core/conf/set-language/`, {
        method: "POST",
        headers: Ae.axiosConfig.headers,
        body: JSON.stringify({ language: l })
      }), window.location.reload();
    }
    return se(() => {
      var l;
      (l = r.location).panel ?? (l.panel = s.data.panel);
    }), (l, a) => (d(), y(Lt, null, {
      default: u(() => [
        g(Bt, {
          modelValue: e(s).state.show,
          "onUpdate:modelValue": a[0] || (a[0] = (i) => e(s).state.show = i),
          color: e(s).state.color,
          "multi-line": ""
        }, {
          default: u(() => [
            B(A(e(s).state.toString()), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "color"]),
        g(tl, { color: "primary" }, {
          prepend: u(() => [
            e(c)["nav-start"] || e(c)["nav-end"] ? (d(), y(Be, {
              key: 0,
              icon: "mdi-apps",
              title: e(k)("nav.panels"),
              "aria-label": e(k)("nav.panels"),
              onClick: a[1] || (a[1] = N((i) => o.drawer = !o.drawer, ["stop"]))
            }, null, 8, ["title", "aria-label"])) : V("", !0)
          ]),
          append: u(() => {
            var i, v;
            return [
              (v = (i = e(s).data) == null ? void 0 : i.languages) != null && v.length ? (d(), y(Le, { key: 0 }, {
                activator: u(({ props: b }) => [
                  g(U, w({
                    icon: "mdi-translate",
                    class: "ml-2"
                  }, b, {
                    title: e(k)("actions.select.translation"),
                    "aria-label": e(k)("actions.select.translation")
                  }), null, 16, ["title", "aria-label"])
                ]),
                default: u(() => [
                  g(te, null, {
                    default: u(() => [
                      (d(!0), $(O, null, L(e(s).data.languages, (b) => (d(), y(Z, {
                        title: b[1],
                        "aria-label": b[1],
                        value: b[0],
                        onClick: (h) => p(b[0])
                      }, {
                        prepend: u(() => [
                          q("span", ll, A(e(st)(b[0])), 1)
                        ]),
                        _: 2
                      }, 1032, ["title", "aria-label", "value", "onClick"]))), 256))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : V("", !0)
            ];
          }),
          _: 1
        }),
        e(c)["nav-start"] || e(c)["nav-end"] ? (d(), y(el, {
          key: 0,
          drawer: o.drawer,
          "onUpdate:drawer": a[3] || (a[3] = (i) => o.drawer = i),
          items: e(s).data.nav
        }, W({
          prepend: u(() => [
            q("a", al, [
              m.logo ? (d(), y(be, {
                key: 0,
                src: m.logo,
                class: "logo"
              }, null, 8, ["src"])) : V("", !0)
            ]),
            f(l.$slots, "nav-start", { app: e(s) })
          ]),
          _: 2
        }, [
          e(c)["nav-end"] ? {
            name: "append",
            fn: u(() => [
              g(te, {
                opened: o.opened,
                "onUpdate:opened": a[2] || (a[2] = (i) => o.opened = i)
              }, {
                default: u(() => [
                  f(l.$slots, "nav-end", { app: e(s) })
                ]),
                _: 3
              }, 8, ["opened"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["drawer", "items"])) : V("", !0),
        g(Pt, null, {
          default: u(() => [
            f(l.$slots, "default", {}, () => [
              g(Pe, {
                modelValue: e(r).location.panel,
                "onUpdate:modelValue": a[4] || (a[4] = (i) => e(r).location.panel = i),
                crossfade: ""
              }, {
                default: u(() => [
                  (d(!0), $(O, null, L(t.value, (i, v) => {
                    var b;
                    return d(), y(Te, {
                      key: i.key ?? v,
                      value: ((b = i.props) == null ? void 0 : b.name) || i.key || v
                    }, {
                      default: u(() => [
                        (d(), y(Je(i)))
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["modelValue"])
            ])
          ]),
          _: 3
        })
      ]),
      _: 3
    }));
  }
}), de = /* @__PURE__ */ P({
  __name: "OxAction",
  props: {
    item: {},
    title: {},
    icon: {},
    color: {},
    button: { type: Boolean },
    confirm: {},
    permission: {},
    run: { type: Function },
    href: {}
  },
  emits: ["completed"],
  setup(m, { emit: c }) {
    const n = m, o = Q(), s = c, r = G("user"), { run: t, processing: p, allowed: l } = ot({ user: r, emits: s, props: n });
    return (a, i) => e(l) ? (d(), $(O, { key: 0 }, [
      n.button ? (d(), y(U, w({
        key: 0,
        variant: "text"
      }, e(o), {
        disabled: e(p),
        color: n.color,
        icon: n.icon,
        title: n.title,
        "aria-label": n.title,
        onClick: N(e(t), ["stop"])
      }), null, 16, ["disabled", "color", "icon", "title", "aria-label", "onClick"])) : (d(), y(Z, w({ key: 1 }, e(o), {
        title: n.title,
        "base-color": n.color,
        "prepend-icon": n.icon,
        disabled: e(p),
        onClick: N(e(t), ["stop"])
      }), null, 16, ["title", "base-color", "prepend-icon", "disabled", "onClick"]))
    ], 64)) : V("", !0);
  }
}), ze = {
  __name: "OxListFilters",
  props: {
    /** Search GET parameter. If provided, display search field. */
    search: String
  },
  setup(m, { expose: c }) {
    const n = G("list"), o = m, s = M(() => {
      const p = n.filters;
      return p && Object.entries(p).some(
        ([l, a]) => !l.startsWith("page") && !l.startsWith("ordering") && !!a
      );
    }), r = M(() => s.value ? "mdi-filter-check" : "mdi-filter-outline");
    function t() {
      n.filters = {}, n.load();
    }
    return c({
      // FIXME: remove icon ?
      /** Current computed icon */
      icon: r,
      /** Computed value indicating whether there are filters */
      hasFilters: s,
      /** Reset filters function. */
      reset: t
    }), (p, l) => (d(), $("form", {
      onSubmit: l[1] || (l[1] = N((a) => e(n).load(), ["prevent"])),
      class: "ox-list-filters w-100"
    }, [
      g(Tt, {
        dense: "",
        color: "transparent"
      }, {
        default: u(() => [
          g(Be, {
            icon: r.value,
            readonly: ""
          }, null, 8, ["icon"]),
          o.search && e(n).filters ? (d(), y(ce, {
            key: 0,
            label: e(k)("filters.search"),
            density: "compact",
            class: "ml-2",
            modelValue: e(n).filters[o.search],
            "onUpdate:modelValue": l[0] || (l[0] = (a) => e(n).filters[o.search] = a),
            "hide-details": ""
          }, null, 8, ["label", "modelValue"])) : V("", !0),
          f(p.$slots, "default", {
            list: e(n),
            filters: e(n).filters
          }),
          s.value ? (d(), y(U, {
            key: 1,
            onClick: N(t, ["stop"]),
            icon: "mdi-backspace",
            "aria-label": e(k)("filters.reset"),
            title: e(k)("filters.reset")
          }, null, 8, ["aria-label", "title"])) : V("", !0)
        ]),
        _: 3
      })
    ], 32));
  }
}, $e = /* @__PURE__ */ P({
  __name: "OxActionEdit",
  props: {
    item: {},
    edit: { type: Boolean },
    view: { default: "edit" },
    section: { default: "default" }
  },
  setup(m) {
    const { router: c, panel: n } = Se(), o = G("user"), s = Q(), r = m;
    function t(p, l) {
      c.go({ view: r.view, section: r.section, value: l.id });
    }
    return (p, l) => r.edit && e(o).can([m.item.constructor, "change"], m.item) ? (d(), y(de, w({ key: 0 }, e(s), {
      icon: "mdi-pencil",
      title: e(k)("actions.edit"),
      item: m.item,
      run: t
    }), null, 16, ["title", "item"])) : r.edit && e(o).can([m.item.constructor, "view"], m.item) ? (d(), y(de, w({ key: 1 }, e(s), {
      icon: "mdi-eye-outline",
      title: e(k)("actions.view"),
      item: m.item,
      run: t
    }), null, 16, ["title", "item"])) : V("", !0);
  }
}), De = /* @__PURE__ */ P({
  __name: "OxListTable",
  props: {
    /** ModelList used to display objects */
    list: Object,
    /** List items (cf. {@link useModelList}) */
    items: Array,
    /** Table headers */
    headers: Array,
    /** If True, display edit/view button */
    edit: Boolean,
    /** If provided, use this item field as image */
    image: String
  },
  setup(m) {
    const c = H(), n = $t(c, "item.", { exclude: ["item.actions", "item.image"] }), o = m, s = M(() => {
      const t = [];
      return (o.image || c["item.image"]) && t.push({ key: "image", title: "" }), t.concat(
        o.headers.reduce((p, l) => (p.push(
          typeof l == "string" ? { key: l, title: k([o.list.model, `fields.${l}`]) } : { key: l.key, title: k(l.title) }
        ), p), [])
      );
    });
    function r(t) {
      const p = {
        ...o.list.filters,
        page: t.page,
        page_size: t.itemsPerPage,
        ordering: t.sortBy.map(({ key: l, order: a }) => a == "asc" ? l : `-${l}`)
      };
      o.list.page_size = t.itemsPerPage, o.list.load({ params: p });
    }
    return (t, p) => {
      var l;
      return d(), y(Et, {
        items: o.items,
        "item-index": "id",
        "items-length": o.list.count || o.items.length,
        "items-per-page": o.list.page_size,
        "hide-default-footer": (o.list.count || o.items.length || 0) < o.list.page_size,
        loading: (l = o.list.state) == null ? void 0 : l.isProcessing,
        headers: s.value,
        "no-data-text": e(k)("lists.empty"),
        class: "align-top-table",
        "onUpdate:options": r
      }, W({
        "item.actions": u(({ item: a }) => [
          g($e, {
            button: "",
            item: a,
            edit: o.edit
          }, null, 8, ["item", "edit"]),
          f(t.$slots, "item.actions", {
            item: a,
            dense: !0,
            button: !0
          })
        ]),
        _: 2
      }, [
        e(c)["item.image"] ? {
          name: "item.image",
          fn: u(({ item: a }) => [
            f(t.$slots, "item.image", { item: a }, () => [
              a[o.image] ? (d(), y(be, {
                key: 0,
                src: a[o.image],
                class: "preview",
                cover: "",
                "max-height": "200"
              }, null, 8, ["src"])) : V("", !0)
            ])
          ]),
          key: "0"
        } : void 0,
        L(e(n), (a, i) => ({
          name: i,
          fn: u((v) => [
            f(t.$slots, i, T(E(v)))
          ])
        }))
      ]), 1032, ["items", "items-length", "items-per-page", "hide-default-footer", "loading", "headers", "no-data-text"]);
    };
  }
}), ol = { class: "d-flex flex-no-wrap justify-space-between" }, nl = { key: 0 }, il = { key: 0 }, rl = /* @__PURE__ */ P({
  __name: "OxListCard",
  props: {
    /** ModelList used to display objects */
    list: Object,
    /** List items (cf. {@link useModelList}) */
    items: Array,
    /**
     * Displayed fields, where the first value is set as title.
     * Two formats: a string (as field name), or `{key: "fieldName", title: "Field Title"}`.
     **/
    headers: Array,
    /** If True, display edit/view button */
    edit: Boolean,
    /** Field name used as image */
    image: String
  },
  setup(m) {
    const c = H(), n = re(c, "item.", { exclude: ["item.actions", "item.image"] }), o = m, s = M(() => {
      if (!o.headers)
        return [];
      const t = [];
      for (var p of o.headers)
        p = typeof p == "string" ? { key: p, title: k([o.list.model, "fields." + p]) } : { ...p }, p.slot = `item.${p.key}`, t.push(p);
      return t;
    }), r = M(() => {
      var t;
      return /* @__PURE__ */ new Set([
        s.value[0].key,
        (t = s.value[1]) == null ? void 0 : t.key,
        o.image
      ]);
    });
    return se(() => !o.list.length && o.list.load()), (t, p) => (d(), y(Ee, { class: "card-grid" }, {
      default: u(() => [
        (d(!0), $(O, null, L(o.items, (l) => {
          var a, i;
          return d(), y(ke, {
            key: l.id,
            density: "compact",
            title: s.value[0].key && l[s.value[0].key],
            subtitle: ((a = s.value[1]) == null ? void 0 : a.key) && l[s.value[1].key]
          }, W({
            default: u(() => [
              q("div", ol, [
                e(c)["item.image"] || o.image ? (d(), $("div", nl, [
                  g(Ut, {
                    rounded: "0",
                    size: "125"
                  }, {
                    default: u(() => [
                      f(t.$slots, "item.image", { item: l }, () => [
                        g(be, {
                          src: o.image
                        }, null, 8, ["src"])
                      ], !0)
                    ]),
                    _: 2
                  }, 1024)
                ])) : V("", !0),
                q("div", null, [
                  !e(c)["item.default"] && (s.value.length > 2 || e(n).length) ? (d(), y(Ft, { key: 0 }, {
                    default: u(() => [
                      q("div", null, [
                        (d(!0), $(O, null, L(s.value, (v) => (d(), $(O, null, [
                          r.value.has(v.key) ? V("", !0) : (d(), $("div", il, [
                            g(It, {
                              text: v.title + ":",
                              class: "mr-2"
                            }, null, 8, ["text"]),
                            f(t.$slots, v.slot, { item: l }, () => [
                              e(ue.isEmpty)(l[v.key]) ? V("", !0) : (d(), $(O, { key: 0 }, [
                                B(A(l[v.key]), 1)
                              ], 64))
                            ], !0)
                          ]))
                        ], 64))), 256))
                      ])
                    ]),
                    _: 2
                  }, 1024)) : V("", !0),
                  g(Ue, null, {
                    default: u(() => [
                      g($e, {
                        button: "",
                        item: l,
                        edit: o.edit,
                        size: "small"
                      }, null, 8, ["item", "edit"]),
                      f(t.$slots, "item.actions", {
                        item: l,
                        button: !0,
                        size: "small"
                      }, void 0, !0)
                    ]),
                    _: 2
                  }, 1024)
                ])
              ])
            ]),
            _: 2
          }, [
            e(c)[s.value[0].slot] ? {
              name: "title",
              fn: u(() => [
                f(t.$slots, s.value[0].slot, { item: l }, void 0, !0)
              ]),
              key: "0"
            } : void 0,
            e(c)[(i = s.value[1]) == null ? void 0 : i.slot] ? {
              name: "subtitle",
              fn: u(() => [
                f(t.$slots, s.value[1].slot, { item: l }, void 0, !0)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["title", "subtitle"]);
        }), 128))
      ]),
      _: 3
    }));
  }
}), ul = (m, c) => {
  const n = m.__vccOpts || m;
  for (const [o, s] of c)
    n[o] = s;
  return n;
}, qe = /* @__PURE__ */ ul(rl, [["__scopeId", "data-v-ae8aa738"]]), ve = {
  __name: "OxStateAlert",
  props: {
    /** The state. */
    state: Object,
    /** Delay PROCESSING state display by 5 seconds. */
    delay: { type: Boolean, default: !1 },
    /** Alert title on state `ok`. */
    okTitle: { type: String, default: "" },
    /** Alert title on state `none`. */
    noneTitle: { type: String, default: "" },
    /** Alert title on state `error`. */
    errorTitle: { type: String, default: "" },
    /** Alert title on state `processing`. */
    processingTitle: { type: String, default: "" }
  },
  setup(m) {
    const c = H(), n = m;
    let o = D(!1);
    X(() => n.state.state, (t) => {
      n.delay && t == nt.PROCESSING && (o.value = !1, window.setTimeout(() => {
        o.value = !0;
      }, 5e3));
    });
    const s = M(() => {
      var t;
      return ((t = n.state) == null ? void 0 : t.isProcessing) && (!n.delay || o.value);
    }), r = M(() => {
      var t, p;
      return (p = (t = n.state) == null ? void 0 : t.data) == null ? void 0 : p.messages;
    });
    return (t, p) => (d(), $(O, null, [
      n.state.isNone && e(c).none ? (d(), y(e(oe), {
        key: 0,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        state: m.state,
        title: m.noneTitle
      }, {
        default: u(() => [
          f(t.$slots, "none", { state: m.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : s.value ? (d(), y(e(oe), {
        key: 1,
        type: "info",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: m.state,
        title: m.processingTitle || e(k)("state.processing.title")
      }, {
        default: u(() => [
          f(t.$slots, "processing", { state: m.state }, () => [
            q("p", null, A(e(k)("state.processing.detail")), 1)
          ])
        ]),
        _: 3
      }, 8, ["state", "title"])) : n.state.isError ? (d(), y(e(oe), {
        key: 2,
        type: "error",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: m.state,
        title: m.errorTitle || e(k)("state.error.title")
      }, {
        default: u(() => [
          f(t.$slots, "error", { state: m.state }, () => [
            B(A(m.state.toString() || e(k)("state.error.detail")), 1)
          ]),
          f(t.$slots, "error-detail", { state: m.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : n.state.isOk ? (d(), y(e(oe), {
        key: 3,
        type: "success",
        variant: "tonal",
        class: "mb-3",
        closable: "",
        state: m.state,
        title: m.okTitle || e(k)("state.ok.title")
      }, {
        default: u(() => [
          f(t.$slots, "ok", { state: m.state }, () => [
            q("p", null, A(e(k)("state.ok.detail")), 1)
          ]),
          r.value ? (d(), $(O, { key: 0 }, [
            g(Me),
            (d(!0), $(O, null, L(r.value, (l) => (d(), $("p", null, A(l), 1))), 256))
          ], 64)) : V("", !0),
          f(t.$slots, "ok-detail", { state: m.state })
        ]),
        _: 3
      }, 8, ["state", "title"])) : V("", !0),
      f(t.$slots, "default", {
        state: n.state
      })
    ], 64));
  }
}, Ne = /* @__PURE__ */ P({
  __name: "OxPanel",
  props: {
    name: {},
    title: {},
    state: {},
    icon: {},
    href: {},
    index: {},
    editions: {}
  },
  setup(m) {
    const c = m, { router: n, panel: o, views: s, active: r } = Vt(c);
    M(() => {
      var i;
      const l = {};
      for (var a of s.values())
        l[i = a.category] ?? (l[i] = []), l[a.category].push(a);
      return Ce.filter((v) => l[v]).map((v) => [v, l[v]]);
    });
    const t = H(), p = D(!1);
    return se(() => {
      p.value = !0;
    }), Qe(() => {
      p.value = !1;
    }), (l, a) => (d(), $(O, null, [
      c.state ? (d(), y(ve, {
        key: 0,
        state: c.state,
        delay: ""
      }, null, 8, ["state"])) : V("", !0),
      e(t).prepend && e(r) ? f(l.$slots, "prepend", { key: 1 }) : V("", !0),
      g(Fe, { class: "ma-4" }, {
        default: u(() => [
          p.value ? (d(), y(He, {
            key: 0,
            to: "#app-bar-actions",
            disabled: !p.value || !e(r)
          }, [
            f(l.$slots, "app-actions")
          ], 8, ["disabled"])) : V("", !0),
          f(l.$slots, "top"),
          g(Pe, {
            modelValue: e(n).location.view,
            "onUpdate:modelValue": a[0] || (a[0] = (i) => e(n).location.view = i)
          }, {
            default: u(() => [
              f(l.$slots, "default")
            ]),
            _: 3
          }, 8, ["modelValue"]),
          f(l.$slots, "bottom")
        ]),
        _: 3
      }),
      f(l.$slots, "append")
    ], 64));
  }
}), ne = /* @__PURE__ */ P({
  __name: "OxView",
  props: {
    name: {},
    title: {},
    icon: {},
    category: {},
    sections: {},
    disabled: { type: Boolean }
  },
  setup(m) {
    H();
    const c = m, { router: n, view: o, ...s } = wt(c);
    return D(null), (r, t) => (d(), y(Te, {
      value: e(o).name
    }, {
      default: u(() => {
        var p;
        return [
          ((p = e(o).sections) == null ? void 0 : p.size) > 1 ? (d(), $(O, { key: 0 }, [
            g(jt, {
              modelValue: e(n).location.section,
              "onUpdate:modelValue": t[0] || (t[0] = (l) => e(n).location.section = l)
            }, {
              default: u(() => [
                (d(!0), $(O, null, L(e(o).sections.values(), (l) => (d(), y(zt, {
                  key: l.name,
                  value: l.name,
                  text: l.title
                }, null, 8, ["value", "text"]))), 128))
              ]),
              _: 1
            }, 8, ["modelValue"]),
            g(Dt, {
              modelValue: e(n).location.section,
              "onUpdate:modelValue": t[1] || (t[1] = (l) => e(n).location.section = l)
            }, {
              default: u(() => [
                f(r.$slots, "default", w(s, { view: e(o) }))
              ]),
              _: 3
            }, 8, ["modelValue"])
          ], 64)) : f(r.$slots, "default", w({ key: 1 }, s, { view: e(o) }))
        ];
      }),
      _: 3
    }, 8, ["value"]));
  }
}), Re = /* @__PURE__ */ P({
  __name: "OxSection",
  props: {
    name: {},
    title: {}
  },
  setup(m) {
    const c = m, { view: n, section: o, ...s } = it({ name: c.name, title: c.title });
    return (r, t) => e(n).sections.size > 1 ? (d(), y(qt, {
      key: 0,
      value: e(o).name
    }, {
      default: u(() => [
        f(r.$slots, "default", w(s, {
          view: e(n),
          section: e(o)
        }))
      ]),
      _: 3
    }, 8, ["value"])) : f(r.$slots, "default", w({ key: 1 }, s, {
      view: e(n),
      section: e(o)
    }));
  }
}), dl = /* @__PURE__ */ P({
  __name: "OxModelPanel",
  props: {
    repo: {},
    repos: {},
    headers: {},
    relations: {},
    fetchRelations: { type: Boolean, default: !0 },
    search: { default: "search" },
    warning: {},
    name: {},
    title: {},
    state: {},
    icon: {},
    href: {},
    index: { default: "table" },
    editions: {}
  },
  setup(m, { expose: c }) {
    const n = H(), o = re(n, "item."), s = M(() => !!(n["views.edit"] || n["views.edit.default"])), r = D(null), t = m, p = G("user"), l = rt({
      ...t,
      repos: G("repos", t.repos)
    }), {
      router: a,
      model: i,
      list: v,
      items: b,
      item: h,
      panel: I,
      active: le,
      activeView: R,
      showFilters: j,
      next: ee,
      prev: x
    } = l, S = M(() => [
      ...t.headers,
      { key: "actions", title: k("actions") }
    ]);
    function _(C) {
      C = new t.repo.use(C), a.go({ view: "edit", value: C.id }), v.load();
    }
    const F = ut({ ...l, item: h });
    return se(() => v.load()), c(F), (C, z) => {
      var pe, we;
      return d(), y(Ne, {
        name: t.name,
        index: t.index,
        title: e(I).title,
        icon: ((we = (pe = e(i)) == null ? void 0 : pe.meta) == null ? void 0 : we.icon) || t.icon,
        state: e(v).state
      }, W({
        "app-actions": u(() => {
          var K, J;
          return [
            f(C.$slots, "app-actions", T(E(e(F)))),
            ((K = e(R)) == null ? void 0 : K.category) == "list" ? (d(), y(xe, {
              key: 0,
              class: "ml-3",
              color: "secondary",
              density: "compact",
              variant: "tonal"
            }, {
              default: u(() => [
                f(C.$slots, "nav.list", T(E(e(F)))),
                g(U, {
                  title: e(k)("actions.list.reload"),
                  "aria-label": e(k)("actions.list.reload"),
                  onClick: z[0] || (z[0] = (Y) => e(v).load())
                }, {
                  default: u(() => [
                    g(ae, null, {
                      default: u(() => [...z[4] || (z[4] = [
                        B("mdi-reload", -1)
                      ])]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title", "aria-label"]),
                r.value ? (d(), y(U, {
                  key: 0,
                  title: e(j) ? e(k)("filters.hide") : e(k)("filters.show"),
                  "aria-label": e(j) ? e(k)("filters.hide") : e(k)("filters.show"),
                  onClick: z[1] || (z[1] = (Y) => j.value = !e(j)),
                  active: e(j)
                }, {
                  default: u(() => [
                    g(ae, {
                      icon: r.value.icon
                    }, null, 8, ["icon"])
                  ]),
                  _: 1
                }, 8, ["title", "aria-label", "active"])) : V("", !0)
              ]),
              _: 3
            })) : ((J = e(R)) == null ? void 0 : J.category) == "detail" ? (d(), y(xe, {
              key: 1,
              class: "ml-3",
              color: "secondary",
              density: "compact",
              variant: "tonal"
            }, {
              default: u(() => [
                f(C.$slots, "nav.detail", T(E(e(F)))),
                g(Le, null, {
                  activator: u(({ props: Y }) => [
                    g(U, w({ "prepend-icon": "mdi-dots-vertical" }, Y), {
                      default: u(() => [
                        B(A(e(k)("actions")), 1)
                      ]),
                      _: 1
                    }, 16)
                  ]),
                  default: u(() => [
                    g(te, null, {
                      default: u(() => [
                        f(C.$slots, "item.actions", { item: e(h) })
                      ]),
                      _: 3
                    })
                  ]),
                  _: 3
                }),
                g(U, {
                  disabled: !e(x),
                  title: e(k)("prev"),
                  "aria-label": e(k)("prev"),
                  onClick: z[2] || (z[2] = N((Y) => e(a).go({ value: e(x).id }), ["stop"]))
                }, {
                  default: u(() => [
                    g(ae, { icon: "mdi-chevron-left" })
                  ]),
                  _: 1
                }, 8, ["disabled", "title", "aria-label"]),
                g(U, {
                  disabled: !e(ee),
                  title: e(k)("next"),
                  "aria-label": e(k)("next"),
                  onClick: z[3] || (z[3] = N((Y) => e(a).go({ value: e(ee).id }), ["stop"]))
                }, {
                  default: u(() => [
                    g(ae, { icon: "mdi-chevron-right" })
                  ]),
                  _: 1
                }, 8, ["disabled", "title", "aria-label"])
              ]),
              _: 3
            })) : V("", !0)
          ];
        }),
        top: u(() => {
          var K;
          return [
            t.warning ? (d(), y(oe, {
              key: 0,
              type: "warning",
              variant: "tonal",
              text: t.warning
            }, null, 8, ["text"])) : V("", !0),
            f(C.$slots, "top"),
            Ye(g(ze, {
              ref_key: "filters",
              ref: r,
              search: t.search,
              "teleport-to": "#panel-list-actions"
            }, {
              default: u((J) => [
                f(C.$slots, "list.filters", w(J, {
                  filters: e(v).filters
                }))
              ]),
              _: 3
            }, 8, ["search"]), [
              [Xe, ((K = e(R)) == null ? void 0 : K.category) == "list" && e(j)]
            ])
          ];
        }),
        default: u(() => [
          g(ne, {
            name: "table",
            icon: "mdi-table",
            category: "list",
            title: e(k)("views.table")
          }, {
            default: u(() => [
              g(De, {
                list: e(v),
                items: e(b),
                headers: S.value,
                edit: s.value
              }, W({ _: 2 }, [
                L(e(o), (K, J) => ({
                  name: J,
                  fn: u((Y) => [
                    f(C.$slots, J, T(E(Y)))
                  ])
                }))
              ]), 1032, ["list", "items", "headers", "edit"])
            ]),
            _: 3
          }, 8, ["title"]),
          g(ne, {
            name: "cards",
            icon: "mdi-view-grid",
            category: "list",
            title: e(k)("views.cards")
          }, {
            default: u(() => [
              g(qe, {
                list: e(v),
                items: e(b),
                headers: t.headers,
                edit: s.value
              }, W({ _: 2 }, [
                L(e(o), (K, J) => ({
                  name: J,
                  fn: u((Y) => [
                    f(C.$slots, J, T(E(Y)))
                  ])
                }))
              ]), 1032, ["list", "items", "headers", "edit"])
            ]),
            _: 3
          }, 8, ["title"]),
          s.value ? (d(), y(ne, {
            key: 0,
            name: "edit",
            category: "detail",
            disabled: !e(h),
            icon: e(p).can([e(i), "change"]) ? "mdi-pencil" : "mdi-eye",
            title: e(k)("views.edit")
          }, {
            default: u((K) => [
              g(Re, {
                name: "default",
                title: e(i).meta.verbose_name
              }, {
                default: u(() => [
                  f(C.$slots, "views.edit.default", w(K, {
                    value: e(h),
                    saved: _
                  }))
                ]),
                _: 2
              }, 1032, ["title"]),
              f(C.$slots, "views.edit", w(K, {
                value: e(h),
                saved: _
              }))
            ]),
            _: 3
          }, 8, ["disabled", "icon", "title"])) : V("", !0),
          e(n)["views.create.default"] && e(p).can([e(i), "add"]) ? (d(), y(ne, {
            key: 1,
            name: "create",
            category: "create",
            icon: "mdi-plus-box",
            title: e(k)("views.create")
          }, {
            default: u((K) => [
              f(C.$slots, "views.create.default", w(K, { saved: _ }))
            ]),
            _: 3
          }, 8, ["title"])) : V("", !0),
          f(C.$slots, "default")
        ]),
        _: 2
      }, [
        e(n)["append-title"] ? {
          name: "append-title",
          fn: u(() => [
            f(C.$slots, "append-title", T(E(e(F))))
          ]),
          key: "0"
        } : void 0,
        e(n).prepend ? {
          name: "prepend",
          fn: u(() => [
            f(C.$slots, "prepend", T(E(e(F))))
          ]),
          key: "1"
        } : void 0,
        e(n).append ? {
          name: "append",
          fn: u(() => [
            f(C.$slots, "append", T(E(e(F))))
          ]),
          key: "2"
        } : void 0
      ]), 1032, ["name", "index", "title", "icon", "state"]);
    };
  }
}), pl = /* @__PURE__ */ P({
  __name: "OxActionModelDelete",
  props: {
    item: {}
  },
  setup(m) {
    const { router: c, panel: n } = Se(), o = Q(), s = m;
    async function r(t, p) {
      return await (n == null ? void 0 : n.repos[p.constructor.entity]).api().delete(p.$url(), { delete: s.item.id });
    }
    return (t, p) => {
      var l;
      return (l = e(n)) != null && l.repos ? (d(), y(de, w({ key: 0 }, e(o), {
        item: s.item,
        icon: "mdi-delete",
        color: "error",
        title: e(k)("actions.delete"),
        confirm: e(k)("actions.delete.confirm"),
        permission: [s.item.constructor, "delete"],
        run: r,
        onCompleted: p[0] || (p[0] = (a) => {
          var i;
          return (i = e(n)) == null ? void 0 : i.show({ view: e(n).index });
        })
      }), null, 16, ["item", "title", "confirm", "permission"])) : V("", !0);
    };
  }
}), cl = /* @__PURE__ */ P({
  __name: "OxActionPost",
  props: {
    /**
     * URL path to append to item's url. Should be provided.
     */
    path: String,
    /**
     * HTTP method to use (upper or lower cased)
     */
    method: { type: String, default: "post" },
    /** Model repository to use */
    repo: Object,
    /** POST data to send (optional) */
    data: Object,
    /** Pinia-Orm AXIOS options */
    options: Object
  },
  setup(m) {
    const c = Q(), n = m;
    async function o(s, r) {
      const t = n.repo.api();
      return await t[n.method.toLowerCase()].apply(t, [r.$url(n.path), n.data, n.options]);
    }
    return (s, r) => (d(), y(e(de), w(e(c), { run: o }), null, 16));
  }
}), ml = ["name", "value"], fl = /* @__PURE__ */ P({
  __name: "OxAutocomplete",
  props: /* @__PURE__ */ me({
    repo: {},
    lookup: { default: "search" },
    name: {},
    filters: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(m, { expose: c }) {
    const n = H(), o = re(n, "item.");
    re(n, "selection.");
    const s = fe(m, "modelValue"), r = D(""), t = m, p = Q(), l = G("repos"), { state: a, query: i, fetch: v } = dt(t.repo, l, { save: !1 }), b = ie([]), h = D([]);
    async function I(x) {
      const S = x && le(x);
      if (S != null && S.length) {
        const _ = await v({ id: S });
        b.splice(0, 0, ..._.entities);
      }
      R(x);
    }
    function le(x) {
      if (!Array.isArray(x))
        return b.findIndex((_) => _.id == x) == -1 ? [x] : null;
      const S = new Set(b.map((_) => _.id));
      return x.filter((_) => !S.has(_));
    }
    async function R(x) {
      if (Array.isArray(x))
        h.value = b.filter((S) => x.includes(S.id));
      else if (x) {
        let S = b.find((_) => _.id == x);
        if (S)
          h.value = S && [S] || [];
        else {
          const _ = await i.fetch({ ids: x });
          _.entities.length && (h.value = _.entities[0]);
        }
      } else
        h.value = [];
    }
    let j = null;
    const ee = ue.debounce(async ({ reset: x = !1 } = {}) => {
      if (a.isProcessing)
        return;
      const S = r.value != "<empty string>" && r.value || "";
      if (!x && S == j)
        return;
      j = S;
      const _ = { ...t.filters, page_size: 20 };
      _[t.lookup] = S;
      let F = await v({ params: _ });
      const C = h.value ? ue.unionBy(F.entities, h.value, (z) => z.id) : F.entities;
      b.splice(0, b.length, ...C), x || (r.value = S);
    }, 500);
    return se(async () => {
      await ee(), s.value && await I(s.value);
    }), X(() => t.filters, pt(() => ee({ reset: !0 }))), X(r, (x) => {
      x != "<empty string>" && x != j && ee({ q: x });
    }), X(s, (x, S) => {
      x != S && R(x);
    }), c({
      /** Selected models ids. */
      value: s,
      /** Selected items. */
      selected: h,
      /** Load list of items. */
      load: ee,
      /** All fetched items (displayed in the selection list). */
      items: b
    }), (x, S) => (d(), $(O, null, [
      t.name ? (d(), $("input", {
        key: 0,
        type: "hidden",
        name: t.name,
        value: s.value
      }, null, 8, ml)) : V("", !0),
      g(e(Nt), w(e(p), {
        items: b,
        loading: e(a).isProcessing,
        modelValue: s.value,
        "onUpdate:modelValue": S[0] || (S[0] = (_) => s.value = _),
        search: r.value,
        "onUpdate:search": S[1] || (S[1] = (_) => r.value = _)
      }), W({
        item: u(({ item: _, props: F }) => [
          g(Z, T(E(F)), W({ _: 2 }, [
            L(e(o), (C, z) => ({
              name: C,
              fn: u((pe) => [
                f(x.$slots, z, w({ item: _ }, pe))
              ])
            }))
          ]), 1040)
        ]),
        _: 2
      }, [
        L(e(n), (_, F) => ({
          name: F,
          fn: u((C) => [
            !F.startsWith("item") && !F.startsWith("selection") ? f(x.$slots, F, T(w({ key: 0 }, C))) : V("", !0)
          ])
        })),
        e(n).selection ? {
          name: "selection",
          fn: u((_) => [
            f(x.$slots, "selection", T(E(_)))
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["items", "loading", "modelValue", "search"])
    ], 64));
  }
}), vl = {
  props: {
    /** Component url. */
    src: String,
    /** Component name. If not provided, use file name. */
    is: String
  },
  setup(m) {
    const c = Ze(null), n = M(() => {
      if (m.is)
        return m.is;
      let s = m.src.substring(m.src.lastIndexOf("/") + 1);
      if (s && (s = s.substring(0, s.indexOf("."))), !s)
        throw Error(
          "`is` not provided and could not be deducted from `src`."
        );
      return s;
    });
    function o() {
      c.value = ct(m.src, n.value);
    }
    return X(() => m.src, o), o(), () => c.value ? Oe(c.value, m) : Oe();
  }
}, yl = /* @__PURE__ */ P({
  __name: "OxField",
  props: {
    /** Field or attribute name */
    name: String,
    /** Editor to use **/
    editor: Object,
    /** If true, add a required rule */
    required: Boolean,
    /** Field type */
    type: String,
    /** Field rules as provided to Vuetify field inputs. */
    rules: Array
  },
  emits: [
    /** Value has changed */
    "update:modelValue"
  ],
  setup(m, { emit: c }) {
    const n = et(() => import("./OxAutocomplete.js")), o = c, s = Q(), r = H(), t = m, p = M(() => {
      const l = k([t.editor.model, `fields.${t.name}`]), a = {
        name: t.name,
        label: l,
        "aria-label": l,
        "error-messages": t.editor.error(t.name),
        rules: t.rules || [],
        "onUpdate:modelValue": (...b) => o("update:modelValue", ...b),
        ...s
      }, i = mt([t.editor.model, `fields.${t.name}.help`]), v = k(i);
      return v != i && (a.hint = v, a["aria-description"] = v), t.required && a.rules.push(ft.required), a;
    });
    return (l, a) => t.editor.value ? f(l.$slots, "default", {
      key: 0,
      props: p.value,
      editor: t.editor
    }, () => [
      t.type == "select" ? (d(), y(Rt, w({ key: 0 }, p.value, {
        modelValue: t.editor.value[t.name],
        "onUpdate:modelValue": a[0] || (a[0] = (i) => t.editor.value[t.name] = i)
      }), null, 16, ["modelValue"])) : t.type == "textarea" ? (d(), y(Kt, w({ key: 1 }, p.value, {
        modelValue: t.editor.value[t.name],
        "onUpdate:modelValue": a[1] || (a[1] = (i) => t.editor.value[t.name] = i)
      }), null, 16, ["modelValue"])) : t.type == "checkbox" ? (d(), y(Wt, w({ key: 2 }, p.value, {
        modelValue: t.editor.value[t.name],
        "onUpdate:modelValue": a[2] || (a[2] = (i) => t.editor.value[t.name] = i)
      }), null, 16, ["modelValue"])) : t.type == "autocomplete" ? (d(), y(e(n), w({ key: 3 }, p.value, {
        modelValue: t.editor.value[t.name],
        "onUpdate:modelValue": a[3] || (a[3] = (i) => t.editor.value[t.name] = i)
      }), W({ _: 2 }, [
        L(e(r), (i, v) => ({
          name: v,
          fn: u((b) => [
            f(l.$slots, v, T(E(b)))
          ])
        }))
      ]), 1040, ["modelValue"])) : (d(), y(ce, w({ key: 4 }, p.value, {
        type: t.type,
        modelValue: t.editor.value[t.name],
        "onUpdate:modelValue": a[4] || (a[4] = (i) => t.editor.value[t.name] = i)
      }), W({ _: 2 }, [
        L(e(r), (i, v) => ({
          name: v,
          fn: u((b) => [
            f(l.$slots, v, T(E(b)))
          ])
        }))
      ]), 1040, ["type", "modelValue"]))
    ]) : V("", !0);
  }
}), gl = /* @__PURE__ */ P({
  __name: "OxModelList",
  props: /* @__PURE__ */ me({
    filters: {},
    prevKey: {},
    nextKey: {},
    countKey: {},
    repos: {},
    editable: { type: Boolean },
    query: {},
    relations: {},
    url: {},
    fetchRelations: { type: Boolean },
    save: { type: Boolean },
    repo: {},
    opts: {},
    load: { type: Boolean }
  }, {
    modelValue: [],
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(m, { expose: c }) {
    const n = fe(m, "modelValue", []);
    H();
    const o = m, s = Q(), { list: r, items: t } = vt({
      query: new yt(o.repo, o.repos),
      filters: o.filters
    }), p = ue.debounce((a) => {
      r.query.repo = a[0], r.query.repos = a[1], r.filters = a[2], r.load();
    }, 100);
    function l(a) {
      r.remove(a), n.value = [...r.ids];
    }
    return se(() => {
      var a;
      return (o.load || ((a = n.value) == null ? void 0 : a.length)) && r.load({ id: n.value });
    }), X(n, (a) => a.length && gt(a, r.ids, (i) => i.length && r.load({ id: i }))), X(() => r.ids, (a) => n.value = [...a]), X(
      () => [o.repo, o.repos, o.filters],
      (a, i) => !ue.isEqual(a, i) && p()
    ), c({
      /** The used {@link ModelList} controller. */
      list: r,
      /** The actual list of items. */
      items: t
    }), (a, i) => f(a.$slots, "default", {
      list: e(r),
      items: e(t)
    }, () => [
      g(te, T(E(e(s))), {
        default: u(() => [
          f(a.$slots, "prepend", {
            list: e(r),
            items: e(t)
          }),
          f(a.$slots, "list", {
            list: e(r),
            items: e(t)
          }, () => [
            (d(!0), $(O, null, L(e(t), (v) => (d(), y(Z, {
              key: v.id
            }, {
              append: u(() => [
                f(a.$slots, "item.actions", {
                  list: e(r),
                  item: v
                }),
                o.editable ? (d(), y(U, {
                  key: 0,
                  type: "button",
                  class: "ml-2",
                  size: "small",
                  color: "error",
                  onClick: N((b) => l(v.id), ["stop", "prevent"]),
                  "aria-label": e(k)("actions.remove"),
                  title: e(k)("actions.remove"),
                  icon: "mdi-delete"
                }, null, 8, ["onClick", "aria-label", "title"])) : V("", !0)
              ]),
              default: u(() => [
                f(a.$slots, "item", {
                  list: e(r),
                  item: v
                })
              ]),
              _: 2
            }, 1024))), 128)),
            f(a.$slots, "append", {
              list: e(r),
              items: e(t)
            })
          ])
        ]),
        _: 3
      }, 16)
    ]);
  }
}), bl = /* @__PURE__ */ P({
  __name: "OxFormListItem",
  props: {
    item: {},
    remove: { type: Boolean },
    title: {}
  },
  emits: [
    /**
     * Remove item button has been clicked. The click event data is passed along.
     */
    "remove"
  ],
  setup(m, { emit: c }) {
    const n = m;
    console.log(n.item);
    const o = c, s = Q();
    return (r, t) => (d(), y(Z, T(E(e(s))), {
      append: u(() => [
        q("div", {
          onClick: t[1] || (t[1] = N(() => {
          }, ["stop"]))
        }, [
          f(r.$slots, "actions", {
            item: n.item
          }),
          n.remove ? (d(), y(U, {
            key: 0,
            type: "button",
            class: "ml-1",
            size: "small",
            onClick: t[0] || (t[0] = N((p) => o("remove", r.$events), ["stop", "prevent"])),
            color: "error",
            "aria-label": e(k)("actions.remove"),
            title: e(k)("actions.remove"),
            icon: "mdi-delete"
          }, null, 8, ["aria-label", "title"])) : V("", !0)
        ])
      ]),
      default: u(() => [
        g(Gt, null, {
          default: u(() => [
            f(r.$slots, "default", {
              item: n.item
            }, () => [
              B(A(n.title), 1)
            ])
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 16));
  }
}), kl = /* @__PURE__ */ P({
  __name: "OxFormList",
  props: /* @__PURE__ */ me({
    useModel: { type: Function },
    editable: { type: Boolean }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(m) {
    var v;
    const c = fe(m, "modelValue"), n = G("user");
    D({});
    const o = m, s = M(() => ({
      add: o.editable && n.can([o.useModel, "add"]),
      change: o.editable && n.can([o.useModel, "change"]),
      delete: o.editable && n.can([o.useModel, "delete"])
    })), r = D([]), t = ie({
      open: !1,
      item: null,
      add: !1
    });
    (v = c.value) != null && v.length || r.value.push(-1);
    function p(b = null) {
      t.add = b === null, t.editable = t.add ? s.value.add : s.value.change, t.item = b || new o.useModel({}), t.value = new o.useModel({ ...t.item }), t.open = !0;
    }
    function l() {
      t.open = !1, t.item = null, t.value = null;
    }
    function a() {
      t.add ? c.value.push(o.useModel({ ...t.value })) : Object.assign(t.item, t.value), l();
    }
    function i(b) {
      confirm(k("actions.delete.confirm")) && c.value.splice(b, 1);
    }
    return (b, h) => (d(), $(O, null, [
      g(Jt, {
        modelValue: t.open,
        "onUpdate:modelValue": h[3] || (h[3] = (I) => t.open = I)
      }, {
        default: u(() => [
          g(ke, null, {
            default: u(() => [
              t.value ? (d(), y(Ie, { key: 0 }, {
                default: u(() => [
                  t.add && o.useModel ? (d(), $(O, { key: 0 }, [
                    B(A(e(k)("actions.new_item", { name: o.useModel.meta.verbose_name })), 1)
                  ], 64)) : t.add ? (d(), $(O, { key: 1 }, [
                    B(A(e(k)("actions.add_item")), 1)
                  ], 64)) : (d(), $(O, { key: 2 }, [
                    B(A(e(k)("actions.edit_item", { name: t.value.$title })), 1)
                  ], 64))
                ]),
                _: 1
              })) : V("", !0),
              g(Qt, null, {
                default: u(() => [
                  t.item ? (d(), y(je, {
                    key: 0,
                    disabled: !t.editable,
                    modelValue: t.valid,
                    "onUpdate:modelValue": h[0] || (h[0] = (I) => t.valid = I)
                  }, {
                    default: u(() => [
                      f(b.$slots, "item.form", {
                        item: t.value
                      })
                    ]),
                    _: 3
                  }, 8, ["disabled", "modelValue"])) : V("", !0)
                ]),
                _: 3
              }),
              g(Ue, null, {
                default: u(() => [
                  g(U, {
                    color: "error",
                    "prepend-icon": "mdi-cancel",
                    "aria-label": e(k)("actions.discard"),
                    onClick: h[1] || (h[1] = (I) => l())
                  }, {
                    default: u(() => [
                      B(A(e(k)("actions.discard")), 1)
                    ]),
                    _: 1
                  }, 8, ["aria-label"]),
                  g(U, {
                    disabled: !t.valid,
                    color: "primary",
                    "prepend-icon": "mdi-content-save",
                    "aria-label": e(k)("actions.save"),
                    onClick: h[2] || (h[2] = (I) => a())
                  }, {
                    default: u(() => [
                      B(A(e(k)("actions.save")), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "aria-label"])
                ]),
                _: 1
              })
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["modelValue"]),
      g(te, {
        opened: r.value,
        "onUpdate:opened": h[5] || (h[5] = (I) => r.value = I)
      }, {
        default: u(() => {
          var I;
          return [
            (I = c.value) != null && I.length ? (d(!0), $(O, { key: 0 }, L(c.value, (le, R) => (d(), y(bl, {
              key: R,
              value: R,
              item: le,
              remove: s.value.delete,
              onRemove: (j) => i(R)
            }, {
              default: u((j) => [
                f(b.$slots, "item", w({ ref_for: !0 }, j, { index: R }))
              ]),
              actions: u((j) => [
                f(b.$slots, "item.actions", {
                  item: le,
                  index: R,
                  editable: s.value.change
                }),
                g(U, {
                  size: "small",
                  color: "primary",
                  icon: "mdi-pencil",
                  class: "ml-1",
                  title: e(k)("actions.edit"),
                  "aria-label": e(k)("actions.edit"),
                  onClick: (ee) => p(le)
                }, null, 8, ["title", "aria-label", "onClick"])
              ]),
              _: 2
            }, 1032, ["value", "item", "remove", "onRemove"]))), 128)) : (d(), y(Z, {
              key: 1,
              title: e(k)("lists.empty")
            }, W({ _: 2 }, [
              s.value.add ? {
                name: "append",
                fn: u(() => [
                  g(U, {
                    size: "small",
                    color: "primary",
                    "prepend-icon": "mdi-plus",
                    onClick: h[4] || (h[4] = (le) => p()),
                    "aria-label": e(k)("actions.discard")
                  }, {
                    default: u(() => [
                      B(A(e(k)("actions.add_item")), 1)
                    ]),
                    _: 1
                  }, 8, ["aria-label"])
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["title"]))
          ];
        }),
        _: 3
      }, 8, ["opened"])
    ], 64));
  }
}), $l = {
  __name: "OxListKanban",
  props: {
    itemTitle: String,
    itemValue: String,
    field: String,
    headers: Array,
    colors: { type: Array, default: () => [
      "purple",
      "blue",
      "teal",
      "lime",
      "orange",
      "blue-gray",
      "pink",
      "indigo",
      "cyan",
      "light-green",
      "amber",
      "brown",
      "red",
      "deep-purple",
      "light-blue",
      "green",
      "yellow",
      "deep-orange"
    ] },
    colorVariant: { type: String, default: "lighten-2" }
  },
  emits: ["click"],
  setup(m, { emit: c }) {
    const n = c;
    G("list");
    const o = G("items"), s = m;
    function r(l) {
      return l = l % s.colors.length, s.colorVariant ? s.colors[l] + "-" + s.colorVariant : s.colors[l];
    }
    function t(l, a, i) {
      l[i] ? !l[i].includes(a) && l[i].push(a) : l[i] = [a];
    }
    const p = M(() => {
      const l = {};
      if (o.value)
        for (var a of o.value) {
          const v = a[s.field];
          if (Array.isArray(v))
            if (v.length)
              for (var i of v)
                t(l, a, i);
            else
              t(l, a, null);
          else
            t(l, a, v);
        }
      return l;
    });
    return (l, a) => (d(), y(Fe, null, {
      default: u(() => [
        g(Ht, null, {
          default: u(() => [
            (d(!0), $(O, null, L(s.headers, (i, v) => (d(), y(Yt, {
              key: i.value
            }, {
              default: u(({ selectedClass: b }) => [
                g(ke, {
                  width: "400",
                  class: tt(["ma-3", b]),
                  color: r(v),
                  lines: "two"
                }, {
                  default: u(() => [
                    g(Ie, null, {
                      default: u(() => [
                        B(A(i.title), 1)
                      ]),
                      _: 2
                    }, 1024),
                    g(te, {
                      "bg-color": r(v)
                    }, {
                      default: u(() => [
                        p.value && p.value[i.value] ? (d(!0), $(O, { key: 0 }, L(p.value[i.value], (h) => f(l.$slots, "item", {
                          key: h.id,
                          header: i,
                          item: h
                        }, () => [
                          g(Z, {
                            title: h[s.itemTitle],
                            value: s.itemValue && h[s.itemValue],
                            onClick: (I) => n("click", h)
                          }, {
                            append: u(() => [
                              f(l.$slots, "item.action")
                            ]),
                            _: 3
                          }, 8, ["title", "value", "onClick"])
                        ])), 128)) : V("", !0)
                      ]),
                      _: 2
                    }, 1032, ["bg-color"])
                  ]),
                  _: 2
                }, 1032, ["class", "color"])
              ]),
              _: 2
            }, 1024))), 128))
          ]),
          _: 3
        })
      ]),
      _: 3
    }));
  }
}, Vl = { class: "text-right" }, Ve = {
  __name: "OxValidationBtn",
  props: {
    /** The state object used. */
    state: { type: Object, default: () => State.none() },
    /** Button label for reset/discard */
    resetLabel: String,
    /** Button label for reset/discard */
    resetIcon: { type: String, default: "mdi-cancel" },
    /** Button label for validation/save */
    validateLabel: String,
    /** Button label for validation/save */
    validateIcon: { type: String, default: "mdi-content-save" },
    /** Button label for processing */
    processingLabel: String,
    /** Button label for processing */
    processingIcon: { type: String, default: "mdi-content-save" },
    /** Disable buttons */
    disabled: { type: Boolean, default: !1 },
    /** Disable validation button */
    validateDisabled: { type: Boolean, default: !1 }
  },
  emits: [
    /** Validate button has been clicked */
    "validate",
    /** Reset button has been clicked */
    "reset"
  ],
  setup(m, { emit: c }) {
    const n = c, o = Q(), s = m;
    return (r, t) => (d(), $("div", Vl, [
      f(r.$slots, "prepend", {
        state: s.state,
        disabled: s.disabled,
        attrs: e(o)
      }),
      g(U, w(e(o), {
        color: "error",
        class: "me-2",
        "prepend-icon": s.resetIcon,
        onClick: t[0] || (t[0] = (p) => n("reset")),
        disabled: s.disabled
      }), {
        default: u(() => [
          f(r.$slots, "discard", {}, () => [
            B(A(s.resetLabel || e(ye)("actions.discard")), 1)
          ])
        ]),
        _: 3
      }, 16, ["prepend-icon", "disabled"]),
      s.state.isSending || s.state.isProcessing ? (d(), y(U, w({ key: 0 }, e(o), {
        color: "primary",
        "prepend-icon": s.processingIcon,
        disabled: ""
      }), {
        default: u(() => [
          f(r.$slots, "processing", {}, () => [
            B(A(s.processingLabel || e(ye)("actions.saving")), 1)
          ])
        ]),
        _: 3
      }, 16, ["prepend-icon"])) : (d(), y(U, w({ key: 1 }, e(o), {
        color: "primary",
        "prepend-icon": s.validateIcon,
        onClick: t[1] || (t[1] = (p) => n("validate")),
        disabled: s.disabled || s.validateDisabled
      }), {
        default: u(() => [
          f(r.$slots, "validate", {}, () => [
            B(A(s.validateLabel || e(ye)("actions.save")), 1)
          ])
        ]),
        _: 3
      }, 16, ["prepend-icon", "disabled"])),
      f(r.$slots, "append", {
        state: "props.state",
        disabled: "props.disabled",
        attrs: e(o)
      })
    ]));
  }
}, wl = { key: 0 }, Ol = { class: "text-right mt-3" }, hl = {
  __name: "OxLogin",
  props: {
    /** Url to go once logged in. */
    next: { type: String },
    /** API url to call to log in. */
    url: { type: String }
  },
  setup(m, { expose: c }) {
    const n = D("passwordInput"), o = m, s = ie({
      username: "",
      password: ""
    }), r = D(!1), t = ie(new Ot());
    function p(a = !0) {
      ht(s, { username: "", password: "" }), a && t.none();
    }
    async function l() {
      t.processing();
      try {
        const a = await fetch(o.url, {
          method: "POST",
          headers: Ae.axiosConfig.headers,
          body: JSON.stringify(s)
        });
        a.status == 200 ? (s.credentials = "", s.password = "", t.ok(await a.json()), o.next && (window.location.href = o.next)) : t.error(await a.json());
      } catch (a) {
        t.error((a == null ? void 0 : a.message) || a);
      }
    }
    return c({
      /** Run login. */
      login: l,
      /** Reset login form. */
      reset: p,
      /** Current state. */
      state: t
    }), (a, i) => (d(), $(O, null, [
      g(ve, { state: t }, {
        none: u(({ state: v }) => [...i[7] || (i[7] = [
          q("p", null, "Please enter your credentials in order too proceed...", -1)
        ])]),
        "ok-detail": u(({ state: v }) => [
          o.next ? (d(), $("p", wl, [
            i[8] || (i[8] = B("You soon will be redirected to ", -1)),
            q("i", null, A(o.next), 1)
          ])) : V("", !0)
        ]),
        _: 1
      }, 8, ["state"]),
      t.isOk ? V("", !0) : (d(), $(O, { key: 0 }, [
        g(ce, {
          variant: "underlined",
          label: "Enter login",
          modelValue: s.username,
          "onUpdate:modelValue": i[0] || (i[0] = (v) => s.username = v),
          onKeyup: i[1] || (i[1] = he(N((v) => n.value.focus(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue"]),
        g(ce, {
          variant: "underlined",
          ref: "password",
          label: "Enter password",
          modelValue: s.password,
          "onUpdate:modelValue": i[2] || (i[2] = (v) => s.password = v),
          type: r.value ? "text" : "password",
          "append-icon": r.value ? "mdi-eye" : "mdi-eye-off",
          "onClick:append": i[3] || (i[3] = (v) => r.value = !r.value),
          onKeyup: i[4] || (i[4] = he(N((v) => l(), ["stop"]), ["enter"]))
        }, null, 8, ["modelValue", "type", "append-icon"]),
        q("div", Ol, [
          f(a.$slots, "bottom", {
            password: s.password,
            username: s.username,
            login: l,
            reset: p
          }, () => [
            s.username && s.password ? (d(), y(Ve, {
              key: 0,
              "validate-label": "Login!",
              onValidate: i[5] || (i[5] = (v) => l()),
              onReset: i[6] || (i[6] = (v) => p()),
              state: t
            }, null, 8, ["state"])) : V("", !0)
          ])
        ])
      ], 64))
    ], 64));
  }
}, Ke = /* @__PURE__ */ P({
  __name: "OxModelEditor",
  props: {
    repo: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  setup(m, { expose: c }) {
    const n = D(null), o = G("user"), s = m, { editor: r, edited: t } = bt({ props: s }), p = M(() => o.can([r.repo.use, "change", s.initial])), l = M(() => ({
      editor: r,
      edited: t.value,
      form: n.value,
      editable: p.value,
      disabled: !p.value,
      value: r.value,
      model: r.repo.use
    }));
    return X(() => r.errors && Object.values(r.errors), () => n.value.validate()), c({
      /** The {@link ModelEditor} instance. */
      editor: r,
      /** A computed boolean indicating if content has been edited. */
      edited: t,
      /** A computed boolean indicating if content can be edited. */
      editable: p,
      /** Reference to inner `v-form`. */
      form: n
    }), (a, i) => (d(), $(O, null, [
      f(a.$slots, "prepend", T(E(l.value))),
      g(je, {
        ref_key: "form",
        ref: n,
        modelValue: e(r).valid,
        "onUpdate:modelValue": i[0] || (i[0] = (v) => e(r).valid = v),
        disabled: !p.value
      }, {
        default: u(() => [
          f(a.$slots, "default", T(E(l.value)))
        ]),
        _: 3
      }, 8, ["modelValue", "disabled"]),
      f(a.$slots, "append", T(E(l.value)))
    ], 64));
  }
}), xl = { key: 0 }, _l = /* @__PURE__ */ P({
  __name: "OxModelEdit",
  props: {
    sendFormData: { type: Boolean },
    hideValidationBtn: { type: Boolean },
    repo: {},
    initial: {},
    name: {},
    url: {},
    saved: { type: Function }
  },
  emits: [
    /** Item was saved `(editor: ModelEditor): void`. */
    "saved"
  ],
  setup(m, { expose: c, emit: n }) {
    const o = n, s = m, r = D(null), t = M(() => {
      const { sendFormData: a, hideValidationBtn: i, ...v } = s;
      return v;
    });
    function p() {
      r.value.editor.reset(s.initial);
    }
    async function l() {
      const a = r.value, i = s.sendFormData ? await a.editor.save(new FormData(a.form.$el)) : await a.editor.save();
      return o("saved", r.value.editor), p(), i;
    }
    return kt(() => {
      var a;
      return !((a = r.value) != null && a.edited && !confirm("Continue without saving?"));
    }), c({
      /** Save edited item. */
      save: l,
      /** Reset edited item to initial value */
      reset: p,
      /** {@link ModelEditor} controller */
      get editor() {
        return r.value.editor;
      },
      /** Item is edited */
      get edited() {
        return r.value.edited;
      },
      /** Edition is allowed */
      get editable() {
        return r.value.editable;
      },
      /** Inner OxModelEditor's form */
      get form() {
        return r.value.form;
      }
    }), (a, i) => {
      var v;
      return d(), $(O, null, [
        (v = r.value) != null && v.editor ? (d(), y(ve, {
          key: 0,
          state: r.value.editor.state
        }, null, 8, ["state"])) : V("", !0),
        g(Ee, { class: "ox-model-edit" }, {
          default: u(() => [
            g(Ke, w({
              ref_key: "modelEditor",
              ref: r
            }, t.value), {
              prepend: u((b) => [
                s.hideValidationBtn ? V("", !0) : (d(), $("div", xl, [
                  f(a.$slots, "prepend", w(b, {
                    save: l,
                    reset: p
                  }), () => [
                    b.editable && b.edited ? (d(), y(Ve, {
                      key: 0,
                      onValidate: i[0] || (i[0] = (h) => l()),
                      onReset: i[1] || (i[1] = (h) => p()),
                      state: b.editor.state,
                      "validate-disabled": b.editor.valid === !1
                    }, null, 8, ["state", "validate-disabled"])) : V("", !0)
                  ])
                ]))
              ]),
              default: u((b) => [
                f(a.$slots, "default", w(b, {
                  save: l,
                  reset: p
                }))
              ]),
              append: u((b) => [
                f(a.$slots, "append", w(b, {
                  save: l,
                  reset: p
                }))
              ]),
              _: 3
            }, 16)
          ]),
          _: 3
        })
      ], 64);
    };
  }
}), Sl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OxAction: de,
  OxActionEdit: $e,
  OxActionModelDelete: pl,
  OxActionPost: cl,
  OxApp: sl,
  OxAutocomplete: fl,
  OxComponent: vl,
  OxField: yl,
  OxFormList: kl,
  OxListCard: qe,
  OxListFilters: ze,
  OxListKanban: $l,
  OxListTable: De,
  OxLogin: hl,
  OxModelEdit: _l,
  OxModelEditor: Ke,
  OxModelList: gl,
  OxModelPanel: dl,
  OxPanel: Ne,
  OxSection: Re,
  OxStateAlert: ve,
  OxValidationBtn: Ve,
  OxView: ne
}, Symbol.toStringTag, { value: "Module" })), Tl = {
  el: "#app",
  delimiters: ["[[", "]]"],
  components: { ...Sl, ...Xt }
};
export {
  Tl as App,
  de as OxAction,
  $e as OxActionEdit,
  pl as OxActionModelDelete,
  cl as OxActionPost,
  sl as OxApp,
  fl as OxAutocomplete,
  vl as OxComponent,
  yl as OxField,
  kl as OxFormList,
  qe as OxListCard,
  ze as OxListFilters,
  $l as OxListKanban,
  De as OxListTable,
  hl as OxLogin,
  _l as OxModelEdit,
  Ke as OxModelEditor,
  gl as OxModelList,
  dl as OxModelPanel,
  Ne as OxPanel,
  Re as OxSection,
  ve as OxStateAlert,
  Ve as OxValidationBtn,
  ne as OxView
};
//# sourceMappingURL=components.js.map

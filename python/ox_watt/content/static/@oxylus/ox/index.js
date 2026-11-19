var G = Object.defineProperty;
var W = (i, t, e) => t in i ? G(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var o = (i, t, e) => W(i, typeof t != "symbol" ? t + "" : t, e);
import { t as p, R as Y, c as j, d as L, l as d, a as F, H as X, b as ee, e as te, B as se, C as ie, G as re, M as ne, f as ae, P as oe, U as T, u as z, g as le, S as b, r as ue, i as I, h as ce, j as he, k as fe, m as de, n as N, s as pe, o as me, p as ye, q as ge, v as ve, w as we } from "./router.js";
import { I as dt, F as pt, J as mt, $ as yt, V as gt, T as vt, z as wt, K as xt, Y as bt, a4 as At, a3 as _t, a2 as qt, W as Et, X as Ot, _ as Rt, Z as St, x as Mt, a1 as Pt, y as $t, a0 as Ct, A as Tt, D as kt, L as jt, N as zt, Q as Kt, O as Dt, E as Ut } from "./router.js";
import { inject as xe, provide as A, ref as O, computed as g, createApp as be, reactive as V, watch as $, onUnmounted as Ae, unref as K, defineAsyncComponent as _e } from "vue";
import qe from "axios";
import * as Ee from "@oxylus/ox/vendor";
import { c as Oe, a as D, m as Re } from "./vuetify.js";
function U(i, t) {
  let e = `${i}.${t}`, s = p(e);
  return s != e ? s : p(`${i}._.${t}`);
}
const H = {
  get(i, t, e) {
    return t == "items" ? Object.keys(i).filter((s) => s[0] != "_").map((s) => ({
      value: i[s],
      title: U(i.__prefix, s)
    })) : t == "toString" ? (s) => U(e.__prefix, s) : Reflect.get(i, t, e);
  }
};
function Se(i, t) {
  return t.__prefix = i, new Proxy(t, H);
}
class Me {
  /**
   * Create a new response instance.
   */
  constructor(t, e, s) {
    /**
     * The repository that called the request.
     */
    o(this, "repository");
    /**
     * The request configuration.
     */
    o(this, "config");
    /**
     * The axios response instance.
     */
    o(this, "response");
    /**
     * Entities created by Pinia ORM.
     */
    o(this, "entities", null);
    /**
     * Whether if response data is saved to the store or not.
     */
    o(this, "isSaved", !1);
    this.repository = t, this.config = e, this.response = s;
  }
  /**
   * Save response data to the store.
   */
  async save() {
    const t = this.getDataFromResponse();
    if (!this.validateData(t)) {
      console.warn(
        "[Pinia ORM Axios] The response data could not be saved to the store because it is not an object or an array. You might want to use `dataTransformer` option to handle non-array/object response before saving it to the store."
      );
      return;
    }
    let e = this.config.persistBy || "save";
    this.validatePersistAction(e) || (console.warn(
      '[Pinia ORM Axios] The "persistBy" option configured is not a recognized value. Response data will be persisted by the default `save` method.'
    ), e = "save");
    const s = await this.repository[e](t);
    this.entities = Array.isArray(s) ? s : [s], this.isSaved = !0;
  }
  /**
   * Delete the entity record where the `delete` option is configured.
   */
  async delete() {
    if (this.config.delete === void 0)
      throw new Error(
        "[Pinia ORM Axios] Could not delete records because the `delete` option is not set."
      );
    await this.repository.query().destroy(this.config.delete);
  }
  /**
   * Get the response data from the axios response object. If a `dataTransformer`
   * option is configured, it will be applied to the response object. If the
   * `dataKey` option is configured, it will return the data from the given
   * property within the response body.
   */
  getDataFromResponse() {
    return this.config.dataTransformer ? this.config.dataTransformer(this.response) : this.config.dataKey ? this.response.data[this.config.dataKey] : this.response.data;
  }
  /**
   * Get persist options if any set in config.
   */
  // protected getPersistOptions (): PersistOptions | undefined {
  //   const persistOptions = this.config.persistOptions
  //
  //   if (!persistOptions || typeof persistOptions !== 'object') {
  //     return
  //   }
  //
  //   return Object.keys(persistOptions)
  //     .filter(this.validatePersistAction) // Filter to avoid polluting the payload.
  //     .reduce((carry, key) => {
  //       carry[key] = persistOptions[key]
  //       return carry
  //     }, {} as PersistOptions)
  // }
  /**
   * Validate the given data to ensure the Pinia ORM persist methods accept it.
   */
  validateData(t) {
    return t !== null && typeof t == "object";
  }
  /**
   * Validate the given string as to ensure it correlates with the available
   * Pinia ORM persist methods.
   */
  validatePersistAction(t) {
    return ["save", "insert"].includes(t);
  }
}
class Pe {
  /**
   * Create a new api instance.
   */
  constructor(t) {
    /**
     * The repository class.
     */
    o(this, "repository");
    /**
     * The default config.
     */
    o(this, "config", {
      save: !0
    });
    this.repository = t, this.registerActions();
  }
  /**
   * Get the axios client.
   */
  get axios() {
    if (this.repository.axios = this.repository.axios ?? this.repository.config.axiosApi.axios, !this.repository.axios)
      throw new Error(
        "[Pinia ORM Axios] The axios instance is not registered. Please register the axios instance to the repository."
      );
    return this.repository.axios;
  }
  /**
   * Register actions from the repository config.
   */
  registerActions() {
    var e, s, r;
    const t = { ...(e = this.repository.config.axiosApi) == null ? void 0 : e.actions, ...(r = (s = this.repository.getModel().$config()) == null ? void 0 : s.axiosApi) == null ? void 0 : r.actions };
    if (t)
      for (const n in t) {
        const a = t[n];
        typeof a == "function" ? this.registerFunctionAction(n, a) : this.registerObjectAction(n, a);
      }
  }
  /**
   * Register the given object action.
   */
  registerObjectAction(t, e) {
    this[t] = (s) => this.request({ ...e, ...s });
  }
  /**
   * Register the given function action.
   */
  registerFunctionAction(t, e) {
    this[t] = e.bind(this);
  }
  /**
   * Perform a get request.
   */
  get(t, e = {}) {
    return this.request({ method: "get", url: t, ...e });
  }
  /**
   * Perform a post request.
   */
  post(t, e = {}, s = {}) {
    return this.request({ method: "post", url: t, data: e, ...s });
  }
  /**
   * Perform a put request.
   */
  put(t, e = {}, s = {}) {
    return this.request({ method: "put", url: t, data: e, ...s });
  }
  /**
   * Perform a patch request.
   */
  patch(t, e = {}, s = {}) {
    return this.request({ method: "patch", url: t, data: e, ...s });
  }
  /**
   * Perform a delete request.
   */
  delete(t, e = {}) {
    return this.request({ method: "delete", url: t, ...e });
  }
  /**
   * Perform an api request.
   */
  async request(t) {
    const e = this.createConfig(t), s = await this.axios.request(e);
    return this.createResponse(s, e);
  }
  /**
   * Create a new config by merging the global config, the repository config,
   * and the given config.
   */
  createConfig(t) {
    return {
      ...this.config,
      ...this.repository.globalApiConfig,
      ...this.repository.apiConfig,
      ...t
    };
  }
  /**
   * Create a new response instance by applying a few initialization processes.
   * For example, it saves response data if `save` option id set to `true`.
   */
  async createResponse(t, e) {
    const s = new Me(this.repository, e, t);
    return e.delete !== void 0 ? (await s.delete(), s) : (e.save && await s.save(), s);
  }
}
class $e extends Y {
  constructor(e, s) {
    var r, n, a;
    super(e, s);
    o(this, "axios");
    o(this, "globalApiConfig");
    o(this, "apiConfig");
    this.axios = ((n = (r = j) == null ? void 0 : r.axiosApi) == null ? void 0 : n.axios) || null, this.globalApiConfig = ((a = j) == null ? void 0 : a.axiosApi) || {}, this.apiConfig = {};
  }
  api() {
    return Ce(this);
  }
  setAxios(e) {
    return this.axios = e, this;
  }
}
function Ce(i) {
  return new Pe(i);
}
function Te(i) {
  return L((t) => (t.config.axiosApi = i, t));
}
const P = class P {
  constructor(t) {
    o(this, "repo");
    /** Acquired items */
    o(this, "items");
    this.repo = t, this.items = {};
  }
  /** Acquire a unique context key */
  acquireKey() {
    return P._lastKey++;
  }
  /** Acquire provided ids for this key */
  acquire(t, e) {
    if (e != null && e.length)
      for (var s of e)
        if (s in this.items) {
          const r = this.items[s];
          !r.includes(t) && r.push(t);
        } else
          this.items[s] = [t];
  }
  /** Release provided ids for this key */
  release(t, e) {
    if (!(e != null && e.length))
      return;
    const s = [];
    for (var r of e) {
      const n = this.items[r];
      d.pull(n, t), n != null && n.length || (s.push(r), delete this.items[r]);
    }
    s.length && this.repo.destroy(s);
  }
  /**
   * Release and acquire for this key.
   *
   * This optimizes out ids
   */
  releaseAcquire(t, e, s) {
    this.release(t, d.difference(e, s)), this.acquire(t, d.difference(s, e));
  }
  /** Release all reference for the provided context key. */
  flush(t) {
    const e = [];
    for (var s in this.items) {
      const r = this.items[s], n = r.indexOf(t);
      n != -1 && (r.splice(n, 1), r.length || (e.push(s), delete this.items[s]));
    }
    e.length && this.repo.destroy(e);
  }
  /** Clear reference counter without destroying items. **/
  clear() {
    this.items = {};
  }
};
o(P, "_lastKey", 0);
let R = P;
class C extends $e {
  constructor(e, s) {
    super(e, s);
    o(this, "refs");
    this.refs = new R(this);
  }
  flush() {
    return this.refs.clear(), super.flush();
  }
}
function B(i, t) {
  var e;
  if (typeof t == "string") {
    const s = (e = i.use) == null ? void 0 : e.fields(), r = s && s[t] || null;
    t = r instanceof F ? r : null;
  }
  return t;
}
function Z(i) {
  return i instanceof X || i instanceof ee || i instanceof te || i instanceof se ? i.foreignKey : null;
}
const Xe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContentType: ie,
  Enum: Se,
  Group: re,
  Meta: ne,
  Model: ae,
  Permission: oe,
  RefCounter: R,
  RefRepository: C,
  User: T,
  asRelation: B,
  enumProxy: H,
  getSourceKey: Z
}, Symbol.toStringTag, { value: "Module" }));
function ke(i) {
  z(i);
  const t = le();
  return C.useModel = i, z(C, t);
}
function et(i, { useInject: t = !0, useDefaults: e = !0 } = {}) {
  var s = t && (xe("repos", null) || {});
  const r = t && !!Object.keys(s).length;
  Array.isArray(i) || (i = Object.values(i)), e && i.push(T);
  for (const n of i)
    if (n && n.entity) {
      if (n.entity in s)
        continue;
      s[n.entity] = ke(n);
    }
  return !r && A("repos", s), s;
}
function tt(i, t = !0) {
  const e = new b(), s = i.dataEl ? ue(i.dataEl) : i.data || {}, r = new T((s == null ? void 0 : s.user) || {});
  i.apiUrl && (s.apiUrl = i.apiUrl);
  const n = { state: e, data: s, user: r, apiUrl: s.apiUrl };
  return A("app", n), A("user", r), window.oxylus = { ...window.oxylus, ...n }, n;
}
function st({ props: i, user: t, emits: e = null }) {
  const s = O(!1), r = g(() => !i.permission || t.can(i.permission, i.item));
  return { processing: s, run: async (...a) => {
    if (i.confirm && !confirm(i.confirm))
      return;
    if (i.href) {
      window.open(i.href, "_blank");
      return;
    }
    s.value = !0;
    let l = i.run(t, i.item, ...a);
    return l instanceof Promise && (l = await l), s.value = !1, e && e("completed", i.item, ...a), l;
  }, allowed: r };
}
const je = 24 * 60 * 60 * 1e3;
function S() {
  const i = I.global.locale, t = g(
    () => new Intl.RelativeTimeFormat(i.value, { numeric: "auto" })
  ), e = g(
    () => new Intl.DateTimeFormat(i.value, { dateStyle: "medium" })
  );
  function s(n) {
    const a = new Date(n), l = /* @__PURE__ */ new Date(), u = Math.floor(
      (a.setHours(0, 0, 0, 0) - l.setHours(0, 0, 0, 0)) / je
    );
    return Math.abs(u) <= 1 ? t.value.format(u, "day") : e.value.format(a);
  }
  function r(n) {
    const a = new Date(n), l = Date.now(), u = Math.round((a.getTime() - l) / 1e3), c = Math.abs(u);
    return c < 60 ? t.value.format(u, "second") : c < 3600 ? t.value.format(Math.round(u / 60), "minute") : c < 86400 ? t.value.format(Math.round(u / 3600), "hour") : t.value.format(Math.round(u / 86400), "day");
  }
  return {
    naturalDay: s,
    naturalTime: r
  };
}
function k(i) {
  i.__humanizeTimer && (window.clearInterval(i.__humanizeTimer), delete i.__humanizeTimer);
}
function M(i, t, e, s) {
  if (!t.value) {
    i.textContent = "";
    return;
  }
  i.textContent = e(t.value), s && (k(i), i.__humanizeTimer = window.setInterval(() => {
    i.textContent = e(t.value);
  }, 6e4));
}
const ze = {
  mounted(i, t) {
    const { naturalTime: e } = S();
    M(i, t, e, !0);
  },
  updated(i, t) {
    const { naturalTime: e } = S();
    M(i, t, e, !0);
  },
  unmounted(i) {
    k(i);
  }
}, Ke = {
  mounted(i, t) {
    const { naturalDay: e } = S();
    M(i, t, e, !1);
  },
  updated(i, t) {
    const { naturalDay: e } = S();
    M(i, t, e, !1);
  },
  unmounted(i) {
    k(i);
  }
};
function De(i) {
  i.directive("natural-time", ze), i.directive("natural-day", Ke);
}
function E(i) {
  switch (i) {
    case !1:
      document.body.classList.add("loading"), E("start");
      break;
    case !0:
      document.body.classList.remove("loading");
      break;
    default:
      const t = document.getElementById("loading-overlay");
      t.dataset.state = i;
      const e = t.querySelectorAll("*[data-state]");
      for (const s of e)
        s.style.display = s.dataset.state == i ? "block" : "none";
  }
}
function it({ App: i = null, el: t = "#app", onLoad: e = !0, ...s } = {}) {
  async function r() {
    const n = await Ue(i, s), a = t ? n.mount(t) : null;
    return E(!0), { app: n, el: t, vm: a };
  }
  return new Promise((n) => {
    if (e)
      return window.addEventListener(
        "load",
        () => n(r())
      );
    n(r());
  });
}
async function Ue(i, { props: t = {}, vuetify: e = {}, plugins: s = null, locales: r } = {}) {
  return E("create-app"), i = be(i, t), i.config.globalProperties.window = window, i.config.globalProperties.$oxylus = window.oxylus, i.use(Fe(e)), i.use(I), De(i), E("i18n"), await ce(), await he({ locales: r }), E("plugins"), s && s.forEach((n) => i.use(n)), i;
}
function Fe({ components: i = {}, defaults: t = {}, ...e }) {
  return e.components = {
    ...Ee,
    ...i
  }, Oe({
    blueprint: Re,
    theme: {
      themes: {
        light: {
          dark: !1,
          colors: {
            primary: D.green.darken1,
            secondary: D.green.lighten4
          }
        }
      }
    },
    defaults: {
      ...t,
      VTextField: { variant: "underlined" },
      VSelect: { variant: "underlined" },
      VTextarea: { variant: "outlined" },
      VCombobox: { variant: "underlined" },
      VAutocomplete: { variant: "underlined" }
    },
    ...e
  });
}
function rt({ axiosConfig: i = null, baseURL: t = null } = {}) {
  t || (t = document.body.dataset.apiUrl);
  const e = fe(), s = de({
    plugins: [
      Te({
        axios: qe,
        ...i || N.axiosConfig,
        baseURL: t
      })
    ]
  });
  return pe(e), e.use(s);
}
class q {
  /**
  * @param {Repos} [repos] all models repositories
  * @param {Repository<M>} [repo] the main repository
  */
  constructor(t, e = null, s = {}) {
    this.repo = t, this.repos = e, this.opts = s;
  }
  /** Fetch items from api. */
  async fetch(t = {}) {
    var x, v, h, f, w;
    t = { ...this.opts, ...t };
    let { url: e, id: s, repo: r, lookup: n, params: a, relations: l, path: u, ...c } = t;
    n ?? (n = "id__in"), r ?? (r = this.repo);
    let m = null;
    if (Array.isArray(s) && (s.length == 1 ? s = s[0] : (m = s, s = null)), !e) {
      const _ = s;
      e = (v = (x = r.use) == null ? void 0 : x.meta) == null ? void 0 : v.getUrl({ path: u, id: _ });
    }
    if (s ? c.dataKey = null : "dataKey" in c || (c.dataKey = (w = (f = (h = r.use) == null ? void 0 : h.config) == null ? void 0 : f.axiosApi) == null ? void 0 : w.dataKey), m && n !== void 0) {
      if (s)
        throw Error("Both `ids` and `id` are provided while only one of those arguments is accepted.");
      a = { ...a || {} }, a[n] = m.filter((_) => _).join(",");
    }
    const y = await r.api().get(e, { ...c, params: a });
    return c.save === !1 && (y.entities = this.getEntities(y)), l && (y.relations = await this.relations(y.entities, l, { ...c, params: {} })), y;
  }
  /** Post data to the server. */
  async post(t, { method: e = "post", ...s } = {}) {
    var y, x, v, h, f;
    s = { ...this.opts, ...s };
    let { url: r, id: n, repo: a, lookup: l, path: u, ...c } = s;
    if (a ?? (a = this.repo), !r) {
      const w = n;
      r = (x = (y = a.use) == null ? void 0 : y.meta) == null ? void 0 : x.getUrl({ path: u, id: w });
    }
    n ? c.dataKey = null : "dataKey" in c || (c.dataKey = (f = (h = (v = a.use) == null ? void 0 : v.config) == null ? void 0 : h.axiosApi) == null ? void 0 : f.dataKey);
    const m = await a.api()[e](r, t, c);
    return c.save == !1 && (m.entities = this.getEntities(m)), m;
  }
  /** Get entities from response **/
  getEntities(t) {
    const e = t.getDataFromResponse();
    return Array.isArray(e) ? e.map((s) => this.repo.make(s)) : [this.repo.make(e)];
  }
  /**
   * Fetch all items from api.
   *
   * @param [options.nextKey] response object key to get next url
   * @param [options.limit] max count of consecutive requests
   * @return Response of the first request, whoses ``entities`` has \
   * model instances of all requests.
   */
  async all({ nextKey: t = "next", limit: e = -1, ...s } = {}) {
    const r = await this.fetch({ ...s });
    let n = r.response.data[t];
    for (; n; ) {
      const a = await this.fetch({ ...s, url: n });
      if (a.entities && (r.entities = r.entities !== null ? r.entities.concat(a.entities) : a.entities), n = a.response.data[t], e > 0 && e--, !e) break;
    }
    return r;
  }
  /**
   * Fetch all from API if repository is empty (see {@link Query.all}).
   *
   * For arguments see {@link Query.all}.
   *
   * Return null if no request has been made.
   */
  async allOnce(t = {}) {
    return (t.repo ?? this.repo).first() ? null : await this.all(t);
  }
  /**
   * Fetch related objects for the provided list and field names.
   *
   * @param objs - the objects to get related ids from.
   * @param options.fields - list of field names.
   * @param options.opts - options to pass down to {@link Quey.relation}.
   * @return the resulting entities.
   */
  async relations(t, e, s = {}) {
    var a;
    this._ensureRepos("relations");
    const r = {}, n = (a = this.repo.use) == null ? void 0 : a.fields();
    if (n)
      for (const l of e) {
        const u = n[l];
        if (u instanceof F)
          r[l] = await this.relation(t, u, s);
        else
          throw Error(`Field ${l} is not a relation`);
      }
    return r;
  }
  _ensureRepos(t) {
    if (!this.repos)
      throw Error(`Query.repos is not provided although it is mandatory to call ${t}.`);
  }
  /**
   * Fetch related objects for the provided object list and field name.
   * It uses {@link Query.all} in order to fetch all items.
   *
   * @param objs - the objects to get ids from.
   * @param relation - objects' field or field name.
   * @param options - options to pass down to `all()`.
   */
  async relation(t, e, s = {}) {
    this._ensureRepos("relations");
    const r = B(this.repo, e);
    if (!r)
      throw Error(`No Relation found for field ${e}.`);
    const n = r.related.constructor.entity, a = this.repos[n];
    if (!a)
      throw Error(`No repository "${n}" found.`);
    const l = Z(r);
    if (!l)
      throw Error(`No source ids attributes for ${e}.`);
    const u = [...new Set(me(t, l))];
    return new q(a, this.repos, { save: this.opts.save }).all({ ...s, id: u, repo: a });
  }
}
function nt(i, t, e = null) {
  if (typeof i == "string") {
    if (!(i in t))
      throw Error(`Repository "${i}" is not present in provided repositories.`);
    return new q(t[i], t, e);
  }
  return new q(i, t, e);
}
class Q {
  constructor(t) {
    o(this, "state", b.none());
    o(this, "value", {});
    t && ye(this, t), this.state || (this.state = new b()), this.value ?? (this.value = {}), this.empty ?? (this.empty = {}), this.initial ?? (this.initial = this.props.initial || this.empty), this.valid = !0, this.reset(this.initial);
  }
  get name() {
    return this.props.name;
  }
  get url() {
    return this.props.url;
  }
  get errors() {
    return this.state.isError && this.state.data || null;
  }
  error(t) {
    var s, r;
    const e = this.state.isError && ((s = this.state.data) == null ? void 0 : s[t]);
    return e && ((r = this.state.__value) == null ? void 0 : r[t]) == this.value[t] && e.join(`
`) || "";
  }
  /** Discard changes, resetting to initial value. */
  discard() {
    this.reset(this.initial);
  }
  /**
   * Reset editor data to provided value.
   * When value is provided, reset initial to this value.
   */
  reset(t = null) {
    ge(this.value, t ?? this.empty), this.state.none();
  }
  /** Return wether value has been edited or not */
  isEdited() {
    return !d.isEqual(this.value, this.initial);
  }
  /**
   * Save data. It will `serialize()` value then `send()` it.
   *
   * Note: default implementation does not provide `send()` method
   * and thus will raise an error.
   *
   * @param [value] if provided use this instead of `this.value`. When a form is provided, it will get
   * @return state.
   */
  async save(t = null, e = {}) {
    var r;
    if (this.state.processing(), this.valid === !1)
      return this.state.error({
        _: "Some of the input values are invalid"
      });
    t ?? (t = this.value), t instanceof FormData ? e.headers = {
      ...N.axiosConfig.headers,
      "Content-Type": "multipart/form-data",
      ...e.headers
    } : t = this.serialize(t);
    const s = await this.send(t, e);
    return s.isOk ? (this.reset(s.data), this.initial = d.cloneDeep(this.value), (r = this.saved) == null || r.call(this, this.value)) : (this.state = s, this.state.__value = t), this.state;
  }
  /**
   * This method is called when editor successfully saved the
   * edited item to the server.
   *
   * By default, it will call {@link Editor.props.saved} if provided.
   */
  saved(t) {
    var e, s;
    (s = (e = this.props).saved) == null || s.call(e, t, this);
  }
  /** Serialize value before sending. */
  serialize(t) {
    return t;
  }
  /** Send value (not implemented, MUST BE in subclasses). */
  async send(t, e) {
    throw "not implemented";
  }
}
class Ie {
  constructor() {
    o(this, "state", b.none());
    o(this, "save", !0);
  }
  /** The repository of contained items. */
  get repo() {
    return this.query.repo;
  }
  /** Current model. */
  get model() {
    return this.repo.use;
  }
  /** Return orm's query to object. This will includes declared {@link List.relations}.
   *
   *   @param ids - optional id lookup
   *   @return orm's query
   */
  queryset(t = null) {
    let e = this.repo.query();
    if (this.relations)
      for (const s of this.relations)
        e = e.with(s);
    return t !== null && (e = e.whereId(t)), e;
  }
  /**
   * Fetch model instance from the server and select them.
   *
   * Calling this method updates state to:
   * - `PROCESSING`: request is being made;
   * - `NONE`: request has been done without error;
   * - `ERROR`: if an error happened;
   *
   * Flowchart:
   * - {@link ModelController.fetch}
   * - {@link ModelController.handleResponse}
   */
  async load(t = { all: !1 }) {
    this.state.processing();
    let e = null;
    try {
      e = await this.fetch(t), e = await this.handleResponse(t, e);
    } catch (s) {
      console.log(s), this.state.error(s.message || `${s}`);
    }
    return this.state.isError || this.state.none(), e;
  }
  /** Fetch model instance from the server.
   *
   * Flowchart:
   * - {@link ModelController.getQueryParams}
   * - {@link Query.fetch}
   */
  async fetch(t = { all: !1 }) {
    const e = this.getQueryOptions(t);
    return t.all ? this.query.fetch : this.query.all, await this.query.fetch(e);
  }
  /** Handle response from the {@link ModelContainer.fetch}'s request. */
  async handleResponse(t, e) {
    return e;
  }
  /** Get {@link Query.fetch} options. */
  getQueryOptions(t) {
    return !t.relations && this.relations && this.fetchRelations && (t.relations = this.relations), t.url || (t.url = this.url), "save" in t || (t.save = this.save), t;
  }
}
class Ne extends Ie {
  constructor(e) {
    super(e);
    // /** Reference counter key **/
    // $id: number
    o(this, "ids", []);
    o(this, "filters", {});
    o(this, "nextUrl", null);
    o(this, "prevUrl", null);
    o(this, "count", null);
    o(this, "page_size", null);
    o(this, "dataKey", "results");
    o(this, "nextKey", "next");
    o(this, "prevKey", "previous");
    o(this, "countKey", "count");
    e && Object.assign(this, e);
  }
  get length() {
    return this.ids.length;
  }
  /** Return index for id */
  indexOf(e) {
    return this.ids.indexOf(e);
  }
  /** Destroy list, ensuring cleaning behind the scenes */
  drop() {
    this.ids.splice(0);
  }
  /** Reset list */
  reset(e = []) {
    this.ids = [...e], this.nextUrl = null, this.prevUrl = null, this.count = this.ids.length;
  }
  /** Get item index by id */
  //findIndex(id: number): number { return this.items.findIndex((v) => v.id == id) }
  /** Add item if not present in list.
  *
  * @param id - item id to insert
  * @param index - if provided insert at this position
  * @return item index if already in the list, else insertion one
  */
  add(e, s = null) {
    const r = this.ids.indexOf(e);
    return r != -1 ? r : s !== null ? (this.ids.splice(s, 0, e), s) : (this.ids.push(e), this.ids.length - 1);
  }
  /** Remove item by id from list if present. */
  remove(e) {
    const s = this.ids.indexOf(e);
    s != -1 && this.ids.splice(s, 1);
  }
  /**
   * Get item id next to provided one at the specified direction.
   *
   * @param item - reference item
   * @param step - increment or decrement item index by this value.
   * @return the target item id or null if not found.
   */
  getSiblingIndex(e, s) {
    if (e === null)
      return -1;
    const r = this.ids.indexOf(e), n = r >= 0 ? r + s : -1;
    return n >= 0 && n < this.ids.length ? n : -1;
  }
  /**
   * Fetch next items from API, override `url` using {@link ModelList.nextUrl}.
   */
  async loadNext(e) {
    return await this.load({ ...e, url: this.nextUrl });
  }
  /**
   * Fetch previous items from API, override `url` using {@link ModelList.prevUrl}.
   */
  async loadPrev(e) {
    return await this.load({ ...e, url: this.prevUrl });
  }
  getQueryOptions(e) {
    return !("filters" in e) && this.filters && (e.params = { ...this.filters, ...e.params ?? [] }), this.page_size && (e.params = { ...e.params, page_size: this.page_size }), super.getQueryOptions(e);
  }
  /**
   * Handle response from API: update owned items list and related information (next/prev url, total count).
   *
   * Theses informations will not be set if `options.save == false`. You
   * can however call this method later if you need to defer persistence.
   */
  async handleResponse({ append: e = !1, ...s }, r) {
    if (r = await super.handleResponse(s, r), !this.state.isError && s.save !== !1) {
      const n = d.map(r.entities, "id");
      this.update(n, e), this.nextUrl = r.response.data[this.nextKey] || null, this.prevUrl = r.response.data[this.prevKey] || null, this.count = r.response.data[this.countKey] || this.ids.length;
    }
    return r;
  }
  /**
   * Update the list with the provided ids
   *
   * @param {ModelId[]} ids - The ids to add to the list
   * @param {boolean|number} append - When `true`, append items. When a number, insert at the provided position. \
   *                                  When `false`, remove all previous ids.
   */
  update(e, s = !1) {
    typeof s == "number" ? this.ids.splice(s, 0, ...e) : s && this.ids.length ? this.ids = d.union(this.ids, e) : this.ids = e;
  }
  /**
   * Update the list with the provided items.
   *
   * It first insert items in the repository before calling {@link ModelList.update}.
   *
   * @param {Model[]} items - The items to insert and add to the list.
   * @param ...args - Arguments passed down to {@link ModelList.update}.
   */
  updateWith(e, s = !1) {
    this.repo.insert(e), this.update(e.map((r) => r.id), s);
  }
}
class Ve extends Q {
  constructor(t) {
    t.fields = Object.keys(t.props.repo.use.fields()), t.empty ?? (t.empty = new t.props.repo.use()), super(t);
  }
  get repo() {
    return this.props.repo;
  }
  get model() {
    var t;
    return (t = this.props.repo) == null ? void 0 : t.use;
  }
  get name() {
    return this.props.name || `${this.repo.use.entity}-edit`;
  }
  isEdited() {
    return !d.isEqual(d.pick(this.value, this.fields), d.pick(this.initial, this.fields)) && !d.isEqual(d.pick(this.value, this.fields), d.pick(this.empty, this.fields));
  }
  get url() {
    var e, s;
    const t = super.url || ((s = (e = this.repo.use) == null ? void 0 : e.meta) == null ? void 0 : s.url);
    if (!t)
      throw Error("No url specified as parameter or in Model.meta.");
    return t;
  }
  reset(t = null) {
    (!t || !Object.keys(t).length) && (t = this.empty);
    const e = this.fields.filter((s) => s in t);
    this.value = d.cloneDeep(d.pick(t, e)) || {}, this.state.none();
  }
  serialize(t) {
    const e = this.repo.use;
    return new e({ ...this.value }).$toJson(null, { relations: !1 });
  }
  async send(t, e = {}) {
    let [s, r] = ["post", this.url];
    return this.value.id && (r = `${r}${this.value.id}/`, s = "put"), await this.repo.api()[s](r, t, e).then(
      (n) => b.ok(n.entities[0]),
      (n) => b.error(n.response.data)
    );
  }
}
function He(i, t = Ne) {
  const e = V(new t(i)), s = e.repo.refs.acquireKey(), r = g(() => e.length ? e.queryset(e.ids).orderBy((n) => e.ids.indexOf(n)).get() : []);
  return $(
    () => e.ids,
    ve((n, a) => e.repo.refs.releaseAcquire(s, a, n))
  ), $(() => e.filters && Object.values(e.filters), () => e.load()), Ae(() => e.repo.refs.flush(s)), A("list", e), A("items", r), { list: e, items: r, listId: s };
}
function at(i, t = null, e) {
  const s = new q(i, t, e), r = b.none();
  async function n(a) {
    r.processing();
    let l = null;
    try {
      l = await s.fetch(a), r.none();
    } catch (u) {
      r.error(u);
    }
    return l;
  }
  return { state: r, query: s, fetch: n };
}
function Be(i, t = Q) {
  i.initial || i.props.initial;
  const e = V(new t(i));
  A("editor", e);
  const s = g(() => e.isEdited());
  return $(() => e.props.initial, (r) => {
    const n = r || e.empty;
    e.initial = n, e.reset(n);
  }), { editor: e, edited: s };
}
function ot(i, t = Ve) {
  return Be(i, t);
}
const Ze = Symbol("OxModelPanel");
function lt(i) {
  i = { ...i };
  const t = i.title;
  i.title = g(() => {
    const h = s.activeView.value;
    if (r)
      switch (h == null ? void 0 : h.category) {
        case "list":
          return p(r, 3);
        case "detail":
          const f = K(m);
          if (f != null && f.$title)
            return f.$title;
          if (f != null && f.id)
            return p("models._.title", { model: p(r), id: f.id });
        case "create":
          return p("models._.title.new", { model: p(r) });
      }
    return (h == null ? void 0 : h.title) || t;
  });
  const { router: e, ...s } = we(i), r = i.repo.use, n = O(!1), a = new q(i.repo, i.repos), { list: l, items: u } = He({
    query: a,
    relations: i.relations,
    fetchRelations: i.fetchRelations
  }), c = O(!1);
  O(null);
  const m = g({
    get() {
      var h;
      if (s.active.value && e.location.value) {
        const f = K(e.location.value);
        let w = i.repo;
        (h = i.relations) != null && h.length && i.relations.forEach((J) => w = w.with(J));
        const _ = w.find(f);
        return !_ && !c.value && (c.value = !0, a.fetch({ id: f }).then(() => c.value = !1)), _;
      }
      return null;
    },
    set(h) {
      e.location.value = h;
    }
  }), y = g(() => u.value[l.getSiblingIndex(e.location.value, 1)]), x = g(() => u.value[l.getSiblingIndex(e.location.value, -1)]), v = {
    ...s,
    router: e,
    model: r,
    showFilters: n,
    list: l,
    items: u,
    item: m,
    next: y,
    prev: x
  };
  return A(Ze, v), v;
}
const ut = {
  /** Field is required */
  required(i) {
    return i || i === 0 ? !0 : p("fields._.required");
  },
  /**
   * Return a rule validating field errors returned from the server based
   * on the provided error list.
   */
  errors(i) {
    return () => i != null && i.length ? i.join("<br>") || !1 : !0;
  },
  /**
   * Return a rule whose validating value is optional.
   *
   * By default rules require value to be provided. This returns a new
   * rule whose value can either be empty or must match provided rule.
   */
  optional(i) {
    return (t) => !t || i(t);
  },
  /** Rule validating email */
  email(i) {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(i) || p("fields.email.rule");
  },
  /** Rule validating username */
  username(i) {
    return /^[A-Za-z0-9@.+\-_]+$/.test(i) || "Username must not be empty. It only can contain letters, numbers and @/+/./- special characters";
  },
  /** Rule validating url for HTTP protocol */
  httpUrl(i) {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(i) || p("rules.http_url");
  },
  /** Rule validating url for other protocols */
  url(i) {
    return /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(i) || p("rules.url");
  }
};
function ct(i, t) {
  return _e(() => import(i).then((e) => (i.endsWith(".js") && Qe(import.meta.resolve(i.replace(/\.js$/, ".css"))).catch(() => {
  }), t ? Object.values(e).filter((r) => r.__name == t)[0] : e)));
}
function Qe(i) {
  return new Promise((t, e) => {
    if (document.querySelector(`link[href="${i}"]`)) {
      t();
      return;
    }
    const s = document.createElement("link");
    s.rel = "stylesheet", s.href = i, s.onload = () => t(), s.onerror = (r) => e(r), document.head.appendChild(s);
  });
}
export {
  Q as Editor,
  Ie as ModelController,
  Ve as ModelEditor,
  Ne as ModelList,
  Ze as ModelPanelSymbol,
  dt as PanelSymbol,
  q as Query,
  pt as RouterSymbol,
  mt as SectionSymbol,
  b as State,
  yt as States,
  gt as ViewSymbol,
  vt as acquireUniqueIndex,
  ye as assignNonEmpty,
  me as collectAttr,
  N as config,
  Ue as createApp,
  wt as createI18n,
  rt as createPinia,
  xt as createRouter,
  Fe as createVuetify,
  bt as csrfToken,
  ct as defineAsyncComponent,
  At as exposeRefs,
  _t as filterSlots,
  qt as formToJson,
  Et as getCookie,
  Ot as getCookieList,
  Rt as getCountryFlag,
  St as getCsrf,
  Mt as i18n,
  Pt as ifNotEqual,
  ve as ifNotEqualFn,
  it as init,
  ce as loadI18nScripts,
  $t as locales,
  Ct as mapToObject,
  Xe as models,
  nt as query,
  ue as readJsonScript,
  ge as reset,
  ut as rules,
  p as t,
  Tt as tKey,
  kt as te,
  st as useAction,
  tt as useApp,
  Be as useEditor,
  jt as useGuard,
  he as useI18n,
  ot as useModelEditor,
  He as useModelList,
  lt as useModelPanel,
  et as useModels,
  we as usePanel,
  at as useQuery,
  ke as useRepo,
  zt as useRouter,
  Kt as useSection,
  Dt as useView,
  Ut as viewCategories
};
//# sourceMappingURL=index.js.map

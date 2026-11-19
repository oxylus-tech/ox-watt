import { warn as ha, reactive as Qe, watchEffect as Le, toRef as E, capitalize as dn, shallowRef as G, isVNode as nu, Comment as au, Fragment as de, camelize as fl, unref as ut, getCurrentInstance as lu, ref as K, computed as V, provide as Pe, inject as ge, defineComponent as iu, h as Gt, toValue as Oe, createVNode as C, mergeProps as j, createElementVNode as I, normalizeClass as Q, watch as q, onScopeDispose as De, effectScope as Sn, toRaw as pe, toRefs as ya, getCurrentScope as ou, onBeforeUnmount as et, readonly as ba, onMounted as gt, useId as ht, onDeactivated as ro, onActivated as ru, nextTick as me, TransitionGroup as vl, Transition as _t, onBeforeMount as Sa, normalizeStyle as oe, withDirectives as ze, vShow as Yt, Text as su, isRef as Za, resolveDynamicComponent as uu, toDisplayString as zt, onUpdated as cu, Teleport as du, markRaw as fu, cloneVNode as vu, onBeforeUpdate as mu, createTextVNode as Qn, withModifiers as Wn, vModelText as gu } from "vue";
function it(e) {
  ha(`Vuetify: ${e}`);
}
function nn(e) {
  ha(`Vuetify error: ${e}`);
}
function so(e, t) {
  t = Array.isArray(t) ? t.slice(0, -1).map((n) => `'${n}'`).join(", ") + ` or '${t.at(-1)}'` : `'${t}'`, ha(`[Vuetify UPGRADE] '${e}' is deprecated, use ${t} instead.`);
}
const ye = typeof window < "u", ml = ye && "IntersectionObserver" in window, hu = ye && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0), uo = ye && "matchMedia" in window && typeof window.matchMedia == "function", Wt = () => uo && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function Zl(e, t, n) {
  yu(e, t), t.set(e, n);
}
function yu(e, t) {
  if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function Ql(e, t, n) {
  return e.set(co(e, t), n), n;
}
function Pt(e, t) {
  return e.get(co(e, t));
}
function co(e, t, n) {
  if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
  throw new TypeError("Private element is not present on this object");
}
function fo(e, t, n) {
  const a = t.length - 1;
  if (a < 0) return e === void 0 ? n : e;
  for (let l = 0; l < a; l++) {
    if (e == null)
      return n;
    e = e[t[l]];
  }
  return e == null || e[t[a]] === void 0 ? n : e[t[a]];
}
function jt(e, t, n) {
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), fo(e, t.split("."), n));
}
function Ge(e, t, n) {
  if (t === !0) return e === void 0 ? n : e;
  if (t == null || typeof t == "boolean") return n;
  if (e !== Object(e)) {
    if (typeof t != "function") return n;
    const l = t(e, n);
    return typeof l > "u" ? n : l;
  }
  if (typeof t == "string") return jt(e, t, n);
  if (Array.isArray(t)) return fo(e, t, n);
  if (typeof t != "function") return n;
  const a = t(e, n);
  return typeof a > "u" ? n : a;
}
function Jt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return Array.from({
    length: e
  }, (n, a) => t + a);
}
function X(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (e == null || e === "")
    return;
  const n = Number(e);
  return isNaN(n) ? String(e) : isFinite(n) ? `${n}${t}` : void 0;
}
function wn(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Jl(e) {
  let t;
  return e !== null && typeof e == "object" && ((t = Object.getPrototypeOf(e)) === Object.prototype || t === null);
}
function gl(e) {
  if (e && "$el" in e) {
    const t = e.$el;
    return (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.nextElementSibling : t;
  }
  return e;
}
const ei = Object.freeze({
  enter: "Enter",
  tab: "Tab",
  delete: "Delete",
  esc: "Escape",
  space: "Space",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  end: "End",
  home: "Home",
  del: "Delete",
  backspace: "Backspace",
  insert: "Insert",
  pageup: "PageUp",
  pagedown: "PageDown",
  shift: "Shift"
});
function vo(e) {
  return Object.keys(e);
}
function $a(e, t) {
  return t.every((n) => e.hasOwnProperty(n));
}
function Bt(e, t) {
  const n = {};
  for (const a of t)
    Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
  return n;
}
function ti(e, t, n) {
  const a = /* @__PURE__ */ Object.create(null), l = /* @__PURE__ */ Object.create(null);
  for (const i in e)
    t.some((o) => o instanceof RegExp ? o.test(i) : o === i) ? a[i] = e[i] : l[i] = e[i];
  return [a, l];
}
function _e(e, t) {
  const n = {
    ...e
  };
  return t.forEach((a) => delete n[a]), n;
}
const mo = /^on[^a-z]/, hl = (e) => mo.test(e), bu = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"];
function wa(e) {
  const [t, n] = ti(e, [mo]), a = _e(t, bu), [l, i] = ti(n, ["class", "style", "id", "inert", /^data-/]);
  return Object.assign(l, t), Object.assign(i, a), [l, i];
}
function Me(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function Su(e, t) {
  let n = 0;
  const a = function() {
    for (var l = arguments.length, i = new Array(l), o = 0; o < l; o++)
      i[o] = arguments[o];
    clearTimeout(n), n = setTimeout(() => e(...i), ut(t));
  };
  return a.clear = () => {
    clearTimeout(n);
  }, a.immediate = e, a;
}
function $e(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(n, e));
}
function ni(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + n.repeat(Math.max(0, t - e.length));
}
function ai(e, t) {
  return (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0").repeat(Math.max(0, t - e.length)) + e;
}
function wu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let a = 0;
  for (; a < e.length; )
    n.push(e.substr(a, t)), a += t;
  return n;
}
function Ye() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const a = {};
  for (const l in e)
    a[l] = e[l];
  for (const l in t) {
    const i = e[l], o = t[l];
    if (Jl(i) && Jl(o)) {
      a[l] = Ye(i, o, n);
      continue;
    }
    if (n && Array.isArray(i) && Array.isArray(o)) {
      a[l] = n(i, o);
      continue;
    }
    a[l] = o;
  }
  return a;
}
function go(e) {
  return e.map((t) => t.type === de ? go(t.children) : t).flat();
}
function Rt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (Rt.cache.has(e)) return Rt.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return Rt.cache.set(e, t), t;
}
Rt.cache = /* @__PURE__ */ new Map();
function en(e, t) {
  if (!t || typeof t != "object") return [];
  if (Array.isArray(t))
    return t.map((n) => en(e, n)).flat(1);
  if (t.suspense)
    return en(e, t.ssContent);
  if (Array.isArray(t.children))
    return t.children.map((n) => en(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertyDescriptor(t.component.provides, e))
      return [t.component];
    if (t.component.subTree)
      return en(e, t.component.subTree).flat(1);
  }
  return [];
}
var Xt = /* @__PURE__ */ new WeakMap(), Mt = /* @__PURE__ */ new WeakMap();
class ho {
  constructor(t) {
    Zl(this, Xt, []), Zl(this, Mt, 0), this.size = t;
  }
  get isFull() {
    return Pt(Xt, this).length === this.size;
  }
  push(t) {
    Pt(Xt, this)[Pt(Mt, this)] = t, Ql(Mt, this, (Pt(Mt, this) + 1) % this.size);
  }
  values() {
    return Pt(Xt, this).slice(Pt(Mt, this)).concat(Pt(Xt, this).slice(0, Pt(Mt, this)));
  }
  clear() {
    Pt(Xt, this).length = 0, Ql(Mt, this, 0);
  }
}
function yl(e) {
  const t = Qe({});
  Le(() => {
    const a = e();
    for (const l in a)
      t[l] = a[l];
  }, {
    flush: "sync"
  });
  const n = {};
  for (const a in t)
    n[a] = E(() => t[a]);
  return n;
}
function Jn(e, t) {
  return e.includes(t);
}
function yo(e) {
  return e[2].toLowerCase() + e.slice(3);
}
const He = () => [Function, Array];
function li(e, t) {
  return t = "on" + dn(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function xa(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    n[a - 1] = arguments[a];
  if (Array.isArray(e))
    for (const l of e)
      l(...n);
  else typeof e == "function" && e(...n);
}
function Nt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  const n = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "details:not(:has(> summary))", "details > summary", "[tabindex]", '[contenteditable]:not([contenteditable="false"])', "audio[controls]", "video[controls]"].map((l) => `${l}${t ? ':not([tabindex="-1"])' : ""}:not([disabled], [inert])`).join(", ");
  let a;
  try {
    a = [...e.querySelectorAll(n)];
  } catch (l) {
    return nn(String(l)), [];
  }
  return a.filter((l) => !l.closest("[inert]")).filter((l) => !!l.offsetParent || l.getClientRects().length > 0).filter((l) => {
    var i, o;
    return !((i = l.parentElement) != null && i.closest("details:not([open])")) || l.tagName === "SUMMARY" && ((o = l.parentElement) == null ? void 0 : o.tagName) === "DETAILS";
  });
}
function bo(e, t, n) {
  let a, l = e.indexOf(document.activeElement);
  const i = t === "next" ? 1 : -1;
  do
    l += i, a = e[l];
  while ((!a || a.offsetParent == null || !((n == null ? void 0 : n(a)) ?? !0)) && l < e.length && l >= 0);
  return a;
}
function yn(e, t) {
  var a, l, i, o;
  const n = Nt(e);
  if (t == null)
    (e === document.activeElement || !e.contains(document.activeElement)) && ((a = n[0]) == null || a.focus());
  else if (t === "first")
    (l = n[0]) == null || l.focus();
  else if (t === "last")
    (i = n.at(-1)) == null || i.focus();
  else if (typeof t == "number")
    (o = n[t]) == null || o.focus();
  else {
    const r = bo(n, t);
    r ? r.focus() : yn(e, t === "next" ? "first" : "last");
  }
}
function jn(e) {
  return e == null || typeof e == "string" && e.trim() === "";
}
function xu() {
}
function an(e, t) {
  if (!(ye && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`))) return null;
  try {
    return !!e && e.matches(t);
  } catch {
    return null;
  }
}
function bl(e) {
  return e.some((t) => nu(t) ? t.type === au ? !1 : t.type !== de || bl(t.children) : !0) ? e : null;
}
function ku(e, t) {
  if (!ye || e === 0)
    return t(), () => {
    };
  const n = window.setTimeout(t, e);
  return () => window.clearTimeout(n);
}
function Cu(e, t) {
  const n = e.clientX, a = e.clientY, l = t.getBoundingClientRect(), i = l.left, o = l.top, r = l.right, s = l.bottom;
  return n >= i && n <= r && a >= o && a <= s;
}
function Qa() {
  const e = G(), t = (n) => {
    e.value = n;
  };
  return Object.defineProperty(t, "value", {
    enumerable: !0,
    get: () => e.value,
    set: (n) => e.value = n
  }), Object.defineProperty(t, "el", {
    enumerable: !0,
    get: () => gl(e.value)
  }), t;
}
function ea(e) {
  const t = e.key.length === 1, n = !e.ctrlKey && !e.metaKey && !e.altKey;
  return t && n;
}
function Dt(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "bigint";
}
function pu(e) {
  const t = {};
  for (const n in e)
    t[fl(n)] = e[n];
  return t;
}
function Vu(e) {
  const t = ["checked", "disabled"];
  return Object.fromEntries(Object.entries(e).filter((n) => {
    let [a, l] = n;
    return t.includes(a) ? !!l : l !== void 0;
  }));
}
const So = ["top", "bottom"], Pu = ["start", "end", "left", "right"];
function Ja(e, t) {
  let [n, a] = e.split(" ");
  return a || (a = Jn(So, n) ? "start" : Jn(Pu, n) ? "top" : "center"), {
    side: el(n, t),
    align: el(a, t)
  };
}
function el(e, t) {
  return e === "start" ? t ? "right" : "left" : e === "end" ? t ? "left" : "right" : e;
}
function Ra(e) {
  return {
    side: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[e.side],
    align: e.align
  };
}
function Na(e) {
  return {
    side: e.side,
    align: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[e.align]
  };
}
function ii(e) {
  return {
    side: e.align,
    align: e.side
  };
}
function oi(e) {
  return Jn(So, e.side) ? "y" : "x";
}
class ct {
  constructor(t) {
    const n = document.body.currentCSSZoom ?? 1, a = t instanceof Element, l = a ? 1 + (1 - n) / n : 1, {
      x: i,
      y: o,
      width: r,
      height: s
    } = a ? t.getBoundingClientRect() : t;
    this.x = i * l, this.y = o * l, this.width = r * l, this.height = s * l;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
}
function ri(e, t) {
  return {
    x: {
      before: Math.max(0, t.left - e.left),
      after: Math.max(0, e.right - t.right)
    },
    y: {
      before: Math.max(0, t.top - e.top),
      after: Math.max(0, e.bottom - t.bottom)
    }
  };
}
function wo(e) {
  if (Array.isArray(e)) {
    const t = document.body.currentCSSZoom ?? 1, n = 1 + (1 - t) / t;
    return new ct({
      x: e[0] * n,
      y: e[1] * n,
      width: 0 * n,
      height: 0 * n
    });
  } else
    return new ct(e);
}
function Iu(e) {
  if (e === document.documentElement)
    if (visualViewport) {
      const t = document.body.currentCSSZoom ?? 1;
      return new ct({
        x: visualViewport.scale > 1 ? 0 : visualViewport.offsetLeft,
        y: visualViewport.scale > 1 ? 0 : visualViewport.offsetTop,
        width: visualViewport.width * visualViewport.scale / t,
        height: visualViewport.height * visualViewport.scale / t
      });
    } else
      return new ct({
        x: 0,
        y: 0,
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      });
  else
    return new ct(e);
}
function Sl(e) {
  const t = new ct(e), n = getComputedStyle(e), a = n.transform;
  if (a) {
    let l, i, o, r, s;
    if (a.startsWith("matrix3d("))
      l = a.slice(9, -1).split(/, /), i = Number(l[0]), o = Number(l[5]), r = Number(l[12]), s = Number(l[13]);
    else if (a.startsWith("matrix("))
      l = a.slice(7, -1).split(/, /), i = Number(l[0]), o = Number(l[3]), r = Number(l[4]), s = Number(l[5]);
    else
      return new ct(t);
    const u = n.transformOrigin, c = t.x - r - (1 - i) * parseFloat(u), d = t.y - s - (1 - o) * parseFloat(u.slice(u.indexOf(" ") + 1)), f = i ? t.width / i : e.offsetWidth + 1, v = o ? t.height / o : e.offsetHeight + 1;
    return new ct({
      x: c,
      y: d,
      width: f,
      height: v
    });
  } else
    return new ct(t);
}
function It(e, t, n) {
  if (typeof e.animate > "u") return {
    finished: Promise.resolve()
  };
  let a;
  try {
    a = e.animate(t, n);
  } catch {
    return {
      finished: Promise.resolve()
    };
  }
  return typeof a.finished > "u" && (a.finished = new Promise((l) => {
    a.onfinish = () => {
      l(a);
    };
  })), a;
}
const Xn = /* @__PURE__ */ new WeakMap();
function Au(e, t) {
  Object.keys(t).forEach((n) => {
    if (hl(n)) {
      const a = yo(n), l = Xn.get(e);
      if (t[n] == null)
        l == null || l.forEach((i) => {
          const [o, r] = i;
          o === a && (e.removeEventListener(a, r), l.delete(i));
        });
      else if (!l || ![...l].some((i) => i[0] === a && i[1] === t[n])) {
        e.addEventListener(a, t[n]);
        const i = l || /* @__PURE__ */ new Set();
        i.add([a, t[n]]), Xn.has(e) || Xn.set(e, i);
      }
    } else
      t[n] == null ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
  });
}
function Tu(e, t) {
  Object.keys(t).forEach((n) => {
    if (hl(n)) {
      const a = yo(n), l = Xn.get(e);
      l == null || l.forEach((i) => {
        const [o, r] = i;
        o === a && (e.removeEventListener(a, r), l.delete(i));
      });
    } else
      e.removeAttribute(n);
  });
}
const qt = 2.4, si = 0.2126729, ui = 0.7151522, ci = 0.072175, Eu = 0.55, _u = 0.58, Bu = 0.57, Du = 0.62, Gn = 0.03, di = 1.45, Fu = 5e-4, Ou = 1.25, Lu = 1.25, fi = 0.078, vi = 12.82051282051282, Yn = 0.06, mi = 1e-3;
function gi(e, t) {
  const n = (e.r / 255) ** qt, a = (e.g / 255) ** qt, l = (e.b / 255) ** qt, i = (t.r / 255) ** qt, o = (t.g / 255) ** qt, r = (t.b / 255) ** qt;
  let s = n * si + a * ui + l * ci, u = i * si + o * ui + r * ci;
  if (s <= Gn && (s += (Gn - s) ** di), u <= Gn && (u += (Gn - u) ** di), Math.abs(u - s) < Fu) return 0;
  let c;
  if (u > s) {
    const d = (u ** Eu - s ** _u) * Ou;
    c = d < mi ? 0 : d < fi ? d - d * vi * Yn : d - Yn;
  } else {
    const d = (u ** Du - s ** Bu) * Lu;
    c = d > -mi ? 0 : d > -fi ? d - d * vi * Yn : d + Yn;
  }
  return c * 100;
}
const ta = 0.20689655172413793, Mu = (e) => e > ta ** 3 ? Math.cbrt(e) : e / (3 * ta ** 2) + 4 / 29, $u = (e) => e > ta ? e ** 3 : 3 * ta ** 2 * (e - 4 / 29);
function xo(e) {
  const t = Mu, n = t(e[1]);
  return [116 * n - 16, 500 * (t(e[0] / 0.95047) - n), 200 * (n - t(e[2] / 1.08883))];
}
function ko(e) {
  const t = $u, n = (e[0] + 16) / 116;
  return [t(n + e[1] / 500) * 0.95047, t(n), t(n - e[2] / 200) * 1.08883];
}
const Ru = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]], Nu = (e) => e <= 31308e-7 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - 0.055, Hu = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]], zu = (e) => e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
function Co(e) {
  const t = Array(3), n = Nu, a = Ru;
  for (let l = 0; l < 3; ++l)
    t[l] = Math.round($e(n(a[l][0] * e[0] + a[l][1] * e[1] + a[l][2] * e[2])) * 255);
  return {
    r: t[0],
    g: t[1],
    b: t[2]
  };
}
function wl(e) {
  let {
    r: t,
    g: n,
    b: a
  } = e;
  const l = [0, 0, 0], i = zu, o = Hu;
  t = i(t / 255), n = i(n / 255), a = i(a / 255);
  for (let r = 0; r < 3; ++r)
    l[r] = o[r][0] * t + o[r][1] * n + o[r][2] * a;
  return l;
}
function tl(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function Wu(e) {
  return tl(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const hi = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, ju = {
  rgb: (e, t, n, a) => ({
    r: e,
    g: t,
    b: n,
    a
  }),
  rgba: (e, t, n, a) => ({
    r: e,
    g: t,
    b: n,
    a
  }),
  hsl: (e, t, n, a) => yi({
    h: e,
    s: t,
    l: n,
    a
  }),
  hsla: (e, t, n, a) => yi({
    h: e,
    s: t,
    l: n,
    a
  }),
  hsv: (e, t, n, a) => xn({
    h: e,
    s: t,
    v: n,
    a
  }),
  hsva: (e, t, n, a) => xn({
    h: e,
    s: t,
    v: n,
    a
  })
};
function xt(e) {
  if (typeof e == "number")
    return (isNaN(e) || e < 0 || e > 16777215) && it(`'${e}' is not a valid hex color`), {
      r: (e & 16711680) >> 16,
      g: (e & 65280) >> 8,
      b: e & 255
    };
  if (typeof e == "string" && hi.test(e)) {
    const {
      groups: t
    } = e.match(hi), {
      fn: n,
      values: a
    } = t, l = a.split(/,\s*|\s*\/\s*|\s+/).map((i, o) => i.endsWith("%") || // unitless slv are %
    o > 0 && o < 3 && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(i) / 100 : parseFloat(i));
    return ju[n](...l);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    [3, 4].includes(t.length) ? t = t.split("").map((a) => a + a).join("") : [6, 8].includes(t.length) || it(`'${e}' is not a valid hex(a) color`);
    const n = parseInt(t, 16);
    return (isNaN(n) || n < 0 || n > 4294967295) && it(`'${e}' is not a valid hex(a) color`), Yu(t);
  } else if (typeof e == "object") {
    if ($a(e, ["r", "g", "b"]))
      return e;
    if ($a(e, ["h", "s", "l"]))
      return xn(po(e));
    if ($a(e, ["h", "s", "v"]))
      return xn(e);
  }
  throw new TypeError(`Invalid color: ${e == null ? e : String(e) || e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function xn(e) {
  const {
    h: t,
    s: n,
    v: a,
    a: l
  } = e, i = (r) => {
    const s = (r + t / 60) % 6;
    return a - a * n * Math.max(Math.min(s, 4 - s, 1), 0);
  }, o = [i(5), i(3), i(1)].map((r) => Math.round(r * 255));
  return {
    r: o[0],
    g: o[1],
    b: o[2],
    a: l
  };
}
function yi(e) {
  return xn(po(e));
}
function po(e) {
  const {
    h: t,
    s: n,
    l: a,
    a: l
  } = e, i = a + n * Math.min(a, 1 - a), o = i === 0 ? 0 : 2 - 2 * a / i;
  return {
    h: t,
    s: o,
    v: i,
    a: l
  };
}
function Un(e) {
  const t = Math.round(e).toString(16);
  return ("00".substr(0, 2 - t.length) + t).toUpperCase();
}
function Gu(e) {
  let {
    r: t,
    g: n,
    b: a,
    a: l
  } = e;
  return `#${[Un(t), Un(n), Un(a), l !== void 0 ? Un(Math.round(l * 255)) : ""].join("")}`;
}
function Yu(e) {
  e = Uu(e);
  let [t, n, a, l] = wu(e, 2).map((i) => parseInt(i, 16));
  return l = l === void 0 ? l : l / 255, {
    r: t,
    g: n,
    b: a,
    a: l
  };
}
function Uu(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = ni(ni(e, 6), 8, "F")), e;
}
function Ku(e, t) {
  const n = xo(wl(e));
  return n[0] = n[0] + t * 10, Co(ko(n));
}
function Xu(e, t) {
  const n = xo(wl(e));
  return n[0] = n[0] - t * 10, Co(ko(n));
}
function qu(e) {
  const t = xt(e);
  return wl(t)[1];
}
function Vo(e) {
  const t = Math.abs(gi(xt(0), xt(e)));
  return Math.abs(gi(xt(16777215), xt(e))) > Math.min(t, 50) ? "#fff" : "#000";
}
function O(e, t) {
  return (n) => Object.keys(e).reduce((a, l) => {
    const o = typeof e[l] == "object" && e[l] != null && !Array.isArray(e[l]) ? e[l] : {
      type: e[l]
    };
    return n && l in n ? a[l] = {
      ...o,
      default: n[l]
    } : a[l] = o, t && !a[l].source && (a[l].source = t), a;
  }, {});
}
const re = O({
  class: [String, Array, Object],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component");
function Ie(e, t) {
  const n = lu();
  if (!n)
    throw new Error(`[Vuetify] ${e} must be called from inside a setup function`);
  return n;
}
function kt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = Ie(e).type;
  return Rt((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
function Zu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ie("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
const ln = Symbol.for("vuetify:defaults");
function Qu(e) {
  return K(e);
}
function xl() {
  const e = ge(ln);
  if (!e) throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function ot(e, t) {
  const n = xl(), a = K(e), l = V(() => {
    if (ut(t == null ? void 0 : t.disabled)) return n.value;
    const o = ut(t == null ? void 0 : t.scoped), r = ut(t == null ? void 0 : t.reset), s = ut(t == null ? void 0 : t.root);
    if (a.value == null && !(o || r || s)) return n.value;
    let u = Ye(a.value, {
      prev: n.value
    });
    if (o) return u;
    if (r || s) {
      const c = Number(r || 1 / 0);
      for (let d = 0; d <= c && !(!u || !("prev" in u)); d++)
        u = u.prev;
      return u && typeof s == "string" && s in u && (u = Ye(Ye(u, {
        prev: u
      }), u[s])), u;
    }
    return u.prev ? Ye(u.prev, u) : u;
  });
  return Pe(ln, l), l;
}
function Ju(e, t) {
  return e.props && (typeof e.props[t] < "u" || typeof e.props[Rt(t)] < "u");
}
function ec() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : xl();
  const a = Ie("useDefaults");
  if (t = t ?? a.type.name ?? a.type.__name, !t)
    throw new Error("[Vuetify] Could not determine component name");
  const l = V(() => {
    var s;
    return (s = n.value) == null ? void 0 : s[e._as ?? t];
  }), i = new Proxy(e, {
    get(s, u) {
      var v, g, m, w;
      const c = Reflect.get(s, u);
      if (u === "class" || u === "style")
        return [(v = l.value) == null ? void 0 : v[u], c].filter((b) => b != null);
      if (Ju(a.vnode, u)) return c;
      const d = (g = l.value) == null ? void 0 : g[u];
      if (d !== void 0) return d;
      const f = (w = (m = n.value) == null ? void 0 : m.global) == null ? void 0 : w[u];
      return f !== void 0 ? f : c;
    }
  }), o = G();
  Le(() => {
    if (l.value) {
      const s = Object.entries(l.value).filter((u) => {
        let [c] = u;
        return c.startsWith(c[0].toUpperCase());
      });
      o.value = s.length ? Object.fromEntries(s) : void 0;
    } else
      o.value = void 0;
  });
  function r() {
    const s = Zu(ln, a);
    Pe(ln, V(() => o.value ? Ye((s == null ? void 0 : s.value) ?? {}, o.value) : s == null ? void 0 : s.value));
  }
  return {
    props: i,
    provideSubDefaults: r
  };
}
function fn(e) {
  if (e._setup = e._setup ?? e.setup, !e.name)
    return it("The component is missing an explicit name, unable to generate default prop value"), e;
  if (e._setup) {
    e.props = O(e.props ?? {}, e.name)();
    const t = Object.keys(e.props).filter((n) => n !== "class" && n !== "style");
    e.filterProps = function(a) {
      return Bt(a, t);
    }, e.props._as = String, e.setup = function(a, l) {
      const i = xl();
      if (!i.value) return e._setup(a, l);
      const {
        props: o,
        provideSubDefaults: r
      } = ec(a, a._as ?? e.name, i), s = e._setup(o, l);
      return r(), s;
    };
  }
  return e;
}
function U() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? fn : iu)(t);
}
function tc(e, t) {
  return t.props = e, t;
}
function ka(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return U()({
    name: n ?? dn(fl(e.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: t
      },
      ...re()
    },
    setup(a, l) {
      let {
        slots: i
      } = l;
      return () => {
        var o;
        return Gt(a.tag, {
          class: [e, a.class],
          style: a.style
        }, (o = i.default) == null ? void 0 : o.call(i));
      };
    }
  });
}
function nc(e, t, n, a) {
  if (!n || Dt(e) || Dt(t)) return;
  const l = n.get(e);
  if (l)
    l.set(t, a);
  else {
    const i = /* @__PURE__ */ new WeakMap();
    i.set(t, a), n.set(e, i);
  }
}
function ac(e, t, n) {
  var i, o;
  if (!n || Dt(e) || Dt(t)) return null;
  const a = (i = n.get(e)) == null ? void 0 : i.get(t);
  if (typeof a == "boolean") return a;
  const l = (o = n.get(t)) == null ? void 0 : o.get(e);
  return typeof l == "boolean" ? l : null;
}
function Ke(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : /* @__PURE__ */ new WeakMap();
  if (e === t) return !0;
  if (e instanceof Date && t instanceof Date && e.getTime() !== t.getTime() || e !== Object(e) || t !== Object(t))
    return !1;
  const a = Object.keys(e);
  if (a.length !== Object.keys(t).length)
    return !1;
  const l = ac(e, t, n);
  return l || (nc(e, t, n, !0), a.every((i) => Ke(e[i], t[i], n)));
}
function Po(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; ) e = e.parentNode;
    return e !== document ? null : document;
  }
  const t = e.getRootNode();
  return t !== document && t.getRootNode({
    composed: !0
  }) !== document ? null : t;
}
const kn = "cubic-bezier(0.4, 0, 0.2, 1)", bi = "cubic-bezier(0.0, 0, 0.2, 1)", Si = "cubic-bezier(0.4, 0, 1, 1)", lc = {
  linear: (e) => e,
  easeInQuad: (e) => e ** 2,
  easeOutQuad: (e) => e * (2 - e),
  easeInOutQuad: (e) => e < 0.5 ? 2 * e ** 2 : -1 + (4 - 2 * e) * e,
  easeInCubic: (e) => e ** 3,
  easeOutCubic: (e) => --e ** 3 + 1,
  easeInOutCubic: (e) => e < 0.5 ? 4 * e ** 3 : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1,
  easeInQuart: (e) => e ** 4,
  easeOutQuart: (e) => 1 - --e ** 4,
  easeInOutQuart: (e) => e < 0.5 ? 8 * e ** 4 : 1 - 8 * --e ** 4,
  easeInQuint: (e) => e ** 5,
  easeOutQuint: (e) => 1 + --e ** 5,
  easeInOutQuint: (e) => e < 0.5 ? 16 * e ** 5 : 1 + 16 * --e ** 5,
  instant: (e) => 1
};
function wi(e, t, n) {
  return Object.keys(e).filter((a) => hl(a) && a.endsWith(t)).reduce((a, l) => (a[l.slice(0, -t.length)] = (i) => xa(e[l], i, n(i)), a), {});
}
function kl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? ic(e) : Cl(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function na(e, t) {
  const n = [];
  if (t && e && !t.contains(e)) return n;
  for (; e && (Cl(e) && n.push(e), e !== t); )
    e = e.parentElement;
  return n;
}
function Cl(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e), n = t.overflowY === "scroll" || t.overflowY === "auto" && e.scrollHeight > e.clientHeight, a = t.overflowX === "scroll" || t.overflowX === "auto" && e.scrollWidth > e.clientWidth;
  return n || a;
}
function ic(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function oc(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function J(e) {
  const t = Ie("useRender");
  t.render = e;
}
function rc(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    leading: !0,
    trailing: !0
  }, a = 0, l = 0, i = !1, o = 0;
  function r() {
    clearTimeout(a), i = !1, o = 0;
  }
  const s = function() {
    for (var u = arguments.length, c = new Array(u), d = 0; d < u; d++)
      c[d] = arguments[d];
    clearTimeout(a);
    const f = Date.now();
    o || (o = f);
    const v = f - Math.max(o, l);
    function g() {
      l = Date.now(), a = setTimeout(r, t), e(...c);
    }
    i ? v >= t ? g() : n.trailing && (a = setTimeout(g, t - v)) : (i = !0, n.leading && g());
  };
  return s.clear = r, s.immediate = e, s;
}
const se = [String, Function, Object, Array], nl = Symbol.for("vuetify:icons"), Ca = O({
  icon: {
    type: se
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: [String, Object, Function],
    required: !0
  }
}, "icon"), xi = U()({
  name: "VComponentIcon",
  props: Ca(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return () => {
      const a = e.icon;
      return C(e.tag, null, {
        default: () => {
          var l;
          return [e.icon ? C(a, null, null) : (l = n.default) == null ? void 0 : l.call(n)];
        }
      });
    };
  }
}), Io = fn({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: Ca(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    return () => C(e.tag, j(n, {
      style: null
    }), {
      default: () => [I("svg", {
        class: "v-icon__svg",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-hidden": "true"
      }, [Array.isArray(e.icon) ? e.icon.map((a) => Array.isArray(a) ? I("path", {
        d: a[0],
        "fill-opacity": a[1]
      }, null) : I("path", {
        d: a
      }, null)) : I("path", {
        d: e.icon
      }, null)])]
    });
  }
});
fn({
  name: "VLigatureIcon",
  props: Ca(),
  setup(e) {
    return () => C(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
const Ao = fn({
  name: "VClassIcon",
  props: Ca(),
  setup(e) {
    return () => C(e.tag, {
      class: Q(e.icon)
    }, null);
  }
}), sc = (e) => {
  const t = ge(nl);
  if (!t) throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: V(() => {
      var s;
      const a = Oe(e);
      if (!a) return {
        component: xi
      };
      let l = a;
      if (typeof l == "string" && (l = l.trim(), l.startsWith("$") && (l = (s = t.aliases) == null ? void 0 : s[l.slice(1)])), l || it(`Could not find aliased icon "${a}"`), Array.isArray(l))
        return {
          component: Io,
          icon: l
        };
      if (typeof l != "string")
        return {
          component: xi,
          icon: l
        };
      const i = Object.keys(t.sets).find((u) => typeof l == "string" && l.startsWith(`${u}:`)), o = i ? l.slice(i.length + 1) : l;
      return {
        component: t.sets[i ?? t.defaultSet].component,
        icon: o
      };
    })
  };
}, uc = {
  collapse: "mdi-chevron-up",
  complete: "mdi-check",
  cancel: "mdi-close-circle",
  close: "mdi-close",
  delete: "mdi-close-circle",
  // delete (e.g. v-chip close)
  clear: "mdi-close-circle",
  success: "mdi-check-circle",
  info: "mdi-information",
  warning: "mdi-alert-circle",
  error: "mdi-close-circle",
  prev: "mdi-chevron-left",
  next: "mdi-chevron-right",
  checkboxOn: "mdi-checkbox-marked",
  checkboxOff: "mdi-checkbox-blank-outline",
  checkboxIndeterminate: "mdi-minus-box",
  delimiter: "mdi-circle",
  // for carousel
  sortAsc: "mdi-arrow-up",
  sortDesc: "mdi-arrow-down",
  expand: "mdi-chevron-down",
  menu: "mdi-menu",
  subgroup: "mdi-menu-down",
  dropdown: "mdi-menu-down",
  radioOn: "mdi-radiobox-marked",
  radioOff: "mdi-radiobox-blank",
  edit: "mdi-pencil",
  ratingEmpty: "mdi-star-outline",
  ratingFull: "mdi-star",
  ratingHalf: "mdi-star-half-full",
  loading: "mdi-cached",
  first: "mdi-page-first",
  last: "mdi-page-last",
  unfold: "mdi-unfold-more-horizontal",
  file: "mdi-paperclip",
  plus: "mdi-plus",
  minus: "mdi-minus",
  calendar: "mdi-calendar",
  treeviewCollapse: "mdi-menu-down",
  treeviewExpand: "mdi-menu-right",
  tableGroupCollapse: "mdi-chevron-down",
  tableGroupExpand: "mdi-chevron-right",
  eyeDropper: "mdi-eyedropper",
  upload: "mdi-cloud-upload",
  color: "mdi-palette",
  command: "mdi-apple-keyboard-command",
  ctrl: "mdi-apple-keyboard-control",
  space: "mdi-keyboard-space",
  shift: "mdi-apple-keyboard-shift",
  alt: "mdi-apple-keyboard-option",
  enter: "mdi-keyboard-return",
  arrowup: "mdi-arrow-up",
  arrowdown: "mdi-arrow-down",
  arrowleft: "mdi-arrow-left",
  arrowright: "mdi-arrow-right",
  backspace: "mdi-backspace",
  play: "mdi-play",
  pause: "mdi-pause",
  fullscreen: "mdi-fullscreen",
  fullscreenExit: "mdi-fullscreen-exit",
  volumeHigh: "mdi-volume-high",
  volumeMedium: "mdi-volume-medium",
  volumeLow: "mdi-volume-low",
  volumeOff: "mdi-volume-variant-off"
}, To = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (e) => Gt(Ao, {
    ...e,
    class: "mdi"
  })
};
function cc() {
  return {
    svg: {
      component: Io
    },
    class: {
      component: Ao
    }
  };
}
function dc(e) {
  const t = cc(), n = (e == null ? void 0 : e.defaultSet) ?? "mdi";
  return n === "mdi" && !t.mdi && (t.mdi = To), Ye({
    defaultSet: n,
    sets: t,
    aliases: {
      ...uc,
      /* eslint-disable max-len */
      vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", 0.6]],
      "vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z",
      "vuetify-play": ["m6.376 13.184-4.11-7.192C1.505 4.66 2.467 3 4.003 3h8.532l-.953 1.576-.006.01-.396.677c-.429.732-.214 1.507.194 2.015.404.503 1.092.878 1.869.806a3.72 3.72 0 0 1 1.005.022c.276.053.434.143.523.237.138.146.38.635-.25 2.09-.893 1.63-1.553 1.722-1.847 1.677-.213-.033-.468-.158-.756-.406a4.95 4.95 0 0 1-.8-.927c-.39-.564-1.04-.84-1.66-.846-.625-.006-1.316.27-1.693.921l-.478.826-.911 1.506Z", ["M9.093 11.552c.046-.079.144-.15.32-.148a.53.53 0 0 1 .43.207c.285.414.636.847 1.046 1.2.405.35.914.662 1.516.754 1.334.205 2.502-.698 3.48-2.495l.014-.028.013-.03c.687-1.574.774-2.852-.005-3.675-.37-.391-.861-.586-1.333-.676a5.243 5.243 0 0 0-1.447-.044c-.173.016-.393-.073-.54-.257-.145-.18-.127-.316-.082-.392l.393-.672L14.287 3h5.71c1.536 0 2.499 1.659 1.737 2.992l-7.997 13.996c-.768 1.344-2.706 1.344-3.473 0l-3.037-5.314 1.377-2.278.004-.006.004-.007.481-.831Z", 0.6]]
      /* eslint-enable max-len */
    }
  }, e);
}
function Je(e, t) {
  let n;
  function a() {
    n = Sn(), n.run(() => t.length ? t(() => {
      n == null || n.stop(), a();
    }) : t());
  }
  q(e, (l) => {
    l && !n ? a() : l || (n == null || n.stop(), n = void 0);
  }, {
    immediate: !0
  }), De(() => {
    n == null || n.stop();
  });
}
function fe(e, t, n) {
  let a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (d) => d, l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (d) => d;
  const i = Ie("useProxiedModel"), o = K(e[t] !== void 0 ? e[t] : n), r = Rt(t), u = r !== t ? V(() => {
    var d, f, v, g;
    return e[t], !!(((d = i.vnode.props) != null && d.hasOwnProperty(t) || (f = i.vnode.props) != null && f.hasOwnProperty(r)) && ((v = i.vnode.props) != null && v.hasOwnProperty(`onUpdate:${t}`) || (g = i.vnode.props) != null && g.hasOwnProperty(`onUpdate:${r}`)));
  }) : V(() => {
    var d, f;
    return e[t], !!((d = i.vnode.props) != null && d.hasOwnProperty(t) && ((f = i.vnode.props) != null && f.hasOwnProperty(`onUpdate:${t}`)));
  });
  Je(() => !u.value, () => {
    q(() => e[t], (d) => {
      o.value = d;
    });
  });
  const c = V({
    get() {
      const d = e[t];
      return a(u.value ? d : o.value);
    },
    set(d) {
      const f = l(d), v = pe(u.value ? e[t] : o.value);
      v === f || a(v) === d || (o.value = f, i == null || i.emit(`update:${t}`, f));
    }
  });
  return Object.defineProperty(c, "externalValue", {
    get: () => u.value ? e[t] : o.value
  }), c;
}
const fc = {
  badge: "Badge",
  open: "Open",
  close: "Close",
  dismiss: "Dismiss",
  confirmEdit: {
    ok: "OK",
    cancel: "Cancel"
  },
  dataIterator: {
    noResultsText: "No matching records found",
    loadingText: "Loading items..."
  },
  dataTable: {
    itemsPerPageText: "Rows per page:",
    ariaLabel: {
      sortDescending: "Sorted descending.",
      sortAscending: "Sorted ascending.",
      sortNone: "Not sorted.",
      activateNone: "Activate to remove sorting.",
      activateDescending: "Activate to sort descending.",
      activateAscending: "Activate to sort ascending."
    },
    sortBy: "Sort by"
  },
  dataFooter: {
    itemsPerPageText: "Items per page:",
    itemsPerPageAll: "All",
    nextPage: "Next page",
    prevPage: "Previous page",
    firstPage: "First page",
    lastPage: "Last page",
    pageText: "{0}-{1} of {2}"
  },
  dateRangeInput: {
    divider: "to"
  },
  datePicker: {
    itemsSelected: "{0} selected",
    range: {
      title: "Select dates",
      header: "Enter dates"
    },
    title: "Select date",
    header: "Enter date",
    input: {
      placeholder: "Enter date"
    },
    ariaLabel: {
      previousMonth: "Previous month",
      nextMonth: "Next month",
      selectYear: "Select year",
      previousYear: "Previous year",
      nextYear: "Next year",
      selectMonth: "Select month",
      selectDate: "{0}",
      // Full date format
      currentDate: "Today, {0}"
    }
  },
  noDataText: "No data available",
  carousel: {
    prev: "Previous visual",
    next: "Next visual",
    ariaLabel: {
      delimiter: "Carousel slide {0} of {1}"
    }
  },
  calendar: {
    moreEvents: "{0} more",
    today: "Today"
  },
  input: {
    clear: "Clear {0}",
    prependAction: "{0} prepended action",
    appendAction: "{0} appended action",
    otp: "Please enter OTP character {0}"
  },
  fileInput: {
    counter: "{0} files",
    counterSize: "{0} files ({1} in total)"
  },
  fileUpload: {
    title: "Drag and drop files here",
    divider: "or",
    browse: "Browse Files"
  },
  timePicker: {
    am: "AM",
    pm: "PM",
    title: "Select Time",
    hour: "Hour",
    minute: "Minute",
    second: "Second"
  },
  pagination: {
    ariaLabel: {
      root: "Pagination Navigation",
      next: "Next page",
      previous: "Previous page",
      page: "Go to page {0}",
      currentPage: "Page {0}, Current page",
      first: "First page",
      last: "Last page"
    }
  },
  stepper: {
    next: "Next",
    prev: "Previous"
  },
  rating: {
    ariaLabel: {
      item: "Rating {0} of {1}"
    }
  },
  loading: "Loading...",
  infiniteScroll: {
    loadMore: "Load more",
    empty: "No more"
  },
  rules: {
    required: "This field is required",
    email: "Please enter a valid email",
    number: "This field can only contain numbers",
    integer: "This field can only contain integer values",
    capital: "This field can only contain uppercase letters",
    maxLength: "You must enter a maximum of {0} characters",
    minLength: "You must enter a minimum of {0} characters",
    strictLength: "The length of the entered field is invalid",
    exclude: "The {0} character is not allowed",
    notEmpty: "Please choose at least one value",
    pattern: "Invalid format"
  },
  hotkey: {
    then: "then",
    ctrl: "Ctrl",
    command: "Command",
    space: "Space",
    shift: "Shift",
    alt: "Alt",
    enter: "Enter",
    escape: "Escape",
    upArrow: "Up Arrow",
    downArrow: "Down Arrow",
    leftArrow: "Left Arrow",
    rightArrow: "Right Arrow",
    backspace: "Backspace",
    option: "Option",
    plus: "plus",
    shortcut: "Keyboard shortcut: {0}",
    or: "or"
  },
  video: {
    play: "Play",
    pause: "Pause",
    seek: "Seek",
    volume: "Volume",
    showVolume: "Show volume control",
    mute: "Mute",
    unmute: "Unmute",
    enterFullscreen: "Full screen",
    exitFullscreen: "Exit full screen"
  },
  colorPicker: {
    ariaLabel: {
      eyedropper: "Select color with eyedropper",
      hueSlider: "Hue",
      alphaSlider: "Alpha",
      redInput: "Red value",
      greenInput: "Green value",
      blueInput: "Blue value",
      alphaInput: "Alpha value",
      hueInput: "Hue value",
      saturationInput: "Saturation value",
      lightnessInput: "Lightness value",
      hexInput: "HEX value",
      hexaInput: "HEX with alpha value",
      changeFormat: "Change color format"
    }
  }
}, ki = "$vuetify.", Ci = (e, t) => e.replace(/\{(\d+)\}/g, (n, a) => String(t[Number(a)])), Eo = (e, t, n) => function(a) {
  for (var l = arguments.length, i = new Array(l > 1 ? l - 1 : 0), o = 1; o < l; o++)
    i[o - 1] = arguments[o];
  if (!a.startsWith(ki))
    return Ci(a, i);
  const r = a.replace(ki, ""), s = e.value && n.value[e.value], u = t.value && n.value[t.value];
  let c = jt(s, r, null);
  return c || (it(`Translation key "${a}" not found in "${e.value}", trying fallback locale`), c = jt(u, r, null)), c || (nn(`Translation key "${a}" not found in fallback`), c = a), typeof c != "string" && (nn(`Translation key "${a}" has a non-string value`), c = a), Ci(c, i);
};
function pl(e, t) {
  return (n, a) => new Intl.NumberFormat([e.value, t.value], a).format(n);
}
function _o(e, t) {
  return pl(e, t)(0.1).includes(",") ? "," : ".";
}
function Ha(e, t, n) {
  const a = fe(e, t, e[t] ?? n.value);
  return a.value = e[t] ?? n.value, q(n, (l) => {
    e[t] == null && (a.value = n.value);
  }), a;
}
function Bo(e) {
  return (t) => {
    const n = Ha(t, "locale", e.current), a = Ha(t, "fallback", e.fallback), l = Ha(t, "messages", e.messages);
    return {
      name: "vuetify",
      current: n,
      fallback: a,
      messages: l,
      decimalSeparator: E(() => _o(n, a)),
      t: Eo(n, a, l),
      n: pl(n, a),
      provide: Bo({
        current: n,
        fallback: a,
        messages: l
      })
    };
  };
}
function vc(e) {
  const t = G((e == null ? void 0 : e.locale) ?? "en"), n = G((e == null ? void 0 : e.fallback) ?? "en"), a = K({
    en: fc,
    ...e == null ? void 0 : e.messages
  });
  return {
    name: "vuetify",
    current: t,
    fallback: n,
    messages: a,
    decimalSeparator: E(() => (e == null ? void 0 : e.decimalSeparator) ?? _o(t, n)),
    t: Eo(t, n, a),
    n: pl(t, n),
    provide: Bo({
      current: t,
      fallback: n,
      messages: a
    })
  };
}
const aa = Symbol.for("vuetify:locale");
function mc(e) {
  return e.name != null;
}
function gc(e) {
  const t = e != null && e.adapter && mc(e == null ? void 0 : e.adapter) ? e == null ? void 0 : e.adapter : vc(e), n = yc(t, e);
  return {
    ...t,
    ...n
  };
}
function yt() {
  const e = ge(aa);
  if (!e) throw new Error("[Vuetify] Could not find injected locale instance");
  return e;
}
function hc() {
  return {
    af: !1,
    ar: !0,
    bg: !1,
    ca: !1,
    ckb: !1,
    cs: !1,
    de: !1,
    el: !1,
    en: !1,
    es: !1,
    et: !1,
    fa: !0,
    fi: !1,
    fr: !1,
    hr: !1,
    hu: !1,
    he: !0,
    id: !1,
    it: !1,
    ja: !1,
    km: !1,
    ko: !1,
    lv: !1,
    lt: !1,
    nl: !1,
    no: !1,
    pl: !1,
    pt: !1,
    ro: !1,
    ru: !1,
    sk: !1,
    sl: !1,
    srCyrl: !1,
    srLatn: !1,
    sv: !1,
    th: !1,
    tr: !1,
    az: !1,
    uk: !1,
    vi: !1,
    zhHans: !1,
    zhHant: !1
  };
}
function yc(e, t) {
  const n = K((t == null ? void 0 : t.rtl) ?? hc()), a = V(() => n.value[e.current.value] ?? !1);
  return {
    isRtl: a,
    rtl: n,
    rtlClasses: E(() => `v-locale--is-${a.value ? "rtl" : "ltr"}`)
  };
}
function tt() {
  const e = ge(aa);
  if (!e) throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: e.isRtl,
    rtlClasses: e.rtlClasses
  };
}
function Dn(e) {
  const t = e.slice(-2).toUpperCase();
  switch (!0) {
    case e === "GB-alt-variant":
      return {
        firstDay: 0,
        firstWeekSize: 4
      };
    case e === "001":
      return {
        firstDay: 1,
        firstWeekSize: 1
      };
    case `AG AS BD BR BS BT BW BZ CA CO DM DO ET GT GU HK HN ID IL IN JM JP KE
    KH KR LA MH MM MO MT MX MZ NI NP PA PE PH PK PR PY SA SG SV TH TT TW UM US
    VE VI WS YE ZA ZW`.includes(t):
      return {
        firstDay: 0,
        firstWeekSize: 1
      };
    case `AI AL AM AR AU AZ BA BM BN BY CL CM CN CR CY EC GE HR KG KZ LB LK LV
    MD ME MK MN MY NZ RO RS SI TJ TM TR UA UY UZ VN XK`.includes(t):
      return {
        firstDay: 1,
        firstWeekSize: 1
      };
    case `AD AN AT AX BE BG CH CZ DE DK EE ES FI FJ FO FR GB GF GP GR HU IE IS
    IT LI LT LU MC MQ NL NO PL RE RU SE SK SM VA`.includes(t):
      return {
        firstDay: 1,
        firstWeekSize: 4
      };
    case "AE AF BH DJ DZ EG IQ IR JO KW LY OM QA SD SY".includes(t):
      return {
        firstDay: 6,
        firstWeekSize: 1
      };
    case t === "MV":
      return {
        firstDay: 5,
        firstWeekSize: 1
      };
    case t === "PT":
      return {
        firstDay: 0,
        firstWeekSize: 4
      };
    default:
      return null;
  }
}
function bc(e, t, n) {
  var c;
  const a = [];
  let l = [];
  const i = Do(e), o = Fo(e), r = n ?? ((c = Dn(t)) == null ? void 0 : c.firstDay) ?? 0, s = (i.getDay() - r + 7) % 7, u = (o.getDay() - r + 7) % 7;
  for (let d = 0; d < s; d++) {
    const f = new Date(i);
    f.setDate(f.getDate() - (s - d)), l.push(f);
  }
  for (let d = 1; d <= o.getDate(); d++) {
    const f = new Date(e.getFullYear(), e.getMonth(), d);
    l.push(f), l.length === 7 && (a.push(l), l = []);
  }
  for (let d = 1; d < 7 - u; d++) {
    const f = new Date(o);
    f.setDate(f.getDate() + d), l.push(f);
  }
  return l.length > 0 && a.push(l), a;
}
function bn(e, t, n) {
  var i;
  let a = (n ?? ((i = Dn(t)) == null ? void 0 : i.firstDay) ?? 0) % 7;
  [0, 1, 2, 3, 4, 5, 6].includes(a) || (it("Invalid firstDayOfWeek, expected discrete number in range [0-6]"), a = 0);
  const l = new Date(e);
  for (; l.getDay() !== a; )
    l.setDate(l.getDate() - 1);
  return l;
}
function Sc(e, t) {
  var l;
  const n = new Date(e), a = ((((l = Dn(t)) == null ? void 0 : l.firstDay) ?? 0) + 6) % 7;
  for (; n.getDay() !== a; )
    n.setDate(n.getDate() + 1);
  return n;
}
function Do(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Fo(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function wc(e) {
  const t = e.split("-").map(Number);
  return new Date(t[0], t[1] - 1, t[2]);
}
const xc = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function Oo(e) {
  if (e == null) return /* @__PURE__ */ new Date();
  if (e instanceof Date) return e;
  if (typeof e == "string") {
    let t;
    if (xc.test(e))
      return wc(e);
    if (t = Date.parse(e), !isNaN(t)) return new Date(t);
  }
  return null;
}
const pi = new Date(2e3, 0, 2);
function kc(e, t, n) {
  var l;
  const a = t ?? ((l = Dn(e)) == null ? void 0 : l.firstDay) ?? 0;
  return Jt(7).map((i) => {
    const o = new Date(pi);
    return o.setDate(pi.getDate() + a + i), new Intl.DateTimeFormat(e, {
      weekday: n ?? "narrow"
    }).format(o);
  });
}
function Cc(e, t, n, a) {
  const l = Oo(e) ?? /* @__PURE__ */ new Date(), i = a == null ? void 0 : a[t];
  if (typeof i == "function")
    return i(l, t, n);
  let o = {};
  switch (t) {
    case "fullDate":
      o = {
        year: "numeric",
        month: "short",
        day: "numeric"
      };
      break;
    case "fullDateWithWeekday":
      o = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      break;
    case "normalDate":
      const r = l.getDate(), s = new Intl.DateTimeFormat(n, {
        month: "long"
      }).format(l);
      return `${r} ${s}`;
    case "normalDateWithWeekday":
      o = {
        weekday: "short",
        day: "numeric",
        month: "short"
      };
      break;
    case "shortDate":
      o = {
        month: "short",
        day: "numeric"
      };
      break;
    case "year":
      o = {
        year: "numeric"
      };
      break;
    case "month":
      o = {
        month: "long"
      };
      break;
    case "monthShort":
      o = {
        month: "short"
      };
      break;
    case "monthAndYear":
      o = {
        month: "long",
        year: "numeric"
      };
      break;
    case "monthAndDate":
      o = {
        month: "long",
        day: "numeric"
      };
      break;
    case "weekday":
      o = {
        weekday: "long"
      };
      break;
    case "weekdayShort":
      o = {
        weekday: "short"
      };
      break;
    case "dayOfMonth":
      return new Intl.NumberFormat(n).format(l.getDate());
    case "hours12h":
      o = {
        hour: "numeric",
        hour12: !0
      };
      break;
    case "hours24h":
      o = {
        hour: "numeric",
        hour12: !1
      };
      break;
    case "minutes":
      o = {
        minute: "numeric"
      };
      break;
    case "seconds":
      o = {
        second: "numeric"
      };
      break;
    case "fullTime":
      o = {
        hour: "numeric",
        minute: "numeric"
      };
      break;
    case "fullTime12h":
      o = {
        hour: "numeric",
        minute: "numeric",
        hour12: !0
      };
      break;
    case "fullTime24h":
      o = {
        hour: "numeric",
        minute: "numeric",
        hour12: !1
      };
      break;
    case "fullDateTime":
      o = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      };
      break;
    case "fullDateTime12h":
      o = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: !0
      };
      break;
    case "fullDateTime24h":
      o = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: !1
      };
      break;
    case "keyboardDate":
      o = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      };
      break;
    case "keyboardDateTime":
      return o = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric"
      }, new Intl.DateTimeFormat(n, o).format(l).replace(/, /g, " ");
    case "keyboardDateTime12h":
      return o = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: !0
      }, new Intl.DateTimeFormat(n, o).format(l).replace(/, /g, " ");
    case "keyboardDateTime24h":
      return o = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: !1
      }, new Intl.DateTimeFormat(n, o).format(l).replace(/, /g, " ");
    default:
      o = i ?? {
        timeZone: "UTC",
        timeZoneName: "short"
      };
  }
  return new Intl.DateTimeFormat(n, o).format(l);
}
function pc(e, t) {
  const n = e.toJsDate(t), a = n.getFullYear(), l = ai(String(n.getMonth() + 1), 2, "0"), i = ai(String(n.getDate()), 2, "0");
  return `${a}-${l}-${i}`;
}
function Vc(e) {
  const [t, n, a] = e.split("-").map(Number);
  return new Date(t, n - 1, a);
}
function Pc(e, t) {
  const n = new Date(e);
  return n.setMinutes(n.getMinutes() + t), n;
}
function Ic(e, t) {
  const n = new Date(e);
  return n.setHours(n.getHours() + t), n;
}
function Ht(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t), n;
}
function Ac(e, t) {
  const n = new Date(e);
  return n.setDate(n.getDate() + t * 7), n;
}
function Tc(e, t) {
  const n = new Date(e);
  return n.setDate(1), n.setMonth(n.getMonth() + t), n;
}
function Cn(e) {
  return e.getFullYear();
}
function Ec(e) {
  return e.getMonth();
}
function _c(e, t, n, a) {
  const l = Dn(t), i = n ?? (l == null ? void 0 : l.firstDay) ?? 0, o = (l == null ? void 0 : l.firstWeekSize) ?? 1;
  return a !== void 0 ? Bc(e, t, i, a) : Dc(e, t, i, o);
}
function Bc(e, t, n, a) {
  const l = (7 + a - n) % 7, i = bn(e, t, n), o = Ht(i, 6);
  function r(f) {
    return (7 + new Date(f, 0, 1).getDay() - n) % 7;
  }
  let s = Cn(i);
  s < Cn(o) && r(s + 1) <= l && s++;
  const u = new Date(s, 0, 1), c = r(s), d = c <= l ? Ht(u, -c) : Ht(u, 7 - c);
  return 1 + ia(Vl(i), pn(d), "weeks");
}
function Dc(e, t, n, a) {
  const l = bn(e, t, n), i = Ht(bn(e, t, n), 6);
  function o(d) {
    const f = new Date(d, 0, 1);
    return 7 - ia(f, bn(f, t, n), "days");
  }
  let r = Cn(l);
  r < Cn(i) && o(r + 1) >= a && r++;
  const s = new Date(r, 0, 1), u = o(r), c = u >= a ? Ht(s, u - 7) : Ht(s, u);
  return 1 + ia(Vl(l), pn(c), "weeks");
}
function Fc(e) {
  return e.getDate();
}
function Oc(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 1);
}
function Lc(e) {
  return new Date(e.getFullYear(), e.getMonth() - 1, 1);
}
function Mc(e) {
  return e.getHours();
}
function $c(e) {
  return e.getMinutes();
}
function Rc(e) {
  return new Date(e.getFullYear(), 0, 1);
}
function Nc(e) {
  return new Date(e.getFullYear(), 11, 31);
}
function Hc(e, t) {
  return la(e, t[0]) && jc(e, t[1]);
}
function zc(e) {
  const t = new Date(e);
  return t instanceof Date && !isNaN(t.getTime());
}
function la(e, t) {
  return e.getTime() > t.getTime();
}
function Wc(e, t) {
  return la(pn(e), pn(t));
}
function jc(e, t) {
  return e.getTime() < t.getTime();
}
function Vi(e, t) {
  return e.getTime() === t.getTime();
}
function Gc(e, t) {
  return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function Yc(e, t) {
  return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function Uc(e, t) {
  return e.getFullYear() === t.getFullYear();
}
function ia(e, t, n) {
  const a = new Date(e), l = new Date(t);
  switch (n) {
    case "years":
      return a.getFullYear() - l.getFullYear();
    case "quarters":
      return Math.floor((a.getMonth() - l.getMonth() + (a.getFullYear() - l.getFullYear()) * 12) / 4);
    case "months":
      return a.getMonth() - l.getMonth() + (a.getFullYear() - l.getFullYear()) * 12;
    case "weeks":
      return Math.floor((a.getTime() - l.getTime()) / (1e3 * 60 * 60 * 24 * 7));
    case "days":
      return Math.floor((a.getTime() - l.getTime()) / (1e3 * 60 * 60 * 24));
    case "hours":
      return Math.floor((a.getTime() - l.getTime()) / (1e3 * 60 * 60));
    case "minutes":
      return Math.floor((a.getTime() - l.getTime()) / (1e3 * 60));
    case "seconds":
      return Math.floor((a.getTime() - l.getTime()) / 1e3);
    default:
      return a.getTime() - l.getTime();
  }
}
function Kc(e, t) {
  const n = new Date(e);
  return n.setHours(t), n;
}
function Xc(e, t) {
  const n = new Date(e);
  return n.setMinutes(t), n;
}
function qc(e, t) {
  const n = new Date(e);
  return n.setMonth(t), n;
}
function Zc(e, t) {
  const n = new Date(e);
  return n.setDate(t), n;
}
function Qc(e, t) {
  const n = new Date(e);
  return n.setFullYear(t), n;
}
function pn(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0, 0);
}
function Vl(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999);
}
class Jc {
  constructor(t) {
    this.locale = t.locale, this.formats = t.formats;
  }
  date(t) {
    return Oo(t);
  }
  toJsDate(t) {
    return t;
  }
  toISO(t) {
    return pc(this, t);
  }
  parseISO(t) {
    return Vc(t);
  }
  addMinutes(t, n) {
    return Pc(t, n);
  }
  addHours(t, n) {
    return Ic(t, n);
  }
  addDays(t, n) {
    return Ht(t, n);
  }
  addWeeks(t, n) {
    return Ac(t, n);
  }
  addMonths(t, n) {
    return Tc(t, n);
  }
  getWeekArray(t, n) {
    const a = n !== void 0 ? Number(n) : void 0;
    return bc(t, this.locale, a);
  }
  startOfWeek(t, n) {
    const a = n !== void 0 ? Number(n) : void 0;
    return bn(t, this.locale, a);
  }
  endOfWeek(t) {
    return Sc(t, this.locale);
  }
  startOfMonth(t) {
    return Do(t);
  }
  endOfMonth(t) {
    return Fo(t);
  }
  format(t, n) {
    return Cc(t, n, this.locale, this.formats);
  }
  isEqual(t, n) {
    return Vi(t, n);
  }
  isValid(t) {
    return zc(t);
  }
  isWithinRange(t, n) {
    return Hc(t, n);
  }
  isAfter(t, n) {
    return la(t, n);
  }
  isAfterDay(t, n) {
    return Wc(t, n);
  }
  isBefore(t, n) {
    return !la(t, n) && !Vi(t, n);
  }
  isSameDay(t, n) {
    return Gc(t, n);
  }
  isSameMonth(t, n) {
    return Yc(t, n);
  }
  isSameYear(t, n) {
    return Uc(t, n);
  }
  setMinutes(t, n) {
    return Xc(t, n);
  }
  setHours(t, n) {
    return Kc(t, n);
  }
  setMonth(t, n) {
    return qc(t, n);
  }
  setDate(t, n) {
    return Zc(t, n);
  }
  setYear(t, n) {
    return Qc(t, n);
  }
  getDiff(t, n, a) {
    return ia(t, n, a);
  }
  getWeekdays(t, n) {
    const a = t !== void 0 ? Number(t) : void 0;
    return kc(this.locale, a, n);
  }
  getYear(t) {
    return Cn(t);
  }
  getMonth(t) {
    return Ec(t);
  }
  getWeek(t, n, a) {
    const l = n !== void 0 ? Number(n) : void 0, i = a !== void 0 ? Number(a) : void 0;
    return _c(t, this.locale, l, i);
  }
  getDate(t) {
    return Fc(t);
  }
  getNextMonth(t) {
    return Oc(t);
  }
  getPreviousMonth(t) {
    return Lc(t);
  }
  getHours(t) {
    return Mc(t);
  }
  getMinutes(t) {
    return $c(t);
  }
  startOfDay(t) {
    return pn(t);
  }
  endOfDay(t) {
    return Vl(t);
  }
  startOfYear(t) {
    return Rc(t);
  }
  endOfYear(t) {
    return Nc(t);
  }
}
const ed = Symbol.for("vuetify:date-options"), Pi = Symbol.for("vuetify:date-adapter");
function td(e, t) {
  const n = Ye({
    adapter: Jc,
    locale: {
      af: "af-ZA",
      // ar: '', # not the same value for all variants
      bg: "bg-BG",
      ca: "ca-ES",
      ckb: "",
      cs: "cs-CZ",
      de: "de-DE",
      el: "el-GR",
      en: "en-US",
      // es: '', # not the same value for all variants
      et: "et-EE",
      fa: "fa-IR",
      fi: "fi-FI",
      // fr: '', #not the same value for all variants
      hr: "hr-HR",
      hu: "hu-HU",
      he: "he-IL",
      id: "id-ID",
      it: "it-IT",
      ja: "ja-JP",
      ko: "ko-KR",
      lv: "lv-LV",
      lt: "lt-LT",
      nl: "nl-NL",
      no: "no-NO",
      pl: "pl-PL",
      pt: "pt-PT",
      ro: "ro-RO",
      ru: "ru-RU",
      sk: "sk-SK",
      sl: "sl-SI",
      srCyrl: "sr-SP",
      srLatn: "sr-SP",
      sv: "sv-SE",
      th: "th-TH",
      tr: "tr-TR",
      az: "az-AZ",
      uk: "uk-UA",
      vi: "vi-VN",
      zhHans: "zh-CN",
      zhHant: "zh-TW"
    }
  }, e);
  return {
    options: n,
    instance: nd(n, t)
  };
}
function nd(e, t) {
  const n = Qe(typeof e.adapter == "function" ? new e.adapter({
    locale: e.locale[t.current.value] ?? t.current.value,
    formats: e.formats
  }) : e.adapter);
  return q(t.current, (a) => {
    n.locale = e.locale[a] ?? a ?? n.locale;
  }), n;
}
const pa = ["sm", "md", "lg", "xl", "xxl"], al = Symbol.for("vuetify:display"), Ii = {
  mobileBreakpoint: "lg",
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
}, ad = function() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Ii;
  return Ye(Ii, e);
};
function Ai(e) {
  return ye && !e ? window.innerWidth : typeof e == "object" && e.clientWidth || 0;
}
function Ti(e) {
  return ye && !e ? window.innerHeight : typeof e == "object" && e.clientHeight || 0;
}
function Ei(e) {
  const t = ye && !e ? window.navigator.userAgent : "ssr";
  function n(g) {
    return !!t.match(g);
  }
  const a = n(/android/i), l = n(/iphone|ipad|ipod/i), i = n(/cordova/i), o = n(/electron/i), r = n(/chrome/i), s = n(/edge/i), u = n(/firefox/i), c = n(/opera/i), d = n(/win/i), f = n(/mac/i), v = n(/linux/i);
  return {
    android: a,
    ios: l,
    cordova: i,
    electron: o,
    chrome: r,
    edge: s,
    firefox: u,
    opera: c,
    win: d,
    mac: f,
    linux: v,
    touch: hu,
    ssr: t === "ssr"
  };
}
function ld(e, t) {
  const {
    thresholds: n,
    mobileBreakpoint: a
  } = ad(e), l = G(Ti(t)), i = G(Ei(t)), o = Qe({}), r = G(Ai(t));
  function s() {
    l.value = Ti(), r.value = Ai();
  }
  function u() {
    s(), i.value = Ei();
  }
  return Le(() => {
    const c = r.value < n.sm, d = r.value < n.md && !c, f = r.value < n.lg && !(d || c), v = r.value < n.xl && !(f || d || c), g = r.value < n.xxl && !(v || f || d || c), m = r.value >= n.xxl, w = c ? "xs" : d ? "sm" : f ? "md" : v ? "lg" : g ? "xl" : "xxl", b = typeof a == "number" ? a : n[a], h = r.value < b;
    o.xs = c, o.sm = d, o.md = f, o.lg = v, o.xl = g, o.xxl = m, o.smAndUp = !c, o.mdAndUp = !(c || d), o.lgAndUp = !(c || d || f), o.xlAndUp = !(c || d || f || v), o.smAndDown = !(f || v || g || m), o.mdAndDown = !(v || g || m), o.lgAndDown = !(g || m), o.xlAndDown = !m, o.name = w, o.height = l.value, o.width = r.value, o.mobile = h, o.mobileBreakpoint = a, o.platform = i.value, o.thresholds = n;
  }), ye && (window.addEventListener("resize", s, {
    passive: !0
  }), De(() => {
    window.removeEventListener("resize", s);
  }, !0)), {
    ...ya(o),
    update: u,
    ssr: !!t
  };
}
const Fn = O({
  mobile: {
    type: Boolean,
    default: !1
  },
  mobileBreakpoint: [Number, String]
}, "display");
function Et() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
    mobile: null
  }, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : kt();
  const n = ge(al);
  if (!n) throw new Error("Could not find Vuetify display injection");
  const a = V(() => e.mobile ? !0 : typeof e.mobileBreakpoint == "number" ? n.width.value < e.mobileBreakpoint : e.mobileBreakpoint ? n.width.value < n.thresholds.value[e.mobileBreakpoint] : e.mobile === null ? n.mobile.value : !1), l = E(() => t ? {
    [`${t}--mobile`]: a.value
  } : {});
  return {
    ...n,
    displayClasses: l,
    mobile: a
  };
}
const Lo = Symbol.for("vuetify:goto");
function Mo() {
  return {
    container: void 0,
    duration: 300,
    layout: !1,
    offset: 0,
    easing: "easeInOutCubic",
    patterns: lc
  };
}
function id(e) {
  return Pl(e) ?? (document.scrollingElement || document.body);
}
function Pl(e) {
  return typeof e == "string" ? document.querySelector(e) : gl(e);
}
function za(e, t, n) {
  if (typeof e == "number") return t && n ? -e : e;
  let a = Pl(e), l = 0;
  for (; a; )
    l += t ? a.offsetLeft : a.offsetTop, a = a.offsetParent;
  return l;
}
function od(e, t) {
  return {
    rtl: t.isRtl,
    options: Ye(Mo(), e)
  };
}
async function _i(e, t, n, a) {
  const l = n ? "scrollLeft" : "scrollTop", i = Ye((a == null ? void 0 : a.options) ?? Mo(), t), o = a == null ? void 0 : a.rtl.value, r = (typeof e == "number" ? e : Pl(e)) ?? 0, s = i.container === "parent" && r instanceof HTMLElement ? r.parentElement : id(i.container), u = Wt() ? i.patterns.instant : typeof i.easing == "function" ? i.easing : i.patterns[i.easing];
  if (!u) throw new TypeError(`Easing function "${i.easing}" not found.`);
  let c;
  if (typeof r == "number")
    c = za(r, n, o);
  else if (c = za(r, n, o) - za(s, n, o), i.layout) {
    const g = window.getComputedStyle(r).getPropertyValue("--v-layout-top");
    g && (c -= parseInt(g, 10));
  }
  c += i.offset, c = sd(s, c, !!o, !!n);
  const d = s[l] ?? 0;
  if (c === d) return Promise.resolve(c);
  const f = performance.now();
  return new Promise((v) => requestAnimationFrame(function g(m) {
    const b = (m - f) / i.duration, h = Math.floor(d + (c - d) * u($e(b, 0, 1)));
    if (s[l] = h, b >= 1 && Math.abs(h - s[l]) < 10)
      return v(c);
    if (b > 2)
      return it("Scroll target is not reachable"), v(s[l]);
    requestAnimationFrame(g);
  }));
}
function rd() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const t = ge(Lo), {
    isRtl: n
  } = tt();
  if (!t) throw new Error("[Vuetify] Could not find injected goto instance");
  const a = {
    ...t,
    // can be set via VLocaleProvider
    rtl: E(() => t.rtl.value || n.value)
  };
  async function l(i, o) {
    return _i(i, Ye(e, o), !1, a);
  }
  return l.horizontal = async (i, o) => _i(i, Ye(e, o), !0, a), l;
}
function sd(e, t, n, a) {
  const {
    scrollWidth: l,
    scrollHeight: i
  } = e, [o, r] = e === document.scrollingElement ? [window.innerWidth, window.innerHeight] : [e.offsetWidth, e.offsetHeight];
  let s, u;
  return a ? n ? (s = -(l - o), u = 0) : (s = 0, u = l - o) : (s = 0, u = i + -r), $e(t, s, u);
}
const Vn = Symbol.for("vuetify:theme"), Ce = O({
  theme: String
}, "theme");
function Bi() {
  return {
    defaultTheme: "light",
    prefix: "v-",
    variations: {
      colors: [],
      lighten: 0,
      darken: 0
    },
    themes: {
      light: {
        dark: !1,
        colors: {
          background: "#FFFFFF",
          surface: "#FFFFFF",
          "surface-bright": "#FFFFFF",
          "surface-light": "#EEEEEE",
          "surface-variant": "#424242",
          "on-surface-variant": "#EEEEEE",
          primary: "#1867C0",
          "primary-darken-1": "#1F5592",
          secondary: "#48A9A6",
          "secondary-darken-1": "#018786",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00"
        },
        variables: {
          "border-color": "#000000",
          "border-opacity": 0.12,
          "high-emphasis-opacity": 0.87,
          "medium-emphasis-opacity": 0.6,
          "disabled-opacity": 0.38,
          "idle-opacity": 0.04,
          "hover-opacity": 0.04,
          "focus-opacity": 0.12,
          "selected-opacity": 0.08,
          "activated-opacity": 0.12,
          "pressed-opacity": 0.12,
          "dragged-opacity": 0.08,
          "theme-kbd": "#EEEEEE",
          "theme-on-kbd": "#000000",
          "theme-code": "#F5F5F5",
          "theme-on-code": "#000000"
        }
      },
      dark: {
        dark: !0,
        colors: {
          background: "#121212",
          surface: "#212121",
          "surface-bright": "#ccbfd6",
          "surface-light": "#424242",
          "surface-variant": "#c8c8c8",
          "on-surface-variant": "#000000",
          primary: "#2196F3",
          "primary-darken-1": "#277CC1",
          secondary: "#54B6B2",
          "secondary-darken-1": "#48A9A6",
          error: "#CF6679",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00"
        },
        variables: {
          "border-color": "#FFFFFF",
          "border-opacity": 0.12,
          "high-emphasis-opacity": 1,
          "medium-emphasis-opacity": 0.7,
          "disabled-opacity": 0.5,
          "idle-opacity": 0.1,
          "hover-opacity": 0.04,
          "focus-opacity": 0.12,
          "selected-opacity": 0.08,
          "activated-opacity": 0.12,
          "pressed-opacity": 0.16,
          "dragged-opacity": 0.08,
          "theme-kbd": "#424242",
          "theme-on-kbd": "#FFFFFF",
          "theme-code": "#343434",
          "theme-on-code": "#CCCCCC"
        }
      }
    },
    stylesheetId: "vuetify-theme-stylesheet",
    scoped: !1,
    unimportant: !1,
    utilities: !0
  };
}
function ud() {
  var a, l;
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Bi();
  const t = Bi();
  if (!e) return {
    ...t,
    isDisabled: !0
  };
  const n = {};
  for (const [i, o] of Object.entries(e.themes ?? {})) {
    const r = o.dark || i === "dark" ? (a = t.themes) == null ? void 0 : a.dark : (l = t.themes) == null ? void 0 : l.light;
    n[i] = Ye(r, o);
  }
  return Ye(t, {
    ...e,
    themes: n
  });
}
function $t(e, t, n, a) {
  e.push(`${vd(t, a)} {
`, ...n.map((l) => `  ${l};
`), `}
`);
}
function Di(e, t) {
  const n = e.dark ? 2 : 1, a = e.dark ? 1 : 2, l = [];
  for (const [i, o] of Object.entries(e.colors)) {
    const r = xt(o);
    l.push(`--${t}theme-${i}: ${r.r},${r.g},${r.b}`), i.startsWith("on-") || l.push(`--${t}theme-${i}-overlay-multiplier: ${qu(o) > 0.18 ? n : a}`);
  }
  for (const [i, o] of Object.entries(e.variables)) {
    const r = typeof o == "string" && o.startsWith("#") ? xt(o) : void 0, s = r ? `${r.r}, ${r.g}, ${r.b}` : void 0;
    l.push(`--${t}${i}: ${s ?? o}`);
  }
  return l;
}
function cd(e, t, n) {
  const a = {};
  if (n)
    for (const l of ["lighten", "darken"]) {
      const i = l === "lighten" ? Ku : Xu;
      for (const o of Jt(n[l], 1))
        a[`${e}-${l}-${o}`] = Gu(i(xt(t), o));
    }
  return a;
}
function dd(e, t) {
  if (!t) return {};
  let n = {};
  for (const a of t.colors) {
    const l = e[a];
    l && (n = {
      ...n,
      ...cd(a, l, t)
    });
  }
  return n;
}
function fd(e) {
  const t = {};
  for (const n of Object.keys(e)) {
    if (n.startsWith("on-") || e[`on-${n}`]) continue;
    const a = `on-${n}`, l = xt(e[n]);
    t[a] = Vo(l);
  }
  return t;
}
function vd(e, t) {
  if (!t) return e;
  const n = `:where(${t})`;
  return e === ":root" ? n : `${n} ${e}`;
}
function md(e, t, n) {
  const a = gd(e, t);
  a && (a.innerHTML = n);
}
function gd(e, t) {
  if (!ye) return null;
  let n = document.getElementById(e);
  return n || (n = document.createElement("style"), n.id = e, n.type = "text/css", t && n.setAttribute("nonce", t), document.head.appendChild(n)), n;
}
function hd(e) {
  const t = ud(e), n = G(t.defaultTheme), a = K(t.themes), l = G("light"), i = V({
    get() {
      return n.value === "system" ? l.value : n.value;
    },
    set(b) {
      n.value = b;
    }
  }), o = V(() => {
    const b = {};
    for (const [h, y] of Object.entries(a.value)) {
      const x = {
        ...y.colors,
        ...dd(y.colors, t.variations)
      };
      b[h] = {
        ...y,
        colors: {
          ...x,
          ...fd(x)
        }
      };
    }
    return b;
  }), r = E(() => o.value[i.value]), s = E(() => n.value === "system"), u = V(() => {
    var p;
    const b = [], h = t.unimportant ? "" : " !important", y = t.scoped ? t.prefix : "";
    (p = r.value) != null && p.dark && $t(b, ":root", ["color-scheme: dark"], t.scope), $t(b, ":root", Di(r.value, t.prefix), t.scope);
    for (const [k, P] of Object.entries(o.value))
      $t(b, `.${t.prefix}theme--${k}`, [`color-scheme: ${P.dark ? "dark" : "normal"}`, ...Di(P, t.prefix)], t.scope);
    if (t.utilities) {
      const k = [], P = [], S = new Set(Object.values(o.value).flatMap((A) => Object.keys(A.colors)));
      for (const A of S)
        A.startsWith("on-") ? $t(P, `.${A}`, [`color: rgb(var(--${t.prefix}theme-${A}))${h}`], t.scope) : ($t(k, `.${y}bg-${A}`, [`--${t.prefix}theme-overlay-multiplier: var(--${t.prefix}theme-${A}-overlay-multiplier)`, `background-color: rgb(var(--${t.prefix}theme-${A}))${h}`, `color: rgb(var(--${t.prefix}theme-on-${A}))${h}`], t.scope), $t(P, `.${y}text-${A}`, [`color: rgb(var(--${t.prefix}theme-${A}))${h}`], t.scope), $t(P, `.${y}border-${A}`, [`--${t.prefix}border-color: var(--${t.prefix}theme-${A})`], t.scope));
      t.layers ? b.push(`@layer background {
`, ...k.map((A) => `  ${A}`), `}
`, `@layer foreground {
`, ...P.map((A) => `  ${A}`), `}
`) : b.push(...k, ...P);
    }
    let x = b.map((k, P) => P === 0 ? k : `    ${k}`).join("");
    return t.layers && (x = `@layer vuetify.theme {
` + b.map((k) => `  ${k}`).join("") + `
}`), x;
  }), c = E(() => t.isDisabled ? void 0 : `${t.prefix}theme--${i.value}`), d = E(() => Object.keys(o.value));
  if (uo) {
    let h = function() {
      l.value = b.matches ? "dark" : "light";
    };
    const b = window.matchMedia("(prefers-color-scheme: dark)");
    h(), b.addEventListener("change", h, {
      passive: !0
    }), ou() && De(() => {
      b.removeEventListener("change", h);
    });
  }
  function f(b) {
    if (t.isDisabled) return;
    const h = b._context.provides.usehead;
    if (h) {
      let y = function() {
        return {
          style: [{
            textContent: u.value,
            id: t.stylesheetId,
            nonce: t.cspNonce || !1
          }]
        };
      };
      if (h.push) {
        const x = h.push(y);
        ye && q(u, () => {
          x.patch(y);
        });
      } else
        ye ? (h.addHeadObjs(E(y)), Le(() => h.updateDOM())) : h.addHeadObjs(y());
    } else {
      let y = function() {
        md(t.stylesheetId, t.cspNonce, u.value);
      };
      ye ? q(u, y, {
        immediate: !0
      }) : y();
    }
  }
  function v(b) {
    if (b !== "system" && !d.value.includes(b)) {
      it(`Theme "${b}" not found on the Vuetify theme instance`);
      return;
    }
    i.value = b;
  }
  function g() {
    let b = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : d.value;
    const h = b.indexOf(i.value), y = h === -1 ? 0 : (h + 1) % b.length;
    v(b[y]);
  }
  function m() {
    let b = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["light", "dark"];
    g(b);
  }
  const w = new Proxy(i, {
    get(b, h) {
      return Reflect.get(b, h);
    },
    set(b, h, y) {
      return h === "value" && so(`theme.global.name.value = ${y}`, `theme.change('${y}')`), Reflect.set(b, h, y);
    }
  });
  return {
    install: f,
    change: v,
    cycle: g,
    toggle: m,
    isDisabled: t.isDisabled,
    isSystem: s,
    name: i,
    themes: a,
    current: r,
    computedThemes: o,
    prefix: t.prefix,
    themeClasses: c,
    styles: u,
    global: {
      name: w,
      current: r
    }
  };
}
function Ae(e) {
  Ie("provideTheme");
  const t = ge(Vn, null);
  if (!t) throw new Error("Could not find Vuetify theme injection");
  const n = E(() => e.theme ?? t.name.value), a = E(() => t.themes.value[n.value]), l = E(() => t.isDisabled ? void 0 : `${t.prefix}theme--${n.value}`), i = {
    ...t,
    name: n,
    current: a,
    themeClasses: l
  };
  return Pe(Vn, i), i;
}
function yd() {
  Ie("useTheme");
  const e = ge(Vn, null);
  if (!e) throw new Error("Could not find Vuetify theme injection");
  return e;
}
function Ft(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = Qa(), a = K();
  if (ye) {
    const l = new ResizeObserver((i) => {
      e == null || e(i, l), i.length && (t === "content" ? a.value = i[0].contentRect : a.value = i[0].target.getBoundingClientRect());
    });
    et(() => {
      l.disconnect();
    }), q(() => n.el, (i, o) => {
      o && (l.unobserve(o), a.value = void 0), i && l.observe(i);
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef: n,
    contentRect: ba(a)
  };
}
const Pn = Symbol.for("vuetify:layout"), $o = Symbol.for("vuetify:layout-item"), Fi = 1e3, bd = O({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, "layout"), Ro = O({
  name: {
    type: String
  },
  order: {
    type: [Number, String],
    default: 0
  },
  absolute: Boolean
}, "layout-item");
function No() {
  const e = ge(Pn);
  if (!e) throw new Error("[Vuetify] Could not find injected layout");
  return {
    getLayoutItem: e.getLayoutItem,
    mainRect: e.mainRect,
    mainStyles: e.mainStyles
  };
}
function Ho(e) {
  const t = ge(Pn);
  if (!t) throw new Error("[Vuetify] Could not find injected layout");
  const n = e.id ?? `layout-item-${ht()}`, a = Ie("useLayoutItem");
  Pe($o, {
    id: n
  });
  const l = G(!1);
  ro(() => l.value = !0), ru(() => l.value = !1);
  const {
    layoutItemStyles: i,
    layoutItemScrimStyles: o
  } = t.register(a, {
    ...e,
    active: V(() => l.value ? !1 : e.active.value),
    id: n
  });
  return et(() => t.unregister(n)), {
    layoutItemStyles: i,
    layoutRect: t.layoutRect,
    layoutItemScrimStyles: o
  };
}
const Sd = (e, t, n, a) => {
  let l = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  const i = [{
    id: "",
    layer: {
      ...l
    }
  }];
  for (const o of e) {
    const r = t.get(o), s = n.get(o), u = a.get(o);
    if (!r || !s || !u) continue;
    const c = {
      ...l,
      [r.value]: parseInt(l[r.value], 10) + (u.value ? parseInt(s.value, 10) : 0)
    };
    i.push({
      id: o,
      layer: c
    }), l = c;
  }
  return i;
};
function wd(e) {
  const t = ge(Pn, null), n = V(() => t ? t.rootZIndex.value - 100 : Fi), a = K([]), l = Qe(/* @__PURE__ */ new Map()), i = Qe(/* @__PURE__ */ new Map()), o = Qe(/* @__PURE__ */ new Map()), r = Qe(/* @__PURE__ */ new Map()), s = Qe(/* @__PURE__ */ new Map()), {
    resizeRef: u,
    contentRect: c
  } = Ft(), d = V(() => {
    const k = /* @__PURE__ */ new Map(), P = e.overlaps ?? [];
    for (const S of P.filter((A) => A.includes(":"))) {
      const [A, T] = S.split(":");
      if (!a.value.includes(A) || !a.value.includes(T)) continue;
      const _ = l.get(A), B = l.get(T), F = i.get(A), D = i.get(T);
      !_ || !B || !F || !D || (k.set(T, {
        position: _.value,
        amount: parseInt(F.value, 10)
      }), k.set(A, {
        position: B.value,
        amount: -parseInt(D.value, 10)
      }));
    }
    return k;
  }), f = V(() => {
    const k = [...new Set([...o.values()].map((S) => S.value))].sort((S, A) => S - A), P = [];
    for (const S of k) {
      const A = a.value.filter((T) => {
        var _;
        return ((_ = o.get(T)) == null ? void 0 : _.value) === S;
      });
      P.push(...A);
    }
    return Sd(P, l, i, r);
  }), v = V(() => !Array.from(s.values()).some((k) => k.value)), g = V(() => f.value[f.value.length - 1].layer), m = E(() => ({
    "--v-layout-left": X(g.value.left),
    "--v-layout-right": X(g.value.right),
    "--v-layout-top": X(g.value.top),
    "--v-layout-bottom": X(g.value.bottom),
    ...v.value ? void 0 : {
      transition: "none"
    }
  })), w = V(() => f.value.slice(1).map((k, P) => {
    let {
      id: S
    } = k;
    const {
      layer: A
    } = f.value[P], T = i.get(S), _ = l.get(S);
    return {
      id: S,
      ...A,
      size: Number(T.value),
      position: _.value
    };
  })), b = (k) => w.value.find((P) => P.id === k), h = Ie("createLayout"), y = G(!1);
  gt(() => {
    y.value = !0;
  }), Pe(Pn, {
    register: (k, P) => {
      let {
        id: S,
        order: A,
        position: T,
        layoutSize: _,
        elementSize: B,
        active: F,
        disableTransitions: D,
        absolute: L
      } = P;
      o.set(S, A), l.set(S, T), i.set(S, _), r.set(S, F), D && s.set(S, D);
      const z = en($o, h == null ? void 0 : h.vnode).indexOf(k);
      z > -1 ? a.value.splice(z, 0, S) : a.value.push(S);
      const ee = V(() => w.value.findIndex((M) => M.id === S)), ie = V(() => n.value + f.value.length * 2 - ee.value * 2), $ = V(() => {
        const M = T.value === "left" || T.value === "right", N = T.value === "right", te = T.value === "bottom", W = B.value ?? _.value, ae = W === 0 ? "%" : "px", R = {
          [T.value]: 0,
          zIndex: ie.value,
          transform: `translate${M ? "X" : "Y"}(${(F.value ? 0 : -(W === 0 ? 100 : W)) * (N || te ? -1 : 1)}${ae})`,
          position: L.value || n.value !== Fi ? "absolute" : "fixed",
          ...v.value ? void 0 : {
            transition: "none"
          }
        };
        if (!y.value) return R;
        const le = w.value[ee.value];
        le || it(`[Vuetify] Could not find layout item "${S}"`);
        const ve = d.value.get(S);
        return ve && (le[ve.position] += ve.amount), {
          ...R,
          height: M ? `calc(100% - ${le.top}px - ${le.bottom}px)` : B.value ? `${B.value}px` : void 0,
          left: N ? void 0 : `${le.left}px`,
          right: N ? `${le.right}px` : void 0,
          top: T.value !== "bottom" ? `${le.top}px` : void 0,
          bottom: T.value !== "top" ? `${le.bottom}px` : void 0,
          width: M ? B.value ? `${B.value}px` : void 0 : `calc(100% - ${le.left}px - ${le.right}px)`
        };
      }), Z = V(() => ({
        zIndex: ie.value - 1
      }));
      return {
        layoutItemStyles: $,
        layoutItemScrimStyles: Z,
        zIndex: ie
      };
    },
    unregister: (k) => {
      o.delete(k), l.delete(k), i.delete(k), r.delete(k), s.delete(k), a.value = a.value.filter((P) => P !== k);
    },
    mainRect: g,
    mainStyles: m,
    getLayoutItem: b,
    items: w,
    layoutRect: c,
    rootZIndex: n
  });
  const x = E(() => ["v-layout", {
    "v-layout--full-height": e.fullHeight
  }]), p = E(() => ({
    zIndex: t ? n.value : void 0,
    position: t ? "relative" : void 0,
    overflow: t ? "hidden" : void 0
  }));
  return {
    layoutClasses: x,
    layoutStyles: p,
    getLayoutItem: b,
    items: w,
    layoutRect: c,
    layoutRef: u
  };
}
function xd() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: t,
    ...n
  } = e, a = Ye(t, n), {
    aliases: l = {},
    components: i = {},
    directives: o = {}
  } = a, r = Sn();
  return r.run(() => {
    const s = Qu(a.defaults), u = ld(a.display, a.ssr), c = hd(a.theme), d = dc(a.icons), f = gc(a.locale), v = td(a.date, f), g = od(a.goTo, f);
    function m(b) {
      for (const y in o)
        b.directive(y, o[y]);
      for (const y in i)
        b.component(y, i[y]);
      for (const y in l)
        b.component(y, fn({
          ...l[y],
          name: y,
          aliasName: l[y].name
        }));
      const h = Sn();
      if (h.run(() => {
        c.install(b);
      }), b.onUnmount(() => h.stop()), b.provide(ln, s), b.provide(al, u), b.provide(Vn, c), b.provide(nl, d), b.provide(aa, f), b.provide(ed, v.options), b.provide(Pi, v.instance), b.provide(Lo, g), ye && a.ssr)
        if (b.$nuxt)
          b.$nuxt.hook("app:suspense:resolve", () => {
            u.update();
          });
        else {
          const {
            mount: y
          } = b;
          b.mount = function() {
            const x = y(...arguments);
            return me(() => u.update()), b.mount = y, x;
          };
        }
      b.mixin({
        computed: {
          $vuetify() {
            return Qe({
              defaults: Zt.call(this, ln),
              display: Zt.call(this, al),
              theme: Zt.call(this, Vn),
              icons: Zt.call(this, nl),
              locale: Zt.call(this, aa),
              date: Zt.call(this, Pi)
            });
          }
        }
      });
    }
    function w() {
      r.stop();
    }
    return {
      install: m,
      unmount: w,
      defaults: s,
      display: u,
      theme: c,
      icons: d,
      locale: f,
      date: v,
      goTo: g
    };
  });
}
const kd = "3.11.6";
xd.version = kd;
function Zt(e) {
  var a, l;
  const t = this.$, n = ((a = t.parent) == null ? void 0 : a.provides) ?? ((l = t.vnode.appContext) == null ? void 0 : l.provides);
  if (n && e in n)
    return n[e];
}
const ug = {
  defaults: {
    VAppBar: {
      flat: !0
    },
    VAutocomplete: {
      variant: "outlined"
    },
    VBanner: {
      color: "primary"
    },
    VBottomSheet: {
      contentClass: "rounded-t-xl overflow-hidden"
    },
    VBtn: {
      color: "primary",
      rounded: "xl"
    },
    VBtnGroup: {
      rounded: "xl",
      VBtn: {
        rounded: null
      }
    },
    VCard: {
      rounded: "lg"
    },
    VCheckbox: {
      color: "secondary",
      inset: !0
    },
    VChip: {
      rounded: "sm"
    },
    VCombobox: {
      variant: "outlined"
    },
    VDateInput: {
      variant: "outlined"
    },
    VDatePicker: {
      controlHeight: 48,
      color: "primary",
      divided: !0,
      headerColor: "",
      elevation: 3,
      rounded: "xl",
      VBtn: {
        color: "high-emphasis",
        rounded: "circle"
      }
    },
    VFileInput: {
      variant: "outlined"
    },
    VList: {
      prependGap: 16
    },
    VNavigationDrawer: {
      // VList: {
      //   nav: true,
      //   VListItem: {
      //     rounded: 'xl',
      //   },
      // },
    },
    VNumberInput: {
      variant: "outlined",
      VBtn: {
        color: void 0,
        rounded: void 0
      }
    },
    VSelect: {
      variant: "outlined"
    },
    VSlider: {
      color: "primary"
    },
    VTabs: {
      color: "primary"
    },
    VTextarea: {
      variant: "outlined"
    },
    VTextField: {
      variant: "outlined"
    },
    VToolbar: {
      VBtn: {
        color: null
      }
    }
  },
  icons: {
    defaultSet: "mdi",
    sets: {
      mdi: To
    }
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#6750a4",
          secondary: "#b4b0bb",
          tertiary: "#7d5260",
          error: "#b3261e",
          surface: "#fffbfe"
        }
      }
    }
  }
}, Cd = {
  lighten4: "#c8e6c9",
  darken1: "#43a047"
}, cg = {
  green: Cd
}, pd = O({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function rt(e, t, n) {
  return U()({
    name: e,
    props: pd({
      mode: n,
      origin: t
    }),
    setup(a, l) {
      let {
        slots: i
      } = l;
      const o = {
        onBeforeEnter(r) {
          a.origin && (r.style.transformOrigin = a.origin);
        },
        onLeave(r) {
          if (a.leaveAbsolute) {
            const {
              offsetTop: s,
              offsetLeft: u,
              offsetWidth: c,
              offsetHeight: d
            } = r;
            r._transitionInitialStyles = {
              position: r.style.position,
              top: r.style.top,
              left: r.style.left,
              width: r.style.width,
              height: r.style.height
            }, r.style.position = "absolute", r.style.top = `${s}px`, r.style.left = `${u}px`, r.style.width = `${c}px`, r.style.height = `${d}px`;
          }
          a.hideOnLeave && r.style.setProperty("display", "none", "important");
        },
        onAfterLeave(r) {
          if (a.leaveAbsolute && (r != null && r._transitionInitialStyles)) {
            const {
              position: s,
              top: u,
              left: c,
              width: d,
              height: f
            } = r._transitionInitialStyles;
            delete r._transitionInitialStyles, r.style.position = s || "", r.style.top = u || "", r.style.left = c || "", r.style.width = d || "", r.style.height = f || "";
          }
        }
      };
      return () => {
        const r = a.group ? vl : _t;
        return Gt(r, {
          name: a.disabled ? "" : e,
          css: !a.disabled,
          ...a.group ? void 0 : {
            mode: a.mode
          },
          ...a.disabled ? {} : o
        }, i.default);
      };
    }
  });
}
function zo(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return U()({
    name: e,
    props: {
      mode: {
        type: String,
        default: n
      },
      disabled: {
        type: Boolean,
        default: Wt()
      },
      group: Boolean
    },
    setup(a, l) {
      let {
        slots: i
      } = l;
      const o = a.group ? vl : _t;
      return () => Gt(o, {
        name: a.disabled ? "" : e,
        css: !a.disabled,
        // mode: props.mode, // TODO: vuejs/vue-next#3104
        ...a.disabled ? {} : t
      }, i.default);
    }
  });
}
function Wo() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1) ? "width" : "height", a = fl(`offset-${n}`);
  return {
    onBeforeEnter(o) {
      o._parent = o.parentNode, o._initialStyle = {
        transition: o.style.transition,
        overflow: o.style.overflow,
        [n]: o.style[n]
      };
    },
    onEnter(o) {
      const r = o._initialStyle;
      if (!r) return;
      o.style.setProperty("transition", "none", "important"), o.style.overflow = "hidden";
      const s = `${o[a]}px`;
      o.style[n] = "0", o.offsetHeight, o.style.transition = r.transition, e && o._parent && o._parent.classList.add(e), requestAnimationFrame(() => {
        o.style[n] = s;
      });
    },
    onAfterEnter: i,
    onEnterCancelled: i,
    onLeave(o) {
      o._initialStyle = {
        transition: "",
        overflow: o.style.overflow,
        [n]: o.style[n]
      }, o.style.overflow = "hidden", o.style[n] = `${o[a]}px`, o.offsetHeight, requestAnimationFrame(() => o.style[n] = "0");
    },
    onAfterLeave: l,
    onLeaveCancelled: l
  };
  function l(o) {
    e && o._parent && o._parent.classList.remove(e), i(o);
  }
  function i(o) {
    if (!o._initialStyle) return;
    const r = o._initialStyle[n];
    o.style.overflow = o._initialStyle.overflow, r != null && (o.style[n] = r), delete o._initialStyle;
  }
}
const Vd = O({
  target: [Object, Array]
}, "v-dialog-transition"), Wa = /* @__PURE__ */ new WeakMap(), Il = U()({
  name: "VDialogTransition",
  props: Vd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = {
      onBeforeEnter(l) {
        l.style.pointerEvents = "none", l.style.visibility = "hidden";
      },
      async onEnter(l, i) {
        var f;
        await new Promise((v) => requestAnimationFrame(v)), await new Promise((v) => requestAnimationFrame(v)), l.style.visibility = "";
        const o = Li(e.target, l), {
          x: r,
          y: s,
          sx: u,
          sy: c,
          speed: d
        } = o;
        if (Wa.set(l, o), Wt())
          It(l, [{
            opacity: 0
          }, {}], {
            duration: 125 * d,
            easing: bi
          }).finished.then(() => i());
        else {
          const v = It(l, [{
            transform: `translate(${r}px, ${s}px) scale(${u}, ${c})`,
            opacity: 0
          }, {}], {
            duration: 225 * d,
            easing: bi
          });
          (f = Oi(l)) == null || f.forEach((g) => {
            It(g, [{
              opacity: 0
            }, {
              opacity: 0,
              offset: 0.33
            }, {}], {
              duration: 225 * 2 * d,
              easing: kn
            });
          }), v.finished.then(() => i());
        }
      },
      onAfterEnter(l) {
        l.style.removeProperty("pointer-events");
      },
      onBeforeLeave(l) {
        l.style.pointerEvents = "none";
      },
      async onLeave(l, i) {
        var f;
        await new Promise((v) => requestAnimationFrame(v));
        let o;
        !Wa.has(l) || Array.isArray(e.target) || e.target.offsetParent || e.target.getClientRects().length ? o = Li(e.target, l) : o = Wa.get(l);
        const {
          x: r,
          y: s,
          sx: u,
          sy: c,
          speed: d
        } = o;
        Wt() ? It(l, [{}, {
          opacity: 0
        }], {
          duration: 85 * d,
          easing: Si
        }).finished.then(() => i()) : (It(l, [{}, {
          transform: `translate(${r}px, ${s}px) scale(${u}, ${c})`,
          opacity: 0
        }], {
          duration: 125 * d,
          easing: Si
        }).finished.then(() => i()), (f = Oi(l)) == null || f.forEach((g) => {
          It(g, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * d,
            easing: kn
          });
        }));
      },
      onAfterLeave(l) {
        l.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? C(_t, j({
      name: "dialog-transition"
    }, a, {
      css: !1
    }), n) : C(_t, {
      name: "dialog-transition"
    }, n);
  }
});
function Oi(e) {
  var n;
  const t = (n = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : n.children;
  return t && [...t];
}
function Li(e, t) {
  const n = wo(e), a = Sl(t), [l, i] = getComputedStyle(t).transformOrigin.split(" ").map((b) => parseFloat(b)), [o, r] = getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let s = n.left + n.width / 2;
  o === "left" || r === "left" ? s -= n.width / 2 : (o === "right" || r === "right") && (s += n.width / 2);
  let u = n.top + n.height / 2;
  o === "top" || r === "top" ? u -= n.height / 2 : (o === "bottom" || r === "bottom") && (u += n.height / 2);
  const c = n.width / a.width, d = n.height / a.height, f = Math.max(1, c, d), v = c / f || 0, g = d / f || 0, m = a.width * a.height / (window.innerWidth * window.innerHeight), w = m > 0.12 ? Math.min(1.5, (m - 0.12) * 10 + 1) : 1;
  return {
    x: s - (l + a.left),
    y: u - (i + a.top),
    sx: v,
    sy: g,
    speed: w
  };
}
rt("fab-transition", "center center", "out-in");
rt("dialog-bottom-transition");
rt("dialog-top-transition");
const Mi = rt("fade-transition");
rt("scale-transition");
rt("scroll-x-transition");
rt("scroll-x-reverse-transition");
rt("scroll-y-transition");
rt("scroll-y-reverse-transition");
rt("slide-x-transition");
rt("slide-x-reverse-transition");
const jo = rt("slide-y-transition");
rt("slide-y-reverse-transition");
const Go = zo("expand-transition", Wo()), Yo = zo("expand-x-transition", Wo("", !0)), Pd = O({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), ke = U(!1)({
  name: "VDefaultsProvider",
  props: Pd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      defaults: a,
      disabled: l,
      reset: i,
      root: o,
      scoped: r
    } = ya(e);
    return ot(a, {
      reset: i,
      root: o,
      scoped: r,
      disabled: l
    }), () => {
      var s;
      return (s = n.default) == null ? void 0 : s.call(n);
    };
  }
}), ll = Symbol.for("vuetify:list");
function Uo() {
  let {
    filterable: e
  } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
    filterable: !1
  };
  const t = ge(ll, {
    filterable: !1,
    hasPrepend: G(!1),
    updateHasPrepend: () => null
  }), n = {
    filterable: t.filterable || e,
    hasPrepend: G(!1),
    updateHasPrepend: (a) => {
      a && (n.hasPrepend.value = a);
    }
  };
  return Pe(ll, n), t;
}
function Ko() {
  return ge(ll, null);
}
const Al = (e) => {
  const t = {
    activate: (n) => {
      let {
        id: a,
        value: l,
        activated: i
      } = n;
      return a = pe(a), e && !l && i.size === 1 && i.has(a) || (l ? i.add(a) : i.delete(a)), i;
    },
    in: (n, a, l) => {
      let i = /* @__PURE__ */ new Set();
      if (n != null)
        for (const o of Me(n))
          i = t.activate({
            id: o,
            value: !0,
            activated: new Set(i),
            children: a,
            parents: l
          });
      return i;
    },
    out: (n) => Array.from(n)
  };
  return t;
}, Xo = (e) => {
  const t = Al(e);
  return {
    activate: (a) => {
      let {
        activated: l,
        id: i,
        ...o
      } = a;
      i = pe(i);
      const r = l.has(i) ? /* @__PURE__ */ new Set([i]) : /* @__PURE__ */ new Set();
      return t.activate({
        ...o,
        id: i,
        activated: r
      });
    },
    in: (a, l, i) => {
      let o = /* @__PURE__ */ new Set();
      if (a != null) {
        const r = Me(a);
        r.length && (o = t.in(r.slice(0, 1), l, i));
      }
      return o;
    },
    out: (a, l, i) => t.out(a, l, i)
  };
}, Id = (e) => {
  const t = Al(e);
  return {
    activate: (a) => {
      let {
        id: l,
        activated: i,
        children: o,
        ...r
      } = a;
      return l = pe(l), o.has(l) ? i : t.activate({
        id: l,
        activated: i,
        children: o,
        ...r
      });
    },
    in: t.in,
    out: t.out
  };
}, Ad = (e) => {
  const t = Xo(e);
  return {
    activate: (a) => {
      let {
        id: l,
        activated: i,
        children: o,
        ...r
      } = a;
      return l = pe(l), o.has(l) ? i : t.activate({
        id: l,
        activated: i,
        children: o,
        ...r
      });
    },
    in: t.in,
    out: t.out
  };
}, Td = {
  open: (e) => {
    let {
      id: t,
      value: n,
      opened: a,
      parents: l
    } = e;
    if (n) {
      const i = /* @__PURE__ */ new Set();
      i.add(t);
      let o = l.get(t);
      for (; o != null; )
        i.add(o), o = l.get(o);
      return i;
    } else
      return a.delete(t), a;
  },
  select: () => null
}, qo = {
  open: (e) => {
    let {
      id: t,
      value: n,
      opened: a,
      parents: l
    } = e;
    if (n) {
      let i = l.get(t);
      for (a.add(t); i != null && i !== t; )
        a.add(i), i = l.get(i);
      return a;
    } else
      a.delete(t);
    return a;
  },
  select: () => null
}, Ed = {
  open: qo.open,
  select: (e) => {
    let {
      id: t,
      value: n,
      opened: a,
      parents: l
    } = e;
    if (!n) return a;
    const i = [];
    let o = l.get(t);
    for (; o != null; )
      i.push(o), o = l.get(o);
    return new Set(i);
  }
}, Tl = (e) => {
  const t = {
    select: (n) => {
      let {
        id: a,
        value: l,
        selected: i
      } = n;
      if (a = pe(a), e && !l) {
        const o = Array.from(i.entries()).reduce((r, s) => {
          let [u, c] = s;
          return c === "on" && r.push(u), r;
        }, []);
        if (o.length === 1 && o[0] === a) return i;
      }
      return i.set(a, l ? "on" : "off"), i;
    },
    in: (n, a, l, i) => {
      const o = /* @__PURE__ */ new Map();
      for (const r of n || [])
        t.select({
          id: r,
          value: !0,
          selected: o,
          children: a,
          parents: l,
          disabled: i
        });
      return o;
    },
    out: (n) => {
      const a = [];
      for (const [l, i] of n.entries())
        i === "on" && a.push(l);
      return a;
    }
  };
  return t;
}, Zo = (e) => {
  const t = Tl(e);
  return {
    select: (a) => {
      let {
        selected: l,
        id: i,
        ...o
      } = a;
      i = pe(i);
      const r = l.has(i) ? /* @__PURE__ */ new Map([[i, l.get(i)]]) : /* @__PURE__ */ new Map();
      return t.select({
        ...o,
        id: i,
        selected: r
      });
    },
    in: (a, l, i, o) => a != null && a.length ? t.in(a.slice(0, 1), l, i, o) : /* @__PURE__ */ new Map(),
    out: (a, l, i) => t.out(a, l, i)
  };
}, _d = (e) => {
  const t = Tl(e);
  return {
    select: (a) => {
      let {
        id: l,
        selected: i,
        children: o,
        ...r
      } = a;
      return l = pe(l), o.has(l) ? i : t.select({
        id: l,
        selected: i,
        children: o,
        ...r
      });
    },
    in: t.in,
    out: t.out
  };
}, Bd = (e) => {
  const t = Zo(e);
  return {
    select: (a) => {
      let {
        id: l,
        selected: i,
        children: o,
        ...r
      } = a;
      return l = pe(l), o.has(l) ? i : t.select({
        id: l,
        selected: i,
        children: o,
        ...r
      });
    },
    in: t.in,
    out: t.out
  };
}, Qo = (e) => {
  const t = {
    select: (n) => {
      let {
        id: a,
        value: l,
        selected: i,
        children: o,
        parents: r,
        disabled: s
      } = n;
      a = pe(a);
      const u = new Map(i), c = [a];
      for (; c.length; ) {
        const f = c.shift();
        s.has(f) || i.set(pe(f), l ? "on" : "off"), o.has(f) && c.push(...o.get(f));
      }
      let d = pe(r.get(a));
      for (; d; ) {
        let f = !0, v = !0;
        for (const g of o.get(d)) {
          const m = pe(g);
          if (!s.has(m) && (i.get(m) !== "on" && (f = !1), i.has(m) && i.get(m) !== "off" && (v = !1), !f && !v))
            break;
        }
        i.set(d, f ? "on" : v ? "off" : "indeterminate"), d = pe(r.get(d));
      }
      return e && !l && Array.from(i.entries()).reduce((v, g) => {
        let [m, w] = g;
        return w === "on" && v.push(m), v;
      }, []).length === 0 ? u : i;
    },
    in: (n, a, l) => {
      let i = /* @__PURE__ */ new Map();
      for (const o of n || [])
        i = t.select({
          id: o,
          value: !0,
          selected: i,
          children: a,
          parents: l,
          disabled: /* @__PURE__ */ new Set()
        });
      return i;
    },
    out: (n, a) => {
      const l = [];
      for (const [i, o] of n.entries())
        o === "on" && !a.has(i) && l.push(i);
      return l;
    }
  };
  return t;
}, Dd = (e) => {
  const t = Qo(e);
  return {
    select: t.select,
    in: t.in,
    out: (a, l, i) => {
      const o = [];
      for (const [r, s] of a.entries())
        if (s === "on") {
          if (i.has(r)) {
            const u = i.get(r);
            if (a.get(u) === "on") continue;
          }
          o.push(r);
        }
      return o;
    }
  };
}, on = Symbol.for("vuetify:nested"), Jo = {
  id: G(),
  root: {
    itemsRegistration: K("render"),
    register: () => null,
    unregister: () => null,
    updateDisabled: () => null,
    children: K(/* @__PURE__ */ new Map()),
    parents: K(/* @__PURE__ */ new Map()),
    disabled: K(/* @__PURE__ */ new Set()),
    open: () => null,
    openOnSelect: () => null,
    activate: () => null,
    select: () => null,
    activatable: K(!1),
    selectable: K(!1),
    opened: K(/* @__PURE__ */ new Set()),
    activated: K(/* @__PURE__ */ new Set()),
    selected: K(/* @__PURE__ */ new Map()),
    selectedValues: K([]),
    getPath: () => []
  }
}, Fd = O({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function, Object],
  selectStrategy: [String, Function, Object],
  openStrategy: [String, Object],
  opened: null,
  activated: null,
  selected: null,
  mandatory: Boolean,
  itemsRegistration: {
    type: String,
    default: "render"
  }
}, "nested"), Od = (e, t, n) => {
  let a = !1;
  const l = G(/* @__PURE__ */ new Map()), i = G(/* @__PURE__ */ new Map()), o = G(/* @__PURE__ */ new Set()), r = fe(e, "opened", e.opened, (y) => new Set(Array.isArray(y) ? y.map((x) => pe(x)) : y), (y) => [...y.values()]), s = V(() => {
    if (typeof e.activeStrategy == "object") return e.activeStrategy;
    if (typeof e.activeStrategy == "function") return e.activeStrategy(e.mandatory);
    switch (e.activeStrategy) {
      case "leaf":
        return Id(e.mandatory);
      case "single-leaf":
        return Ad(e.mandatory);
      case "independent":
        return Al(e.mandatory);
      case "single-independent":
      default:
        return Xo(e.mandatory);
    }
  }), u = V(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    if (typeof e.selectStrategy == "function") return e.selectStrategy(e.mandatory);
    switch (e.selectStrategy) {
      case "single-leaf":
        return Bd(e.mandatory);
      case "leaf":
        return _d(e.mandatory);
      case "independent":
        return Tl(e.mandatory);
      case "single-independent":
        return Zo(e.mandatory);
      case "trunk":
        return Dd(e.mandatory);
      case "classic":
      default:
        return Qo(e.mandatory);
    }
  }), c = V(() => {
    if (typeof e.openStrategy == "object") return e.openStrategy;
    switch (e.openStrategy) {
      case "list":
        return Ed;
      case "single":
        return Td;
      case "multiple":
      default:
        return qo;
    }
  }), d = fe(e, "activated", e.activated, (y) => s.value.in(y, l.value, i.value), (y) => s.value.out(y, l.value, i.value)), f = fe(e, "selected", e.selected, (y) => u.value.in(y, l.value, i.value, o.value), (y) => u.value.out(y, l.value, i.value));
  et(() => {
    a = !0;
  });
  function v(y) {
    const x = [];
    let p = pe(y);
    for (; p !== void 0; )
      x.unshift(p), p = i.value.get(p);
    return x;
  }
  const g = Ie("nested"), m = /* @__PURE__ */ new Set(), w = rc(() => {
    me(() => {
      l.value = new Map(l.value), i.value = new Map(i.value);
    });
  }, 100);
  q(() => [t.value, Oe(n)], () => {
    e.itemsRegistration === "props" && b();
  }, {
    immediate: !0
  });
  function b() {
    const y = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Set(), k = Oe(n) ? (A) => pe(A.raw) : (A) => A.value, P = [...t.value];
    let S = 0;
    for (; S < P.length; ) {
      const A = P[S++], T = k(A);
      if (A.children) {
        const _ = [];
        for (const B of A.children) {
          const F = k(B);
          y.set(F, T), _.push(F), P.push(B);
        }
        x.set(T, _);
      }
      A.props.disabled && p.add(T);
    }
    l.value = x, i.value = y, o.value = p;
  }
  const h = {
    id: G(),
    root: {
      opened: r,
      activatable: E(() => e.activatable),
      selectable: E(() => e.selectable),
      activated: d,
      selected: f,
      selectedValues: V(() => {
        const y = [];
        for (const [x, p] of f.value.entries())
          p === "on" && y.push(x);
        return y;
      }),
      itemsRegistration: E(() => e.itemsRegistration),
      register: (y, x, p, k) => {
        if (m.has(y)) {
          const P = v(y).map(String).join(" -> "), S = v(x).concat(y).map(String).join(" -> ");
          nn(`Multiple nodes with the same ID
	${P}
	${S}`);
          return;
        } else
          m.add(y);
        x && y !== x && i.value.set(y, x), p && o.value.add(y), k && l.value.set(y, []), x != null && l.value.set(x, [...l.value.get(x) || [], y]), w();
      },
      unregister: (y) => {
        if (a) return;
        m.delete(y), l.value.delete(y), o.value.delete(y);
        const x = i.value.get(y);
        if (x) {
          const p = l.value.get(x) ?? [];
          l.value.set(x, p.filter((k) => k !== y));
        }
        i.value.delete(y), w();
      },
      updateDisabled: (y, x) => {
        x ? o.value.add(y) : o.value.delete(y);
      },
      open: (y, x, p) => {
        g.emit("click:open", {
          id: y,
          value: x,
          path: v(y),
          event: p
        });
        const k = c.value.open({
          id: y,
          value: x,
          opened: new Set(r.value),
          children: l.value,
          parents: i.value,
          event: p
        });
        k && (r.value = k);
      },
      openOnSelect: (y, x, p) => {
        const k = c.value.select({
          id: y,
          value: x,
          selected: new Map(f.value),
          opened: new Set(r.value),
          children: l.value,
          parents: i.value,
          event: p
        });
        k && (r.value = k);
      },
      select: (y, x, p) => {
        g.emit("click:select", {
          id: y,
          value: x,
          path: v(y),
          event: p
        });
        const k = u.value.select({
          id: y,
          value: x,
          selected: new Map(f.value),
          children: l.value,
          parents: i.value,
          disabled: o.value,
          event: p
        });
        k && (f.value = k), h.root.openOnSelect(y, x, p);
      },
      activate: (y, x, p) => {
        if (!e.activatable)
          return h.root.select(y, !0, p);
        g.emit("click:activate", {
          id: y,
          value: x,
          path: v(y),
          event: p
        });
        const k = s.value.activate({
          id: y,
          value: x,
          activated: new Set(d.value),
          children: l.value,
          parents: i.value,
          event: p
        });
        if (k.size !== d.value.size)
          d.value = k;
        else {
          for (const P of k)
            if (!d.value.has(P)) {
              d.value = k;
              return;
            }
          for (const P of d.value)
            if (!k.has(P)) {
              d.value = k;
              return;
            }
        }
      },
      children: l,
      parents: i,
      disabled: o,
      getPath: v
    }
  };
  return Pe(on, h), h.root;
}, er = (e, t, n) => {
  const a = ge(on, Jo), l = Symbol("nested item"), i = V(() => {
    const r = pe(Oe(e));
    return r !== void 0 ? r : l;
  }), o = {
    ...a,
    id: i,
    open: (r, s) => a.root.open(i.value, r, s),
    openOnSelect: (r, s) => a.root.openOnSelect(i.value, r, s),
    isOpen: V(() => a.root.opened.value.has(i.value)),
    parent: V(() => a.root.parents.value.get(i.value)),
    activate: (r, s) => a.root.activate(i.value, r, s),
    isActivated: V(() => a.root.activated.value.has(i.value)),
    select: (r, s) => a.root.select(i.value, r, s),
    isSelected: V(() => a.root.selected.value.get(i.value) === "on"),
    isIndeterminate: V(() => a.root.selected.value.get(i.value) === "indeterminate"),
    isLeaf: V(() => !a.root.children.value.get(i.value)),
    isGroupActivator: a.isGroupActivator
  };
  return Sa(() => {
    a.isGroupActivator || a.root.itemsRegistration.value === "props" || me(() => {
      a.root.register(i.value, a.id.value, Oe(t), n);
    });
  }), et(() => {
    a.isGroupActivator || a.root.itemsRegistration.value === "props" || a.root.unregister(i.value);
  }), q(i, (r, s) => {
    a.isGroupActivator || a.root.itemsRegistration.value === "props" || (a.root.unregister(s), me(() => {
      a.root.register(r, a.id.value, Oe(t), n);
    }));
  }), q(() => Oe(t), (r) => {
    a.root.updateDisabled(i.value, r);
  }), n && Pe(on, o), o;
}, Ld = () => {
  const e = ge(on, Jo);
  Pe(on, {
    ...e,
    isGroupActivator: !0
  });
};
function On() {
  const e = G(!1);
  return gt(() => {
    window.requestAnimationFrame(() => {
      e.value = !0;
    });
  }), {
    ssrBootStyles: E(() => e.value ? void 0 : {
      transition: "none !important"
    }),
    isBooted: ba(e)
  };
}
const he = O({
  tag: {
    type: [String, Object, Function],
    default: "div"
  }
}, "tag"), Ln = O({
  transition: {
    type: null,
    default: "fade-transition",
    validator: (e) => e !== !0
  }
}, "transition"), At = (e, t) => {
  let {
    slots: n
  } = t;
  const {
    transition: a,
    disabled: l,
    group: i,
    ...o
  } = e, {
    component: r = i ? vl : _t,
    ...s
  } = wn(a) ? a : {};
  let u;
  return wn(a) ? u = j(s, Vu({
    disabled: l,
    group: i
  }), o) : u = j({
    name: l || !a ? "" : a
  }, o), Gt(r, u, n);
}, Md = fn({
  name: "VListGroupActivator",
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Ld(), () => {
      var a;
      return (a = n.default) == null ? void 0 : a.call(n);
    };
  }
}), $d = O({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: se,
    default: "$collapse"
  },
  disabled: Boolean,
  expandIcon: {
    type: se,
    default: "$expand"
  },
  rawId: [String, Number],
  prependIcon: se,
  appendIcon: se,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,
  ...re(),
  ...he()
}, "VListGroup"), $i = U()({
  name: "VListGroup",
  props: $d(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isOpen: a,
      open: l,
      id: i
    } = er(() => e.value, () => e.disabled, !0), o = V(() => `v-list-group--id-${String(e.rawId ?? i.value)}`), r = Ko(), {
      isBooted: s
    } = On(), u = ge(on), c = E(() => {
      var m;
      return ((m = u == null ? void 0 : u.root) == null ? void 0 : m.itemsRegistration.value) === "render";
    });
    function d(m) {
      var w;
      ["INPUT", "TEXTAREA"].includes((w = m.target) == null ? void 0 : w.tagName) || l(!a.value, m);
    }
    const f = V(() => ({
      onClick: d,
      class: "v-list-group__header",
      id: o.value
    })), v = V(() => a.value ? e.collapseIcon : e.expandIcon), g = V(() => ({
      VListItem: {
        activeColor: e.activeColor,
        baseColor: e.baseColor,
        color: e.color,
        prependIcon: e.prependIcon || e.subgroup && v.value,
        appendIcon: e.appendIcon || !e.subgroup && v.value,
        title: e.title,
        value: e.value
      }
    }));
    return J(() => C(e.tag, {
      class: Q(["v-list-group", {
        "v-list-group--prepend": r == null ? void 0 : r.hasPrepend.value,
        "v-list-group--fluid": e.fluid,
        "v-list-group--subgroup": e.subgroup,
        "v-list-group--open": a.value
      }, e.class]),
      style: oe(e.style)
    }, {
      default: () => [n.activator && C(ke, {
        defaults: g.value
      }, {
        default: () => [C(Md, null, {
          default: () => [n.activator({
            props: f.value,
            isOpen: a.value
          })]
        })]
      }), C(At, {
        transition: {
          component: Go
        },
        disabled: !s.value
      }, {
        default: () => {
          var m, w;
          return [c.value ? ze(I("div", {
            class: "v-list-group__items",
            role: "group",
            "aria-labelledby": o.value
          }, [(m = n.default) == null ? void 0 : m.call(n)]), [[Yt, a.value]]) : a.value && I("div", {
            class: "v-list-group__items",
            role: "group",
            "aria-labelledby": o.value
          }, [(w = n.default) == null ? void 0 : w.call(n)])];
        }
      })]
    })), {
      isOpen: a
    };
  }
}), Rd = O({
  opacity: [Number, String],
  ...re(),
  ...he()
}, "VListItemSubtitle"), Nd = U()({
  name: "VListItemSubtitle",
  props: Rd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return J(() => C(e.tag, {
      class: Q(["v-list-item-subtitle", e.class]),
      style: oe([{
        "--v-list-item-subtitle-opacity": e.opacity
      }, e.style])
    }, n)), {};
  }
}), Hd = ka("v-list-item-title");
function El(e) {
  return yl(() => {
    const {
      class: t,
      style: n
    } = zd(e);
    return {
      colorClasses: t,
      colorStyles: n
    };
  });
}
function dt(e) {
  const {
    colorClasses: t,
    colorStyles: n
  } = El(() => ({
    text: Oe(e)
  }));
  return {
    textColorClasses: t,
    textColorStyles: n
  };
}
function Xe(e) {
  const {
    colorClasses: t,
    colorStyles: n
  } = El(() => ({
    background: Oe(e)
  }));
  return {
    backgroundColorClasses: t,
    backgroundColorStyles: n
  };
}
function zd(e) {
  const t = Oe(e), n = [], a = {};
  if (t.background)
    if (tl(t.background)) {
      if (a.backgroundColor = t.background, !t.text && Wu(t.background)) {
        const l = xt(t.background);
        if (l.a == null || l.a === 1) {
          const i = Vo(l);
          a.color = i, a.caretColor = i;
        }
      }
    } else
      n.push(`bg-${t.background}`);
  return t.text && (tl(t.text) ? (a.color = t.text, a.caretColor = t.text) : n.push(`text-${t.text}`)), {
    class: n,
    style: a
  };
}
const Wd = ["x-small", "small", "default", "large", "x-large"], vn = O({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function Mn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : kt();
  return yl(() => {
    const n = e.size;
    let a, l;
    return Jn(Wd, n) ? a = `${t}--size-${n}` : n && (l = {
      width: X(n),
      height: X(n)
    }), {
      sizeClasses: a,
      sizeStyles: l
    };
  });
}
const jd = O({
  color: String,
  disabled: Boolean,
  start: Boolean,
  end: Boolean,
  icon: se,
  opacity: [String, Number],
  ...re(),
  ...vn(),
  ...he({
    tag: "i"
  }),
  ...Ce()
}, "VIcon"), Ve = U()({
  name: "VIcon",
  props: jd(),
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const l = G(), {
      themeClasses: i
    } = yd(), {
      iconData: o
    } = sc(() => l.value || e.icon), {
      sizeClasses: r
    } = Mn(e), {
      textColorClasses: s,
      textColorStyles: u
    } = dt(() => e.color);
    return J(() => {
      var f, v;
      const c = (f = a.default) == null ? void 0 : f.call(a);
      c && (l.value = (v = go(c).filter((g) => g.type === su && g.children && typeof g.children == "string")[0]) == null ? void 0 : v.children);
      const d = !!(n.onClick || n.onClickOnce);
      return C(o.value.component, {
        tag: e.tag,
        icon: o.value.icon,
        class: Q(["v-icon", "notranslate", i.value, r.value, s.value, {
          "v-icon--clickable": d,
          "v-icon--disabled": e.disabled,
          "v-icon--start": e.start,
          "v-icon--end": e.end
        }, e.class]),
        style: oe([{
          "--v-icon-opacity": e.opacity
        }, r.value ? void 0 : {
          fontSize: X(e.size),
          height: X(e.size),
          width: X(e.size)
        }, u.value, e.style]),
        role: d ? "button" : void 0,
        "aria-hidden": !d,
        tabindex: d ? e.disabled ? -1 : 0 : void 0
      }, {
        default: () => [c]
      });
    }), {};
  }
}), ft = O({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function vt(e) {
  return {
    dimensionStyles: V(() => {
      const n = {}, a = X(e.height), l = X(e.maxHeight), i = X(e.maxWidth), o = X(e.minHeight), r = X(e.minWidth), s = X(e.width);
      return a != null && (n.height = a), l != null && (n.maxHeight = l), i != null && (n.maxWidth = i), o != null && (n.minHeight = o), r != null && (n.minWidth = r), s != null && (n.width = s), n;
    })
  };
}
function Gd(e) {
  return {
    aspectStyles: V(() => {
      const t = Number(e.aspectRatio);
      return t ? {
        paddingBottom: String(1 / t * 100) + "%"
      } : void 0;
    })
  };
}
const tr = O({
  aspectRatio: [String, Number],
  contentClass: null,
  inline: Boolean,
  ...re(),
  ...ft()
}, "VResponsive"), Ri = U()({
  name: "VResponsive",
  props: tr(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      aspectStyles: a
    } = Gd(e), {
      dimensionStyles: l
    } = vt(e);
    return J(() => {
      var i;
      return I("div", {
        class: Q(["v-responsive", {
          "v-responsive--inline": e.inline
        }, e.class]),
        style: oe([l.value, e.style])
      }, [I("div", {
        class: "v-responsive__sizer",
        style: oe(a.value)
      }, null), (i = n.additional) == null ? void 0 : i.call(n), n.default && I("div", {
        class: Q(["v-responsive__content", e.contentClass])
      }, [n.default()])]);
    }), {};
  }
}), Ue = O({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  },
  tile: Boolean
}, "rounded");
function qe(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : kt();
  return {
    roundedClasses: V(() => {
      const a = Za(e) ? e.value : e.rounded, l = Za(e) ? !1 : e.tile, i = [];
      if (l || a === !1)
        i.push("rounded-0");
      else if (a === !0 || a === "")
        i.push(`${t}--rounded`);
      else if (typeof a == "string" || a === 0)
        for (const o of String(a).split(" "))
          i.push(`rounded-${o}`);
      return i;
    })
  };
}
function Yd(e, t) {
  if (!ml) return;
  const n = t.modifiers || {}, a = t.value, {
    handler: l,
    options: i
  } = typeof a == "object" ? a : {
    handler: a,
    options: {}
  }, o = new IntersectionObserver(function() {
    var d;
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], s = arguments.length > 1 ? arguments[1] : void 0;
    const u = (d = e._observe) == null ? void 0 : d[t.instance.$.uid];
    if (!u) return;
    const c = r.some((f) => f.isIntersecting);
    l && (!n.quiet || u.init) && (!n.once || c || u.init) && l(c, r, s), c && n.once ? nr(e, t) : u.init = !0;
  }, i);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
    init: !1,
    observer: o
  }, o.observe(e);
}
function nr(e, t) {
  var a;
  const n = (a = e._observe) == null ? void 0 : a[t.instance.$.uid];
  n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const rn = {
  mounted: Yd,
  unmounted: nr
}, Ud = O({
  absolute: Boolean,
  alt: String,
  cover: Boolean,
  color: String,
  draggable: {
    type: [Boolean, String],
    default: void 0
  },
  eager: Boolean,
  gradient: String,
  lazySrc: String,
  options: {
    type: Object,
    // For more information on types, navigate to:
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    default: () => ({
      root: void 0,
      rootMargin: void 0,
      threshold: void 0
    })
  },
  sizes: String,
  src: {
    type: [String, Object],
    default: ""
  },
  crossorigin: String,
  referrerpolicy: String,
  srcset: String,
  position: String,
  ...tr(),
  ...re(),
  ...Ue(),
  ...Ln()
}, "VImg"), Va = U()({
  name: "VImg",
  directives: {
    vIntersect: rn
  },
  props: Ud(),
  emits: {
    loadstart: (e) => !0,
    load: (e) => !0,
    error: (e) => !0
  },
  setup(e, t) {
    let {
      emit: n,
      slots: a
    } = t;
    const {
      backgroundColorClasses: l,
      backgroundColorStyles: i
    } = Xe(() => e.color), {
      roundedClasses: o
    } = qe(e), r = Ie("VImg"), s = G(""), u = K(), c = G(e.eager ? "loading" : "idle"), d = G(), f = G(), v = V(() => e.src && typeof e.src == "object" ? {
      src: e.src.src,
      srcset: e.srcset || e.src.srcset,
      lazySrc: e.lazySrc || e.src.lazySrc,
      aspect: Number(e.aspectRatio || e.src.aspect || 0)
    } : {
      src: e.src,
      srcset: e.srcset,
      lazySrc: e.lazySrc,
      aspect: Number(e.aspectRatio || 0)
    }), g = V(() => v.value.aspect || d.value / f.value || 0);
    q(() => e.src, () => {
      m(c.value !== "idle");
    }), q(g, (B, F) => {
      !B && F && u.value && x(u.value);
    }), Sa(() => m());
    function m(B) {
      if (!(e.eager && B) && !(ml && !B && !e.eager)) {
        if (c.value = "loading", v.value.lazySrc) {
          const F = new Image();
          F.src = v.value.lazySrc, x(F, null);
        }
        v.value.src && me(() => {
          var F;
          n("loadstart", ((F = u.value) == null ? void 0 : F.currentSrc) || v.value.src), setTimeout(() => {
            var D;
            if (!r.isUnmounted)
              if ((D = u.value) != null && D.complete) {
                if (u.value.naturalWidth || b(), c.value === "error") return;
                g.value || x(u.value, null), c.value === "loading" && w();
              } else
                g.value || x(u.value), h();
          });
        });
      }
    }
    function w() {
      var B;
      r.isUnmounted || (h(), x(u.value), c.value = "loaded", n("load", ((B = u.value) == null ? void 0 : B.currentSrc) || v.value.src));
    }
    function b() {
      var B;
      r.isUnmounted || (c.value = "error", n("error", ((B = u.value) == null ? void 0 : B.currentSrc) || v.value.src));
    }
    function h() {
      const B = u.value;
      B && (s.value = B.currentSrc || B.src);
    }
    let y = -1;
    et(() => {
      clearTimeout(y);
    });
    function x(B) {
      let F = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const D = () => {
        if (clearTimeout(y), r.isUnmounted) return;
        const {
          naturalHeight: L,
          naturalWidth: Y
        } = B;
        L || Y ? (d.value = Y, f.value = L) : !B.complete && c.value === "loading" && F != null ? y = window.setTimeout(D, F) : (B.currentSrc.endsWith(".svg") || B.currentSrc.startsWith("data:image/svg+xml")) && (d.value = 1, f.value = 1);
      };
      D();
    }
    const p = E(() => ({
      "v-img__img--cover": e.cover,
      "v-img__img--contain": !e.cover
    })), k = () => {
      var D;
      if (!v.value.src || c.value === "idle") return null;
      const B = I("img", {
        class: Q(["v-img__img", p.value]),
        style: {
          objectPosition: e.position
        },
        crossorigin: e.crossorigin,
        src: v.value.src,
        srcset: v.value.srcset,
        alt: e.alt,
        referrerpolicy: e.referrerpolicy,
        draggable: e.draggable,
        sizes: e.sizes,
        ref: u,
        onLoad: w,
        onError: b
      }, null), F = (D = a.sources) == null ? void 0 : D.call(a);
      return C(At, {
        transition: e.transition,
        appear: !0
      }, {
        default: () => [ze(F ? I("picture", {
          class: "v-img__picture"
        }, [F, B]) : B, [[Yt, c.value === "loaded"]])]
      });
    }, P = () => C(At, {
      transition: e.transition
    }, {
      default: () => [v.value.lazySrc && c.value !== "loaded" && I("img", {
        class: Q(["v-img__img", "v-img__img--preload", p.value]),
        style: {
          objectPosition: e.position
        },
        crossorigin: e.crossorigin,
        src: v.value.lazySrc,
        alt: e.alt,
        referrerpolicy: e.referrerpolicy,
        draggable: e.draggable
      }, null)]
    }), S = () => a.placeholder ? C(At, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [(c.value === "loading" || c.value === "error" && !a.error) && I("div", {
        class: "v-img__placeholder"
      }, [a.placeholder()])]
    }) : null, A = () => a.error ? C(At, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [c.value === "error" && I("div", {
        class: "v-img__error"
      }, [a.error()])]
    }) : null, T = () => e.gradient ? I("div", {
      class: "v-img__gradient",
      style: {
        backgroundImage: `linear-gradient(${e.gradient})`
      }
    }, null) : null, _ = G(!1);
    {
      const B = q(g, (F) => {
        F && (requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            _.value = !0;
          });
        }), B());
      });
    }
    return J(() => {
      const B = Ri.filterProps(e);
      return ze(C(Ri, j({
        class: ["v-img", {
          "v-img--absolute": e.absolute,
          "v-img--booting": !_.value
        }, l.value, o.value, e.class],
        style: [{
          width: X(e.width === "auto" ? d.value : e.width)
        }, i.value, e.style]
      }, B, {
        aspectRatio: g.value,
        "aria-label": e.alt,
        role: e.alt ? "img" : void 0
      }), {
        additional: () => I(de, null, [C(k, null, null), C(P, null, null), C(T, null, null), C(S, null, null), C(A, null, null)]),
        default: a.default
      }), [[rn, {
        handler: m,
        options: e.options
      }, null, {
        once: !0
      }]]);
    }), {
      currentSrc: s,
      image: u,
      state: c,
      naturalWidth: d,
      naturalHeight: f
    };
  }
}), bt = O({
  border: [Boolean, Number, String]
}, "border");
function Ct(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : kt();
  return {
    borderClasses: V(() => {
      const a = e.border;
      return a === !0 || a === "" ? `${t}--border` : typeof a == "string" || a === 0 ? String(a).split(" ").map((l) => `border-${l}`) : [];
    })
  };
}
const Kd = [null, "default", "comfortable", "compact"], We = O({
  density: {
    type: String,
    default: "default",
    validator: (e) => Kd.includes(e)
  }
}, "density");
function mt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : kt();
  return {
    densityClasses: E(() => `${t}--density-${e.density}`)
  };
}
const Xd = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function Ut(e, t) {
  return I(de, null, [e && I("span", {
    key: "overlay",
    class: Q(`${t}__overlay`)
  }, null), I("span", {
    key: "underlay",
    class: Q(`${t}__underlay`)
  }, null)]);
}
const St = O({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => Xd.includes(e)
  }
}, "variant");
function Kt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : kt();
  const n = E(() => {
    const {
      variant: i
    } = Oe(e);
    return `${t}--variant-${i}`;
  }), {
    colorClasses: a,
    colorStyles: l
  } = El(() => {
    const {
      variant: i,
      color: o
    } = Oe(e);
    return {
      [["elevated", "flat"].includes(i) ? "background" : "text"]: o
    };
  });
  return {
    colorClasses: a,
    colorStyles: l,
    variantClasses: n
  };
}
const qd = O({
  start: Boolean,
  end: Boolean,
  icon: se,
  image: String,
  text: String,
  ...bt(),
  ...re(),
  ...We(),
  ...Ue(),
  ...vn(),
  ...he(),
  ...Ce(),
  ...St({
    variant: "flat"
  })
}, "VAvatar"), Ot = U()({
  name: "VAvatar",
  props: qd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = Ae(e), {
      borderClasses: l
    } = Ct(e), {
      colorClasses: i,
      colorStyles: o,
      variantClasses: r
    } = Kt(e), {
      densityClasses: s
    } = mt(e), {
      roundedClasses: u
    } = qe(e), {
      sizeClasses: c,
      sizeStyles: d
    } = Mn(e);
    return J(() => C(e.tag, {
      class: Q(["v-avatar", {
        "v-avatar--start": e.start,
        "v-avatar--end": e.end
      }, a.value, l.value, i.value, s.value, u.value, c.value, r.value, e.class]),
      style: oe([o.value, d.value, e.style])
    }, {
      default: () => [n.default ? C(ke, {
        key: "content-defaults",
        defaults: {
          VImg: {
            cover: !0,
            src: e.image
          },
          VIcon: {
            icon: e.icon
          }
        }
      }, {
        default: () => [n.default()]
      }) : e.image ? C(Va, {
        key: "image",
        src: e.image,
        alt: "",
        cover: !0
      }, null) : e.icon ? C(Ve, {
        key: "icon",
        icon: e.icon
      }, null) : e.text, Ut(!1, "v-avatar")]
    })), {};
  }
}), wt = O({
  elevation: {
    type: [Number, String],
    validator(e) {
      const t = parseInt(e);
      return !isNaN(t) && t >= 0 && // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      t <= 24;
    }
  }
}, "elevation");
function pt(e) {
  return {
    elevationClasses: E(() => {
      const n = Za(e) ? e.value : e.elevation;
      return n == null ? [] : [`elevation-${n}`];
    })
  };
}
function Zd() {
  const e = Ie("useRoute");
  return V(() => {
    var t;
    return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route;
  });
}
function ar() {
  var e, t;
  return (t = (e = Ie("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
function Pa(e, t) {
  var d, f;
  const n = uu("RouterLink"), a = E(() => !!(e.href || e.to)), l = V(() => (a == null ? void 0 : a.value) || li(t, "click") || li(e, "click"));
  if (typeof n == "string" || !("useLink" in n)) {
    const v = E(() => e.href);
    return {
      isLink: a,
      isRouterLink: E(() => !1),
      isClickable: l,
      href: v,
      linkProps: Qe({
        href: v
      })
    };
  }
  const i = n.useLink({
    to: E(() => e.to || ""),
    replace: E(() => e.replace)
  }), o = V(() => e.to ? i : void 0), r = Zd(), s = V(() => {
    var v, g, m;
    return o.value ? e.exact ? r.value ? ((m = o.value.isExactActive) == null ? void 0 : m.value) && Ke(o.value.route.value.query, r.value.query) : ((g = o.value.isExactActive) == null ? void 0 : g.value) ?? !1 : ((v = o.value.isActive) == null ? void 0 : v.value) ?? !1 : !1;
  }), u = V(() => {
    var v;
    return e.to ? (v = o.value) == null ? void 0 : v.route.value.href : e.href;
  }), c = E(() => !!e.to);
  return {
    isLink: a,
    isRouterLink: c,
    isClickable: l,
    isActive: s,
    route: (d = o.value) == null ? void 0 : d.route,
    navigate: (f = o.value) == null ? void 0 : f.navigate,
    href: u,
    linkProps: Qe({
      href: u,
      "aria-current": E(() => s.value ? "page" : void 0),
      "aria-disabled": E(() => e.disabled && a.value ? "true" : void 0),
      tabindex: E(() => e.disabled && a.value ? "-1" : void 0)
    })
  };
}
const Ia = O({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
let ja = !1;
function Qd(e, t) {
  let n = !1, a, l;
  ye && (e != null && e.beforeEach) && (me(() => {
    window.addEventListener("popstate", i), a = e.beforeEach((o, r, s) => {
      ja ? n ? t(s) : s() : setTimeout(() => n ? t(s) : s()), ja = !0;
    }), l = e == null ? void 0 : e.afterEach(() => {
      ja = !1;
    });
  }), De(() => {
    window.removeEventListener("popstate", i), a == null || a(), l == null || l();
  }));
  function i(o) {
    var r;
    (r = o.state) != null && r.replaced || (n = !0, setTimeout(() => n = !1));
  }
}
const il = Symbol("rippleStop"), Jd = 80;
function Ni(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function ol(e) {
  return e.constructor.name === "TouchEvent";
}
function lr(e) {
  return e.constructor.name === "KeyboardEvent";
}
const ef = function(e, t) {
  var d;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, a = 0, l = 0;
  if (!lr(e)) {
    const f = t.getBoundingClientRect(), v = ol(e) ? e.touches[e.touches.length - 1] : e;
    a = v.clientX - f.left, l = v.clientY - f.top;
  }
  let i = 0, o = 0.3;
  (d = t._ripple) != null && d.circle ? (o = 0.15, i = t.clientWidth / 2, i = n.center ? i : i + Math.sqrt((a - i) ** 2 + (l - i) ** 2) / 4) : i = Math.sqrt(t.clientWidth ** 2 + t.clientHeight ** 2) / 2;
  const r = `${(t.clientWidth - i * 2) / 2}px`, s = `${(t.clientHeight - i * 2) / 2}px`, u = n.center ? r : `${a - i}px`, c = n.center ? s : `${l - i}px`;
  return {
    radius: i,
    scale: o,
    x: u,
    y: c,
    centerX: r,
    centerY: s
  };
}, oa = {
  /* eslint-disable max-statements */
  show(e, t) {
    var v;
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!((v = t == null ? void 0 : t._ripple) != null && v.enabled))
      return;
    const a = document.createElement("span"), l = document.createElement("span");
    a.appendChild(l), a.className = "v-ripple__container", n.class && (a.className += ` ${n.class}`);
    const {
      radius: i,
      scale: o,
      x: r,
      y: s,
      centerX: u,
      centerY: c
    } = ef(e, t, n), d = `${i * 2}px`;
    l.className = "v-ripple__animation", l.style.width = d, l.style.height = d, t.appendChild(a);
    const f = window.getComputedStyle(t);
    f && f.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), l.classList.add("v-ripple__animation--enter"), l.classList.add("v-ripple__animation--visible"), Ni(l, `translate(${r}, ${s}) scale3d(${o},${o},${o})`), l.dataset.activated = String(performance.now()), requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        l.classList.remove("v-ripple__animation--enter"), l.classList.add("v-ripple__animation--in"), Ni(l, `translate(${u}, ${c}) scale3d(1,1,1)`);
      });
    });
  },
  hide(e) {
    var i;
    if (!((i = e == null ? void 0 : e._ripple) != null && i.enabled)) return;
    const t = e.getElementsByClassName("v-ripple__animation");
    if (t.length === 0) return;
    const n = Array.from(t).findLast((o) => !o.dataset.isHiding);
    if (n) n.dataset.isHiding = "true";
    else return;
    const a = performance.now() - Number(n.dataset.activated), l = Math.max(250 - a, 0);
    setTimeout(() => {
      n.classList.remove("v-ripple__animation--in"), n.classList.add("v-ripple__animation--out"), setTimeout(() => {
        var r;
        e.getElementsByClassName("v-ripple__animation").length === 1 && e.dataset.previousPosition && (e.style.position = e.dataset.previousPosition, delete e.dataset.previousPosition), ((r = n.parentNode) == null ? void 0 : r.parentNode) === e && e.removeChild(n.parentNode);
      }, 300);
    }, l);
  }
};
function ir(e) {
  return typeof e > "u" || !!e;
}
function In(e) {
  const t = {}, n = e.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || e[il])) {
    if (e[il] = !0, ol(e))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch) return;
    if (t.center = n._ripple.centered || lr(e), n._ripple.class && (t.class = n._ripple.class), ol(e)) {
      if (n._ripple.showTimerCommit) return;
      n._ripple.showTimerCommit = () => {
        oa.show(e, n, t);
      }, n._ripple.showTimer = window.setTimeout(() => {
        var a;
        (a = n == null ? void 0 : n._ripple) != null && a.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, Jd);
    } else
      oa.show(e, n, t);
  }
}
function ra(e) {
  e[il] = !0;
}
function at(e) {
  const t = e.currentTarget;
  if (t != null && t._ripple) {
    if (window.clearTimeout(t._ripple.showTimer), e.type === "touchend" && t._ripple.showTimerCommit) {
      t._ripple.showTimerCommit(), t._ripple.showTimerCommit = null, t._ripple.showTimer = window.setTimeout(() => {
        at(e);
      });
      return;
    }
    window.setTimeout(() => {
      t._ripple && (t._ripple.touched = !1);
    }), oa.hide(t);
  }
}
function or(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let An = !1;
function tf(e, t) {
  !An && t.includes(e.key) && (An = !0, In(e));
}
function rr(e) {
  An = !1, at(e);
}
function sr(e) {
  An && (An = !1, at(e));
}
function ur(e, t, n) {
  const {
    value: a,
    modifiers: l
  } = t, i = ir(a);
  i || oa.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = i, e._ripple.centered = l.center, e._ripple.circle = l.circle;
  const o = wn(a) ? a : {};
  o.class && (e._ripple.class = o.class);
  const r = o.keys ?? ["Enter", "Space"];
  if (e._ripple.keyDownHandler = (s) => tf(s, r), i && !n) {
    if (l.stop) {
      e.addEventListener("touchstart", ra, {
        passive: !0
      }), e.addEventListener("mousedown", ra);
      return;
    }
    e.addEventListener("touchstart", In, {
      passive: !0
    }), e.addEventListener("touchend", at, {
      passive: !0
    }), e.addEventListener("touchmove", or, {
      passive: !0
    }), e.addEventListener("touchcancel", at), e.addEventListener("mousedown", In), e.addEventListener("mouseup", at), e.addEventListener("mouseleave", at), e.addEventListener("keydown", e._ripple.keyDownHandler), e.addEventListener("keyup", rr), e.addEventListener("blur", sr), e.addEventListener("dragstart", at, {
      passive: !0
    });
  } else !i && n && cr(e);
}
function cr(e) {
  var t;
  e.removeEventListener("touchstart", ra), e.removeEventListener("mousedown", ra), e.removeEventListener("touchstart", In), e.removeEventListener("touchend", at), e.removeEventListener("touchmove", or), e.removeEventListener("touchcancel", at), e.removeEventListener("mousedown", In), e.removeEventListener("mouseup", at), e.removeEventListener("mouseleave", at), (t = e._ripple) != null && t.keyDownHandler && e.removeEventListener("keydown", e._ripple.keyDownHandler), e.removeEventListener("keyup", rr), e.removeEventListener("blur", sr), e.removeEventListener("dragstart", at);
}
function nf(e, t) {
  ur(e, t, !1);
}
function af(e) {
  cr(e), delete e._ripple;
}
function lf(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = ir(t.oldValue);
  ur(e, t, n);
}
const Tt = {
  mounted: nf,
  unmounted: af,
  updated: lf
}, of = O({
  active: {
    type: Boolean,
    default: void 0
  },
  activeClass: String,
  /* @deprecated */
  activeColor: String,
  appendAvatar: String,
  appendIcon: se,
  baseColor: String,
  disabled: Boolean,
  lines: [Boolean, String],
  link: {
    type: Boolean,
    default: void 0
  },
  nav: Boolean,
  prependAvatar: String,
  prependIcon: se,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  slim: Boolean,
  prependGap: [Number, String],
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  value: null,
  onClick: He(),
  onClickOnce: He(),
  ...bt(),
  ...re(),
  ...We(),
  ...ft(),
  ...wt(),
  ...Ue(),
  ...Ia(),
  ...he(),
  ...Ce(),
  ...St({
    variant: "text"
  })
}, "VListItem"), sn = U()({
  name: "VListItem",
  directives: {
    vRipple: Tt
  },
  props: of(),
  emits: {
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a,
      emit: l
    } = t;
    const i = Pa(e, n), o = V(() => e.value === void 0 ? i.href.value : e.value), {
      activate: r,
      isActivated: s,
      select: u,
      isOpen: c,
      isSelected: d,
      isIndeterminate: f,
      isGroupActivator: v,
      root: g,
      parent: m,
      openOnSelect: w,
      id: b
    } = er(o, () => e.disabled, !1), h = Ko(), y = V(() => {
      var R;
      return e.active !== !1 && (e.active || ((R = i.isActive) == null ? void 0 : R.value) || (g.activatable.value ? s.value : d.value));
    }), x = E(() => e.link !== !1 && i.isLink.value), p = V(() => !!h && (g.selectable.value || g.activatable.value || e.value != null)), k = V(() => !e.disabled && e.link !== !1 && (e.link || i.isClickable.value || p.value)), P = V(() => h ? x.value ? "link" : p.value ? "option" : "listitem" : void 0), S = V(() => {
      if (p.value)
        return g.activatable.value ? s.value : g.selectable.value ? d.value : y.value;
    }), A = E(() => e.rounded || e.nav), T = E(() => e.color ?? e.activeColor), _ = E(() => ({
      color: y.value ? T.value ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    q(() => {
      var R;
      return (R = i.isActive) == null ? void 0 : R.value;
    }, (R) => {
      R && B();
    }), Sa(() => {
      var R;
      (R = i.isActive) != null && R.value && me(() => B());
    });
    function B() {
      m.value != null && g.open(m.value, !0), w(!0);
    }
    const {
      themeClasses: F
    } = Ae(e), {
      borderClasses: D
    } = Ct(e), {
      colorClasses: L,
      colorStyles: Y,
      variantClasses: z
    } = Kt(_), {
      densityClasses: ee
    } = mt(e), {
      dimensionStyles: ie
    } = vt(e), {
      elevationClasses: $
    } = pt(e), {
      roundedClasses: Z
    } = qe(A), M = E(() => e.lines ? `v-list-item--${e.lines}-line` : void 0), N = E(() => e.ripple !== void 0 && e.ripple && (h != null && h.filterable) ? {
      keys: ["Enter"]
    } : e.ripple), te = V(() => ({
      isActive: y.value,
      select: u,
      isOpen: c.value,
      isSelected: d.value,
      isIndeterminate: f.value
    }));
    function W(R) {
      var le, ve;
      l("click", R), !["INPUT", "TEXTAREA"].includes((le = R.target) == null ? void 0 : le.tagName) && k.value && ((ve = i.navigate) == null || ve.call(i, R), !v && (g.activatable.value ? r(!s.value, R) : (g.selectable.value || e.value != null && !x.value) && u(!d.value, R)));
    }
    function ae(R) {
      const le = R.target;
      ["INPUT", "TEXTAREA"].includes(le.tagName) || (R.key === "Enter" || R.key === " " && !(h != null && h.filterable)) && (R.preventDefault(), R.stopPropagation(), R.target.dispatchEvent(new MouseEvent("click", R)));
    }
    return J(() => {
      const R = x.value ? "a" : e.tag, le = a.title || e.title != null, ve = a.subtitle || e.subtitle != null, Se = !!(e.appendAvatar || e.appendIcon), Fe = !!(Se || a.append), ue = !!(e.prependAvatar || e.prependIcon), Be = !!(ue || a.prepend);
      return h == null || h.updateHasPrepend(Be), e.activeColor && so("active-color", ["color", "base-color"]), ze(C(R, j(i.linkProps, {
        class: ["v-list-item", {
          "v-list-item--active": y.value,
          "v-list-item--disabled": e.disabled,
          "v-list-item--link": k.value,
          "v-list-item--nav": e.nav,
          "v-list-item--slim": e.slim,
          [`${e.activeClass}`]: e.activeClass && y.value
        }, F.value, D.value, L.value, ee.value, $.value, M.value, Z.value, z.value, e.class],
        style: [{
          "--v-list-prepend-gap": X(e.prependGap)
        }, Y.value, ie.value, e.style],
        tabindex: k.value ? h ? -2 : 0 : void 0,
        "aria-selected": S.value,
        role: P.value,
        onClick: W,
        onKeydown: k.value && !x.value && ae
      }), {
        default: () => {
          var Te;
          return [Ut(k.value || y.value, "v-list-item"), Be && I("div", {
            key: "prepend",
            class: "v-list-item__prepend"
          }, [a.prepend ? C(ke, {
            key: "prepend-defaults",
            disabled: !ue,
            defaults: {
              VAvatar: {
                density: e.density,
                image: e.prependAvatar
              },
              VIcon: {
                density: e.density,
                icon: e.prependIcon
              },
              VListItemAction: {
                start: !0
              }
            }
          }, {
            default: () => {
              var be;
              return [(be = a.prepend) == null ? void 0 : be.call(a, te.value)];
            }
          }) : I(de, null, [e.prependAvatar && C(Ot, {
            key: "prepend-avatar",
            density: e.density,
            image: e.prependAvatar
          }, null), e.prependIcon && C(Ve, {
            key: "prepend-icon",
            density: e.density,
            icon: e.prependIcon
          }, null)]), I("div", {
            class: "v-list-item__spacer"
          }, null)]), I("div", {
            class: "v-list-item__content",
            "data-no-activator": ""
          }, [le && C(Hd, {
            key: "title"
          }, {
            default: () => {
              var be;
              return [((be = a.title) == null ? void 0 : be.call(a, {
                title: e.title
              })) ?? zt(e.title)];
            }
          }), ve && C(Nd, {
            key: "subtitle"
          }, {
            default: () => {
              var be;
              return [((be = a.subtitle) == null ? void 0 : be.call(a, {
                subtitle: e.subtitle
              })) ?? zt(e.subtitle)];
            }
          }), (Te = a.default) == null ? void 0 : Te.call(a, te.value)]), Fe && I("div", {
            key: "append",
            class: "v-list-item__append"
          }, [a.append ? C(ke, {
            key: "append-defaults",
            disabled: !Se,
            defaults: {
              VAvatar: {
                density: e.density,
                image: e.appendAvatar
              },
              VIcon: {
                density: e.density,
                icon: e.appendIcon
              },
              VListItemAction: {
                end: !0
              }
            }
          }, {
            default: () => {
              var be;
              return [(be = a.append) == null ? void 0 : be.call(a, te.value)];
            }
          }) : I(de, null, [e.appendIcon && C(Ve, {
            key: "append-icon",
            density: e.density,
            icon: e.appendIcon
          }, null), e.appendAvatar && C(Ot, {
            key: "append-avatar",
            density: e.density,
            image: e.appendAvatar
          }, null)]), I("div", {
            class: "v-list-item__spacer"
          }, null)])];
        }
      }), [[Tt, k.value && N.value]]);
    }), {
      activate: r,
      isActivated: s,
      isGroupActivator: v,
      isSelected: d,
      list: h,
      select: u,
      root: g,
      id: b,
      link: i
    };
  }
}), rf = O({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...re(),
  ...he()
}, "VListSubheader"), _l = U()({
  name: "VListSubheader",
  props: rf(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      textColorClasses: a,
      textColorStyles: l
    } = dt(() => e.color);
    return J(() => {
      const i = !!(n.default || e.title);
      return C(e.tag, {
        class: Q(["v-list-subheader", {
          "v-list-subheader--inset": e.inset,
          "v-list-subheader--sticky": e.sticky
        }, a.value, e.class]),
        style: oe([{
          textColorStyles: l
        }, e.style])
      }, {
        default: () => {
          var o;
          return [i && I("div", {
            class: "v-list-subheader__text"
          }, [((o = n.default) == null ? void 0 : o.call(n)) ?? e.title])];
        }
      });
    }), {};
  }
}), sf = ["dotted", "dashed", "solid", "double"], uf = O({
  color: String,
  contentOffset: [Number, String, Array],
  gradient: Boolean,
  inset: Boolean,
  length: [Number, String],
  opacity: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  variant: {
    type: String,
    default: "solid",
    validator: (e) => sf.includes(e)
  },
  ...re(),
  ...Ce()
}, "VDivider"), $n = U()({
  name: "VDivider",
  props: uf(),
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      themeClasses: l
    } = Ae(e), {
      textColorClasses: i,
      textColorStyles: o
    } = dt(() => e.color), r = V(() => {
      const u = {};
      return e.length && (u[e.vertical ? "height" : "width"] = X(e.length)), e.thickness && (u[e.vertical ? "borderRightWidth" : "borderTopWidth"] = X(e.thickness)), u;
    }), s = E(() => {
      const u = Array.isArray(e.contentOffset) ? e.contentOffset[0] : e.contentOffset, c = Array.isArray(e.contentOffset) ? e.contentOffset[1] : 0;
      return {
        marginBlock: e.vertical && u ? X(u) : void 0,
        marginInline: !e.vertical && u ? X(u) : void 0,
        transform: c ? `translate${e.vertical ? "X" : "Y"}(${X(c)})` : void 0
      };
    });
    return J(() => {
      const u = I("hr", {
        class: Q([{
          "v-divider": !0,
          "v-divider--gradient": e.gradient && !a.default,
          "v-divider--inset": e.inset,
          "v-divider--vertical": e.vertical
        }, l.value, i.value, e.class]),
        style: oe([r.value, o.value, {
          "--v-border-opacity": e.opacity
        }, {
          "border-style": e.variant
        }, e.style]),
        "aria-orientation": !n.role || n.role === "separator" ? e.vertical ? "vertical" : "horizontal" : void 0,
        role: `${n.role || "separator"}`
      }, null);
      return a.default ? I("div", {
        class: Q(["v-divider__wrapper", {
          "v-divider__wrapper--gradient": e.gradient,
          "v-divider__wrapper--inset": e.inset,
          "v-divider__wrapper--vertical": e.vertical
        }])
      }, [u, I("div", {
        class: "v-divider__content",
        style: oe(s.value)
      }, [a.default()]), u]) : u;
    }), {};
  }
}), cf = O({
  items: Array,
  returnObject: Boolean
}, "VListChildren"), dr = U()({
  name: "VListChildren",
  props: cf(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Uo(), () => {
      var a, l;
      return ((a = n.default) == null ? void 0 : a.call(n)) ?? ((l = e.items) == null ? void 0 : l.map((i) => {
        var f, v;
        let {
          children: o,
          props: r,
          type: s,
          raw: u
        } = i;
        if (s === "divider")
          return ((f = n.divider) == null ? void 0 : f.call(n, {
            props: r
          })) ?? C($n, r, null);
        if (s === "subheader")
          return ((v = n.subheader) == null ? void 0 : v.call(n, {
            props: r
          })) ?? C(_l, r, null);
        const c = {
          subtitle: n.subtitle ? (g) => {
            var m;
            return (m = n.subtitle) == null ? void 0 : m.call(n, {
              ...g,
              item: u
            });
          } : void 0,
          prepend: n.prepend ? (g) => {
            var m;
            return (m = n.prepend) == null ? void 0 : m.call(n, {
              ...g,
              item: u
            });
          } : void 0,
          append: n.append ? (g) => {
            var m;
            return (m = n.append) == null ? void 0 : m.call(n, {
              ...g,
              item: u
            });
          } : void 0,
          title: n.title ? (g) => {
            var m;
            return (m = n.title) == null ? void 0 : m.call(n, {
              ...g,
              item: u
            });
          } : void 0
        }, d = $i.filterProps(r);
        return o ? C($i, j(d, {
          value: e.returnObject ? u : r == null ? void 0 : r.value,
          rawId: r == null ? void 0 : r.value
        }), {
          activator: (g) => {
            let {
              props: m
            } = g;
            const w = j(r, m, {
              value: e.returnObject ? u : r.value
            });
            return n.header ? n.header({
              props: w
            }) : C(sn, w, c);
          },
          default: () => C(dr, {
            items: o,
            returnObject: e.returnObject
          }, n)
        }) : n.item ? n.item({
          props: r
        }) : C(sn, j(r, {
          value: e.returnObject ? u : r.value
        }), c);
      }));
    };
  }
}), fr = O({
  items: {
    type: Array,
    default: () => []
  },
  itemTitle: {
    type: [String, Array, Function],
    default: "title"
  },
  itemValue: {
    type: [String, Array, Function],
    default: "value"
  },
  itemChildren: {
    type: [Boolean, String, Array, Function],
    default: "children"
  },
  itemProps: {
    type: [Boolean, String, Array, Function],
    default: "props"
  },
  itemType: {
    type: [Boolean, String, Array, Function],
    default: "type"
  },
  returnObject: Boolean,
  valueComparator: Function
}, "list-items"), df = /* @__PURE__ */ new Set(["item", "divider", "subheader"]);
function tn(e, t) {
  const n = Ge(t, e.itemTitle, t), a = Ge(t, e.itemValue, n), l = Ge(t, e.itemChildren), i = e.itemProps === !0 ? typeof t == "object" && t != null && !Array.isArray(t) ? "children" in t ? _e(t, ["children"]) : t : void 0 : Ge(t, e.itemProps);
  let o = Ge(t, e.itemType, "item");
  df.has(o) || (o = "item");
  const r = {
    title: n,
    value: a,
    ...i
  };
  return {
    type: o,
    title: String(r.title ?? ""),
    value: r.value,
    props: r,
    children: o === "item" && Array.isArray(l) ? vr(e, l) : void 0,
    raw: t
  };
}
tn.neededProps = ["itemTitle", "itemValue", "itemChildren", "itemProps", "itemType"];
function vr(e, t) {
  const n = Bt(e, tn.neededProps), a = [];
  for (const l of t)
    a.push(tn(n, l));
  return a;
}
function mr(e) {
  const t = V(() => vr(e, e.items)), n = V(() => t.value.some((r) => r.value === null)), a = G(/* @__PURE__ */ new Map()), l = G([]);
  Le(() => {
    const r = t.value, s = /* @__PURE__ */ new Map(), u = [];
    for (let c = 0; c < r.length; c++) {
      const d = r[c];
      if (Dt(d.value) || d.value === null) {
        let f = s.get(d.value);
        f || (f = [], s.set(d.value, f)), f.push(d);
      } else
        u.push(d);
    }
    a.value = s, l.value = u;
  });
  function i(r) {
    const s = a.value, u = t.value, c = l.value, d = n.value, f = e.returnObject, v = !!e.valueComparator, g = e.valueComparator || Ke, m = Bt(e, tn.neededProps), w = [];
    e: for (const b of r) {
      if (!d && b === null) continue;
      if (f && typeof b == "string") {
        w.push(tn(m, b));
        continue;
      }
      const h = s.get(b);
      if (v || !h) {
        for (const y of v ? u : c)
          if (g(b, y.value)) {
            w.push(y);
            continue e;
          }
        w.push(tn(m, b));
        continue;
      }
      w.push(...h);
    }
    return w;
  }
  function o(r) {
    return e.returnObject ? r.map((s) => {
      let {
        raw: u
      } = s;
      return u;
    }) : r.map((s) => {
      let {
        value: u
      } = s;
      return u;
    });
  }
  return {
    items: t,
    transformIn: i,
    transformOut: o
  };
}
const ff = /* @__PURE__ */ new Set(["item", "divider", "subheader"]);
function vf(e, t) {
  const n = Dt(t) ? t : Ge(t, e.itemTitle), a = Dt(t) ? t : Ge(t, e.itemValue, void 0), l = Ge(t, e.itemChildren), i = e.itemProps === !0 ? _e(t, ["children"]) : Ge(t, e.itemProps);
  let o = Ge(t, e.itemType, "item");
  ff.has(o) || (o = "item");
  const r = {
    title: n,
    value: a,
    ...i
  };
  return {
    type: o,
    title: r.title,
    value: r.value,
    props: r,
    children: o === "item" && l ? gr(e, l) : void 0,
    raw: t
  };
}
function gr(e, t) {
  const n = [];
  for (const a of t)
    n.push(vf(e, a));
  return n;
}
function mf(e) {
  return {
    items: V(() => gr(e, e.items))
  };
}
const gf = O({
  baseColor: String,
  /* @deprecated */
  activeColor: String,
  activeClass: String,
  bgColor: String,
  disabled: Boolean,
  filterable: Boolean,
  expandIcon: se,
  collapseIcon: se,
  lines: {
    type: [Boolean, String],
    default: "one"
  },
  slim: Boolean,
  prependGap: [Number, String],
  indent: [Number, String],
  nav: Boolean,
  "onClick:open": He(),
  "onClick:select": He(),
  "onUpdate:opened": He(),
  ...Fd({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...bt(),
  ...re(),
  ...We(),
  ...ft(),
  ...wt(),
  ...fr(),
  ...Ue(),
  ...he(),
  ...Ce(),
  ...St({
    variant: "text"
  })
}, "VList"), hr = U()({
  name: "VList",
  props: gf(),
  emits: {
    "update:selected": (e) => !0,
    "update:activated": (e) => !0,
    "update:opened": (e) => !0,
    "click:open": (e) => !0,
    "click:activate": (e) => !0,
    "click:select": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      items: a
    } = mf(e), {
      themeClasses: l
    } = Ae(e), {
      backgroundColorClasses: i,
      backgroundColorStyles: o
    } = Xe(() => e.bgColor), {
      borderClasses: r
    } = Ct(e), {
      densityClasses: s
    } = mt(e), {
      dimensionStyles: u
    } = vt(e), {
      elevationClasses: c
    } = pt(e), {
      roundedClasses: d
    } = qe(e), {
      children: f,
      open: v,
      parents: g,
      select: m,
      getPath: w
    } = Od(e, a, () => e.returnObject), b = E(() => e.lines ? `v-list--${e.lines}-line` : void 0), h = E(() => e.activeColor), y = E(() => e.baseColor), x = E(() => e.color), p = E(() => e.selectable || e.activatable);
    Uo({
      filterable: e.filterable
    }), ot({
      VListGroup: {
        activeColor: h,
        baseColor: y,
        color: x,
        expandIcon: E(() => e.expandIcon),
        collapseIcon: E(() => e.collapseIcon)
      },
      VListItem: {
        activeClass: E(() => e.activeClass),
        activeColor: h,
        baseColor: y,
        color: x,
        density: E(() => e.density),
        disabled: E(() => e.disabled),
        lines: E(() => e.lines),
        nav: E(() => e.nav),
        slim: E(() => e.slim),
        variant: E(() => e.variant)
      }
    });
    const k = G(!1), P = K();
    function S(D) {
      k.value = !0;
    }
    function A(D) {
      k.value = !1;
    }
    function T(D) {
      var L;
      !k.value && !(D.relatedTarget && ((L = P.value) != null && L.contains(D.relatedTarget))) && F();
    }
    function _(D) {
      const L = D.target;
      if (!(!P.value || L.tagName === "INPUT" && ["Home", "End"].includes(D.key) || L.tagName === "TEXTAREA")) {
        if (D.key === "ArrowDown")
          F("next");
        else if (D.key === "ArrowUp")
          F("prev");
        else if (D.key === "Home")
          F("first");
        else if (D.key === "End")
          F("last");
        else
          return;
        D.preventDefault();
      }
    }
    function B(D) {
      k.value = !0;
    }
    function F(D) {
      if (P.value)
        return yn(P.value, D);
    }
    return J(() => {
      const D = e.indent ?? (e.prependGap ? Number(e.prependGap) + 24 : void 0);
      return C(e.tag, {
        ref: P,
        class: Q(["v-list", {
          "v-list--disabled": e.disabled,
          "v-list--nav": e.nav,
          "v-list--slim": e.slim
        }, l.value, i.value, r.value, s.value, c.value, b.value, d.value, e.class]),
        style: oe([{
          "--v-list-indent": X(D),
          "--v-list-group-prepend": D ? "0px" : void 0,
          "--v-list-prepend-gap": X(e.prependGap)
        }, o.value, u.value, e.style]),
        tabindex: e.disabled ? -1 : 0,
        role: p.value ? "listbox" : "list",
        "aria-activedescendant": void 0,
        onFocusin: S,
        onFocusout: A,
        onFocus: T,
        onKeydown: _,
        onMousedown: B
      }, {
        default: () => [C(dr, {
          items: a.value,
          returnObject: e.returnObject
        }, n)]
      });
    }), {
      open: v,
      select: m,
      focus: F,
      children: f,
      parents: g,
      getPath: w
    };
  }
});
function hf(e) {
  let {
    rootEl: t,
    isSticky: n,
    layoutItemStyles: a
  } = e;
  const l = G(!1), i = G(0), o = V(() => {
    const u = typeof l.value == "boolean" ? "top" : l.value;
    return [n.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, l.value ? {
      [u]: X(i.value)
    } : {
      top: a.value.top
    }];
  });
  gt(() => {
    q(n, (u) => {
      u ? window.addEventListener("scroll", s, {
        passive: !0
      }) : window.removeEventListener("scroll", s);
    }, {
      immediate: !0
    });
  }), et(() => {
    window.removeEventListener("scroll", s);
  });
  let r = 0;
  function s() {
    const u = r > window.scrollY ? "up" : "down", c = t.value.getBoundingClientRect(), d = parseFloat(a.value.top ?? 0), f = window.scrollY - Math.max(0, i.value - d), v = c.height + Math.max(i.value, d) - window.scrollY - window.innerHeight, g = parseFloat(getComputedStyle(t.value).getPropertyValue("--v-body-scroll-y")) || 0;
    c.height < window.innerHeight - d ? (l.value = "top", i.value = d) : u === "up" && l.value === "bottom" || u === "down" && l.value === "top" ? (i.value = window.scrollY + c.top - g, l.value = !0) : u === "down" && v <= 0 ? (i.value = 0, l.value = "bottom") : u === "up" && f <= 0 && (g ? l.value !== "top" && (i.value = -f + g + d, l.value = "top") : (i.value = c.top + f, l.value = "top")), r = window.scrollY;
  }
  return {
    isStuck: l,
    stickyStyles: o
  };
}
const yf = 100, bf = 20;
function Hi(e) {
  return (e < 0 ? -1 : 1) * Math.sqrt(Math.abs(e)) * 1.41421356237;
}
function zi(e) {
  if (e.length < 2)
    return 0;
  if (e.length === 2)
    return e[1].t === e[0].t ? 0 : (e[1].d - e[0].d) / (e[1].t - e[0].t);
  let t = 0;
  for (let n = e.length - 1; n > 0; n--) {
    if (e[n].t === e[n - 1].t)
      continue;
    const a = Hi(t), l = (e[n].d - e[n - 1].d) / (e[n].t - e[n - 1].t);
    t += (l - a) * Math.abs(l), n === e.length - 1 && (t *= 0.5);
  }
  return Hi(t) * 1e3;
}
function Sf() {
  const e = {};
  function t(l) {
    Array.from(l.changedTouches).forEach((i) => {
      (e[i.identifier] ?? (e[i.identifier] = new ho(bf))).push([l.timeStamp, i]);
    });
  }
  function n(l) {
    Array.from(l.changedTouches).forEach((i) => {
      delete e[i.identifier];
    });
  }
  function a(l) {
    var u;
    const i = (u = e[l]) == null ? void 0 : u.values().reverse();
    if (!i)
      throw new Error(`No samples for touch id ${l}`);
    const o = i[0], r = [], s = [];
    for (const c of i) {
      if (o[0] - c[0] > yf) break;
      r.push({
        t: c[0],
        d: c[1].clientX
      }), s.push({
        t: c[0],
        d: c[1].clientY
      });
    }
    return {
      x: zi(r),
      y: zi(s),
      get direction() {
        const {
          x: c,
          y: d
        } = this, [f, v] = [Math.abs(c), Math.abs(d)];
        return f > v && c >= 0 ? "right" : f > v && c <= 0 ? "left" : v > f && d >= 0 ? "down" : v > f && d <= 0 ? "up" : wf();
      }
    };
  }
  return {
    addMovement: t,
    endTouch: n,
    getVelocity: a
  };
}
function wf() {
  throw new Error();
}
function xf(e) {
  let {
    el: t,
    isActive: n,
    isTemporary: a,
    width: l,
    touchless: i,
    position: o
  } = e;
  gt(() => {
    window.addEventListener("touchstart", h, {
      passive: !0
    }), window.addEventListener("touchmove", y, {
      passive: !1
    }), window.addEventListener("touchend", x, {
      passive: !0
    });
  }), et(() => {
    window.removeEventListener("touchstart", h), window.removeEventListener("touchmove", y), window.removeEventListener("touchend", x);
  });
  const r = V(() => ["left", "right"].includes(o.value)), {
    addMovement: s,
    endTouch: u,
    getVelocity: c
  } = Sf();
  let d = !1;
  const f = G(!1), v = G(0), g = G(0);
  let m;
  function w(k, P) {
    return (o.value === "left" ? k : o.value === "right" ? document.documentElement.clientWidth - k : o.value === "top" ? k : o.value === "bottom" ? document.documentElement.clientHeight - k : Qt()) - (P ? l.value : 0);
  }
  function b(k) {
    let P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    const S = o.value === "left" ? (k - g.value) / l.value : o.value === "right" ? (document.documentElement.clientWidth - k - g.value) / l.value : o.value === "top" ? (k - g.value) / l.value : o.value === "bottom" ? (document.documentElement.clientHeight - k - g.value) / l.value : Qt();
    return P ? $e(S) : S;
  }
  function h(k) {
    if (i.value) return;
    const P = k.changedTouches[0].clientX, S = k.changedTouches[0].clientY, A = 25, T = o.value === "left" ? P < A : o.value === "right" ? P > document.documentElement.clientWidth - A : o.value === "top" ? S < A : o.value === "bottom" ? S > document.documentElement.clientHeight - A : Qt(), _ = n.value && (o.value === "left" ? P < l.value : o.value === "right" ? P > document.documentElement.clientWidth - l.value : o.value === "top" ? S < l.value : o.value === "bottom" ? S > document.documentElement.clientHeight - l.value : Qt());
    (T || _ || n.value && a.value) && (m = [P, S], g.value = w(r.value ? P : S, n.value), v.value = b(r.value ? P : S), d = g.value > -20 && g.value < 80, u(k), s(k));
  }
  function y(k) {
    const P = k.changedTouches[0].clientX, S = k.changedTouches[0].clientY;
    if (d) {
      if (!k.cancelable) {
        d = !1;
        return;
      }
      const T = Math.abs(P - m[0]), _ = Math.abs(S - m[1]);
      (r.value ? T > _ && T > 3 : _ > T && _ > 3) ? (f.value = !0, d = !1) : (r.value ? _ : T) > 3 && (d = !1);
    }
    if (!f.value) return;
    k.preventDefault(), s(k);
    const A = b(r.value ? P : S, !1);
    v.value = Math.max(0, Math.min(1, A)), A > 1 ? g.value = w(r.value ? P : S, !0) : A < 0 && (g.value = w(r.value ? P : S, !1));
  }
  function x(k) {
    if (d = !1, !f.value) return;
    s(k), f.value = !1;
    const P = c(k.changedTouches[0].identifier), S = Math.abs(P.x), A = Math.abs(P.y);
    (r.value ? S > A && S > 400 : A > S && A > 3) ? n.value = P.direction === ({
      left: "right",
      right: "left",
      top: "down",
      bottom: "up"
    }[o.value] || Qt()) : n.value = v.value > 0.5;
  }
  const p = V(() => f.value ? {
    transform: o.value === "left" ? `translateX(calc(-100% + ${v.value * l.value}px))` : o.value === "right" ? `translateX(calc(100% - ${v.value * l.value}px))` : o.value === "top" ? `translateY(calc(-100% + ${v.value * l.value}px))` : o.value === "bottom" ? `translateY(calc(100% - ${v.value * l.value}px))` : Qt(),
    transition: "none"
  } : void 0);
  return Je(f, () => {
    var S, A;
    const k = ((S = t.value) == null ? void 0 : S.style.transform) ?? null, P = ((A = t.value) == null ? void 0 : A.style.transition) ?? null;
    Le(() => {
      var T, _, B, F;
      (_ = t.value) == null || _.style.setProperty("transform", ((T = p.value) == null ? void 0 : T.transform) || "none"), (F = t.value) == null || F.style.setProperty("transition", ((B = p.value) == null ? void 0 : B.transition) || null);
    }), De(() => {
      var T, _;
      (T = t.value) == null || T.style.setProperty("transform", k), (_ = t.value) == null || _.style.setProperty("transition", P);
    });
  }), {
    isDragging: f,
    dragProgress: v,
    dragStyles: p
  };
}
function Qt() {
  throw new Error();
}
const yr = O({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function br(e, t) {
  let n = () => {
  };
  function a(o, r) {
    n == null || n();
    const s = o ? e.openDelay : e.closeDelay, u = Math.max((r == null ? void 0 : r.minDelay) ?? 0, Number(s ?? 0));
    return new Promise((c) => {
      n = ku(u, () => {
        t == null || t(o), c(o);
      });
    });
  }
  function l() {
    return a(!0);
  }
  function i(o) {
    return a(!1, o);
  }
  return {
    clearDelay: n,
    runOpenDelay: l,
    runCloseDelay: i
  };
}
const Sr = O({
  retainFocus: Boolean,
  captureFocus: Boolean,
  /** @deprecated */
  disableInitialFocus: Boolean
}, "focusTrap"), qn = /* @__PURE__ */ new Map();
let Wi = 0;
function ji(e) {
  const t = document.activeElement;
  if (e.key !== "Tab" || !t) return;
  const n = Array.from(qn.values()).filter((u) => {
    var f;
    let {
      isActive: c,
      contentEl: d
    } = u;
    return c.value && ((f = d.value) == null ? void 0 : f.contains(t));
  }).map((u) => u.contentEl.value);
  let a, l = t.parentElement;
  for (; l; ) {
    if (n.includes(l)) {
      a = l;
      break;
    }
    l = l.parentElement;
  }
  if (!a) return;
  const i = Nt(a).filter((u) => u.tabIndex >= 0);
  if (!i.length) return;
  const o = document.activeElement;
  if (i.length === 1 && i[0].classList.contains("v-list") && i[0].contains(o)) {
    e.preventDefault();
    return;
  }
  const r = i[0], s = i[i.length - 1];
  e.shiftKey && (o === r || r.classList.contains("v-list") && r.contains(o)) && (e.preventDefault(), s.focus()), !e.shiftKey && (o === s || s.classList.contains("v-list") && s.contains(o)) && (e.preventDefault(), r.focus());
}
function wr(e, t) {
  let {
    isActive: n,
    localTop: a,
    activatorEl: l,
    contentEl: i
  } = t;
  const o = Symbol("trap");
  let r = !1, s = -1;
  async function u() {
    r = !0, s = window.setTimeout(() => {
      r = !1;
    }, 100);
  }
  async function c(v) {
    var w;
    const g = v.relatedTarget, m = v.target;
    document.removeEventListener("pointerdown", u), document.removeEventListener("keydown", d), await me(), n.value && !r && g !== m && i.value && // We're the menu without open submenus or overlays
    Oe(a) && // It isn't the document or the container body
    ![document, i.value].includes(m) && // It isn't inside the container body
    !i.value.contains(m) && ((w = Nt(i.value)[0]) == null || w.focus());
  }
  function d(v) {
    if (v.key === "Tab" && (document.removeEventListener("keydown", d), n.value && i.value && v.target && !i.value.contains(v.target))) {
      const g = Nt(document.documentElement);
      if (v.shiftKey && v.target === g.at(0) || !v.shiftKey && v.target === g.at(-1)) {
        const m = Nt(i.value);
        m.length > 0 && (v.preventDefault(), m[0].focus());
      }
    }
  }
  const f = E(() => n.value && e.captureFocus && !e.disableInitialFocus);
  ye && (q(() => e.retainFocus, (v) => {
    v ? qn.set(o, {
      isActive: n,
      contentEl: i
    }) : qn.delete(o);
  }, {
    immediate: !0
  }), q(f, (v) => {
    v ? (document.addEventListener("pointerdown", u), document.addEventListener("focusin", c, {
      once: !0
    }), document.addEventListener("keydown", d)) : (document.removeEventListener("pointerdown", u), document.removeEventListener("focusin", c), document.removeEventListener("keydown", d));
  }, {
    immediate: !0
  }), Wi++ < 1 && document.addEventListener("keydown", ji)), De(() => {
    qn.delete(o), clearTimeout(s), document.removeEventListener("pointerdown", u), document.removeEventListener("focusin", c), document.removeEventListener("keydown", d), --Wi < 1 && document.removeEventListener("keydown", ji);
  });
}
function mn() {
  const t = Ie("useScopeId").vnode.scopeId;
  return {
    scopeId: t ? {
      [t]: ""
    } : void 0
  };
}
const kf = ["start", "end", "left", "right", "top", "bottom"], Cf = O({
  color: String,
  disableResizeWatcher: Boolean,
  disableRouteWatcher: Boolean,
  expandOnHover: Boolean,
  floating: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  },
  permanent: Boolean,
  rail: {
    type: Boolean,
    default: null
  },
  railWidth: {
    type: [Number, String],
    default: 56
  },
  scrim: {
    type: [Boolean, String],
    default: !0
  },
  image: String,
  temporary: Boolean,
  persistent: Boolean,
  touchless: Boolean,
  width: {
    type: [Number, String],
    default: 256
  },
  location: {
    type: String,
    default: "start",
    validator: (e) => kf.includes(e)
  },
  sticky: Boolean,
  ...bt(),
  ...re(),
  ...yr(),
  ...Fn({
    mobile: null
  }),
  ...wt(),
  ...Ro(),
  ...Ue(),
  ..._e(Sr(), ["disableInitialFocus"]),
  ...he({
    tag: "nav"
  }),
  ...Ce()
}, "VNavigationDrawer"), dg = U()({
  name: "VNavigationDrawer",
  props: Cf(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:rail": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: a,
      slots: l
    } = t;
    const {
      isRtl: i
    } = tt(), {
      themeClasses: o
    } = Ae(e), {
      borderClasses: r
    } = Ct(e), {
      backgroundColorClasses: s,
      backgroundColorStyles: u
    } = Xe(() => e.color), {
      elevationClasses: c
    } = pt(e), {
      displayClasses: d,
      mobile: f
    } = Et(e), {
      roundedClasses: v
    } = qe(e), g = ar(), m = fe(e, "modelValue", null, ($) => !!$), {
      ssrBootStyles: w
    } = On(), {
      scopeId: b
    } = mn(), h = K(), y = G(!1), {
      runOpenDelay: x,
      runCloseDelay: p
    } = br(e, ($) => {
      y.value = $;
    }), k = V(() => e.rail && e.expandOnHover && y.value ? Number(e.width) : Number(e.rail ? e.railWidth : e.width)), P = V(() => el(e.location, i.value)), S = E(() => e.persistent), A = V(() => !e.permanent && (f.value || e.temporary)), T = V(() => e.sticky && !A.value && P.value !== "bottom");
    wr(e, {
      isActive: m,
      localTop: A,
      contentEl: h
    }), Je(() => e.expandOnHover && e.rail != null, () => {
      q(y, ($) => a("update:rail", !$));
    }), Je(() => !e.disableResizeWatcher, () => {
      q(A, ($) => !e.permanent && me(() => m.value = !$));
    }), Je(() => !e.disableRouteWatcher && !!g, () => {
      q(g.currentRoute, () => A.value && (m.value = !1));
    }), q(() => e.permanent, ($) => {
      $ && (m.value = !0);
    }), e.modelValue == null && !A.value && (m.value = e.permanent || !f.value);
    const {
      isDragging: _,
      dragProgress: B
    } = xf({
      el: h,
      isActive: m,
      isTemporary: A,
      width: k,
      touchless: E(() => e.touchless),
      position: P
    }), F = V(() => {
      const $ = A.value ? 0 : e.rail && e.expandOnHover ? Number(e.railWidth) : k.value;
      return _.value ? $ * B.value : $;
    }), {
      layoutItemStyles: D,
      layoutItemScrimStyles: L
    } = Ho({
      id: e.name,
      order: V(() => parseInt(e.order, 10)),
      position: P,
      layoutSize: F,
      elementSize: k,
      active: ba(m),
      disableTransitions: E(() => _.value),
      absolute: V(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        e.absolute || T.value && typeof Y.value != "string"
      ))
    }), {
      isStuck: Y,
      stickyStyles: z
    } = hf({
      rootEl: h,
      isSticky: T,
      layoutItemStyles: D
    }), ee = Xe(() => typeof e.scrim == "string" ? e.scrim : null), ie = V(() => ({
      ..._.value ? {
        opacity: B.value * 0.2,
        transition: "none"
      } : void 0,
      ...L.value
    }));
    return ot({
      VList: {
        bgColor: "transparent"
      }
    }), J(() => {
      const $ = l.image || e.image;
      return I(de, null, [C(e.tag, j({
        ref: h,
        onMouseenter: x,
        onMouseleave: p,
        class: ["v-navigation-drawer", `v-navigation-drawer--${P.value}`, {
          "v-navigation-drawer--expand-on-hover": e.expandOnHover,
          "v-navigation-drawer--floating": e.floating,
          "v-navigation-drawer--is-hovering": y.value,
          "v-navigation-drawer--rail": e.rail,
          "v-navigation-drawer--temporary": A.value,
          "v-navigation-drawer--persistent": S.value,
          "v-navigation-drawer--active": m.value,
          "v-navigation-drawer--sticky": T.value
        }, o.value, s.value, r.value, d.value, c.value, v.value, e.class],
        style: [u.value, D.value, w.value, z.value, e.style],
        inert: !m.value
      }, b, n), {
        default: () => {
          var Z, M, N;
          return [$ && I("div", {
            key: "image",
            class: "v-navigation-drawer__img"
          }, [l.image ? C(ke, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                alt: "",
                cover: !0,
                height: "inherit",
                src: e.image
              }
            }
          }, l.image) : C(Va, {
            key: "image-img",
            alt: "",
            cover: !0,
            height: "inherit",
            src: e.image
          }, null)]), l.prepend && I("div", {
            class: "v-navigation-drawer__prepend"
          }, [(Z = l.prepend) == null ? void 0 : Z.call(l)]), I("div", {
            class: "v-navigation-drawer__content"
          }, [(M = l.default) == null ? void 0 : M.call(l)]), l.append && I("div", {
            class: "v-navigation-drawer__append"
          }, [(N = l.append) == null ? void 0 : N.call(l)])];
        }
      }), C(_t, {
        name: "fade-transition"
      }, {
        default: () => [A.value && (_.value || m.value) && !!e.scrim && I("div", j({
          class: ["v-navigation-drawer__scrim", ee.backgroundColorClasses.value],
          style: [ie.value, ee.backgroundColorStyles.value],
          onClick: () => {
            S.value || (m.value = !1);
          }
        }, b), null)]
      })]);
    }), {
      isStuck: Y
    };
  }
}), xr = O({
  text: String,
  ...re(),
  ...he()
}, "VToolbarTitle"), kr = U()({
  name: "VToolbarTitle",
  props: xr(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return J(() => {
      const a = !!(n.default || n.text || e.text);
      return C(e.tag, {
        class: Q(["v-toolbar-title", e.class]),
        style: oe(e.style)
      }, {
        default: () => {
          var l;
          return [a && I("div", {
            class: "v-toolbar-title__placeholder"
          }, [n.text ? n.text() : e.text, (l = n.default) == null ? void 0 : l.call(n)])];
        }
      });
    }), {};
  }
}), pf = [null, "prominent", "default", "comfortable", "compact"], Cr = O({
  absolute: Boolean,
  collapse: Boolean,
  collapsePosition: {
    type: String,
    default: "start"
  },
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (e) => pf.includes(e)
  },
  extended: {
    type: Boolean,
    default: null
  },
  extensionHeight: {
    type: [Number, String],
    default: 48
  },
  flat: Boolean,
  floating: Boolean,
  height: {
    type: [Number, String],
    default: 64
  },
  image: String,
  title: String,
  ...bt(),
  ...re(),
  ...wt(),
  ...Ue(),
  ...he({
    tag: "header"
  }),
  ...Ce()
}, "VToolbar"), Gi = U()({
  name: "VToolbar",
  props: Cr(),
  setup(e, t) {
    var v;
    let {
      slots: n
    } = t;
    const {
      backgroundColorClasses: a,
      backgroundColorStyles: l
    } = Xe(() => e.color), {
      borderClasses: i
    } = Ct(e), {
      elevationClasses: o
    } = pt(e), {
      roundedClasses: r
    } = qe(e), {
      themeClasses: s
    } = Ae(e), {
      rtlClasses: u
    } = tt(), c = G(e.extended === null ? !!((v = n.extension) != null && v.call(n)) : e.extended), d = V(() => parseInt(Number(e.height) + (e.density === "prominent" ? Number(e.height) : 0) - (e.density === "comfortable" ? 8 : 0) - (e.density === "compact" ? 16 : 0), 10)), f = V(() => c.value ? parseInt(Number(e.extensionHeight) + (e.density === "prominent" ? Number(e.extensionHeight) : 0) - (e.density === "comfortable" ? 4 : 0) - (e.density === "compact" ? 8 : 0), 10) : 0);
    return ot({
      VBtn: {
        variant: "text"
      }
    }), J(() => {
      var b;
      const g = !!(e.title || n.title), m = !!(n.image || e.image), w = (b = n.extension) == null ? void 0 : b.call(n);
      return c.value = e.extended === null ? !!w : e.extended, C(e.tag, {
        class: Q(["v-toolbar", `v-toolbar--collapse-${e.collapsePosition}`, {
          "v-toolbar--absolute": e.absolute,
          "v-toolbar--collapse": e.collapse,
          "v-toolbar--flat": e.flat,
          "v-toolbar--floating": e.floating,
          [`v-toolbar--density-${e.density}`]: !0
        }, a.value, i.value, o.value, r.value, s.value, u.value, e.class]),
        style: oe([l.value, e.style])
      }, {
        default: () => [m && I("div", {
          key: "image",
          class: "v-toolbar__image"
        }, [n.image ? C(ke, {
          key: "image-defaults",
          disabled: !e.image,
          defaults: {
            VImg: {
              cover: !0,
              src: e.image
            }
          }
        }, n.image) : C(Va, {
          key: "image-img",
          cover: !0,
          src: e.image
        }, null)]), C(ke, {
          defaults: {
            VTabs: {
              height: X(d.value)
            }
          }
        }, {
          default: () => {
            var h, y, x;
            return [I("div", {
              class: "v-toolbar__content",
              style: {
                height: X(d.value)
              }
            }, [n.prepend && I("div", {
              class: "v-toolbar__prepend"
            }, [(h = n.prepend) == null ? void 0 : h.call(n)]), g && C(kr, {
              key: "title",
              text: e.title
            }, {
              text: n.title
            }), (y = n.default) == null ? void 0 : y.call(n), n.append && I("div", {
              class: "v-toolbar__append"
            }, [(x = n.append) == null ? void 0 : x.call(n)])])];
          }
        }), C(ke, {
          defaults: {
            VTabs: {
              height: X(f.value)
            }
          }
        }, {
          default: () => [C(Go, null, {
            default: () => [c.value && I("div", {
              class: "v-toolbar__extension",
              style: {
                height: X(f.value)
              }
            }, [w])]
          })]
        })]
      });
    }), {
      contentHeight: d,
      extensionHeight: f
    };
  }
}), Vf = O({
  scrollTarget: {
    type: String
  },
  scrollThreshold: {
    type: [String, Number],
    default: 300
  }
}, "scroll");
function Pf(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    canScroll: n,
    layoutSize: a
  } = t;
  let l = 0, i = 0;
  const o = K(null), r = G(0), s = G(0), u = G(0), c = G(!1), d = G(!1), f = G(!1), v = G(!1), g = G(!0), m = V(() => Number(e.scrollThreshold)), w = V(() => $e((m.value - r.value) / m.value || 0));
  function b(p) {
    const k = "window" in p ? window.innerHeight : p.clientHeight, P = "window" in p ? document.documentElement.scrollHeight : p.scrollHeight;
    return {
      clientHeight: k,
      scrollHeight: P
    };
  }
  function h() {
    const p = o.value;
    if (!p) return;
    const {
      clientHeight: k,
      scrollHeight: P
    } = b(p), S = P - k, A = (a == null ? void 0 : a.value) || 0, T = m.value + A;
    g.value = S > T;
  }
  function y() {
    h();
  }
  function x() {
    const p = o.value;
    if (!p || n && !n.value) return;
    l = r.value, r.value = "window" in p ? p.pageYOffset : p.scrollTop;
    const k = p instanceof Window ? document.documentElement.scrollHeight : p.scrollHeight;
    i !== k && (k > i && h(), i = k), d.value = r.value < l, u.value = Math.abs(r.value - m.value);
    const {
      clientHeight: P,
      scrollHeight: S
    } = b(p), A = r.value + P >= S - 5;
    !d.value && A && r.value >= m.value && g.value && (v.value = !0);
    const T = Math.abs(r.value - l) > 100, _ = r.value <= 5;
    (d.value && l - r.value > 1 && !A || T && r.value < m.value || _) && (v.value = !1), f.value = A;
  }
  return q(d, () => {
    s.value = s.value || r.value;
  }), q(c, () => {
    s.value = 0;
  }), gt(() => {
    q(() => e.scrollTarget, (p) => {
      var P;
      const k = p ? document.querySelector(p) : window;
      if (!k) {
        it(`Unable to locate element with identifier ${p}`);
        return;
      }
      k !== o.value && ((P = o.value) == null || P.removeEventListener("scroll", x), o.value = k, o.value.addEventListener("scroll", x, {
        passive: !0
      }), Promise.resolve().then(() => {
        h();
      }));
    }, {
      immediate: !0
    }), window.addEventListener("resize", y, {
      passive: !0
    });
  }), et(() => {
    var p;
    (p = o.value) == null || p.removeEventListener("scroll", x), window.removeEventListener("resize", y);
  }), n && q(n, x, {
    immediate: !0
  }), {
    scrollThreshold: m,
    currentScroll: r,
    currentThreshold: u,
    isScrollActive: c,
    scrollRatio: w,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp: d,
    savedScroll: s,
    isAtBottom: f,
    reachedBottomWhileScrollingDown: v,
    hasEnoughScrollableSpace: g
  };
}
const If = O({
  scrollBehavior: String,
  modelValue: {
    type: Boolean,
    default: !0
  },
  location: {
    type: String,
    default: "top",
    validator: (e) => ["top", "bottom"].includes(e)
  },
  ...Cr(),
  ...Ro(),
  ...Vf(),
  height: {
    type: [Number, String],
    default: 64
  }
}, "VAppBar"), fg = U()({
  name: "VAppBar",
  props: If(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = K(), l = fe(e, "modelValue"), i = V(() => {
      var P;
      const k = new Set(((P = e.scrollBehavior) == null ? void 0 : P.split(" ")) ?? []);
      return {
        hide: k.has("hide"),
        fullyHide: k.has("fully-hide"),
        inverted: k.has("inverted"),
        collapse: k.has("collapse"),
        elevate: k.has("elevate"),
        fadeImage: k.has("fade-image")
        // shrink: behavior.has('shrink'),
      };
    }), o = V(() => {
      const k = i.value;
      return k.hide || k.fullyHide || k.inverted || k.collapse || k.elevate || k.fadeImage || // behavior.shrink ||
      !l.value;
    }), r = V(() => {
      var S, A;
      const k = ((S = a.value) == null ? void 0 : S.contentHeight) ?? 0, P = ((A = a.value) == null ? void 0 : A.extensionHeight) ?? 0;
      return k + P;
    }), {
      currentScroll: s,
      scrollThreshold: u,
      isScrollingUp: c,
      scrollRatio: d,
      isAtBottom: f,
      reachedBottomWhileScrollingDown: v,
      hasEnoughScrollableSpace: g
    } = Pf(e, {
      canScroll: o,
      layoutSize: r
    }), m = E(() => i.value.hide || i.value.fullyHide), w = V(() => e.collapse || i.value.collapse && (i.value.inverted ? d.value > 0 : d.value === 0)), b = V(() => e.flat || i.value.fullyHide && !l.value || i.value.elevate && (i.value.inverted ? s.value > 0 : s.value === 0)), h = V(() => i.value.fadeImage ? i.value.inverted ? 1 - d.value : d.value : void 0), y = V(() => {
      var S, A;
      if (i.value.hide && i.value.inverted) return 0;
      const k = ((S = a.value) == null ? void 0 : S.contentHeight) ?? 0, P = ((A = a.value) == null ? void 0 : A.extensionHeight) ?? 0;
      return m.value ? s.value < u.value || i.value.fullyHide ? k + P : k : k + P;
    });
    Je(() => !!e.scrollBehavior, () => {
      Le(() => {
        if (!m.value) {
          l.value = !0;
          return;
        }
        if (i.value.inverted) {
          l.value = s.value > u.value;
          return;
        }
        if (!g.value) {
          l.value = !0;
          return;
        }
        if (v.value) {
          l.value = !1;
          return;
        }
        l.value = c.value && !f.value || s.value < u.value;
      });
    });
    const {
      ssrBootStyles: x
    } = On(), {
      layoutItemStyles: p
    } = Ho({
      id: e.name,
      order: V(() => parseInt(e.order, 10)),
      position: E(() => e.location),
      layoutSize: y,
      elementSize: G(void 0),
      active: l,
      absolute: E(() => e.absolute)
    });
    return J(() => {
      const k = Gi.filterProps(e);
      return C(Gi, j({
        ref: a,
        class: ["v-app-bar", {
          "v-app-bar--bottom": e.location === "bottom"
        }, e.class],
        style: [{
          ...p.value,
          "--v-toolbar-image-opacity": h.value,
          height: void 0,
          ...x.value
        }, e.style]
      }, k, {
        collapse: w.value,
        flat: b.value
      }), n);
    }), {};
  }
}), pr = O({
  baseColor: String,
  divided: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...bt(),
  ...re(),
  ...We(),
  ...wt(),
  ...Ue(),
  ...he(),
  ...Ce(),
  ...St()
}, "VBtnGroup"), Yi = U()({
  name: "VBtnGroup",
  props: pr(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = Ae(e), {
      densityClasses: l
    } = mt(e), {
      borderClasses: i
    } = Ct(e), {
      elevationClasses: o
    } = pt(e), {
      roundedClasses: r
    } = qe(e);
    ot({
      VBtn: {
        height: E(() => e.direction === "horizontal" ? "auto" : null),
        baseColor: E(() => e.baseColor),
        color: E(() => e.color),
        density: E(() => e.density),
        flat: !0,
        variant: E(() => e.variant)
      }
    }), J(() => C(e.tag, {
      class: Q(["v-btn-group", `v-btn-group--${e.direction}`, {
        "v-btn-group--divided": e.divided
      }, a.value, i.value, l.value, o.value, r.value, e.class]),
      style: oe(e.style)
    }, n));
  }
}), Bl = O({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group"), Aa = O({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function Tn(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const a = Ie("useGroupItem");
  if (!a)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const l = ht();
  Pe(Symbol.for(`${t.description}:id`), l);
  const i = ge(t, null);
  if (!i) {
    if (!n) return i;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const o = E(() => e.value), r = V(() => !!(i.disabled.value || e.disabled));
  function s() {
    i == null || i.register({
      id: l,
      value: o,
      disabled: r
    }, a);
  }
  function u() {
    i == null || i.unregister(l);
  }
  s(), et(() => u());
  const c = V(() => i.isSelected(l)), d = V(() => i.items.value[0].id === l), f = V(() => i.items.value[i.items.value.length - 1].id === l), v = V(() => c.value && [i.selectedClass.value, e.selectedClass]);
  return q(c, (g) => {
    a.emit("group:selected", {
      value: g
    });
  }, {
    flush: "sync"
  }), {
    id: l,
    isSelected: c,
    isFirst: d,
    isLast: f,
    toggle: () => i.select(l, !c.value),
    select: (g) => i.select(l, g),
    selectedClass: v,
    value: o,
    disabled: r,
    group: i,
    register: s,
    unregister: u
  };
}
function Ta(e, t) {
  let n = !1;
  const a = Qe([]), l = fe(e, "modelValue", [], (f) => f === void 0 ? [] : Vr(a, f === null ? [null] : Me(f)), (f) => {
    const v = Tf(a, f);
    return e.multiple ? v : v[0];
  }), i = Ie("useGroup");
  function o(f, v) {
    const g = f, m = Symbol.for(`${t.description}:id`), b = en(m, i == null ? void 0 : i.vnode).indexOf(v);
    ut(g.value) === void 0 && (g.value = b, g.useIndexAsValue = !0), b > -1 ? a.splice(b, 0, g) : a.push(g);
  }
  function r(f) {
    if (n) return;
    s();
    const v = a.findIndex((g) => g.id === f);
    a.splice(v, 1);
  }
  function s() {
    const f = a.find((v) => !v.disabled);
    f && e.mandatory === "force" && !l.value.length && (l.value = [f.id]);
  }
  gt(() => {
    s();
  }), et(() => {
    n = !0;
  }), cu(() => {
    for (let f = 0; f < a.length; f++)
      a[f].useIndexAsValue && (a[f].value = f);
  });
  function u(f, v) {
    const g = a.find((m) => m.id === f);
    if (!(v && (g != null && g.disabled)))
      if (e.multiple) {
        const m = l.value.slice(), w = m.findIndex((h) => h === f), b = ~w;
        if (v = v ?? !b, b && e.mandatory && m.length <= 1 || !b && e.max != null && m.length + 1 > e.max) return;
        w < 0 && v ? m.push(f) : w >= 0 && !v && m.splice(w, 1), l.value = m;
      } else {
        const m = l.value.includes(f);
        if (e.mandatory && m || !m && !v) return;
        l.value = v ?? !m ? [f] : [];
      }
  }
  function c(f) {
    if (e.multiple && it('This method is not supported when using "multiple" prop'), l.value.length) {
      const v = l.value[0], g = a.findIndex((b) => b.id === v);
      let m = (g + f) % a.length, w = a[m];
      for (; w.disabled && m !== g; )
        m = (m + f) % a.length, w = a[m];
      if (w.disabled) return;
      l.value = [a[m].id];
    } else {
      const v = a.find((g) => !g.disabled);
      v && (l.value = [v.id]);
    }
  }
  const d = {
    register: o,
    unregister: r,
    selected: l,
    select: u,
    disabled: E(() => e.disabled),
    prev: () => c(a.length - 1),
    next: () => c(1),
    isSelected: (f) => l.value.includes(f),
    selectedClass: E(() => e.selectedClass),
    items: E(() => a),
    getItemIndex: (f) => Af(a, f)
  };
  return Pe(t, d), d;
}
function Af(e, t) {
  const n = Vr(e, [t]);
  return n.length ? e.findIndex((a) => a.id === n[0]) : -1;
}
function Vr(e, t) {
  const n = [];
  return t.forEach((a) => {
    const l = e.find((o) => Ke(a, o.value)), i = e[a];
    (l == null ? void 0 : l.value) !== void 0 ? n.push(l.id) : i != null && i.useIndexAsValue && n.push(i.id);
  }), n;
}
function Tf(e, t) {
  const n = [];
  return t.forEach((a) => {
    const l = e.findIndex((i) => i.id === a);
    if (~l) {
      const i = e[l];
      n.push(i.value !== void 0 ? i.value : l);
    }
  }), n;
}
const Pr = Symbol.for("vuetify:v-btn-toggle"), Ef = O({
  ...pr(),
  ...Bl()
}, "VBtnToggle"), vg = U()({
  name: "VBtnToggle",
  props: Ef(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isSelected: a,
      next: l,
      prev: i,
      select: o,
      selected: r
    } = Ta(e, Pr);
    return J(() => {
      const s = Yi.filterProps(e);
      return C(Yi, j({
        class: ["v-btn-toggle", e.class]
      }, s, {
        style: e.style
      }), {
        default: () => {
          var u;
          return [(u = n.default) == null ? void 0 : u.call(n, {
            isSelected: a,
            next: l,
            prev: i,
            select: o,
            selected: r
          })];
        }
      });
    }), {
      next: l,
      prev: i,
      select: o
    };
  }
});
function Ir(e, t) {
  const n = K(), a = G(!1);
  if (ml) {
    const l = new IntersectionObserver((i) => {
      a.value = !!i.find((o) => o.isIntersecting);
    }, t);
    De(() => {
      l.disconnect();
    }), q(n, (i, o) => {
      o && (l.unobserve(o), a.value = !1), i && l.observe(i);
    }, {
      flush: "post"
    });
  }
  return {
    intersectionRef: n,
    isIntersecting: a
  };
}
const _f = O({
  bgColor: String,
  color: String,
  indeterminate: [Boolean, String],
  rounded: Boolean,
  modelValue: {
    type: [Number, String],
    default: 0
  },
  rotate: {
    type: [Number, String],
    default: 0
  },
  width: {
    type: [Number, String],
    default: 4
  },
  ...re(),
  ...vn(),
  ...he({
    tag: "div"
  }),
  ...Ce()
}, "VProgressCircular"), Bf = U()({
  name: "VProgressCircular",
  props: _f(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = 20, l = 2 * Math.PI * a, i = K(), {
      themeClasses: o
    } = Ae(e), {
      sizeClasses: r,
      sizeStyles: s
    } = Mn(e), {
      textColorClasses: u,
      textColorStyles: c
    } = dt(() => e.color), {
      textColorClasses: d,
      textColorStyles: f
    } = dt(() => e.bgColor), {
      intersectionRef: v,
      isIntersecting: g
    } = Ir(), {
      resizeRef: m,
      contentRect: w
    } = Ft(), b = E(() => $e(parseFloat(e.modelValue), 0, 100)), h = E(() => Number(e.width)), y = E(() => s.value ? Number(e.size) : w.value ? w.value.width : Math.max(h.value, 32)), x = E(() => a / (1 - h.value / y.value) * 2), p = E(() => h.value / y.value * x.value), k = E(() => {
      const S = (100 - b.value) / 100 * l;
      return e.rounded && b.value > 0 && b.value < 100 ? X(Math.min(l - 0.01, S + p.value)) : X(S);
    }), P = V(() => {
      const S = Number(e.rotate);
      return e.rounded ? S + p.value / 2 / l * 360 : S;
    });
    return Le(() => {
      v.value = i.value, m.value = i.value;
    }), J(() => C(e.tag, {
      ref: i,
      class: Q(["v-progress-circular", {
        "v-progress-circular--indeterminate": !!e.indeterminate,
        "v-progress-circular--visible": g.value,
        "v-progress-circular--disable-shrink": e.indeterminate && (e.indeterminate === "disable-shrink" || Wt())
      }, o.value, r.value, u.value, e.class]),
      style: oe([s.value, c.value, e.style]),
      role: "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": e.indeterminate ? void 0 : b.value
    }, {
      default: () => [I("svg", {
        style: {
          transform: `rotate(calc(-90deg + ${P.value}deg))`
        },
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `0 0 ${x.value} ${x.value}`
      }, [I("circle", {
        class: Q(["v-progress-circular__underlay", d.value]),
        style: oe(f.value),
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: a,
        "stroke-width": p.value,
        "stroke-dasharray": l,
        "stroke-dashoffset": 0
      }, null), I("circle", {
        class: "v-progress-circular__overlay",
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: a,
        "stroke-width": p.value,
        "stroke-dasharray": l,
        "stroke-dashoffset": k.value,
        "stroke-linecap": e.rounded ? "round" : void 0
      }, null)]), n.default && I("div", {
        class: "v-progress-circular__content"
      }, [n.default({
        value: b.value
      })])]
    })), {};
  }
}), Ui = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, gn = O({
  location: String
}, "location");
function Rn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: a
  } = tt();
  return {
    locationStyles: V(() => {
      if (!e.location) return {};
      const {
        side: i,
        align: o
      } = Ja(e.location.split(" ").length > 1 ? e.location : `${e.location} center`, a.value);
      function r(u) {
        return n ? n(u) : 0;
      }
      const s = {};
      return i !== "center" && (t ? s[Ui[i]] = `calc(100% - ${r(i)}px)` : s[i] = 0), o !== "center" ? t ? s[Ui[o]] = `calc(100% - ${r(o)}px)` : s[o] = 0 : (i === "center" ? s.top = s.left = "50%" : s[{
        top: "left",
        bottom: "left",
        left: "top",
        right: "top"
      }[i]] = "50%", s.transform = {
        top: "translateX(-50%)",
        bottom: "translateX(-50%)",
        left: "translateY(-50%)",
        right: "translateY(-50%)",
        center: "translate(-50%, -50%)"
      }[i]), s;
    })
  };
}
const Df = O({
  chunkCount: {
    type: [Number, String],
    default: null
  },
  chunkWidth: {
    type: [Number, String],
    default: null
  },
  chunkGap: {
    type: [Number, String],
    default: 4
  }
}, "chunks");
function Ff(e, t) {
  const n = E(() => !!e.chunkCount || !!e.chunkWidth), a = V(() => {
    const r = Oe(t);
    if (!r)
      return 0;
    if (!e.chunkCount)
      return Number(e.chunkWidth);
    const s = Number(e.chunkCount);
    return (r - Number(e.chunkGap) * (s - 1)) / s;
  }), l = E(() => Number(e.chunkGap)), i = V(() => {
    if (!n.value)
      return {};
    const r = X(l.value), s = X(a.value);
    return {
      maskRepeat: "repeat-x",
      maskImage: `linear-gradient(90deg, #000, #000 ${s}, transparent ${s}, transparent)`,
      maskSize: `calc(${s} + ${r}) 100%`
    };
  });
  function o(r) {
    const s = Oe(t);
    if (!s)
      return r;
    const u = 100 * l.value / s, c = 100 * (a.value + l.value) / s, d = Math.floor((r + u) / c);
    return $e(0, d * c - u / 2, 100);
  }
  return {
    hasChunks: n,
    chunksMaskStyles: i,
    snapValueToChunk: o
  };
}
const Of = O({
  absolute: Boolean,
  active: {
    type: Boolean,
    default: !0
  },
  bgColor: String,
  bgOpacity: [Number, String],
  bufferValue: {
    type: [Number, String],
    default: 0
  },
  bufferColor: String,
  bufferOpacity: [Number, String],
  clickable: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: 4
  },
  indeterminate: Boolean,
  max: {
    type: [Number, String],
    default: 100
  },
  modelValue: {
    type: [Number, String],
    default: 0
  },
  opacity: [Number, String],
  reverse: Boolean,
  stream: Boolean,
  striped: Boolean,
  roundedBar: Boolean,
  ...Df(),
  ...re(),
  ...gn({
    location: "top"
  }),
  ...Ue(),
  ...he(),
  ...Ce()
}, "VProgressLinear"), Ar = U()({
  name: "VProgressLinear",
  props: Of(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = K(), l = fe(e, "modelValue"), {
      isRtl: i,
      rtlClasses: o
    } = tt(), {
      themeClasses: r
    } = Ae(e), {
      locationStyles: s
    } = Rn(e), {
      textColorClasses: u,
      textColorStyles: c
    } = dt(() => e.color), {
      backgroundColorClasses: d,
      backgroundColorStyles: f
    } = Xe(() => e.bgColor || e.color), {
      backgroundColorClasses: v,
      backgroundColorStyles: g
    } = Xe(() => e.bufferColor || e.bgColor || e.color), {
      backgroundColorClasses: m,
      backgroundColorStyles: w
    } = Xe(() => e.color), {
      roundedClasses: b
    } = qe(e), {
      intersectionRef: h,
      isIntersecting: y
    } = Ir(), x = V(() => parseFloat(e.max)), p = V(() => parseFloat(e.height)), k = V(() => $e(parseFloat(e.bufferValue) / x.value * 100, 0, 100)), P = V(() => $e(parseFloat(l.value) / x.value * 100, 0, 100)), S = V(() => i.value !== e.reverse), A = V(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), T = G(0), {
      hasChunks: _,
      chunksMaskStyles: B,
      snapValueToChunk: F
    } = Ff(e, T);
    Je(_, () => {
      const {
        resizeRef: z
      } = Ft((ee) => T.value = ee[0].contentRect.width);
      Le(() => z.value = a.value);
    });
    const D = V(() => _.value ? F(k.value) : k.value), L = V(() => _.value ? F(P.value) : P.value);
    function Y(z) {
      if (!h.value) return;
      const {
        left: ee,
        right: ie,
        width: $
      } = h.value.getBoundingClientRect(), Z = S.value ? $ - z.clientX + (ie - $) : z.clientX - ee;
      l.value = Math.round(Z / $ * x.value);
    }
    return Le(() => {
      h.value = a.value;
    }), J(() => C(e.tag, {
      ref: a,
      class: Q(["v-progress-linear", {
        "v-progress-linear--absolute": e.absolute,
        "v-progress-linear--active": e.active && y.value,
        "v-progress-linear--reverse": S.value,
        "v-progress-linear--rounded": e.rounded,
        "v-progress-linear--rounded-bar": e.roundedBar,
        "v-progress-linear--striped": e.striped,
        "v-progress-linear--clickable": e.clickable
      }, b.value, r.value, o.value, e.class]),
      style: oe([{
        bottom: e.location === "bottom" ? 0 : void 0,
        top: e.location === "top" ? 0 : void 0,
        height: e.active ? X(p.value) : 0,
        "--v-progress-linear-height": X(p.value),
        ...e.absolute ? s.value : {}
      }, B.value, e.style]),
      role: "progressbar",
      "aria-hidden": e.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": e.max,
      "aria-valuenow": e.indeterminate ? void 0 : Math.min(parseFloat(l.value), x.value),
      onClick: e.clickable && Y
    }, {
      default: () => [e.stream && I("div", {
        key: "stream",
        class: Q(["v-progress-linear__stream", u.value]),
        style: {
          ...c.value,
          [S.value ? "left" : "right"]: X(-p.value),
          borderTop: `${X(p.value / 2)} dotted`,
          opacity: parseFloat(e.bufferOpacity),
          top: `calc(50% - ${X(p.value / 4)})`,
          width: X(100 - k.value, "%"),
          "--v-progress-linear-stream-to": X(p.value * (S.value ? 1 : -1))
        }
      }, null), I("div", {
        class: Q(["v-progress-linear__background", d.value]),
        style: oe([f.value, {
          opacity: parseFloat(e.bgOpacity),
          width: e.stream ? 0 : void 0
        }])
      }, null), I("div", {
        class: Q(["v-progress-linear__buffer", v.value]),
        style: oe([g.value, {
          opacity: parseFloat(e.bufferOpacity),
          width: X(D.value, "%")
        }])
      }, null), C(_t, {
        name: A.value
      }, {
        default: () => [e.indeterminate ? I("div", {
          class: "v-progress-linear__indeterminate"
        }, [["long", "short"].map((z) => I("div", {
          key: z,
          class: Q(["v-progress-linear__indeterminate", z, m.value]),
          style: oe(w.value)
        }, null))]) : I("div", {
          class: Q(["v-progress-linear__determinate", m.value]),
          style: oe([w.value, {
            width: X(L.value, "%")
          }])
        }, null)]
      }), n.default && I("div", {
        class: "v-progress-linear__content"
      }, [n.default({
        value: P.value,
        buffer: k.value
      })])]
    })), {};
  }
}), Ea = O({
  loading: [Boolean, String]
}, "loader");
function _a(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : kt();
  return {
    loaderClasses: E(() => ({
      [`${t}--loading`]: e.loading
    }))
  };
}
function Dl(e, t) {
  var a;
  let {
    slots: n
  } = t;
  return I("div", {
    class: Q(`${e.name}__loader`)
  }, [((a = n.default) == null ? void 0 : a.call(n, {
    color: e.color,
    isActive: e.active
  })) || C(Ar, {
    absolute: e.absolute,
    active: e.active,
    color: e.color,
    height: "2",
    indeterminate: !0
  }, null)]);
}
const Lf = ["static", "relative", "fixed", "absolute", "sticky"], Nn = O({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => Lf.includes(e)
    )
  }
}, "position");
function Hn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : kt();
  return {
    positionClasses: E(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function Mf(e, t) {
  q(() => {
    var n;
    return (n = e.isActive) == null ? void 0 : n.value;
  }, (n) => {
    e.isLink.value && n != null && t && me(() => {
      t(n);
    });
  }, {
    immediate: !0
  });
}
const Fl = O({
  active: {
    type: Boolean,
    default: void 0
  },
  activeColor: String,
  baseColor: String,
  symbol: {
    type: null,
    default: Pr
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: se,
  appendIcon: se,
  block: Boolean,
  readonly: Boolean,
  slim: Boolean,
  stacked: Boolean,
  spaced: String,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...bt(),
  ...re(),
  ...We(),
  ...ft(),
  ...wt(),
  ...Aa(),
  ...Ea(),
  ...gn(),
  ...Nn(),
  ...Ue(),
  ...Ia(),
  ...vn(),
  ...he({
    tag: "button"
  }),
  ...Ce(),
  ...St({
    variant: "elevated"
  })
}, "VBtn"), lt = U()({
  name: "VBtn",
  props: Fl(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      themeClasses: l
    } = Ae(e), {
      borderClasses: i
    } = Ct(e), {
      densityClasses: o
    } = mt(e), {
      dimensionStyles: r
    } = vt(e), {
      elevationClasses: s
    } = pt(e), {
      loaderClasses: u
    } = _a(e), {
      locationStyles: c
    } = Rn(e), {
      positionClasses: d
    } = Hn(e), {
      roundedClasses: f
    } = qe(e), {
      sizeClasses: v,
      sizeStyles: g
    } = Mn(e), m = Tn(e, e.symbol, !1), w = Pa(e, n), b = V(() => {
      var _;
      return e.active !== void 0 ? e.active : w.isRouterLink.value ? (_ = w.isActive) == null ? void 0 : _.value : m == null ? void 0 : m.isSelected.value;
    }), h = E(() => b.value ? e.activeColor ?? e.color : e.color), y = V(() => {
      var B, F;
      return {
        color: (m == null ? void 0 : m.isSelected.value) && (!w.isLink.value || ((B = w.isActive) == null ? void 0 : B.value)) || !m || ((F = w.isActive) == null ? void 0 : F.value) ? h.value ?? e.baseColor : e.baseColor,
        variant: e.variant
      };
    }), {
      colorClasses: x,
      colorStyles: p,
      variantClasses: k
    } = Kt(y), P = V(() => (m == null ? void 0 : m.disabled.value) || e.disabled), S = E(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), A = V(() => {
      if (!(e.value === void 0 || typeof e.value == "symbol"))
        return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
    });
    function T(_) {
      var B;
      P.value || w.isLink.value && (_.metaKey || _.ctrlKey || _.shiftKey || _.button !== 0 || n.target === "_blank") || (w.isRouterLink.value ? (B = w.navigate) == null || B.call(w, _) : m == null || m.toggle());
    }
    return Mf(w, m == null ? void 0 : m.select), J(() => {
      const _ = w.isLink.value ? "a" : e.tag, B = !!(e.prependIcon || a.prepend), F = !!(e.appendIcon || a.append), D = !!(e.icon && e.icon !== !0);
      return ze(C(_, j(w.linkProps, {
        type: _ === "a" ? void 0 : "button",
        class: ["v-btn", m == null ? void 0 : m.selectedClass.value, {
          "v-btn--active": b.value,
          "v-btn--block": e.block,
          "v-btn--disabled": P.value,
          "v-btn--elevated": S.value,
          "v-btn--flat": e.flat,
          "v-btn--icon": !!e.icon,
          "v-btn--loading": e.loading,
          "v-btn--readonly": e.readonly,
          "v-btn--slim": e.slim,
          "v-btn--stacked": e.stacked
        }, e.spaced ? ["v-btn--spaced", `v-btn--spaced-${e.spaced}`] : [], l.value, i.value, x.value, o.value, s.value, u.value, d.value, f.value, v.value, k.value, e.class],
        style: [p.value, r.value, c.value, g.value, e.style],
        "aria-busy": e.loading ? !0 : void 0,
        disabled: P.value && _ !== "a" || void 0,
        tabindex: e.loading || e.readonly ? -1 : void 0,
        onClick: T,
        value: A.value
      }), {
        default: () => {
          var L;
          return [Ut(!0, "v-btn"), !e.icon && B && I("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [a.prepend ? C(ke, {
            key: "prepend-defaults",
            disabled: !e.prependIcon,
            defaults: {
              VIcon: {
                icon: e.prependIcon
              }
            }
          }, a.prepend) : C(Ve, {
            key: "prepend-icon",
            icon: e.prependIcon
          }, null)]), I("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!a.default && D ? C(Ve, {
            key: "content-icon",
            icon: e.icon
          }, null) : C(ke, {
            key: "content-defaults",
            disabled: !D,
            defaults: {
              VIcon: {
                icon: e.icon
              }
            }
          }, {
            default: () => {
              var Y;
              return [((Y = a.default) == null ? void 0 : Y.call(a)) ?? zt(e.text)];
            }
          })]), !e.icon && F && I("span", {
            key: "append",
            class: "v-btn__append"
          }, [a.append ? C(ke, {
            key: "append-defaults",
            disabled: !e.appendIcon,
            defaults: {
              VIcon: {
                icon: e.appendIcon
              }
            }
          }, a.append) : C(Ve, {
            key: "append-icon",
            icon: e.appendIcon
          }, null)]), !!e.loading && I("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((L = a.loader) == null ? void 0 : L.call(a)) ?? C(Bf, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            width: "2"
          }, null)])];
        }
      }), [[Tt, !P.value && e.ripple, "", {
        center: !!e.icon
      }]]);
    }), {
      group: m
    };
  }
}), $f = O({
  ..._e(Fl({
    icon: "$menu",
    variant: "text"
  }), ["spaced"])
}, "VAppBarNavIcon"), mg = U()({
  name: "VAppBarNavIcon",
  props: $f(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return J(() => C(lt, j(e, {
      class: ["v-app-bar-nav-icon"]
    }), n)), {};
  }
}), gg = U()({
  name: "VAppBarTitle",
  props: xr(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return J(() => C(kr, j(e, {
      class: "v-app-bar-title"
    }), n)), {};
  }
}), Rf = O({
  ...re(),
  ..._e(bd(), ["fullHeight"]),
  ...Ce()
}, "VApp"), hg = U()({
  name: "VApp",
  props: Rf(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = Ae(e), {
      layoutClasses: l,
      getLayoutItem: i,
      items: o,
      layoutRef: r
    } = wd({
      ...e,
      fullHeight: !0
    }), {
      rtlClasses: s
    } = tt();
    return J(() => {
      var u;
      return I("div", {
        ref: r,
        class: Q(["v-application", a.themeClasses.value, l.value, s.value, e.class]),
        style: oe([e.style])
      }, [I("div", {
        class: "v-application__wrap"
      }, [(u = n.default) == null ? void 0 : u.call(n)])]);
    }), {
      getLayoutItem: i,
      items: o,
      theme: a
    };
  }
}), Nf = O({
  scrollable: Boolean,
  ...re(),
  ...ft(),
  ...he({
    tag: "main"
  })
}, "VMain"), yg = U()({
  name: "VMain",
  props: Nf(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      dimensionStyles: a
    } = vt(e), {
      mainStyles: l
    } = No(), {
      ssrBootStyles: i
    } = On();
    return J(() => C(e.tag, {
      class: Q(["v-main", {
        "v-main--scrollable": e.scrollable
      }, e.class]),
      style: oe([l.value, i.value, a.value, e.style])
    }, {
      default: () => {
        var o, r;
        return [e.scrollable ? I("div", {
          class: "v-main__scroller"
        }, [(o = n.default) == null ? void 0 : o.call(n)]) : (r = n.default) == null ? void 0 : r.call(n)];
      }
    })), {};
  }
});
function Ga(e, t) {
  return {
    x: e.x + t.x,
    y: e.y + t.y
  };
}
function Hf(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  };
}
function Ki(e, t) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: n,
      align: a
    } = e, l = a === "left" ? 0 : a === "center" ? t.width / 2 : a === "right" ? t.width : a, i = n === "top" ? 0 : n === "bottom" ? t.height : n;
    return Ga({
      x: l,
      y: i
    }, t);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: n,
      align: a
    } = e, l = n === "left" ? 0 : n === "right" ? t.width : n, i = a === "top" ? 0 : a === "center" ? t.height / 2 : a === "bottom" ? t.height : a;
    return Ga({
      x: l,
      y: i
    }, t);
  }
  return Ga({
    x: t.width / 2,
    y: t.height / 2
  }, t);
}
const Tr = {
  static: jf,
  // specific viewport position, usually centered
  connected: Yf
  // connected to a certain element
}, zf = O({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in Tr
  },
  location: {
    type: String,
    default: "bottom"
  },
  origin: {
    type: String,
    default: "auto"
  },
  offset: [Number, String, Array],
  stickToTarget: Boolean,
  viewportMargin: {
    type: [Number, String],
    default: 12
  }
}, "VOverlay-location-strategies");
function Wf(e, t) {
  const n = K({}), a = K();
  ye && Je(() => !!(t.isActive.value && e.locationStrategy), (r) => {
    var s, u;
    q(() => e.locationStrategy, r), De(() => {
      window.removeEventListener("resize", l), visualViewport == null || visualViewport.removeEventListener("resize", i), visualViewport == null || visualViewport.removeEventListener("scroll", o), a.value = void 0;
    }), window.addEventListener("resize", l, {
      passive: !0
    }), visualViewport == null || visualViewport.addEventListener("resize", i, {
      passive: !0
    }), visualViewport == null || visualViewport.addEventListener("scroll", o, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? a.value = (s = e.locationStrategy(t, e, n)) == null ? void 0 : s.updateLocation : a.value = (u = Tr[e.locationStrategy](t, e, n)) == null ? void 0 : u.updateLocation;
  });
  function l(r) {
    var s;
    (s = a.value) == null || s.call(a, r);
  }
  function i(r) {
    var s;
    (s = a.value) == null || s.call(a, r);
  }
  function o(r) {
    var s;
    (s = a.value) == null || s.call(a, r);
  }
  return {
    contentStyles: n,
    updateLocation: a
  };
}
function jf() {
}
function Gf(e, t) {
  const n = Sl(e);
  return t ? n.x += parseFloat(e.style.right || 0) : n.x -= parseFloat(e.style.left || 0), n.y -= parseFloat(e.style.top || 0), n;
}
function Yf(e, t, n) {
  (Array.isArray(e.target.value) || oc(e.target.value)) && Object.assign(n.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: l,
    preferredOrigin: i
  } = yl(() => {
    const b = Ja(t.location, e.isRtl.value), h = t.origin === "overlap" ? b : t.origin === "auto" ? Ra(b) : Ja(t.origin, e.isRtl.value);
    return b.side === h.side && b.align === Na(h).align ? {
      preferredAnchor: ii(b),
      preferredOrigin: ii(h)
    } : {
      preferredAnchor: b,
      preferredOrigin: h
    };
  }), [o, r, s, u] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((b) => V(() => {
    const h = parseFloat(t[b]);
    return isNaN(h) ? 1 / 0 : h;
  })), c = V(() => {
    if (Array.isArray(t.offset))
      return t.offset;
    if (typeof t.offset == "string") {
      const b = t.offset.split(" ").map(parseFloat);
      return b.length < 2 && b.push(0), b;
    }
    return typeof t.offset == "number" ? [t.offset, 0] : [0, 0];
  });
  let d = !1, f = -1;
  const v = new ho(4), g = new ResizeObserver(() => {
    if (!d) return;
    if (requestAnimationFrame((h) => {
      h !== f && v.clear(), requestAnimationFrame((y) => {
        f = y;
      });
    }), v.isFull) {
      const h = v.values();
      if (Ke(h.at(-1), h.at(-3)) && !Ke(h.at(-1), h.at(-2)))
        return;
    }
    const b = w();
    b && v.push(b.flipped);
  });
  let m = new ct({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  q(e.target, (b, h) => {
    h && !Array.isArray(h) && g.unobserve(h), Array.isArray(b) ? Ke(b, h) || w() : b && g.observe(b);
  }, {
    immediate: !0
  }), q(e.contentEl, (b, h) => {
    h && g.unobserve(h), b && g.observe(b);
  }, {
    immediate: !0
  }), De(() => {
    g.disconnect();
  });
  function w() {
    if (d = !1, requestAnimationFrame(() => d = !0), !e.target.value || !e.contentEl.value) return;
    (Array.isArray(e.target.value) || e.target.value.offsetParent || e.target.value.getClientRects().length) && (m = wo(e.target.value));
    const b = Gf(e.contentEl.value, e.isRtl.value), h = na(e.contentEl.value), y = Number(t.viewportMargin);
    h.length || (h.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (b.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), b.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const x = h.reduce((F, D) => {
      const L = Iu(D);
      return F ? new ct({
        x: Math.max(F.left, L.left),
        y: Math.max(F.top, L.top),
        width: Math.min(F.right, L.right) - Math.max(F.left, L.left),
        height: Math.min(F.bottom, L.bottom) - Math.max(F.top, L.top)
      }) : L;
    }, void 0);
    t.stickToTarget ? (x.x += Math.min(y, m.x), x.y += Math.min(y, m.y), x.width = Math.max(x.width - y * 2, m.x + m.width - y), x.height = Math.max(x.height - y * 2, m.y + m.height - y)) : (x.x += y, x.y += y, x.width -= y * 2, x.height -= y * 2);
    let p = {
      anchor: l.value,
      origin: i.value
    };
    function k(F) {
      const D = new ct(b), L = Ki(F.anchor, m), Y = Ki(F.origin, D);
      let {
        x: z,
        y: ee
      } = Hf(L, Y);
      switch (F.anchor.side) {
        case "top":
          ee -= c.value[0];
          break;
        case "bottom":
          ee += c.value[0];
          break;
        case "left":
          z -= c.value[0];
          break;
        case "right":
          z += c.value[0];
          break;
      }
      switch (F.anchor.align) {
        case "top":
          ee -= c.value[1];
          break;
        case "bottom":
          ee += c.value[1];
          break;
        case "left":
          z -= c.value[1];
          break;
        case "right":
          z += c.value[1];
          break;
      }
      return D.x += z, D.y += ee, D.width = Math.min(D.width, s.value), D.height = Math.min(D.height, u.value), {
        overflows: ri(D, x),
        x: z,
        y: ee
      };
    }
    let P = 0, S = 0;
    const A = {
      x: 0,
      y: 0
    }, T = {
      x: !1,
      y: !1
    };
    let _ = -1;
    for (; ; ) {
      if (_++ > 10) {
        nn("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: F,
        y: D,
        overflows: L
      } = k(p);
      P += F, S += D, b.x += F, b.y += D;
      {
        const Y = oi(p.anchor), z = L.x.before || L.x.after, ee = L.y.before || L.y.after;
        let ie = !1;
        if (["x", "y"].forEach(($) => {
          if ($ === "x" && z && !T.x || $ === "y" && ee && !T.y) {
            const Z = {
              anchor: {
                ...p.anchor
              },
              origin: {
                ...p.origin
              }
            }, M = $ === "x" ? Y === "y" ? Na : Ra : Y === "y" ? Ra : Na;
            Z.anchor = M(Z.anchor), Z.origin = M(Z.origin);
            const {
              overflows: N
            } = k(Z);
            (N[$].before <= L[$].before && N[$].after <= L[$].after || N[$].before + N[$].after < (L[$].before + L[$].after) / 2) && (p = Z, ie = T[$] = !0);
          }
        }), ie) continue;
      }
      L.x.before && (P += L.x.before, b.x += L.x.before), L.x.after && (P -= L.x.after, b.x -= L.x.after), L.y.before && (S += L.y.before, b.y += L.y.before), L.y.after && (S -= L.y.after, b.y -= L.y.after);
      {
        const Y = ri(b, x);
        A.x = x.width - Y.x.before - Y.x.after, A.y = x.height - Y.y.before - Y.y.after, P += Y.x.before, b.x += Y.x.before, S += Y.y.before, b.y += Y.y.before;
      }
      break;
    }
    const B = oi(p.anchor);
    return Object.assign(n.value, {
      "--v-overlay-anchor-origin": `${p.anchor.side} ${p.anchor.align}`,
      transformOrigin: `${p.origin.side} ${p.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: X(Ya(S)),
      left: e.isRtl.value ? void 0 : X(Ya(P)),
      right: e.isRtl.value ? X(Ya(-P)) : void 0,
      minWidth: X(B === "y" ? Math.min(o.value, m.width) : o.value),
      maxWidth: X(Xi($e(A.x, o.value === 1 / 0 ? 0 : o.value, s.value))),
      maxHeight: X(Xi($e(A.y, r.value === 1 / 0 ? 0 : r.value, u.value)))
    }), {
      available: A,
      contentBox: b,
      flipped: T
    };
  }
  return q(() => [l.value, i.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight], () => w()), me(() => {
    const b = w();
    if (!b) return;
    const {
      available: h,
      contentBox: y
    } = b;
    y.height > h.y && requestAnimationFrame(() => {
      w(), requestAnimationFrame(() => {
        w();
      });
    });
  }), {
    updateLocation: w
  };
}
function Ya(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function Xi(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let rl = !0;
const sa = [];
function Uf(e) {
  !rl || sa.length ? (sa.push(e), sl()) : (rl = !1, e(), sl());
}
let qi = -1;
function sl() {
  cancelAnimationFrame(qi), qi = requestAnimationFrame(() => {
    const e = sa.shift();
    e && e(), sa.length ? sl() : rl = !0;
  });
}
const Zn = {
  none: null,
  close: qf,
  block: Zf,
  reposition: Qf
}, Kf = O({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in Zn
  }
}, "VOverlay-scroll-strategies");
function Xf(e, t) {
  if (!ye) return;
  let n;
  Le(async () => {
    n == null || n.stop(), t.isActive.value && e.scrollStrategy && (n = Sn(), await new Promise((a) => setTimeout(a)), n.active && n.run(() => {
      var a;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, n) : (a = Zn[e.scrollStrategy]) == null || a.call(Zn, t, e, n);
    }));
  }), De(() => {
    n == null || n.stop();
  });
}
function qf(e) {
  function t(n) {
    e.isActive.value = !1;
  }
  Er(Ol(e.target.value, e.contentEl.value), t);
}
function Zf(e, t) {
  var r;
  const n = (r = e.root.value) == null ? void 0 : r.offsetParent, a = Ol(e.target.value, e.contentEl.value), l = [.../* @__PURE__ */ new Set([...na(a, t.contained ? n : void 0), ...na(e.contentEl.value, t.contained ? n : void 0)])].filter((s) => !s.classList.contains("v-overlay-scroll-blocked")), i = window.innerWidth - document.documentElement.offsetWidth, o = ((s) => Cl(s) && s)(n || document.documentElement);
  o && e.root.value.classList.add("v-overlay--scroll-blocked"), l.forEach((s, u) => {
    s.style.setProperty("--v-body-scroll-x", X(-s.scrollLeft)), s.style.setProperty("--v-body-scroll-y", X(-s.scrollTop)), s !== document.documentElement && s.style.setProperty("--v-scrollbar-offset", X(i)), s.classList.add("v-overlay-scroll-blocked");
  }), De(() => {
    l.forEach((s, u) => {
      const c = parseFloat(s.style.getPropertyValue("--v-body-scroll-x")), d = parseFloat(s.style.getPropertyValue("--v-body-scroll-y")), f = s.style.scrollBehavior;
      s.style.scrollBehavior = "auto", s.style.removeProperty("--v-body-scroll-x"), s.style.removeProperty("--v-body-scroll-y"), s.style.removeProperty("--v-scrollbar-offset"), s.classList.remove("v-overlay-scroll-blocked"), s.scrollLeft = -c, s.scrollTop = -d, s.style.scrollBehavior = f;
    }), o && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function Qf(e, t, n) {
  let a = !1, l = -1, i = -1;
  function o(r) {
    Uf(() => {
      var c, d;
      const s = performance.now();
      (d = (c = e.updateLocation).value) == null || d.call(c, r), a = (performance.now() - s) / (1e3 / 60) > 2;
    });
  }
  i = (typeof requestIdleCallback > "u" ? (r) => r() : requestIdleCallback)(() => {
    n.run(() => {
      Er(Ol(e.target.value, e.contentEl.value), (r) => {
        a ? (cancelAnimationFrame(l), l = requestAnimationFrame(() => {
          l = requestAnimationFrame(() => {
            o(r);
          });
        })) : o(r);
      });
    });
  }), De(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(i), cancelAnimationFrame(l);
  });
}
function Ol(e, t) {
  return Array.isArray(e) ? document.elementsFromPoint(...e).find((n) => !(t != null && t.contains(n))) : e ?? t;
}
function Er(e, t) {
  const n = [document, ...na(e)];
  n.forEach((a) => {
    a.addEventListener("scroll", t, {
      passive: !0
    });
  }), De(() => {
    n.forEach((a) => {
      a.removeEventListener("scroll", t);
    });
  });
}
const ul = Symbol.for("vuetify:v-menu"), Jf = O({
  target: [String, Object],
  activator: [String, Object],
  activatorProps: {
    type: Object,
    default: () => ({})
  },
  openOnClick: {
    type: Boolean,
    default: void 0
  },
  openOnHover: Boolean,
  openOnFocus: {
    type: Boolean,
    default: void 0
  },
  closeOnContentClick: Boolean,
  ...yr()
}, "VOverlay-activator");
function ev(e, t) {
  let {
    isActive: n,
    isTop: a,
    contentEl: l
  } = t;
  const i = Ie("useActivator"), o = K();
  let r = !1, s = !1, u = !0;
  const c = V(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), d = V(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !c.value), {
    runOpenDelay: f,
    runCloseDelay: v
  } = br(e, (S) => {
    S === (e.openOnHover && r || c.value && s) && !(e.openOnHover && n.value && !a.value) && (n.value !== S && (u = !0), n.value = S);
  }), g = K(), m = {
    onClick: (S) => {
      S.stopPropagation(), o.value = S.currentTarget || S.target, n.value || (g.value = [S.clientX, S.clientY]), n.value = !n.value;
    },
    onMouseenter: (S) => {
      r = !0, o.value = S.currentTarget || S.target, f();
    },
    onMouseleave: (S) => {
      r = !1, v();
    },
    onFocus: (S) => {
      an(S.target, ":focus-visible") !== !1 && (s = !0, S.stopPropagation(), o.value = S.currentTarget || S.target, f());
    },
    onBlur: (S) => {
      s = !1, S.stopPropagation(), v({
        minDelay: 1
      });
    }
  }, w = V(() => {
    const S = {};
    return d.value && (S.onClick = m.onClick), e.openOnHover && (S.onMouseenter = m.onMouseenter, S.onMouseleave = m.onMouseleave), c.value && (S.onFocus = m.onFocus, S.onBlur = m.onBlur), S;
  }), b = V(() => {
    const S = {};
    if (e.openOnHover && (S.onMouseenter = () => {
      r = !0, f();
    }, S.onMouseleave = () => {
      r = !1, v();
    }), c.value && (S.onFocusin = (A) => {
      A.target.matches(":focus-visible") && (s = !0, f());
    }, S.onFocusout = () => {
      s = !1, v({
        minDelay: 1
      });
    }), e.closeOnContentClick) {
      const A = ge(ul, null);
      S.onClick = () => {
        n.value = !1, A == null || A.closeParents();
      };
    }
    return S;
  }), h = V(() => {
    const S = {};
    return e.openOnHover && (S.onMouseenter = () => {
      u && (r = !0, u = !1, f());
    }, S.onMouseleave = () => {
      r = !1, v();
    }), S;
  });
  q(a, (S) => {
    var A;
    S && (e.openOnHover && !r && (!c.value || !s) || c.value && !s && (!e.openOnHover || !r)) && !((A = l.value) != null && A.contains(document.activeElement)) && (n.value = !1);
  }), q(n, (S) => {
    S || setTimeout(() => {
      g.value = void 0;
    });
  }, {
    flush: "post"
  });
  const y = Qa();
  Le(() => {
    y.value && me(() => {
      o.value = y.el;
    });
  });
  const x = Qa(), p = V(() => e.target === "cursor" && g.value ? g.value : x.value ? x.el : _r(e.target, i) || o.value), k = V(() => Array.isArray(p.value) ? void 0 : p.value);
  let P;
  return q(() => !!e.activator, (S) => {
    S && ye ? (P = Sn(), P.run(() => {
      tv(e, i, {
        activatorEl: o,
        activatorEvents: w
      });
    })) : P && P.stop();
  }, {
    flush: "post",
    immediate: !0
  }), De(() => {
    P == null || P.stop();
  }), {
    activatorEl: o,
    activatorRef: y,
    target: p,
    targetEl: k,
    targetRef: x,
    activatorEvents: w,
    contentEvents: b,
    scrimEvents: h
  };
}
function tv(e, t, n) {
  let {
    activatorEl: a,
    activatorEvents: l
  } = n;
  q(() => e.activator, (s, u) => {
    if (u && s !== u) {
      const c = r(u);
      c && o(c);
    }
    s && me(() => i());
  }, {
    immediate: !0
  }), q(() => e.activatorProps, () => {
    i();
  }), De(() => {
    o();
  });
  function i() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : r(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    s && Au(s, j(l.value, u));
  }
  function o() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : r(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    s && Tu(s, j(l.value, u));
  }
  function r() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const u = _r(s, t);
    return a.value = (u == null ? void 0 : u.nodeType) === Node.ELEMENT_NODE ? u : void 0, a.value;
  }
}
function _r(e, t) {
  var a, l;
  if (!e) return;
  let n;
  if (e === "parent") {
    let i = (l = (a = t == null ? void 0 : t.proxy) == null ? void 0 : a.$el) == null ? void 0 : l.parentNode;
    for (; i != null && i.hasAttribute("data-no-activator"); )
      i = i.parentNode;
    n = i;
  } else typeof e == "string" ? n = document.querySelector(e) : "$el" in e ? n = e.$el : n = e;
  return n;
}
function nv() {
  if (!ye) return G(!1);
  const {
    ssr: e
  } = Et();
  if (e) {
    const t = G(!1);
    return gt(() => {
      t.value = !0;
    }), t;
  } else
    return G(!0);
}
const Br = O({
  eager: Boolean
}, "lazy");
function Dr(e, t) {
  const n = G(!1), a = E(() => n.value || e.eager || t.value);
  q(t, () => n.value = !0);
  function l() {
    e.eager || (n.value = !1);
  }
  return {
    isBooted: n,
    hasContent: a,
    onAfterLeave: l
  };
}
const Zi = Symbol.for("vuetify:stack"), hn = Qe([]);
function av(e, t, n) {
  const a = Ie("useStack"), l = !n, i = ge(Zi, void 0), o = Qe({
    activeChildren: /* @__PURE__ */ new Set()
  });
  Pe(Zi, o);
  const r = G(Number(Oe(t)));
  Je(e, () => {
    var d;
    const c = (d = hn.at(-1)) == null ? void 0 : d[1];
    r.value = c ? c + 10 : Number(Oe(t)), l && hn.push([a.uid, r.value]), i == null || i.activeChildren.add(a.uid), De(() => {
      if (l) {
        const f = pe(hn).findIndex((v) => v[0] === a.uid);
        hn.splice(f, 1);
      }
      i == null || i.activeChildren.delete(a.uid);
    });
  });
  const s = G(!0);
  l && Le(() => {
    var d;
    const c = ((d = hn.at(-1)) == null ? void 0 : d[0]) === a.uid;
    setTimeout(() => s.value = c);
  });
  const u = E(() => !o.activeChildren.size);
  return {
    globalTop: ba(s),
    localTop: u,
    stackStyles: E(() => ({
      zIndex: r.value
    }))
  };
}
function lv(e) {
  return {
    teleportTarget: V(() => {
      const n = e();
      if (n === !0 || !ye) return;
      const a = n === !1 ? document.body : typeof n == "string" ? document.querySelector(n) : n;
      if (a == null) {
        ha(`Unable to locate target ${n}`);
        return;
      }
      let l = [...a.children].find((i) => i.matches(".v-overlay-container"));
      return l || (l = document.createElement("div"), l.className = "v-overlay-container", a.appendChild(l)), l;
    })
  };
}
function iv() {
  return !0;
}
function Fr(e, t, n) {
  if (!e || Or(e, n) === !1) return !1;
  const a = Po(t);
  if (typeof ShadowRoot < "u" && a instanceof ShadowRoot && a.host === e.target) return !1;
  const l = (typeof n.value == "object" && n.value.include || (() => []))();
  return l.push(t), !l.some((i) => i == null ? void 0 : i.contains(e.target));
}
function Or(e, t) {
  return (typeof t.value == "object" && t.value.closeConditional || iv)(e);
}
function ov(e, t, n) {
  const a = typeof n.value == "function" ? n.value : n.value.handler;
  e.shadowTarget = e.target, t._clickOutside.lastMousedownWasOutside && Fr(e, t, n) && setTimeout(() => {
    Or(e, n) && a && a(e);
  }, 0);
}
function Qi(e, t) {
  const n = Po(e);
  t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const Ji = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const n = (l) => ov(l, e, t), a = (l) => {
      e._clickOutside.lastMousedownWasOutside = Fr(l, e, t);
    };
    Qi(e, (l) => {
      l.addEventListener("click", n, !0), l.addEventListener("mousedown", a, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[t.instance.$.uid] = {
      onClick: n,
      onMousedown: a
    };
  },
  beforeUnmount(e, t) {
    e._clickOutside && (Qi(e, (n) => {
      var i;
      if (!n || !((i = e._clickOutside) != null && i[t.instance.$.uid])) return;
      const {
        onClick: a,
        onMousedown: l
      } = e._clickOutside[t.instance.$.uid];
      n.removeEventListener("click", a, !0), n.removeEventListener("mousedown", l, !0);
    }), delete e._clickOutside[t.instance.$.uid]);
  }
};
function rv(e) {
  const {
    modelValue: t,
    color: n,
    ...a
  } = e;
  return C(_t, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && I("div", j({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, a), null)]
  });
}
const Ba = O({
  absolute: Boolean,
  attach: [Boolean, String, Object],
  closeOnBack: {
    type: Boolean,
    default: !0
  },
  contained: Boolean,
  contentClass: null,
  contentProps: null,
  disabled: Boolean,
  opacity: [Number, String],
  noClickAnimation: Boolean,
  modelValue: Boolean,
  persistent: Boolean,
  scrim: {
    type: [Boolean, String],
    default: !0
  },
  zIndex: {
    type: [Number, String],
    default: 2e3
  },
  ...Jf(),
  ...re(),
  ...ft(),
  ...Br(),
  ...zf(),
  ...Kf(),
  ...Sr(),
  ...Ce(),
  ...Ln()
}, "VOverlay"), un = U()({
  name: "VOverlay",
  directives: {
    vClickOutside: Ji
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ..._e(Ba(), ["disableInitialFocus"])
  },
  emits: {
    "click:outside": (e) => !0,
    "update:modelValue": (e) => !0,
    keydown: (e) => !0,
    afterEnter: () => !0,
    afterLeave: () => !0
  },
  setup(e, t) {
    let {
      slots: n,
      attrs: a,
      emit: l
    } = t;
    const i = Ie("VOverlay"), o = K(), r = K(), s = K(), u = fe(e, "modelValue"), c = V({
      get: () => u.value,
      set: (R) => {
        R && e.disabled || (u.value = R);
      }
    }), {
      themeClasses: d
    } = Ae(e), {
      rtlClasses: f,
      isRtl: v
    } = tt(), {
      hasContent: g,
      onAfterLeave: m
    } = Dr(e, c), w = Xe(() => typeof e.scrim == "string" ? e.scrim : null), {
      globalTop: b,
      localTop: h,
      stackStyles: y
    } = av(c, () => e.zIndex, e._disableGlobalStack), {
      activatorEl: x,
      activatorRef: p,
      target: k,
      targetEl: P,
      targetRef: S,
      activatorEvents: A,
      contentEvents: T,
      scrimEvents: _
    } = ev(e, {
      isActive: c,
      isTop: h,
      contentEl: s
    }), {
      teleportTarget: B
    } = lv(() => {
      var ve, Se, Fe;
      const R = e.attach || e.contained;
      if (R) return R;
      const le = ((ve = x == null ? void 0 : x.value) == null ? void 0 : ve.getRootNode()) || ((Fe = (Se = i.proxy) == null ? void 0 : Se.$el) == null ? void 0 : Fe.getRootNode());
      return le instanceof ShadowRoot ? le : !1;
    }), {
      dimensionStyles: F
    } = vt(e), D = nv(), {
      scopeId: L
    } = mn();
    q(() => e.disabled, (R) => {
      R && (c.value = !1);
    });
    const {
      contentStyles: Y,
      updateLocation: z
    } = Wf(e, {
      isRtl: v,
      contentEl: s,
      target: k,
      isActive: c
    });
    Xf(e, {
      root: o,
      contentEl: s,
      targetEl: P,
      target: k,
      isActive: c,
      updateLocation: z
    });
    function ee(R) {
      l("click:outside", R), e.persistent ? te() : c.value = !1;
    }
    function ie(R) {
      return c.value && h.value && // If using scrim, only close if clicking on it rather than anything opened on top
      (!e.scrim || R.target === r.value || R instanceof MouseEvent && R.shadowTarget === r.value);
    }
    wr(e, {
      isActive: c,
      localTop: h,
      contentEl: s,
      activatorEl: x
    }), ye && q(c, (R) => {
      R ? window.addEventListener("keydown", $) : window.removeEventListener("keydown", $);
    }, {
      immediate: !0
    }), et(() => {
      ye && window.removeEventListener("keydown", $);
    });
    function $(R) {
      var le, ve, Se;
      R.key === "Escape" && b.value && ((le = s.value) != null && le.contains(document.activeElement) || l("keydown", R), e.persistent ? te() : (c.value = !1, (ve = s.value) != null && ve.contains(document.activeElement) && ((Se = x.value) == null || Se.focus())));
    }
    function Z(R) {
      R.key === "Escape" && !b.value || l("keydown", R);
    }
    const M = ar();
    Je(() => e.closeOnBack, () => {
      Qd(M, (R) => {
        b.value && c.value ? (R(!1), e.persistent ? te() : c.value = !1) : R();
      });
    });
    const N = K();
    q(() => c.value && (e.absolute || e.contained) && B.value == null, (R) => {
      if (R) {
        const le = kl(o.value);
        le && le !== document.scrollingElement && (N.value = le.scrollTop);
      }
    });
    function te() {
      e.noClickAnimation || s.value && It(s.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: kn
      });
    }
    function W() {
      l("afterEnter");
    }
    function ae() {
      m(), l("afterLeave");
    }
    return J(() => {
      var R;
      return I(de, null, [(R = n.activator) == null ? void 0 : R.call(n, {
        isActive: c.value,
        targetRef: S,
        props: j({
          ref: p
        }, A.value, e.activatorProps)
      }), D.value && g.value && C(du, {
        disabled: !B.value,
        to: B.value
      }, {
        default: () => [I("div", j({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": c.value,
            "v-overlay--contained": e.contained
          }, d.value, f.value, e.class],
          style: [y.value, {
            "--v-overlay-opacity": e.opacity,
            top: X(N.value)
          }, e.style],
          ref: o,
          onKeydown: Z
        }, L, a), [C(rv, j({
          color: w,
          modelValue: c.value && !!e.scrim,
          ref: r
        }, _.value), null), C(At, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: k.value,
          onAfterEnter: W,
          onAfterLeave: ae
        }, {
          default: () => {
            var le;
            return [ze(I("div", j({
              ref: s,
              class: ["v-overlay__content", e.contentClass],
              style: [F.value, Y.value]
            }, T.value, e.contentProps), [(le = n.default) == null ? void 0 : le.call(n, {
              isActive: c
            })]), [[Yt, c.value], [Ji, {
              handler: ee,
              closeConditional: ie,
              include: () => [x.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: x,
      scrimEl: r,
      target: k,
      animateClick: te,
      contentEl: s,
      rootEl: o,
      globalTop: b,
      localTop: h,
      updateLocation: z
    };
  }
}), Ua = Symbol("Forwarded refs");
function Ka(e, t) {
  let n = e;
  for (; n; ) {
    const a = Reflect.getOwnPropertyDescriptor(n, t);
    if (a) return a;
    n = Object.getPrototypeOf(n);
  }
}
function Vt(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    n[a - 1] = arguments[a];
  return e[Ua] = n, new Proxy(e, {
    get(l, i) {
      if (Reflect.has(l, i))
        return Reflect.get(l, i);
      if (!(typeof i == "symbol" || i.startsWith("$") || i.startsWith("__"))) {
        for (const o of n)
          if (o.value && Reflect.has(o.value, i)) {
            const r = Reflect.get(o.value, i);
            return typeof r == "function" ? r.bind(o.value) : r;
          }
      }
    },
    has(l, i) {
      if (Reflect.has(l, i))
        return !0;
      if (typeof i == "symbol" || i.startsWith("$") || i.startsWith("__")) return !1;
      for (const o of n)
        if (o.value && Reflect.has(o.value, i))
          return !0;
      return !1;
    },
    set(l, i, o) {
      if (Reflect.has(l, i))
        return Reflect.set(l, i, o);
      if (typeof i == "symbol" || i.startsWith("$") || i.startsWith("__")) return !1;
      for (const r of n)
        if (r.value && Reflect.has(r.value, i))
          return Reflect.set(r.value, i, o);
      return !1;
    },
    getOwnPropertyDescriptor(l, i) {
      var r;
      const o = Reflect.getOwnPropertyDescriptor(l, i);
      if (o) return o;
      if (!(typeof i == "symbol" || i.startsWith("$") || i.startsWith("__"))) {
        for (const s of n) {
          if (!s.value) continue;
          const u = Ka(s.value, i) ?? ("_" in s.value ? Ka((r = s.value._) == null ? void 0 : r.setupState, i) : void 0);
          if (u) return u;
        }
        for (const s of n) {
          const u = s.value && s.value[Ua];
          if (!u) continue;
          const c = u.slice();
          for (; c.length; ) {
            const d = c.shift(), f = Ka(d.value, i);
            if (f) return f;
            const v = d.value && d.value[Ua];
            v && c.push(...v);
          }
        }
      }
    }
  });
}
const sv = O({
  // TODO
  // disableKeys: Boolean,
  id: String,
  submenu: Boolean,
  ..._e(Ba({
    captureFocus: !0,
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    location: void 0,
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: Il
    }
  }), ["absolute"])
}, "VMenu"), Lr = U()({
  name: "VMenu",
  props: sv(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = fe(e, "modelValue"), {
      scopeId: l
    } = mn(), {
      isRtl: i
    } = tt(), o = ht(), r = E(() => e.id || `v-menu-${o}`), s = K(), u = ge(ul, null), c = G(/* @__PURE__ */ new Set());
    Pe(ul, {
      register() {
        c.value.add(o);
      },
      unregister() {
        c.value.delete(o);
      },
      closeParents(m) {
        setTimeout(() => {
          var w;
          !c.value.size && !e.persistent && (m == null || (w = s.value) != null && w.contentEl && !Cu(m, s.value.contentEl)) && (a.value = !1, u == null || u.closeParents());
        }, 40);
      }
    }), et(() => u == null ? void 0 : u.unregister()), ro(() => a.value = !1), q(a, (m) => {
      m ? u == null || u.register() : u == null || u.unregister();
    }, {
      immediate: !0
    });
    function d(m) {
      u == null || u.closeParents(m);
    }
    function f(m) {
      var w, b, h, y, x;
      if (!e.disabled)
        if (m.key === "Tab" || m.key === "Enter" && !e.closeOnContentClick) {
          if (m.key === "Enter" && (m.target instanceof HTMLTextAreaElement || m.target instanceof HTMLInputElement && m.target.closest("form"))) return;
          m.key === "Enter" && m.preventDefault(), !bo(Nt((w = s.value) == null ? void 0 : w.contentEl, !1), m.shiftKey ? "prev" : "next", (k) => k.tabIndex >= 0) && !e.retainFocus && (a.value = !1, (h = (b = s.value) == null ? void 0 : b.activatorEl) == null || h.focus());
        } else e.submenu && m.key === (i.value ? "ArrowRight" : "ArrowLeft") && (a.value = !1, (x = (y = s.value) == null ? void 0 : y.activatorEl) == null || x.focus());
    }
    function v(m) {
      var b;
      if (e.disabled) return;
      const w = (b = s.value) == null ? void 0 : b.contentEl;
      w && a.value ? m.key === "ArrowDown" ? (m.preventDefault(), m.stopImmediatePropagation(), yn(w, "next")) : m.key === "ArrowUp" ? (m.preventDefault(), m.stopImmediatePropagation(), yn(w, "prev")) : e.submenu && (m.key === (i.value ? "ArrowRight" : "ArrowLeft") ? a.value = !1 : m.key === (i.value ? "ArrowLeft" : "ArrowRight") && (m.preventDefault(), yn(w, "first"))) : (e.submenu ? m.key === (i.value ? "ArrowLeft" : "ArrowRight") : ["ArrowDown", "ArrowUp"].includes(m.key)) && (a.value = !0, m.preventDefault(), setTimeout(() => setTimeout(() => v(m))));
    }
    const g = V(() => j({
      "aria-haspopup": "menu",
      "aria-expanded": String(a.value),
      "aria-controls": r.value,
      "aria-owns": r.value,
      onKeydown: v
    }, e.activatorProps));
    return J(() => {
      const m = un.filterProps(e);
      return C(un, j({
        ref: s,
        id: r.value,
        class: ["v-menu", e.class],
        style: e.style
      }, m, {
        modelValue: a.value,
        "onUpdate:modelValue": (w) => a.value = w,
        absolute: !0,
        activatorProps: g.value,
        location: e.location ?? (e.submenu ? "end" : "bottom"),
        "onClick:outside": d,
        onKeydown: f
      }, l), {
        activator: n.activator,
        default: function() {
          for (var w = arguments.length, b = new Array(w), h = 0; h < w; h++)
            b[h] = arguments[h];
          return C(ke, {
            root: "VMenu"
          }, {
            default: () => {
              var y;
              return [(y = n.default) == null ? void 0 : y.call(n, ...b)];
            }
          });
        }
      });
    }), Vt({
      id: r,
      ΨopenChildren: c
    }, s);
  }
});
function uv(e) {
  const t = G(e());
  let n = -1;
  function a() {
    clearInterval(n);
  }
  function l() {
    a(), me(() => t.value = e());
  }
  function i(o) {
    const r = o ? getComputedStyle(o) : {
      transitionDuration: 0.2
    }, s = parseFloat(r.transitionDuration) * 1e3 || 200;
    if (a(), t.value <= 0) return;
    const u = performance.now();
    n = window.setInterval(() => {
      const c = performance.now() - u + s;
      t.value = Math.max(e() - c, 0), t.value <= 0 && a();
    }, s);
  }
  return De(a), {
    clear: a,
    time: t,
    start: i,
    reset: l
  };
}
const cv = O({
  /* @deprecated */
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5e3
  },
  vertical: Boolean,
  ...gn({
    location: "bottom"
  }),
  ...Nn(),
  ...Ue(),
  ...St(),
  ...Ce(),
  ..._e(Ba({
    transition: "v-snackbar-transition"
  }), ["persistent", "noClickAnimation", "retainFocus", "captureFocus", "disableInitialFocus", "scrim", "scrollStrategy", "stickToTarget", "viewportMargin"])
}, "VSnackbar"), bg = U()({
  name: "VSnackbar",
  props: cv(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = fe(e, "modelValue"), {
      positionClasses: l
    } = Hn(e), {
      scopeId: i
    } = mn(), {
      themeClasses: o
    } = Ae(e), {
      colorClasses: r,
      colorStyles: s,
      variantClasses: u
    } = Kt(e), {
      roundedClasses: c
    } = qe(e), d = uv(() => Number(e.timeout)), f = K(), v = K(), g = G(!1), m = G(0), w = K(), b = ge(Pn, void 0);
    Je(() => !!b, () => {
      const _ = No();
      Le(() => {
        w.value = _.mainStyles.value;
      });
    }), q(a, y), q(() => e.timeout, y), gt(() => {
      a.value && y();
    });
    let h = -1;
    function y() {
      d.reset(), window.clearTimeout(h);
      const _ = Number(e.timeout);
      if (!a.value || _ === -1) return;
      const B = gl(v.value);
      d.start(B), h = window.setTimeout(() => {
        a.value = !1;
      }, _);
    }
    function x() {
      d.reset(), window.clearTimeout(h);
    }
    function p() {
      g.value = !0, x();
    }
    function k() {
      g.value = !1, y();
    }
    function P(_) {
      m.value = _.touches[0].clientY;
    }
    function S(_) {
      Math.abs(m.value - _.changedTouches[0].clientY) > 50 && (a.value = !1);
    }
    function A() {
      g.value && k();
    }
    const T = V(() => e.location.split(" ").reduce((_, B) => (_[`v-snackbar--${B}`] = !0, _), {}));
    return J(() => {
      const _ = un.filterProps(e), B = !!(n.default || n.text || e.text);
      return C(un, j({
        ref: f,
        class: ["v-snackbar", {
          "v-snackbar--active": a.value,
          "v-snackbar--multi-line": e.multiLine && !e.vertical,
          "v-snackbar--timer": !!e.timer,
          "v-snackbar--vertical": e.vertical
        }, T.value, l.value, e.class],
        style: [w.value, e.style]
      }, _, {
        modelValue: a.value,
        "onUpdate:modelValue": (F) => a.value = F,
        contentProps: j({
          class: ["v-snackbar__wrapper", o.value, r.value, c.value, u.value],
          style: [s.value],
          onPointerenter: p,
          onPointerleave: k
        }, _.contentProps),
        persistent: !0,
        noClickAnimation: !0,
        scrim: !1,
        scrollStrategy: "none",
        _disableGlobalStack: !0,
        onTouchstartPassive: P,
        onTouchend: S,
        onAfterLeave: A
      }, i), {
        default: () => {
          var F, D;
          return [Ut(!1, "v-snackbar"), e.timer && !g.value && I("div", {
            key: "timer",
            class: "v-snackbar__timer"
          }, [C(Ar, {
            ref: v,
            color: typeof e.timer == "string" ? e.timer : "info",
            max: e.timeout,
            modelValue: d.time.value
          }, null)]), B && I("div", {
            key: "content",
            class: "v-snackbar__content",
            role: "status",
            "aria-live": "polite"
          }, [((F = n.text) == null ? void 0 : F.call(n)) ?? e.text, (D = n.default) == null ? void 0 : D.call(n)]), n.actions && C(ke, {
            defaults: {
              VBtn: {
                variant: "text",
                ripple: !1,
                slim: !0
              }
            }
          }, {
            default: () => [I("div", {
              class: "v-snackbar__actions"
            }, [n.actions({
              isActive: a
            })])]
          })];
        },
        activator: n.activator
      });
    }), Vt({}, f);
  }
}), dv = (e) => {
  const {
    touchstartX: t,
    touchendX: n,
    touchstartY: a,
    touchendY: l
  } = e, i = 0.5, o = 16;
  e.offsetX = n - t, e.offsetY = l - a, Math.abs(e.offsetY) < i * Math.abs(e.offsetX) && (e.left && n < t - o && e.left(e), e.right && n > t + o && e.right(e)), Math.abs(e.offsetX) < i * Math.abs(e.offsetY) && (e.up && l < a - o && e.up(e), e.down && l > a + o && e.down(e));
};
function fv(e, t) {
  var a;
  const n = e.changedTouches[0];
  t.touchstartX = n.clientX, t.touchstartY = n.clientY, (a = t.start) == null || a.call(t, {
    originalEvent: e,
    ...t
  });
}
function vv(e, t) {
  var a;
  const n = e.changedTouches[0];
  t.touchendX = n.clientX, t.touchendY = n.clientY, (a = t.end) == null || a.call(t, {
    originalEvent: e,
    ...t
  }), dv(t);
}
function mv(e, t) {
  var a;
  const n = e.changedTouches[0];
  t.touchmoveX = n.clientX, t.touchmoveY = n.clientY, (a = t.move) == null || a.call(t, {
    originalEvent: e,
    ...t
  });
}
function gv() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const t = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: e.left,
    right: e.right,
    up: e.up,
    down: e.down,
    start: e.start,
    move: e.move,
    end: e.end
  };
  return {
    touchstart: (n) => fv(n, t),
    touchend: (n) => vv(n, t),
    touchmove: (n) => mv(n, t)
  };
}
function hv(e, t) {
  var r;
  const n = t.value, a = n != null && n.parent ? e.parentElement : e, l = (n == null ? void 0 : n.options) ?? {
    passive: !0
  }, i = (r = t.instance) == null ? void 0 : r.$.uid;
  if (!a || i === void 0) return;
  const o = gv(t.value);
  a._touchHandlers = a._touchHandlers ?? /* @__PURE__ */ Object.create(null), a._touchHandlers[i] = o, vo(o).forEach((s) => {
    a.addEventListener(s, o[s], l);
  });
}
function yv(e, t) {
  var i, o;
  const n = (i = t.value) != null && i.parent ? e.parentElement : e, a = (o = t.instance) == null ? void 0 : o.$.uid;
  if (!(n != null && n._touchHandlers) || a === void 0) return;
  const l = n._touchHandlers[a];
  vo(l).forEach((r) => {
    n.removeEventListener(r, l[r]);
  }), delete n._touchHandlers[a];
}
const cl = {
  mounted: hv,
  unmounted: yv
}, Mr = Symbol.for("vuetify:v-window"), $r = Symbol.for("vuetify:v-window-group"), Rr = O({
  continuous: Boolean,
  nextIcon: {
    type: [Boolean, String, Function, Object],
    default: "$next"
  },
  prevIcon: {
    type: [Boolean, String, Function, Object],
    default: "$prev"
  },
  reverse: Boolean,
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || e === "hover"
  },
  verticalArrows: [Boolean, String],
  touch: {
    type: [Object, Boolean],
    default: void 0
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  modelValue: null,
  disabled: Boolean,
  selectedClass: {
    type: String,
    default: "v-window-item--active"
  },
  // TODO: mandatory should probably not be exposed but do this for now
  mandatory: {
    type: [Boolean, String],
    default: "force"
  },
  crossfade: Boolean,
  transitionDuration: Number,
  ...re(),
  ...he(),
  ...Ce()
}, "VWindow"), eo = U()({
  name: "VWindow",
  directives: {
    vTouch: cl
  },
  props: Rr(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = Ae(e), {
      isRtl: l
    } = tt(), {
      t: i
    } = yt(), o = Ta(e, $r), r = K(), s = V(() => l.value ? !e.reverse : e.reverse), u = G(!1), c = V(() => {
      if (e.crossfade)
        return "v-window-crossfade-transition";
      const x = e.direction === "vertical" ? "y" : "x", k = (s.value ? !u.value : u.value) ? "-reverse" : "";
      return `v-window-${x}${k}-transition`;
    }), d = G(0), f = K(void 0), v = V(() => o.items.value.findIndex((x) => o.selected.value.includes(x.id)));
    q(v, (x, p) => {
      let k;
      const P = {
        left: 0,
        top: 0
      };
      ye && p >= 0 && (k = kl(r.value), P.left = k == null ? void 0 : k.scrollLeft, P.top = k == null ? void 0 : k.scrollTop);
      const S = o.items.value.length, A = S - 1;
      S <= 2 ? u.value = x < p : x === A && p === 0 ? u.value = !1 : x === 0 && p === A ? u.value = !0 : u.value = x < p, me(() => {
        if (!ye || !k) return;
        k.scrollTop !== P.top && k.scrollTo({
          ...P,
          behavior: "instant"
        }), requestAnimationFrame(() => {
          if (!k) return;
          k.scrollTop !== P.top && k.scrollTo({
            ...P,
            behavior: "instant"
          });
        });
      });
    }, {
      flush: "sync"
    }), Pe(Mr, {
      transition: c,
      isReversed: u,
      transitionCount: d,
      transitionHeight: f,
      rootRef: r
    });
    const g = E(() => e.continuous || v.value !== 0), m = E(() => e.continuous || v.value !== o.items.value.length - 1);
    function w() {
      g.value && o.prev();
    }
    function b() {
      m.value && o.next();
    }
    const h = V(() => {
      const x = [], p = {
        icon: l.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${s.value ? "right" : "left"}`,
        onClick: o.prev,
        "aria-label": i("$vuetify.carousel.prev")
      };
      x.push(g.value ? n.prev ? n.prev({
        props: p
      }) : C(lt, p, null) : I("div", null, null));
      const k = {
        icon: l.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${s.value ? "left" : "right"}`,
        onClick: o.next,
        "aria-label": i("$vuetify.carousel.next")
      };
      return x.push(m.value ? n.next ? n.next({
        props: k
      }) : C(lt, k, null) : I("div", null, null)), x;
    }), y = V(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          s.value ? w() : b();
        },
        right: () => {
          s.value ? b() : w();
        },
        start: (p) => {
          let {
            originalEvent: k
          } = p;
          k.stopPropagation();
        }
      },
      ...e.touch === !0 ? {} : e.touch
    });
    return J(() => ze(C(e.tag, {
      ref: r,
      class: Q(["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover",
        "v-window--vertical-arrows": !!e.verticalArrows,
        "v-window--crossfade": !!e.crossfade
      }, a.value, e.class]),
      style: oe([e.style, {
        "--v-window-transition-duration": Wt() ? null : X(e.transitionDuration, "ms")
      }])
    }, {
      default: () => {
        var x, p;
        return [I("div", {
          class: "v-window__container",
          style: {
            height: f.value
          }
        }, [(x = n.default) == null ? void 0 : x.call(n, {
          group: o
        }), e.showArrows !== !1 && I("div", {
          class: Q(["v-window__controls", {
            "v-window__controls--left": e.verticalArrows === "left" || e.verticalArrows === !0
          }, {
            "v-window__controls--right": e.verticalArrows === "right"
          }])
        }, [h.value])]), (p = n.additional) == null ? void 0 : p.call(n, {
          group: o
        })];
      }
    }), [[cl, y.value]])), {
      group: o
    };
  }
}), Nr = O({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...re(),
  ...Aa(),
  ...Br()
}, "VWindowItem"), to = U()({
  name: "VWindowItem",
  directives: {
    vTouch: cl
  },
  props: Nr(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = ge(Mr), l = Tn(e, $r), {
      isBooted: i
    } = On();
    if (!a || !l) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const o = G(!1), r = V(() => i.value && (a.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
    function s() {
      !o.value || !a || (o.value = !1, a.transitionCount.value > 0 && (a.transitionCount.value -= 1, a.transitionCount.value === 0 && (a.transitionHeight.value = void 0)));
    }
    function u() {
      var g;
      o.value || !a || (o.value = !0, a.transitionCount.value === 0 && (a.transitionHeight.value = X((g = a.rootRef.value) == null ? void 0 : g.clientHeight)), a.transitionCount.value += 1);
    }
    function c() {
      s();
    }
    function d(g) {
      o.value && me(() => {
        !r.value || !o.value || !a || (a.transitionHeight.value = X(g.clientHeight));
      });
    }
    const f = V(() => {
      const g = a.isReversed.value ? e.reverseTransition : e.transition;
      return r.value ? {
        name: typeof g != "string" ? a.transition.value : g,
        onBeforeEnter: u,
        onAfterEnter: s,
        onEnterCancelled: c,
        onBeforeLeave: u,
        onAfterLeave: s,
        onLeaveCancelled: c,
        onEnter: d
      } : !1;
    }), {
      hasContent: v
    } = Dr(e, l.isSelected);
    return J(() => C(At, {
      transition: f.value,
      disabled: !i.value
    }, {
      default: () => {
        var g;
        return [ze(I("div", {
          class: Q(["v-window-item", l.selectedClass.value, e.class]),
          style: oe(e.style)
        }, [v.value && ((g = n.default) == null ? void 0 : g.call(n))]), [[Yt, l.isSelected.value]])];
      }
    })), {
      groupItem: l
    };
  }
}), bv = O({
  active: Boolean,
  disabled: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...re(),
  ...Ln({
    transition: {
      component: jo
    }
  })
}, "VCounter"), Hr = U()({
  name: "VCounter",
  functional: !0,
  props: bv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = E(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return J(() => C(At, {
      transition: e.transition
    }, {
      default: () => [ze(I("div", {
        class: Q(["v-counter", {
          "text-error": e.max && !e.disabled && parseFloat(e.value) > parseFloat(e.max)
        }, e.class]),
        style: oe(e.style)
      }, [n.default ? n.default({
        counter: a.value,
        max: e.max,
        value: e.value
      }) : a.value]), [[Yt, e.active]])]
    })), {};
  }
}), Sv = O({
  text: String,
  onClick: He(),
  ...re(),
  ...Ce()
}, "VLabel"), zr = U()({
  name: "VLabel",
  props: Sv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return J(() => {
      var a;
      return I("label", {
        class: Q(["v-label", {
          "v-label--clickable": !!e.onClick
        }, e.class]),
        style: oe(e.style),
        onClick: e.onClick
      }, [e.text, (a = n.default) == null ? void 0 : a.call(n)]);
    }), {};
  }
}), wv = O({
  floating: Boolean,
  ...re()
}, "VFieldLabel"), Kn = U()({
  name: "VFieldLabel",
  props: wv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return J(() => C(zr, {
      class: Q(["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class]),
      style: oe(e.style)
    }, n)), {};
  }
});
function Da(e) {
  const {
    t
  } = yt();
  function n(a) {
    let {
      name: l,
      color: i,
      ...o
    } = a;
    const r = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[l], s = e[`onClick:${l}`];
    function u(d) {
      d.key !== "Enter" && d.key !== " " || (d.preventDefault(), d.stopPropagation(), xa(s, new PointerEvent("click", d)));
    }
    const c = s && r ? t(`$vuetify.input.${r}`, e.label ?? "") : void 0;
    return C(Ve, j({
      icon: e[`${l}Icon`],
      "aria-label": c,
      onClick: s,
      onKeydown: u,
      color: i
    }, o), null);
  }
  return {
    InputIcon: n
  };
}
const Wr = O({
  focused: Boolean,
  "onUpdate:focused": He()
}, "focus");
function Fa(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : kt();
  const n = fe(e, "focused"), a = E(() => ({
    [`${t}--focused`]: n.value
  }));
  function l() {
    n.value = !0;
  }
  function i() {
    n.value = !1;
  }
  return {
    focusClasses: a,
    isFocused: n,
    focus: l,
    blur: i
  };
}
const xv = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], Ll = O({
  appendInnerIcon: se,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: se,
    default: "$clear"
  },
  active: Boolean,
  centerAffix: {
    type: Boolean,
    default: void 0
  },
  color: String,
  baseColor: String,
  dirty: Boolean,
  disabled: {
    type: Boolean,
    default: null
  },
  glow: Boolean,
  error: Boolean,
  flat: Boolean,
  iconColor: [Boolean, String],
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: se,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (e) => xv.includes(e)
  },
  "onClick:clear": He(),
  "onClick:appendInner": He(),
  "onClick:prependInner": He(),
  ...re(),
  ...Ea(),
  ...Ue(),
  ...Ce()
}, "VField"), ua = U()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    details: Boolean,
    labelId: String,
    ...Wr(),
    ...Ll()
  },
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: a,
      slots: l
    } = t;
    const {
      themeClasses: i
    } = Ae(e), {
      loaderClasses: o
    } = _a(e), {
      focusClasses: r,
      isFocused: s,
      focus: u,
      blur: c
    } = Fa(e), {
      InputIcon: d
    } = Da(e), {
      roundedClasses: f
    } = qe(e), {
      rtlClasses: v
    } = tt(), g = E(() => e.dirty || e.active), m = E(() => !!(e.label || l.label)), w = E(() => !e.singleLine && m.value), b = ht(), h = V(() => e.id || `input-${b}`), y = E(() => e.details ? `${h.value}-messages` : void 0), x = K(), p = K(), k = K(), P = V(() => ["plain", "underlined"].includes(e.variant)), S = V(() => e.error || e.disabled ? void 0 : g.value && s.value ? e.color : e.baseColor), A = V(() => {
      if (!(!e.iconColor || e.glow && !s.value))
        return e.iconColor === !0 ? S.value : e.iconColor;
    }), {
      backgroundColorClasses: T,
      backgroundColorStyles: _
    } = Xe(() => e.bgColor), {
      textColorClasses: B,
      textColorStyles: F
    } = dt(S);
    q(g, (Y) => {
      if (w.value && !Wt()) {
        const z = x.value.$el, ee = p.value.$el;
        requestAnimationFrame(() => {
          const ie = Sl(z), $ = ee.getBoundingClientRect(), Z = $.x - ie.x, M = $.y - ie.y - (ie.height / 2 - $.height / 2), N = $.width / 0.75, te = Math.abs(N - ie.width) > 1 ? {
            maxWidth: X(N)
          } : void 0, W = getComputedStyle(z), ae = getComputedStyle(ee), R = parseFloat(W.transitionDuration) * 1e3 || 150, le = parseFloat(ae.getPropertyValue("--v-field-label-scale")), ve = ae.getPropertyValue("color");
          z.style.visibility = "visible", ee.style.visibility = "hidden", It(z, {
            transform: `translate(${Z}px, ${M}px) scale(${le})`,
            color: ve,
            ...te
          }, {
            duration: R,
            easing: kn,
            direction: Y ? "normal" : "reverse"
          }).finished.then(() => {
            z.style.removeProperty("visibility"), ee.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const D = V(() => ({
      isActive: g,
      isFocused: s,
      controlRef: k,
      iconColor: A,
      blur: c,
      focus: u
    }));
    function L(Y) {
      Y.target !== document.activeElement && Y.preventDefault();
    }
    return J(() => {
      var Z;
      const Y = e.variant === "outlined", z = !!(l["prepend-inner"] || e.prependInnerIcon), ee = !!(e.clearable || l.clear) && !e.disabled, ie = !!(l["append-inner"] || e.appendInnerIcon || ee), $ = () => l.label ? l.label({
        ...D.value,
        label: e.label,
        props: {
          for: h.value
        }
      }) : e.label;
      return I("div", j({
        class: ["v-field", {
          "v-field--active": g.value,
          "v-field--appended": ie,
          "v-field--center-affix": e.centerAffix ?? !P.value,
          "v-field--disabled": e.disabled,
          "v-field--dirty": e.dirty,
          "v-field--error": e.error,
          "v-field--glow": e.glow,
          "v-field--flat": e.flat,
          "v-field--has-background": !!e.bgColor,
          "v-field--persistent-clear": e.persistentClear,
          "v-field--prepended": z,
          "v-field--reverse": e.reverse,
          "v-field--single-line": e.singleLine,
          "v-field--no-label": !$(),
          [`v-field--variant-${e.variant}`]: !0
        }, i.value, T.value, r.value, o.value, f.value, v.value, e.class],
        style: [_.value, e.style],
        onClick: L
      }, n), [I("div", {
        class: "v-field__overlay"
      }, null), C(Dl, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: l.loader
      }), z && I("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [l["prepend-inner"] ? l["prepend-inner"](D.value) : e.prependInnerIcon && C(d, {
        key: "prepend-icon",
        name: "prependInner",
        color: A.value
      }, null)]), I("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && w.value && C(Kn, {
        key: "floating-label",
        ref: p,
        class: Q([B.value]),
        floating: !0,
        for: h.value,
        "aria-hidden": !g.value,
        style: oe(F.value)
      }, {
        default: () => [$()]
      }), m.value && C(Kn, {
        key: "label",
        ref: x,
        id: e.labelId,
        for: h.value,
        "aria-hidden": w.value && g.value
      }, {
        default: () => [$()]
      }), ((Z = l.default) == null ? void 0 : Z.call(l, {
        ...D.value,
        props: {
          id: h.value,
          class: "v-field__input",
          "aria-describedby": y.value
        },
        focus: u,
        blur: c
      })) ?? I("div", {
        id: h.value,
        class: "v-field__input",
        "aria-describedby": y.value
      }, null)]), ee && C(Yo, {
        key: "clear"
      }, {
        default: () => [ze(I("div", {
          class: "v-field__clearable",
          onMousedown: (M) => {
            M.preventDefault(), M.stopPropagation();
          }
        }, [C(ke, {
          defaults: {
            VIcon: {
              icon: e.clearIcon
            }
          }
        }, {
          default: () => [l.clear ? l.clear({
            ...D.value,
            props: {
              onFocus: u,
              onBlur: c,
              onClick: e["onClick:clear"],
              tabindex: -1
            }
          }) : C(d, {
            name: "clear",
            onFocus: u,
            onBlur: c,
            tabindex: -1
          }, null)]
        })]), [[Yt, e.dirty]])]
      }), ie && I("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [l["append-inner"] ? l["append-inner"](D.value) : e.appendInnerIcon && C(d, {
        key: "append-icon",
        name: "appendInner",
        color: A.value
      }, null)]), I("div", {
        class: Q(["v-field__outline", B.value]),
        style: oe(F.value)
      }, [Y && I(de, null, [I("div", {
        class: "v-field__outline__start"
      }, null), w.value && I("div", {
        class: "v-field__outline__notch"
      }, [C(Kn, {
        ref: p,
        floating: !0,
        for: h.value,
        "aria-hidden": !g.value
      }, {
        default: () => [$()]
      })]), I("div", {
        class: "v-field__outline__end"
      }, null)]), P.value && w.value && C(Kn, {
        ref: p,
        floating: !0,
        for: h.value,
        "aria-hidden": !g.value
      }, {
        default: () => [$()]
      })])]);
    }), {
      controlRef: k,
      fieldIconColor: A
    };
  }
}), kv = O({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...re(),
  ...Ln({
    transition: {
      component: jo,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), Cv = U()({
  name: "VMessages",
  props: kv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = V(() => Me(e.messages)), {
      textColorClasses: l,
      textColorStyles: i
    } = dt(() => e.color);
    return J(() => C(At, {
      transition: e.transition,
      tag: "div",
      class: Q(["v-messages", l.value, e.class]),
      style: oe([i.value, e.style])
    }, {
      default: () => [e.active && a.value.map((o, r) => I("div", {
        class: "v-messages__message",
        key: `${r}-${a.value}`
      }, [n.message ? n.message({
        message: o
      }) : o]))]
    })), {};
  }
}), jr = Symbol.for("vuetify:form"), pv = O({
  disabled: Boolean,
  fastFail: Boolean,
  readonly: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  },
  validateOn: {
    type: String,
    default: "input"
  }
}, "form");
function Vv(e) {
  const t = fe(e, "modelValue"), n = E(() => e.disabled), a = E(() => e.readonly), l = G(!1), i = K([]), o = K([]);
  async function r() {
    const c = [];
    let d = !0;
    o.value = [], l.value = !0;
    for (const f of i.value) {
      const v = await f.validate();
      if (v.length > 0 && (d = !1, c.push({
        id: f.id,
        errorMessages: v
      })), !d && e.fastFail) break;
    }
    return o.value = c, l.value = !1, {
      valid: d,
      errors: o.value
    };
  }
  function s() {
    i.value.forEach((c) => c.reset());
  }
  function u() {
    i.value.forEach((c) => c.resetValidation());
  }
  return q(i, () => {
    let c = 0, d = 0;
    const f = [];
    for (const v of i.value)
      v.isValid === !1 ? (d++, f.push({
        id: v.id,
        errorMessages: v.errorMessages
      })) : v.isValid === !0 && c++;
    o.value = f, t.value = d > 0 ? !1 : c === i.value.length ? !0 : null;
  }, {
    deep: !0,
    flush: "post"
  }), Pe(jr, {
    register: (c) => {
      let {
        id: d,
        vm: f,
        validate: v,
        reset: g,
        resetValidation: m
      } = c;
      i.value.some((w) => w.id === d) && it(`Duplicate input name "${d}"`), i.value.push({
        id: d,
        validate: v,
        reset: g,
        resetValidation: m,
        vm: fu(f),
        isValid: null,
        errorMessages: []
      });
    },
    unregister: (c) => {
      i.value = i.value.filter((d) => d.id !== c);
    },
    update: (c, d, f) => {
      const v = i.value.find((g) => g.id === c);
      v && (v.isValid = d, v.errorMessages = f);
    },
    isDisabled: n,
    isReadonly: a,
    isValidating: l,
    isValid: t,
    items: i,
    validateOn: E(() => e.validateOn)
  }), {
    errors: o,
    isDisabled: n,
    isReadonly: a,
    isValidating: l,
    isValid: t,
    items: i,
    validate: r,
    reset: s,
    resetValidation: u
  };
}
function Ml(e) {
  const t = ge(jr, null);
  return {
    ...t,
    isReadonly: V(() => !!((e == null ? void 0 : e.readonly) ?? (t == null ? void 0 : t.isReadonly.value))),
    isDisabled: V(() => !!((e == null ? void 0 : e.disabled) ?? (t == null ? void 0 : t.isDisabled.value)))
  };
}
const Pv = Symbol.for("vuetify:rules");
function Iv(e) {
  const t = ge(Pv, null);
  if (!e) {
    if (!t)
      throw new Error("Could not find Vuetify rules injection");
    return t.aliases;
  }
  return (t == null ? void 0 : t.resolve(e)) ?? E(e);
}
const Av = O({
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  errorMessages: {
    type: [Array, String],
    default: () => []
  },
  maxErrors: {
    type: [Number, String],
    default: 1
  },
  name: String,
  label: String,
  readonly: {
    type: Boolean,
    default: null
  },
  rules: {
    type: Array,
    default: () => []
  },
  modelValue: null,
  validateOn: String,
  validationValue: null,
  ...Wr()
}, "validation");
function Tv(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : kt(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ht();
  const a = fe(e, "modelValue"), l = V(() => e.validationValue === void 0 ? a.value : e.validationValue), i = Ml(e), o = Iv(() => e.rules), r = K([]), s = G(!0), u = V(() => !!(Me(a.value === "" ? null : a.value).length || Me(l.value === "" ? null : l.value).length)), c = V(() => {
    var x;
    return (x = e.errorMessages) != null && x.length ? Me(e.errorMessages).concat(r.value).slice(0, Math.max(0, Number(e.maxErrors))) : r.value;
  }), d = V(() => {
    var k;
    let x = (e.validateOn ?? ((k = i.validateOn) == null ? void 0 : k.value)) || "input";
    x === "lazy" && (x = "input lazy"), x === "eager" && (x = "input eager");
    const p = new Set((x == null ? void 0 : x.split(" ")) ?? []);
    return {
      input: p.has("input"),
      blur: p.has("blur") || p.has("input") || p.has("invalid-input"),
      invalidInput: p.has("invalid-input"),
      lazy: p.has("lazy"),
      eager: p.has("eager")
    };
  }), f = V(() => {
    var x;
    return e.error || (x = e.errorMessages) != null && x.length ? !1 : e.rules.length ? s.value ? r.value.length || d.value.lazy ? null : !0 : !r.value.length : !0;
  }), v = G(!1), g = V(() => ({
    [`${t}--error`]: f.value === !1,
    [`${t}--dirty`]: u.value,
    [`${t}--disabled`]: i.isDisabled.value,
    [`${t}--readonly`]: i.isReadonly.value
  })), m = Ie("validation"), w = V(() => e.name ?? ut(n));
  Sa(() => {
    var x;
    (x = i.register) == null || x.call(i, {
      id: w.value,
      vm: m,
      validate: y,
      reset: b,
      resetValidation: h
    });
  }), et(() => {
    var x;
    (x = i.unregister) == null || x.call(i, w.value);
  }), gt(async () => {
    var x;
    d.value.lazy || await y(!d.value.eager), (x = i.update) == null || x.call(i, w.value, f.value, c.value);
  }), Je(() => d.value.input || d.value.invalidInput && f.value === !1, () => {
    q(l, () => {
      if (l.value != null)
        y();
      else if (e.focused) {
        const x = q(() => e.focused, (p) => {
          p || y(), x();
        });
      }
    });
  }), Je(() => d.value.blur, () => {
    q(() => e.focused, (x) => {
      x || y();
    });
  }), q([f, c], () => {
    var x;
    (x = i.update) == null || x.call(i, w.value, f.value, c.value);
  });
  async function b() {
    a.value = null, await me(), await h();
  }
  async function h() {
    s.value = !0, d.value.lazy ? r.value = [] : await y(!d.value.eager);
  }
  async function y() {
    let x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const p = [];
    v.value = !0;
    for (const k of o.value) {
      if (p.length >= Number(e.maxErrors ?? 1))
        break;
      const S = await (typeof k == "function" ? k : () => k)(l.value);
      if (S !== !0) {
        if (S !== !1 && typeof S != "string") {
          console.warn(`${S} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        p.push(S || "");
      }
    }
    return r.value = p, v.value = !1, s.value = x, r.value;
  }
  return {
    errorMessages: c,
    isDirty: u,
    isDisabled: i.isDisabled,
    isReadonly: i.isReadonly,
    isPristine: s,
    isValid: f,
    isValidating: v,
    reset: b,
    resetValidation: h,
    validate: y,
    validationClasses: g
  };
}
const Oa = O({
  id: String,
  appendIcon: se,
  baseColor: String,
  centerAffix: {
    type: Boolean,
    default: !0
  },
  color: String,
  glow: Boolean,
  iconColor: [Boolean, String],
  prependIcon: se,
  hideDetails: [Boolean, String],
  hideSpinButtons: Boolean,
  hint: String,
  persistentHint: Boolean,
  messages: {
    type: [Array, String],
    default: () => []
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (e) => ["horizontal", "vertical"].includes(e)
  },
  "onClick:prepend": He(),
  "onClick:append": He(),
  ...re(),
  ...We(),
  ...Bt(ft(), ["maxWidth", "minWidth", "width"]),
  ...Ce(),
  ...Av()
}, "VInput"), cn = U()({
  name: "VInput",
  props: {
    ...Oa()
  },
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a,
      emit: l
    } = t;
    const {
      densityClasses: i
    } = mt(e), {
      dimensionStyles: o
    } = vt(e), {
      themeClasses: r
    } = Ae(e), {
      rtlClasses: s
    } = tt(), {
      InputIcon: u
    } = Da(e), c = ht(), d = V(() => e.id || `input-${c}`), {
      errorMessages: f,
      isDirty: v,
      isDisabled: g,
      isReadonly: m,
      isPristine: w,
      isValid: b,
      isValidating: h,
      reset: y,
      resetValidation: x,
      validate: p,
      validationClasses: k
    } = Tv(e, "v-input", d), P = V(() => {
      var D;
      return (D = e.errorMessages) != null && D.length || !w.value && f.value.length ? f.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    }), S = E(() => P.value.length > 0), A = E(() => !e.hideDetails || e.hideDetails === "auto" && (S.value || !!a.details)), T = V(() => A.value ? `${d.value}-messages` : void 0), _ = V(() => ({
      id: d,
      messagesId: T,
      isDirty: v,
      isDisabled: g,
      isReadonly: m,
      isPristine: w,
      isValid: b,
      isValidating: h,
      hasDetails: A,
      reset: y,
      resetValidation: x,
      validate: p
    })), B = E(() => e.error || e.disabled ? void 0 : e.focused ? e.color : e.baseColor), F = E(() => {
      if (e.iconColor)
        return e.iconColor === !0 ? B.value : e.iconColor;
    });
    return J(() => {
      var Y, z;
      const D = !!(a.prepend || e.prependIcon), L = !!(a.append || e.appendIcon);
      return I("div", {
        class: Q(["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--focused": e.focused,
          "v-input--glow": e.glow,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, i.value, r.value, s.value, k.value, e.class]),
        style: oe([o.value, e.style])
      }, [D && I("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [a.prepend ? a.prepend(_.value) : e.prependIcon && C(u, {
        key: "prepend-icon",
        name: "prepend",
        color: F.value
      }, null)]), a.default && I("div", {
        class: "v-input__control"
      }, [(Y = a.default) == null ? void 0 : Y.call(a, _.value)]), L && I("div", {
        key: "append",
        class: "v-input__append"
      }, [a.append ? a.append(_.value) : e.appendIcon && C(u, {
        key: "append-icon",
        name: "append",
        color: F.value
      }, null)]), A.value && I("div", {
        id: T.value,
        class: "v-input__details",
        role: "alert",
        "aria-live": "polite"
      }, [C(Cv, {
        active: S.value,
        messages: P.value
      }, {
        message: a.message
      }), (z = a.details) == null ? void 0 : z.call(a, _.value)])]);
    }), {
      reset: y,
      resetValidation: x,
      validate: p,
      isValid: b,
      errorMessages: f
    };
  }
}), Gr = O({
  autocomplete: String
}, "autocomplete");
function $l(e) {
  const t = ht(), n = G(0), a = E(() => e.autocomplete === "suppress"), l = E(() => {
    if (e.name)
      return a.value ? `${e.name}-${t}-${n.value}` : e.name;
  }), i = E(() => a.value ? "off" : e.autocomplete);
  return {
    isSuppressing: a,
    fieldAutocomplete: i,
    fieldName: l,
    update: () => n.value = (/* @__PURE__ */ new Date()).getTime()
  };
}
function Yr(e) {
  function t(n, a) {
    if (!e.autofocus || !n) return;
    const l = a[0].target, i = l.matches("input,textarea") ? l : l.querySelector("input,textarea");
    i == null || i.focus();
  }
  return {
    onIntersect: t
  };
}
const Ev = ["color", "file", "time", "date", "datetime-local", "week", "month"], Rl = O({
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: [Number, Function],
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  suffix: String,
  role: String,
  type: {
    type: String,
    default: "text"
  },
  modelModifiers: Object,
  ...Gr(),
  ...Oa(),
  ...Ll()
}, "VTextField"), ca = U()({
  name: "VTextField",
  directives: {
    vIntersect: rn
  },
  inheritAttrs: !1,
  props: Rl(),
  emits: {
    "click:control": (e) => !0,
    "mousedown:control": (e) => !0,
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: a,
      slots: l
    } = t;
    const i = fe(e, "modelValue"), {
      isFocused: o,
      focus: r,
      blur: s
    } = Fa(e), {
      onIntersect: u
    } = Yr(e), c = V(() => typeof e.counterValue == "function" ? e.counterValue(i.value) : typeof e.counterValue == "number" ? e.counterValue : (i.value ?? "").toString().length), d = V(() => {
      if (n.maxlength) return n.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), f = V(() => ["plain", "underlined"].includes(e.variant)), v = K(), g = K(), m = K(), w = $l(e), b = V(() => Ev.includes(e.type) || e.persistentPlaceholder || o.value || e.active);
    function h() {
      w.isSuppressing.value && w.update(), o.value || r(), me(() => {
        var P;
        m.value !== document.activeElement && ((P = m.value) == null || P.focus());
      });
    }
    function y(P) {
      a("mousedown:control", P), P.target !== m.value && (h(), P.preventDefault());
    }
    function x(P) {
      a("click:control", P);
    }
    function p(P, S) {
      P.stopPropagation(), h(), me(() => {
        S(), xa(e["onClick:clear"], P);
      });
    }
    function k(P) {
      var B;
      const S = P.target;
      if (!((B = e.modelModifiers) != null && B.trim && ["text", "search", "password", "tel", "url"].includes(e.type))) {
        i.value = S.value;
        return;
      }
      const A = S.value, T = S.selectionStart, _ = S.selectionEnd;
      i.value = A, me(() => {
        let F = 0;
        A.trimStart().length === S.value.length && (F = A.length - S.value.length), T != null && (S.selectionStart = T - F), _ != null && (S.selectionEnd = _ - F);
      });
    }
    return J(() => {
      const P = !!(l.counter || e.counter !== !1 && e.counter != null), S = !!(P || l.details), [A, T] = wa(n), {
        modelValue: _,
        ...B
      } = cn.filterProps(e), F = ua.filterProps(e);
      return C(cn, j({
        ref: v,
        modelValue: i.value,
        "onUpdate:modelValue": (D) => i.value = D,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": f.value
        }, e.class],
        style: e.style
      }, A, B, {
        centerAffix: !f.value,
        focused: o.value
      }), {
        ...l,
        default: (D) => {
          let {
            id: L,
            isDisabled: Y,
            isDirty: z,
            isReadonly: ee,
            isValid: ie,
            hasDetails: $,
            reset: Z
          } = D;
          return C(ua, j({
            ref: g,
            onMousedown: y,
            onClick: x,
            "onClick:clear": (M) => p(M, Z),
            role: e.role
          }, _e(F, ["onClick:clear"]), {
            id: L.value,
            labelId: `${L.value}-label`,
            active: b.value || z.value,
            dirty: z.value || e.dirty,
            disabled: Y.value,
            focused: o.value,
            details: $.value,
            error: ie.value === !1
          }), {
            ...l,
            default: (M) => {
              let {
                props: {
                  class: N,
                  ...te
                },
                controlRef: W
              } = M;
              const ae = I("input", j({
                ref: (R) => m.value = W.value = R,
                value: i.value,
                onInput: k,
                autofocus: e.autofocus,
                readonly: ee.value,
                disabled: Y.value,
                name: w.fieldName.value,
                autocomplete: w.fieldAutocomplete.value,
                placeholder: e.placeholder,
                size: 1,
                role: e.role,
                type: e.type,
                onFocus: r,
                onBlur: s,
                "aria-labelledby": `${L.value}-label`
              }, te, T), null);
              return I(de, null, [e.prefix && I("span", {
                class: "v-text-field__prefix"
              }, [I("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), ze(l.default ? I("div", {
                class: Q(N),
                "data-no-activator": ""
              }, [l.default({
                id: L
              }), ae]) : vu(ae, {
                class: N
              }), [[rn, u, null, {
                once: !0
              }]]), e.suffix && I("span", {
                class: "v-text-field__suffix"
              }, [I("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: S ? (D) => {
          var L;
          return I(de, null, [(L = l.details) == null ? void 0 : L.call(l, D), P && I(de, null, [I("span", null, null), C(Hr, {
            active: e.persistentCounter || o.value,
            value: c.value,
            max: d.value,
            disabled: e.disabled
          }, l.counter)])]);
        } : void 0
      });
    }), Vt({}, v, g, m);
  }
});
function _v() {
  const e = K([]);
  mu(() => e.value = []);
  function t(n, a) {
    e.value[a] = n;
  }
  return {
    refs: e,
    updateRef: t
  };
}
const Bv = O({
  activeColor: String,
  start: {
    type: [Number, String],
    default: 1
  },
  modelValue: {
    type: Number,
    default: (e) => e.start
  },
  disabled: Boolean,
  length: {
    type: [Number, String],
    default: 1,
    validator: (e) => e % 1 === 0
  },
  totalVisible: [Number, String],
  firstIcon: {
    type: se,
    default: "$first"
  },
  prevIcon: {
    type: se,
    default: "$prev"
  },
  nextIcon: {
    type: se,
    default: "$next"
  },
  lastIcon: {
    type: se,
    default: "$last"
  },
  ariaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.root"
  },
  pageAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.page"
  },
  currentPageAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.currentPage"
  },
  firstAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.first"
  },
  previousAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.previous"
  },
  nextAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.next"
  },
  lastAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.last"
  },
  ellipsis: {
    type: String,
    default: "..."
  },
  showFirstLastPage: Boolean,
  ...bt(),
  ...re(),
  ...We(),
  ...wt(),
  ...Ue(),
  ...vn(),
  ...he({
    tag: "nav"
  }),
  ...Ce(),
  ...St({
    variant: "text"
  })
}, "VPagination"), no = U()({
  name: "VPagination",
  props: Bv(),
  emits: {
    "update:modelValue": (e) => !0,
    first: (e) => !0,
    prev: (e) => !0,
    next: (e) => !0,
    last: (e) => !0
  },
  setup(e, t) {
    let {
      slots: n,
      emit: a
    } = t;
    const l = fe(e, "modelValue"), {
      t: i,
      n: o
    } = yt(), {
      isRtl: r
    } = tt(), {
      themeClasses: s
    } = Ae(e), {
      width: u
    } = Et(), c = G(-1);
    ot(void 0, {
      scoped: !0
    });
    const {
      resizeRef: d
    } = Ft((S) => {
      if (!S.length) return;
      const {
        target: A,
        contentRect: T
      } = S[0], _ = A.querySelector(".v-pagination__list > *");
      if (!_) return;
      const B = T.width, F = _.offsetWidth + parseFloat(getComputedStyle(_).marginRight) * 2;
      c.value = m(B, F);
    }), f = V(() => parseInt(e.length, 10)), v = V(() => parseInt(e.start, 10)), g = V(() => e.totalVisible != null ? parseInt(e.totalVisible, 10) : c.value >= 0 ? c.value : m(u.value, 58));
    function m(S, A) {
      const T = e.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        Number(((S - A * T) / A).toFixed(2))
      ));
    }
    const w = V(() => {
      if (f.value <= 0 || isNaN(f.value) || f.value > Number.MAX_SAFE_INTEGER) return [];
      if (g.value <= 0) return [];
      if (g.value === 1) return [l.value];
      if (f.value <= g.value)
        return Jt(f.value, v.value);
      const S = g.value % 2 === 0, A = S ? g.value / 2 : Math.floor(g.value / 2), T = S ? A : A + 1, _ = f.value - A;
      if (T - l.value >= 0)
        return [...Jt(Math.max(1, g.value - 1), v.value), e.ellipsis, f.value];
      if (l.value - _ >= (S ? 1 : 0)) {
        const B = g.value - 1, F = f.value - B + v.value;
        return [v.value, e.ellipsis, ...Jt(B, F)];
      } else {
        const B = Math.max(1, g.value - 2), F = B === 1 ? l.value : l.value - Math.ceil(B / 2) + v.value;
        return [v.value, e.ellipsis, ...Jt(B, F), e.ellipsis, f.value];
      }
    });
    function b(S, A, T) {
      S.preventDefault(), l.value = A, T && a(T, A);
    }
    const {
      refs: h,
      updateRef: y
    } = _v();
    ot({
      VPaginationBtn: {
        color: E(() => e.color),
        border: E(() => e.border),
        density: E(() => e.density),
        size: E(() => e.size),
        variant: E(() => e.variant),
        rounded: E(() => e.rounded),
        elevation: E(() => e.elevation)
      }
    });
    const x = V(() => w.value.map((S, A) => {
      const T = (_) => y(_, A);
      if (typeof S == "string")
        return {
          isActive: !1,
          key: `ellipsis-${A}`,
          page: S,
          props: {
            ref: T,
            ellipsis: !0,
            icon: !0,
            disabled: !0
          }
        };
      {
        const _ = S === l.value;
        return {
          isActive: _,
          key: S,
          page: o(S),
          props: {
            ref: T,
            ellipsis: !1,
            icon: !0,
            disabled: !!e.disabled || Number(e.length) < 2,
            color: _ ? e.activeColor : e.color,
            "aria-current": _,
            "aria-label": i(_ ? e.currentPageAriaLabel : e.pageAriaLabel, S),
            onClick: (B) => b(B, S)
          }
        };
      }
    })), p = V(() => {
      const S = !!e.disabled || l.value <= v.value, A = !!e.disabled || l.value >= v.value + f.value - 1;
      return {
        first: e.showFirstLastPage ? {
          icon: r.value ? e.lastIcon : e.firstIcon,
          onClick: (T) => b(T, v.value, "first"),
          disabled: S,
          "aria-label": i(e.firstAriaLabel),
          "aria-disabled": S
        } : void 0,
        prev: {
          icon: r.value ? e.nextIcon : e.prevIcon,
          onClick: (T) => b(T, l.value - 1, "prev"),
          disabled: S,
          "aria-label": i(e.previousAriaLabel),
          "aria-disabled": S
        },
        next: {
          icon: r.value ? e.prevIcon : e.nextIcon,
          onClick: (T) => b(T, l.value + 1, "next"),
          disabled: A,
          "aria-label": i(e.nextAriaLabel),
          "aria-disabled": A
        },
        last: e.showFirstLastPage ? {
          icon: r.value ? e.firstIcon : e.lastIcon,
          onClick: (T) => b(T, v.value + f.value - 1, "last"),
          disabled: A,
          "aria-label": i(e.lastAriaLabel),
          "aria-disabled": A
        } : void 0
      };
    });
    function k() {
      var A;
      const S = l.value - v.value;
      (A = h.value[S]) == null || A.$el.focus();
    }
    function P(S) {
      S.key === ei.left && !e.disabled && l.value > Number(e.start) ? (l.value = l.value - 1, me(k)) : S.key === ei.right && !e.disabled && l.value < v.value + f.value - 1 && (l.value = l.value + 1, me(k));
    }
    return J(() => C(e.tag, {
      ref: d,
      class: Q(["v-pagination", s.value, e.class]),
      style: oe(e.style),
      role: "navigation",
      "aria-label": i(e.ariaLabel),
      onKeydown: P,
      "data-test": "v-pagination-root"
    }, {
      default: () => [I("ul", {
        class: "v-pagination__list"
      }, [e.showFirstLastPage && I("li", {
        key: "first",
        class: "v-pagination__first",
        "data-test": "v-pagination-first"
      }, [n.first ? n.first(p.value.first) : C(lt, j({
        _as: "VPaginationBtn"
      }, p.value.first), null)]), I("li", {
        key: "prev",
        class: "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [n.prev ? n.prev(p.value.prev) : C(lt, j({
        _as: "VPaginationBtn"
      }, p.value.prev), null)]), x.value.map((S, A) => I("li", {
        key: S.key,
        class: Q(["v-pagination__item", {
          "v-pagination__item--is-active": S.isActive
        }]),
        "data-test": "v-pagination-item"
      }, [n.item ? n.item(S) : C(lt, j({
        _as: "VPaginationBtn"
      }, S.props), {
        default: () => [S.page]
      })])), I("li", {
        key: "next",
        class: "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [n.next ? n.next(p.value.next) : C(lt, j({
        _as: "VPaginationBtn"
      }, p.value.next), null)]), e.showFirstLastPage && I("li", {
        key: "last",
        class: "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [n.last ? n.last(p.value.last) : C(lt, j({
        _as: "VPaginationBtn"
      }, p.value.last), null)])])]
    })), {};
  }
}), Ur = Symbol.for("vuetify:selection-control-group"), Kr = O({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: se,
  trueIcon: se,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  multiple: {
    type: Boolean,
    default: null
  },
  name: String,
  readonly: {
    type: Boolean,
    default: null
  },
  modelValue: null,
  type: String,
  valueComparator: {
    type: Function,
    default: Ke
  },
  ...re(),
  ...We(),
  ...Ce()
}, "SelectionControlGroup"), Dv = O({
  ...Kr({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
U()({
  name: "VSelectionControlGroup",
  props: Dv(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = fe(e, "modelValue"), l = ht(), i = E(() => e.id || `v-selection-control-group-${l}`), o = E(() => e.name || i.value), r = /* @__PURE__ */ new Set();
    return Pe(Ur, {
      modelValue: a,
      forceUpdate: () => {
        r.forEach((s) => s());
      },
      onForceUpdate: (s) => {
        r.add(s), De(() => {
          r.delete(s);
        });
      }
    }), ot({
      [e.defaultsTarget]: {
        color: E(() => e.color),
        disabled: E(() => e.disabled),
        density: E(() => e.density),
        error: E(() => e.error),
        inline: E(() => e.inline),
        modelValue: a,
        multiple: E(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)),
        name: o,
        falseIcon: E(() => e.falseIcon),
        trueIcon: E(() => e.trueIcon),
        readonly: E(() => e.readonly),
        ripple: E(() => e.ripple),
        type: E(() => e.type),
        valueComparator: E(() => e.valueComparator)
      }
    }), J(() => {
      var s;
      return I("div", {
        class: Q(["v-selection-control-group", {
          "v-selection-control-group--inline": e.inline
        }, e.class]),
        style: oe(e.style),
        role: e.type === "radio" ? "radiogroup" : void 0
      }, [(s = n.default) == null ? void 0 : s.call(n)]);
    }), {};
  }
});
const Xr = O({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...re(),
  ...Kr()
}, "VSelectionControl");
function Fv(e) {
  const t = ge(Ur, void 0), {
    densityClasses: n
  } = mt(e), a = fe(e, "modelValue"), l = V(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), i = V(() => e.falseValue !== void 0 ? e.falseValue : !1), o = V(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)), r = V({
    get() {
      const v = t ? t.modelValue.value : a.value;
      return o.value ? Me(v).some((g) => e.valueComparator(g, l.value)) : e.valueComparator(v, l.value);
    },
    set(v) {
      if (e.readonly) return;
      const g = v ? l.value : i.value;
      let m = g;
      o.value && (m = v ? [...Me(a.value), g] : Me(a.value).filter((w) => !e.valueComparator(w, l.value))), t ? t.modelValue.value = m : a.value = m;
    }
  }), {
    textColorClasses: s,
    textColorStyles: u
  } = dt(() => {
    if (!(e.error || e.disabled))
      return r.value ? e.color : e.baseColor;
  }), {
    backgroundColorClasses: c,
    backgroundColorStyles: d
  } = Xe(() => r.value && !e.error && !e.disabled ? e.color : e.baseColor), f = V(() => r.value ? e.trueIcon : e.falseIcon);
  return {
    group: t,
    densityClasses: n,
    trueValue: l,
    falseValue: i,
    model: r,
    textColorClasses: s,
    textColorStyles: u,
    backgroundColorClasses: c,
    backgroundColorStyles: d,
    icon: f
  };
}
const ao = U()({
  name: "VSelectionControl",
  directives: {
    vRipple: Tt
  },
  inheritAttrs: !1,
  props: Xr(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      group: l,
      densityClasses: i,
      icon: o,
      model: r,
      textColorClasses: s,
      textColorStyles: u,
      backgroundColorClasses: c,
      backgroundColorStyles: d,
      trueValue: f
    } = Fv(e), v = ht(), g = G(!1), m = G(!1), w = K(), b = E(() => e.id || `input-${v}`), h = E(() => !e.disabled && !e.readonly);
    l == null || l.onForceUpdate(() => {
      w.value && (w.value.checked = r.value);
    });
    function y(P) {
      h.value && (g.value = !0, an(P.target, ":focus-visible") !== !1 && (m.value = !0));
    }
    function x() {
      g.value = !1, m.value = !1;
    }
    function p(P) {
      P.stopPropagation();
    }
    function k(P) {
      if (!h.value) {
        w.value && (w.value.checked = r.value);
        return;
      }
      e.readonly && l && me(() => l.forceUpdate()), r.value = P.target.checked;
    }
    return J(() => {
      var _, B;
      const P = a.label ? a.label({
        label: e.label,
        props: {
          for: b.value
        }
      }) : e.label, [S, A] = wa(n), T = I("input", j({
        ref: w,
        checked: r.value,
        disabled: !!e.disabled,
        id: b.value,
        onBlur: x,
        onFocus: y,
        onInput: k,
        "aria-disabled": !!e.disabled,
        "aria-label": e.label,
        type: e.type,
        value: f.value,
        name: e.name,
        "aria-checked": e.type === "checkbox" ? r.value : void 0
      }, A), null);
      return I("div", j({
        class: ["v-selection-control", {
          "v-selection-control--dirty": r.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": g.value,
          "v-selection-control--focus-visible": m.value,
          "v-selection-control--inline": e.inline
        }, i.value, e.class]
      }, S, {
        style: e.style
      }), [I("div", {
        class: Q(["v-selection-control__wrapper", s.value]),
        style: oe(u.value)
      }, [(_ = a.default) == null ? void 0 : _.call(a, {
        backgroundColorClasses: c,
        backgroundColorStyles: d
      }), ze(I("div", {
        class: Q(["v-selection-control__input"])
      }, [((B = a.input) == null ? void 0 : B.call(a, {
        model: r,
        textColorClasses: s,
        textColorStyles: u,
        backgroundColorClasses: c,
        backgroundColorStyles: d,
        inputNode: T,
        icon: o.value,
        props: {
          onFocus: y,
          onBlur: x,
          id: b.value
        }
      })) ?? I(de, null, [o.value && C(Ve, {
        key: "icon",
        icon: o.value
      }, null), T])]), [[Tt, !e.disabled && !e.readonly && e.ripple, null, {
        center: !0,
        circle: !0
      }]])]), P && C(zr, {
        for: b.value,
        onClick: p
      }, {
        default: () => [P]
      })]);
    }), {
      isFocused: g,
      input: w
    };
  }
}), qr = O({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: se,
    default: "$checkboxIndeterminate"
  },
  ...Xr({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), Lt = U()({
  name: "VCheckboxBtn",
  props: qr(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:indeterminate": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = fe(e, "indeterminate"), l = fe(e, "modelValue");
    function i(s) {
      a.value && (a.value = !1);
    }
    const o = E(() => a.value ? e.indeterminateIcon : e.falseIcon), r = E(() => a.value ? e.indeterminateIcon : e.trueIcon);
    return J(() => {
      const s = _e(ao.filterProps(e), ["modelValue"]);
      return C(ao, j(s, {
        modelValue: l.value,
        "onUpdate:modelValue": [(u) => l.value = u, i],
        class: ["v-checkbox-btn", e.class],
        style: e.style,
        type: "checkbox",
        falseIcon: o.value,
        trueIcon: r.value,
        "aria-checked": a.value ? "mixed" : void 0
      }), n);
    }), {};
  }
}), Ov = O({
  ...Oa(),
  ..._e(qr(), ["inline"])
}, "VCheckbox"), Sg = U()({
  name: "VCheckbox",
  inheritAttrs: !1,
  props: Ov(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:focused": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const l = fe(e, "modelValue"), {
      isFocused: i,
      focus: o,
      blur: r
    } = Fa(e), s = K(), u = ht();
    return J(() => {
      const [c, d] = wa(n), f = cn.filterProps(e), v = Lt.filterProps(e);
      return C(cn, j({
        ref: s,
        class: ["v-checkbox", e.class]
      }, c, f, {
        modelValue: l.value,
        "onUpdate:modelValue": (g) => l.value = g,
        id: e.id || `checkbox-${u}`,
        focused: i.value,
        style: e.style
      }), {
        ...a,
        default: (g) => {
          let {
            id: m,
            messagesId: w,
            isDisabled: b,
            isReadonly: h,
            isValid: y
          } = g;
          return C(Lt, j(v, {
            id: m.value,
            "aria-describedby": w.value,
            disabled: b.value,
            readonly: h.value
          }, d, {
            error: y.value === !1,
            modelValue: l.value,
            "onUpdate:modelValue": (x) => l.value = x,
            onFocus: o,
            onBlur: r
          }), a);
        }
      });
    }), Vt({}, s);
  }
});
function Lv(e) {
  let {
    selectedElement: t,
    containerElement: n,
    isRtl: a,
    isHorizontal: l
  } = e;
  const i = En(l, n), o = Zr(l, a, n), r = En(l, t), s = Qr(l, t), u = r * 0.4;
  return o > s ? s - u : o + i < s + r ? s - i + r + u : o;
}
function Mv(e) {
  let {
    selectedElement: t,
    containerElement: n,
    isHorizontal: a
  } = e;
  const l = En(a, n), i = Qr(a, t), o = En(a, t);
  return i - l / 2 + o / 2;
}
function lo(e, t) {
  const n = e ? "scrollWidth" : "scrollHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function $v(e, t) {
  const n = e ? "clientWidth" : "clientHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function Zr(e, t, n) {
  if (!n)
    return 0;
  const {
    scrollLeft: a,
    offsetWidth: l,
    scrollWidth: i
  } = n;
  return e ? t ? i - l + a : a : n.scrollTop;
}
function En(e, t) {
  const n = e ? "offsetWidth" : "offsetHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function Qr(e, t) {
  const n = e ? "offsetLeft" : "offsetTop";
  return (t == null ? void 0 : t[n]) || 0;
}
const Nl = Symbol.for("vuetify:v-slide-group"), Hl = O({
  centerActive: Boolean,
  scrollToActive: {
    type: Boolean,
    default: !0
  },
  contentClass: null,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: Nl
  },
  nextIcon: {
    type: se,
    default: "$next"
  },
  prevIcon: {
    type: se,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["always", "desktop", "mobile", "never"].includes(e)
  },
  ...re(),
  ...Fn({
    mobile: null
  }),
  ...he(),
  ...Bl({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), da = U()({
  name: "VSlideGroup",
  props: Hl(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isRtl: a
    } = tt(), {
      displayClasses: l,
      mobile: i
    } = Et(e), o = Ta(e, e.symbol), r = G(!1), s = G(0), u = G(0), c = G(0), d = V(() => e.direction === "horizontal"), {
      resizeRef: f,
      contentRect: v
    } = Ft(), {
      resizeRef: g,
      contentRect: m
    } = Ft(), w = rd(), b = V(() => ({
      container: f.el,
      duration: 200,
      easing: "easeOutQuart"
    })), h = V(() => o.selected.value.length ? o.items.value.findIndex((M) => M.id === o.selected.value[0]) : -1), y = V(() => o.selected.value.length ? o.items.value.findIndex((M) => M.id === o.selected.value[o.selected.value.length - 1]) : -1);
    if (ye) {
      let M = -1;
      q(() => [o.selected.value, v.value, m.value, d.value], () => {
        cancelAnimationFrame(M), M = requestAnimationFrame(() => {
          if (v.value && m.value) {
            const N = d.value ? "width" : "height";
            u.value = v.value[N], c.value = m.value[N], r.value = u.value + 1 < c.value;
          }
          if (e.scrollToActive && h.value >= 0 && g.el) {
            const N = g.el.children[y.value];
            p(N, e.centerActive);
          }
        });
      });
    }
    const x = G(!1);
    function p(M, N) {
      let te = 0;
      N ? te = Mv({
        containerElement: f.el,
        isHorizontal: d.value,
        selectedElement: M
      }) : te = Lv({
        containerElement: f.el,
        isHorizontal: d.value,
        isRtl: a.value,
        selectedElement: M
      }), k(te);
    }
    function k(M) {
      if (!ye || !f.el) return;
      const N = En(d.value, f.el), te = Zr(d.value, a.value, f.el);
      if (!(lo(d.value, f.el) <= N || // Prevent scrolling by only a couple of pixels, which doesn't look smooth
      Math.abs(M - te) < 16)) {
        if (d.value && a.value && f.el) {
          const {
            scrollWidth: ae,
            offsetWidth: R
          } = f.el;
          M = ae - R - M;
        }
        d.value ? w.horizontal(M, b.value) : w(M, b.value);
      }
    }
    function P(M) {
      const {
        scrollTop: N,
        scrollLeft: te
      } = M.target;
      s.value = d.value ? te : N;
    }
    function S(M) {
      if (x.value = !0, !(!r.value || !g.el)) {
        for (const N of M.composedPath())
          for (const te of g.el.children)
            if (te === N) {
              p(te);
              return;
            }
      }
    }
    function A(M) {
      x.value = !1;
    }
    let T = !1;
    function _(M) {
      var N;
      !T && !x.value && !(M.relatedTarget && ((N = g.el) != null && N.contains(M.relatedTarget))) && L(), T = !1;
    }
    function B() {
      T = !0;
    }
    function F(M) {
      if (!g.el) return;
      function N(te) {
        M.preventDefault(), L(te);
      }
      d.value ? M.key === "ArrowRight" ? N(a.value ? "prev" : "next") : M.key === "ArrowLeft" && N(a.value ? "next" : "prev") : M.key === "ArrowDown" ? N("next") : M.key === "ArrowUp" && N("prev"), M.key === "Home" ? N("first") : M.key === "End" && N("last");
    }
    function D(M, N) {
      if (!M) return;
      let te = M;
      do
        te = te == null ? void 0 : te[N === "next" ? "nextElementSibling" : "previousElementSibling"];
      while (te != null && te.hasAttribute("disabled"));
      return te;
    }
    function L(M) {
      if (!g.el) return;
      let N;
      if (!M)
        N = Nt(g.el)[0];
      else if (M === "next") {
        if (N = D(g.el.querySelector(":focus"), M), !N) return L("first");
      } else if (M === "prev") {
        if (N = D(g.el.querySelector(":focus"), M), !N) return L("last");
      } else M === "first" ? (N = g.el.firstElementChild, N != null && N.hasAttribute("disabled") && (N = D(N, "next"))) : M === "last" && (N = g.el.lastElementChild, N != null && N.hasAttribute("disabled") && (N = D(N, "prev")));
      N && N.focus({
        preventScroll: !0
      });
    }
    function Y(M) {
      const N = d.value && a.value ? -1 : 1, te = (M === "prev" ? -N : N) * u.value;
      let W = s.value + te;
      if (d.value && a.value && f.el) {
        const {
          scrollWidth: ae,
          offsetWidth: R
        } = f.el;
        W += ae - R;
      }
      k(W);
    }
    const z = V(() => ({
      next: o.next,
      prev: o.prev,
      select: o.select,
      isSelected: o.isSelected
    })), ee = V(() => r.value || Math.abs(s.value) > 0), ie = V(() => {
      switch (e.showArrows) {
        case "never":
          return !1;
        case "always":
          return !0;
        case "desktop":
          return !i.value;
        case !0:
          return ee.value;
        case "mobile":
          return i.value || ee.value;
        default:
          return !i.value && ee.value;
      }
    }), $ = V(() => Math.abs(s.value) > 1), Z = V(() => {
      if (!f.value || !ee.value) return !1;
      const M = lo(d.value, f.el), N = $v(d.value, f.el);
      return M - N - Math.abs(s.value) > 1;
    });
    return J(() => C(e.tag, {
      class: Q(["v-slide-group", {
        "v-slide-group--vertical": !d.value,
        "v-slide-group--has-affixes": ie.value,
        "v-slide-group--is-overflowing": r.value
      }, l.value, e.class]),
      style: oe(e.style),
      tabindex: x.value || o.selected.value.length ? -1 : 0,
      onFocus: _
    }, {
      default: () => {
        var M, N, te;
        return [ie.value && I("div", {
          key: "prev",
          class: Q(["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !$.value
          }]),
          onMousedown: B,
          onClick: () => $.value && Y("prev")
        }, [((M = n.prev) == null ? void 0 : M.call(n, z.value)) ?? C(Mi, null, {
          default: () => [C(Ve, {
            icon: a.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), I("div", {
          key: "container",
          ref: f,
          class: Q(["v-slide-group__container", e.contentClass]),
          onScroll: P
        }, [I("div", {
          ref: g,
          class: "v-slide-group__content",
          onFocusin: S,
          onFocusout: A,
          onKeydown: F
        }, [(N = n.default) == null ? void 0 : N.call(n, z.value)])]), ie.value && I("div", {
          key: "next",
          class: Q(["v-slide-group__next", {
            "v-slide-group__next--disabled": !Z.value
          }]),
          onMousedown: B,
          onClick: () => Z.value && Y("next")
        }, [((te = n.next) == null ? void 0 : te.call(n, z.value)) ?? C(Mi, null, {
          default: () => [C(Ve, {
            icon: a.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: o.selected,
      scrollTo: Y,
      scrollOffset: s,
      focus: L,
      hasPrev: $,
      hasNext: Z
    };
  }
}), Jr = Symbol.for("vuetify:v-chip-group"), Rv = O({
  baseColor: String,
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: Ke
  },
  ...Hl({
    scrollToActive: !1
  }),
  ...re(),
  ...Bl({
    selectedClass: "v-chip--selected"
  }),
  ...he(),
  ...Ce(),
  ...St({
    variant: "tonal"
  })
}, "VChipGroup");
U()({
  name: "VChipGroup",
  props: Rv(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = Ae(e), {
      isSelected: l,
      select: i,
      next: o,
      prev: r,
      selected: s
    } = Ta(e, Jr);
    return ot({
      VChip: {
        baseColor: E(() => e.baseColor),
        color: E(() => e.color),
        disabled: E(() => e.disabled),
        filter: E(() => e.filter),
        variant: E(() => e.variant)
      }
    }), J(() => {
      const u = da.filterProps(e);
      return C(da, j(u, {
        class: ["v-chip-group", {
          "v-chip-group--column": e.column
        }, a.value, e.class],
        style: e.style
      }), {
        default: () => {
          var c;
          return [(c = n.default) == null ? void 0 : c.call(n, {
            isSelected: l,
            select: i,
            next: o,
            prev: r,
            selected: s.value
          })];
        }
      });
    }), {};
  }
});
const Nv = O({
  activeClass: String,
  appendAvatar: String,
  appendIcon: se,
  baseColor: String,
  closable: Boolean,
  closeIcon: {
    type: se,
    default: "$delete"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: se,
    default: "$complete"
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: void 0
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: se,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: {
    type: [String, Number, Boolean],
    default: void 0
  },
  modelValue: {
    type: Boolean,
    default: !0
  },
  onClick: He(),
  onClickOnce: He(),
  ...bt(),
  ...re(),
  ...We(),
  ...wt(),
  ...Aa(),
  ...Ue(),
  ...Ia(),
  ...vn(),
  ...he({
    tag: "span"
  }),
  ...Ce(),
  ...St({
    variant: "tonal"
  })
}, "VChip"), _n = U()({
  name: "VChip",
  directives: {
    vRipple: Tt
  },
  props: Nv(),
  emits: {
    "click:close": (e) => !0,
    "update:modelValue": (e) => !0,
    "group:selected": (e) => !0,
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: a,
      slots: l
    } = t;
    const {
      t: i
    } = yt(), {
      borderClasses: o
    } = Ct(e), {
      densityClasses: r
    } = mt(e), {
      elevationClasses: s
    } = pt(e), {
      roundedClasses: u
    } = qe(e), {
      sizeClasses: c
    } = Mn(e), {
      themeClasses: d
    } = Ae(e), f = fe(e, "modelValue"), v = Tn(e, Jr, !1), g = Tn(e, Nl, !1), m = Pa(e, n), w = E(() => e.link !== !1 && m.isLink.value), b = V(() => !e.disabled && e.link !== !1 && (!!v || e.link || m.isClickable.value)), h = E(() => ({
      "aria-label": i(e.closeLabel),
      disabled: e.disabled,
      onClick(S) {
        S.preventDefault(), S.stopPropagation(), f.value = !1, a("click:close", S);
      }
    }));
    q(f, (S) => {
      S ? (v == null || v.register(), g == null || g.register()) : (v == null || v.unregister(), g == null || g.unregister());
    });
    const {
      colorClasses: y,
      colorStyles: x,
      variantClasses: p
    } = Kt(() => ({
      color: !v || v.isSelected.value ? e.color ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    function k(S) {
      var A;
      a("click", S), b.value && ((A = m.navigate) == null || A.call(m, S), v == null || v.toggle());
    }
    function P(S) {
      (S.key === "Enter" || S.key === " ") && (S.preventDefault(), k(S));
    }
    return () => {
      var L;
      const S = m.isLink.value ? "a" : e.tag, A = !!(e.appendIcon || e.appendAvatar), T = !!(A || l.append), _ = !!(l.close || e.closable), B = !!(l.filter || e.filter) && v, F = !!(e.prependIcon || e.prependAvatar), D = !!(F || l.prepend);
      return f.value && ze(C(S, j(m.linkProps, {
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": b.value,
          "v-chip--filter": B,
          "v-chip--pill": e.pill,
          [`${e.activeClass}`]: e.activeClass && ((L = m.isActive) == null ? void 0 : L.value)
        }, d.value, o.value, y.value, r.value, s.value, u.value, c.value, p.value, v == null ? void 0 : v.selectedClass.value, e.class],
        style: [x.value, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        tabindex: b.value ? 0 : void 0,
        onClick: k,
        onKeydown: b.value && !w.value && P
      }), {
        default: () => {
          var Y;
          return [Ut(b.value, "v-chip"), B && C(Yo, {
            key: "filter"
          }, {
            default: () => [ze(I("div", {
              class: "v-chip__filter"
            }, [l.filter ? C(ke, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, l.filter) : C(Ve, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[Yt, v.isSelected.value]])]
          }), D && I("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [l.prepend ? C(ke, {
            key: "prepend-defaults",
            disabled: !F,
            defaults: {
              VAvatar: {
                image: e.prependAvatar,
                start: !0
              },
              VIcon: {
                icon: e.prependIcon,
                start: !0
              }
            }
          }, l.prepend) : I(de, null, [e.prependIcon && C(Ve, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && C(Ot, {
            key: "prepend-avatar",
            image: e.prependAvatar,
            start: !0
          }, null)])]), I("div", {
            class: "v-chip__content",
            "data-no-activator": ""
          }, [((Y = l.default) == null ? void 0 : Y.call(l, {
            isSelected: v == null ? void 0 : v.isSelected.value,
            selectedClass: v == null ? void 0 : v.selectedClass.value,
            select: v == null ? void 0 : v.select,
            toggle: v == null ? void 0 : v.toggle,
            value: v == null ? void 0 : v.value.value,
            disabled: e.disabled
          })) ?? zt(e.text)]), T && I("div", {
            key: "append",
            class: "v-chip__append"
          }, [l.append ? C(ke, {
            key: "append-defaults",
            disabled: !A,
            defaults: {
              VAvatar: {
                end: !0,
                image: e.appendAvatar
              },
              VIcon: {
                end: !0,
                icon: e.appendIcon
              }
            }
          }, l.append) : I(de, null, [e.appendIcon && C(Ve, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && C(Ot, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), _ && I("button", j({
            key: "close",
            class: "v-chip__close",
            type: "button",
            "data-testid": "close-chip"
          }, h.value), [l.close ? C(ke, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, l.close) : C(Ve, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[Tt, b.value && e.ripple, null]]);
    };
  }
}), Hv = O({
  renderless: Boolean,
  ...re()
}, "VVirtualScrollItem"), zv = U()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: Hv(),
  emits: {
    "update:height": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: a,
      slots: l
    } = t;
    const {
      resizeRef: i,
      contentRect: o
    } = Ft(void 0, "border");
    q(() => {
      var r;
      return (r = o.value) == null ? void 0 : r.height;
    }, (r) => {
      r != null && a("update:height", r);
    }), J(() => {
      var r, s;
      return e.renderless ? I(de, null, [(r = l.default) == null ? void 0 : r.call(l, {
        itemRef: i
      })]) : I("div", j({
        ref: i,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, n), [(s = l.default) == null ? void 0 : s.call(l)]);
    });
  }
}), Wv = -1, jv = 1, Xa = 100, Gv = O({
  itemHeight: {
    type: [Number, String],
    default: null
  },
  itemKey: {
    type: [String, Array, Function],
    default: null
  },
  height: [Number, String]
}, "virtual");
function Yv(e, t) {
  const n = Et(), a = G(0);
  Le(() => {
    a.value = parseFloat(e.itemHeight || 0);
  });
  const l = G(0), i = G(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || n.height.value) / (a.value || 16)
  ) || 1), o = G(0), r = G(0), s = K(), u = K();
  let c = 0;
  const {
    resizeRef: d,
    contentRect: f
  } = Ft();
  Le(() => {
    d.value = s.value;
  });
  const v = V(() => {
    var $;
    return s.value === document.documentElement ? n.height.value : (($ = f.value) == null ? void 0 : $.height) || parseInt(e.height) || 0;
  }), g = V(() => !!(s.value && u.value && v.value && a.value));
  let m = Array.from({
    length: t.value.length
  }), w = Array.from({
    length: t.value.length
  });
  const b = G(0);
  let h = -1;
  function y($) {
    return m[$] || a.value;
  }
  const x = Su(() => {
    const $ = performance.now();
    w[0] = 0;
    const Z = t.value.length;
    for (let M = 1; M <= Z; M++)
      w[M] = (w[M - 1] || 0) + y(M - 1);
    b.value = Math.max(b.value, performance.now() - $);
  }, b), p = q(g, ($) => {
    $ && (p(), c = u.value.offsetTop, x.immediate(), Y(), ~h && me(() => {
      ye && window.requestAnimationFrame(() => {
        ee(h), h = -1;
      });
    }));
  });
  De(() => {
    x.clear();
  });
  function k($, Z) {
    const M = m[$], N = a.value;
    a.value = N ? Math.min(a.value, Z) : Z, (M !== Z || N !== a.value) && (m[$] = Z, x());
  }
  function P($) {
    $ = $e($, 0, t.value.length);
    const Z = Math.floor($), M = $ % 1, N = Z + 1, te = w[Z] || 0, W = w[N] || te;
    return te + (W - te) * M;
  }
  function S($) {
    return Uv(w, $);
  }
  let A = 0, T = 0, _ = 0;
  q(v, ($, Z) => {
    Y(), $ < Z && requestAnimationFrame(() => {
      T = 0, Y();
    });
  });
  let B = -1;
  function F() {
    if (!s.value || !u.value) return;
    const $ = s.value.scrollTop, Z = performance.now();
    Z - _ > 500 ? (T = Math.sign($ - A), c = u.value.offsetTop) : T = $ - A, A = $, _ = Z, window.clearTimeout(B), B = window.setTimeout(D, 500), Y();
  }
  function D() {
    !s.value || !u.value || (T = 0, _ = 0, window.clearTimeout(B), Y());
  }
  let L = -1;
  function Y() {
    cancelAnimationFrame(L), L = requestAnimationFrame(z);
  }
  function z() {
    if (!s.value || !v.value || !a.value) return;
    const $ = A - c, Z = Math.sign(T), M = Math.max(0, $ - Xa), N = $e(S(M), 0, t.value.length), te = $ + v.value + Xa, W = $e(S(te) + 1, N + 1, t.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (Z !== Wv || N < l.value) && (Z !== jv || W > i.value)
    ) {
      const ae = P(l.value) - P(N), R = P(W) - P(i.value);
      Math.max(ae, R) > Xa ? (l.value = N, i.value = W) : (N <= 0 && (l.value = N), W >= t.value.length && (i.value = W));
    }
    o.value = P(l.value), r.value = P(t.value.length) - P(i.value);
  }
  function ee($) {
    const Z = P($);
    !s.value || $ && !Z ? h = $ : s.value.scrollTop = Z;
  }
  const ie = V(() => t.value.slice(l.value, i.value).map(($, Z) => {
    const M = Z + l.value;
    return {
      raw: $,
      index: M,
      key: Ge($, e.itemKey, M)
    };
  }));
  return q(t, () => {
    m = Array.from({
      length: t.value.length
    }), w = Array.from({
      length: t.value.length
    }), x.immediate(), Y();
  }, {
    deep: 1
  }), {
    calculateVisibleItems: Y,
    containerRef: s,
    markerRef: u,
    computedItems: ie,
    paddingTop: o,
    paddingBottom: r,
    scrollToIndex: ee,
    handleScroll: F,
    handleScrollend: D,
    handleItemResize: k
  };
}
function Uv(e, t) {
  let n = e.length - 1, a = 0, l = 0, i = null, o = -1;
  if (e[n] < t)
    return n;
  for (; a <= n; )
    if (l = a + n >> 1, i = e[l], i > t)
      n = l - 1;
    else if (i < t)
      o = l, a = l + 1;
    else return i === t ? l : a;
  return o;
}
const Kv = O({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...Gv(),
  ...re(),
  ...ft()
}, "VVirtualScroll"), es = U()({
  name: "VVirtualScroll",
  props: Kv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = Ie("VVirtualScroll"), {
      dimensionStyles: l
    } = vt(e), {
      calculateVisibleItems: i,
      containerRef: o,
      markerRef: r,
      handleScroll: s,
      handleScrollend: u,
      handleItemResize: c,
      scrollToIndex: d,
      paddingTop: f,
      paddingBottom: v,
      computedItems: g
    } = Yv(e, E(() => e.items));
    return Je(() => e.renderless, () => {
      function m() {
        var h, y;
        const b = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        o.value === document.documentElement ? (document[b]("scroll", s, {
          passive: !0
        }), document[b]("scrollend", u)) : ((h = o.value) == null || h[b]("scroll", s, {
          passive: !0
        }), (y = o.value) == null || y[b]("scrollend", u));
      }
      gt(() => {
        o.value = kl(a.vnode.el, !0), m(!0);
      }), De(m);
    }), J(() => {
      const m = g.value.map((w) => C(zv, {
        key: w.key,
        renderless: e.renderless,
        "onUpdate:height": (b) => c(w.index, b)
      }, {
        default: (b) => {
          var h;
          return (h = n.default) == null ? void 0 : h.call(n, {
            item: w.raw,
            index: w.index,
            ...b
          });
        }
      }));
      return e.renderless ? I(de, null, [I("div", {
        ref: r,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: X(f.value)
        }
      }, null), m, I("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: X(v.value)
        }
      }, null)]) : I("div", {
        ref: o,
        class: Q(["v-virtual-scroll", e.class]),
        onScrollPassive: s,
        onScrollend: u,
        style: oe([l.value, e.style])
      }, [I("div", {
        ref: r,
        class: "v-virtual-scroll__container",
        style: {
          paddingTop: X(f.value),
          paddingBottom: X(v.value)
        }
      }, [m])]);
    }), {
      calculateVisibleItems: i,
      scrollToIndex: d
    };
  }
});
function ts(e, t) {
  const n = G(!1);
  let a;
  function l(r) {
    cancelAnimationFrame(a), n.value = !0, a = requestAnimationFrame(() => {
      a = requestAnimationFrame(() => {
        n.value = !1;
      });
    });
  }
  async function i() {
    await new Promise((r) => requestAnimationFrame(r)), await new Promise((r) => requestAnimationFrame(r)), await new Promise((r) => requestAnimationFrame(r)), await new Promise((r) => {
      if (n.value) {
        const s = q(n, () => {
          s(), r();
        });
      } else r();
    });
  }
  async function o(r) {
    var c, d;
    if (r.key === "Tab" && ((c = t.value) == null || c.focus()), !["PageDown", "PageUp", "Home", "End"].includes(r.key)) return;
    const s = (d = e.value) == null ? void 0 : d.$el;
    if (!s) return;
    (r.key === "Home" || r.key === "End") && s.scrollTo({
      top: r.key === "Home" ? 0 : s.scrollHeight,
      behavior: "smooth"
    }), await i();
    const u = s.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
    if (r.key === "PageDown" || r.key === "Home") {
      const f = s.getBoundingClientRect().top;
      for (const v of u)
        if (v.getBoundingClientRect().top >= f) {
          v.focus();
          break;
        }
    } else {
      const f = s.getBoundingClientRect().bottom;
      for (const v of [...u].reverse())
        if (v.getBoundingClientRect().bottom <= f) {
          v.focus();
          break;
        }
    }
  }
  return {
    onScrollPassive: l,
    onKeydown: o
  };
}
const Xv = O({
  closeText: {
    type: String,
    default: "$vuetify.close"
  },
  openText: {
    type: String,
    default: "$vuetify.open"
  }
}, "autocomplete");
function ns(e, t) {
  const n = ht(), a = V(() => `menu-${n}`), l = E(() => Oe(t)), i = E(() => a.value);
  return {
    menuId: a,
    ariaExpanded: l,
    ariaControls: i
  };
}
const as = O({
  chips: Boolean,
  closableChips: Boolean,
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  listProps: {
    type: Object
  },
  menu: Boolean,
  menuIcon: {
    type: se,
    default: "$dropdown"
  },
  menuProps: {
    type: Object
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  openOnClear: Boolean,
  itemColor: String,
  noAutoScroll: Boolean,
  ...Xv(),
  ...fr({
    itemChildren: !1
  })
}, "Select"), qv = O({
  ...as(),
  ..._e(Rl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty"]),
  ...Ln({
    transition: {
      component: Il
    }
  })
}, "VSelect"), ls = U()({
  name: "VSelect",
  props: qv(),
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:menu": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      t: a
    } = yt(), l = K(), i = K(), o = K(), {
      items: r,
      transformIn: s,
      transformOut: u
    } = mr(e), c = fe(e, "modelValue", [], (W) => s(W === null ? [null] : Me(W)), (W) => {
      const ae = u(W);
      return e.multiple ? ae : ae[0] ?? null;
    }), d = V(() => typeof e.counterValue == "function" ? e.counterValue(c.value) : typeof e.counterValue == "number" ? e.counterValue : c.value.length), f = Ml(e), v = $l(e), g = V(() => c.value.map((W) => W.value)), m = G(!1), w = E(() => e.closableChips && !f.isReadonly.value && !f.isDisabled.value), {
      InputIcon: b
    } = Da(e);
    let h = "", y = 0, x;
    const p = V(() => e.hideSelected ? r.value.filter((W) => !c.value.some((ae) => (e.valueComparator || Ke)(ae, W))) : r.value), k = V(() => e.hideNoData && !p.value.length || f.isReadonly.value || f.isDisabled.value), P = fe(e, "menu"), S = V({
      get: () => P.value,
      set: (W) => {
        var ae;
        P.value && !W && ((ae = i.value) != null && ae.ΨopenChildren.size) || W && k.value || (P.value = W);
      }
    }), {
      menuId: A,
      ariaExpanded: T,
      ariaControls: _
    } = ns(e, S), B = V(() => {
      var W;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((W = e.menuProps) == null ? void 0 : W.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), F = K(), D = ts(F, l);
    function L(W) {
      e.openOnClear && (S.value = !0);
    }
    function Y() {
      k.value || (S.value = !S.value);
    }
    function z(W) {
      ea(W) && ee(W);
    }
    function ee(W) {
      var Te, be, H;
      if (!W.key || f.isReadonly.value) return;
      if (["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(W.key) && W.preventDefault(), ["Enter", "ArrowDown", " "].includes(W.key) && (S.value = !0), ["Escape", "Tab"].includes(W.key) && (S.value = !1), e.clearable && W.key === "Backspace") {
        W.preventDefault(), c.value = [], L();
        return;
      }
      W.key === "Home" ? (Te = F.value) == null || Te.focus("first") : W.key === "End" && ((be = F.value) == null || be.focus("last"));
      const ae = 1e3;
      if (!ea(W)) return;
      const R = performance.now();
      R - x > ae && (h = "", y = 0), h += W.key.toLowerCase(), x = R;
      const le = p.value;
      function ve() {
        let ne = Se();
        return ne || h.at(-1) === h.at(-2) && (h = h.slice(0, -1), y++, ne = Se(), ne) || (y = 0, ne = Se(), ne) ? ne : (h = W.key.toLowerCase(), Se());
      }
      function Se() {
        for (let ne = y; ne < le.length; ne++) {
          const ce = le[ne];
          if (ce.title.toLowerCase().startsWith(h))
            return [ce, ne];
        }
      }
      const Fe = ve();
      if (!Fe) return;
      const [ue, Be] = Fe;
      y = Be, (H = F.value) == null || H.focus(Be), e.multiple || (c.value = [ue]);
    }
    function ie(W) {
      let ae = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!W.props.disabled)
        if (e.multiple) {
          const R = c.value.findIndex((ve) => (e.valueComparator || Ke)(ve.value, W.value)), le = ae ?? !~R;
          if (~R) {
            const ve = le ? [...c.value, W] : [...c.value];
            ve.splice(R, 1), c.value = ve;
          } else le && (c.value = [...c.value, W]);
        } else {
          const R = ae !== !1;
          c.value = R ? [W] : [], me(() => {
            S.value = !1;
          });
        }
    }
    function $(W) {
      var ae;
      (ae = F.value) != null && ae.$el.contains(W.relatedTarget) || (S.value = !1);
    }
    function Z() {
      var W;
      e.eager && ((W = o.value) == null || W.calculateVisibleItems());
    }
    function M() {
      var W;
      m.value && ((W = l.value) == null || W.focus());
    }
    function N(W) {
      m.value = !0;
    }
    function te(W) {
      if (W == null) c.value = [];
      else if (an(l.value, ":autofill") || an(l.value, ":-webkit-autofill")) {
        const ae = r.value.find((R) => R.title === W);
        ae && ie(ae);
      } else l.value && (l.value.value = "");
    }
    return q(S, () => {
      if (!e.hideSelected && S.value && c.value.length) {
        const W = p.value.findIndex((ae) => c.value.some((R) => (e.valueComparator || Ke)(R.value, ae.value)));
        ye && !e.noAutoScroll && window.requestAnimationFrame(() => {
          var ae;
          W >= 0 && ((ae = o.value) == null || ae.scrollToIndex(W));
        });
      }
    }), q(r, (W, ae) => {
      S.value || m.value && e.hideNoData && !ae.length && W.length && (S.value = !0);
    }), J(() => {
      const W = !!(e.chips || n.chip), ae = !!(!e.hideNoData || p.value.length || n["prepend-item"] || n["append-item"] || n["no-data"]), R = c.value.length > 0, le = ca.filterProps(e), ve = R || !m.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return C(ca, j({
        ref: l
      }, le, {
        modelValue: c.value.map((Se) => Se.props.title).join(", "),
        name: void 0,
        "onUpdate:modelValue": te,
        focused: m.value,
        "onUpdate:focused": (Se) => m.value = Se,
        validationValue: c.externalValue,
        counterValue: d.value,
        dirty: R,
        class: ["v-select", {
          "v-select--active-menu": S.value,
          "v-select--chips": !!e.chips,
          [`v-select--${e.multiple ? "multiple" : "single"}`]: !0,
          "v-select--selected": c.value.length,
          "v-select--selection-slot": !!n.selection
        }, e.class],
        style: e.style,
        inputmode: "none",
        placeholder: ve,
        "onClick:clear": L,
        "onMousedown:control": Y,
        onBlur: $,
        onKeydown: ee,
        "aria-expanded": T.value,
        "aria-controls": _.value
      }), {
        ...n,
        default: (Se) => {
          let {
            id: Fe
          } = Se;
          return I(de, null, [I("select", {
            hidden: !0,
            multiple: e.multiple,
            name: v.fieldName.value
          }, [r.value.map((ue) => I("option", {
            key: ue.value,
            value: ue.value,
            selected: g.value.includes(ue.value)
          }, null))]), C(Lr, j({
            id: A.value,
            ref: i,
            modelValue: S.value,
            "onUpdate:modelValue": (ue) => S.value = ue,
            activator: "parent",
            contentClass: "v-select__content",
            disabled: k.value,
            eager: e.eager,
            maxHeight: 310,
            openOnClick: !1,
            closeOnContentClick: !1,
            transition: e.transition,
            onAfterEnter: Z,
            onAfterLeave: M
          }, B.value), {
            default: () => [ae && C(hr, j({
              ref: F,
              selected: g.value,
              selectStrategy: e.multiple ? "independent" : "single-independent",
              onMousedown: (ue) => ue.preventDefault(),
              onKeydown: z,
              onFocusin: N,
              tabindex: "-1",
              selectable: !0,
              "aria-live": "polite",
              "aria-labelledby": `${Fe.value}-label`,
              "aria-multiselectable": e.multiple,
              color: e.itemColor ?? e.color
            }, D, e.listProps), {
              default: () => {
                var ue, Be, Te;
                return [(ue = n["prepend-item"]) == null ? void 0 : ue.call(n), !p.value.length && !e.hideNoData && (((Be = n["no-data"]) == null ? void 0 : Be.call(n)) ?? C(sn, {
                  key: "no-data",
                  title: a(e.noDataText)
                }, null)), C(es, {
                  ref: o,
                  renderless: !0,
                  items: p.value,
                  itemKey: "value"
                }, {
                  default: (be) => {
                    var xe, Re, Ze;
                    let {
                      item: H,
                      index: ne,
                      itemRef: ce
                    } = be;
                    const Ee = pu(H.props), je = j(H.props, {
                      ref: ce,
                      key: H.value,
                      onClick: () => ie(H, null),
                      "aria-posinset": ne + 1,
                      "aria-setsize": p.value.length
                    });
                    return H.type === "divider" ? ((xe = n.divider) == null ? void 0 : xe.call(n, {
                      props: H.raw,
                      index: ne
                    })) ?? C($n, j(H.props, {
                      key: `divider-${ne}`
                    }), null) : H.type === "subheader" ? ((Re = n.subheader) == null ? void 0 : Re.call(n, {
                      props: H.raw,
                      index: ne
                    })) ?? C(_l, j(H.props, {
                      key: `subheader-${ne}`
                    }), null) : ((Ze = n.item) == null ? void 0 : Ze.call(n, {
                      item: H,
                      index: ne,
                      props: je
                    })) ?? C(sn, j(je, {
                      role: "option"
                    }), {
                      prepend: (Ne) => {
                        let {
                          isSelected: we
                        } = Ne;
                        return I(de, null, [e.multiple && !e.hideSelected ? C(Lt, {
                          key: H.value,
                          modelValue: we,
                          ripple: !1,
                          tabindex: "-1",
                          "aria-hidden": !0,
                          onClick: (st) => st.preventDefault()
                        }, null) : void 0, Ee.prependAvatar && C(Ot, {
                          image: Ee.prependAvatar
                        }, null), Ee.prependIcon && C(Ve, {
                          icon: Ee.prependIcon
                        }, null)]);
                      }
                    });
                  }
                }), (Te = n["append-item"]) == null ? void 0 : Te.call(n)];
              }
            })]
          }), c.value.map((ue, Be) => {
            function Te(ce) {
              ce.stopPropagation(), ce.preventDefault(), ie(ue, !1);
            }
            const be = j(_n.filterProps(ue.props), {
              "onClick:close": Te,
              onKeydown(ce) {
                ce.key !== "Enter" && ce.key !== " " || (ce.preventDefault(), ce.stopPropagation(), Te(ce));
              },
              onMousedown(ce) {
                ce.preventDefault(), ce.stopPropagation();
              },
              modelValue: !0,
              "onUpdate:modelValue": void 0
            }), H = W ? !!n.chip : !!n.selection, ne = H ? bl(W ? n.chip({
              item: ue,
              index: Be,
              props: be
            }) : n.selection({
              item: ue,
              index: Be
            })) : void 0;
            if (!(H && !ne))
              return I("div", {
                key: ue.value,
                class: "v-select__selection"
              }, [W ? n.chip ? C(ke, {
                key: "chip-defaults",
                defaults: {
                  VChip: {
                    closable: w.value,
                    size: "small",
                    text: ue.title
                  }
                }
              }, {
                default: () => [ne]
              }) : C(_n, j({
                key: "chip",
                closable: w.value,
                size: "small",
                text: ue.title,
                disabled: ue.props.disabled
              }, be), null) : ne ?? I("span", {
                class: "v-select__selection-text"
              }, [ue.title, e.multiple && Be < c.value.length - 1 && I("span", {
                class: "v-select__selection-comma"
              }, [Qn(",")])])]);
          })]);
        },
        "append-inner": function() {
          var Be, Te;
          for (var Se = arguments.length, Fe = new Array(Se), ue = 0; ue < Se; ue++)
            Fe[ue] = arguments[ue];
          return I(de, null, [(Be = n["append-inner"]) == null ? void 0 : Be.call(n, ...Fe), e.menuIcon ? C(Ve, {
            class: "v-select__menu-icon",
            color: (Te = l.value) == null ? void 0 : Te.fieldIconColor,
            icon: e.menuIcon,
            "aria-hidden": !0
          }, null) : void 0, e.appendInnerIcon && C(b, {
            key: "append-icon",
            name: "appendInner",
            color: Fe[0].iconColor.value
          }, null)]);
        }
      });
    }), Vt({
      isFocused: m,
      menu: S,
      select: ie
    }, l);
  }
}), is = O({
  page: {
    type: [Number, String],
    default: 1
  },
  itemsPerPage: {
    type: [Number, String],
    default: 10
  }
}, "DataTable-paginate"), os = Symbol.for("vuetify:data-table-pagination");
function rs(e) {
  const t = fe(e, "page", void 0, (a) => Number(a ?? 1)), n = fe(e, "itemsPerPage", void 0, (a) => Number(a ?? 10));
  return {
    page: t,
    itemsPerPage: n
  };
}
function ss(e) {
  const {
    page: t,
    itemsPerPage: n,
    itemsLength: a
  } = e, l = V(() => n.value === -1 ? 0 : n.value * (t.value - 1)), i = V(() => n.value === -1 ? a.value : Math.min(a.value, l.value + n.value)), o = V(() => n.value === -1 || a.value === 0 ? 1 : Math.ceil(a.value / n.value));
  q([t, o], () => {
    t.value > o.value && (t.value = o.value);
  });
  function r(f) {
    n.value = f, t.value = 1;
  }
  function s() {
    t.value = $e(t.value + 1, 1, o.value);
  }
  function u() {
    t.value = $e(t.value - 1, 1, o.value);
  }
  function c(f) {
    t.value = $e(f, 1, o.value);
  }
  const d = {
    page: t,
    itemsPerPage: n,
    startIndex: l,
    stopIndex: i,
    pageCount: o,
    itemsLength: a,
    nextPage: s,
    prevPage: u,
    setPage: c,
    setItemsPerPage: r
  };
  return Pe(os, d), d;
}
function Zv() {
  const e = ge(os);
  if (!e) throw new Error("Missing pagination!");
  return e;
}
function Qv(e) {
  const t = Ie("usePaginatedItems"), {
    items: n,
    startIndex: a,
    stopIndex: l,
    itemsPerPage: i
  } = e, o = V(() => i.value <= 0 ? n.value : n.value.slice(a.value, l.value));
  return q(o, (r) => {
    t.emit("update:currentItems", r);
  }, {
    immediate: !0
  }), {
    paginatedItems: o
  };
}
const zl = O({
  color: String,
  prevIcon: {
    type: se,
    default: "$prev"
  },
  nextIcon: {
    type: se,
    default: "$next"
  },
  firstIcon: {
    type: se,
    default: "$first"
  },
  lastIcon: {
    type: se,
    default: "$last"
  },
  itemsPerPageText: {
    type: String,
    default: "$vuetify.dataFooter.itemsPerPageText"
  },
  pageText: {
    type: String,
    default: "$vuetify.dataFooter.pageText"
  },
  firstPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.firstPage"
  },
  prevPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.prevPage"
  },
  nextPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.nextPage"
  },
  lastPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.lastPage"
  },
  itemsPerPageOptions: {
    type: Array,
    default: () => [{
      value: 10,
      title: "10"
    }, {
      value: 25,
      title: "25"
    }, {
      value: 50,
      title: "50"
    }, {
      value: 100,
      title: "100"
    }, {
      value: -1,
      title: "$vuetify.dataFooter.itemsPerPageAll"
    }]
  },
  showCurrentPage: Boolean
}, "VDataTableFooter"), fa = U()({
  name: "VDataTableFooter",
  props: zl(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      t: a
    } = yt(), {
      page: l,
      pageCount: i,
      startIndex: o,
      stopIndex: r,
      itemsLength: s,
      itemsPerPage: u,
      setItemsPerPage: c
    } = Zv(), d = V(() => e.itemsPerPageOptions.map((f) => typeof f == "number" ? {
      value: f,
      title: f === -1 ? a("$vuetify.dataFooter.itemsPerPageAll") : String(f)
    } : {
      ...f,
      title: isNaN(Number(f.title)) ? a(f.title) : f.title
    }));
    return J(() => {
      var v;
      const f = no.filterProps(e);
      return I("div", {
        class: "v-data-table-footer"
      }, [(v = n.prepend) == null ? void 0 : v.call(n), I("div", {
        class: "v-data-table-footer__items-per-page"
      }, [I("span", null, [a(e.itemsPerPageText)]), C(ls, {
        items: d.value,
        itemColor: e.color,
        modelValue: u.value,
        "onUpdate:modelValue": (g) => c(Number(g)),
        density: "compact",
        variant: "outlined",
        "aria-label": a(e.itemsPerPageText),
        hideDetails: !0
      }, null)]), I("div", {
        class: "v-data-table-footer__info"
      }, [I("div", null, [a(e.pageText, s.value ? o.value + 1 : 0, r.value, s.value)])]), I("div", {
        class: "v-data-table-footer__pagination"
      }, [C(no, j({
        modelValue: l.value,
        "onUpdate:modelValue": (g) => l.value = g,
        density: "comfortable",
        firstAriaLabel: e.firstPageLabel,
        lastAriaLabel: e.lastPageLabel,
        length: i.value,
        nextAriaLabel: e.nextPageLabel,
        previousAriaLabel: e.prevPageLabel,
        rounded: !0,
        showFirstLastPage: !0,
        totalVisible: e.showCurrentPage ? 1 : 0,
        variant: "plain"
      }, _e(f, ["color"])), null)])]);
    }), {};
  }
}), Bn = tc({
  align: {
    type: String,
    default: "start"
  },
  fixed: {
    type: [Boolean, String],
    default: !1
  },
  fixedOffset: [Number, String],
  fixedEndOffset: [Number, String],
  height: [Number, String],
  lastFixed: Boolean,
  firstFixedEnd: Boolean,
  noPadding: Boolean,
  indent: [Number, String],
  empty: Boolean,
  tag: String,
  width: [Number, String],
  maxWidth: [Number, String],
  nowrap: Boolean
}, (e, t) => {
  let {
    slots: n
  } = t;
  const a = e.tag ?? "td", l = typeof e.fixed == "string" ? e.fixed : e.fixed ? "start" : "none";
  return C(a, {
    class: Q(["v-data-table__td", {
      "v-data-table-column--fixed": l === "start",
      "v-data-table-column--fixed-end": l === "end",
      "v-data-table-column--last-fixed": e.lastFixed,
      "v-data-table-column--first-fixed-end": e.firstFixedEnd,
      "v-data-table-column--no-padding": e.noPadding,
      "v-data-table-column--nowrap": e.nowrap,
      "v-data-table-column--empty": e.empty
    }, `v-data-table-column--align-${e.align}`]),
    style: {
      height: X(e.height),
      width: X(e.width),
      maxWidth: X(e.maxWidth),
      left: l === "start" ? X(e.fixedOffset || null) : void 0,
      right: l === "end" ? X(e.fixedEndOffset || null) : void 0,
      paddingInlineStart: e.indent ? X(e.indent) : void 0
    }
  }, {
    default: () => {
      var i;
      return [(i = n.default) == null ? void 0 : i.call(n)];
    }
  });
}), Jv = O({
  headers: Array
}, "DataTable-header"), us = Symbol.for("vuetify:data-table-headers"), cs = {
  title: "",
  sortable: !1
}, em = {
  ...cs,
  width: 48
};
function tm() {
  const t = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).map((n) => ({
    element: n,
    priority: 0
  }));
  return {
    enqueue: (n, a) => {
      let l = !1;
      for (let i = 0; i < t.length; i++)
        if (t[i].priority > a) {
          t.splice(i, 0, {
            element: n,
            priority: a
          }), l = !0;
          break;
        }
      l || t.push({
        element: n,
        priority: a
      });
    },
    size: () => t.length,
    count: () => {
      let n = 0;
      if (!t.length) return 0;
      const a = Math.floor(t[0].priority);
      for (let l = 0; l < t.length; l++)
        Math.floor(t[l].priority) === a && (n += 1);
      return n;
    },
    dequeue: () => t.shift()
  };
}
function dl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  if (!e.children)
    t.push(e);
  else
    for (const n of e.children)
      dl(n, t);
  return t;
}
function ds(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Set();
  for (const n of e)
    n.key && t.add(n.key), n.children && ds(n.children, t);
  return t;
}
function nm(e) {
  if (e.key) {
    if (e.key === "data-table-group") return cs;
    if (["data-table-expand", "data-table-select"].includes(e.key)) return em;
  }
}
function Wl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return e.children ? Math.max(t, ...e.children.map((n) => Wl(n, t + 1))) : t;
}
function am(e) {
  let t = !1;
  function n(i, o) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "none";
    if (i)
      if (r !== "none" && (i.fixed = r), i.fixed === !0 && (i.fixed = "start"), i.fixed === o)
        if (i.children)
          if (o === "start")
            for (let s = i.children.length - 1; s >= 0; s--)
              n(i.children[s], o, o);
          else
            for (let s = 0; s < i.children.length; s++)
              n(i.children[s], o, o);
        else
          !t && o === "start" ? i.lastFixed = !0 : !t && o === "end" ? i.firstFixedEnd = !0 : isNaN(Number(i.width)) ? nn(`Multiple fixed columns should have a static width (key: ${i.key})`) : i.minWidth = Math.max(Number(i.width) || 0, Number(i.minWidth) || 0), t = !0;
      else if (i.children)
        if (o === "start")
          for (let s = i.children.length - 1; s >= 0; s--)
            n(i.children[s], o);
        else
          for (let s = 0; s < i.children.length; s++)
            n(i.children[s], o);
      else
        t = !1;
  }
  for (let i = e.length - 1; i >= 0; i--)
    n(e[i], "start");
  for (let i = 0; i < e.length; i++)
    n(e[i], "end");
  let a = 0;
  for (let i = 0; i < e.length; i++)
    a = fs(e[i], a);
  let l = 0;
  for (let i = e.length - 1; i >= 0; i--)
    l = vs(e[i], l);
}
function fs(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  if (!e) return t;
  if (e.children) {
    e.fixedOffset = t;
    for (const n of e.children)
      t = fs(n, t);
  } else e.fixed && e.fixed !== "end" && (e.fixedOffset = t, t += parseFloat(e.width || "0") || 0);
  return t;
}
function vs(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  if (!e) return t;
  if (e.children) {
    e.fixedEndOffset = t;
    for (const n of e.children)
      t = vs(n, t);
  } else e.fixed === "end" && (e.fixedEndOffset = t, t += parseFloat(e.width || "0") || 0);
  return t;
}
function lm(e, t) {
  const n = [];
  let a = 0;
  const l = tm(e);
  for (; l.size() > 0; ) {
    let o = l.count();
    const r = [];
    let s = 1;
    for (; o > 0; ) {
      const {
        element: u,
        priority: c
      } = l.dequeue(), d = t - a - Wl(u);
      if (r.push({
        ...u,
        rowspan: d ?? 1,
        colspan: u.children ? dl(u).length : 1
      }), u.children)
        for (const f of u.children) {
          const v = c % 1 + s / Math.pow(10, a + 2);
          l.enqueue(f, a + d + v);
        }
      s += 1, o -= 1;
    }
    a += 1, n.push(r);
  }
  return {
    columns: e.map((o) => dl(o)).flat(),
    headers: n
  };
}
function ms(e) {
  const t = [];
  for (const n of e) {
    const a = {
      ...nm(n),
      ...n
    }, l = a.key ?? (typeof a.value == "string" ? a.value : null), i = a.value ?? l ?? null, o = {
      ...a,
      key: l,
      value: i,
      sortable: a.sortable ?? (a.key != null || !!a.sort),
      children: a.children ? ms(a.children) : void 0
    };
    t.push(o);
  }
  return t;
}
function gs(e, t) {
  const n = K([]), a = K([]), l = K({}), i = K({}), o = K({});
  Le(() => {
    var m, w, b;
    const u = (e.headers || Object.keys(e.items[0] ?? {}).map((h) => ({
      key: h,
      title: dn(h)
    }))).slice(), c = ds(u);
    (m = t == null ? void 0 : t.groupBy) != null && m.value.length && !c.has("data-table-group") && u.unshift({
      key: "data-table-group",
      title: "Group"
    }), (w = t == null ? void 0 : t.showSelect) != null && w.value && !c.has("data-table-select") && u.unshift({
      key: "data-table-select"
    }), (b = t == null ? void 0 : t.showExpand) != null && b.value && !c.has("data-table-expand") && u.push({
      key: "data-table-expand"
    });
    const d = ms(u);
    am(d);
    const f = Math.max(...d.map((h) => Wl(h))) + 1, v = lm(d, f);
    n.value = v.headers, a.value = v.columns;
    const g = v.headers.flat(1);
    for (const h of g)
      h.key && (h.sortable && (h.sort && (l.value[h.key] = h.sort), h.sortRaw && (i.value[h.key] = h.sortRaw)), h.filter && (o.value[h.key] = h.filter));
  });
  const r = {
    headers: n,
    columns: a,
    sortFunctions: l,
    sortRawFunctions: i,
    filterFunctions: o
  };
  return Pe(us, r), r;
}
function La() {
  const e = ge(us);
  if (!e) throw new Error("Missing headers!");
  return e;
}
const im = {
  showSelectAll: !1,
  allSelected: () => [],
  select: (e) => {
    var a;
    let {
      items: t,
      value: n
    } = e;
    return new Set(n ? [(a = t[0]) == null ? void 0 : a.value] : []);
  },
  selectAll: (e) => {
    let {
      selected: t
    } = e;
    return t;
  }
}, hs = {
  showSelectAll: !0,
  allSelected: (e) => {
    let {
      currentPage: t
    } = e;
    return t;
  },
  select: (e) => {
    let {
      items: t,
      value: n,
      selected: a
    } = e;
    for (const l of t)
      n ? a.add(l.value) : a.delete(l.value);
    return a;
  },
  selectAll: (e) => {
    let {
      value: t,
      currentPage: n,
      selected: a
    } = e;
    return hs.select({
      items: n,
      value: t,
      selected: a
    });
  }
}, om = {
  showSelectAll: !0,
  allSelected: (e) => {
    let {
      allItems: t
    } = e;
    return t;
  },
  select: (e) => {
    let {
      items: t,
      value: n,
      selected: a
    } = e;
    for (const l of t)
      n ? a.add(l.value) : a.delete(l.value);
    return a;
  },
  selectAll: (e) => {
    let {
      value: t,
      allItems: n
    } = e;
    return new Set(t ? n.map((a) => a.value) : []);
  }
}, rm = O({
  showSelect: Boolean,
  selectStrategy: {
    type: [String, Object],
    default: "page"
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  valueComparator: Function
}, "DataTable-select"), ys = Symbol.for("vuetify:data-table-selection");
function bs(e, t) {
  let {
    allItems: n,
    currentPage: a
  } = t;
  const l = fe(e, "modelValue", e.modelValue, (h) => {
    const y = e.valueComparator;
    return y ? new Set(Me(h).map((x) => {
      var p;
      return ((p = n.value.find((k) => y(x, k.value))) == null ? void 0 : p.value) ?? x;
    })) : new Set(Me(h).map((x) => {
      var p, k;
      return Dt(x) ? ((p = n.value.find((P) => x === P.value)) == null ? void 0 : p.value) ?? x : ((k = n.value.find((P) => Ke(x, P.value))) == null ? void 0 : k.value) ?? x;
    }));
  }, (h) => [...h.values()]), i = V(() => n.value.filter((h) => h.selectable)), o = V(() => a.value.filter((h) => h.selectable)), r = V(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single":
        return im;
      case "all":
        return om;
      case "page":
      default:
        return hs;
    }
  }), s = G(null);
  function u(h) {
    return Me(h).every((y) => l.value.has(y.value));
  }
  function c(h) {
    return Me(h).some((y) => l.value.has(y.value));
  }
  function d(h, y) {
    const x = r.value.select({
      items: h,
      value: y,
      selected: new Set(l.value)
    });
    l.value = x;
  }
  function f(h, y, x) {
    const p = [];
    if (y = y ?? a.value.findIndex((k) => k.value === h.value), e.selectStrategy !== "single" && (x != null && x.shiftKey) && s.value !== null) {
      const [k, P] = [s.value, y].sort((S, A) => S - A);
      p.push(...a.value.slice(k, P + 1).filter((S) => S.selectable));
    } else
      p.push(h), s.value = y;
    d(p, !u([h]));
  }
  function v(h) {
    const y = r.value.selectAll({
      value: h,
      allItems: i.value,
      currentPage: o.value,
      selected: new Set(l.value)
    });
    l.value = y;
  }
  const g = V(() => l.value.size > 0), m = V(() => {
    const h = r.value.allSelected({
      allItems: i.value,
      currentPage: o.value
    });
    return !!h.length && u(h);
  }), w = E(() => r.value.showSelectAll), b = {
    toggleSelect: f,
    select: d,
    selectAll: v,
    isSelected: u,
    isSomeSelected: c,
    someSelected: g,
    allSelected: m,
    showSelectAll: w,
    lastSelectedIndex: s,
    selectStrategy: r
  };
  return Pe(ys, b), b;
}
function Ma() {
  const e = ge(ys);
  if (!e) throw new Error("Missing selection!");
  return e;
}
const sm = O({
  initialSortOrder: {
    type: String,
    default: "asc",
    validator: (e) => !e || ["asc", "desc"].includes(e)
  },
  sortBy: {
    type: Array,
    default: () => []
  },
  customKeySort: Object,
  multiSort: {
    type: [Boolean, Object],
    default: !1
  },
  mustSort: Boolean
}, "DataTable-sort"), Ss = Symbol.for("vuetify:data-table-sort");
function ws(e) {
  const t = E(() => e.initialSortOrder), n = fe(e, "sortBy"), a = E(() => e.mustSort), l = E(() => e.multiSort);
  return {
    initialSortOrder: t,
    sortBy: n,
    multiSort: l,
    mustSort: a
  };
}
function um(e, t) {
  if (!wn(e))
    return {
      active: !!e
    };
  const {
    key: n,
    mode: a,
    modifier: l
  } = e, i = l === "alt" && (t == null ? void 0 : t.altKey) || l === "shift" && (t == null ? void 0 : t.shiftKey);
  return {
    active: !n || (t == null ? void 0 : t.ctrlKey) || (t == null ? void 0 : t.metaKey) || !1,
    mode: i ? a === "append" ? "prepend" : "append" : a
  };
}
function xs(e) {
  const {
    initialSortOrder: t,
    sortBy: n,
    mustSort: a,
    multiSort: l,
    page: i
  } = e, o = (u, c) => {
    if (u.key == null) return;
    let d = n.value.map((m) => ({
      ...m
    })) ?? [];
    const f = d.find((m) => m.key === u.key), v = t.value, g = t.value === "desc" ? "asc" : "desc";
    if (f)
      f.order === g ? a.value && d.length === 1 ? f.order = t.value : d = d.filter((m) => m.key !== u.key) : f.order = g;
    else {
      const {
        active: m,
        mode: w
      } = um(l.value, c);
      m ? w === "prepend" ? d.unshift({
        key: u.key,
        order: v
      }) : d.push({
        key: u.key,
        order: v
      }) : d = [{
        key: u.key,
        order: v
      }];
    }
    n.value = d, i && (i.value = 1);
  };
  function r(u) {
    return !!n.value.find((c) => c.key === u.key);
  }
  const s = {
    sortBy: n,
    toggleSort: o,
    isSorted: r
  };
  return Pe(Ss, s), s;
}
function ks() {
  const e = ge(Ss);
  if (!e) throw new Error("Missing sort!");
  return e;
}
function cm(e, t, n, a) {
  const l = yt();
  return {
    sortedItems: V(() => {
      var o, r;
      return n.value.length ? dm(t.value, n.value, l.current.value, {
        transform: a == null ? void 0 : a.transform,
        sortFunctions: {
          ...e.customKeySort,
          ...(o = a == null ? void 0 : a.sortFunctions) == null ? void 0 : o.value
        },
        sortRawFunctions: (r = a == null ? void 0 : a.sortRawFunctions) == null ? void 0 : r.value
      }) : t.value;
    })
  };
}
function dm(e, t, n, a) {
  const l = new Intl.Collator(n, {
    sensitivity: "accent",
    usage: "sort"
  });
  return e.map((o) => [o, a != null && a.transform ? a.transform(o) : o]).sort((o, r) => {
    var s, u;
    for (let c = 0; c < t.length; c++) {
      let d = !1;
      const f = t[c].key, v = t[c].order ?? "asc";
      if (v === !1) continue;
      let g = jt(o[1], f), m = jt(r[1], f), w = o[0].raw, b = r[0].raw;
      if (v === "desc" && ([g, m] = [m, g], [w, b] = [b, w]), (s = a == null ? void 0 : a.sortRawFunctions) != null && s[f]) {
        const h = a.sortRawFunctions[f](w, b);
        if (h == null) continue;
        if (d = !0, h) return h;
      }
      if ((u = a == null ? void 0 : a.sortFunctions) != null && u[f]) {
        const h = a.sortFunctions[f](g, m);
        if (h == null) continue;
        if (d = !0, h) return h;
      }
      if (!d && (g instanceof Date && m instanceof Date && (g = g.getTime(), m = m.getTime()), [g, m] = [g, m].map((h) => h != null ? h.toString().toLocaleLowerCase() : h), g !== m))
        return jn(g) && jn(m) ? 0 : jn(g) ? -1 : jn(m) ? 1 : !isNaN(g) && !isNaN(m) ? Number(g) - Number(m) : l.compare(g, m);
    }
    return 0;
  }).map((o) => {
    let [r] = o;
    return r;
  });
}
const Cs = O({
  color: String,
  disableSort: Boolean,
  fixedHeader: Boolean,
  multiSort: Boolean,
  initialSortOrder: String,
  sortAscIcon: {
    type: se,
    default: "$sortAsc"
  },
  sortDescIcon: {
    type: se,
    default: "$sortDesc"
  },
  headerProps: {
    type: Object
  },
  /** @deprecated */
  sticky: Boolean,
  ...We(),
  ...Fn(),
  ...Ea()
}, "VDataTableHeaders"), va = U()({
  name: "VDataTableHeaders",
  props: Cs(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      t: a
    } = yt(), {
      toggleSort: l,
      sortBy: i,
      isSorted: o
    } = ks(), {
      someSelected: r,
      allSelected: s,
      selectAll: u,
      showSelectAll: c
    } = Ma(), {
      columns: d,
      headers: f
    } = La(), {
      loaderClasses: v
    } = _a(e);
    function g(A, T) {
      if (!(e.sticky || e.fixedHeader) && !A.fixed) return;
      const _ = typeof A.fixed == "string" ? A.fixed : A.fixed ? "start" : "none";
      return {
        position: "sticky",
        left: _ === "start" ? X(A.fixedOffset) : void 0,
        right: _ === "end" ? X(A.fixedEndOffset) : void 0,
        top: e.sticky || e.fixedHeader ? `calc(var(--v-table-header-height) * ${T})` : void 0
      };
    }
    function m(A, T) {
      A.key === "Enter" && !e.disableSort && l(T, A);
    }
    function w(A) {
      const T = i.value.find((_) => _.key === A.key);
      return !T && e.initialSortOrder === "asc" || (T == null ? void 0 : T.order) === "asc" ? e.sortAscIcon : e.sortDescIcon;
    }
    const {
      backgroundColorClasses: b,
      backgroundColorStyles: h
    } = Xe(() => e.color), {
      displayClasses: y,
      mobile: x
    } = Et(e), p = V(() => ({
      headers: f.value,
      columns: d.value,
      toggleSort: l,
      isSorted: o,
      sortBy: i.value,
      someSelected: r.value,
      allSelected: s.value,
      selectAll: u,
      getSortIcon: w
    })), k = V(() => ["v-data-table__th", {
      "v-data-table__th--sticky": e.sticky || e.fixedHeader
    }, y.value, v.value]), P = (A) => {
      let {
        column: T,
        x: _,
        y: B
      } = A;
      const F = T.key === "data-table-select" || T.key === "data-table-expand", D = T.key === "data-table-group" && T.width === 0 && !T.title, L = j(e.headerProps ?? {}, T.headerProps ?? {});
      return C(Bn, j({
        tag: "th",
        align: T.align,
        class: [{
          "v-data-table__th--sortable": T.sortable && !e.disableSort,
          "v-data-table__th--sorted": o(T),
          "v-data-table__th--fixed": T.fixed
        }, ...k.value],
        style: {
          width: X(T.width),
          minWidth: X(T.minWidth),
          maxWidth: X(T.maxWidth),
          ...g(T, B)
        },
        colspan: T.colspan,
        rowspan: T.rowspan,
        fixed: T.fixed,
        nowrap: T.nowrap,
        lastFixed: T.lastFixed,
        firstFixedEnd: T.firstFixedEnd,
        noPadding: F,
        empty: D,
        tabindex: T.sortable ? 0 : void 0,
        onClick: T.sortable ? (Y) => l(T, Y) : void 0,
        onKeydown: T.sortable ? (Y) => m(Y, T) : void 0
      }, L), {
        default: () => {
          var ee;
          const Y = `header.${T.key}`, z = {
            column: T,
            selectAll: u,
            isSorted: o,
            toggleSort: l,
            sortBy: i.value,
            someSelected: r.value,
            allSelected: s.value,
            getSortIcon: w
          };
          return n[Y] ? n[Y](z) : D ? "" : T.key === "data-table-select" ? ((ee = n["header.data-table-select"]) == null ? void 0 : ee.call(n, z)) ?? (c.value && C(Lt, {
            color: e.color,
            density: e.density,
            modelValue: s.value,
            indeterminate: r.value && !s.value,
            "onUpdate:modelValue": u
          }, null)) : I("div", {
            class: "v-data-table-header__content"
          }, [I("span", null, [T.title]), T.sortable && !e.disableSort && C(Ve, {
            key: "icon",
            class: "v-data-table-header__sort-icon",
            icon: w(T)
          }, null), e.multiSort && o(T) && I("div", {
            key: "badge",
            class: Q(["v-data-table-header__sort-badge", ...b.value]),
            style: oe(h.value)
          }, [i.value.findIndex((ie) => ie.key === T.key) + 1])]);
        }
      });
    }, S = () => {
      const A = V(() => d.value.filter((_) => (_ == null ? void 0 : _.sortable) && !e.disableSort)), T = d.value.find((_) => _.key === "data-table-select");
      return C(Bn, j({
        tag: "th",
        class: [...k.value],
        colspan: f.value.length + 1
      }, e.headerProps), {
        default: () => [I("div", {
          class: "v-data-table-header__content"
        }, [C(ls, {
          chips: !0,
          color: e.color,
          class: "v-data-table__td-sort-select",
          clearable: !0,
          density: "default",
          items: A.value,
          label: a("$vuetify.dataTable.sortBy"),
          multiple: e.multiSort,
          variant: "underlined",
          "onClick:clear": () => i.value = []
        }, {
          append: T ? () => C(Lt, {
            color: e.color,
            density: "compact",
            modelValue: s.value,
            indeterminate: r.value && !s.value,
            "onUpdate:modelValue": () => u(!s.value)
          }, null) : void 0,
          chip: (_) => {
            var B;
            return C(_n, {
              onClick: (B = _.item.raw) != null && B.sortable ? () => l(_.item.raw) : void 0,
              onMousedown: (F) => {
                F.preventDefault(), F.stopPropagation();
              }
            }, {
              default: () => [_.item.title, C(Ve, {
                class: Q(["v-data-table__td-sort-icon", o(_.item.raw) && "v-data-table__td-sort-icon-active"]),
                icon: w(_.item.raw),
                size: "small"
              }, null)]
            });
          }
        })])]
      });
    };
    J(() => x.value ? I("tr", null, [C(S, null, null)]) : I(de, null, [n.headers ? n.headers(p.value) : f.value.map((A, T) => I("tr", null, [A.map((_, B) => C(P, {
      column: _,
      x: B,
      y: T
    }, null))])), e.loading && I("tr", {
      class: "v-data-table-progress"
    }, [I("th", {
      colspan: d.value.length
    }, [C(Dl, {
      name: "v-data-table-progress",
      absolute: !0,
      active: !0,
      color: typeof e.loading == "boolean" || e.loading === "true" ? e.color : e.loading,
      indeterminate: !0
    }, {
      default: n.loader
    })])])]));
  }
}), fm = O({
  groupBy: {
    type: Array,
    default: () => []
  }
}, "DataTable-group"), ps = Symbol.for("vuetify:data-table-group");
function Vs(e) {
  return {
    groupBy: fe(e, "groupBy")
  };
}
function Ps(e) {
  const {
    disableSort: t,
    groupBy: n,
    sortBy: a
  } = e, l = K(/* @__PURE__ */ new Set()), i = V(() => n.value.map((c) => ({
    ...c,
    order: c.order ?? !1
  })).concat(t != null && t.value ? [] : a.value));
  function o(c) {
    return l.value.has(c.id);
  }
  function r(c) {
    const d = new Set(l.value);
    o(c) ? d.delete(c.id) : d.add(c.id), l.value = d;
  }
  function s(c) {
    function d(f) {
      const v = [];
      for (const g of f.items)
        "type" in g && g.type === "group" ? v.push(...d(g)) : v.push(g);
      return [...new Set(v)];
    }
    return d({
      items: c
    });
  }
  const u = {
    sortByWithGroups: i,
    toggleGroup: r,
    opened: l,
    groupBy: n,
    extractRows: s,
    isGroupOpen: o
  };
  return Pe(ps, u), u;
}
function Is() {
  const e = ge(ps);
  if (!e) throw new Error("Missing group!");
  return e;
}
function vm(e, t) {
  if (!e.length) return [];
  const n = /* @__PURE__ */ new Map();
  for (const a of e) {
    const l = jt(a.raw, t);
    n.has(l) || n.set(l, []), n.get(l).push(a);
  }
  return n;
}
function As(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "root";
  if (!t.length) return [];
  const l = vm(e, t[0]), i = [], o = t.slice(1);
  return l.forEach((r, s) => {
    const u = t[0], c = `${a}_${u}_${s}`;
    i.push({
      depth: n,
      id: c,
      key: u,
      value: s,
      items: o.length ? As(r, o, n + 1, c) : r,
      type: "group"
    });
  }), i;
}
function Ts(e, t, n) {
  const a = [];
  for (const l of e)
    "type" in l && l.type === "group" ? (l.value != null && a.push(l), (t.has(l.id) || l.value == null) && (a.push(...Ts(l.items, t, n)), n && a.push({
      ...l,
      type: "group-summary"
    }))) : a.push(l);
  return a;
}
function Es(e, t, n, a) {
  return {
    flatItems: V(() => {
      if (!t.value.length) return e.value;
      const i = As(e.value, t.value.map((o) => o.key));
      return Ts(i, n.value, Oe(a));
    })
  };
}
const _s = O({
  item: {
    type: Object,
    required: !0
  },
  groupCollapseIcon: {
    type: se,
    default: "$tableGroupCollapse"
  },
  groupExpandIcon: {
    type: se,
    default: "$tableGroupExpand"
  },
  ...We()
}, "VDataTableGroupHeaderRow"), mm = U()({
  name: "VDataTableGroupHeaderRow",
  props: _s(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isGroupOpen: a,
      toggleGroup: l,
      extractRows: i
    } = Is(), {
      isSelected: o,
      isSomeSelected: r,
      select: s
    } = Ma(), {
      columns: u
    } = La(), c = V(() => i([e.item])), d = E(() => u.value.length - (u.value.some((f) => f.key === "data-table-select") ? 1 : 0));
    return () => I("tr", {
      class: "v-data-table-group-header-row",
      style: {
        "--v-data-table-group-header-row-depth": e.item.depth
      }
    }, [u.value.map((f) => {
      var v, g;
      if (f.key === "data-table-group") {
        const m = a(e.item) ? e.groupCollapseIcon : e.groupExpandIcon, w = () => l(e.item);
        return ((v = n["data-table-group"]) == null ? void 0 : v.call(n, {
          item: e.item,
          count: c.value.length,
          props: {
            icon: m,
            onClick: w
          }
        })) ?? C(Bn, {
          class: "v-data-table-group-header-row__column",
          colspan: d.value
        }, {
          default: () => [C(lt, {
            size: "small",
            variant: "text",
            icon: m,
            onClick: w
          }, null), I("span", null, [e.item.value]), I("span", null, [Qn("("), c.value.length, Qn(")")])]
        });
      } else if (f.key === "data-table-select") {
        const m = c.value.filter((y) => y.selectable), w = m.length > 0 && o(m), b = r(m) && !w, h = (y) => s(m, y);
        return ((g = n["data-table-select"]) == null ? void 0 : g.call(n, {
          props: {
            modelValue: w,
            indeterminate: b,
            "onUpdate:modelValue": h
          }
        })) ?? C(Bn, {
          class: "v-data-table__td--select-row",
          noPadding: !0
        }, {
          default: () => [C(Lt, {
            density: e.density,
            disabled: m.length === 0,
            modelValue: w,
            indeterminate: b,
            "onUpdate:modelValue": h
          }, null)]
        });
      }
      return "";
    })]);
  }
}), gm = O({
  expandOnClick: Boolean,
  showExpand: Boolean,
  expanded: {
    type: Array,
    default: () => []
  }
}, "DataTable-expand"), Bs = Symbol.for("vuetify:datatable:expanded");
function Ds(e) {
  const t = E(() => e.expandOnClick), n = fe(e, "expanded", e.expanded, (r) => new Set(r), (r) => [...r.values()]);
  function a(r, s) {
    const u = new Set(n.value), c = pe(r.value);
    if (s)
      u.add(c);
    else {
      const d = [...n.value].find((f) => pe(f) === c);
      u.delete(d);
    }
    n.value = u;
  }
  function l(r) {
    const s = pe(r.value);
    return [...n.value].some((u) => pe(u) === s);
  }
  function i(r) {
    a(r, !l(r));
  }
  const o = {
    expand: a,
    expanded: n,
    expandOnClick: t,
    isExpanded: l,
    toggleExpand: i
  };
  return Pe(Bs, o), o;
}
function Fs() {
  const e = ge(Bs);
  if (!e) throw new Error("foo");
  return e;
}
const Os = O({
  color: String,
  index: Number,
  item: Object,
  cellProps: [Object, Function],
  collapseIcon: {
    type: se,
    default: "$collapse"
  },
  expandIcon: {
    type: se,
    default: "$expand"
  },
  onClick: He(),
  onContextmenu: He(),
  onDblclick: He(),
  ...We(),
  ...Fn()
}, "VDataTableRow"), hm = U()({
  name: "VDataTableRow",
  props: Os(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      displayClasses: a,
      mobile: l
    } = Et(e, "v-data-table__tr"), {
      isSelected: i,
      toggleSelect: o,
      someSelected: r,
      allSelected: s,
      selectAll: u
    } = Ma(), {
      isExpanded: c,
      toggleExpand: d
    } = Fs(), {
      toggleSort: f,
      sortBy: v,
      isSorted: g
    } = ks(), {
      columns: m
    } = La();
    J(() => I("tr", {
      class: Q(["v-data-table__tr", {
        "v-data-table__tr--clickable": !!(e.onClick || e.onContextmenu || e.onDblclick)
      }, a.value]),
      onClick: e.onClick,
      onContextmenu: e.onContextmenu,
      onDblclick: e.onDblclick
    }, [e.item && m.value.map((w, b) => {
      const h = e.item, y = `item.${w.key}`, x = `header.${w.key}`, p = {
        index: e.index,
        item: h.raw,
        internalItem: h,
        value: jt(h.columns, w.key),
        column: w,
        isSelected: i,
        toggleSelect: o,
        isExpanded: c,
        toggleExpand: d
      }, k = {
        column: w,
        selectAll: u,
        isSorted: g,
        toggleSort: f,
        sortBy: v.value,
        someSelected: r.value,
        allSelected: s.value,
        getSortIcon: () => ""
      }, P = typeof e.cellProps == "function" ? e.cellProps({
        index: p.index,
        item: p.item,
        internalItem: p.internalItem,
        value: p.value,
        column: w
      }) : e.cellProps, S = typeof w.cellProps == "function" ? w.cellProps({
        index: p.index,
        item: p.item,
        internalItem: p.internalItem,
        value: p.value
      }) : w.cellProps, A = w.key === "data-table-select" || w.key === "data-table-expand", T = w.key === "data-table-group" && w.width === 0 && !w.title;
      return C(Bn, j({
        align: w.align,
        indent: w.indent,
        class: {
          "v-data-table__td--expanded-row": w.key === "data-table-expand",
          "v-data-table__td--select-row": w.key === "data-table-select"
        },
        fixed: w.fixed,
        fixedOffset: w.fixedOffset,
        fixedEndOffset: w.fixedEndOffset,
        lastFixed: w.lastFixed,
        firstFixedEnd: w.firstFixedEnd,
        maxWidth: l.value ? void 0 : w.maxWidth,
        noPadding: A,
        empty: T,
        nowrap: w.nowrap,
        width: l.value ? void 0 : w.width
      }, P, S), {
        default: () => {
          var B, F, D, L;
          if (w.key === "data-table-select")
            return ((B = n["item.data-table-select"]) == null ? void 0 : B.call(n, {
              ...p,
              props: {
                color: e.color,
                disabled: !h.selectable,
                modelValue: i([h]),
                onClick: Wn(() => o(h), ["stop"])
              }
            })) ?? C(Lt, {
              color: e.color,
              disabled: !h.selectable,
              density: e.density,
              modelValue: i([h]),
              onClick: Wn((Y) => o(h, e.index, Y), ["stop"])
            }, null);
          if (w.key === "data-table-expand")
            return ((F = n["item.data-table-expand"]) == null ? void 0 : F.call(n, {
              ...p,
              props: {
                icon: c(h) ? e.collapseIcon : e.expandIcon,
                size: "small",
                variant: "text",
                onClick: Wn(() => d(h), ["stop"])
              }
            })) ?? C(lt, {
              icon: c(h) ? e.collapseIcon : e.expandIcon,
              size: "small",
              variant: "text",
              onClick: Wn(() => d(h), ["stop"])
            }, null);
          if (n[y] && !l.value) return n[y](p);
          const _ = zt(p.value);
          return l.value ? I(de, null, [I("div", {
            class: "v-data-table__td-title"
          }, [((D = n[x]) == null ? void 0 : D.call(n, k)) ?? w.title]), I("div", {
            class: "v-data-table__td-value"
          }, [((L = n[y]) == null ? void 0 : L.call(n, p)) ?? _])]) : _;
        }
      });
    })]));
  }
}), Ls = O({
  color: String,
  loading: [Boolean, String],
  loadingText: {
    type: String,
    default: "$vuetify.dataIterator.loadingText"
  },
  hideNoData: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  rowProps: [Object, Function],
  cellProps: [Object, Function],
  ...Bt(Os(), ["collapseIcon", "expandIcon", "density"]),
  ...Bt(_s(), ["groupCollapseIcon", "groupExpandIcon", "density"]),
  ...Fn()
}, "VDataTableRows"), ma = U()({
  name: "VDataTableRows",
  inheritAttrs: !1,
  props: Ls(),
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      columns: l
    } = La(), {
      expandOnClick: i,
      toggleExpand: o,
      isExpanded: r
    } = Fs(), {
      isSelected: s,
      toggleSelect: u
    } = Ma(), {
      toggleGroup: c,
      isGroupOpen: d
    } = Is(), {
      t: f
    } = yt(), {
      mobile: v
    } = Et(e);
    return J(() => {
      var m, w;
      const g = Bt(e, ["groupCollapseIcon", "groupExpandIcon", "density"]);
      return e.loading && (!e.items.length || a.loading) ? I("tr", {
        class: "v-data-table-rows-loading",
        key: "loading"
      }, [I("td", {
        colspan: l.value.length
      }, [((m = a.loading) == null ? void 0 : m.call(a)) ?? f(e.loadingText)])]) : !e.loading && !e.items.length && !e.hideNoData ? I("tr", {
        class: "v-data-table-rows-no-data",
        key: "no-data"
      }, [I("td", {
        colspan: l.value.length
      }, [((w = a["no-data"]) == null ? void 0 : w.call(a)) ?? f(e.noDataText)])]) : I(de, null, [e.items.map((b, h) => {
        var p, k;
        if (b.type === "group") {
          const P = {
            index: h,
            item: b,
            columns: l.value,
            isExpanded: r,
            toggleExpand: o,
            isSelected: s,
            toggleSelect: u,
            toggleGroup: c,
            isGroupOpen: d
          };
          return a["group-header"] ? a["group-header"](P) : C(mm, j({
            key: `group-header_${b.id}`,
            item: b
          }, wi(n, ":groupHeader", () => P), g), a);
        }
        if (b.type === "group-summary") {
          const P = {
            index: h,
            item: b,
            columns: l.value,
            toggleGroup: c
          };
          return ((p = a["group-summary"]) == null ? void 0 : p.call(a, P)) ?? "";
        }
        const y = {
          index: b.virtualIndex ?? h,
          item: b.raw,
          internalItem: b,
          columns: l.value,
          isExpanded: r,
          toggleExpand: o,
          isSelected: s,
          toggleSelect: u
        }, x = {
          ...y,
          props: j({
            key: `item_${b.key ?? b.index}`,
            onClick: i.value ? () => {
              o(b);
            } : void 0,
            index: h,
            item: b,
            color: e.color,
            cellProps: e.cellProps,
            collapseIcon: e.collapseIcon,
            expandIcon: e.expandIcon,
            density: e.density,
            mobile: v.value
          }, wi(n, ":row", () => y), typeof e.rowProps == "function" ? e.rowProps({
            item: y.item,
            index: y.index,
            internalItem: y.internalItem
          }) : e.rowProps)
        };
        return I(de, {
          key: x.props.key
        }, [a.item ? a.item(x) : C(hm, x.props, a), r(b) && ((k = a["expanded-row"]) == null ? void 0 : k.call(a, y))]);
      })]);
    }), {};
  }
}), Ms = O({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  striped: {
    type: String,
    default: null,
    validator: (e) => ["even", "odd"].includes(e)
  },
  ...re(),
  ...We(),
  ...he(),
  ...Ce()
}, "VTable"), ga = U()({
  name: "VTable",
  props: Ms(),
  setup(e, t) {
    let {
      slots: n,
      emit: a
    } = t;
    const {
      themeClasses: l
    } = Ae(e), {
      densityClasses: i
    } = mt(e);
    return J(() => C(e.tag, {
      class: Q(["v-table", {
        "v-table--fixed-height": !!e.height,
        "v-table--fixed-header": e.fixedHeader,
        "v-table--fixed-footer": e.fixedFooter,
        "v-table--has-top": !!n.top,
        "v-table--has-bottom": !!n.bottom,
        "v-table--hover": e.hover,
        "v-table--striped-even": e.striped === "even",
        "v-table--striped-odd": e.striped === "odd"
      }, l.value, i.value, e.class]),
      style: oe(e.style)
    }, {
      default: () => {
        var o, r, s;
        return [(o = n.top) == null ? void 0 : o.call(n), n.default ? I("div", {
          class: "v-table__wrapper",
          style: {
            height: X(e.height)
          }
        }, [I("table", null, [n.default()])]) : (r = n.wrapper) == null ? void 0 : r.call(n), (s = n.bottom) == null ? void 0 : s.call(n)];
      }
    })), {};
  }
}), ym = O({
  items: {
    type: Array,
    default: () => []
  },
  itemValue: {
    type: [String, Array, Function],
    default: "id"
  },
  itemSelectable: {
    type: [String, Array, Function],
    default: null
  },
  rowProps: [Object, Function],
  cellProps: [Object, Function],
  returnObject: Boolean
}, "DataTable-items");
function bm(e, t, n, a) {
  const l = e.returnObject ? t : Ge(t, e.itemValue), i = Ge(t, e.itemSelectable, !0), o = a.reduce((r, s) => (s.key != null && (r[s.key] = Ge(t, s.value)), r), {});
  return {
    type: "item",
    key: e.returnObject ? Ge(t, e.itemValue) : l,
    index: n,
    value: l,
    selectable: i,
    columns: o,
    raw: t
  };
}
function Sm(e, t, n) {
  return t.map((a, l) => bm(e, a, l, n));
}
function $s(e, t) {
  return {
    items: V(() => Sm(e, e.items, t.value))
  };
}
function Rs(e) {
  let {
    page: t,
    itemsPerPage: n,
    sortBy: a,
    groupBy: l,
    search: i
  } = e;
  const o = Ie("VDataTable"), r = () => ({
    page: t.value,
    itemsPerPage: n.value,
    sortBy: a.value,
    groupBy: l.value,
    search: i.value
  });
  let s = null;
  q(r, (u) => {
    Ke(s, u) || (s && s.search !== u.search && (t.value = 1), o.emit("update:options", u), s = u);
  }, {
    deep: !0,
    immediate: !0
  });
}
const wm = (e, t, n) => {
  if (e == null || t == null) return -1;
  if (!t.length) return 0;
  e = e.toString().toLocaleLowerCase(), t = t.toString().toLocaleLowerCase();
  const a = [];
  let l = e.indexOf(t);
  for (; ~l; )
    a.push([l, l + t.length]), l = e.indexOf(t, l + t.length);
  return a.length ? a : -1;
};
function qa(e, t) {
  if (!(e == null || typeof e == "boolean" || e === -1))
    return typeof e == "number" ? [[e, e + t.length]] : Array.isArray(e[0]) ? e : [e];
}
const Ns = O({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function xm(e, t, n) {
  var s;
  const a = [], l = (n == null ? void 0 : n.default) ?? wm, i = n != null && n.filterKeys ? Me(n.filterKeys) : !1, o = Object.keys((n == null ? void 0 : n.customKeyFilter) ?? {}).length;
  if (!(e != null && e.length)) return a;
  let r = null;
  e: for (let u = 0; u < e.length; u++) {
    const [c, d = c] = Me(e[u]), f = {}, v = {};
    let g = -1;
    if ((t || o > 0) && !(n != null && n.noFilter)) {
      let m = !1;
      if (typeof c == "object") {
        if (c.type === "divider" || c.type === "subheader") {
          (r == null ? void 0 : r.type) === "divider" && c.type === "subheader" && a.push(r), r = {
            index: u,
            matches: {},
            type: c.type
          };
          continue;
        }
        const h = i || Object.keys(d);
        m = h.length === o;
        for (const y of h) {
          const x = Ge(d, y), p = (s = n == null ? void 0 : n.customKeyFilter) == null ? void 0 : s[y];
          if (g = p ? p(x, t, c) : l(x, t, c), g !== -1 && g !== !1)
            p ? f[y] = qa(g, t) : v[y] = qa(g, t);
          else if ((n == null ? void 0 : n.filterMode) === "every")
            continue e;
        }
      } else
        g = l(c, t, c), g !== -1 && g !== !1 && (v.title = qa(g, t));
      const w = Object.keys(v).length, b = Object.keys(f).length;
      if (!w && !b || (n == null ? void 0 : n.filterMode) === "union" && b !== o && !w || (n == null ? void 0 : n.filterMode) === "intersection" && (b !== o || !w && o > 0 && !m)) continue;
    }
    r && (a.push(r), r = null), a.push({
      index: u,
      matches: {
        ...v,
        ...f
      }
    });
  }
  return a;
}
function Hs(e, t, n, a) {
  const l = G([]), i = G(/* @__PURE__ */ new Map()), o = V(() => a != null && a.transform ? ut(t).map((s) => [s, a.transform(s)]) : ut(t));
  Le(() => {
    const s = typeof n == "function" ? n() : ut(n), u = typeof s != "string" && typeof s != "number" ? "" : String(s), c = xm(o.value, u, {
      customKeyFilter: {
        ...e.customKeyFilter,
        ...ut(a == null ? void 0 : a.customKeyFilter)
      },
      default: e.customFilter,
      filterKeys: e.filterKeys,
      filterMode: e.filterMode,
      noFilter: e.noFilter
    }), d = ut(t), f = [], v = /* @__PURE__ */ new Map();
    c.forEach((g) => {
      let {
        index: m,
        matches: w
      } = g;
      const b = d[m];
      f.push(b), v.set(b.value, w);
    }), l.value = f, i.value = v;
  });
  function r(s) {
    return i.value.get(s.value);
  }
  return {
    filteredItems: l,
    filteredMatches: i,
    getMatches: r
  };
}
function km(e, t, n) {
  return n == null || !n.length ? t : n.map((a, l) => {
    const i = l === 0 ? 0 : n[l - 1][1], o = [I("span", {
      class: Q(`${e}__unmask`)
    }, [t.slice(i, a[0])]), I("span", {
      class: Q(`${e}__mask`)
    }, [t.slice(a[0], a[1])])];
    return l === n.length - 1 && o.push(I("span", {
      class: Q(`${e}__unmask`)
    }, [t.slice(a[1])])), I(de, null, [o]);
  });
}
const zs = O({
  ...Ls(),
  hideDefaultBody: Boolean,
  hideDefaultFooter: Boolean,
  hideDefaultHeader: Boolean,
  width: [String, Number],
  search: String,
  ...gm(),
  ...fm(),
  ...Jv(),
  ...ym(),
  ...rm(),
  ...sm(),
  ..._e(Cs(), ["multiSort", "initialSortOrder"]),
  ...Ms()
}, "DataTable"), Cm = O({
  ...is(),
  ...zs(),
  ...Ns(),
  ...zl()
}, "VDataTable");
U()({
  name: "VDataTable",
  props: Cm(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:page": (e) => !0,
    "update:itemsPerPage": (e) => !0,
    "update:sortBy": (e) => !0,
    "update:options": (e) => !0,
    "update:groupBy": (e) => !0,
    "update:expanded": (e) => !0,
    "update:currentItems": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      groupBy: l
    } = Vs(e), {
      initialSortOrder: i,
      sortBy: o,
      multiSort: r,
      mustSort: s
    } = ws(e), {
      page: u,
      itemsPerPage: c
    } = rs(e), {
      disableSort: d
    } = ya(e), {
      columns: f,
      headers: v,
      sortFunctions: g,
      sortRawFunctions: m,
      filterFunctions: w
    } = gs(e, {
      groupBy: l,
      showSelect: E(() => e.showSelect),
      showExpand: E(() => e.showExpand)
    }), {
      items: b
    } = $s(e, f), h = E(() => e.search), {
      filteredItems: y
    } = Hs(e, b, h, {
      transform: (le) => le.columns,
      customKeyFilter: w
    }), {
      toggleSort: x
    } = xs({
      initialSortOrder: i,
      sortBy: o,
      multiSort: r,
      mustSort: s,
      page: u
    }), {
      sortByWithGroups: p,
      opened: k,
      extractRows: P,
      isGroupOpen: S,
      toggleGroup: A
    } = Ps({
      groupBy: l,
      sortBy: o,
      disableSort: d
    }), {
      sortedItems: T
    } = cm(e, y, p, {
      transform: (le) => ({
        ...le.raw,
        ...le.columns
      }),
      sortFunctions: g,
      sortRawFunctions: m
    }), {
      flatItems: _
    } = Es(T, l, k, () => !!a["group-summary"]), B = V(() => _.value.length), {
      startIndex: F,
      stopIndex: D,
      pageCount: L,
      setItemsPerPage: Y
    } = ss({
      page: u,
      itemsPerPage: c,
      itemsLength: B
    }), {
      paginatedItems: z
    } = Qv({
      items: _,
      startIndex: F,
      stopIndex: D,
      itemsPerPage: c
    }), ee = V(() => P(z.value)), {
      isSelected: ie,
      select: $,
      selectAll: Z,
      toggleSelect: M,
      someSelected: N,
      allSelected: te
    } = bs(e, {
      allItems: b,
      currentPage: ee
    }), {
      isExpanded: W,
      toggleExpand: ae
    } = Ds(e);
    Rs({
      page: u,
      itemsPerPage: c,
      sortBy: o,
      groupBy: l,
      search: h
    }), ot({
      VDataTableRows: {
        hideNoData: E(() => e.hideNoData),
        noDataText: E(() => e.noDataText),
        loading: E(() => e.loading),
        loadingText: E(() => e.loadingText)
      }
    });
    const R = V(() => ({
      page: u.value,
      itemsPerPage: c.value,
      sortBy: o.value,
      pageCount: L.value,
      toggleSort: x,
      setItemsPerPage: Y,
      someSelected: N.value,
      allSelected: te.value,
      isSelected: ie,
      select: $,
      selectAll: Z,
      toggleSelect: M,
      isExpanded: W,
      toggleExpand: ae,
      isGroupOpen: S,
      toggleGroup: A,
      items: ee.value.map((le) => le.raw),
      internalItems: ee.value,
      groupedItems: z.value,
      columns: f.value,
      headers: v.value
    }));
    return J(() => {
      const le = fa.filterProps(e), ve = va.filterProps(_e(e, ["multiSort"])), Se = ma.filterProps(e), Fe = ga.filterProps(e);
      return C(ga, j({
        class: ["v-data-table", {
          "v-data-table--show-select": e.showSelect,
          "v-data-table--loading": e.loading
        }, e.class],
        style: e.style
      }, Fe, {
        fixedHeader: e.fixedHeader || e.sticky
      }), {
        top: () => {
          var ue;
          return (ue = a.top) == null ? void 0 : ue.call(a, R.value);
        },
        default: () => {
          var ue, Be, Te, be, H, ne;
          return a.default ? a.default(R.value) : I(de, null, [(ue = a.colgroup) == null ? void 0 : ue.call(a, R.value), !e.hideDefaultHeader && I("thead", {
            key: "thead"
          }, [C(va, j(ve, {
            multiSort: !!e.multiSort
          }), a)]), (Be = a.thead) == null ? void 0 : Be.call(a, R.value), !e.hideDefaultBody && I("tbody", null, [(Te = a["body.prepend"]) == null ? void 0 : Te.call(a, R.value), a.body ? a.body(R.value) : C(ma, j(n, Se, {
            items: z.value
          }), a), (be = a["body.append"]) == null ? void 0 : be.call(a, R.value)]), (H = a.tbody) == null ? void 0 : H.call(a, R.value), (ne = a.tfoot) == null ? void 0 : ne.call(a, R.value)]);
        },
        bottom: () => a.bottom ? a.bottom(R.value) : !e.hideDefaultFooter && I(de, null, [C($n, null, null), C(fa, le, {
          prepend: a["footer.prepend"]
        })])
      });
    }), {};
  }
});
const pm = O({
  itemsLength: {
    type: [Number, String],
    required: !0
  },
  ...is(),
  ...zs(),
  ...zl()
}, "VDataTableServer"), wg = U()({
  name: "VDataTableServer",
  props: pm(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:page": (e) => !0,
    "update:itemsPerPage": (e) => !0,
    "update:sortBy": (e) => !0,
    "update:options": (e) => !0,
    "update:expanded": (e) => !0,
    "update:groupBy": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      groupBy: l
    } = Vs(e), {
      initialSortOrder: i,
      sortBy: o,
      multiSort: r,
      mustSort: s
    } = ws(e), {
      page: u,
      itemsPerPage: c
    } = rs(e), {
      disableSort: d
    } = ya(e), f = V(() => parseInt(e.itemsLength, 10)), {
      columns: v,
      headers: g
    } = gs(e, {
      groupBy: l,
      showSelect: E(() => e.showSelect),
      showExpand: E(() => e.showExpand)
    }), {
      items: m
    } = $s(e, v), {
      toggleSort: w
    } = xs({
      initialSortOrder: i,
      sortBy: o,
      multiSort: r,
      mustSort: s,
      page: u
    }), {
      opened: b,
      isGroupOpen: h,
      toggleGroup: y,
      extractRows: x
    } = Ps({
      groupBy: l,
      sortBy: o,
      disableSort: d
    }), {
      pageCount: p,
      setItemsPerPage: k
    } = ss({
      page: u,
      itemsPerPage: c,
      itemsLength: f
    }), {
      flatItems: P
    } = Es(m, l, b, () => !!a["group-summary"]), {
      isSelected: S,
      select: A,
      selectAll: T,
      toggleSelect: _,
      someSelected: B,
      allSelected: F
    } = bs(e, {
      allItems: m,
      currentPage: m
    }), {
      isExpanded: D,
      toggleExpand: L
    } = Ds(e), Y = V(() => x(m.value));
    Rs({
      page: u,
      itemsPerPage: c,
      sortBy: o,
      groupBy: l,
      search: E(() => e.search)
    }), Pe("v-data-table", {
      toggleSort: w,
      sortBy: o
    }), ot({
      VDataTableRows: {
        hideNoData: E(() => e.hideNoData),
        noDataText: E(() => e.noDataText),
        loading: E(() => e.loading),
        loadingText: E(() => e.loadingText)
      }
    });
    const z = V(() => ({
      page: u.value,
      itemsPerPage: c.value,
      sortBy: o.value,
      pageCount: p.value,
      toggleSort: w,
      setItemsPerPage: k,
      someSelected: B.value,
      allSelected: F.value,
      isSelected: S,
      select: A,
      selectAll: T,
      toggleSelect: _,
      isExpanded: D,
      toggleExpand: L,
      isGroupOpen: h,
      toggleGroup: y,
      items: Y.value.map((ee) => ee.raw),
      internalItems: Y.value,
      groupedItems: P.value,
      columns: v.value,
      headers: g.value
    }));
    J(() => {
      const ee = fa.filterProps(e), ie = va.filterProps(_e(e, ["multiSort"])), $ = ma.filterProps(e), Z = ga.filterProps(e);
      return C(ga, j({
        class: ["v-data-table", {
          "v-data-table--loading": e.loading
        }, e.class],
        style: e.style
      }, Z, {
        fixedHeader: e.fixedHeader || e.sticky
      }), {
        top: () => {
          var M;
          return (M = a.top) == null ? void 0 : M.call(a, z.value);
        },
        default: () => {
          var M, N, te, W, ae, R;
          return a.default ? a.default(z.value) : I(de, null, [(M = a.colgroup) == null ? void 0 : M.call(a, z.value), !e.hideDefaultHeader && I("thead", {
            key: "thead",
            class: "v-data-table__thead",
            role: "rowgroup"
          }, [C(va, j(ie, {
            multiSort: !!e.multiSort
          }), a)]), (N = a.thead) == null ? void 0 : N.call(a, z.value), !e.hideDefaultBody && I("tbody", {
            class: "v-data-table__tbody",
            role: "rowgroup"
          }, [(te = a["body.prepend"]) == null ? void 0 : te.call(a, z.value), a.body ? a.body(z.value) : C(ma, j(n, $, {
            items: P.value
          }), a), (W = a["body.append"]) == null ? void 0 : W.call(a, z.value)]), (ae = a.tbody) == null ? void 0 : ae.call(a, z.value), (R = a.tfoot) == null ? void 0 : R.call(a, z.value)]);
        },
        bottom: () => a.bottom ? a.bottom(z.value) : !e.hideDefaultFooter && I(de, null, [C($n, null, null), C(fa, ee, {
          prepend: a["footer.prepend"]
        })])
      });
    });
  }
}), Vm = O({
  ...re(),
  ...he()
}, "VCardActions"), Pm = U()({
  name: "VCardActions",
  props: Vm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ot({
      VBtn: {
        slim: !0,
        variant: "text"
      }
    }), J(() => C(e.tag, {
      class: Q(["v-card-actions", e.class]),
      style: oe(e.style)
    }, n)), {};
  }
}), Im = O({
  opacity: [Number, String],
  ...re(),
  ...he()
}, "VCardSubtitle"), Am = U()({
  name: "VCardSubtitle",
  props: Im(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return J(() => C(e.tag, {
      class: Q(["v-card-subtitle", e.class]),
      style: oe([{
        "--v-card-subtitle-opacity": e.opacity
      }, e.style])
    }, n)), {};
  }
}), Tm = ka("v-card-title"), Em = O({
  appendAvatar: String,
  appendIcon: se,
  prependAvatar: String,
  prependIcon: se,
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...re(),
  ...We(),
  ...he()
}, "VCardItem"), _m = U()({
  name: "VCardItem",
  props: Em(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return J(() => {
      const a = !!(e.prependAvatar || e.prependIcon), l = !!(a || n.prepend), i = !!(e.appendAvatar || e.appendIcon), o = !!(i || n.append), r = !!(e.title != null || n.title), s = !!(e.subtitle != null || n.subtitle);
      return C(e.tag, {
        class: Q(["v-card-item", e.class]),
        style: oe(e.style)
      }, {
        default: () => {
          var u;
          return [l && I("div", {
            key: "prepend",
            class: "v-card-item__prepend"
          }, [n.prepend ? C(ke, {
            key: "prepend-defaults",
            disabled: !a,
            defaults: {
              VAvatar: {
                density: e.density,
                image: e.prependAvatar
              },
              VIcon: {
                density: e.density,
                icon: e.prependIcon
              }
            }
          }, n.prepend) : I(de, null, [e.prependAvatar && C(Ot, {
            key: "prepend-avatar",
            density: e.density,
            image: e.prependAvatar
          }, null), e.prependIcon && C(Ve, {
            key: "prepend-icon",
            density: e.density,
            icon: e.prependIcon
          }, null)])]), I("div", {
            class: "v-card-item__content"
          }, [r && C(Tm, {
            key: "title"
          }, {
            default: () => {
              var c;
              return [((c = n.title) == null ? void 0 : c.call(n)) ?? zt(e.title)];
            }
          }), s && C(Am, {
            key: "subtitle"
          }, {
            default: () => {
              var c;
              return [((c = n.subtitle) == null ? void 0 : c.call(n)) ?? zt(e.subtitle)];
            }
          }), (u = n.default) == null ? void 0 : u.call(n)]), o && I("div", {
            key: "append",
            class: "v-card-item__append"
          }, [n.append ? C(ke, {
            key: "append-defaults",
            disabled: !i,
            defaults: {
              VAvatar: {
                density: e.density,
                image: e.appendAvatar
              },
              VIcon: {
                density: e.density,
                icon: e.appendIcon
              }
            }
          }, n.append) : I(de, null, [e.appendIcon && C(Ve, {
            key: "append-icon",
            density: e.density,
            icon: e.appendIcon
          }, null), e.appendAvatar && C(Ot, {
            key: "append-avatar",
            density: e.density,
            image: e.appendAvatar
          }, null)])])];
        }
      });
    }), {};
  }
}), Bm = O({
  opacity: [Number, String],
  ...re(),
  ...he()
}, "VCardText"), Dm = U()({
  name: "VCardText",
  props: Bm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return J(() => C(e.tag, {
      class: Q(["v-card-text", e.class]),
      style: oe([{
        "--v-card-text-opacity": e.opacity
      }, e.style])
    }, n)), {};
  }
}), Fm = O({
  appendAvatar: String,
  appendIcon: se,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: void 0
  },
  prependAvatar: String,
  prependIcon: se,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  text: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...bt(),
  ...re(),
  ...We(),
  ...ft(),
  ...wt(),
  ...Ea(),
  ...gn(),
  ...Nn(),
  ...Ue(),
  ...Ia(),
  ...he(),
  ...Ce(),
  ...St({
    variant: "elevated"
  })
}, "VCard"), xg = U()({
  name: "VCard",
  directives: {
    vRipple: Tt
  },
  props: Fm(),
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      themeClasses: l
    } = Ae(e), {
      borderClasses: i
    } = Ct(e), {
      colorClasses: o,
      colorStyles: r,
      variantClasses: s
    } = Kt(e), {
      densityClasses: u
    } = mt(e), {
      dimensionStyles: c
    } = vt(e), {
      elevationClasses: d
    } = pt(e), {
      loaderClasses: f
    } = _a(e), {
      locationStyles: v
    } = Rn(e), {
      positionClasses: g
    } = Hn(e), {
      roundedClasses: m
    } = qe(e), w = Pa(e, n), b = G(void 0);
    return q(() => e.loading, (h, y) => {
      b.value = !h && typeof y == "string" ? y : typeof h == "boolean" ? void 0 : h;
    }, {
      immediate: !0
    }), J(() => {
      const h = e.link !== !1 && w.isLink.value, y = !e.disabled && e.link !== !1 && (e.link || w.isClickable.value), x = h ? "a" : e.tag, p = !!(a.title || e.title != null), k = !!(a.subtitle || e.subtitle != null), P = p || k, S = !!(a.append || e.appendAvatar || e.appendIcon), A = !!(a.prepend || e.prependAvatar || e.prependIcon), T = !!(a.image || e.image), _ = P || A || S, B = !!(a.text || e.text != null);
      return ze(C(x, j(w.linkProps, {
        class: ["v-card", {
          "v-card--disabled": e.disabled,
          "v-card--flat": e.flat,
          "v-card--hover": e.hover && !(e.disabled || e.flat),
          "v-card--link": y
        }, l.value, i.value, o.value, u.value, d.value, f.value, g.value, m.value, s.value, e.class],
        style: [r.value, c.value, v.value, e.style],
        onClick: y && w.navigate,
        tabindex: e.disabled ? -1 : void 0
      }), {
        default: () => {
          var F;
          return [T && I("div", {
            key: "image",
            class: "v-card__image"
          }, [a.image ? C(ke, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, a.image) : C(Va, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), C(Dl, {
            name: "v-card",
            active: !!e.loading,
            color: b.value
          }, {
            default: a.loader
          }), _ && C(_m, {
            key: "item",
            prependAvatar: e.prependAvatar,
            prependIcon: e.prependIcon,
            title: e.title,
            subtitle: e.subtitle,
            appendAvatar: e.appendAvatar,
            appendIcon: e.appendIcon
          }, {
            default: a.item,
            prepend: a.prepend,
            title: a.title,
            subtitle: a.subtitle,
            append: a.append
          }), B && C(Dm, {
            key: "text"
          }, {
            default: () => {
              var D;
              return [((D = a.text) == null ? void 0 : D.call(a)) ?? e.text];
            }
          }), (F = a.default) == null ? void 0 : F.call(a), a.actions && C(Pm, null, {
            default: a.actions
          }), Ut(y, "v-card")];
        }
      }), [[Tt, y && e.ripple]]);
    }), {};
  }
}), Om = O({
  fluid: {
    type: Boolean,
    default: !1
  },
  ...re(),
  ...ft(),
  ...he()
}, "VContainer"), kg = U()({
  name: "VContainer",
  props: Om(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      rtlClasses: a
    } = tt(), {
      dimensionStyles: l
    } = vt(e);
    return J(() => C(e.tag, {
      class: Q(["v-container", {
        "v-container--fluid": e.fluid
      }, a.value, e.class]),
      style: oe([l.value, e.style])
    }, n)), {};
  }
}), Ws = pa.reduce((e, t) => (e[t] = {
  type: [Boolean, String, Number],
  default: !1
}, e), {}), js = pa.reduce((e, t) => {
  const n = "offset" + dn(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), Gs = pa.reduce((e, t) => {
  const n = "order" + dn(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), io = {
  col: Object.keys(Ws),
  offset: Object.keys(js),
  order: Object.keys(Gs)
};
function Lm(e, t, n) {
  let a = e;
  if (!(n == null || n === !1)) {
    if (t) {
      const l = t.replace(e, "");
      a += `-${l}`;
    }
    return e === "col" && (a = "v-" + a), e === "col" && (n === "" || n === !0) || (a += `-${n}`), a.toLowerCase();
  }
}
const Mm = ["auto", "start", "end", "center", "baseline", "stretch"], $m = O({
  cols: {
    type: [Boolean, String, Number],
    default: !1
  },
  ...Ws,
  offset: {
    type: [String, Number],
    default: null
  },
  ...js,
  order: {
    type: [String, Number],
    default: null
  },
  ...Gs,
  alignSelf: {
    type: String,
    default: null,
    validator: (e) => Mm.includes(e)
  },
  ...re(),
  ...he()
}, "VCol"), Cg = U()({
  name: "VCol",
  props: $m(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = V(() => {
      const l = [];
      let i;
      for (i in io)
        io[i].forEach((r) => {
          const s = e[r], u = Lm(i, r, s);
          u && l.push(u);
        });
      const o = l.some((r) => r.startsWith("v-col-"));
      return l.push({
        // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
        "v-col": !o || !e.cols,
        [`v-col-${e.cols}`]: e.cols,
        [`offset-${e.offset}`]: e.offset,
        [`order-${e.order}`]: e.order,
        [`align-self-${e.alignSelf}`]: e.alignSelf
      }), l;
    });
    return () => {
      var l;
      return Gt(e.tag, {
        class: [a.value, e.class],
        style: e.style
      }, (l = n.default) == null ? void 0 : l.call(n));
    };
  }
}), jl = ["start", "end", "center"], Ys = ["space-between", "space-around", "space-evenly"];
function Gl(e, t) {
  return pa.reduce((n, a) => {
    const l = e + dn(a);
    return n[l] = t(), n;
  }, {});
}
const Rm = [...jl, "baseline", "stretch"], Us = (e) => Rm.includes(e), Ks = Gl("align", () => ({
  type: String,
  default: null,
  validator: Us
})), Nm = [...jl, ...Ys], Xs = (e) => Nm.includes(e), qs = Gl("justify", () => ({
  type: String,
  default: null,
  validator: Xs
})), Hm = [...jl, ...Ys, "stretch"], Zs = (e) => Hm.includes(e), Qs = Gl("alignContent", () => ({
  type: String,
  default: null,
  validator: Zs
})), oo = {
  align: Object.keys(Ks),
  justify: Object.keys(qs),
  alignContent: Object.keys(Qs)
}, zm = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function Wm(e, t, n) {
  let a = zm[e];
  if (n != null) {
    if (t) {
      const l = t.replace(e, "");
      a += `-${l}`;
    }
    return a += `-${n}`, a.toLowerCase();
  }
}
const jm = O({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: Us
  },
  ...Ks,
  justify: {
    type: String,
    default: null,
    validator: Xs
  },
  ...qs,
  alignContent: {
    type: String,
    default: null,
    validator: Zs
  },
  ...Qs,
  ...re(),
  ...he()
}, "VRow"), pg = U()({
  name: "VRow",
  props: jm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = V(() => {
      const l = [];
      let i;
      for (i in oo)
        oo[i].forEach((o) => {
          const r = e[o], s = Wm(i, o, r);
          s && l.push(s);
        });
      return l.push({
        "v-row--no-gutters": e.noGutters,
        "v-row--dense": e.dense,
        [`align-${e.align}`]: e.align,
        [`justify-${e.justify}`]: e.justify,
        [`align-content-${e.alignContent}`]: e.alignContent
      }), l;
    });
    return () => {
      var l;
      return Gt(e.tag, {
        class: ["v-row", a.value, e.class],
        style: e.style
      }, (l = n.default) == null ? void 0 : l.call(n));
    };
  }
}), Vg = ka("v-spacer", "div", "VSpacer"), Gm = ka("v-alert-title"), Ym = O({
  iconSize: [Number, String],
  iconSizes: {
    type: Array,
    default: () => [["x-small", 10], ["small", 16], ["default", 24], ["large", 28], ["x-large", 32]]
  }
}, "iconSize");
function Um(e, t) {
  return {
    iconSize: V(() => {
      const a = new Map(e.iconSizes), l = e.iconSize ?? t() ?? "default";
      return a.has(l) ? a.get(l) : l;
    })
  };
}
const Km = ["success", "info", "warning", "error"], Xm = O({
  border: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["top", "end", "bottom", "start"].includes(e)
  },
  borderColor: String,
  closable: Boolean,
  closeIcon: {
    type: se,
    default: "$close"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  icon: {
    type: [Boolean, String, Function, Object],
    default: null
  },
  modelValue: {
    type: Boolean,
    default: !0
  },
  prominent: Boolean,
  title: String,
  text: String,
  type: {
    type: String,
    validator: (e) => Km.includes(e)
  },
  ...re(),
  ...We(),
  ...ft(),
  ...wt(),
  ...Ym(),
  ...gn(),
  ...Nn(),
  ...Ue(),
  ...he(),
  ...Ce(),
  ...St({
    variant: "flat"
  })
}, "VAlert"), Pg = U()({
  name: "VAlert",
  props: Xm(),
  emits: {
    "click:close": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      emit: n,
      slots: a
    } = t;
    const l = fe(e, "modelValue"), i = E(() => {
      if (e.icon !== !1)
        return e.type ? e.icon ?? `$${e.type}` : e.icon;
    }), {
      iconSize: o
    } = Um(e, () => e.prominent ? 44 : void 0), {
      themeClasses: r
    } = Ae(e), {
      colorClasses: s,
      colorStyles: u,
      variantClasses: c
    } = Kt(() => ({
      color: e.color ?? e.type,
      variant: e.variant
    })), {
      densityClasses: d
    } = mt(e), {
      dimensionStyles: f
    } = vt(e), {
      elevationClasses: v
    } = pt(e), {
      locationStyles: g
    } = Rn(e), {
      positionClasses: m
    } = Hn(e), {
      roundedClasses: w
    } = qe(e), {
      textColorClasses: b,
      textColorStyles: h
    } = dt(() => e.borderColor), {
      t: y
    } = yt(), x = E(() => ({
      "aria-label": y(e.closeLabel),
      onClick(p) {
        l.value = !1, n("click:close", p);
      }
    }));
    return () => {
      const p = !!(a.prepend || i.value), k = !!(a.title || e.title), P = !!(a.close || e.closable), S = {
        density: e.density,
        icon: i.value,
        size: e.iconSize || e.prominent ? o.value : void 0
      };
      return l.value && C(e.tag, {
        class: Q(["v-alert", e.border && {
          "v-alert--border": !!e.border,
          [`v-alert--border-${e.border === !0 ? "start" : e.border}`]: !0
        }, {
          "v-alert--prominent": e.prominent
        }, r.value, s.value, d.value, v.value, m.value, w.value, c.value, e.class]),
        style: oe([u.value, f.value, g.value, e.style]),
        role: "alert"
      }, {
        default: () => {
          var A, T;
          return [Ut(!1, "v-alert"), e.border && I("div", {
            key: "border",
            class: Q(["v-alert__border", b.value]),
            style: oe(h.value)
          }, null), p && I("div", {
            key: "prepend",
            class: "v-alert__prepend"
          }, [a.prepend ? C(ke, {
            key: "prepend-defaults",
            disabled: !i.value,
            defaults: {
              VIcon: {
                ...S
              }
            }
          }, a.prepend) : C(Ve, j({
            key: "prepend-icon"
          }, S), null)]), I("div", {
            class: "v-alert__content"
          }, [k && C(Gm, {
            key: "title"
          }, {
            default: () => {
              var _;
              return [((_ = a.title) == null ? void 0 : _.call(a)) ?? e.title];
            }
          }), ((A = a.text) == null ? void 0 : A.call(a)) ?? e.text, (T = a.default) == null ? void 0 : T.call(a)]), a.append && I("div", {
            key: "append",
            class: "v-alert__append"
          }, [a.append()]), P && I("div", {
            key: "close",
            class: "v-alert__close"
          }, [a.close ? C(ke, {
            key: "close-defaults",
            defaults: {
              VBtn: {
                icon: e.closeIcon,
                size: "x-small",
                variant: "text"
              }
            }
          }, {
            default: () => {
              var _;
              return [(_ = a.close) == null ? void 0 : _.call(a, {
                props: x.value
              })];
            }
          }) : C(lt, j({
            key: "close-btn",
            icon: e.closeIcon,
            size: "x-small",
            variant: "text"
          }, x.value), null)])];
        }
      });
    };
  }
}), qm = O({
  color: String,
  ...bt(),
  ...re(),
  ...ft(),
  ...wt(),
  ...gn(),
  ...Nn(),
  ...Ue(),
  ...he(),
  ...Ce()
}, "VSheet"), Ig = U()({
  name: "VSheet",
  props: qm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = Ae(e), {
      backgroundColorClasses: l,
      backgroundColorStyles: i
    } = Xe(() => e.color), {
      borderClasses: o
    } = Ct(e), {
      dimensionStyles: r
    } = vt(e), {
      elevationClasses: s
    } = pt(e), {
      locationStyles: u
    } = Rn(e), {
      positionClasses: c
    } = Hn(e), {
      roundedClasses: d
    } = qe(e);
    return J(() => C(e.tag, {
      class: Q(["v-sheet", a.value, l.value, o.value, s.value, c.value, d.value, e.class]),
      style: oe([i.value, r.value, u.value, e.style])
    }, n)), {};
  }
}), Yl = Symbol.for("vuetify:v-tabs"), Js = O({
  fixed: Boolean,
  sliderColor: String,
  sliderTransition: String,
  sliderTransitionDuration: [String, Number],
  hideSlider: Boolean,
  inset: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ..._e(Fl({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab"), Zm = U()({
  name: "VTab",
  props: Js(),
  setup(e, t) {
    let {
      slots: n,
      attrs: a
    } = t;
    const {
      textColorClasses: l,
      textColorStyles: i
    } = dt(() => e.sliderColor), {
      backgroundColorClasses: o,
      backgroundColorStyles: r
    } = Xe(() => e.sliderColor), s = K(), u = K(), c = V(() => e.direction === "horizontal"), d = V(() => {
      var w, b;
      return ((b = (w = s.value) == null ? void 0 : w.group) == null ? void 0 : b.isSelected.value) ?? !1;
    });
    function f(w, b) {
      return {
        opacity: [0, 1]
      };
    }
    function v(w, b) {
      return e.direction === "vertical" ? {
        transform: ["scaleY(0)", "scaleY(1)"]
      } : {
        transform: ["scaleX(0)", "scaleX(1)"]
      };
    }
    function g(w, b) {
      const h = b.getBoundingClientRect(), y = w.getBoundingClientRect(), x = c.value ? "x" : "y", p = c.value ? "X" : "Y", k = c.value ? "right" : "bottom", P = c.value ? "width" : "height", S = h[x], A = y[x], T = S > A ? h[k] - y[k] : h[x] - y[x], _ = Math.sign(T) > 0 ? c.value ? "right" : "bottom" : Math.sign(T) < 0 ? c.value ? "left" : "top" : "center", F = (Math.abs(T) + (Math.sign(T) < 0 ? h[P] : y[P])) / Math.max(h[P], y[P]) || 0, D = h[P] / y[P] || 0, L = 1.5;
      return {
        transform: [`translate${p}(${T}px) scale${p}(${D})`, `translate${p}(${T / L}px) scale${p}(${(F - 1) / L + 1})`, "none"],
        transformOrigin: Array(3).fill(_)
      };
    }
    function m(w) {
      var h, y;
      let {
        value: b
      } = w;
      if (b) {
        const x = (y = (h = s.value) == null ? void 0 : h.$el.parentElement) == null ? void 0 : y.querySelector(".v-tab--selected .v-tab__slider"), p = u.value;
        if (!x || !p) return;
        const k = getComputedStyle(x).color, P = {
          fade: f,
          grow: v,
          shift: g
        }[e.sliderTransition ?? "shift"] ?? g, S = Number(e.sliderTransitionDuration) || ({
          fade: 400,
          grow: 350,
          shift: 225
        }[e.sliderTransition ?? "shift"] ?? 225);
        It(p, {
          backgroundColor: [k, "currentcolor"],
          ...P(p, x)
        }, {
          duration: S,
          easing: kn
        });
      }
    }
    return J(() => {
      const w = lt.filterProps(e);
      return C(lt, j({
        symbol: Yl,
        ref: s,
        class: ["v-tab", e.class, d.value && e.inset ? o.value : []],
        style: [e.style, d.value && e.inset ? r.value : []],
        tabindex: d.value ? 0 : -1,
        role: "tab",
        "aria-selected": String(d.value),
        active: !1
      }, w, a, {
        block: e.fixed,
        maxWidth: e.fixed ? 300 : void 0,
        "onGroup:selected": m
      }), {
        ...n,
        default: () => {
          var b;
          return I(de, null, [((b = n.default) == null ? void 0 : b.call(n)) ?? e.text, !e.hideSlider && I("div", {
            ref: u,
            class: Q(["v-tab__slider", l.value]),
            style: oe(i.value)
          }, null)]);
        }
      });
    }), Vt({}, s);
  }
}), Qm = O({
  ..._e(Rr(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VTabsWindow"), Jm = U()({
  name: "VTabsWindow",
  props: Qm(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = ge(Yl, null), l = fe(e, "modelValue"), i = V({
      get() {
        var o;
        return l.value != null || !a ? l.value : (o = a.items.value.find((r) => a.selected.value.includes(r.id))) == null ? void 0 : o.value;
      },
      set(o) {
        l.value = o;
      }
    });
    return J(() => {
      const o = eo.filterProps(e);
      return C(eo, j({
        _as: "VTabsWindow"
      }, o, {
        modelValue: i.value,
        "onUpdate:modelValue": (r) => i.value = r,
        class: ["v-tabs-window", e.class],
        style: e.style,
        mandatory: !1,
        touch: !1
      }), n);
    }), {};
  }
}), eg = O({
  ...Nr()
}, "VTabsWindowItem"), tg = U()({
  name: "VTabsWindowItem",
  props: eg(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return J(() => {
      const a = to.filterProps(e);
      return C(to, j({
        _as: "VTabsWindowItem"
      }, a, {
        class: ["v-tabs-window-item", e.class],
        style: e.style
      }), n);
    }), {};
  }
});
function ng(e) {
  return e ? e.map((t) => wn(t) ? t : {
    text: t,
    value: t
  }) : [];
}
const ag = O({
  alignTabs: {
    type: String,
    default: "start"
  },
  color: String,
  fixedTabs: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  stacked: Boolean,
  bgColor: String,
  grow: Boolean,
  height: {
    type: [Number, String],
    default: void 0
  },
  hideSlider: Boolean,
  inset: Boolean,
  insetPadding: [String, Number],
  insetRadius: [String, Number],
  sliderColor: String,
  ...Bt(Js(), ["spaced", "sliderTransition", "sliderTransitionDuration"]),
  ...Hl({
    mandatory: "force",
    selectedClass: "v-tab-item--selected"
  }),
  ...We(),
  ...he()
}, "VTabs"), Ag = U()({
  name: "VTabs",
  props: ag(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const l = fe(e, "modelValue"), i = V(() => ng(e.items)), {
      densityClasses: o
    } = mt(e), {
      backgroundColorClasses: r,
      backgroundColorStyles: s
    } = Xe(() => e.bgColor), {
      scopeId: u
    } = mn();
    return ot({
      VTab: {
        color: E(e, "color"),
        direction: E(e, "direction"),
        stacked: E(e, "stacked"),
        fixed: E(e, "fixedTabs"),
        inset: E(e, "inset"),
        sliderColor: E(e, "sliderColor"),
        sliderTransition: E(e, "sliderTransition"),
        sliderTransitionDuration: E(e, "sliderTransitionDuration"),
        hideSlider: E(e, "hideSlider")
      }
    }), J(() => {
      const c = da.filterProps(e), d = !!(a.window || e.items.length > 0);
      return I(de, null, [C(da, j(c, {
        modelValue: l.value,
        "onUpdate:modelValue": (f) => l.value = f,
        class: ["v-tabs", `v-tabs--${e.direction}`, `v-tabs--align-tabs-${e.alignTabs}`, {
          "v-tabs--fixed-tabs": e.fixedTabs,
          "v-tabs--grow": e.grow,
          "v-tabs--inset": e.inset,
          "v-tabs--stacked": e.stacked
        }, o.value, r.value, e.class],
        style: [{
          "--v-tabs-height": X(e.height),
          "--v-tabs-inset-padding": e.inset ? X(e.insetPadding) : void 0,
          "--v-tabs-inset-radius": e.inset ? X(e.insetRadius) : void 0
        }, s.value, e.style],
        role: "tablist",
        symbol: Yl
      }, u, n), {
        default: a.default ?? (() => i.value.map((f) => {
          var v;
          return ((v = a.tab) == null ? void 0 : v.call(a, {
            item: f
          })) ?? C(Zm, j(f, {
            key: f.text,
            value: f.value,
            spaced: e.spaced
          }), {
            default: a[`tab.${f.value}`] ? () => {
              var g;
              return (g = a[`tab.${f.value}`]) == null ? void 0 : g.call(a, {
                item: f
              });
            } : void 0
          });
        })),
        prev: a.prev,
        next: a.next
      }), d && C(Jm, j({
        modelValue: l.value,
        "onUpdate:modelValue": (f) => l.value = f,
        key: "tabs-window"
      }, u), {
        default: () => {
          var f;
          return [i.value.map((v) => {
            var g;
            return ((g = a.item) == null ? void 0 : g.call(a, {
              item: v
            })) ?? C(tg, {
              value: v.value
            }, {
              default: () => {
                var m;
                return (m = a[`item.${v.value}`]) == null ? void 0 : m.call(a, {
                  item: v
                });
              }
            });
          }), (f = a.window) == null ? void 0 : f.call(a)];
        }
      })]);
    }), {};
  }
}), lg = O({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: Boolean,
  search: String,
  ...Ns({
    filterKeys: ["title"]
  }),
  ...as(),
  ..._e(Rl({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty"])
}, "VAutocomplete"), Tg = U()({
  name: "VAutocomplete",
  props: lg(),
  emits: {
    "update:focused": (e) => !0,
    "update:search": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:menu": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      t: a
    } = yt(), l = K(), i = G(!1), o = G(!0), r = G(!1), s = K(), u = K(), c = G(-1), d = G(null), {
      items: f,
      transformIn: v,
      transformOut: g
    } = mr(e), {
      textColorClasses: m,
      textColorStyles: w
    } = dt(() => {
      var H;
      return (H = l.value) == null ? void 0 : H.color;
    }), {
      InputIcon: b
    } = Da(e), h = fe(e, "search", ""), y = fe(e, "modelValue", [], (H) => v(H === null ? [null] : Me(H)), (H) => {
      const ne = g(H);
      return e.multiple ? ne : ne[0] ?? null;
    }), x = V(() => typeof e.counterValue == "function" ? e.counterValue(y.value) : typeof e.counterValue == "number" ? e.counterValue : y.value.length), p = Ml(e), {
      filteredItems: k,
      getMatches: P
    } = Hs(e, f, () => d.value ?? (o.value ? "" : h.value)), S = V(() => e.hideSelected && d.value === null ? k.value.filter((H) => !y.value.some((ne) => ne.value === H.value)) : k.value), A = E(() => e.closableChips && !p.isReadonly.value && !p.isDisabled.value), T = V(() => !!(e.chips || n.chip)), _ = V(() => T.value || !!n.selection), B = V(() => y.value.map((H) => H.props.value)), F = V(() => S.value.find((H) => H.type === "item" && !H.props.disabled)), D = V(() => {
      var ne;
      return (e.autoSelectFirst === !0 || e.autoSelectFirst === "exact" && h.value === ((ne = F.value) == null ? void 0 : ne.title)) && S.value.length > 0 && !o.value && !r.value;
    }), L = V(() => e.hideNoData && !S.value.length || p.isReadonly.value || p.isDisabled.value), Y = fe(e, "menu"), z = V({
      get: () => Y.value,
      set: (H) => {
        var ne;
        Y.value && !H && ((ne = s.value) != null && ne.ΨopenChildren.size) || H && L.value || (Y.value = H);
      }
    }), {
      menuId: ee,
      ariaExpanded: ie,
      ariaControls: $
    } = ns(e, z), Z = K(), M = ts(Z, l);
    function N(H) {
      e.openOnClear && (z.value = !0), h.value = "";
    }
    function te() {
      L.value || (z.value = !0);
    }
    function W(H) {
      L.value || (i.value && (H.preventDefault(), H.stopPropagation()), z.value = !z.value);
    }
    function ae(H) {
      var ne;
      (ea(H) || H.key === "Backspace") && ((ne = l.value) == null || ne.focus());
    }
    function R(H) {
      var Ee, je, xe, Re, Ze;
      if (p.isReadonly.value) return;
      const ne = (Ee = l.value) == null ? void 0 : Ee.selectionStart, ce = y.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(H.key) && H.preventDefault(), ["Enter", "ArrowDown"].includes(H.key) && (z.value = !0), ["Escape"].includes(H.key) && (z.value = !1), D.value && ["Enter", "Tab"].includes(H.key) && F.value && !y.value.some((Ne) => {
        let {
          value: we
        } = Ne;
        return we === F.value.value;
      }) && be(F.value), H.key === "ArrowDown" && D.value && ((je = Z.value) == null || je.focus("next")), ["Backspace", "Delete"].includes(H.key)) {
        if (!e.multiple && _.value && y.value.length > 0 && !h.value) return be(y.value[0], !1);
        if (~c.value) {
          H.preventDefault();
          const Ne = c.value;
          be(y.value[c.value], !1), c.value = Ne >= ce - 1 ? ce - 2 : Ne;
        } else H.key === "Backspace" && !h.value && (c.value = ce - 1);
        return;
      }
      if (e.multiple)
        if (H.key === "ArrowLeft") {
          if (c.value < 0 && ne && ne > 0) return;
          const Ne = c.value > -1 ? c.value - 1 : ce - 1;
          if (y.value[Ne])
            c.value = Ne;
          else {
            const we = ((xe = h.value) == null ? void 0 : xe.length) ?? null;
            c.value = -1, (Re = l.value) == null || Re.setSelectionRange(we, we);
          }
        } else if (H.key === "ArrowRight") {
          if (c.value < 0) return;
          const Ne = c.value + 1;
          y.value[Ne] ? c.value = Ne : (c.value = -1, (Ze = l.value) == null || Ze.setSelectionRange(0, 0));
        } else ~c.value && ea(H) && (c.value = -1);
    }
    function le(H) {
      if (an(l.value, ":autofill") || an(l.value, ":-webkit-autofill")) {
        const ne = f.value.find((ce) => ce.title === H.target.value);
        ne && be(ne);
      }
    }
    function ve() {
      var H;
      e.eager && ((H = u.value) == null || H.calculateVisibleItems());
    }
    function Se() {
      var H;
      i.value && (o.value = !0, (H = l.value) == null || H.focus()), d.value = null;
    }
    function Fe(H) {
      i.value = !0, setTimeout(() => {
        r.value = !0;
      });
    }
    function ue(H) {
      r.value = !1;
    }
    function Be(H) {
      (H == null || H === "" && !e.multiple && !_.value) && (y.value = []);
    }
    const Te = G(!1);
    function be(H) {
      let ne = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!(!H || H.props.disabled))
        if (e.multiple) {
          const ce = y.value.findIndex((je) => (e.valueComparator || Ke)(je.value, H.value)), Ee = ne ?? !~ce;
          if (~ce) {
            const je = Ee ? [...y.value, H] : [...y.value];
            je.splice(ce, 1), y.value = je;
          } else Ee && (y.value = [...y.value, H]);
          e.clearOnSelect && (h.value = "");
        } else {
          const ce = ne !== !1;
          y.value = ce ? [H] : [], d.value = o.value ? "" : h.value ?? "", h.value = ce && !_.value ? H.title : "", me(() => {
            z.value = !1, o.value = !0;
          });
        }
    }
    return q(i, (H, ne) => {
      var ce;
      H !== ne && (H ? (Te.value = !0, h.value = e.multiple || _.value ? "" : String(((ce = y.value.at(-1)) == null ? void 0 : ce.props.title) ?? ""), o.value = !0, me(() => Te.value = !1)) : (!e.multiple && h.value == null && (y.value = []), z.value = !1, !o.value && h.value && (d.value = h.value), h.value = "", c.value = -1));
    }), q(h, (H) => {
      !i.value || Te.value || (H && (z.value = !0), o.value = !H);
    }), q(z, (H) => {
      if (!e.hideSelected && H && y.value.length && o.value) {
        const ne = S.value.findIndex((ce) => y.value.some((Ee) => ce.value === Ee.value));
        ye && window.requestAnimationFrame(() => {
          var ce;
          ne >= 0 && ((ce = u.value) == null || ce.scrollToIndex(ne));
        });
      }
      H && (d.value = null);
    }), q(f, (H, ne) => {
      z.value || i.value && !ne.length && H.length && (z.value = !0);
    }), J(() => {
      const H = !!(!e.hideNoData || S.value.length || n["prepend-item"] || n["append-item"] || n["no-data"]), ne = y.value.length > 0, ce = ca.filterProps(e);
      return C(ca, j({
        ref: l
      }, ce, {
        modelValue: h.value,
        "onUpdate:modelValue": [(Ee) => h.value = Ee, Be],
        focused: i.value,
        "onUpdate:focused": (Ee) => i.value = Ee,
        validationValue: y.externalValue,
        counterValue: x.value,
        dirty: ne,
        onChange: le,
        class: ["v-autocomplete", `v-autocomplete--${e.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": z.value,
          "v-autocomplete--chips": !!e.chips,
          "v-autocomplete--selection-slot": !!_.value,
          "v-autocomplete--selecting-index": c.value > -1
        }, e.class],
        style: e.style,
        readonly: p.isReadonly.value,
        placeholder: ne ? void 0 : e.placeholder,
        "onClick:clear": N,
        "onMousedown:control": te,
        onKeydown: R,
        "aria-expanded": ie.value,
        "aria-controls": $.value
      }), {
        ...n,
        default: (Ee) => {
          let {
            id: je
          } = Ee;
          return I(de, null, [C(Lr, j({
            id: ee.value,
            ref: s,
            modelValue: z.value,
            "onUpdate:modelValue": (xe) => z.value = xe,
            activator: "parent",
            contentClass: "v-autocomplete__content",
            disabled: L.value,
            eager: e.eager,
            maxHeight: 310,
            openOnClick: !1,
            closeOnContentClick: !1,
            onAfterEnter: ve,
            onAfterLeave: Se
          }, e.menuProps), {
            default: () => [H && C(hr, j({
              ref: Z,
              filterable: !0,
              selected: B.value,
              selectStrategy: e.multiple ? "independent" : "single-independent",
              onMousedown: (xe) => xe.preventDefault(),
              onKeydown: ae,
              onFocusin: Fe,
              onFocusout: ue,
              tabindex: "-1",
              selectable: !0,
              "aria-live": "polite",
              "aria-labelledby": `${je.value}-label`,
              "aria-multiselectable": e.multiple,
              color: e.itemColor ?? e.color
            }, M, e.listProps), {
              default: () => {
                var xe, Re, Ze;
                return [(xe = n["prepend-item"]) == null ? void 0 : xe.call(n), !S.value.length && !e.hideNoData && (((Re = n["no-data"]) == null ? void 0 : Re.call(n)) ?? C(sn, {
                  key: "no-data",
                  title: a(e.noDataText)
                }, null)), C(es, {
                  ref: u,
                  renderless: !0,
                  items: S.value,
                  itemKey: "value"
                }, {
                  default: (Ne) => {
                    var Kl, Xl, ql;
                    let {
                      item: we,
                      index: st,
                      itemRef: nt
                    } = Ne;
                    const Ul = j(we.props, {
                      ref: nt,
                      key: we.value,
                      active: D.value && we === F.value ? !0 : void 0,
                      onClick: () => be(we, null),
                      "aria-posinset": st + 1,
                      "aria-setsize": S.value.length
                    });
                    return we.type === "divider" ? ((Kl = n.divider) == null ? void 0 : Kl.call(n, {
                      props: we.raw,
                      index: st
                    })) ?? C($n, j(we.props, {
                      key: `divider-${st}`
                    }), null) : we.type === "subheader" ? ((Xl = n.subheader) == null ? void 0 : Xl.call(n, {
                      props: we.raw,
                      index: st
                    })) ?? C(_l, j(we.props, {
                      key: `subheader-${st}`
                    }), null) : ((ql = n.item) == null ? void 0 : ql.call(n, {
                      item: we,
                      index: st,
                      props: Ul
                    })) ?? C(sn, j(Ul, {
                      role: "option"
                    }), {
                      prepend: (zn) => {
                        let {
                          isSelected: eu
                        } = zn;
                        return I(de, null, [e.multiple && !e.hideSelected ? C(Lt, {
                          key: we.value,
                          modelValue: eu,
                          ripple: !1,
                          tabindex: "-1",
                          "aria-hidden": !0,
                          onClick: (tu) => tu.preventDefault()
                        }, null) : void 0, we.props.prependAvatar && C(Ot, {
                          image: we.props.prependAvatar
                        }, null), we.props.prependIcon && C(Ve, {
                          icon: we.props.prependIcon
                        }, null)]);
                      },
                      title: () => {
                        var zn;
                        return o.value ? we.title : km("v-autocomplete", we.title, (zn = P(we)) == null ? void 0 : zn.title);
                      }
                    });
                  }
                }), (Ze = n["append-item"]) == null ? void 0 : Ze.call(n)];
              }
            })]
          }), y.value.map((xe, Re) => {
            function Ze(nt) {
              nt.stopPropagation(), nt.preventDefault(), be(xe, !1);
            }
            const Ne = j(_n.filterProps(xe.props), {
              "onClick:close": Ze,
              onKeydown(nt) {
                nt.key !== "Enter" && nt.key !== " " || (nt.preventDefault(), nt.stopPropagation(), Ze(nt));
              },
              onMousedown(nt) {
                nt.preventDefault(), nt.stopPropagation();
              },
              modelValue: !0,
              "onUpdate:modelValue": void 0
            }), we = T.value ? !!n.chip : !!n.selection, st = we ? bl(T.value ? n.chip({
              item: xe,
              index: Re,
              props: Ne
            }) : n.selection({
              item: xe,
              index: Re
            })) : void 0;
            if (!(we && !st))
              return I("div", {
                key: xe.value,
                class: Q(["v-autocomplete__selection", Re === c.value && ["v-autocomplete__selection--selected", m.value]]),
                style: oe(Re === c.value ? w.value : {})
              }, [T.value ? n.chip ? C(ke, {
                key: "chip-defaults",
                defaults: {
                  VChip: {
                    closable: A.value,
                    size: "small",
                    text: xe.title
                  }
                }
              }, {
                default: () => [st]
              }) : C(_n, j({
                key: "chip",
                closable: A.value,
                size: "small",
                text: xe.title,
                disabled: xe.props.disabled
              }, Ne), null) : st ?? I("span", {
                class: "v-autocomplete__selection-text"
              }, [xe.title, e.multiple && Re < y.value.length - 1 && I("span", {
                class: "v-autocomplete__selection-comma"
              }, [Qn(",")])])]);
          })]);
        },
        "append-inner": function() {
          var Re, Ze;
          for (var Ee = arguments.length, je = new Array(Ee), xe = 0; xe < Ee; xe++)
            je[xe] = arguments[xe];
          return I(de, null, [(Re = n["append-inner"]) == null ? void 0 : Re.call(n, ...je), e.menuIcon ? C(Ve, {
            class: "v-autocomplete__menu-icon",
            color: (Ze = l.value) == null ? void 0 : Ze.fieldIconColor,
            icon: e.menuIcon,
            onMousedown: W,
            onClick: xu,
            "aria-hidden": !0,
            tabindex: "-1"
          }, null) : void 0, e.appendInnerIcon && C(b, {
            key: "append-icon",
            name: "appendInner",
            color: je[0].iconColor.value
          }, null)]);
        }
      });
    }), Vt({
      isFocused: i,
      isPristine: o,
      menu: z,
      search: h,
      filteredItems: k,
      select: be
    }, l);
  }
}), ig = O({
  autoGrow: Boolean,
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: Function,
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  noResize: Boolean,
  rows: {
    type: [Number, String],
    default: 5,
    validator: (e) => !isNaN(parseFloat(e))
  },
  maxHeight: {
    type: [Number, String],
    validator: (e) => !isNaN(parseFloat(e))
  },
  maxRows: {
    type: [Number, String],
    validator: (e) => !isNaN(parseFloat(e))
  },
  suffix: String,
  modelModifiers: Object,
  ...Gr(),
  ...Oa(),
  ...Ll()
}, "VTextarea"), Eg = U()({
  name: "VTextarea",
  directives: {
    vIntersect: rn
  },
  inheritAttrs: !1,
  props: ig(),
  emits: {
    "click:control": (e) => !0,
    "mousedown:control": (e) => !0,
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:rows": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: a,
      slots: l
    } = t;
    const i = fe(e, "modelValue"), {
      isFocused: o,
      focus: r,
      blur: s
    } = Fa(e), {
      onIntersect: u
    } = Yr(e), c = V(() => typeof e.counterValue == "function" ? e.counterValue(i.value) : (i.value || "").toString().length), d = V(() => {
      if (n.maxlength) return n.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), f = K(), v = K(), g = G(""), m = K(), w = K(0), {
      platform: b
    } = Et(), h = $l(e), y = V(() => e.persistentPlaceholder || o.value || e.active);
    function x() {
      var D;
      h.isSuppressing.value && h.update(), m.value !== document.activeElement && ((D = m.value) == null || D.focus()), o.value || r();
    }
    function p(D) {
      x(), a("click:control", D);
    }
    function k(D) {
      a("mousedown:control", D);
    }
    function P(D) {
      D.stopPropagation(), x(), me(() => {
        i.value = "", xa(e["onClick:clear"], D);
      });
    }
    function S(D) {
      var ie;
      const L = D.target;
      if (!((ie = e.modelModifiers) != null && ie.trim)) {
        i.value = L.value;
        return;
      }
      const Y = L.value, z = L.selectionStart, ee = L.selectionEnd;
      i.value = Y, me(() => {
        let $ = 0;
        Y.trimStart().length === L.value.length && ($ = Y.length - L.value.length), z != null && (L.selectionStart = z - $), ee != null && (L.selectionEnd = ee - $);
      });
    }
    const A = K(), T = K(Number(e.rows)), _ = V(() => ["plain", "underlined"].includes(e.variant));
    Le(() => {
      e.autoGrow || (T.value = Number(e.rows));
    });
    function B() {
      me(() => {
        if (!m.value) return;
        if (b.value.firefox) {
          w.value = 12;
          return;
        }
        const {
          offsetWidth: D,
          clientWidth: L
        } = m.value;
        w.value = Math.max(0, D - L);
      }), e.autoGrow && me(() => {
        if (!A.value || !v.value) return;
        const D = getComputedStyle(A.value), L = getComputedStyle(v.value.$el), Y = parseFloat(D.getPropertyValue("--v-field-padding-top")) + parseFloat(D.getPropertyValue("--v-input-padding-top")) + parseFloat(D.getPropertyValue("--v-field-padding-bottom")), z = A.value.scrollHeight, ee = parseFloat(D.lineHeight), ie = Math.max(parseFloat(e.rows) * ee + Y, parseFloat(L.getPropertyValue("--v-input-control-height"))), $ = e.maxHeight ? parseFloat(e.maxHeight) : parseFloat(e.maxRows) * ee + Y || 1 / 0, Z = $e(z ?? 0, ie, $);
        T.value = Math.floor((Z - Y) / ee), g.value = X(Z);
      });
    }
    gt(B), q(i, B), q(() => e.rows, B), q(() => e.maxHeight, B), q(() => e.maxRows, B), q(() => e.density, B), q(T, (D) => {
      a("update:rows", D);
    });
    let F;
    return q(A, (D) => {
      D ? (F = new ResizeObserver(B), F.observe(A.value)) : F == null || F.disconnect();
    }), et(() => {
      F == null || F.disconnect();
    }), J(() => {
      const D = !!(l.counter || e.counter || e.counterValue), L = !!(D || l.details), [Y, z] = wa(n), {
        modelValue: ee,
        ...ie
      } = cn.filterProps(e), $ = {
        ...ua.filterProps(e),
        "onClick:clear": P
      };
      return C(cn, j({
        ref: f,
        modelValue: i.value,
        "onUpdate:modelValue": (Z) => i.value = Z,
        class: ["v-textarea v-text-field", {
          "v-textarea--prefixed": e.prefix,
          "v-textarea--suffixed": e.suffix,
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-textarea--auto-grow": e.autoGrow,
          "v-textarea--no-resize": e.noResize || e.autoGrow,
          "v-input--plain-underlined": _.value
        }, e.class],
        style: [{
          "--v-textarea-max-height": e.maxHeight ? X(e.maxHeight) : void 0,
          "--v-textarea-scroll-bar-width": X(w.value)
        }, e.style]
      }, Y, ie, {
        centerAffix: T.value === 1 && !_.value,
        focused: o.value
      }), {
        ...l,
        default: (Z) => {
          let {
            id: M,
            isDisabled: N,
            isDirty: te,
            isReadonly: W,
            isValid: ae,
            hasDetails: R
          } = Z;
          return C(ua, j({
            ref: v,
            style: {
              "--v-textarea-control-height": g.value
            },
            onClick: p,
            onMousedown: k,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"]
          }, $, {
            id: M.value,
            active: y.value || te.value,
            labelId: `${M.value}-label`,
            centerAffix: T.value === 1 && !_.value,
            dirty: te.value || e.dirty,
            disabled: N.value,
            focused: o.value,
            details: R.value,
            error: ae.value === !1
          }), {
            ...l,
            default: (le) => {
              let {
                props: {
                  class: ve,
                  ...Se
                },
                controlRef: Fe
              } = le;
              return I(de, null, [e.prefix && I("span", {
                class: "v-text-field__prefix"
              }, [e.prefix]), ze(I("textarea", j({
                ref: (ue) => m.value = Fe.value = ue,
                class: ve,
                value: i.value,
                onInput: S,
                autofocus: e.autofocus,
                readonly: W.value,
                disabled: N.value,
                placeholder: e.placeholder,
                rows: e.rows,
                name: h.fieldName.value,
                autocomplete: h.fieldAutocomplete.value,
                onFocus: x,
                onBlur: s,
                "aria-labelledby": `${M.value}-label`
              }, Se, z), null), [[rn, {
                handler: u
              }, null, {
                once: !0
              }]]), e.autoGrow && ze(I("textarea", {
                class: Q([ve, "v-textarea__sizer"]),
                id: `${Se.id}-sizer`,
                "onUpdate:modelValue": (ue) => i.value = ue,
                ref: A,
                readonly: !0,
                "aria-hidden": "true"
              }, null), [[gu, i.value]]), e.suffix && I("span", {
                class: "v-text-field__suffix"
              }, [e.suffix])]);
            }
          });
        },
        details: L ? (Z) => {
          var M;
          return I(de, null, [(M = l.details) == null ? void 0 : M.call(l, Z), D && I(de, null, [I("span", null, null), C(Hr, {
            active: e.persistentCounter || o.value,
            value: c.value,
            max: d.value,
            disabled: e.disabled
          }, l.counter)])]);
        } : void 0
      });
    }), Vt({}, f, v, m);
  }
}), og = O({
  fullscreen: Boolean,
  scrollable: Boolean,
  ..._e(Ba({
    captureFocus: !0,
    origin: "center center",
    scrollStrategy: "block",
    transition: {
      component: Il
    },
    zIndex: 2400,
    retainFocus: !0
  }), ["disableInitialFocus"])
}, "VDialog"), _g = U()({
  name: "VDialog",
  props: og(),
  emits: {
    "update:modelValue": (e) => !0,
    afterEnter: () => !0,
    afterLeave: () => !0
  },
  setup(e, t) {
    let {
      emit: n,
      slots: a
    } = t;
    const l = fe(e, "modelValue"), {
      scopeId: i
    } = mn(), o = K();
    function r() {
      var u;
      n("afterEnter"), (e.scrim || e.retainFocus) && ((u = o.value) != null && u.contentEl) && !o.value.contentEl.contains(document.activeElement) && o.value.contentEl.focus({
        preventScroll: !0
      });
    }
    function s() {
      n("afterLeave");
    }
    return q(l, async (u) => {
      var c;
      u || (await me(), (c = o.value.activatorEl) == null || c.focus({
        preventScroll: !0
      }));
    }), J(() => {
      const u = un.filterProps(e), c = j({
        "aria-haspopup": "dialog"
      }, e.activatorProps), d = j({
        tabindex: -1
      }, e.contentProps);
      return C(un, j({
        ref: o,
        class: ["v-dialog", {
          "v-dialog--fullscreen": e.fullscreen,
          "v-dialog--scrollable": e.scrollable
        }, e.class],
        style: e.style
      }, u, {
        modelValue: l.value,
        "onUpdate:modelValue": (f) => l.value = f,
        "aria-modal": "true",
        activatorProps: c,
        contentProps: d,
        height: e.fullscreen ? void 0 : e.height,
        width: e.fullscreen ? void 0 : e.width,
        maxHeight: e.fullscreen ? void 0 : e.maxHeight,
        maxWidth: e.fullscreen ? void 0 : e.maxWidth,
        role: "dialog",
        onAfterEnter: r,
        onAfterLeave: s
      }, i), {
        activator: a.activator,
        default: function() {
          for (var f = arguments.length, v = new Array(f), g = 0; g < f; g++)
            v[g] = arguments[g];
          return C(ke, {
            root: "VDialog"
          }, {
            default: () => {
              var m;
              return [(m = a.default) == null ? void 0 : m.call(a, ...v)];
            }
          });
        }
      });
    }), Vt({}, o);
  }
}), rg = O({
  ...re(),
  ...pv()
}, "VForm"), Bg = U()({
  name: "VForm",
  props: rg(),
  emits: {
    "update:modelValue": (e) => !0,
    submit: (e) => !0
  },
  setup(e, t) {
    let {
      slots: n,
      emit: a
    } = t;
    const l = Vv(e), i = K();
    function o(s) {
      s.preventDefault(), l.reset();
    }
    function r(s) {
      const u = s, c = l.validate();
      u.then = c.then.bind(c), u.catch = c.catch.bind(c), u.finally = c.finally.bind(c), a("submit", u), u.defaultPrevented || c.then((d) => {
        var v;
        let {
          valid: f
        } = d;
        f && ((v = i.value) == null || v.submit());
      }), u.preventDefault();
    }
    return J(() => {
      var s;
      return I("form", {
        ref: i,
        class: Q(["v-form", e.class]),
        style: oe(e.style),
        novalidate: !0,
        onReset: o,
        onSubmit: r
      }, [(s = n.default) == null ? void 0 : s.call(n, l)]);
    }), Vt(l, i);
  }
}), Dg = U()({
  name: "VSlideGroupItem",
  props: Aa(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = Tn(e, Nl);
    return () => {
      var l;
      return (l = n.default) == null ? void 0 : l.call(n, {
        isSelected: a.isSelected.value,
        select: a.select,
        toggle: a.toggle,
        selectedClass: a.selectedClass.value
      });
    };
  }
});
export {
  Ot as A,
  _m as B,
  zr as C,
  Pm as D,
  Pg as E,
  Ig as F,
  Ag as G,
  Zm as H,
  Jm as I,
  tg as J,
  Yi as K,
  Tg as L,
  ls as M,
  Eg as N,
  Sg as O,
  Hd as P,
  _g as Q,
  Tm as R,
  Dm as S,
  Bg as T,
  da as U,
  $i as V,
  Dg as W,
  Cg as X,
  pg as Y,
  Vg as Z,
  cg as a,
  sn as b,
  xd as c,
  _l as d,
  dg as e,
  hr as f,
  fg as g,
  gg as h,
  Ve as i,
  vg as j,
  $n as k,
  lt as l,
  ug as m,
  hg as n,
  bg as o,
  Lr as p,
  mg as q,
  Va as r,
  yg as s,
  eo as t,
  to as u,
  Gi as v,
  ca as w,
  wg as x,
  kg as y,
  xg as z
};
//# sourceMappingURL=vuetify.js.map

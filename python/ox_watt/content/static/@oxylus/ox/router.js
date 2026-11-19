var tv = Object.defineProperty;
var Ul = (i) => {
  throw TypeError(i);
};
var nv = (i, n, r) => n in i ? tv(i, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[n] = r;
var T = (i, n, r) => nv(i, typeof n != "symbol" ? n + "" : n, r), rv = (i, n, r) => n.has(i) || Ul("Cannot " + r);
var Ft = (i, n, r) => (rv(i, n, "read from private field"), r ? r.call(i) : n.get(i)), Hl = (i, n, r) => n.has(i) ? Ul("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(i) : n.set(i, r);
import { toRaw as Sa, isRef as lr, hasInjectionContext as Ac, inject as lt, ref as Gr, reactive as Wn, effectScope as Ja, isReactive as Cc, getCurrentScope as iv, onScopeDispose as sv, watch as kr, nextTick as av, toRefs as ov, markRaw as Nc, computed as ut, shallowRef as uv, defineComponent as Qa, getCurrentInstance as Kr, h as Pc, Fragment as xc, onMounted as lv, onUnmounted as qi, createVNode as cv, Text as fv, unref as hv, shallowReactive as dv, provide as Xi } from "vue";
const De = {
  NONE: Symbol("none"),
  PROCESSING: Symbol("processing"),
  SENDING: Symbol("sending"),
  SENT: Symbol("sent"),
  OK: Symbol("ok"),
  ERROR: Symbol("error")
}, Gn = {};
Gn[De.NONE] = "";
Gn[De.PROCESSING] = "info";
Gn[De.SENDING] = "info";
Gn[De.SENT] = "success";
Gn[De.OK] = "success";
Gn[De.ERROR] = "error";
class hE {
  constructor(n = De.NONE, r = null, a = !1) {
    /**
     * The actual state as one of {@link States}.
     */
    T(this, "state");
    /**
     * Data related to the state.
     *
     * Note: if you need to attach extra data to the current state and don't want it to be displayed, just prefix it with an underscore.
     */
    T(this, "data");
    /**
     * Used by components to determine whether it has to show state or not.
     *
     * It is set to true when an instance method changes the state.
     */
    T(this, "show");
    this.state = n, this.data = r, this.show = a;
  }
  /** Create new state for `none` */
  static none(n = null) {
    return new this(De.NONE, n);
  }
  /** Create new state for `ok` */
  static ok(n = null) {
    return new this(De.OK, n);
  }
  /** Create new state for `processing` */
  static processing(n = null) {
    return new this(De.PROCESSING, n);
  }
  /** Create new state for `sending` */
  static sending(n = null) {
    return new this(De.SENDING, n);
  }
  /** Create new state for `error` */
  static error(n = null) {
    return new this(De.ERROR, n);
  }
  /** Set state to `none` with optional provided data. */
  none(n = null) {
    return this.state = De.NONE, this.data = n, this.show = !0, this;
  }
  /** Set state to `ok` with optional provided data. */
  ok(n = null) {
    return this.state = De.OK, this.data = n, this.show = !0, this;
  }
  /** Set state to `processing` with optional provided data. */
  processing(n = null) {
    return this.state = De.PROCESSING, this.data = n, this.show = !0, this;
  }
  /** Set state to `sending` with optional provided data. */
  sending(n = null) {
    return this.state = De.SENDING, this.data = n, this.show = !0, this;
  }
  /** Set state to `error` with optional provided data. */
  error(n = null) {
    return this.state = De.ERROR, this.data = n, this.show = !0, this;
  }
  /** Color of the current state, based on {@link StateColors}. */
  get color() {
    return Gn[this.state];
  }
  /** True if state is `none` */
  get isNone() {
    return this.state == De.NONE;
  }
  /** True if state is `ok` */
  get isOk() {
    return this.state == De.OK;
  }
  /** True if state is `processing` */
  get isProcessing() {
    return this.state == De.PROCESSING;
  }
  /** True if state is `sending` */
  get isSending() {
    return this.state == De.SENDING;
  }
  /** True if state is `error` */
  get isError() {
    return this.state == De.ERROR;
  }
  /** Return formatted error string if state is `error` */
  toString() {
    if (!this.data)
      return "";
    if (typeof this.data == "string")
      return this.data;
    let n = "";
    for (var [r, a] of Object.entries(this.data)) {
      if (r.startsWith("_"))
        continue;
      const o = typeof this.data[r] == "string" ? [a] : a;
      typeof r == "string" ? n += o.map((l) => `- ${r}: ${l}
`) : n += o.map((l) => `- ${l}
`);
    }
    return `${n}`;
  }
}
var Pr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function gv(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var Hi = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
Hi.exports;
(function(i, n) {
  (function() {
    var r, a = "4.17.21", o = 200, l = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", c = "Expected a function", g = "Invalid `variable` option passed into `_.template`", p = "__lodash_hash_undefined__", v = 500, $ = "__lodash_placeholder__", O = 1, D = 2, B = 4, X = 1, Y = 2, H = 1, I = 2, M = 4, W = 8, N = 16, U = 32, R = 64, S = 128, V = 256, G = 512, le = 30, Se = "...", he = 800, Ye = 16, vt = 1, On = 2, Ct = 3, Ce = 1 / 0, wt = 9007199254740991, Nt = 17976931348623157e292, qt = NaN, Qe = 4294967295, hr = Qe - 1, dr = Qe >>> 1, gr = [
      ["ary", S],
      ["bind", H],
      ["bindKey", I],
      ["curry", W],
      ["curryRight", N],
      ["flip", G],
      ["partial", U],
      ["partialRight", R],
      ["rearg", V]
    ], Xt = "[object Arguments]", ln = "[object Array]", pr = "[object AsyncFunction]", Kt = "[object Boolean]", zt = "[object Date]", mr = "[object DOMException]", cn = "[object Error]", fn = "[object Function]", hn = "[object GeneratorFunction]", Ge = "[object Map]", Et = "[object Number]", An = "[object Null]", ft = "[object Object]", y = "[object Promise]", w = "[object Proxy]", F = "[object RegExp]", Q = "[object Set]", Ie = "[object String]", re = "[object Symbol]", A = "[object Undefined]", K = "[object WeakMap]", ve = "[object WeakSet]", Le = "[object ArrayBuffer]", rt = "[object DataView]", dn = "[object Float32Array]", Wt = "[object Float64Array]", _r = "[object Int8Array]", qr = "[object Int16Array]", ts = "[object Int32Array]", ns = "[object Uint8Array]", rs = "[object Uint8ClampedArray]", is = "[object Uint16Array]", ss = "[object Uint32Array]", bf = /\b__p \+= '';/g, If = /\b(__p \+=) '' \+/g, Lf = /(__e\(.*?\)|\b__t\)) \+\n'';/g, fo = /&(?:amp|lt|gt|quot|#39);/g, ho = /[&<>"']/g, Rf = RegExp(fo.source), Sf = RegExp(ho.source), $f = /<%-([\s\S]+?)%>/g, Tf = /<%([\s\S]+?)%>/g, go = /<%=([\s\S]+?)%>/g, Of = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Af = /^\w*$/, Cf = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, as = /[\\^$.*+?()[\]{}|]/g, Nf = RegExp(as.source), os = /^\s+/, Pf = /\s/, xf = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Df = /\{\n\/\* \[wrapped with (.+)\] \*/, Mf = /,? & /, Ff = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, kf = /[()=,{}\[\]\/\s]/, Kf = /\\(\\)?/g, Wf = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, po = /\w*$/, Uf = /^[-+]0x[0-9a-f]+$/i, Hf = /^0b[01]+$/i, Bf = /^\[object .+?Constructor\]$/, Gf = /^0o[0-7]+$/i, Vf = /^(?:0|[1-9]\d*)$/, Yf = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Xr = /($^)/, qf = /['\n\r\u2028\u2029\\]/g, zr = "\\ud800-\\udfff", Xf = "\\u0300-\\u036f", zf = "\\ufe20-\\ufe2f", Jf = "\\u20d0-\\u20ff", mo = Xf + zf + Jf, _o = "\\u2700-\\u27bf", yo = "a-z\\xdf-\\xf6\\xf8-\\xff", Qf = "\\xac\\xb1\\xd7\\xf7", Zf = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", jf = "\\u2000-\\u206f", eh = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", vo = "A-Z\\xc0-\\xd6\\xd8-\\xde", wo = "\\ufe0e\\ufe0f", Eo = Qf + Zf + jf + eh, us = "['’]", th = "[" + zr + "]", bo = "[" + Eo + "]", Jr = "[" + mo + "]", Io = "\\d+", nh = "[" + _o + "]", Lo = "[" + yo + "]", Ro = "[^" + zr + Eo + Io + _o + yo + vo + "]", ls = "\\ud83c[\\udffb-\\udfff]", rh = "(?:" + Jr + "|" + ls + ")", So = "[^" + zr + "]", cs = "(?:\\ud83c[\\udde6-\\uddff]){2}", fs = "[\\ud800-\\udbff][\\udc00-\\udfff]", Vn = "[" + vo + "]", $o = "\\u200d", To = "(?:" + Lo + "|" + Ro + ")", ih = "(?:" + Vn + "|" + Ro + ")", Oo = "(?:" + us + "(?:d|ll|m|re|s|t|ve))?", Ao = "(?:" + us + "(?:D|LL|M|RE|S|T|VE))?", Co = rh + "?", No = "[" + wo + "]?", sh = "(?:" + $o + "(?:" + [So, cs, fs].join("|") + ")" + No + Co + ")*", ah = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", oh = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Po = No + Co + sh, uh = "(?:" + [nh, cs, fs].join("|") + ")" + Po, lh = "(?:" + [So + Jr + "?", Jr, cs, fs, th].join("|") + ")", ch = RegExp(us, "g"), fh = RegExp(Jr, "g"), hs = RegExp(ls + "(?=" + ls + ")|" + lh + Po, "g"), hh = RegExp([
      Vn + "?" + Lo + "+" + Oo + "(?=" + [bo, Vn, "$"].join("|") + ")",
      ih + "+" + Ao + "(?=" + [bo, Vn + To, "$"].join("|") + ")",
      Vn + "?" + To + "+" + Oo,
      Vn + "+" + Ao,
      oh,
      ah,
      Io,
      uh
    ].join("|"), "g"), dh = RegExp("[" + $o + zr + mo + wo + "]"), gh = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, ph = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ], mh = -1, Oe = {};
    Oe[dn] = Oe[Wt] = Oe[_r] = Oe[qr] = Oe[ts] = Oe[ns] = Oe[rs] = Oe[is] = Oe[ss] = !0, Oe[Xt] = Oe[ln] = Oe[Le] = Oe[Kt] = Oe[rt] = Oe[zt] = Oe[cn] = Oe[fn] = Oe[Ge] = Oe[Et] = Oe[ft] = Oe[F] = Oe[Q] = Oe[Ie] = Oe[K] = !1;
    var $e = {};
    $e[Xt] = $e[ln] = $e[Le] = $e[rt] = $e[Kt] = $e[zt] = $e[dn] = $e[Wt] = $e[_r] = $e[qr] = $e[ts] = $e[Ge] = $e[Et] = $e[ft] = $e[F] = $e[Q] = $e[Ie] = $e[re] = $e[ns] = $e[rs] = $e[is] = $e[ss] = !0, $e[cn] = $e[fn] = $e[K] = !1;
    var _h = {
      // Latin-1 Supplement block.
      À: "A",
      Á: "A",
      Â: "A",
      Ã: "A",
      Ä: "A",
      Å: "A",
      à: "a",
      á: "a",
      â: "a",
      ã: "a",
      ä: "a",
      å: "a",
      Ç: "C",
      ç: "c",
      Ð: "D",
      ð: "d",
      È: "E",
      É: "E",
      Ê: "E",
      Ë: "E",
      è: "e",
      é: "e",
      ê: "e",
      ë: "e",
      Ì: "I",
      Í: "I",
      Î: "I",
      Ï: "I",
      ì: "i",
      í: "i",
      î: "i",
      ï: "i",
      Ñ: "N",
      ñ: "n",
      Ò: "O",
      Ó: "O",
      Ô: "O",
      Õ: "O",
      Ö: "O",
      Ø: "O",
      ò: "o",
      ó: "o",
      ô: "o",
      õ: "o",
      ö: "o",
      ø: "o",
      Ù: "U",
      Ú: "U",
      Û: "U",
      Ü: "U",
      ù: "u",
      ú: "u",
      û: "u",
      ü: "u",
      Ý: "Y",
      ý: "y",
      ÿ: "y",
      Æ: "Ae",
      æ: "ae",
      Þ: "Th",
      þ: "th",
      ß: "ss",
      // Latin Extended-A block.
      Ā: "A",
      Ă: "A",
      Ą: "A",
      ā: "a",
      ă: "a",
      ą: "a",
      Ć: "C",
      Ĉ: "C",
      Ċ: "C",
      Č: "C",
      ć: "c",
      ĉ: "c",
      ċ: "c",
      č: "c",
      Ď: "D",
      Đ: "D",
      ď: "d",
      đ: "d",
      Ē: "E",
      Ĕ: "E",
      Ė: "E",
      Ę: "E",
      Ě: "E",
      ē: "e",
      ĕ: "e",
      ė: "e",
      ę: "e",
      ě: "e",
      Ĝ: "G",
      Ğ: "G",
      Ġ: "G",
      Ģ: "G",
      ĝ: "g",
      ğ: "g",
      ġ: "g",
      ģ: "g",
      Ĥ: "H",
      Ħ: "H",
      ĥ: "h",
      ħ: "h",
      Ĩ: "I",
      Ī: "I",
      Ĭ: "I",
      Į: "I",
      İ: "I",
      ĩ: "i",
      ī: "i",
      ĭ: "i",
      į: "i",
      ı: "i",
      Ĵ: "J",
      ĵ: "j",
      Ķ: "K",
      ķ: "k",
      ĸ: "k",
      Ĺ: "L",
      Ļ: "L",
      Ľ: "L",
      Ŀ: "L",
      Ł: "L",
      ĺ: "l",
      ļ: "l",
      ľ: "l",
      ŀ: "l",
      ł: "l",
      Ń: "N",
      Ņ: "N",
      Ň: "N",
      Ŋ: "N",
      ń: "n",
      ņ: "n",
      ň: "n",
      ŋ: "n",
      Ō: "O",
      Ŏ: "O",
      Ő: "O",
      ō: "o",
      ŏ: "o",
      ő: "o",
      Ŕ: "R",
      Ŗ: "R",
      Ř: "R",
      ŕ: "r",
      ŗ: "r",
      ř: "r",
      Ś: "S",
      Ŝ: "S",
      Ş: "S",
      Š: "S",
      ś: "s",
      ŝ: "s",
      ş: "s",
      š: "s",
      Ţ: "T",
      Ť: "T",
      Ŧ: "T",
      ţ: "t",
      ť: "t",
      ŧ: "t",
      Ũ: "U",
      Ū: "U",
      Ŭ: "U",
      Ů: "U",
      Ű: "U",
      Ų: "U",
      ũ: "u",
      ū: "u",
      ŭ: "u",
      ů: "u",
      ű: "u",
      ų: "u",
      Ŵ: "W",
      ŵ: "w",
      Ŷ: "Y",
      ŷ: "y",
      Ÿ: "Y",
      Ź: "Z",
      Ż: "Z",
      Ž: "Z",
      ź: "z",
      ż: "z",
      ž: "z",
      Ĳ: "IJ",
      ĳ: "ij",
      Œ: "Oe",
      œ: "oe",
      ŉ: "'n",
      ſ: "s"
    }, yh = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, vh = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, wh = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, Eh = parseFloat, bh = parseInt, xo = typeof Pr == "object" && Pr && Pr.Object === Object && Pr, Ih = typeof self == "object" && self && self.Object === Object && self, qe = xo || Ih || Function("return this")(), ds = n && !n.nodeType && n, Cn = ds && !0 && i && !i.nodeType && i, Do = Cn && Cn.exports === ds, gs = Do && xo.process, bt = function() {
      try {
        var E = Cn && Cn.require && Cn.require("util").types;
        return E || gs && gs.binding && gs.binding("util");
      } catch {
      }
    }(), Mo = bt && bt.isArrayBuffer, Fo = bt && bt.isDate, ko = bt && bt.isMap, Ko = bt && bt.isRegExp, Wo = bt && bt.isSet, Uo = bt && bt.isTypedArray;
    function ht(E, C, L) {
      switch (L.length) {
        case 0:
          return E.call(C);
        case 1:
          return E.call(C, L[0]);
        case 2:
          return E.call(C, L[0], L[1]);
        case 3:
          return E.call(C, L[0], L[1], L[2]);
      }
      return E.apply(C, L);
    }
    function Lh(E, C, L, J) {
      for (var ne = -1, pe = E == null ? 0 : E.length; ++ne < pe; ) {
        var We = E[ne];
        C(J, We, L(We), E);
      }
      return J;
    }
    function It(E, C) {
      for (var L = -1, J = E == null ? 0 : E.length; ++L < J && C(E[L], L, E) !== !1; )
        ;
      return E;
    }
    function Rh(E, C) {
      for (var L = E == null ? 0 : E.length; L-- && C(E[L], L, E) !== !1; )
        ;
      return E;
    }
    function Ho(E, C) {
      for (var L = -1, J = E == null ? 0 : E.length; ++L < J; )
        if (!C(E[L], L, E))
          return !1;
      return !0;
    }
    function gn(E, C) {
      for (var L = -1, J = E == null ? 0 : E.length, ne = 0, pe = []; ++L < J; ) {
        var We = E[L];
        C(We, L, E) && (pe[ne++] = We);
      }
      return pe;
    }
    function Qr(E, C) {
      var L = E == null ? 0 : E.length;
      return !!L && Yn(E, C, 0) > -1;
    }
    function ps(E, C, L) {
      for (var J = -1, ne = E == null ? 0 : E.length; ++J < ne; )
        if (L(C, E[J]))
          return !0;
      return !1;
    }
    function Ne(E, C) {
      for (var L = -1, J = E == null ? 0 : E.length, ne = Array(J); ++L < J; )
        ne[L] = C(E[L], L, E);
      return ne;
    }
    function pn(E, C) {
      for (var L = -1, J = C.length, ne = E.length; ++L < J; )
        E[ne + L] = C[L];
      return E;
    }
    function ms(E, C, L, J) {
      var ne = -1, pe = E == null ? 0 : E.length;
      for (J && pe && (L = E[++ne]); ++ne < pe; )
        L = C(L, E[ne], ne, E);
      return L;
    }
    function Sh(E, C, L, J) {
      var ne = E == null ? 0 : E.length;
      for (J && ne && (L = E[--ne]); ne--; )
        L = C(L, E[ne], ne, E);
      return L;
    }
    function _s(E, C) {
      for (var L = -1, J = E == null ? 0 : E.length; ++L < J; )
        if (C(E[L], L, E))
          return !0;
      return !1;
    }
    var $h = ys("length");
    function Th(E) {
      return E.split("");
    }
    function Oh(E) {
      return E.match(Ff) || [];
    }
    function Bo(E, C, L) {
      var J;
      return L(E, function(ne, pe, We) {
        if (C(ne, pe, We))
          return J = pe, !1;
      }), J;
    }
    function Zr(E, C, L, J) {
      for (var ne = E.length, pe = L + (J ? 1 : -1); J ? pe-- : ++pe < ne; )
        if (C(E[pe], pe, E))
          return pe;
      return -1;
    }
    function Yn(E, C, L) {
      return C === C ? Uh(E, C, L) : Zr(E, Go, L);
    }
    function Ah(E, C, L, J) {
      for (var ne = L - 1, pe = E.length; ++ne < pe; )
        if (J(E[ne], C))
          return ne;
      return -1;
    }
    function Go(E) {
      return E !== E;
    }
    function Vo(E, C) {
      var L = E == null ? 0 : E.length;
      return L ? ws(E, C) / L : qt;
    }
    function ys(E) {
      return function(C) {
        return C == null ? r : C[E];
      };
    }
    function vs(E) {
      return function(C) {
        return E == null ? r : E[C];
      };
    }
    function Yo(E, C, L, J, ne) {
      return ne(E, function(pe, We, Re) {
        L = J ? (J = !1, pe) : C(L, pe, We, Re);
      }), L;
    }
    function Ch(E, C) {
      var L = E.length;
      for (E.sort(C); L--; )
        E[L] = E[L].value;
      return E;
    }
    function ws(E, C) {
      for (var L, J = -1, ne = E.length; ++J < ne; ) {
        var pe = C(E[J]);
        pe !== r && (L = L === r ? pe : L + pe);
      }
      return L;
    }
    function Es(E, C) {
      for (var L = -1, J = Array(E); ++L < E; )
        J[L] = C(L);
      return J;
    }
    function Nh(E, C) {
      return Ne(C, function(L) {
        return [L, E[L]];
      });
    }
    function qo(E) {
      return E && E.slice(0, Qo(E) + 1).replace(os, "");
    }
    function dt(E) {
      return function(C) {
        return E(C);
      };
    }
    function bs(E, C) {
      return Ne(C, function(L) {
        return E[L];
      });
    }
    function yr(E, C) {
      return E.has(C);
    }
    function Xo(E, C) {
      for (var L = -1, J = E.length; ++L < J && Yn(C, E[L], 0) > -1; )
        ;
      return L;
    }
    function zo(E, C) {
      for (var L = E.length; L-- && Yn(C, E[L], 0) > -1; )
        ;
      return L;
    }
    function Ph(E, C) {
      for (var L = E.length, J = 0; L--; )
        E[L] === C && ++J;
      return J;
    }
    var xh = vs(_h), Dh = vs(yh);
    function Mh(E) {
      return "\\" + wh[E];
    }
    function Fh(E, C) {
      return E == null ? r : E[C];
    }
    function qn(E) {
      return dh.test(E);
    }
    function kh(E) {
      return gh.test(E);
    }
    function Kh(E) {
      for (var C, L = []; !(C = E.next()).done; )
        L.push(C.value);
      return L;
    }
    function Is(E) {
      var C = -1, L = Array(E.size);
      return E.forEach(function(J, ne) {
        L[++C] = [ne, J];
      }), L;
    }
    function Jo(E, C) {
      return function(L) {
        return E(C(L));
      };
    }
    function mn(E, C) {
      for (var L = -1, J = E.length, ne = 0, pe = []; ++L < J; ) {
        var We = E[L];
        (We === C || We === $) && (E[L] = $, pe[ne++] = L);
      }
      return pe;
    }
    function jr(E) {
      var C = -1, L = Array(E.size);
      return E.forEach(function(J) {
        L[++C] = J;
      }), L;
    }
    function Wh(E) {
      var C = -1, L = Array(E.size);
      return E.forEach(function(J) {
        L[++C] = [J, J];
      }), L;
    }
    function Uh(E, C, L) {
      for (var J = L - 1, ne = E.length; ++J < ne; )
        if (E[J] === C)
          return J;
      return -1;
    }
    function Hh(E, C, L) {
      for (var J = L + 1; J--; )
        if (E[J] === C)
          return J;
      return J;
    }
    function Xn(E) {
      return qn(E) ? Gh(E) : $h(E);
    }
    function Pt(E) {
      return qn(E) ? Vh(E) : Th(E);
    }
    function Qo(E) {
      for (var C = E.length; C-- && Pf.test(E.charAt(C)); )
        ;
      return C;
    }
    var Bh = vs(vh);
    function Gh(E) {
      for (var C = hs.lastIndex = 0; hs.test(E); )
        ++C;
      return C;
    }
    function Vh(E) {
      return E.match(hs) || [];
    }
    function Yh(E) {
      return E.match(hh) || [];
    }
    var qh = function E(C) {
      C = C == null ? qe : zn.defaults(qe.Object(), C, zn.pick(qe, ph));
      var L = C.Array, J = C.Date, ne = C.Error, pe = C.Function, We = C.Math, Re = C.Object, Ls = C.RegExp, Xh = C.String, Lt = C.TypeError, ei = L.prototype, zh = pe.prototype, Jn = Re.prototype, ti = C["__core-js_shared__"], ni = zh.toString, we = Jn.hasOwnProperty, Jh = 0, Zo = function() {
        var e = /[^.]+$/.exec(ti && ti.keys && ti.keys.IE_PROTO || "");
        return e ? "Symbol(src)_1." + e : "";
      }(), ri = Jn.toString, Qh = ni.call(Re), Zh = qe._, jh = Ls(
        "^" + ni.call(we).replace(as, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), ii = Do ? C.Buffer : r, _n = C.Symbol, si = C.Uint8Array, jo = ii ? ii.allocUnsafe : r, ai = Jo(Re.getPrototypeOf, Re), eu = Re.create, tu = Jn.propertyIsEnumerable, oi = ei.splice, nu = _n ? _n.isConcatSpreadable : r, vr = _n ? _n.iterator : r, Nn = _n ? _n.toStringTag : r, ui = function() {
        try {
          var e = Fn(Re, "defineProperty");
          return e({}, "", {}), e;
        } catch {
        }
      }(), ed = C.clearTimeout !== qe.clearTimeout && C.clearTimeout, td = J && J.now !== qe.Date.now && J.now, nd = C.setTimeout !== qe.setTimeout && C.setTimeout, li = We.ceil, ci = We.floor, Rs = Re.getOwnPropertySymbols, rd = ii ? ii.isBuffer : r, ru = C.isFinite, id = ei.join, sd = Jo(Re.keys, Re), Ue = We.max, ze = We.min, ad = J.now, od = C.parseInt, iu = We.random, ud = ei.reverse, Ss = Fn(C, "DataView"), wr = Fn(C, "Map"), $s = Fn(C, "Promise"), Qn = Fn(C, "Set"), Er = Fn(C, "WeakMap"), br = Fn(Re, "create"), fi = Er && new Er(), Zn = {}, ld = kn(Ss), cd = kn(wr), fd = kn($s), hd = kn(Qn), dd = kn(Er), hi = _n ? _n.prototype : r, Ir = hi ? hi.valueOf : r, su = hi ? hi.toString : r;
      function h(e) {
        if (xe(e) && !ie(e) && !(e instanceof fe)) {
          if (e instanceof Rt)
            return e;
          if (we.call(e, "__wrapped__"))
            return al(e);
        }
        return new Rt(e);
      }
      var jn = /* @__PURE__ */ function() {
        function e() {
        }
        return function(t) {
          if (!Pe(t))
            return {};
          if (eu)
            return eu(t);
          e.prototype = t;
          var s = new e();
          return e.prototype = r, s;
        };
      }();
      function di() {
      }
      function Rt(e, t) {
        this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = r;
      }
      h.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        escape: $f,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: Tf,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        interpolate: go,
        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        variable: "",
        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        imports: {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          _: h
        }
      }, h.prototype = di.prototype, h.prototype.constructor = h, Rt.prototype = jn(di.prototype), Rt.prototype.constructor = Rt;
      function fe(e) {
        this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Qe, this.__views__ = [];
      }
      function gd() {
        var e = new fe(this.__wrapped__);
        return e.__actions__ = it(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = it(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = it(this.__views__), e;
      }
      function pd() {
        if (this.__filtered__) {
          var e = new fe(this);
          e.__dir__ = -1, e.__filtered__ = !0;
        } else
          e = this.clone(), e.__dir__ *= -1;
        return e;
      }
      function md() {
        var e = this.__wrapped__.value(), t = this.__dir__, s = ie(e), u = t < 0, f = s ? e.length : 0, d = Tg(0, f, this.__views__), m = d.start, _ = d.end, b = _ - m, P = u ? _ : m - 1, x = this.__iteratees__, k = x.length, q = 0, Z = ze(b, this.__takeCount__);
        if (!s || !u && f == b && Z == b)
          return Ou(e, this.__actions__);
        var ee = [];
        e:
          for (; b-- && q < Z; ) {
            P += t;
            for (var ae = -1, te = e[P]; ++ae < k; ) {
              var ce = x[ae], de = ce.iteratee, mt = ce.type, et = de(te);
              if (mt == On)
                te = et;
              else if (!et) {
                if (mt == vt)
                  continue e;
                break e;
              }
            }
            ee[q++] = te;
          }
        return ee;
      }
      fe.prototype = jn(di.prototype), fe.prototype.constructor = fe;
      function Pn(e) {
        var t = -1, s = e == null ? 0 : e.length;
        for (this.clear(); ++t < s; ) {
          var u = e[t];
          this.set(u[0], u[1]);
        }
      }
      function _d() {
        this.__data__ = br ? br(null) : {}, this.size = 0;
      }
      function yd(e) {
        var t = this.has(e) && delete this.__data__[e];
        return this.size -= t ? 1 : 0, t;
      }
      function vd(e) {
        var t = this.__data__;
        if (br) {
          var s = t[e];
          return s === p ? r : s;
        }
        return we.call(t, e) ? t[e] : r;
      }
      function wd(e) {
        var t = this.__data__;
        return br ? t[e] !== r : we.call(t, e);
      }
      function Ed(e, t) {
        var s = this.__data__;
        return this.size += this.has(e) ? 0 : 1, s[e] = br && t === r ? p : t, this;
      }
      Pn.prototype.clear = _d, Pn.prototype.delete = yd, Pn.prototype.get = vd, Pn.prototype.has = wd, Pn.prototype.set = Ed;
      function Jt(e) {
        var t = -1, s = e == null ? 0 : e.length;
        for (this.clear(); ++t < s; ) {
          var u = e[t];
          this.set(u[0], u[1]);
        }
      }
      function bd() {
        this.__data__ = [], this.size = 0;
      }
      function Id(e) {
        var t = this.__data__, s = gi(t, e);
        if (s < 0)
          return !1;
        var u = t.length - 1;
        return s == u ? t.pop() : oi.call(t, s, 1), --this.size, !0;
      }
      function Ld(e) {
        var t = this.__data__, s = gi(t, e);
        return s < 0 ? r : t[s][1];
      }
      function Rd(e) {
        return gi(this.__data__, e) > -1;
      }
      function Sd(e, t) {
        var s = this.__data__, u = gi(s, e);
        return u < 0 ? (++this.size, s.push([e, t])) : s[u][1] = t, this;
      }
      Jt.prototype.clear = bd, Jt.prototype.delete = Id, Jt.prototype.get = Ld, Jt.prototype.has = Rd, Jt.prototype.set = Sd;
      function Qt(e) {
        var t = -1, s = e == null ? 0 : e.length;
        for (this.clear(); ++t < s; ) {
          var u = e[t];
          this.set(u[0], u[1]);
        }
      }
      function $d() {
        this.size = 0, this.__data__ = {
          hash: new Pn(),
          map: new (wr || Jt)(),
          string: new Pn()
        };
      }
      function Td(e) {
        var t = Si(this, e).delete(e);
        return this.size -= t ? 1 : 0, t;
      }
      function Od(e) {
        return Si(this, e).get(e);
      }
      function Ad(e) {
        return Si(this, e).has(e);
      }
      function Cd(e, t) {
        var s = Si(this, e), u = s.size;
        return s.set(e, t), this.size += s.size == u ? 0 : 1, this;
      }
      Qt.prototype.clear = $d, Qt.prototype.delete = Td, Qt.prototype.get = Od, Qt.prototype.has = Ad, Qt.prototype.set = Cd;
      function xn(e) {
        var t = -1, s = e == null ? 0 : e.length;
        for (this.__data__ = new Qt(); ++t < s; )
          this.add(e[t]);
      }
      function Nd(e) {
        return this.__data__.set(e, p), this;
      }
      function Pd(e) {
        return this.__data__.has(e);
      }
      xn.prototype.add = xn.prototype.push = Nd, xn.prototype.has = Pd;
      function xt(e) {
        var t = this.__data__ = new Jt(e);
        this.size = t.size;
      }
      function xd() {
        this.__data__ = new Jt(), this.size = 0;
      }
      function Dd(e) {
        var t = this.__data__, s = t.delete(e);
        return this.size = t.size, s;
      }
      function Md(e) {
        return this.__data__.get(e);
      }
      function Fd(e) {
        return this.__data__.has(e);
      }
      function kd(e, t) {
        var s = this.__data__;
        if (s instanceof Jt) {
          var u = s.__data__;
          if (!wr || u.length < o - 1)
            return u.push([e, t]), this.size = ++s.size, this;
          s = this.__data__ = new Qt(u);
        }
        return s.set(e, t), this.size = s.size, this;
      }
      xt.prototype.clear = xd, xt.prototype.delete = Dd, xt.prototype.get = Md, xt.prototype.has = Fd, xt.prototype.set = kd;
      function au(e, t) {
        var s = ie(e), u = !s && Kn(e), f = !s && !u && bn(e), d = !s && !u && !f && rr(e), m = s || u || f || d, _ = m ? Es(e.length, Xh) : [], b = _.length;
        for (var P in e)
          (t || we.call(e, P)) && !(m && // Safari 9 has enumerable `arguments.length` in strict mode.
          (P == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          f && (P == "offset" || P == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          d && (P == "buffer" || P == "byteLength" || P == "byteOffset") || // Skip index properties.
          tn(P, b))) && _.push(P);
        return _;
      }
      function ou(e) {
        var t = e.length;
        return t ? e[ks(0, t - 1)] : r;
      }
      function Kd(e, t) {
        return $i(it(e), Dn(t, 0, e.length));
      }
      function Wd(e) {
        return $i(it(e));
      }
      function Ts(e, t, s) {
        (s !== r && !Dt(e[t], s) || s === r && !(t in e)) && Zt(e, t, s);
      }
      function Lr(e, t, s) {
        var u = e[t];
        (!(we.call(e, t) && Dt(u, s)) || s === r && !(t in e)) && Zt(e, t, s);
      }
      function gi(e, t) {
        for (var s = e.length; s--; )
          if (Dt(e[s][0], t))
            return s;
        return -1;
      }
      function Ud(e, t, s, u) {
        return yn(e, function(f, d, m) {
          t(u, f, s(f), m);
        }), u;
      }
      function uu(e, t) {
        return e && Ht(t, Ve(t), e);
      }
      function Hd(e, t) {
        return e && Ht(t, at(t), e);
      }
      function Zt(e, t, s) {
        t == "__proto__" && ui ? ui(e, t, {
          configurable: !0,
          enumerable: !0,
          value: s,
          writable: !0
        }) : e[t] = s;
      }
      function Os(e, t) {
        for (var s = -1, u = t.length, f = L(u), d = e == null; ++s < u; )
          f[s] = d ? r : la(e, t[s]);
        return f;
      }
      function Dn(e, t, s) {
        return e === e && (s !== r && (e = e <= s ? e : s), t !== r && (e = e >= t ? e : t)), e;
      }
      function St(e, t, s, u, f, d) {
        var m, _ = t & O, b = t & D, P = t & B;
        if (s && (m = f ? s(e, u, f, d) : s(e)), m !== r)
          return m;
        if (!Pe(e))
          return e;
        var x = ie(e);
        if (x) {
          if (m = Ag(e), !_)
            return it(e, m);
        } else {
          var k = Je(e), q = k == fn || k == hn;
          if (bn(e))
            return Nu(e, _);
          if (k == ft || k == Xt || q && !f) {
            if (m = b || q ? {} : Qu(e), !_)
              return b ? vg(e, Hd(m, e)) : yg(e, uu(m, e));
          } else {
            if (!$e[k])
              return f ? e : {};
            m = Cg(e, k, _);
          }
        }
        d || (d = new xt());
        var Z = d.get(e);
        if (Z)
          return Z;
        d.set(e, m), Sl(e) ? e.forEach(function(te) {
          m.add(St(te, t, s, te, e, d));
        }) : Ll(e) && e.forEach(function(te, ce) {
          m.set(ce, St(te, t, s, ce, e, d));
        });
        var ee = P ? b ? zs : Xs : b ? at : Ve, ae = x ? r : ee(e);
        return It(ae || e, function(te, ce) {
          ae && (ce = te, te = e[ce]), Lr(m, ce, St(te, t, s, ce, e, d));
        }), m;
      }
      function Bd(e) {
        var t = Ve(e);
        return function(s) {
          return lu(s, e, t);
        };
      }
      function lu(e, t, s) {
        var u = s.length;
        if (e == null)
          return !u;
        for (e = Re(e); u--; ) {
          var f = s[u], d = t[f], m = e[f];
          if (m === r && !(f in e) || !d(m))
            return !1;
        }
        return !0;
      }
      function cu(e, t, s) {
        if (typeof e != "function")
          throw new Lt(c);
        return Cr(function() {
          e.apply(r, s);
        }, t);
      }
      function Rr(e, t, s, u) {
        var f = -1, d = Qr, m = !0, _ = e.length, b = [], P = t.length;
        if (!_)
          return b;
        s && (t = Ne(t, dt(s))), u ? (d = ps, m = !1) : t.length >= o && (d = yr, m = !1, t = new xn(t));
        e:
          for (; ++f < _; ) {
            var x = e[f], k = s == null ? x : s(x);
            if (x = u || x !== 0 ? x : 0, m && k === k) {
              for (var q = P; q--; )
                if (t[q] === k)
                  continue e;
              b.push(x);
            } else d(t, k, u) || b.push(x);
          }
        return b;
      }
      var yn = Fu(Ut), fu = Fu(Cs, !0);
      function Gd(e, t) {
        var s = !0;
        return yn(e, function(u, f, d) {
          return s = !!t(u, f, d), s;
        }), s;
      }
      function pi(e, t, s) {
        for (var u = -1, f = e.length; ++u < f; ) {
          var d = e[u], m = t(d);
          if (m != null && (_ === r ? m === m && !pt(m) : s(m, _)))
            var _ = m, b = d;
        }
        return b;
      }
      function Vd(e, t, s, u) {
        var f = e.length;
        for (s = se(s), s < 0 && (s = -s > f ? 0 : f + s), u = u === r || u > f ? f : se(u), u < 0 && (u += f), u = s > u ? 0 : Tl(u); s < u; )
          e[s++] = t;
        return e;
      }
      function hu(e, t) {
        var s = [];
        return yn(e, function(u, f, d) {
          t(u, f, d) && s.push(u);
        }), s;
      }
      function Xe(e, t, s, u, f) {
        var d = -1, m = e.length;
        for (s || (s = Pg), f || (f = []); ++d < m; ) {
          var _ = e[d];
          t > 0 && s(_) ? t > 1 ? Xe(_, t - 1, s, u, f) : pn(f, _) : u || (f[f.length] = _);
        }
        return f;
      }
      var As = ku(), du = ku(!0);
      function Ut(e, t) {
        return e && As(e, t, Ve);
      }
      function Cs(e, t) {
        return e && du(e, t, Ve);
      }
      function mi(e, t) {
        return gn(t, function(s) {
          return nn(e[s]);
        });
      }
      function Mn(e, t) {
        t = wn(t, e);
        for (var s = 0, u = t.length; e != null && s < u; )
          e = e[Bt(t[s++])];
        return s && s == u ? e : r;
      }
      function gu(e, t, s) {
        var u = t(e);
        return ie(e) ? u : pn(u, s(e));
      }
      function Ze(e) {
        return e == null ? e === r ? A : An : Nn && Nn in Re(e) ? $g(e) : Wg(e);
      }
      function Ns(e, t) {
        return e > t;
      }
      function Yd(e, t) {
        return e != null && we.call(e, t);
      }
      function qd(e, t) {
        return e != null && t in Re(e);
      }
      function Xd(e, t, s) {
        return e >= ze(t, s) && e < Ue(t, s);
      }
      function Ps(e, t, s) {
        for (var u = s ? ps : Qr, f = e[0].length, d = e.length, m = d, _ = L(d), b = 1 / 0, P = []; m--; ) {
          var x = e[m];
          m && t && (x = Ne(x, dt(t))), b = ze(x.length, b), _[m] = !s && (t || f >= 120 && x.length >= 120) ? new xn(m && x) : r;
        }
        x = e[0];
        var k = -1, q = _[0];
        e:
          for (; ++k < f && P.length < b; ) {
            var Z = x[k], ee = t ? t(Z) : Z;
            if (Z = s || Z !== 0 ? Z : 0, !(q ? yr(q, ee) : u(P, ee, s))) {
              for (m = d; --m; ) {
                var ae = _[m];
                if (!(ae ? yr(ae, ee) : u(e[m], ee, s)))
                  continue e;
              }
              q && q.push(ee), P.push(Z);
            }
          }
        return P;
      }
      function zd(e, t, s, u) {
        return Ut(e, function(f, d, m) {
          t(u, s(f), d, m);
        }), u;
      }
      function Sr(e, t, s) {
        t = wn(t, e), e = tl(e, t);
        var u = e == null ? e : e[Bt(Tt(t))];
        return u == null ? r : ht(u, e, s);
      }
      function pu(e) {
        return xe(e) && Ze(e) == Xt;
      }
      function Jd(e) {
        return xe(e) && Ze(e) == Le;
      }
      function Qd(e) {
        return xe(e) && Ze(e) == zt;
      }
      function $r(e, t, s, u, f) {
        return e === t ? !0 : e == null || t == null || !xe(e) && !xe(t) ? e !== e && t !== t : Zd(e, t, s, u, $r, f);
      }
      function Zd(e, t, s, u, f, d) {
        var m = ie(e), _ = ie(t), b = m ? ln : Je(e), P = _ ? ln : Je(t);
        b = b == Xt ? ft : b, P = P == Xt ? ft : P;
        var x = b == ft, k = P == ft, q = b == P;
        if (q && bn(e)) {
          if (!bn(t))
            return !1;
          m = !0, x = !1;
        }
        if (q && !x)
          return d || (d = new xt()), m || rr(e) ? Xu(e, t, s, u, f, d) : Rg(e, t, b, s, u, f, d);
        if (!(s & X)) {
          var Z = x && we.call(e, "__wrapped__"), ee = k && we.call(t, "__wrapped__");
          if (Z || ee) {
            var ae = Z ? e.value() : e, te = ee ? t.value() : t;
            return d || (d = new xt()), f(ae, te, s, u, d);
          }
        }
        return q ? (d || (d = new xt()), Sg(e, t, s, u, f, d)) : !1;
      }
      function jd(e) {
        return xe(e) && Je(e) == Ge;
      }
      function xs(e, t, s, u) {
        var f = s.length, d = f, m = !u;
        if (e == null)
          return !d;
        for (e = Re(e); f--; ) {
          var _ = s[f];
          if (m && _[2] ? _[1] !== e[_[0]] : !(_[0] in e))
            return !1;
        }
        for (; ++f < d; ) {
          _ = s[f];
          var b = _[0], P = e[b], x = _[1];
          if (m && _[2]) {
            if (P === r && !(b in e))
              return !1;
          } else {
            var k = new xt();
            if (u)
              var q = u(P, x, b, e, t, k);
            if (!(q === r ? $r(x, P, X | Y, u, k) : q))
              return !1;
          }
        }
        return !0;
      }
      function mu(e) {
        if (!Pe(e) || Dg(e))
          return !1;
        var t = nn(e) ? jh : Bf;
        return t.test(kn(e));
      }
      function eg(e) {
        return xe(e) && Ze(e) == F;
      }
      function tg(e) {
        return xe(e) && Je(e) == Q;
      }
      function ng(e) {
        return xe(e) && Pi(e.length) && !!Oe[Ze(e)];
      }
      function _u(e) {
        return typeof e == "function" ? e : e == null ? ot : typeof e == "object" ? ie(e) ? wu(e[0], e[1]) : vu(e) : Kl(e);
      }
      function Ds(e) {
        if (!Ar(e))
          return sd(e);
        var t = [];
        for (var s in Re(e))
          we.call(e, s) && s != "constructor" && t.push(s);
        return t;
      }
      function rg(e) {
        if (!Pe(e))
          return Kg(e);
        var t = Ar(e), s = [];
        for (var u in e)
          u == "constructor" && (t || !we.call(e, u)) || s.push(u);
        return s;
      }
      function Ms(e, t) {
        return e < t;
      }
      function yu(e, t) {
        var s = -1, u = st(e) ? L(e.length) : [];
        return yn(e, function(f, d, m) {
          u[++s] = t(f, d, m);
        }), u;
      }
      function vu(e) {
        var t = Qs(e);
        return t.length == 1 && t[0][2] ? ju(t[0][0], t[0][1]) : function(s) {
          return s === e || xs(s, e, t);
        };
      }
      function wu(e, t) {
        return js(e) && Zu(t) ? ju(Bt(e), t) : function(s) {
          var u = la(s, e);
          return u === r && u === t ? ca(s, e) : $r(t, u, X | Y);
        };
      }
      function _i(e, t, s, u, f) {
        e !== t && As(t, function(d, m) {
          if (f || (f = new xt()), Pe(d))
            ig(e, t, m, s, _i, u, f);
          else {
            var _ = u ? u(ta(e, m), d, m + "", e, t, f) : r;
            _ === r && (_ = d), Ts(e, m, _);
          }
        }, at);
      }
      function ig(e, t, s, u, f, d, m) {
        var _ = ta(e, s), b = ta(t, s), P = m.get(b);
        if (P) {
          Ts(e, s, P);
          return;
        }
        var x = d ? d(_, b, s + "", e, t, m) : r, k = x === r;
        if (k) {
          var q = ie(b), Z = !q && bn(b), ee = !q && !Z && rr(b);
          x = b, q || Z || ee ? ie(_) ? x = _ : Fe(_) ? x = it(_) : Z ? (k = !1, x = Nu(b, !0)) : ee ? (k = !1, x = Pu(b, !0)) : x = [] : Nr(b) || Kn(b) ? (x = _, Kn(_) ? x = Ol(_) : (!Pe(_) || nn(_)) && (x = Qu(b))) : k = !1;
        }
        k && (m.set(b, x), f(x, b, u, d, m), m.delete(b)), Ts(e, s, x);
      }
      function Eu(e, t) {
        var s = e.length;
        if (s)
          return t += t < 0 ? s : 0, tn(t, s) ? e[t] : r;
      }
      function bu(e, t, s) {
        t.length ? t = Ne(t, function(d) {
          return ie(d) ? function(m) {
            return Mn(m, d.length === 1 ? d[0] : d);
          } : d;
        }) : t = [ot];
        var u = -1;
        t = Ne(t, dt(j()));
        var f = yu(e, function(d, m, _) {
          var b = Ne(t, function(P) {
            return P(d);
          });
          return { criteria: b, index: ++u, value: d };
        });
        return Ch(f, function(d, m) {
          return _g(d, m, s);
        });
      }
      function sg(e, t) {
        return Iu(e, t, function(s, u) {
          return ca(e, u);
        });
      }
      function Iu(e, t, s) {
        for (var u = -1, f = t.length, d = {}; ++u < f; ) {
          var m = t[u], _ = Mn(e, m);
          s(_, m) && Tr(d, wn(m, e), _);
        }
        return d;
      }
      function ag(e) {
        return function(t) {
          return Mn(t, e);
        };
      }
      function Fs(e, t, s, u) {
        var f = u ? Ah : Yn, d = -1, m = t.length, _ = e;
        for (e === t && (t = it(t)), s && (_ = Ne(e, dt(s))); ++d < m; )
          for (var b = 0, P = t[d], x = s ? s(P) : P; (b = f(_, x, b, u)) > -1; )
            _ !== e && oi.call(_, b, 1), oi.call(e, b, 1);
        return e;
      }
      function Lu(e, t) {
        for (var s = e ? t.length : 0, u = s - 1; s--; ) {
          var f = t[s];
          if (s == u || f !== d) {
            var d = f;
            tn(f) ? oi.call(e, f, 1) : Us(e, f);
          }
        }
        return e;
      }
      function ks(e, t) {
        return e + ci(iu() * (t - e + 1));
      }
      function og(e, t, s, u) {
        for (var f = -1, d = Ue(li((t - e) / (s || 1)), 0), m = L(d); d--; )
          m[u ? d : ++f] = e, e += s;
        return m;
      }
      function Ks(e, t) {
        var s = "";
        if (!e || t < 1 || t > wt)
          return s;
        do
          t % 2 && (s += e), t = ci(t / 2), t && (e += e);
        while (t);
        return s;
      }
      function oe(e, t) {
        return na(el(e, t, ot), e + "");
      }
      function ug(e) {
        return ou(ir(e));
      }
      function lg(e, t) {
        var s = ir(e);
        return $i(s, Dn(t, 0, s.length));
      }
      function Tr(e, t, s, u) {
        if (!Pe(e))
          return e;
        t = wn(t, e);
        for (var f = -1, d = t.length, m = d - 1, _ = e; _ != null && ++f < d; ) {
          var b = Bt(t[f]), P = s;
          if (b === "__proto__" || b === "constructor" || b === "prototype")
            return e;
          if (f != m) {
            var x = _[b];
            P = u ? u(x, b, _) : r, P === r && (P = Pe(x) ? x : tn(t[f + 1]) ? [] : {});
          }
          Lr(_, b, P), _ = _[b];
        }
        return e;
      }
      var Ru = fi ? function(e, t) {
        return fi.set(e, t), e;
      } : ot, cg = ui ? function(e, t) {
        return ui(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: ha(t),
          writable: !0
        });
      } : ot;
      function fg(e) {
        return $i(ir(e));
      }
      function $t(e, t, s) {
        var u = -1, f = e.length;
        t < 0 && (t = -t > f ? 0 : f + t), s = s > f ? f : s, s < 0 && (s += f), f = t > s ? 0 : s - t >>> 0, t >>>= 0;
        for (var d = L(f); ++u < f; )
          d[u] = e[u + t];
        return d;
      }
      function hg(e, t) {
        var s;
        return yn(e, function(u, f, d) {
          return s = t(u, f, d), !s;
        }), !!s;
      }
      function yi(e, t, s) {
        var u = 0, f = e == null ? u : e.length;
        if (typeof t == "number" && t === t && f <= dr) {
          for (; u < f; ) {
            var d = u + f >>> 1, m = e[d];
            m !== null && !pt(m) && (s ? m <= t : m < t) ? u = d + 1 : f = d;
          }
          return f;
        }
        return Ws(e, t, ot, s);
      }
      function Ws(e, t, s, u) {
        var f = 0, d = e == null ? 0 : e.length;
        if (d === 0)
          return 0;
        t = s(t);
        for (var m = t !== t, _ = t === null, b = pt(t), P = t === r; f < d; ) {
          var x = ci((f + d) / 2), k = s(e[x]), q = k !== r, Z = k === null, ee = k === k, ae = pt(k);
          if (m)
            var te = u || ee;
          else P ? te = ee && (u || q) : _ ? te = ee && q && (u || !Z) : b ? te = ee && q && !Z && (u || !ae) : Z || ae ? te = !1 : te = u ? k <= t : k < t;
          te ? f = x + 1 : d = x;
        }
        return ze(d, hr);
      }
      function Su(e, t) {
        for (var s = -1, u = e.length, f = 0, d = []; ++s < u; ) {
          var m = e[s], _ = t ? t(m) : m;
          if (!s || !Dt(_, b)) {
            var b = _;
            d[f++] = m === 0 ? 0 : m;
          }
        }
        return d;
      }
      function $u(e) {
        return typeof e == "number" ? e : pt(e) ? qt : +e;
      }
      function gt(e) {
        if (typeof e == "string")
          return e;
        if (ie(e))
          return Ne(e, gt) + "";
        if (pt(e))
          return su ? su.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -Ce ? "-0" : t;
      }
      function vn(e, t, s) {
        var u = -1, f = Qr, d = e.length, m = !0, _ = [], b = _;
        if (s)
          m = !1, f = ps;
        else if (d >= o) {
          var P = t ? null : Ig(e);
          if (P)
            return jr(P);
          m = !1, f = yr, b = new xn();
        } else
          b = t ? [] : _;
        e:
          for (; ++u < d; ) {
            var x = e[u], k = t ? t(x) : x;
            if (x = s || x !== 0 ? x : 0, m && k === k) {
              for (var q = b.length; q--; )
                if (b[q] === k)
                  continue e;
              t && b.push(k), _.push(x);
            } else f(b, k, s) || (b !== _ && b.push(k), _.push(x));
          }
        return _;
      }
      function Us(e, t) {
        return t = wn(t, e), e = tl(e, t), e == null || delete e[Bt(Tt(t))];
      }
      function Tu(e, t, s, u) {
        return Tr(e, t, s(Mn(e, t)), u);
      }
      function vi(e, t, s, u) {
        for (var f = e.length, d = u ? f : -1; (u ? d-- : ++d < f) && t(e[d], d, e); )
          ;
        return s ? $t(e, u ? 0 : d, u ? d + 1 : f) : $t(e, u ? d + 1 : 0, u ? f : d);
      }
      function Ou(e, t) {
        var s = e;
        return s instanceof fe && (s = s.value()), ms(t, function(u, f) {
          return f.func.apply(f.thisArg, pn([u], f.args));
        }, s);
      }
      function Hs(e, t, s) {
        var u = e.length;
        if (u < 2)
          return u ? vn(e[0]) : [];
        for (var f = -1, d = L(u); ++f < u; )
          for (var m = e[f], _ = -1; ++_ < u; )
            _ != f && (d[f] = Rr(d[f] || m, e[_], t, s));
        return vn(Xe(d, 1), t, s);
      }
      function Au(e, t, s) {
        for (var u = -1, f = e.length, d = t.length, m = {}; ++u < f; ) {
          var _ = u < d ? t[u] : r;
          s(m, e[u], _);
        }
        return m;
      }
      function Bs(e) {
        return Fe(e) ? e : [];
      }
      function Gs(e) {
        return typeof e == "function" ? e : ot;
      }
      function wn(e, t) {
        return ie(e) ? e : js(e, t) ? [e] : sl(_e(e));
      }
      var dg = oe;
      function En(e, t, s) {
        var u = e.length;
        return s = s === r ? u : s, !t && s >= u ? e : $t(e, t, s);
      }
      var Cu = ed || function(e) {
        return qe.clearTimeout(e);
      };
      function Nu(e, t) {
        if (t)
          return e.slice();
        var s = e.length, u = jo ? jo(s) : new e.constructor(s);
        return e.copy(u), u;
      }
      function Vs(e) {
        var t = new e.constructor(e.byteLength);
        return new si(t).set(new si(e)), t;
      }
      function gg(e, t) {
        var s = t ? Vs(e.buffer) : e.buffer;
        return new e.constructor(s, e.byteOffset, e.byteLength);
      }
      function pg(e) {
        var t = new e.constructor(e.source, po.exec(e));
        return t.lastIndex = e.lastIndex, t;
      }
      function mg(e) {
        return Ir ? Re(Ir.call(e)) : {};
      }
      function Pu(e, t) {
        var s = t ? Vs(e.buffer) : e.buffer;
        return new e.constructor(s, e.byteOffset, e.length);
      }
      function xu(e, t) {
        if (e !== t) {
          var s = e !== r, u = e === null, f = e === e, d = pt(e), m = t !== r, _ = t === null, b = t === t, P = pt(t);
          if (!_ && !P && !d && e > t || d && m && b && !_ && !P || u && m && b || !s && b || !f)
            return 1;
          if (!u && !d && !P && e < t || P && s && f && !u && !d || _ && s && f || !m && f || !b)
            return -1;
        }
        return 0;
      }
      function _g(e, t, s) {
        for (var u = -1, f = e.criteria, d = t.criteria, m = f.length, _ = s.length; ++u < m; ) {
          var b = xu(f[u], d[u]);
          if (b) {
            if (u >= _)
              return b;
            var P = s[u];
            return b * (P == "desc" ? -1 : 1);
          }
        }
        return e.index - t.index;
      }
      function Du(e, t, s, u) {
        for (var f = -1, d = e.length, m = s.length, _ = -1, b = t.length, P = Ue(d - m, 0), x = L(b + P), k = !u; ++_ < b; )
          x[_] = t[_];
        for (; ++f < m; )
          (k || f < d) && (x[s[f]] = e[f]);
        for (; P--; )
          x[_++] = e[f++];
        return x;
      }
      function Mu(e, t, s, u) {
        for (var f = -1, d = e.length, m = -1, _ = s.length, b = -1, P = t.length, x = Ue(d - _, 0), k = L(x + P), q = !u; ++f < x; )
          k[f] = e[f];
        for (var Z = f; ++b < P; )
          k[Z + b] = t[b];
        for (; ++m < _; )
          (q || f < d) && (k[Z + s[m]] = e[f++]);
        return k;
      }
      function it(e, t) {
        var s = -1, u = e.length;
        for (t || (t = L(u)); ++s < u; )
          t[s] = e[s];
        return t;
      }
      function Ht(e, t, s, u) {
        var f = !s;
        s || (s = {});
        for (var d = -1, m = t.length; ++d < m; ) {
          var _ = t[d], b = u ? u(s[_], e[_], _, s, e) : r;
          b === r && (b = e[_]), f ? Zt(s, _, b) : Lr(s, _, b);
        }
        return s;
      }
      function yg(e, t) {
        return Ht(e, Zs(e), t);
      }
      function vg(e, t) {
        return Ht(e, zu(e), t);
      }
      function wi(e, t) {
        return function(s, u) {
          var f = ie(s) ? Lh : Ud, d = t ? t() : {};
          return f(s, e, j(u, 2), d);
        };
      }
      function er(e) {
        return oe(function(t, s) {
          var u = -1, f = s.length, d = f > 1 ? s[f - 1] : r, m = f > 2 ? s[2] : r;
          for (d = e.length > 3 && typeof d == "function" ? (f--, d) : r, m && je(s[0], s[1], m) && (d = f < 3 ? r : d, f = 1), t = Re(t); ++u < f; ) {
            var _ = s[u];
            _ && e(t, _, u, d);
          }
          return t;
        });
      }
      function Fu(e, t) {
        return function(s, u) {
          if (s == null)
            return s;
          if (!st(s))
            return e(s, u);
          for (var f = s.length, d = t ? f : -1, m = Re(s); (t ? d-- : ++d < f) && u(m[d], d, m) !== !1; )
            ;
          return s;
        };
      }
      function ku(e) {
        return function(t, s, u) {
          for (var f = -1, d = Re(t), m = u(t), _ = m.length; _--; ) {
            var b = m[e ? _ : ++f];
            if (s(d[b], b, d) === !1)
              break;
          }
          return t;
        };
      }
      function wg(e, t, s) {
        var u = t & H, f = Or(e);
        function d() {
          var m = this && this !== qe && this instanceof d ? f : e;
          return m.apply(u ? s : this, arguments);
        }
        return d;
      }
      function Ku(e) {
        return function(t) {
          t = _e(t);
          var s = qn(t) ? Pt(t) : r, u = s ? s[0] : t.charAt(0), f = s ? En(s, 1).join("") : t.slice(1);
          return u[e]() + f;
        };
      }
      function tr(e) {
        return function(t) {
          return ms(Fl(Ml(t).replace(ch, "")), e, "");
        };
      }
      function Or(e) {
        return function() {
          var t = arguments;
          switch (t.length) {
            case 0:
              return new e();
            case 1:
              return new e(t[0]);
            case 2:
              return new e(t[0], t[1]);
            case 3:
              return new e(t[0], t[1], t[2]);
            case 4:
              return new e(t[0], t[1], t[2], t[3]);
            case 5:
              return new e(t[0], t[1], t[2], t[3], t[4]);
            case 6:
              return new e(t[0], t[1], t[2], t[3], t[4], t[5]);
            case 7:
              return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
          }
          var s = jn(e.prototype), u = e.apply(s, t);
          return Pe(u) ? u : s;
        };
      }
      function Eg(e, t, s) {
        var u = Or(e);
        function f() {
          for (var d = arguments.length, m = L(d), _ = d, b = nr(f); _--; )
            m[_] = arguments[_];
          var P = d < 3 && m[0] !== b && m[d - 1] !== b ? [] : mn(m, b);
          if (d -= P.length, d < s)
            return Gu(
              e,
              t,
              Ei,
              f.placeholder,
              r,
              m,
              P,
              r,
              r,
              s - d
            );
          var x = this && this !== qe && this instanceof f ? u : e;
          return ht(x, this, m);
        }
        return f;
      }
      function Wu(e) {
        return function(t, s, u) {
          var f = Re(t);
          if (!st(t)) {
            var d = j(s, 3);
            t = Ve(t), s = function(_) {
              return d(f[_], _, f);
            };
          }
          var m = e(t, s, u);
          return m > -1 ? f[d ? t[m] : m] : r;
        };
      }
      function Uu(e) {
        return en(function(t) {
          var s = t.length, u = s, f = Rt.prototype.thru;
          for (e && t.reverse(); u--; ) {
            var d = t[u];
            if (typeof d != "function")
              throw new Lt(c);
            if (f && !m && Ri(d) == "wrapper")
              var m = new Rt([], !0);
          }
          for (u = m ? u : s; ++u < s; ) {
            d = t[u];
            var _ = Ri(d), b = _ == "wrapper" ? Js(d) : r;
            b && ea(b[0]) && b[1] == (S | W | U | V) && !b[4].length && b[9] == 1 ? m = m[Ri(b[0])].apply(m, b[3]) : m = d.length == 1 && ea(d) ? m[_]() : m.thru(d);
          }
          return function() {
            var P = arguments, x = P[0];
            if (m && P.length == 1 && ie(x))
              return m.plant(x).value();
            for (var k = 0, q = s ? t[k].apply(this, P) : x; ++k < s; )
              q = t[k].call(this, q);
            return q;
          };
        });
      }
      function Ei(e, t, s, u, f, d, m, _, b, P) {
        var x = t & S, k = t & H, q = t & I, Z = t & (W | N), ee = t & G, ae = q ? r : Or(e);
        function te() {
          for (var ce = arguments.length, de = L(ce), mt = ce; mt--; )
            de[mt] = arguments[mt];
          if (Z)
            var et = nr(te), _t = Ph(de, et);
          if (u && (de = Du(de, u, f, Z)), d && (de = Mu(de, d, m, Z)), ce -= _t, Z && ce < P) {
            var ke = mn(de, et);
            return Gu(
              e,
              t,
              Ei,
              te.placeholder,
              s,
              de,
              ke,
              _,
              b,
              P - ce
            );
          }
          var Mt = k ? s : this, sn = q ? Mt[e] : e;
          return ce = de.length, _ ? de = Ug(de, _) : ee && ce > 1 && de.reverse(), x && b < ce && (de.length = b), this && this !== qe && this instanceof te && (sn = ae || Or(sn)), sn.apply(Mt, de);
        }
        return te;
      }
      function Hu(e, t) {
        return function(s, u) {
          return zd(s, e, t(u), {});
        };
      }
      function bi(e, t) {
        return function(s, u) {
          var f;
          if (s === r && u === r)
            return t;
          if (s !== r && (f = s), u !== r) {
            if (f === r)
              return u;
            typeof s == "string" || typeof u == "string" ? (s = gt(s), u = gt(u)) : (s = $u(s), u = $u(u)), f = e(s, u);
          }
          return f;
        };
      }
      function Ys(e) {
        return en(function(t) {
          return t = Ne(t, dt(j())), oe(function(s) {
            var u = this;
            return e(t, function(f) {
              return ht(f, u, s);
            });
          });
        });
      }
      function Ii(e, t) {
        t = t === r ? " " : gt(t);
        var s = t.length;
        if (s < 2)
          return s ? Ks(t, e) : t;
        var u = Ks(t, li(e / Xn(t)));
        return qn(t) ? En(Pt(u), 0, e).join("") : u.slice(0, e);
      }
      function bg(e, t, s, u) {
        var f = t & H, d = Or(e);
        function m() {
          for (var _ = -1, b = arguments.length, P = -1, x = u.length, k = L(x + b), q = this && this !== qe && this instanceof m ? d : e; ++P < x; )
            k[P] = u[P];
          for (; b--; )
            k[P++] = arguments[++_];
          return ht(q, f ? s : this, k);
        }
        return m;
      }
      function Bu(e) {
        return function(t, s, u) {
          return u && typeof u != "number" && je(t, s, u) && (s = u = r), t = rn(t), s === r ? (s = t, t = 0) : s = rn(s), u = u === r ? t < s ? 1 : -1 : rn(u), og(t, s, u, e);
        };
      }
      function Li(e) {
        return function(t, s) {
          return typeof t == "string" && typeof s == "string" || (t = Ot(t), s = Ot(s)), e(t, s);
        };
      }
      function Gu(e, t, s, u, f, d, m, _, b, P) {
        var x = t & W, k = x ? m : r, q = x ? r : m, Z = x ? d : r, ee = x ? r : d;
        t |= x ? U : R, t &= ~(x ? R : U), t & M || (t &= -4);
        var ae = [
          e,
          t,
          f,
          Z,
          k,
          ee,
          q,
          _,
          b,
          P
        ], te = s.apply(r, ae);
        return ea(e) && nl(te, ae), te.placeholder = u, rl(te, e, t);
      }
      function qs(e) {
        var t = We[e];
        return function(s, u) {
          if (s = Ot(s), u = u == null ? 0 : ze(se(u), 292), u && ru(s)) {
            var f = (_e(s) + "e").split("e"), d = t(f[0] + "e" + (+f[1] + u));
            return f = (_e(d) + "e").split("e"), +(f[0] + "e" + (+f[1] - u));
          }
          return t(s);
        };
      }
      var Ig = Qn && 1 / jr(new Qn([, -0]))[1] == Ce ? function(e) {
        return new Qn(e);
      } : pa;
      function Vu(e) {
        return function(t) {
          var s = Je(t);
          return s == Ge ? Is(t) : s == Q ? Wh(t) : Nh(t, e(t));
        };
      }
      function jt(e, t, s, u, f, d, m, _) {
        var b = t & I;
        if (!b && typeof e != "function")
          throw new Lt(c);
        var P = u ? u.length : 0;
        if (P || (t &= -97, u = f = r), m = m === r ? m : Ue(se(m), 0), _ = _ === r ? _ : se(_), P -= f ? f.length : 0, t & R) {
          var x = u, k = f;
          u = f = r;
        }
        var q = b ? r : Js(e), Z = [
          e,
          t,
          s,
          u,
          f,
          x,
          k,
          d,
          m,
          _
        ];
        if (q && kg(Z, q), e = Z[0], t = Z[1], s = Z[2], u = Z[3], f = Z[4], _ = Z[9] = Z[9] === r ? b ? 0 : e.length : Ue(Z[9] - P, 0), !_ && t & (W | N) && (t &= -25), !t || t == H)
          var ee = wg(e, t, s);
        else t == W || t == N ? ee = Eg(e, t, _) : (t == U || t == (H | U)) && !f.length ? ee = bg(e, t, s, u) : ee = Ei.apply(r, Z);
        var ae = q ? Ru : nl;
        return rl(ae(ee, Z), e, t);
      }
      function Yu(e, t, s, u) {
        return e === r || Dt(e, Jn[s]) && !we.call(u, s) ? t : e;
      }
      function qu(e, t, s, u, f, d) {
        return Pe(e) && Pe(t) && (d.set(t, e), _i(e, t, r, qu, d), d.delete(t)), e;
      }
      function Lg(e) {
        return Nr(e) ? r : e;
      }
      function Xu(e, t, s, u, f, d) {
        var m = s & X, _ = e.length, b = t.length;
        if (_ != b && !(m && b > _))
          return !1;
        var P = d.get(e), x = d.get(t);
        if (P && x)
          return P == t && x == e;
        var k = -1, q = !0, Z = s & Y ? new xn() : r;
        for (d.set(e, t), d.set(t, e); ++k < _; ) {
          var ee = e[k], ae = t[k];
          if (u)
            var te = m ? u(ae, ee, k, t, e, d) : u(ee, ae, k, e, t, d);
          if (te !== r) {
            if (te)
              continue;
            q = !1;
            break;
          }
          if (Z) {
            if (!_s(t, function(ce, de) {
              if (!yr(Z, de) && (ee === ce || f(ee, ce, s, u, d)))
                return Z.push(de);
            })) {
              q = !1;
              break;
            }
          } else if (!(ee === ae || f(ee, ae, s, u, d))) {
            q = !1;
            break;
          }
        }
        return d.delete(e), d.delete(t), q;
      }
      function Rg(e, t, s, u, f, d, m) {
        switch (s) {
          case rt:
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
              return !1;
            e = e.buffer, t = t.buffer;
          case Le:
            return !(e.byteLength != t.byteLength || !d(new si(e), new si(t)));
          case Kt:
          case zt:
          case Et:
            return Dt(+e, +t);
          case cn:
            return e.name == t.name && e.message == t.message;
          case F:
          case Ie:
            return e == t + "";
          case Ge:
            var _ = Is;
          case Q:
            var b = u & X;
            if (_ || (_ = jr), e.size != t.size && !b)
              return !1;
            var P = m.get(e);
            if (P)
              return P == t;
            u |= Y, m.set(e, t);
            var x = Xu(_(e), _(t), u, f, d, m);
            return m.delete(e), x;
          case re:
            if (Ir)
              return Ir.call(e) == Ir.call(t);
        }
        return !1;
      }
      function Sg(e, t, s, u, f, d) {
        var m = s & X, _ = Xs(e), b = _.length, P = Xs(t), x = P.length;
        if (b != x && !m)
          return !1;
        for (var k = b; k--; ) {
          var q = _[k];
          if (!(m ? q in t : we.call(t, q)))
            return !1;
        }
        var Z = d.get(e), ee = d.get(t);
        if (Z && ee)
          return Z == t && ee == e;
        var ae = !0;
        d.set(e, t), d.set(t, e);
        for (var te = m; ++k < b; ) {
          q = _[k];
          var ce = e[q], de = t[q];
          if (u)
            var mt = m ? u(de, ce, q, t, e, d) : u(ce, de, q, e, t, d);
          if (!(mt === r ? ce === de || f(ce, de, s, u, d) : mt)) {
            ae = !1;
            break;
          }
          te || (te = q == "constructor");
        }
        if (ae && !te) {
          var et = e.constructor, _t = t.constructor;
          et != _t && "constructor" in e && "constructor" in t && !(typeof et == "function" && et instanceof et && typeof _t == "function" && _t instanceof _t) && (ae = !1);
        }
        return d.delete(e), d.delete(t), ae;
      }
      function en(e) {
        return na(el(e, r, ll), e + "");
      }
      function Xs(e) {
        return gu(e, Ve, Zs);
      }
      function zs(e) {
        return gu(e, at, zu);
      }
      var Js = fi ? function(e) {
        return fi.get(e);
      } : pa;
      function Ri(e) {
        for (var t = e.name + "", s = Zn[t], u = we.call(Zn, t) ? s.length : 0; u--; ) {
          var f = s[u], d = f.func;
          if (d == null || d == e)
            return f.name;
        }
        return t;
      }
      function nr(e) {
        var t = we.call(h, "placeholder") ? h : e;
        return t.placeholder;
      }
      function j() {
        var e = h.iteratee || da;
        return e = e === da ? _u : e, arguments.length ? e(arguments[0], arguments[1]) : e;
      }
      function Si(e, t) {
        var s = e.__data__;
        return xg(t) ? s[typeof t == "string" ? "string" : "hash"] : s.map;
      }
      function Qs(e) {
        for (var t = Ve(e), s = t.length; s--; ) {
          var u = t[s], f = e[u];
          t[s] = [u, f, Zu(f)];
        }
        return t;
      }
      function Fn(e, t) {
        var s = Fh(e, t);
        return mu(s) ? s : r;
      }
      function $g(e) {
        var t = we.call(e, Nn), s = e[Nn];
        try {
          e[Nn] = r;
          var u = !0;
        } catch {
        }
        var f = ri.call(e);
        return u && (t ? e[Nn] = s : delete e[Nn]), f;
      }
      var Zs = Rs ? function(e) {
        return e == null ? [] : (e = Re(e), gn(Rs(e), function(t) {
          return tu.call(e, t);
        }));
      } : ma, zu = Rs ? function(e) {
        for (var t = []; e; )
          pn(t, Zs(e)), e = ai(e);
        return t;
      } : ma, Je = Ze;
      (Ss && Je(new Ss(new ArrayBuffer(1))) != rt || wr && Je(new wr()) != Ge || $s && Je($s.resolve()) != y || Qn && Je(new Qn()) != Q || Er && Je(new Er()) != K) && (Je = function(e) {
        var t = Ze(e), s = t == ft ? e.constructor : r, u = s ? kn(s) : "";
        if (u)
          switch (u) {
            case ld:
              return rt;
            case cd:
              return Ge;
            case fd:
              return y;
            case hd:
              return Q;
            case dd:
              return K;
          }
        return t;
      });
      function Tg(e, t, s) {
        for (var u = -1, f = s.length; ++u < f; ) {
          var d = s[u], m = d.size;
          switch (d.type) {
            case "drop":
              e += m;
              break;
            case "dropRight":
              t -= m;
              break;
            case "take":
              t = ze(t, e + m);
              break;
            case "takeRight":
              e = Ue(e, t - m);
              break;
          }
        }
        return { start: e, end: t };
      }
      function Og(e) {
        var t = e.match(Df);
        return t ? t[1].split(Mf) : [];
      }
      function Ju(e, t, s) {
        t = wn(t, e);
        for (var u = -1, f = t.length, d = !1; ++u < f; ) {
          var m = Bt(t[u]);
          if (!(d = e != null && s(e, m)))
            break;
          e = e[m];
        }
        return d || ++u != f ? d : (f = e == null ? 0 : e.length, !!f && Pi(f) && tn(m, f) && (ie(e) || Kn(e)));
      }
      function Ag(e) {
        var t = e.length, s = new e.constructor(t);
        return t && typeof e[0] == "string" && we.call(e, "index") && (s.index = e.index, s.input = e.input), s;
      }
      function Qu(e) {
        return typeof e.constructor == "function" && !Ar(e) ? jn(ai(e)) : {};
      }
      function Cg(e, t, s) {
        var u = e.constructor;
        switch (t) {
          case Le:
            return Vs(e);
          case Kt:
          case zt:
            return new u(+e);
          case rt:
            return gg(e, s);
          case dn:
          case Wt:
          case _r:
          case qr:
          case ts:
          case ns:
          case rs:
          case is:
          case ss:
            return Pu(e, s);
          case Ge:
            return new u();
          case Et:
          case Ie:
            return new u(e);
          case F:
            return pg(e);
          case Q:
            return new u();
          case re:
            return mg(e);
        }
      }
      function Ng(e, t) {
        var s = t.length;
        if (!s)
          return e;
        var u = s - 1;
        return t[u] = (s > 1 ? "& " : "") + t[u], t = t.join(s > 2 ? ", " : " "), e.replace(xf, `{
/* [wrapped with ` + t + `] */
`);
      }
      function Pg(e) {
        return ie(e) || Kn(e) || !!(nu && e && e[nu]);
      }
      function tn(e, t) {
        var s = typeof e;
        return t = t ?? wt, !!t && (s == "number" || s != "symbol" && Vf.test(e)) && e > -1 && e % 1 == 0 && e < t;
      }
      function je(e, t, s) {
        if (!Pe(s))
          return !1;
        var u = typeof t;
        return (u == "number" ? st(s) && tn(t, s.length) : u == "string" && t in s) ? Dt(s[t], e) : !1;
      }
      function js(e, t) {
        if (ie(e))
          return !1;
        var s = typeof e;
        return s == "number" || s == "symbol" || s == "boolean" || e == null || pt(e) ? !0 : Af.test(e) || !Of.test(e) || t != null && e in Re(t);
      }
      function xg(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
      }
      function ea(e) {
        var t = Ri(e), s = h[t];
        if (typeof s != "function" || !(t in fe.prototype))
          return !1;
        if (e === s)
          return !0;
        var u = Js(s);
        return !!u && e === u[0];
      }
      function Dg(e) {
        return !!Zo && Zo in e;
      }
      var Mg = ti ? nn : _a;
      function Ar(e) {
        var t = e && e.constructor, s = typeof t == "function" && t.prototype || Jn;
        return e === s;
      }
      function Zu(e) {
        return e === e && !Pe(e);
      }
      function ju(e, t) {
        return function(s) {
          return s == null ? !1 : s[e] === t && (t !== r || e in Re(s));
        };
      }
      function Fg(e) {
        var t = Ci(e, function(u) {
          return s.size === v && s.clear(), u;
        }), s = t.cache;
        return t;
      }
      function kg(e, t) {
        var s = e[1], u = t[1], f = s | u, d = f < (H | I | S), m = u == S && s == W || u == S && s == V && e[7].length <= t[8] || u == (S | V) && t[7].length <= t[8] && s == W;
        if (!(d || m))
          return e;
        u & H && (e[2] = t[2], f |= s & H ? 0 : M);
        var _ = t[3];
        if (_) {
          var b = e[3];
          e[3] = b ? Du(b, _, t[4]) : _, e[4] = b ? mn(e[3], $) : t[4];
        }
        return _ = t[5], _ && (b = e[5], e[5] = b ? Mu(b, _, t[6]) : _, e[6] = b ? mn(e[5], $) : t[6]), _ = t[7], _ && (e[7] = _), u & S && (e[8] = e[8] == null ? t[8] : ze(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = f, e;
      }
      function Kg(e) {
        var t = [];
        if (e != null)
          for (var s in Re(e))
            t.push(s);
        return t;
      }
      function Wg(e) {
        return ri.call(e);
      }
      function el(e, t, s) {
        return t = Ue(t === r ? e.length - 1 : t, 0), function() {
          for (var u = arguments, f = -1, d = Ue(u.length - t, 0), m = L(d); ++f < d; )
            m[f] = u[t + f];
          f = -1;
          for (var _ = L(t + 1); ++f < t; )
            _[f] = u[f];
          return _[t] = s(m), ht(e, this, _);
        };
      }
      function tl(e, t) {
        return t.length < 2 ? e : Mn(e, $t(t, 0, -1));
      }
      function Ug(e, t) {
        for (var s = e.length, u = ze(t.length, s), f = it(e); u--; ) {
          var d = t[u];
          e[u] = tn(d, s) ? f[d] : r;
        }
        return e;
      }
      function ta(e, t) {
        if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
          return e[t];
      }
      var nl = il(Ru), Cr = nd || function(e, t) {
        return qe.setTimeout(e, t);
      }, na = il(cg);
      function rl(e, t, s) {
        var u = t + "";
        return na(e, Ng(u, Hg(Og(u), s)));
      }
      function il(e) {
        var t = 0, s = 0;
        return function() {
          var u = ad(), f = Ye - (u - s);
          if (s = u, f > 0) {
            if (++t >= he)
              return arguments[0];
          } else
            t = 0;
          return e.apply(r, arguments);
        };
      }
      function $i(e, t) {
        var s = -1, u = e.length, f = u - 1;
        for (t = t === r ? u : t; ++s < t; ) {
          var d = ks(s, f), m = e[d];
          e[d] = e[s], e[s] = m;
        }
        return e.length = t, e;
      }
      var sl = Fg(function(e) {
        var t = [];
        return e.charCodeAt(0) === 46 && t.push(""), e.replace(Cf, function(s, u, f, d) {
          t.push(f ? d.replace(Kf, "$1") : u || s);
        }), t;
      });
      function Bt(e) {
        if (typeof e == "string" || pt(e))
          return e;
        var t = e + "";
        return t == "0" && 1 / e == -Ce ? "-0" : t;
      }
      function kn(e) {
        if (e != null) {
          try {
            return ni.call(e);
          } catch {
          }
          try {
            return e + "";
          } catch {
          }
        }
        return "";
      }
      function Hg(e, t) {
        return It(gr, function(s) {
          var u = "_." + s[0];
          t & s[1] && !Qr(e, u) && e.push(u);
        }), e.sort();
      }
      function al(e) {
        if (e instanceof fe)
          return e.clone();
        var t = new Rt(e.__wrapped__, e.__chain__);
        return t.__actions__ = it(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
      }
      function Bg(e, t, s) {
        (s ? je(e, t, s) : t === r) ? t = 1 : t = Ue(se(t), 0);
        var u = e == null ? 0 : e.length;
        if (!u || t < 1)
          return [];
        for (var f = 0, d = 0, m = L(li(u / t)); f < u; )
          m[d++] = $t(e, f, f += t);
        return m;
      }
      function Gg(e) {
        for (var t = -1, s = e == null ? 0 : e.length, u = 0, f = []; ++t < s; ) {
          var d = e[t];
          d && (f[u++] = d);
        }
        return f;
      }
      function Vg() {
        var e = arguments.length;
        if (!e)
          return [];
        for (var t = L(e - 1), s = arguments[0], u = e; u--; )
          t[u - 1] = arguments[u];
        return pn(ie(s) ? it(s) : [s], Xe(t, 1));
      }
      var Yg = oe(function(e, t) {
        return Fe(e) ? Rr(e, Xe(t, 1, Fe, !0)) : [];
      }), qg = oe(function(e, t) {
        var s = Tt(t);
        return Fe(s) && (s = r), Fe(e) ? Rr(e, Xe(t, 1, Fe, !0), j(s, 2)) : [];
      }), Xg = oe(function(e, t) {
        var s = Tt(t);
        return Fe(s) && (s = r), Fe(e) ? Rr(e, Xe(t, 1, Fe, !0), r, s) : [];
      });
      function zg(e, t, s) {
        var u = e == null ? 0 : e.length;
        return u ? (t = s || t === r ? 1 : se(t), $t(e, t < 0 ? 0 : t, u)) : [];
      }
      function Jg(e, t, s) {
        var u = e == null ? 0 : e.length;
        return u ? (t = s || t === r ? 1 : se(t), t = u - t, $t(e, 0, t < 0 ? 0 : t)) : [];
      }
      function Qg(e, t) {
        return e && e.length ? vi(e, j(t, 3), !0, !0) : [];
      }
      function Zg(e, t) {
        return e && e.length ? vi(e, j(t, 3), !0) : [];
      }
      function jg(e, t, s, u) {
        var f = e == null ? 0 : e.length;
        return f ? (s && typeof s != "number" && je(e, t, s) && (s = 0, u = f), Vd(e, t, s, u)) : [];
      }
      function ol(e, t, s) {
        var u = e == null ? 0 : e.length;
        if (!u)
          return -1;
        var f = s == null ? 0 : se(s);
        return f < 0 && (f = Ue(u + f, 0)), Zr(e, j(t, 3), f);
      }
      function ul(e, t, s) {
        var u = e == null ? 0 : e.length;
        if (!u)
          return -1;
        var f = u - 1;
        return s !== r && (f = se(s), f = s < 0 ? Ue(u + f, 0) : ze(f, u - 1)), Zr(e, j(t, 3), f, !0);
      }
      function ll(e) {
        var t = e == null ? 0 : e.length;
        return t ? Xe(e, 1) : [];
      }
      function ep(e) {
        var t = e == null ? 0 : e.length;
        return t ? Xe(e, Ce) : [];
      }
      function tp(e, t) {
        var s = e == null ? 0 : e.length;
        return s ? (t = t === r ? 1 : se(t), Xe(e, t)) : [];
      }
      function np(e) {
        for (var t = -1, s = e == null ? 0 : e.length, u = {}; ++t < s; ) {
          var f = e[t];
          u[f[0]] = f[1];
        }
        return u;
      }
      function cl(e) {
        return e && e.length ? e[0] : r;
      }
      function rp(e, t, s) {
        var u = e == null ? 0 : e.length;
        if (!u)
          return -1;
        var f = s == null ? 0 : se(s);
        return f < 0 && (f = Ue(u + f, 0)), Yn(e, t, f);
      }
      function ip(e) {
        var t = e == null ? 0 : e.length;
        return t ? $t(e, 0, -1) : [];
      }
      var sp = oe(function(e) {
        var t = Ne(e, Bs);
        return t.length && t[0] === e[0] ? Ps(t) : [];
      }), ap = oe(function(e) {
        var t = Tt(e), s = Ne(e, Bs);
        return t === Tt(s) ? t = r : s.pop(), s.length && s[0] === e[0] ? Ps(s, j(t, 2)) : [];
      }), op = oe(function(e) {
        var t = Tt(e), s = Ne(e, Bs);
        return t = typeof t == "function" ? t : r, t && s.pop(), s.length && s[0] === e[0] ? Ps(s, r, t) : [];
      });
      function up(e, t) {
        return e == null ? "" : id.call(e, t);
      }
      function Tt(e) {
        var t = e == null ? 0 : e.length;
        return t ? e[t - 1] : r;
      }
      function lp(e, t, s) {
        var u = e == null ? 0 : e.length;
        if (!u)
          return -1;
        var f = u;
        return s !== r && (f = se(s), f = f < 0 ? Ue(u + f, 0) : ze(f, u - 1)), t === t ? Hh(e, t, f) : Zr(e, Go, f, !0);
      }
      function cp(e, t) {
        return e && e.length ? Eu(e, se(t)) : r;
      }
      var fp = oe(fl);
      function fl(e, t) {
        return e && e.length && t && t.length ? Fs(e, t) : e;
      }
      function hp(e, t, s) {
        return e && e.length && t && t.length ? Fs(e, t, j(s, 2)) : e;
      }
      function dp(e, t, s) {
        return e && e.length && t && t.length ? Fs(e, t, r, s) : e;
      }
      var gp = en(function(e, t) {
        var s = e == null ? 0 : e.length, u = Os(e, t);
        return Lu(e, Ne(t, function(f) {
          return tn(f, s) ? +f : f;
        }).sort(xu)), u;
      });
      function pp(e, t) {
        var s = [];
        if (!(e && e.length))
          return s;
        var u = -1, f = [], d = e.length;
        for (t = j(t, 3); ++u < d; ) {
          var m = e[u];
          t(m, u, e) && (s.push(m), f.push(u));
        }
        return Lu(e, f), s;
      }
      function ra(e) {
        return e == null ? e : ud.call(e);
      }
      function mp(e, t, s) {
        var u = e == null ? 0 : e.length;
        return u ? (s && typeof s != "number" && je(e, t, s) ? (t = 0, s = u) : (t = t == null ? 0 : se(t), s = s === r ? u : se(s)), $t(e, t, s)) : [];
      }
      function _p(e, t) {
        return yi(e, t);
      }
      function yp(e, t, s) {
        return Ws(e, t, j(s, 2));
      }
      function vp(e, t) {
        var s = e == null ? 0 : e.length;
        if (s) {
          var u = yi(e, t);
          if (u < s && Dt(e[u], t))
            return u;
        }
        return -1;
      }
      function wp(e, t) {
        return yi(e, t, !0);
      }
      function Ep(e, t, s) {
        return Ws(e, t, j(s, 2), !0);
      }
      function bp(e, t) {
        var s = e == null ? 0 : e.length;
        if (s) {
          var u = yi(e, t, !0) - 1;
          if (Dt(e[u], t))
            return u;
        }
        return -1;
      }
      function Ip(e) {
        return e && e.length ? Su(e) : [];
      }
      function Lp(e, t) {
        return e && e.length ? Su(e, j(t, 2)) : [];
      }
      function Rp(e) {
        var t = e == null ? 0 : e.length;
        return t ? $t(e, 1, t) : [];
      }
      function Sp(e, t, s) {
        return e && e.length ? (t = s || t === r ? 1 : se(t), $t(e, 0, t < 0 ? 0 : t)) : [];
      }
      function $p(e, t, s) {
        var u = e == null ? 0 : e.length;
        return u ? (t = s || t === r ? 1 : se(t), t = u - t, $t(e, t < 0 ? 0 : t, u)) : [];
      }
      function Tp(e, t) {
        return e && e.length ? vi(e, j(t, 3), !1, !0) : [];
      }
      function Op(e, t) {
        return e && e.length ? vi(e, j(t, 3)) : [];
      }
      var Ap = oe(function(e) {
        return vn(Xe(e, 1, Fe, !0));
      }), Cp = oe(function(e) {
        var t = Tt(e);
        return Fe(t) && (t = r), vn(Xe(e, 1, Fe, !0), j(t, 2));
      }), Np = oe(function(e) {
        var t = Tt(e);
        return t = typeof t == "function" ? t : r, vn(Xe(e, 1, Fe, !0), r, t);
      });
      function Pp(e) {
        return e && e.length ? vn(e) : [];
      }
      function xp(e, t) {
        return e && e.length ? vn(e, j(t, 2)) : [];
      }
      function Dp(e, t) {
        return t = typeof t == "function" ? t : r, e && e.length ? vn(e, r, t) : [];
      }
      function ia(e) {
        if (!(e && e.length))
          return [];
        var t = 0;
        return e = gn(e, function(s) {
          if (Fe(s))
            return t = Ue(s.length, t), !0;
        }), Es(t, function(s) {
          return Ne(e, ys(s));
        });
      }
      function hl(e, t) {
        if (!(e && e.length))
          return [];
        var s = ia(e);
        return t == null ? s : Ne(s, function(u) {
          return ht(t, r, u);
        });
      }
      var Mp = oe(function(e, t) {
        return Fe(e) ? Rr(e, t) : [];
      }), Fp = oe(function(e) {
        return Hs(gn(e, Fe));
      }), kp = oe(function(e) {
        var t = Tt(e);
        return Fe(t) && (t = r), Hs(gn(e, Fe), j(t, 2));
      }), Kp = oe(function(e) {
        var t = Tt(e);
        return t = typeof t == "function" ? t : r, Hs(gn(e, Fe), r, t);
      }), Wp = oe(ia);
      function Up(e, t) {
        return Au(e || [], t || [], Lr);
      }
      function Hp(e, t) {
        return Au(e || [], t || [], Tr);
      }
      var Bp = oe(function(e) {
        var t = e.length, s = t > 1 ? e[t - 1] : r;
        return s = typeof s == "function" ? (e.pop(), s) : r, hl(e, s);
      });
      function dl(e) {
        var t = h(e);
        return t.__chain__ = !0, t;
      }
      function Gp(e, t) {
        return t(e), e;
      }
      function Ti(e, t) {
        return t(e);
      }
      var Vp = en(function(e) {
        var t = e.length, s = t ? e[0] : 0, u = this.__wrapped__, f = function(d) {
          return Os(d, e);
        };
        return t > 1 || this.__actions__.length || !(u instanceof fe) || !tn(s) ? this.thru(f) : (u = u.slice(s, +s + (t ? 1 : 0)), u.__actions__.push({
          func: Ti,
          args: [f],
          thisArg: r
        }), new Rt(u, this.__chain__).thru(function(d) {
          return t && !d.length && d.push(r), d;
        }));
      });
      function Yp() {
        return dl(this);
      }
      function qp() {
        return new Rt(this.value(), this.__chain__);
      }
      function Xp() {
        this.__values__ === r && (this.__values__ = $l(this.value()));
        var e = this.__index__ >= this.__values__.length, t = e ? r : this.__values__[this.__index__++];
        return { done: e, value: t };
      }
      function zp() {
        return this;
      }
      function Jp(e) {
        for (var t, s = this; s instanceof di; ) {
          var u = al(s);
          u.__index__ = 0, u.__values__ = r, t ? f.__wrapped__ = u : t = u;
          var f = u;
          s = s.__wrapped__;
        }
        return f.__wrapped__ = e, t;
      }
      function Qp() {
        var e = this.__wrapped__;
        if (e instanceof fe) {
          var t = e;
          return this.__actions__.length && (t = new fe(this)), t = t.reverse(), t.__actions__.push({
            func: Ti,
            args: [ra],
            thisArg: r
          }), new Rt(t, this.__chain__);
        }
        return this.thru(ra);
      }
      function Zp() {
        return Ou(this.__wrapped__, this.__actions__);
      }
      var jp = wi(function(e, t, s) {
        we.call(e, s) ? ++e[s] : Zt(e, s, 1);
      });
      function em(e, t, s) {
        var u = ie(e) ? Ho : Gd;
        return s && je(e, t, s) && (t = r), u(e, j(t, 3));
      }
      function tm(e, t) {
        var s = ie(e) ? gn : hu;
        return s(e, j(t, 3));
      }
      var nm = Wu(ol), rm = Wu(ul);
      function im(e, t) {
        return Xe(Oi(e, t), 1);
      }
      function sm(e, t) {
        return Xe(Oi(e, t), Ce);
      }
      function am(e, t, s) {
        return s = s === r ? 1 : se(s), Xe(Oi(e, t), s);
      }
      function gl(e, t) {
        var s = ie(e) ? It : yn;
        return s(e, j(t, 3));
      }
      function pl(e, t) {
        var s = ie(e) ? Rh : fu;
        return s(e, j(t, 3));
      }
      var om = wi(function(e, t, s) {
        we.call(e, s) ? e[s].push(t) : Zt(e, s, [t]);
      });
      function um(e, t, s, u) {
        e = st(e) ? e : ir(e), s = s && !u ? se(s) : 0;
        var f = e.length;
        return s < 0 && (s = Ue(f + s, 0)), xi(e) ? s <= f && e.indexOf(t, s) > -1 : !!f && Yn(e, t, s) > -1;
      }
      var lm = oe(function(e, t, s) {
        var u = -1, f = typeof t == "function", d = st(e) ? L(e.length) : [];
        return yn(e, function(m) {
          d[++u] = f ? ht(t, m, s) : Sr(m, t, s);
        }), d;
      }), cm = wi(function(e, t, s) {
        Zt(e, s, t);
      });
      function Oi(e, t) {
        var s = ie(e) ? Ne : yu;
        return s(e, j(t, 3));
      }
      function fm(e, t, s, u) {
        return e == null ? [] : (ie(t) || (t = t == null ? [] : [t]), s = u ? r : s, ie(s) || (s = s == null ? [] : [s]), bu(e, t, s));
      }
      var hm = wi(function(e, t, s) {
        e[s ? 0 : 1].push(t);
      }, function() {
        return [[], []];
      });
      function dm(e, t, s) {
        var u = ie(e) ? ms : Yo, f = arguments.length < 3;
        return u(e, j(t, 4), s, f, yn);
      }
      function gm(e, t, s) {
        var u = ie(e) ? Sh : Yo, f = arguments.length < 3;
        return u(e, j(t, 4), s, f, fu);
      }
      function pm(e, t) {
        var s = ie(e) ? gn : hu;
        return s(e, Ni(j(t, 3)));
      }
      function mm(e) {
        var t = ie(e) ? ou : ug;
        return t(e);
      }
      function _m(e, t, s) {
        (s ? je(e, t, s) : t === r) ? t = 1 : t = se(t);
        var u = ie(e) ? Kd : lg;
        return u(e, t);
      }
      function ym(e) {
        var t = ie(e) ? Wd : fg;
        return t(e);
      }
      function vm(e) {
        if (e == null)
          return 0;
        if (st(e))
          return xi(e) ? Xn(e) : e.length;
        var t = Je(e);
        return t == Ge || t == Q ? e.size : Ds(e).length;
      }
      function wm(e, t, s) {
        var u = ie(e) ? _s : hg;
        return s && je(e, t, s) && (t = r), u(e, j(t, 3));
      }
      var Em = oe(function(e, t) {
        if (e == null)
          return [];
        var s = t.length;
        return s > 1 && je(e, t[0], t[1]) ? t = [] : s > 2 && je(t[0], t[1], t[2]) && (t = [t[0]]), bu(e, Xe(t, 1), []);
      }), Ai = td || function() {
        return qe.Date.now();
      };
      function bm(e, t) {
        if (typeof t != "function")
          throw new Lt(c);
        return e = se(e), function() {
          if (--e < 1)
            return t.apply(this, arguments);
        };
      }
      function ml(e, t, s) {
        return t = s ? r : t, t = e && t == null ? e.length : t, jt(e, S, r, r, r, r, t);
      }
      function _l(e, t) {
        var s;
        if (typeof t != "function")
          throw new Lt(c);
        return e = se(e), function() {
          return --e > 0 && (s = t.apply(this, arguments)), e <= 1 && (t = r), s;
        };
      }
      var sa = oe(function(e, t, s) {
        var u = H;
        if (s.length) {
          var f = mn(s, nr(sa));
          u |= U;
        }
        return jt(e, u, t, s, f);
      }), yl = oe(function(e, t, s) {
        var u = H | I;
        if (s.length) {
          var f = mn(s, nr(yl));
          u |= U;
        }
        return jt(t, u, e, s, f);
      });
      function vl(e, t, s) {
        t = s ? r : t;
        var u = jt(e, W, r, r, r, r, r, t);
        return u.placeholder = vl.placeholder, u;
      }
      function wl(e, t, s) {
        t = s ? r : t;
        var u = jt(e, N, r, r, r, r, r, t);
        return u.placeholder = wl.placeholder, u;
      }
      function El(e, t, s) {
        var u, f, d, m, _, b, P = 0, x = !1, k = !1, q = !0;
        if (typeof e != "function")
          throw new Lt(c);
        t = Ot(t) || 0, Pe(s) && (x = !!s.leading, k = "maxWait" in s, d = k ? Ue(Ot(s.maxWait) || 0, t) : d, q = "trailing" in s ? !!s.trailing : q);
        function Z(ke) {
          var Mt = u, sn = f;
          return u = f = r, P = ke, m = e.apply(sn, Mt), m;
        }
        function ee(ke) {
          return P = ke, _ = Cr(ce, t), x ? Z(ke) : m;
        }
        function ae(ke) {
          var Mt = ke - b, sn = ke - P, Wl = t - Mt;
          return k ? ze(Wl, d - sn) : Wl;
        }
        function te(ke) {
          var Mt = ke - b, sn = ke - P;
          return b === r || Mt >= t || Mt < 0 || k && sn >= d;
        }
        function ce() {
          var ke = Ai();
          if (te(ke))
            return de(ke);
          _ = Cr(ce, ae(ke));
        }
        function de(ke) {
          return _ = r, q && u ? Z(ke) : (u = f = r, m);
        }
        function mt() {
          _ !== r && Cu(_), P = 0, u = b = f = _ = r;
        }
        function et() {
          return _ === r ? m : de(Ai());
        }
        function _t() {
          var ke = Ai(), Mt = te(ke);
          if (u = arguments, f = this, b = ke, Mt) {
            if (_ === r)
              return ee(b);
            if (k)
              return Cu(_), _ = Cr(ce, t), Z(b);
          }
          return _ === r && (_ = Cr(ce, t)), m;
        }
        return _t.cancel = mt, _t.flush = et, _t;
      }
      var Im = oe(function(e, t) {
        return cu(e, 1, t);
      }), Lm = oe(function(e, t, s) {
        return cu(e, Ot(t) || 0, s);
      });
      function Rm(e) {
        return jt(e, G);
      }
      function Ci(e, t) {
        if (typeof e != "function" || t != null && typeof t != "function")
          throw new Lt(c);
        var s = function() {
          var u = arguments, f = t ? t.apply(this, u) : u[0], d = s.cache;
          if (d.has(f))
            return d.get(f);
          var m = e.apply(this, u);
          return s.cache = d.set(f, m) || d, m;
        };
        return s.cache = new (Ci.Cache || Qt)(), s;
      }
      Ci.Cache = Qt;
      function Ni(e) {
        if (typeof e != "function")
          throw new Lt(c);
        return function() {
          var t = arguments;
          switch (t.length) {
            case 0:
              return !e.call(this);
            case 1:
              return !e.call(this, t[0]);
            case 2:
              return !e.call(this, t[0], t[1]);
            case 3:
              return !e.call(this, t[0], t[1], t[2]);
          }
          return !e.apply(this, t);
        };
      }
      function Sm(e) {
        return _l(2, e);
      }
      var $m = dg(function(e, t) {
        t = t.length == 1 && ie(t[0]) ? Ne(t[0], dt(j())) : Ne(Xe(t, 1), dt(j()));
        var s = t.length;
        return oe(function(u) {
          for (var f = -1, d = ze(u.length, s); ++f < d; )
            u[f] = t[f].call(this, u[f]);
          return ht(e, this, u);
        });
      }), aa = oe(function(e, t) {
        var s = mn(t, nr(aa));
        return jt(e, U, r, t, s);
      }), bl = oe(function(e, t) {
        var s = mn(t, nr(bl));
        return jt(e, R, r, t, s);
      }), Tm = en(function(e, t) {
        return jt(e, V, r, r, r, t);
      });
      function Om(e, t) {
        if (typeof e != "function")
          throw new Lt(c);
        return t = t === r ? t : se(t), oe(e, t);
      }
      function Am(e, t) {
        if (typeof e != "function")
          throw new Lt(c);
        return t = t == null ? 0 : Ue(se(t), 0), oe(function(s) {
          var u = s[t], f = En(s, 0, t);
          return u && pn(f, u), ht(e, this, f);
        });
      }
      function Cm(e, t, s) {
        var u = !0, f = !0;
        if (typeof e != "function")
          throw new Lt(c);
        return Pe(s) && (u = "leading" in s ? !!s.leading : u, f = "trailing" in s ? !!s.trailing : f), El(e, t, {
          leading: u,
          maxWait: t,
          trailing: f
        });
      }
      function Nm(e) {
        return ml(e, 1);
      }
      function Pm(e, t) {
        return aa(Gs(t), e);
      }
      function xm() {
        if (!arguments.length)
          return [];
        var e = arguments[0];
        return ie(e) ? e : [e];
      }
      function Dm(e) {
        return St(e, B);
      }
      function Mm(e, t) {
        return t = typeof t == "function" ? t : r, St(e, B, t);
      }
      function Fm(e) {
        return St(e, O | B);
      }
      function km(e, t) {
        return t = typeof t == "function" ? t : r, St(e, O | B, t);
      }
      function Km(e, t) {
        return t == null || lu(e, t, Ve(t));
      }
      function Dt(e, t) {
        return e === t || e !== e && t !== t;
      }
      var Wm = Li(Ns), Um = Li(function(e, t) {
        return e >= t;
      }), Kn = pu(/* @__PURE__ */ function() {
        return arguments;
      }()) ? pu : function(e) {
        return xe(e) && we.call(e, "callee") && !tu.call(e, "callee");
      }, ie = L.isArray, Hm = Mo ? dt(Mo) : Jd;
      function st(e) {
        return e != null && Pi(e.length) && !nn(e);
      }
      function Fe(e) {
        return xe(e) && st(e);
      }
      function Bm(e) {
        return e === !0 || e === !1 || xe(e) && Ze(e) == Kt;
      }
      var bn = rd || _a, Gm = Fo ? dt(Fo) : Qd;
      function Vm(e) {
        return xe(e) && e.nodeType === 1 && !Nr(e);
      }
      function Ym(e) {
        if (e == null)
          return !0;
        if (st(e) && (ie(e) || typeof e == "string" || typeof e.splice == "function" || bn(e) || rr(e) || Kn(e)))
          return !e.length;
        var t = Je(e);
        if (t == Ge || t == Q)
          return !e.size;
        if (Ar(e))
          return !Ds(e).length;
        for (var s in e)
          if (we.call(e, s))
            return !1;
        return !0;
      }
      function qm(e, t) {
        return $r(e, t);
      }
      function Xm(e, t, s) {
        s = typeof s == "function" ? s : r;
        var u = s ? s(e, t) : r;
        return u === r ? $r(e, t, r, s) : !!u;
      }
      function oa(e) {
        if (!xe(e))
          return !1;
        var t = Ze(e);
        return t == cn || t == mr || typeof e.message == "string" && typeof e.name == "string" && !Nr(e);
      }
      function zm(e) {
        return typeof e == "number" && ru(e);
      }
      function nn(e) {
        if (!Pe(e))
          return !1;
        var t = Ze(e);
        return t == fn || t == hn || t == pr || t == w;
      }
      function Il(e) {
        return typeof e == "number" && e == se(e);
      }
      function Pi(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= wt;
      }
      function Pe(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
      }
      function xe(e) {
        return e != null && typeof e == "object";
      }
      var Ll = ko ? dt(ko) : jd;
      function Jm(e, t) {
        return e === t || xs(e, t, Qs(t));
      }
      function Qm(e, t, s) {
        return s = typeof s == "function" ? s : r, xs(e, t, Qs(t), s);
      }
      function Zm(e) {
        return Rl(e) && e != +e;
      }
      function jm(e) {
        if (Mg(e))
          throw new ne(l);
        return mu(e);
      }
      function e_(e) {
        return e === null;
      }
      function t_(e) {
        return e == null;
      }
      function Rl(e) {
        return typeof e == "number" || xe(e) && Ze(e) == Et;
      }
      function Nr(e) {
        if (!xe(e) || Ze(e) != ft)
          return !1;
        var t = ai(e);
        if (t === null)
          return !0;
        var s = we.call(t, "constructor") && t.constructor;
        return typeof s == "function" && s instanceof s && ni.call(s) == Qh;
      }
      var ua = Ko ? dt(Ko) : eg;
      function n_(e) {
        return Il(e) && e >= -wt && e <= wt;
      }
      var Sl = Wo ? dt(Wo) : tg;
      function xi(e) {
        return typeof e == "string" || !ie(e) && xe(e) && Ze(e) == Ie;
      }
      function pt(e) {
        return typeof e == "symbol" || xe(e) && Ze(e) == re;
      }
      var rr = Uo ? dt(Uo) : ng;
      function r_(e) {
        return e === r;
      }
      function i_(e) {
        return xe(e) && Je(e) == K;
      }
      function s_(e) {
        return xe(e) && Ze(e) == ve;
      }
      var a_ = Li(Ms), o_ = Li(function(e, t) {
        return e <= t;
      });
      function $l(e) {
        if (!e)
          return [];
        if (st(e))
          return xi(e) ? Pt(e) : it(e);
        if (vr && e[vr])
          return Kh(e[vr]());
        var t = Je(e), s = t == Ge ? Is : t == Q ? jr : ir;
        return s(e);
      }
      function rn(e) {
        if (!e)
          return e === 0 ? e : 0;
        if (e = Ot(e), e === Ce || e === -Ce) {
          var t = e < 0 ? -1 : 1;
          return t * Nt;
        }
        return e === e ? e : 0;
      }
      function se(e) {
        var t = rn(e), s = t % 1;
        return t === t ? s ? t - s : t : 0;
      }
      function Tl(e) {
        return e ? Dn(se(e), 0, Qe) : 0;
      }
      function Ot(e) {
        if (typeof e == "number")
          return e;
        if (pt(e))
          return qt;
        if (Pe(e)) {
          var t = typeof e.valueOf == "function" ? e.valueOf() : e;
          e = Pe(t) ? t + "" : t;
        }
        if (typeof e != "string")
          return e === 0 ? e : +e;
        e = qo(e);
        var s = Hf.test(e);
        return s || Gf.test(e) ? bh(e.slice(2), s ? 2 : 8) : Uf.test(e) ? qt : +e;
      }
      function Ol(e) {
        return Ht(e, at(e));
      }
      function u_(e) {
        return e ? Dn(se(e), -wt, wt) : e === 0 ? e : 0;
      }
      function _e(e) {
        return e == null ? "" : gt(e);
      }
      var l_ = er(function(e, t) {
        if (Ar(t) || st(t)) {
          Ht(t, Ve(t), e);
          return;
        }
        for (var s in t)
          we.call(t, s) && Lr(e, s, t[s]);
      }), Al = er(function(e, t) {
        Ht(t, at(t), e);
      }), Di = er(function(e, t, s, u) {
        Ht(t, at(t), e, u);
      }), c_ = er(function(e, t, s, u) {
        Ht(t, Ve(t), e, u);
      }), f_ = en(Os);
      function h_(e, t) {
        var s = jn(e);
        return t == null ? s : uu(s, t);
      }
      var d_ = oe(function(e, t) {
        e = Re(e);
        var s = -1, u = t.length, f = u > 2 ? t[2] : r;
        for (f && je(t[0], t[1], f) && (u = 1); ++s < u; )
          for (var d = t[s], m = at(d), _ = -1, b = m.length; ++_ < b; ) {
            var P = m[_], x = e[P];
            (x === r || Dt(x, Jn[P]) && !we.call(e, P)) && (e[P] = d[P]);
          }
        return e;
      }), g_ = oe(function(e) {
        return e.push(r, qu), ht(Cl, r, e);
      });
      function p_(e, t) {
        return Bo(e, j(t, 3), Ut);
      }
      function m_(e, t) {
        return Bo(e, j(t, 3), Cs);
      }
      function __(e, t) {
        return e == null ? e : As(e, j(t, 3), at);
      }
      function y_(e, t) {
        return e == null ? e : du(e, j(t, 3), at);
      }
      function v_(e, t) {
        return e && Ut(e, j(t, 3));
      }
      function w_(e, t) {
        return e && Cs(e, j(t, 3));
      }
      function E_(e) {
        return e == null ? [] : mi(e, Ve(e));
      }
      function b_(e) {
        return e == null ? [] : mi(e, at(e));
      }
      function la(e, t, s) {
        var u = e == null ? r : Mn(e, t);
        return u === r ? s : u;
      }
      function I_(e, t) {
        return e != null && Ju(e, t, Yd);
      }
      function ca(e, t) {
        return e != null && Ju(e, t, qd);
      }
      var L_ = Hu(function(e, t, s) {
        t != null && typeof t.toString != "function" && (t = ri.call(t)), e[t] = s;
      }, ha(ot)), R_ = Hu(function(e, t, s) {
        t != null && typeof t.toString != "function" && (t = ri.call(t)), we.call(e, t) ? e[t].push(s) : e[t] = [s];
      }, j), S_ = oe(Sr);
      function Ve(e) {
        return st(e) ? au(e) : Ds(e);
      }
      function at(e) {
        return st(e) ? au(e, !0) : rg(e);
      }
      function $_(e, t) {
        var s = {};
        return t = j(t, 3), Ut(e, function(u, f, d) {
          Zt(s, t(u, f, d), u);
        }), s;
      }
      function T_(e, t) {
        var s = {};
        return t = j(t, 3), Ut(e, function(u, f, d) {
          Zt(s, f, t(u, f, d));
        }), s;
      }
      var O_ = er(function(e, t, s) {
        _i(e, t, s);
      }), Cl = er(function(e, t, s, u) {
        _i(e, t, s, u);
      }), A_ = en(function(e, t) {
        var s = {};
        if (e == null)
          return s;
        var u = !1;
        t = Ne(t, function(d) {
          return d = wn(d, e), u || (u = d.length > 1), d;
        }), Ht(e, zs(e), s), u && (s = St(s, O | D | B, Lg));
        for (var f = t.length; f--; )
          Us(s, t[f]);
        return s;
      });
      function C_(e, t) {
        return Nl(e, Ni(j(t)));
      }
      var N_ = en(function(e, t) {
        return e == null ? {} : sg(e, t);
      });
      function Nl(e, t) {
        if (e == null)
          return {};
        var s = Ne(zs(e), function(u) {
          return [u];
        });
        return t = j(t), Iu(e, s, function(u, f) {
          return t(u, f[0]);
        });
      }
      function P_(e, t, s) {
        t = wn(t, e);
        var u = -1, f = t.length;
        for (f || (f = 1, e = r); ++u < f; ) {
          var d = e == null ? r : e[Bt(t[u])];
          d === r && (u = f, d = s), e = nn(d) ? d.call(e) : d;
        }
        return e;
      }
      function x_(e, t, s) {
        return e == null ? e : Tr(e, t, s);
      }
      function D_(e, t, s, u) {
        return u = typeof u == "function" ? u : r, e == null ? e : Tr(e, t, s, u);
      }
      var Pl = Vu(Ve), xl = Vu(at);
      function M_(e, t, s) {
        var u = ie(e), f = u || bn(e) || rr(e);
        if (t = j(t, 4), s == null) {
          var d = e && e.constructor;
          f ? s = u ? new d() : [] : Pe(e) ? s = nn(d) ? jn(ai(e)) : {} : s = {};
        }
        return (f ? It : Ut)(e, function(m, _, b) {
          return t(s, m, _, b);
        }), s;
      }
      function F_(e, t) {
        return e == null ? !0 : Us(e, t);
      }
      function k_(e, t, s) {
        return e == null ? e : Tu(e, t, Gs(s));
      }
      function K_(e, t, s, u) {
        return u = typeof u == "function" ? u : r, e == null ? e : Tu(e, t, Gs(s), u);
      }
      function ir(e) {
        return e == null ? [] : bs(e, Ve(e));
      }
      function W_(e) {
        return e == null ? [] : bs(e, at(e));
      }
      function U_(e, t, s) {
        return s === r && (s = t, t = r), s !== r && (s = Ot(s), s = s === s ? s : 0), t !== r && (t = Ot(t), t = t === t ? t : 0), Dn(Ot(e), t, s);
      }
      function H_(e, t, s) {
        return t = rn(t), s === r ? (s = t, t = 0) : s = rn(s), e = Ot(e), Xd(e, t, s);
      }
      function B_(e, t, s) {
        if (s && typeof s != "boolean" && je(e, t, s) && (t = s = r), s === r && (typeof t == "boolean" ? (s = t, t = r) : typeof e == "boolean" && (s = e, e = r)), e === r && t === r ? (e = 0, t = 1) : (e = rn(e), t === r ? (t = e, e = 0) : t = rn(t)), e > t) {
          var u = e;
          e = t, t = u;
        }
        if (s || e % 1 || t % 1) {
          var f = iu();
          return ze(e + f * (t - e + Eh("1e-" + ((f + "").length - 1))), t);
        }
        return ks(e, t);
      }
      var G_ = tr(function(e, t, s) {
        return t = t.toLowerCase(), e + (s ? Dl(t) : t);
      });
      function Dl(e) {
        return fa(_e(e).toLowerCase());
      }
      function Ml(e) {
        return e = _e(e), e && e.replace(Yf, xh).replace(fh, "");
      }
      function V_(e, t, s) {
        e = _e(e), t = gt(t);
        var u = e.length;
        s = s === r ? u : Dn(se(s), 0, u);
        var f = s;
        return s -= t.length, s >= 0 && e.slice(s, f) == t;
      }
      function Y_(e) {
        return e = _e(e), e && Sf.test(e) ? e.replace(ho, Dh) : e;
      }
      function q_(e) {
        return e = _e(e), e && Nf.test(e) ? e.replace(as, "\\$&") : e;
      }
      var X_ = tr(function(e, t, s) {
        return e + (s ? "-" : "") + t.toLowerCase();
      }), z_ = tr(function(e, t, s) {
        return e + (s ? " " : "") + t.toLowerCase();
      }), J_ = Ku("toLowerCase");
      function Q_(e, t, s) {
        e = _e(e), t = se(t);
        var u = t ? Xn(e) : 0;
        if (!t || u >= t)
          return e;
        var f = (t - u) / 2;
        return Ii(ci(f), s) + e + Ii(li(f), s);
      }
      function Z_(e, t, s) {
        e = _e(e), t = se(t);
        var u = t ? Xn(e) : 0;
        return t && u < t ? e + Ii(t - u, s) : e;
      }
      function j_(e, t, s) {
        e = _e(e), t = se(t);
        var u = t ? Xn(e) : 0;
        return t && u < t ? Ii(t - u, s) + e : e;
      }
      function ey(e, t, s) {
        return s || t == null ? t = 0 : t && (t = +t), od(_e(e).replace(os, ""), t || 0);
      }
      function ty(e, t, s) {
        return (s ? je(e, t, s) : t === r) ? t = 1 : t = se(t), Ks(_e(e), t);
      }
      function ny() {
        var e = arguments, t = _e(e[0]);
        return e.length < 3 ? t : t.replace(e[1], e[2]);
      }
      var ry = tr(function(e, t, s) {
        return e + (s ? "_" : "") + t.toLowerCase();
      });
      function iy(e, t, s) {
        return s && typeof s != "number" && je(e, t, s) && (t = s = r), s = s === r ? Qe : s >>> 0, s ? (e = _e(e), e && (typeof t == "string" || t != null && !ua(t)) && (t = gt(t), !t && qn(e)) ? En(Pt(e), 0, s) : e.split(t, s)) : [];
      }
      var sy = tr(function(e, t, s) {
        return e + (s ? " " : "") + fa(t);
      });
      function ay(e, t, s) {
        return e = _e(e), s = s == null ? 0 : Dn(se(s), 0, e.length), t = gt(t), e.slice(s, s + t.length) == t;
      }
      function oy(e, t, s) {
        var u = h.templateSettings;
        s && je(e, t, s) && (t = r), e = _e(e), t = Di({}, t, u, Yu);
        var f = Di({}, t.imports, u.imports, Yu), d = Ve(f), m = bs(f, d), _, b, P = 0, x = t.interpolate || Xr, k = "__p += '", q = Ls(
          (t.escape || Xr).source + "|" + x.source + "|" + (x === go ? Wf : Xr).source + "|" + (t.evaluate || Xr).source + "|$",
          "g"
        ), Z = "//# sourceURL=" + (we.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++mh + "]") + `
`;
        e.replace(q, function(te, ce, de, mt, et, _t) {
          return de || (de = mt), k += e.slice(P, _t).replace(qf, Mh), ce && (_ = !0, k += `' +
__e(` + ce + `) +
'`), et && (b = !0, k += `';
` + et + `;
__p += '`), de && (k += `' +
((__t = (` + de + `)) == null ? '' : __t) +
'`), P = _t + te.length, te;
        }), k += `';
`;
        var ee = we.call(t, "variable") && t.variable;
        if (!ee)
          k = `with (obj) {
` + k + `
}
`;
        else if (kf.test(ee))
          throw new ne(g);
        k = (b ? k.replace(bf, "") : k).replace(If, "$1").replace(Lf, "$1;"), k = "function(" + (ee || "obj") + `) {
` + (ee ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (_ ? ", __e = _.escape" : "") + (b ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + k + `return __p
}`;
        var ae = kl(function() {
          return pe(d, Z + "return " + k).apply(r, m);
        });
        if (ae.source = k, oa(ae))
          throw ae;
        return ae;
      }
      function uy(e) {
        return _e(e).toLowerCase();
      }
      function ly(e) {
        return _e(e).toUpperCase();
      }
      function cy(e, t, s) {
        if (e = _e(e), e && (s || t === r))
          return qo(e);
        if (!e || !(t = gt(t)))
          return e;
        var u = Pt(e), f = Pt(t), d = Xo(u, f), m = zo(u, f) + 1;
        return En(u, d, m).join("");
      }
      function fy(e, t, s) {
        if (e = _e(e), e && (s || t === r))
          return e.slice(0, Qo(e) + 1);
        if (!e || !(t = gt(t)))
          return e;
        var u = Pt(e), f = zo(u, Pt(t)) + 1;
        return En(u, 0, f).join("");
      }
      function hy(e, t, s) {
        if (e = _e(e), e && (s || t === r))
          return e.replace(os, "");
        if (!e || !(t = gt(t)))
          return e;
        var u = Pt(e), f = Xo(u, Pt(t));
        return En(u, f).join("");
      }
      function dy(e, t) {
        var s = le, u = Se;
        if (Pe(t)) {
          var f = "separator" in t ? t.separator : f;
          s = "length" in t ? se(t.length) : s, u = "omission" in t ? gt(t.omission) : u;
        }
        e = _e(e);
        var d = e.length;
        if (qn(e)) {
          var m = Pt(e);
          d = m.length;
        }
        if (s >= d)
          return e;
        var _ = s - Xn(u);
        if (_ < 1)
          return u;
        var b = m ? En(m, 0, _).join("") : e.slice(0, _);
        if (f === r)
          return b + u;
        if (m && (_ += b.length - _), ua(f)) {
          if (e.slice(_).search(f)) {
            var P, x = b;
            for (f.global || (f = Ls(f.source, _e(po.exec(f)) + "g")), f.lastIndex = 0; P = f.exec(x); )
              var k = P.index;
            b = b.slice(0, k === r ? _ : k);
          }
        } else if (e.indexOf(gt(f), _) != _) {
          var q = b.lastIndexOf(f);
          q > -1 && (b = b.slice(0, q));
        }
        return b + u;
      }
      function gy(e) {
        return e = _e(e), e && Rf.test(e) ? e.replace(fo, Bh) : e;
      }
      var py = tr(function(e, t, s) {
        return e + (s ? " " : "") + t.toUpperCase();
      }), fa = Ku("toUpperCase");
      function Fl(e, t, s) {
        return e = _e(e), t = s ? r : t, t === r ? kh(e) ? Yh(e) : Oh(e) : e.match(t) || [];
      }
      var kl = oe(function(e, t) {
        try {
          return ht(e, r, t);
        } catch (s) {
          return oa(s) ? s : new ne(s);
        }
      }), my = en(function(e, t) {
        return It(t, function(s) {
          s = Bt(s), Zt(e, s, sa(e[s], e));
        }), e;
      });
      function _y(e) {
        var t = e == null ? 0 : e.length, s = j();
        return e = t ? Ne(e, function(u) {
          if (typeof u[1] != "function")
            throw new Lt(c);
          return [s(u[0]), u[1]];
        }) : [], oe(function(u) {
          for (var f = -1; ++f < t; ) {
            var d = e[f];
            if (ht(d[0], this, u))
              return ht(d[1], this, u);
          }
        });
      }
      function yy(e) {
        return Bd(St(e, O));
      }
      function ha(e) {
        return function() {
          return e;
        };
      }
      function vy(e, t) {
        return e == null || e !== e ? t : e;
      }
      var wy = Uu(), Ey = Uu(!0);
      function ot(e) {
        return e;
      }
      function da(e) {
        return _u(typeof e == "function" ? e : St(e, O));
      }
      function by(e) {
        return vu(St(e, O));
      }
      function Iy(e, t) {
        return wu(e, St(t, O));
      }
      var Ly = oe(function(e, t) {
        return function(s) {
          return Sr(s, e, t);
        };
      }), Ry = oe(function(e, t) {
        return function(s) {
          return Sr(e, s, t);
        };
      });
      function ga(e, t, s) {
        var u = Ve(t), f = mi(t, u);
        s == null && !(Pe(t) && (f.length || !u.length)) && (s = t, t = e, e = this, f = mi(t, Ve(t)));
        var d = !(Pe(s) && "chain" in s) || !!s.chain, m = nn(e);
        return It(f, function(_) {
          var b = t[_];
          e[_] = b, m && (e.prototype[_] = function() {
            var P = this.__chain__;
            if (d || P) {
              var x = e(this.__wrapped__), k = x.__actions__ = it(this.__actions__);
              return k.push({ func: b, args: arguments, thisArg: e }), x.__chain__ = P, x;
            }
            return b.apply(e, pn([this.value()], arguments));
          });
        }), e;
      }
      function Sy() {
        return qe._ === this && (qe._ = Zh), this;
      }
      function pa() {
      }
      function $y(e) {
        return e = se(e), oe(function(t) {
          return Eu(t, e);
        });
      }
      var Ty = Ys(Ne), Oy = Ys(Ho), Ay = Ys(_s);
      function Kl(e) {
        return js(e) ? ys(Bt(e)) : ag(e);
      }
      function Cy(e) {
        return function(t) {
          return e == null ? r : Mn(e, t);
        };
      }
      var Ny = Bu(), Py = Bu(!0);
      function ma() {
        return [];
      }
      function _a() {
        return !1;
      }
      function xy() {
        return {};
      }
      function Dy() {
        return "";
      }
      function My() {
        return !0;
      }
      function Fy(e, t) {
        if (e = se(e), e < 1 || e > wt)
          return [];
        var s = Qe, u = ze(e, Qe);
        t = j(t), e -= Qe;
        for (var f = Es(u, t); ++s < e; )
          t(s);
        return f;
      }
      function ky(e) {
        return ie(e) ? Ne(e, Bt) : pt(e) ? [e] : it(sl(_e(e)));
      }
      function Ky(e) {
        var t = ++Jh;
        return _e(e) + t;
      }
      var Wy = bi(function(e, t) {
        return e + t;
      }, 0), Uy = qs("ceil"), Hy = bi(function(e, t) {
        return e / t;
      }, 1), By = qs("floor");
      function Gy(e) {
        return e && e.length ? pi(e, ot, Ns) : r;
      }
      function Vy(e, t) {
        return e && e.length ? pi(e, j(t, 2), Ns) : r;
      }
      function Yy(e) {
        return Vo(e, ot);
      }
      function qy(e, t) {
        return Vo(e, j(t, 2));
      }
      function Xy(e) {
        return e && e.length ? pi(e, ot, Ms) : r;
      }
      function zy(e, t) {
        return e && e.length ? pi(e, j(t, 2), Ms) : r;
      }
      var Jy = bi(function(e, t) {
        return e * t;
      }, 1), Qy = qs("round"), Zy = bi(function(e, t) {
        return e - t;
      }, 0);
      function jy(e) {
        return e && e.length ? ws(e, ot) : 0;
      }
      function ev(e, t) {
        return e && e.length ? ws(e, j(t, 2)) : 0;
      }
      return h.after = bm, h.ary = ml, h.assign = l_, h.assignIn = Al, h.assignInWith = Di, h.assignWith = c_, h.at = f_, h.before = _l, h.bind = sa, h.bindAll = my, h.bindKey = yl, h.castArray = xm, h.chain = dl, h.chunk = Bg, h.compact = Gg, h.concat = Vg, h.cond = _y, h.conforms = yy, h.constant = ha, h.countBy = jp, h.create = h_, h.curry = vl, h.curryRight = wl, h.debounce = El, h.defaults = d_, h.defaultsDeep = g_, h.defer = Im, h.delay = Lm, h.difference = Yg, h.differenceBy = qg, h.differenceWith = Xg, h.drop = zg, h.dropRight = Jg, h.dropRightWhile = Qg, h.dropWhile = Zg, h.fill = jg, h.filter = tm, h.flatMap = im, h.flatMapDeep = sm, h.flatMapDepth = am, h.flatten = ll, h.flattenDeep = ep, h.flattenDepth = tp, h.flip = Rm, h.flow = wy, h.flowRight = Ey, h.fromPairs = np, h.functions = E_, h.functionsIn = b_, h.groupBy = om, h.initial = ip, h.intersection = sp, h.intersectionBy = ap, h.intersectionWith = op, h.invert = L_, h.invertBy = R_, h.invokeMap = lm, h.iteratee = da, h.keyBy = cm, h.keys = Ve, h.keysIn = at, h.map = Oi, h.mapKeys = $_, h.mapValues = T_, h.matches = by, h.matchesProperty = Iy, h.memoize = Ci, h.merge = O_, h.mergeWith = Cl, h.method = Ly, h.methodOf = Ry, h.mixin = ga, h.negate = Ni, h.nthArg = $y, h.omit = A_, h.omitBy = C_, h.once = Sm, h.orderBy = fm, h.over = Ty, h.overArgs = $m, h.overEvery = Oy, h.overSome = Ay, h.partial = aa, h.partialRight = bl, h.partition = hm, h.pick = N_, h.pickBy = Nl, h.property = Kl, h.propertyOf = Cy, h.pull = fp, h.pullAll = fl, h.pullAllBy = hp, h.pullAllWith = dp, h.pullAt = gp, h.range = Ny, h.rangeRight = Py, h.rearg = Tm, h.reject = pm, h.remove = pp, h.rest = Om, h.reverse = ra, h.sampleSize = _m, h.set = x_, h.setWith = D_, h.shuffle = ym, h.slice = mp, h.sortBy = Em, h.sortedUniq = Ip, h.sortedUniqBy = Lp, h.split = iy, h.spread = Am, h.tail = Rp, h.take = Sp, h.takeRight = $p, h.takeRightWhile = Tp, h.takeWhile = Op, h.tap = Gp, h.throttle = Cm, h.thru = Ti, h.toArray = $l, h.toPairs = Pl, h.toPairsIn = xl, h.toPath = ky, h.toPlainObject = Ol, h.transform = M_, h.unary = Nm, h.union = Ap, h.unionBy = Cp, h.unionWith = Np, h.uniq = Pp, h.uniqBy = xp, h.uniqWith = Dp, h.unset = F_, h.unzip = ia, h.unzipWith = hl, h.update = k_, h.updateWith = K_, h.values = ir, h.valuesIn = W_, h.without = Mp, h.words = Fl, h.wrap = Pm, h.xor = Fp, h.xorBy = kp, h.xorWith = Kp, h.zip = Wp, h.zipObject = Up, h.zipObjectDeep = Hp, h.zipWith = Bp, h.entries = Pl, h.entriesIn = xl, h.extend = Al, h.extendWith = Di, ga(h, h), h.add = Wy, h.attempt = kl, h.camelCase = G_, h.capitalize = Dl, h.ceil = Uy, h.clamp = U_, h.clone = Dm, h.cloneDeep = Fm, h.cloneDeepWith = km, h.cloneWith = Mm, h.conformsTo = Km, h.deburr = Ml, h.defaultTo = vy, h.divide = Hy, h.endsWith = V_, h.eq = Dt, h.escape = Y_, h.escapeRegExp = q_, h.every = em, h.find = nm, h.findIndex = ol, h.findKey = p_, h.findLast = rm, h.findLastIndex = ul, h.findLastKey = m_, h.floor = By, h.forEach = gl, h.forEachRight = pl, h.forIn = __, h.forInRight = y_, h.forOwn = v_, h.forOwnRight = w_, h.get = la, h.gt = Wm, h.gte = Um, h.has = I_, h.hasIn = ca, h.head = cl, h.identity = ot, h.includes = um, h.indexOf = rp, h.inRange = H_, h.invoke = S_, h.isArguments = Kn, h.isArray = ie, h.isArrayBuffer = Hm, h.isArrayLike = st, h.isArrayLikeObject = Fe, h.isBoolean = Bm, h.isBuffer = bn, h.isDate = Gm, h.isElement = Vm, h.isEmpty = Ym, h.isEqual = qm, h.isEqualWith = Xm, h.isError = oa, h.isFinite = zm, h.isFunction = nn, h.isInteger = Il, h.isLength = Pi, h.isMap = Ll, h.isMatch = Jm, h.isMatchWith = Qm, h.isNaN = Zm, h.isNative = jm, h.isNil = t_, h.isNull = e_, h.isNumber = Rl, h.isObject = Pe, h.isObjectLike = xe, h.isPlainObject = Nr, h.isRegExp = ua, h.isSafeInteger = n_, h.isSet = Sl, h.isString = xi, h.isSymbol = pt, h.isTypedArray = rr, h.isUndefined = r_, h.isWeakMap = i_, h.isWeakSet = s_, h.join = up, h.kebabCase = X_, h.last = Tt, h.lastIndexOf = lp, h.lowerCase = z_, h.lowerFirst = J_, h.lt = a_, h.lte = o_, h.max = Gy, h.maxBy = Vy, h.mean = Yy, h.meanBy = qy, h.min = Xy, h.minBy = zy, h.stubArray = ma, h.stubFalse = _a, h.stubObject = xy, h.stubString = Dy, h.stubTrue = My, h.multiply = Jy, h.nth = cp, h.noConflict = Sy, h.noop = pa, h.now = Ai, h.pad = Q_, h.padEnd = Z_, h.padStart = j_, h.parseInt = ey, h.random = B_, h.reduce = dm, h.reduceRight = gm, h.repeat = ty, h.replace = ny, h.result = P_, h.round = Qy, h.runInContext = E, h.sample = mm, h.size = vm, h.snakeCase = ry, h.some = wm, h.sortedIndex = _p, h.sortedIndexBy = yp, h.sortedIndexOf = vp, h.sortedLastIndex = wp, h.sortedLastIndexBy = Ep, h.sortedLastIndexOf = bp, h.startCase = sy, h.startsWith = ay, h.subtract = Zy, h.sum = jy, h.sumBy = ev, h.template = oy, h.times = Fy, h.toFinite = rn, h.toInteger = se, h.toLength = Tl, h.toLower = uy, h.toNumber = Ot, h.toSafeInteger = u_, h.toString = _e, h.toUpper = ly, h.trim = cy, h.trimEnd = fy, h.trimStart = hy, h.truncate = dy, h.unescape = gy, h.uniqueId = Ky, h.upperCase = py, h.upperFirst = fa, h.each = gl, h.eachRight = pl, h.first = cl, ga(h, function() {
        var e = {};
        return Ut(h, function(t, s) {
          we.call(h.prototype, s) || (e[s] = t);
        }), e;
      }(), { chain: !1 }), h.VERSION = a, It(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
        h[e].placeholder = h;
      }), It(["drop", "take"], function(e, t) {
        fe.prototype[e] = function(s) {
          s = s === r ? 1 : Ue(se(s), 0);
          var u = this.__filtered__ && !t ? new fe(this) : this.clone();
          return u.__filtered__ ? u.__takeCount__ = ze(s, u.__takeCount__) : u.__views__.push({
            size: ze(s, Qe),
            type: e + (u.__dir__ < 0 ? "Right" : "")
          }), u;
        }, fe.prototype[e + "Right"] = function(s) {
          return this.reverse()[e](s).reverse();
        };
      }), It(["filter", "map", "takeWhile"], function(e, t) {
        var s = t + 1, u = s == vt || s == Ct;
        fe.prototype[e] = function(f) {
          var d = this.clone();
          return d.__iteratees__.push({
            iteratee: j(f, 3),
            type: s
          }), d.__filtered__ = d.__filtered__ || u, d;
        };
      }), It(["head", "last"], function(e, t) {
        var s = "take" + (t ? "Right" : "");
        fe.prototype[e] = function() {
          return this[s](1).value()[0];
        };
      }), It(["initial", "tail"], function(e, t) {
        var s = "drop" + (t ? "" : "Right");
        fe.prototype[e] = function() {
          return this.__filtered__ ? new fe(this) : this[s](1);
        };
      }), fe.prototype.compact = function() {
        return this.filter(ot);
      }, fe.prototype.find = function(e) {
        return this.filter(e).head();
      }, fe.prototype.findLast = function(e) {
        return this.reverse().find(e);
      }, fe.prototype.invokeMap = oe(function(e, t) {
        return typeof e == "function" ? new fe(this) : this.map(function(s) {
          return Sr(s, e, t);
        });
      }), fe.prototype.reject = function(e) {
        return this.filter(Ni(j(e)));
      }, fe.prototype.slice = function(e, t) {
        e = se(e);
        var s = this;
        return s.__filtered__ && (e > 0 || t < 0) ? new fe(s) : (e < 0 ? s = s.takeRight(-e) : e && (s = s.drop(e)), t !== r && (t = se(t), s = t < 0 ? s.dropRight(-t) : s.take(t - e)), s);
      }, fe.prototype.takeRightWhile = function(e) {
        return this.reverse().takeWhile(e).reverse();
      }, fe.prototype.toArray = function() {
        return this.take(Qe);
      }, Ut(fe.prototype, function(e, t) {
        var s = /^(?:filter|find|map|reject)|While$/.test(t), u = /^(?:head|last)$/.test(t), f = h[u ? "take" + (t == "last" ? "Right" : "") : t], d = u || /^find/.test(t);
        f && (h.prototype[t] = function() {
          var m = this.__wrapped__, _ = u ? [1] : arguments, b = m instanceof fe, P = _[0], x = b || ie(m), k = function(ce) {
            var de = f.apply(h, pn([ce], _));
            return u && q ? de[0] : de;
          };
          x && s && typeof P == "function" && P.length != 1 && (b = x = !1);
          var q = this.__chain__, Z = !!this.__actions__.length, ee = d && !q, ae = b && !Z;
          if (!d && x) {
            m = ae ? m : new fe(this);
            var te = e.apply(m, _);
            return te.__actions__.push({ func: Ti, args: [k], thisArg: r }), new Rt(te, q);
          }
          return ee && ae ? e.apply(this, _) : (te = this.thru(k), ee ? u ? te.value()[0] : te.value() : te);
        });
      }), It(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
        var t = ei[e], s = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", u = /^(?:pop|shift)$/.test(e);
        h.prototype[e] = function() {
          var f = arguments;
          if (u && !this.__chain__) {
            var d = this.value();
            return t.apply(ie(d) ? d : [], f);
          }
          return this[s](function(m) {
            return t.apply(ie(m) ? m : [], f);
          });
        };
      }), Ut(fe.prototype, function(e, t) {
        var s = h[t];
        if (s) {
          var u = s.name + "";
          we.call(Zn, u) || (Zn[u] = []), Zn[u].push({ name: t, func: s });
        }
      }), Zn[Ei(r, I).name] = [{
        name: "wrapper",
        func: r
      }], fe.prototype.clone = gd, fe.prototype.reverse = pd, fe.prototype.value = md, h.prototype.at = Vp, h.prototype.chain = Yp, h.prototype.commit = qp, h.prototype.next = Xp, h.prototype.plant = Jp, h.prototype.reverse = Qp, h.prototype.toJSON = h.prototype.valueOf = h.prototype.value = Zp, h.prototype.first = h.prototype.head, vr && (h.prototype[vr] = zp), h;
    }, zn = qh();
    Cn ? ((Cn.exports = zn)._ = zn, ds._ = zn) : qe._ = zn;
  }).call(Pr);
})(Hi, Hi.exports);
var pv = Hi.exports;
const $a = /* @__PURE__ */ gv(pv);
function dE(i, n) {
  let r = /* @__PURE__ */ new Set();
  for (const a of i) {
    const o = a[n];
    o !== void 0 && (Array.isArray(o) ? r = r.union(new Set(o)) : r.add(o));
  }
  return r;
}
function gE(i, n) {
  return Array.isArray(i) || (i = Object.keys(i)), i.reduce((r, a) => (r[a] = n instanceof Function ? n(a) : n[a], r), {});
}
function pE(i, n) {
  for (const r of Object.keys(n))
    try {
      n[r] && n[r] !== 0 && n[r] !== 0 && (i[r] = n[r]);
    } catch (a) {
      console.warn(a);
    }
  return i;
}
function mE(i, n = void 0) {
  for (const r of Object.keys(i)) {
    const a = n == null ? void 0 : n[r];
    !n || a === void 0 ? delete i[r] : i[r] = n[r];
  }
  if (n)
    for (const [r, a] of Object.entries(n))
      r in i || (i[r] = a);
  return i;
}
function mv(i, n, r) {
  if (i = Sa(i), n = Sa(n), !$a.isEqual(i, n))
    return r(i, n);
}
function _E(i) {
  return (n, r) => mv(n, r, i);
}
function yE(i) {
  const n = i instanceof HTMLFormElement ? new FormData(i) : i;
  return $a.mapValues(
    $a.groupBy([...n.entries()], ([r]) => r),
    (r) => r.length === 1 ? r[0][1].toString() : r.map(([, a]) => a.toString())
  );
}
function vE(i, n, { exclude: r = null } = {}) {
  const a = {};
  let o = Object.keys(i);
  return n && (o = o.filter((l) => l.startsWith(n))), r && (o = Array.isArray(r) ? o.filter((l) => !r.includes(l)) : typeof r == "string" ? o.filter((l) => l != r) : o.filter(r)), n ? o.reduce((l, c) => (l[c] = c.replace(n, ""), l), a) : o;
}
function wE(i) {
  const n = {};
  for (const r in i) {
    const a = i[r];
    lr(a) ? Object.defineProperty(n, r, {
      get: () => a.value,
      set: (o) => a.value = o
    }) : n[r] = a;
  }
  return n;
}
let _v = 0;
function Dc() {
  return _v++;
}
function Mc(i) {
  if (document.cookie && document.cookie !== "") {
    const n = document.cookie.split(";").find((r) => r.trim().startsWith(i + "="));
    return n ? decodeURIComponent(n.split("=")[1]) : null;
  }
  return null;
}
function yv(i, n) {
  const r = Mc(i);
  return r !== null ? r.split(n) : [];
}
var ya = null;
function Bl() {
  return ya === null && (ya = Mc("csrftoken")), ya;
}
function EE(i) {
  if (typeof i != "string" || i.length !== 2)
    return "";
  i == "en" && (i = "gb");
  const n = 127462, r = i.toUpperCase().split("");
  return r.every((o) => o >= "A" && o <= "Z") ? String.fromCodePoint(...r.map((o) => n + o.charCodeAt(0) - 65)) : "";
}
function bE(i) {
  const n = document.getElementById(i);
  if (!n)
    throw "Element {elementId} not found";
  return n.innerText ? JSON.parse(n.innerText) : {};
}
const vv = {
  csrfToken: Bl(),
  axiosConfig: {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CSRFToken": Bl()
    },
    paramsSerializer: {
      indexes: null
      // by default: false
    }
  },
  locales: {
    fr: "Français",
    en: "English",
    de: "Dutch",
    nl: "Nederlands",
    es: "Spanish"
  }
};
function wv(i, n, r) {
  switch (r) {
    case ">":
      return i > n;
    case ">=":
      return i >= n;
    case "<":
      return i < n;
    case "<=":
      return i <= n;
    case "=":
      return i === n;
    case "!=":
      return i !== n;
    default:
      return i === n;
  }
}
function Ta(i) {
  return i == null;
}
function Oa(i) {
  return i instanceof Date && !Number.isNaN(i.getTime()) && typeof i.toISOString == "function";
}
function Te(i) {
  return Array.isArray(i);
}
function va(i) {
  return typeof i == "function";
}
function sr(i) {
  return Ev(i) === 0;
}
function Ev(i) {
  return Te(i) ? i.length : Object.keys(i).length;
}
function bv(i, n, r, a = "SORT_REGULAR") {
  let o = -1;
  const l = i.map((c) => ({ criteria: n.map((p) => {
    if (typeof p == "function")
      return p(c);
    if (!p.includes(".") && !Oa(c[p]))
      return c[p];
    const v = Fc(c, p, !1);
    return Oa(v) ? new Date(v).getTime() : v;
  }), index: ++o, value: c }));
  return Iv(l, (c, g) => Lv(c, g, r, a));
}
function Iv(i, n) {
  let r = i.length;
  i.sort(n);
  const a = [];
  for (; r--; )
    a[r] = i[r].value;
  return a;
}
function Lv(i, n, r, a) {
  let o = -1;
  const l = i.criteria, c = n.criteria, g = l.length;
  for (; ++o < g; ) {
    const p = Rv(l[o], c[o], a);
    if (p) {
      const v = r[o];
      return p * (v === "desc" ? -1 : 1);
    }
  }
  return i.index - n.index;
}
function Rv(i, n, r) {
  if (i !== n) {
    const a = i !== void 0, o = i === null, l = i === i, c = n !== void 0, g = n === null;
    return (typeof i != "number" || typeof n != "number") && (i = String(i), n = String(n), r === "SORT_FLAG_CASE" && (i = i.toUpperCase(), n = n.toUpperCase())), !g && i > n || o && c || !a || !l ? 1 : -1;
  }
  return 0;
}
function Sv(i, n) {
  return i.reduce((r, a) => {
    const o = n(a);
    return r[o] === void 0 && (r[o] = []), r[o].push(a), r;
  }, {});
}
function zi(i) {
  throw new Error(["[Pinia ORM]"].concat(i).join(" "));
}
function Dr(i, n) {
  i || zi(n);
}
function $v(i, n) {
  let r = "", a = i;
  for (; a--; )
    r += n[Math.random() * n.length | 0];
  return r;
}
function Tv(i, n) {
  const a = JSON.stringify({ key: i, params: n });
  return typeof process > "u" ? btoa(a) : a;
}
function Fc(i, n, r = !0) {
  n = typeof n == "string" ? n.split(".") : n;
  const a = n.shift();
  return i && Object.prototype.hasOwnProperty.call(i, a) && n.length === 0 ? i[a] : !i || !Object.prototype.hasOwnProperty.call(i, a) ? r ? i : void 0 : Fc(i[a], n);
}
function Aa(i, n) {
  if (i === n)
    return !0;
  if (i instanceof Date && n instanceof Date)
    return i.getTime() === n.getTime();
  if (!i || !n || typeof i != "object" && typeof n != "object")
    return i === n;
  if (i.prototype !== n.prototype)
    return !1;
  const r = Object.keys(i);
  return r.length !== Object.keys(n).length ? !1 : r.every((a) => Aa(i[a], n[a]));
}
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let Za;
const Ji = (i) => Za = i, IE = () => Ac() && lt(ja) || Za, ja = (
  /* istanbul ignore next */
  Symbol()
);
function Ca(i) {
  return i && typeof i == "object" && Object.prototype.toString.call(i) === "[object Object]" && typeof i.toJSON != "function";
}
var Mr;
(function(i) {
  i.direct = "direct", i.patchObject = "patch object", i.patchFunction = "patch function";
})(Mr || (Mr = {}));
function LE() {
  const i = Ja(!0), n = i.run(() => Gr({}));
  let r = [], a = [];
  const o = Nc({
    install(l) {
      Ji(o), o._a = l, l.provide(ja, o), l.config.globalProperties.$pinia = o, a.forEach((c) => r.push(c)), a = [];
    },
    use(l) {
      return this._a ? r.push(l) : a.push(l), this;
    },
    _p: r,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: i,
    _s: /* @__PURE__ */ new Map(),
    state: n
  });
  return o;
}
const kc = () => {
};
function Gl(i, n, r, a = kc) {
  i.push(n);
  const o = () => {
    const l = i.indexOf(n);
    l > -1 && (i.splice(l, 1), a());
  };
  return !r && iv() && sv(o), o;
}
function ar(i, ...n) {
  i.slice().forEach((r) => {
    r(...n);
  });
}
const Ov = (i) => i(), Vl = Symbol(), wa = Symbol();
function Na(i, n) {
  i instanceof Map && n instanceof Map ? n.forEach((r, a) => i.set(a, r)) : i instanceof Set && n instanceof Set && n.forEach(i.add, i);
  for (const r in n) {
    if (!n.hasOwnProperty(r))
      continue;
    const a = n[r], o = i[r];
    Ca(o) && Ca(a) && i.hasOwnProperty(r) && !lr(a) && !Cc(a) ? i[r] = Na(o, a) : i[r] = a;
  }
  return i;
}
const Av = (
  /* istanbul ignore next */
  Symbol()
);
function Cv(i) {
  return !Ca(i) || !i.hasOwnProperty(Av);
}
const { assign: Ln } = Object;
function Nv(i) {
  return !!(lr(i) && i.effect);
}
function Pv(i, n, r, a) {
  const { state: o, actions: l, getters: c } = n, g = r.state.value[i];
  let p;
  function v() {
    g || (r.state.value[i] = o ? o() : {});
    const $ = ov(r.state.value[i]);
    return Ln($, l, Object.keys(c || {}).reduce((O, D) => (O[D] = Nc(ut(() => {
      Ji(r);
      const B = r._s.get(i);
      return c[D].call(B, B);
    })), O), {}));
  }
  return p = Kc(i, v, n, r, a, !0), p;
}
function Kc(i, n, r = {}, a, o, l) {
  let c;
  const g = Ln({ actions: {} }, r), p = { deep: !0 };
  let v, $, O = [], D = [], B;
  const X = a.state.value[i];
  !l && !X && (a.state.value[i] = {}), Gr({});
  let Y;
  function H(V) {
    let G;
    v = $ = !1, typeof V == "function" ? (V(a.state.value[i]), G = {
      type: Mr.patchFunction,
      storeId: i,
      events: B
    }) : (Na(a.state.value[i], V), G = {
      type: Mr.patchObject,
      payload: V,
      storeId: i,
      events: B
    });
    const le = Y = Symbol();
    av().then(() => {
      Y === le && (v = !0);
    }), $ = !0, ar(O, G, a.state.value[i]);
  }
  const I = l ? function() {
    const { state: G } = r, le = G ? G() : {};
    this.$patch((Se) => {
      Ln(Se, le);
    });
  } : (
    /* istanbul ignore next */
    kc
  );
  function M() {
    c.stop(), O = [], D = [], a._s.delete(i);
  }
  const W = (V, G = "") => {
    if (Vl in V)
      return V[wa] = G, V;
    const le = function() {
      Ji(a);
      const Se = Array.from(arguments), he = [], Ye = [];
      function vt(Ce) {
        he.push(Ce);
      }
      function On(Ce) {
        Ye.push(Ce);
      }
      ar(D, {
        args: Se,
        name: le[wa],
        store: U,
        after: vt,
        onError: On
      });
      let Ct;
      try {
        Ct = V.apply(this && this.$id === i ? this : U, Se);
      } catch (Ce) {
        throw ar(Ye, Ce), Ce;
      }
      return Ct instanceof Promise ? Ct.then((Ce) => (ar(he, Ce), Ce)).catch((Ce) => (ar(Ye, Ce), Promise.reject(Ce))) : (ar(he, Ct), Ct);
    };
    return le[Vl] = !0, le[wa] = G, le;
  }, N = {
    _p: a,
    // _s: scope,
    $id: i,
    $onAction: Gl.bind(null, D),
    $patch: H,
    $reset: I,
    $subscribe(V, G = {}) {
      const le = Gl(O, V, G.detached, () => Se()), Se = c.run(() => kr(() => a.state.value[i], (he) => {
        (G.flush === "sync" ? $ : v) && V({
          storeId: i,
          type: Mr.direct,
          events: B
        }, he);
      }, Ln({}, p, G)));
      return le;
    },
    $dispose: M
  }, U = Wn(N);
  a._s.set(i, U);
  const S = (a._a && a._a.runWithContext || Ov)(() => a._e.run(() => (c = Ja()).run(() => n({ action: W }))));
  for (const V in S) {
    const G = S[V];
    if (lr(G) && !Nv(G) || Cc(G))
      l || (X && Cv(G) && (lr(G) ? G.value = X[V] : Na(G, X[V])), a.state.value[i][V] = G);
    else if (typeof G == "function") {
      const le = W(G, V);
      S[V] = le, g.actions[V] = G;
    }
  }
  return Ln(U, S), Ln(Sa(U), S), Object.defineProperty(U, "$state", {
    get: () => a.state.value[i],
    set: (V) => {
      H((G) => {
        Ln(G, V);
      });
    }
  }), a._p.forEach((V) => {
    Ln(U, c.run(() => V({
      store: U,
      app: a._a,
      pinia: a,
      options: g
    })));
  }), X && l && r.hydrate && r.hydrate(U.$state, X), v = !0, $ = !0, U;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Yl(i, n, r) {
  let a, o;
  const l = typeof n == "function";
  typeof i == "string" ? (a = i, o = l ? r : n) : (o = i, a = i.id);
  function c(g, p) {
    const v = Ac();
    return g = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    g || (v ? lt(ja, null) : null), g && Ji(g), g = Za, g._s.has(a) || (l ? Kc(a, n, o, g) : Pv(a, o, g)), g._s.get(a);
  }
  return c.$id = a, c;
}
class xv {
  constructor(n, r = {}, a = {}) {
    if (!n || typeof n != "string")
      throw new Error(`Expected a string key for Entity, but found ${n}.`);
    const {
      idAttribute: o = "id",
      mergeStrategy: l = (g, p) => ({ ...g, ...p }),
      processStrategy: c = (g) => ({ ...g })
    } = a;
    this._key = n, this._getId = o, this._mergeStrategy = l, this._processStrategy = c, this.define(r);
  }
  get key() {
    return this._key;
  }
  define(n) {
    this.schema = Object.keys(n).reduce((r, a) => {
      const o = n[a];
      return { ...r, [a]: o };
    }, this.schema || {});
  }
  getId(n, r, a) {
    return this._getId(n, r, a);
  }
  merge(n, r) {
    return this._mergeStrategy(n, r);
  }
  normalize(n, r, a, o, l, c) {
    const g = this.getId(n, r, a), p = this.key;
    if (p in c || (c[p] = {}), g in c[p] || (c[p][g] = []), c[p][g].includes(n))
      return g;
    c[p][g].push(n);
    const v = this._processStrategy(n, r, a);
    return Object.keys(this.schema).forEach(($) => {
      if (v.hasOwnProperty($) && typeof v[$] == "object") {
        const O = this.schema[$], D = typeof O == "function" ? O(n) : O;
        v[$] = o(
          v[$],
          v,
          $,
          D,
          l,
          c
        );
      }
    }), l(this, v, n, r, a), g;
  }
}
class Wc {
  constructor(n, r) {
    r && (this._schemaAttribute = typeof r == "string" ? (a) => a[r] : r), this.define(n);
  }
  get isSingleSchema() {
    return !this._schemaAttribute;
  }
  define(n) {
    this.schema = n;
  }
  getSchemaAttribute(n, r, a) {
    return !this.isSingleSchema && this._schemaAttribute(n, r, a);
  }
  inferSchema(n, r, a) {
    if (this.isSingleSchema)
      return this.schema;
    const o = this.getSchemaAttribute(n, r, a);
    return this.schema[o];
  }
  normalizeValue(n, r, a, o, l, c) {
    const g = this.inferSchema(n, r, a);
    if (!g)
      return n;
    const p = o(n, r, a, g, l, c);
    return this.isSingleSchema || p === void 0 || p === null ? p : { id: p, schema: this.getSchemaAttribute(n, r, a) };
  }
}
class Dv extends Wc {
  constructor(n, r) {
    if (!r)
      throw new Error('Expected option "schemaAttribute" not found on UnionSchema.');
    super(n, r);
  }
  normalize(n, r, a, o, l, c) {
    return this.normalizeValue(n, r, a, o, l, c);
  }
}
const Mv = (i) => {
  if (Array.isArray(i) && i.length > 1)
    throw new Error(`Expected schema definition to be a single schema, but found ${i.length}.`);
  return i[0];
}, Uc = (i) => Array.isArray(i) ? i : Object.keys(i).map((n) => i[n]), Fv = (i, n, r, a, o, l, c) => Uc(n).map((g) => o(g, r, a, Mv(i), l, c));
class kv extends Wc {
  normalize(n, r, a, o, l, c) {
    return Uc(n).map((g) => this.normalizeValue(g, r, a, o, l, c)).filter((g) => g != null);
  }
}
const Kv = (i, n, r, a, o, l, c) => {
  const g = { ...n };
  return Object.keys(i).forEach((p) => {
    const v = i[p], $ = typeof v == "function" ? v(n) : v, O = o(n[p], n, p, $, l, c);
    O == null ? delete g[p] : g[p] = O;
  }), g;
}, Pa = (i, n, r, a, o, l) => typeof i != "object" || !i ? i : typeof a == "object" && (!a.normalize || typeof a.normalize != "function") ? (Array.isArray(a) ? Fv : Kv)(a, i, n, r, Pa, o, l) : a.normalize(i, n, r, Pa, o, l), Wv = (i) => (n, r, a, o, l) => {
  const c = n.key, g = n.getId(a, o, l);
  c in i || (i[c] = {}), i[c][g] = i[c][g] ? n.merge(i[c][g], r) : r;
}, Ea = {
  Array: kv,
  Entity: xv,
  Union: Dv
}, Uv = (i, n) => {
  if (!i || typeof i != "object")
    throw new Error(
      `Unexpected input given to normalize. Expected type to be "object", found "${i === null ? "null" : typeof i}".`
    );
  const r = {}, a = Wv(r), l = Pa(i, i, null, n, a, {});
  return { entities: r, result: l };
};
class Hc {
  /**
   * Create a new Attribute instance.
   */
  constructor(n) {
    /**
     * The model instance.
     */
    T(this, "model");
    /**
     * The field name
     */
    T(this, "key");
    this.model = n, this.key = "";
  }
  /**
   * Set the key name of the field
   */
  setKey(n) {
    return this.key = n, this;
  }
}
class He extends Hc {
  /**
   * Create a new relation instance.
   */
  constructor(r, a) {
    super(r);
    /**
     * The parent model.
     */
    T(this, "parent");
    /**
     * The related model.
     */
    T(this, "related");
    /**
     * The delete mode
     */
    T(this, "onDeleteMode");
    this.parent = r, this.related = a;
  }
  /**
   * Get the related model of the relation.
   */
  getRelated() {
    return this.related;
  }
  /**
   * Get all of the primary keys for an array of models.
   */
  getKeys(r, a) {
    return r.map((o) => o[a]);
  }
  /**
   * Specify how this model should behave on delete
   */
  onDelete(r) {
    return this.onDeleteMode = r, this;
  }
  /**
   * Run a dictionary map over the items.
   */
  mapToDictionary(r, a) {
    return r.reduce((o, l) => {
      const [c, g] = a(l);
      return o[c] || (o[c] = []), o[c].push(g), o;
    }, {});
  }
  /**
   * Call a function for a current key match
   */
  compositeKeyMapper(r, a, o) {
    Te(r) && Te(a) ? r.forEach((l, c) => {
      o(l, a[c]);
    }) : !Te(a) && !Te(r) ? o(r, a) : zi([
      "This relation cant be resolve. Either child or parent doesnt have different key types (composite)",
      JSON.stringify(r),
      JSON.stringify(a)
    ]);
  }
  /**
   * Get the index key defined by the primary key or keys (composite)
   */
  getResolvedKey(r, a) {
    return Te(a) ? `[${a.map((o) => r[o]).toString()}]` : r[a];
  }
}
class xa extends He {
  /**
   * Create a new morph-to relation instance.
   */
  constructor(r, a, o, l, c) {
    super(r, r);
    /**
     * The related models.
     */
    T(this, "relatedModels");
    /**
     * The related model dictionary.
     */
    T(this, "relatedTypes");
    /**
     * The field name that contains id of the parent model.
     */
    T(this, "morphId");
    /**
     * The field name that contains type of the parent model.
     */
    T(this, "morphType");
    /**
     * The associated key of the child model.
     */
    T(this, "ownerKey");
    this.relatedModels = a, this.relatedTypes = this.createRelatedTypes(a), this.morphId = o, this.morphType = l, this.ownerKey = c;
  }
  /**
   * Create a dictionary of relations keyed by their entity.
   */
  createRelatedTypes(r) {
    return r.reduce((a, o) => (a[o.$entity()] = o, a), {});
  }
  /**
   * Get the type field name.
   */
  getType() {
    return this.morphType;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return this.relatedModels;
  }
  /**
   * Define the normalizr schema for the relation.
   */
  define(r) {
    return r.union(this.relatedModels, (a, o, l) => {
      const c = o[this.morphType], g = this.relatedTypes[c], p = this.ownerKey || g.$getKeyName();
      return o[this.morphId] = a[p], c;
    });
  }
  /**
   * Attach the relational key to the given record. Since morph-to relationship
   * doesn't have any foreign key, it would do nothing.
   */
  attach(r, a) {
  }
  /**
   * Add eager constraints. Since we do not know the related model ahead of time,
   * we cannot add any eager constraints.
   */
  addEagerConstraints(r, a) {
  }
  /**
   * Find and attach related children to their respective parents.
   */
  match(r, a, o) {
    const l = this.buildDictionary(o, a);
    a.forEach((c) => {
      var $;
      const g = c[this.morphType], p = c[this.morphId], v = (($ = l[g]) == null ? void 0 : $[p]) ?? null;
      c.$setRelation(r, v);
    });
  }
  /**
   * Make a related model.
   */
  make(r, a) {
    return !r || !a ? null : this.relatedTypes[a].$newInstance(r);
  }
  /**
   * Build model dictionary keyed by the owner key for each entity.
   */
  buildDictionary(r, a) {
    const o = this.getKeysByEntity(a), l = {};
    for (const c in o) {
      const g = this.relatedTypes[c];
      Dr(!!g, [
        `Trying to load "morph to" relation of \`${c}\``,
        "but the model could not be found."
      ]);
      const p = this.ownerKey || g.$getKeyName(), v = r.newQueryWithConstraints(c).whereIn(p, o[c]).get(!1);
      l[c] = v.reduce(
        ($, O) => ($[O[p]] = O, $),
        {}
      );
    }
    return l;
  }
  /**
   * Get the relation's primary keys grouped by its entity.
   */
  getKeysByEntity(r) {
    return r.reduce((a, o) => {
      const l = o[this.morphType], c = o[this.morphId];
      return c !== null && this.relatedTypes[l] !== void 0 && (a[l] || (a[l] = []), a[l].push(c)), a;
    }, {});
  }
}
class Vr extends Hc {
  /**
   * Create a new Type attribute instance.
   */
  constructor(r, a = null) {
    super(r);
    /**
     * The raw default value for the attribute (can be a function).
     */
    T(this, "rawDefaultValue");
    /**
     * Whether the attribute accepts `null` value or not.
     */
    T(this, "isNullable", !0);
    this.rawDefaultValue = a;
  }
  /**
   * The computed default value of the attribute.
   */
  get defaultValue() {
    return typeof this.rawDefaultValue == "function" ? this.rawDefaultValue() : this.rawDefaultValue;
  }
  /**
   * Set the nullable option to false.
   */
  notNullable() {
    return this.isNullable = !1, this;
  }
  makeReturn(r, a) {
    return a === void 0 ? this.defaultValue : a === null ? (this.isNullable || this.throwWarning(["is set as non nullable!"]), a) : (typeof a !== r && this.throwWarning([a, "is not a", r]), a);
  }
  /**
   * Throw warning for wrong type
   */
  throwWarning(r) {
    console.warn(["[Pinia ORM]"].concat([`Field ${this.model.$entity()}:${this.key} - `, ...r]).join(" "));
  }
}
class Bc extends Vr {
  constructor(r, a = {}) {
    super(r);
    T(this, "options");
    // This alphabet uses `A-Za-z0-9_-` symbols.
    // The order of characters is optimized for better gzip and brotli compression.
    // References to the same file (works both for gzip and brotli):
    // `'use`, `andom`, and `rict'`
    // References to the brotli default dictionary:
    // `-26T`, `1983`, `40px`, `75px`, `bush`, `jack`, `mind`, `very`, and `wolf`
    T(this, "alphabet", "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict");
    T(this, "size", 21);
    this.options = typeof a == "number" ? { size: a } : a, this.alphabet = this.options.alphabet ?? this.alphabet, this.size = this.options.size ?? this.size;
  }
  /**
   * Make the value for the attribute.
   */
  make(r) {
    const a = this.model.$casts()[this.model.$getKeyName()];
    return a ? r ?? a.withParameters(this.options).newRawInstance(this.model.$fields()).set(r) : r ?? $v(this.size, this.alphabet);
  }
}
class Hv {
  /**
   * Create a new Schema instance.
   */
  constructor(n) {
    /**
     * The list of generated schemas.
     */
    T(this, "schemas", {});
    /**
     * The model instance.
     */
    T(this, "model");
    this.model = n;
  }
  /**
   * Create a single schema.
   */
  one(n, r) {
    n = n || this.model, r = r || this.model;
    const a = `${n.$self().modelEntity()}${r.$self().modelEntity()}`;
    if (this.schemas[a])
      return this.schemas[a];
    const o = this.newEntity(n, r);
    this.schemas[a] = o;
    const l = this.definition(n);
    return o.define(l), o;
  }
  /**
   * Create an array schema for the given model.
   */
  many(n, r) {
    return new Ea.Array(this.one(n, r));
  }
  /**
   * Create an union schema for the given models.
   */
  union(n, r) {
    const a = n.reduce((o, l) => (o[l.$self().modelEntity()] = this.one(l), o), {});
    return new Ea.Union(a, r);
  }
  /**
   * Create a new normalizr entity.
   */
  newEntity(n, r) {
    const a = n.$self().modelEntity(), o = this.idAttribute(n, r);
    return new Ea.Entity(a, {}, { idAttribute: o });
  }
  /**
   * The `id` attribute option for the normalizr entity.
   *
   * Generates any missing primary keys declared by a Uid attribute. Missing
   * primary keys where the designated attributes do not exist will
   * throw an error.
   *
   * Note that this will only generate uids for primary key attributes since it
   * is required to generate the "index id" while the other attributes are not.
   *
   * It's especially important when attempting to "update" records since we'll
   * want to retain the missing attributes in-place to prevent them being
   * overridden by newly generated uid values.
   *
   * If uid primary keys are omitted, when invoking the "update" method, it will
   * fail because the uid values will never exist in the store.
   *
   * While it would be nice to throw an error in such a case, instead of
   * silently failing an update, we don't have a way to detect whether users
   * are trying to "update" records or "inserting" new records at this stage.
   * Something to consider for future revisions.
   */
  idAttribute(n, r) {
    const a = this.getUidPrimaryKeyPairs(n);
    return (o, l, c) => {
      var p, v, $;
      c !== null && ((p = r.$fields()[c]) == null || p.attach(l, o));
      for (const O in a)
        Ta(o[O]) && (o[O] = a[O].setKey(O).make(o[O]));
      return ["BelongsTo", "HasOne", "MorphOne", "MorphTo"].includes(((v = r.$fields()[c]) == null ? void 0 : v.constructor.name) ?? "") && Te(l[c]) && zi(['You are passing a list to "', `${r.$modelEntity()}.${c}`, `" which is a one to one Relation(${($ = r.$fields()[c]) == null ? void 0 : $.constructor.name}):`, JSON.stringify(l[c])]), n.$getIndexId(o);
    };
  }
  /**
   * Get all primary keys defined by the Uid attribute for the given model.
   */
  getUidPrimaryKeyPairs(n) {
    const r = n.$fields(), a = n.$getKeyName(), o = Te(a) ? a : [a], l = {};
    return o.forEach((c) => {
      const g = r[c];
      g instanceof Bc && (l[c] = g);
    }), l;
  }
  /**
   * Create a definition for the given model.
   */
  definition(n) {
    const r = n.$fields(), a = {};
    for (const o in r) {
      const l = r[o];
      l instanceof He && (a[o] = l.define(this));
    }
    return a;
  }
}
class Bv {
  /**
   * Create a new Interpreter instance.
   */
  constructor(n) {
    /**
     * The model object.
     */
    T(this, "model");
    this.model = n;
  }
  process(n) {
    const r = this.normalize(n);
    return [n, r];
  }
  /**
   * Normalize the given data.
   */
  normalize(n) {
    const r = Te(n) ? [this.getSchema()] : this.getSchema();
    return Uv(n, r).entities;
  }
  /**
   * Get the schema from the database.
   */
  getSchema() {
    return new Hv(this.model).one();
  }
}
function ql(i) {
  return {
    save(n, r = !0) {
      this.data = Object.assign({}, this.data, n), r && i && i.newQuery(this.$id).save(Object.values(n));
    },
    insert(n, r = !0) {
      this.data = Object.assign({}, this.data, n), r && i && i.newQuery(this.$id).insert(Object.values(n));
    },
    update(n, r = !0) {
      this.data = Object.assign({}, this.data, n), r && i && i.newQuery(this.$id).update(Object.values(n));
    },
    fresh(n, r = !0) {
      this.data = n, r && i && i.newQuery(this.$id).fresh(Object.values(n));
    },
    destroy(n, r = !0) {
      r && i ? i.newQuery(this.$id).newQuery(this.$id).destroy(n) : (n.forEach((a) => delete this.data[a]), this.data.__ob__ && this.data.__ob__.dep.notify());
    },
    /**
     * Commit `delete` change to the store.
     */
    delete(n, r = !0) {
      r && i ? i.whereId(n).delete() : (n.forEach((a) => delete this.data[a]), this.data.__ob__ && this.data.__ob__.dep.notify());
    },
    flush(n, r = !0) {
      this.data = {}, r && i && i.newQuery(this.$id).flush();
    }
  };
}
function Gc(i, n, r, a) {
  return Vt.pinia.storeType === "optionStore" ? /* @__PURE__ */ Yl(i, {
    state: () => ({ data: {} }),
    actions: ql(a),
    ...n
  }) : /* @__PURE__ */ Yl(i, () => ({
    data: Gr({}),
    ...ql(a),
    ...n
  }), r);
}
class Vc extends He {
  /**
   * Create a new belongs to instance.
   */
  constructor(r, a, o, l, c, g, p) {
    super(r, a);
    /**
     * The pivot model.
     */
    T(this, "pivot");
    /**
     * The foreign key of the parent model.
     */
    T(this, "foreignPivotKey");
    /**
     * The associated key of the relation.
     */
    T(this, "relatedPivotKey");
    /**
     * The key name of the parent model.
     */
    T(this, "parentKey");
    /**
     * The key name of the related model.
     */
    T(this, "relatedKey");
    /**
     * The key name of the pivot data.
     */
    T(this, "pivotKey", "pivot");
    this.pivot = o, this.foreignPivotKey = l, this.relatedPivotKey = c, this.parentKey = g, this.relatedKey = p;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return [this.related, this.pivot];
  }
  /**
   * Define the normalizr schema for the relationship.
   */
  define(r) {
    return r.many(this.related, this.parent);
  }
  /**
   * Attach the parent type and id to the given relation.
   */
  attach(r, a) {
    const o = a[this.pivotKey] ?? {};
    o[this.foreignPivotKey] = r[this.parentKey], o[this.relatedPivotKey] = a[this.relatedKey], a[`pivot_${this.relatedPivotKey}_${this.pivot.$entity()}`] = o;
  }
  /**
   * Convert given value to the appropriate value for the attribute.
   */
  make(r) {
    return r ? r.map((a) => this.related.$newInstance(a)) : [];
  }
  /**
   * Match the eagerly loaded results to their parents.
   */
  match(r, a, o) {
    const l = o.get(!1), c = o.newQuery(this.pivot.$modelEntity()).whereIn(this.relatedPivotKey, this.getKeys(l, this.relatedKey)).whereIn(this.foreignPivotKey, this.getKeys(a, this.parentKey)).groupBy(this.foreignPivotKey, this.relatedPivotKey).get();
    a.forEach((g) => {
      const p = [];
      l.forEach((v) => {
        var D;
        const $ = ((D = c[`[${g[this.parentKey]},${v[this.relatedKey]}]`]) == null ? void 0 : D[0]) ?? null;
        if (!$)
          return;
        const O = v.$newInstance(v.$toJson(), { operation: void 0 });
        delete O[`pivot_${this.relatedPivotKey}_${this.pivot.$entity()}`], O.$setRelation(this.pivotKey, $, !0), p.push(O);
      }), g.$setRelation(r, p), g.$setRelation(this.pivotKey, void 0);
    });
  }
  /**
   * Set the constraints for the related relation.
   */
  addEagerConstraints(r, a) {
  }
  /**
   * Specify the custom pivot accessor to use for the relationship.
   */
  as(r) {
    return this.pivotKey = r, this;
  }
}
class Fr {
  /**
   * Create a new query instance.
   */
  constructor(n, r, a, o, l) {
    /**
     * The database instance.
     */
    T(this, "database");
    /**
     * The model object.
     */
    T(this, "model");
    /**
     * The where constraints for the query.
     */
    T(this, "wheres", []);
    /**
     * The orderings for the query.
     */
    T(this, "orders", []);
    /**
     * The orderings for the query.
     */
    T(this, "groups", []);
    /**
     * The maximum number of records to return.
     */
    T(this, "take", null);
    /**
     * The number of records to skip.
     */
    T(this, "skip", 0);
    /**
     * Fields that should be visible.
     */
    T(this, "visible", ["*"]);
    /**
     * Fields that should be hidden.
     */
    T(this, "hidden", []);
    /**
     * The cache object.
     */
    T(this, "cache");
    /**
     * The relationships that should be eager loaded.
     */
    T(this, "eagerLoad", {});
    /**
     * The pinia store.
     */
    T(this, "pinia");
    T(this, "fromCache", !1);
    T(this, "cacheConfig", {});
    T(this, "getNewHydrated", !1);
    /**
     * Hydrated models. They are stored to prevent rerendering of child components.
     */
    T(this, "hydratedDataCache");
    this.database = n, this.model = r, this.pinia = l, this.cache = a, this.hydratedDataCache = o, this.getNewHydrated = !1;
  }
  /**
   * Create a new query instance for the given model.
   */
  newQuery(n) {
    return this.getNewHydrated = !0, new Fr(this.database, this.database.getModel(n), this.cache, this.hydratedDataCache, this.pinia);
  }
  /**
   * Create a new query instance with constraints for the given model.
   */
  newQueryWithConstraints(n) {
    const r = new Fr(this.database, this.database.getModel(n), this.cache, this.hydratedDataCache, this.pinia);
    return r.eagerLoad = { ...this.eagerLoad }, r.wheres = [...this.wheres], r.orders = [...this.orders], r.take = this.take, r.skip = this.skip, r.fromCache = this.fromCache, r.cacheConfig = this.cacheConfig, r;
  }
  /**
   * Create a new query instance from the given relation.
   */
  newQueryForRelation(n) {
    return new Fr(this.database, n.getRelated(), this.cache, /* @__PURE__ */ new Map(), this.pinia);
  }
  /**
   * Create a new interpreter instance.
   */
  newInterpreter() {
    return new Bv(this.model);
  }
  /**
   * Commit a store action and get the data
   */
  commit(n, r) {
    const a = Gc(this.model.$storeName(), this.model.$piniaOptions(), this.model.$piniaExtend(), this)(this.pinia);
    return n && n !== "all" && n !== "get" && typeof a[n] == "function" && a[n](r, !1), this.cache && ["get", "all", "insert", "flush", "delete", "update", "destroy"].includes(n) && this.cache.clear(), a.$state.data;
  }
  /**
   * Make meta field visible
   */
  withMeta() {
    return this.makeVisible(["_meta"]);
  }
  /**
   * Make hidden fields visible
   */
  makeVisible(n) {
    return this.visible = n, this.getNewHydrated = !0, this;
  }
  /**
   * Make visible fields hidden
   */
  makeHidden(n) {
    return this.hidden = n, this.getNewHydrated = !0, this;
  }
  // where(field: T, value?: WhereSecondaryClosure<M[T]> | M[T]): this;
  // where<T extends WherePrimaryClosure<M> | keyof M>(field: T, value?: WhereSecondaryClosure<M[T]> | M[T]): this;
  /**
   * Add a basic where clause to the query.
   */
  where(n, r) {
    return this.wheres.push({ field: n, value: r, boolean: "and" }), this;
  }
  /**
   * Add a "where in" clause to the query.
   */
  whereIn(n, r) {
    return r instanceof Set && (r = Array.from(r)), this.where(n, r);
  }
  /**
   * Add a "where not in" clause to the query.
   */
  whereNotIn(n, r) {
    return r instanceof Set && (r = Array.from(r)), this.where((a) => !r.includes(a[n]));
  }
  /**
   * Add a "where not in" clause to the query.
   */
  orWhereIn(n, r) {
    return r instanceof Set && (r = Array.from(r)), this.orWhere(n, r);
  }
  /**
   * Add a "where not in" clause to the query.
   */
  orWhereNotIn(n, r) {
    return r instanceof Set && (r = Array.from(r)), this.orWhere((a) => !r.includes(a[n]));
  }
  /**
   * Add a where clause on the primary key to the query.
   */
  whereId(n) {
    return this.where(this.model.$getKeyName(), n);
  }
  /**
   * Add an "or where" clause to the query.
   */
  orWhere(n, r) {
    return this.wheres.push({ field: n, value: r, boolean: "or" }), this;
  }
  /**
   * Add a "whereNULL" clause to the query.
   */
  whereNull(n) {
    return this.where(n, null);
  }
  /**
   * Add a "whereNotNULL" clause to the query.
   */
  whereNotNull(n) {
    return this.where((r) => r[n] != null);
  }
  /**
   * Add a "where has" clause to the query.
   */
  whereHas(n, r = () => {
  }, a, o) {
    return this.where(this.getFieldWhereForRelations(n, r, a, o));
  }
  /**
   * Add an "or where has" clause to the query.
   */
  orWhereHas(n, r = () => {
  }, a, o) {
    return this.orWhere(this.getFieldWhereForRelations(n, r, a, o));
  }
  /**
   * Add a "has" clause to the query.
   */
  has(n, r, a) {
    return this.where(this.getFieldWhereForRelations(n, () => {
    }, r, a));
  }
  /**
   * Add an "or has" clause to the query.
   */
  orHas(n, r, a) {
    return this.orWhere(this.getFieldWhereForRelations(n, () => {
    }, r, a));
  }
  /**
   * Add a "doesn't have" clause to the query.
   */
  doesntHave(n) {
    return this.where(this.getFieldWhereForRelations(n, () => {
    }, "=", 0));
  }
  /**
   * Add a "doesn't have" clause to the query.
   */
  orDoesntHave(n) {
    return this.orWhere(this.getFieldWhereForRelations(n, () => {
    }, "=", 0));
  }
  /**
   * Add a "where doesn't have" clause to the query.
   */
  whereDoesntHave(n, r = () => {
  }) {
    return this.where(this.getFieldWhereForRelations(n, r, "=", 0));
  }
  /**
   * Add an "or where doesn't have" clause to the query.
   */
  orWhereDoesntHave(n, r = () => {
  }) {
    return this.orWhere(this.getFieldWhereForRelations(n, r, "=", 0));
  }
  /**
   * Add a "group by" clause to the query.
   */
  groupBy(...n) {
    return n.forEach((r) => {
      this.groups.push({ field: r });
    }), this;
  }
  /**
   * Add an "order by" clause to the query.
   */
  orderBy(n, r = "asc") {
    return this.orders.push({ field: n, direction: r }), this;
  }
  /**
   * Set the "limit" value of the query.
   */
  limit(n) {
    return this.take = n, this;
  }
  /**
   * Set the "offset" value of the query.
   */
  offset(n) {
    return this.skip = n, this;
  }
  /**
   * Set the relationships that should be eager loaded.
   */
  with(n, r = () => {
  }) {
    return this.getNewHydrated = !0, this.eagerLoad[n] = r, this;
  }
  /**
   * Set to eager load all top-level relationships. Constraint is set for all relationships.
   */
  withAll(n = () => {
  }) {
    let r = this.model.$fields();
    Object.values(this.model.$types()).forEach((o) => {
      r = { ...r, ...o.fields() };
    });
    for (const o in r)
      r[o] instanceof He && this.with(o, n);
    return this;
  }
  /**
   * Set to eager load all relationships recursively.
   */
  withAllRecursive(n = 3) {
    return this.withAll((r) => {
      n > 0 && r.withAllRecursive(n - 1);
    });
  }
  /**
   * Define to use the cache for a query
   */
  useCache(n, r) {
    return this.fromCache = !0, this.cacheConfig = {
      key: n,
      params: r
    }, this;
  }
  /**
   * Get where closure for relations
   */
  getFieldWhereForRelations(n, r = () => {
  }, a, o) {
    const l = this.newQuery(this.model.$entity()).with(n, r).get(!1).filter((c) => {
      const g = c[n];
      return wv(
        Te(g) ? g.length : g === null ? 0 : 1,
        typeof a == "number" ? a : o ?? 1,
        typeof a == "number" || o === void 0 ? ">=" : a
      );
    }).map((c) => c.$getIndexId());
    return (c) => l.includes(c.$getIndexId());
  }
  /**
   * Get all models by id from the store. The difference with the `get` is that this
   * method will not process any query chain.
   */
  storeFind(n = []) {
    const r = this.commit("all"), a = [], o = new Set(n);
    return o.size > 0 ? o.forEach((l) => {
      r[l] && a.push(this.hydrate(r[l], { visible: this.visible, hidden: this.hidden, operation: "get" }));
    }) : Object.values(r).forEach((l) => a.push(this.hydrate(l, { visible: this.visible, hidden: this.hidden, operation: "get" }))), a;
  }
  /**
   * Get all models from the store. The difference with the `get` is that this
   * method will not process any query chain. It'll always retrieve all models.
   */
  all() {
    return this.storeFind();
  }
  get(n = !0) {
    if (!this.fromCache || !this.cache)
      return this.internalGet(n);
    const r = this.cacheConfig.key ? this.cacheConfig.key + JSON.stringify(this.cacheConfig.params) : Tv(this.model.$entity(), {
      where: this.wheres,
      groups: this.groups,
      orders: this.orders,
      eagerLoads: this.eagerLoad,
      skip: this.skip,
      take: this.take,
      hidden: this.hidden,
      visible: this.visible
    }), a = this.cache.get(r);
    if (a)
      return a;
    const o = this.internalGet(n);
    return this.cache.set(r, o), o;
  }
  internalGet(n) {
    if (this.model.$entity() !== this.model.$baseEntity() || this.model.$namespace() !== this.model.$baseNamespace()) {
      const a = this.model.$fields()[this.model.$typeKey()].make() ?? this.model.$entity();
      this.where(this.model.$typeKey(), a);
    }
    let r = this.select();
    return this.orders.length === 0 && (r = this.filterLimit(r)), sr(r) || this.eagerLoadRelations(r), this.orders.length > 0 && (r = this.filterOrder(r), r = this.filterLimit(r)), n && r.forEach((a) => a.$self().retrieved(a)), this.groups.length > 0 ? this.filterGroup(r) : r;
  }
  /**
   * Execute the query and get the first result.
   */
  first() {
    return this.limit(1).get()[0] ?? null;
  }
  find(n) {
    return this.whereId(n)[Te(n) ? "get" : "first"]();
  }
  /**
   * Retrieve models by processing all filters set to the query chain.
   */
  select() {
    let n = [];
    const r = this.wheres, a = this.wheres.findIndex((l) => l.field === this.model.$getKeyName());
    if (a > -1) {
      const l = this.wheres[a].value;
      n = ((va(l) ? [] : Te(l) ? l : [l]) || []).map(String) || [], n.length > 0 && (this.wheres = [...this.wheres.slice(0, a), ...this.wheres.slice(a + 1)]);
    }
    let o = this.storeFind(n);
    return o = this.filterWhere(o), this.wheres = r, o;
  }
  /**
   * Filter the given collection by the registered where clause.
   */
  filterWhere(n) {
    if (sr(this.wheres))
      return n;
    const r = this.getWhereComparator();
    return n.filter((a) => r(a));
  }
  /**
   * Get comparator for the where clause.
   */
  getWhereComparator() {
    const { and: n, or: r } = Sv(this.wheres, (a) => a.boolean);
    return (a) => {
      const o = [];
      return n && o.push(n.every((l) => this.whereComparator(a, l))), r && o.push(r.some((l) => this.whereComparator(a, l))), o.includes(!0);
    };
  }
  /**
   * The function to compare where clause to the given model.
   */
  whereComparator(n, r) {
    return va(r.field) ? r.field(n) : Te(r.value) ? r.value.includes(n[r.field]) : va(r.value) ? r.value(n[r.field]) : n[r.field] === r.value;
  }
  /**
   * Filter the given collection by the registered order conditions.
   */
  filterOrder(n) {
    const r = this.orders.map((o) => o.field), a = this.orders.map((o) => o.direction);
    return bv(n, r, a);
  }
  /**
   * Filter the given collection by the registered group conditions.
   */
  filterGroup(n) {
    const r = {}, a = this.groups.map((o) => o.field);
    return n.forEach((o) => {
      const l = a.length === 1 ? o[a[0]] : `[${a.map((c) => o[c]).toString()}]`;
      r[l] = (r[l] || []).concat(o);
    }), r;
  }
  /**
   * Filter the given collection by the registered limit and offset values.
   */
  filterLimit(n) {
    return this.take !== null ? n.slice(this.skip, this.skip + this.take) : n.slice(this.skip);
  }
  /**
   * Eager load relations on the model.
   */
  load(n) {
    this.eagerLoadRelations(n);
  }
  /**
   * Eager load the relationships for the models.
   */
  eagerLoadRelations(n) {
    for (const r in this.eagerLoad)
      this.eagerLoadRelation(n, r, this.eagerLoad[r]);
  }
  /**
   * Eagerly load the relationship on a set of models.
   */
  eagerLoadRelation(n, r, a) {
    const o = this.getRelation(r), l = this.newQueryForRelation(o);
    o.addEagerConstraints(l, n), a(l), o.match(r, n, l);
  }
  /**
   * Get the relation instance for the given relation name.
   */
  getRelation(n) {
    return this.model.$getRelation(n);
  }
  revive(n) {
    return Te(n) ? this.reviveMany(n) : this.reviveOne(n);
  }
  /**
   * Revive single model from the given schema.
   */
  reviveOne(n) {
    this.getNewHydrated = !1;
    const r = this.model.$getIndexId(n), a = this.commit("get")[r] ?? null;
    if (!a)
      return null;
    const o = this.hydrate(a, { visible: this.visible, hidden: this.hidden, operation: "get" });
    return this.reviveRelations(o, n), o;
  }
  /**
   * Revive multiple models from the given schema.
   */
  reviveMany(n) {
    return n.reduce((r, a) => {
      const o = this.reviveOne(a);
      return o && r.push(o), r;
    }, []);
  }
  /**
   * Revive relations for the given schema and entity.
   */
  reviveRelations(n, r) {
    const a = this.model.$fields();
    for (const o in r) {
      const l = a[o];
      if (!(l instanceof He))
        continue;
      const c = r[o];
      if (!c)
        return;
      if (l instanceof xa) {
        const g = n[l.getType()];
        n[o] = this.newQuery(g).reviveOne(c);
        continue;
      }
      n[o] = Te(c) ? this.newQueryForRelation(l).reviveMany(c) : this.newQueryForRelation(l).reviveOne(c);
    }
  }
  /**
   * Create and persist model with default values.
   */
  new(n = !0) {
    let r = this.hydrate({}, { operation: n ? "set" : "get" });
    const a = r.$self().creating(r), o = r.$self().saving(r);
    return a === !1 || o === !1 ? null : (r.$isDirty() && (r = this.hydrate(r.$getAttributes(), { operation: n ? "set" : "get" })), n && (this.hydratedDataCache.set(this.model.$entity() + r.$getKey(void 0, !0), this.hydrate(r.$getAttributes(), { operation: "get" })), r.$self().created(r), r.$self().saved(r), this.commit("insert", this.compile(r))), r);
  }
  save(n) {
    let r = this.newInterpreter().process(n);
    const a = this.model.$types(), o = this.model.$baseEntity() !== this.model.$entity() || this.model.$baseNamespace() !== this.model.$namespace();
    if (Object.values(a).length > 0 || o) {
      const g = Object.keys(a), p = {};
      n = Te(n) ? n : [n], n.forEach((v) => {
        const $ = g.includes(`${v[this.model.$typeKey()]}`) || o ? v[this.model.$typeKey()] ?? this.model.$fields()[this.model.$typeKey()].defaultValue : g[0];
        p[$] || (p[$] = []), p[$].push(v);
      });
      for (const v in p) {
        const $ = a[v];
        $.modelEntity() === this.model.$modelEntity() ? r = this.newInterpreter().process(p[v]) : this.newQueryWithConstraints($.modelEntity()).save(p[v]);
      }
    }
    const [l, c] = r;
    for (const g in c) {
      const p = this.newQuery(g), v = c[g];
      p.saveElements(v);
    }
    return this.revive(l);
  }
  /**
   * Save the given elements to the store.
   */
  saveElements(n) {
    const r = {}, a = this.commit("all"), o = [];
    for (const l in n) {
      const c = n[l], g = a[l];
      let p = g ? Object.assign(this.hydrate(g, { operation: "set", action: "update" }), c) : this.hydrate(c, { operation: "set", action: "save" });
      const v = p.$self().saving(p, c), $ = g ? p.$self().updating(p, c) : p.$self().creating(p, c);
      v === !1 || $ === !1 || (p.$isDirty() && (p = this.hydrate(p.$getAttributes(), { operation: "set", action: "update" })), o.push(() => p.$self().saved(p, c)), o.push(() => g ? p.$self().updated(p, c) : p.$self().created(p, c)), r[l] = p.$getAttributes(), Object.values(p.$types()).length > 0 && !r[l][p.$typeKey()] && (r[l][p.$typeKey()] = c[p.$typeKey()]));
    }
    Object.keys(r).length > 0 && (this.commit("save", r), o.forEach((l) => l()));
  }
  insert(n) {
    const r = this.hydrate(n, { operation: "set", action: "insert" });
    return this.commit("insert", this.compile(r)), r;
  }
  fresh(n) {
    this.hydratedDataCache.clear();
    const r = this.hydrate(n, { action: "update" });
    return this.commit("fresh", this.compile(r)), r;
  }
  /**
   * Update the reocrd matching the query chain.
   */
  update(n) {
    const r = this.get(!1);
    if (sr(r))
      return [];
    const a = r.map((o) => {
      const l = Object.assign(this.hydrate(o.$getAttributes(), { action: "update", operation: "set" }), n);
      if (o.$self().updating(l, n) === !1)
        return o;
      const c = l.$isDirty() ? this.hydrate({ ...o.$getAttributes(), ...n }, { action: "update", operation: "set" }) : l;
      return c.$self().updated(c, n), c;
    });
    return this.commit("update", this.compile(a)), a;
  }
  destroy(n) {
    return Te(n) ? this.destroyMany(n) : this.destroyOne(n);
  }
  destroyOne(n) {
    const r = this.find(n);
    if (!r)
      return null;
    const [a, o] = this.dispatchDeleteHooks(r);
    return o.includes(r.$getIndexId()) || (this.commit("destroy", [r.$getIndexId()]), a.forEach((l) => l())), r;
  }
  destroyMany(n) {
    const r = this.find(n);
    if (sr(r))
      return [];
    const [a, o] = this.dispatchDeleteHooks(r), l = this.getIndexIdsFromCollection(r).filter((c) => !o.includes(c));
    return this.commit("destroy", l), a.forEach((c) => c()), r;
  }
  /**
   * Delete records resolved by the query chain.
   */
  delete() {
    const n = this.get(!1);
    if (sr(n))
      return [];
    const [r, a] = this.dispatchDeleteHooks(n), o = this.getIndexIdsFromCollection(n).filter((l) => !a.includes(l));
    return this.commit("delete", o), r.forEach((l) => l()), n;
  }
  /**
   * Delete all records in the store.
   */
  flush() {
    return this.commit("flush"), this.hydratedDataCache.clear(), this.get(!1);
  }
  checkAndDeleteRelations(n) {
    const r = n.$fields();
    for (const a in r) {
      const o = r[a];
      if (r[a] instanceof He && o.onDeleteMode && n[a]) {
        const c = (Te(n[a]) ? n[a] : [n[a]]).map((p) => p.$getKey(void 0, !0)), g = {};
        if (o instanceof Vc) {
          this.newQuery(o.pivot.$entity()).where(o.foreignPivotKey, n[n.$getLocalKey()]).delete();
          continue;
        }
        switch (o.onDeleteMode) {
          case "cascade": {
            this.newQueryForRelation(o).destroy(c);
            break;
          }
          case "set null": {
            o.foreignKey && (g[o.foreignKey] = null), o.morphId && (g[o.morphId] = null, g[o.morphType] = null), this.newQueryForRelation(o).whereId(c).update(g);
            break;
          }
        }
      }
    }
  }
  dispatchDeleteHooks(n) {
    const r = [], a = [];
    return n = Te(n) ? n : [n], this.withAll().load(n), n.forEach((o) => {
      o.$self().deleting(o) === !1 ? a.push(o.$getIndexId()) : (this.hydratedDataCache.delete("set" + this.model.$entity() + o.$getIndexId()), this.hydratedDataCache.delete("get" + this.model.$entity() + o.$getIndexId()), r.push(() => o.$self().deleted(o)), this.checkAndDeleteRelations(o));
    }), [r, a];
  }
  /**
   * Get an array of index ids from the given collection.
   */
  getIndexIdsFromCollection(n) {
    return n.map((r) => r.$getIndexId());
  }
  hydrate(n, r) {
    return Te(n) ? n.map((a) => this.hydrate(a, r)) : this.getHydratedModel(n, { relations: !1, ...r || {} });
  }
  /**
   * Convert given models into an indexed object that is ready to be saved to
   * the store.
   */
  compile(n) {
    return (Te(n) ? n : [n]).reduce((a, o) => (a[o.$getIndexId()] = o.$getAttributes(), a), {});
  }
  /**
   * Save already existing models and return them if they exist to prevent
   * an update event trigger in vue if the object is used.
   */
  getHydratedModel(n, r) {
    const a = this.model.$entity() + this.model.$getKey(n, !0), o = (r == null ? void 0 : r.operation) + a;
    let l = this.hydratedDataCache.get(o);
    if ((r == null ? void 0 : r.action) === "update" && (this.hydratedDataCache.delete("get" + a), l = void 0), !this.getNewHydrated && l)
      return l;
    const c = this.model.$types()[n[this.model.$typeKey()]], p = ((v) => (c ? c.newRawInstance() : this.model).$newInstance(n, { relations: !1, ...r || {}, ...v }))();
    return sr(this.eagerLoad) && (r == null ? void 0 : r.operation) !== "set" && this.hydratedDataCache.set(o, p), p;
  }
}
var Oc, yt;
class Yc {
  constructor() {
    // @ts-expect-error dont know
    T(this, Oc);
    Hl(this, yt, /* @__PURE__ */ new Map());
  }
  has(n) {
    var r;
    return !!(Ft(this, yt).has(n) && ((r = Ft(this, yt).get(n)) != null && r.deref()));
  }
  get(n) {
    const r = Ft(this, yt).get(n);
    if (!r)
      return;
    const a = r.deref();
    if (a)
      return a;
    Ft(this, yt).delete(n);
  }
  set(n, r) {
    return Ft(this, yt).set(n, new WeakRef(r)), this;
  }
  get size() {
    return Ft(this, yt).size;
  }
  clear() {
    Ft(this, yt).clear();
  }
  delete(n) {
    return Ft(this, yt).delete(n), !1;
  }
  forEach(n) {
    for (const [r, a] of this)
      n(a, r, this);
  }
  *[(Oc = Symbol.toStringTag, Symbol.iterator)]() {
    for (const [n, r] of Ft(this, yt)) {
      const a = r.deref();
      if (!a) {
        Ft(this, yt).delete(n);
        continue;
      }
      yield [n, a];
    }
  }
  *entries() {
    for (const [n, r] of this)
      yield [n, r];
  }
  *keys() {
    for (const [n] of this)
      yield n;
  }
  *values() {
    for (const [, n] of this)
      yield n;
  }
}
yt = new WeakMap();
const Gv = new Yc(), Vv = /* @__PURE__ */ new Map(), Ki = {
  model: {
    namespace: "",
    withMeta: !1,
    hidden: ["_meta"],
    visible: ["*"]
  },
  cache: {
    shared: !0,
    provider: Yc
  },
  pinia: {
    storeType: "optionStore"
  }
}, Vt = { ...Ki };
class Bi {
  /**
   * Create a new Repository instance.
   */
  constructor(n, r) {
    /**
     * The database instance.
     */
    T(this, "database");
    /**
     * The model instance.
     */
    T(this, "model");
    /**
     * The pinia instance
     */
    T(this, "pinia");
    /**
     * The cache instance
     */
    T(this, "queryCache");
    /**
     * Hydrated models. They are stored to prevent rerendering of child components.
     */
    T(this, "hydratedDataCache");
    /**
     * The model object to be used for the custom repository.
     */
    T(this, "use");
    /**
     * Global config
     */
    T(this, "config");
    return this.config = Vt, this.database = n, this.pinia = r, this.hydratedDataCache = Vv, new Proxy(this, {
      get(a, o) {
        if (typeof o != "symbol") {
          if (o in a)
            return a[o];
          if (!(o === "use" || o === "model" || o === "queryCache"))
            return function(...l) {
              return a.query()[o](...l);
            };
        }
      }
    });
  }
  /**
   * Set the model
   */
  static setModel(n) {
    return this.useModel = n, this;
  }
  /**
   * Set the global config
   */
  setConfig(n) {
    this.config = n;
  }
  /**
   * Initialize the repository by setting the model instance.
   */
  initialize(n) {
    return this.config.cache && this.config.cache !== !0 && (this.queryCache = this.config.cache.shared ? Gv : new this.config.cache.provider()), n ? (this.model = n.newRawInstance(), this) : this.use || this.$self().useModel ? (this.use = this.use ?? this.$self().useModel, this.model = this.use.newRawInstance(), this) : this;
  }
  /**
   * Get the constructor for this model.
   */
  $self() {
    return this.constructor;
  }
  /**
   * Get the model instance. If the model is not registered to the repository,
   * it will throw an error. It happens when users use a custom repository
   * without setting `use` property.
   */
  getModel() {
    return Dr(!!this.model, [
      "The model is not registered. Please define the model to be used at",
      "`use` property of the repository class."
    ]), this.model;
  }
  /**
   * Returns the pinia store used with this model
   */
  piniaStore() {
    return Gc(this.model.$storeName(), this.model.$piniaOptions(), this.model.$piniaExtend(), this.query())(this.pinia);
  }
  repo(n) {
    return Xv(n);
  }
  /**
   * Create a new Query instance.
   */
  query() {
    return new Fr(this.database, this.getModel(), this.queryCache, this.hydratedDataCache, this.pinia);
  }
  /**
   * Create a new Query instance.
   */
  cache() {
    return this.queryCache;
  }
  /**
   * Add a basic where clause to the query.
   */
  where(n, r) {
    return this.query().where(n, r);
  }
  /**
   * Add an "or where" clause to the query.
   */
  orWhere(n, r) {
    return this.query().orWhere(n, r);
  }
  /**
   * Add a "where has" clause to the query.
   */
  whereHas(n, r = () => {
  }, a, o) {
    return this.query().whereHas(n, r, a, o);
  }
  /**
   * Add an "or where has" clause to the query.
   */
  orWhereHas(n, r = () => {
  }, a, o) {
    return this.query().orWhereHas(n, r, a, o);
  }
  /**
   * Add a "has" clause to the query.
   */
  has(n, r, a) {
    return this.query().has(n, r, a);
  }
  /**
   * Add an "or has" clause to the query.
   */
  orHas(n, r, a) {
    return this.query().orHas(n, r, a);
  }
  /**
   * Add a "doesn't have" clause to the query.
   */
  doesntHave(n) {
    return this.query().doesntHave(n);
  }
  /**
   * Add a "doesn't have" clause to the query.
   */
  orDoesntHave(n) {
    return this.query().orDoesntHave(n);
  }
  /**
   * Add a "where doesn't have" clause to the query.
   */
  whereDoesntHave(n, r = () => {
  }) {
    return this.query().whereDoesntHave(n, r);
  }
  /**
   * Add an "or where doesn't have" clause to the query.
   */
  orWhereDoesntHave(n, r = () => {
  }) {
    return this.query().orWhereDoesntHave(n, r);
  }
  /**
   * Make meta field visible
   */
  withMeta() {
    return this.query().withMeta();
  }
  /**
   * Make hidden fields visible
   */
  makeVisible(n) {
    return this.query().makeVisible(n);
  }
  /**
   * Make visible fields hidden
   */
  makeHidden(n) {
    return this.query().makeHidden(n);
  }
  /**
   * Add a "group by" clause to the query.
   */
  groupBy(...n) {
    return this.query().groupBy(...n);
  }
  /**
   * Add an "order by" clause to the query.
   */
  orderBy(n, r) {
    return this.query().orderBy(n, r);
  }
  /**
   * Set the "limit" value of the query.
   */
  limit(n) {
    return this.query().limit(n);
  }
  /**
   * Set the "offset" value of the query.
   */
  offset(n) {
    return this.query().offset(n);
  }
  /**
   * Set the relationships that should be eager loaded.
   */
  with(n, r) {
    return this.query().with(n, r);
  }
  /**
   * Set to eager load all top-level relationships. Constraint is set for all relationships.
   */
  withAll(n) {
    return this.query().withAll(n);
  }
  /**
   * Set to eager load all top-level relationships. Constraint is set for all relationships.
   */
  withAllRecursive(n) {
    return this.query().withAllRecursive(n);
  }
  /**
   * Define to use the cache for a query
   */
  useCache(n, r) {
    return this.query().useCache(n, r);
  }
  /**
   * Get all models from the store.
   */
  all() {
    return this.query().get();
  }
  revive(n) {
    return this.query().revive(n);
  }
  make(n) {
    return Te(n) ? n.map((r) => this.getModel().$newInstance(r, {
      relations: !0
    })) : this.getModel().$newInstance(n, {
      relations: !0
    });
  }
  save(n) {
    return this.query().save(n);
  }
  /**
   * Create and persist model with default values.
   */
  new(n = !0) {
    return this.query().new(n);
  }
  insert(n) {
    return this.query().insert(n);
  }
  fresh(n) {
    return this.query().fresh(n);
  }
  destroy(n) {
    return this.query().destroy(n);
  }
  /**
   * Delete all records in the store.
   */
  flush() {
    return this.query().flush();
  }
}
/**
 * A special flag to indicate if this is the repository class or not. It's
 * used when retrieving repository instance from `store.$repo()` method to
 * determine whether the passed in class is either a repository or a model.
 */
T(Bi, "_isRepository", !0), /**
 * The model object to be used for the custom repository.
 */
T(Bi, "useModel");
class Yv {
  constructor() {
    /**
     * The list of registered models.
     */
    T(this, "models", {});
  }
  /**
   * Register the given model.
   */
  register(n) {
    const r = n.$self().modelEntity();
    this.models[r] || (this.models[r] = n, this.registerRelatedModels(n));
  }
  /**
   * Register all related models.
   */
  registerRelatedModels(n) {
    const r = n.$fields();
    for (const a in r) {
      const o = r[a];
      o instanceof He && o.getRelateds().forEach((l) => {
        this.register(l);
      });
    }
  }
  /**
   * Get a model by the specified entity name.
   */
  getModel(n) {
    return this.models[n];
  }
}
const RE = (i) => i, qc = [];
function qv(i) {
  let n = Vt;
  return qc.forEach((r) => {
    const a = r({ config: n, repository: i, model: i.getModel() });
    n = { ...n, ...a.config };
  }), i.setConfig(n), i;
}
function Xv(i, n) {
  const r = new Yv(), a = i._isRepository ? new i(r, n).initialize() : new Bi(r, n).initialize(i);
  try {
    const o = Object.values(a.getModel().$types());
    o.length > 0 ? o.forEach((l) => a.database.register(l.newRawInstance())) : a.database.register(a.getModel());
  } catch (o) {
    console.error("[Pinia ORM] Failed to register models", o);
  }
  return qv(a);
}
function SE(i) {
  return Vt.model = { ...Ki.model, ...i == null ? void 0 : i.model }, Vt.cache = (i == null ? void 0 : i.cache) === !1 ? !1 : { ...Ki.cache, ...(i == null ? void 0 : i.cache) !== !0 && (i == null ? void 0 : i.cache) }, Vt.pinia = { ...Ki.pinia, ...i == null ? void 0 : i.pinia }, i != null && i.plugins && i.plugins.forEach((n) => qc.push(n)), () => {
  };
}
class zv extends Vr {
  /**
   * Make the value for the attribute.
   */
  make(n) {
    return n === void 0 ? this.defaultValue : n;
  }
}
let Jv = class extends Vr {
  /**
   * Create a new String attribute instance.
   */
  constructor(n, r) {
    super(n, r);
  }
  /**
   * Make the value for the attribute.
   */
  make(n) {
    return this.makeReturn("string", n);
  }
}, Qv = class extends Vr {
  /**
   * Create a new Number attribute instance.
   */
  constructor(n, r) {
    super(n, r);
  }
  /**
   * Make the value for the attribute.
   */
  make(n) {
    return this.makeReturn("number", n);
  }
}, Zv = class extends Vr {
  /**
   * Create a new Boolean attribute instance.
   */
  constructor(n, r) {
    super(n, r);
  }
  /**
   * Make the value for the attribute.
   */
  make(n) {
    return this.makeReturn("boolean", n);
  }
};
class Xl extends He {
  /**
   * Create a new has-one relation instance.
   */
  constructor(r, a, o, l) {
    super(r, a);
    /**
     * The foreign key of the parent model.
     */
    T(this, "foreignKey");
    /**
     * The local key of the parent model.
     */
    T(this, "localKey");
    this.foreignKey = o, this.localKey = l;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return [this.related];
  }
  /**
   * Define the normalizr schema for the relation.
   */
  define(r) {
    return r.one(this.related, this.parent);
  }
  /**
   * Attach the relational key to the given relation.
   */
  attach(r, a) {
    this.compositeKeyMapper(
      this.foreignKey,
      this.localKey,
      (o, l) => {
        a[o] = r[l];
      }
    );
  }
  /**
   * Set the constraints for an eager load of the relation.
   */
  addEagerConstraints(r, a) {
    this.compositeKeyMapper(
      this.foreignKey,
      this.localKey,
      (o, l) => r.whereIn(o, this.getKeys(a, l))
    );
  }
  /**
   * Match the eagerly loaded results to their parents.
   */
  match(r, a, o) {
    const l = this.buildDictionary(o.get(!1));
    a.forEach((c) => {
      const g = this.getResolvedKey(c, this.localKey);
      l[g] ? c.$setRelation(r, l[g][0]) : c.$setRelation(r, null);
    });
  }
  /**
   * Build model dictionary keyed by the relation's foreign key.
   */
  buildDictionary(r) {
    return this.mapToDictionary(r, (a) => [this.getResolvedKey(a, this.foreignKey), a]);
  }
  /**
   * Make a related model.
   */
  make(r) {
    return r ? this.related.$newInstance(r) : null;
  }
}
class jv extends He {
  /**
   * Create a new belongs-to relation instance.
   */
  constructor(r, a, o, l) {
    super(r, a);
    /**
     * The child model instance of the relation.
     */
    T(this, "child");
    /**
     * The foreign key of the parent model.
     */
    T(this, "foreignKey");
    /**
     * The associated key on the parent model.
     */
    T(this, "ownerKey");
    this.foreignKey = o, this.ownerKey = l, this.child = a;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return [this.child];
  }
  /**
   * Define the normalizr schema for the relation.
   */
  define(r) {
    return r.one(this.child, this.parent);
  }
  /**
   * Attach the relational key to the given relation.
   */
  attach(r, a) {
    this.compositeKeyMapper(
      this.foreignKey,
      this.ownerKey,
      (o, l) => {
        r[o] = a[l];
      }
    );
  }
  /**
   * Set the constraints for an eager load of the relation.
   */
  addEagerConstraints(r, a) {
    this.compositeKeyMapper(
      this.foreignKey,
      this.ownerKey,
      (o, l) => r.whereIn(l, this.getEagerModelKeys(a, o))
    );
  }
  /**
   * Gather the keys from a collection of related models.
   */
  getEagerModelKeys(r, a) {
    return r.reduce((o, l) => (l[a] !== null && o.push(l[a]), o), []);
  }
  /**
   * Match the eagerly loaded results to their respective parents.
   */
  match(r, a, o) {
    const l = this.buildDictionary(o.get(!1));
    a.forEach((c) => {
      const g = this.getResolvedKey(c, this.foreignKey);
      l[g] ? c.$setRelation(r, l[g]) : c.$setRelation(r, null);
    });
  }
  /**
   * Build model dictionary keyed by relation's parent key.
   */
  buildDictionary(r) {
    return r.reduce((a, o) => (a[this.getResolvedKey(o, this.ownerKey)] = o, a), {});
  }
  /**
   * Make a related model.
   */
  make(r) {
    return r ? this.child.$newInstance(r) : null;
  }
}
class ew extends He {
  /**
   * Create a new has-many relation instance.
   */
  constructor(r, a, o, l) {
    super(r, a);
    /**
     * The foreign key of the parent model.
     */
    T(this, "foreignKey");
    /**
     * The local key of the parent model.
     */
    T(this, "localKey");
    this.foreignKey = o, this.localKey = l;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return [this.related];
  }
  /**
   * Define the normalizr schema for the relation.
   */
  define(r) {
    return r.many(this.related, this.parent);
  }
  /**
   * Attach the relational key to the given relation.
   */
  attach(r, a) {
    this.compositeKeyMapper(
      this.foreignKey,
      this.localKey,
      (o, l) => {
        a[o] = r[l];
      }
    );
  }
  /**
   * Set the constraints for an eager load of the relation.
   */
  addEagerConstraints(r, a) {
    this.compositeKeyMapper(
      this.foreignKey,
      this.localKey,
      (o, l) => r.whereIn(o, this.getKeys(a, l))
    );
  }
  /**
   * Match the eagerly loaded results to their parents.
   */
  match(r, a, o) {
    const l = this.buildDictionary(o.get(!1));
    a.forEach((c) => {
      const g = this.getResolvedKey(c, this.localKey);
      l[g] ? c.$setRelation(r, l[g]) : c.$setRelation(r, []);
    });
  }
  /**
   * Build model dictionary keyed by the relation's foreign key.
   */
  buildDictionary(r) {
    return this.mapToDictionary(r, (a) => [this.getResolvedKey(a, this.foreignKey), a]);
  }
  /**
   * Make related models.
   */
  make(r) {
    return r ? r.map((a) => this.related.$newInstance(a)) : [];
  }
}
class tw extends He {
  /**
   * Create a new has-many-by relation instance.
   */
  constructor(r, a, o, l) {
    super(r, a);
    /**
     * The child model instance of the relation.
     */
    T(this, "child");
    /**
     * The foreign key of the parent model.
     */
    T(this, "foreignKey");
    /**
     * The owner key of the parent model.
     */
    T(this, "ownerKey");
    this.foreignKey = o, this.ownerKey = l, this.child = a;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return [this.child];
  }
  /**
   * Define the normalizr schema for the relation.
   */
  define(r) {
    return r.many(this.child, this.parent);
  }
  /**
   * Attach the relational key to the given relation.
   */
  attach(r, a) {
    a[this.ownerKey] !== void 0 && (r[this.foreignKey] || (r[this.foreignKey] = []), this.attachIfMissing(r[this.foreignKey], a[this.ownerKey]));
  }
  /**
   * Push owner key to foregin key array if owner key doesn't exist in foreign
   * key array.
   */
  attachIfMissing(r, a) {
    r.includes(a) || r.push(a);
  }
  /**
   * Set the constraints for an eager load of the relation.
   */
  addEagerConstraints(r, a) {
    r.whereIn(this.ownerKey, this.getEagerModelKeys(a));
  }
  /**
   * Gather the keys from a collection of related models.
   */
  getEagerModelKeys(r) {
    return r.reduce((a, o) => [...a, ...o[this.foreignKey]], []);
  }
  /**
   * Match the eagerly loaded results to their parents.
   */
  match(r, a, o) {
    const l = this.buildDictionary(o.get(!1));
    a.forEach((c) => {
      const g = this.getRelatedModels(
        l,
        c[this.foreignKey]
      );
      c.$setRelation(r, g);
    });
  }
  /**
   * Build model dictionary keyed by the relation's foreign key.
   */
  buildDictionary(r) {
    return r.reduce((a, o) => (a[o[this.ownerKey]] = o, a), {});
  }
  /**
   * Get all related models from the given dictionary.
   */
  getRelatedModels(r, a) {
    return a.reduce((o, l) => {
      const c = r[l];
      return c && o.push(c), o;
    }, []);
  }
  /**
   * Make related models.
   */
  make(r) {
    return r ? r.map((a) => this.child.$newInstance(a)) : [];
  }
}
class ba extends He {
  /**
   * Create a new morph-one relation instance.
   */
  constructor(r, a, o, l, c) {
    super(r, a);
    /**
     * The field name that contains id of the parent model.
     */
    T(this, "morphId");
    /**
     * The field name that contains type of the parent model.
     */
    T(this, "morphType");
    /**
     * The local key of the model.
     */
    T(this, "localKey");
    this.morphId = o, this.morphType = l, this.localKey = c;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return [this.related];
  }
  /**
   * Define the normalizr schema for the relation.
   */
  define(r) {
    return r.one(this.related, this.parent);
  }
  /**
   * Attach the parent type and id to the given relation.
   */
  attach(r, a) {
    a[this.morphId] = r[this.localKey], a[this.morphType] = this.parent.$entity();
  }
  /**
   * Set the constraints for an eager load of the relation.
   */
  addEagerConstraints(r, a) {
    r.where(this.morphType, this.parent.$entity()).whereIn(this.morphId, this.getKeys(a, this.localKey));
  }
  /**
   * Match the eagerly loaded results to their parents.
   */
  match(r, a, o) {
    const l = this.buildDictionary(o.get(!1));
    a.forEach((c) => {
      const g = c[this.localKey];
      l[g] ? c.$setRelation(r, l[g]) : c.$setRelation(r, null);
    });
  }
  /**
   * Build model dictionary keyed by the relation's foreign key.
   */
  buildDictionary(r) {
    return r.reduce((a, o) => (a[o[this.morphId]] = o, a), {});
  }
  /**
   * Make a related model.
   */
  make(r) {
    return r ? this.related.$newInstance(r) : null;
  }
}
class nw extends He {
  /**
   * Create a new morph-many relation instance.
   */
  constructor(r, a, o, l, c) {
    super(r, a);
    /**
     * The field name that contains id of the parent model.
     */
    T(this, "morphId");
    /**
     * The field name that contains type of the parent model.
     */
    T(this, "morphType");
    /**
     * The local key of the model.
     */
    T(this, "localKey");
    this.morphId = o, this.morphType = l, this.localKey = c;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return [this.related];
  }
  /**
   * Define the normalizr schema for the relation.
   */
  define(r) {
    return r.many(this.related, this.parent);
  }
  /**
   * Attach the parent type and id to the given relation.
   */
  attach(r, a) {
    a[this.morphId] = r[this.localKey], a[this.morphType] = this.parent.$entity();
  }
  /**
   * Set the constraints for an eager load of the relation.
   */
  addEagerConstraints(r, a) {
    r.where(this.morphType, this.parent.$entity()), r.whereIn(this.morphId, this.getKeys(a, this.localKey));
  }
  /**
   * Match the eagerly loaded results to their parents.
   */
  match(r, a, o) {
    const l = this.buildDictionary(o.get(!1));
    a.forEach((c) => {
      const g = c[this.localKey];
      l[g] ? c.$setRelation(r, l[g]) : c.$setRelation(r, []);
    });
  }
  /**
   * Build model dictionary keyed by the relation's foreign key.
   */
  buildDictionary(r) {
    return this.mapToDictionary(r, (a) => [a[this.morphId], a]);
  }
  /**
   * Make related models.
   */
  make(r) {
    return r ? r.map((a) => this.related.$newInstance(a)) : [];
  }
}
class rw extends He {
  /**
   * Create a new has-many-through relation instance.
   */
  constructor(r, a, o, l, c, g, p) {
    super(r, a);
    /**
     * The "through" parent model.
     */
    T(this, "through");
    /**
     * The near key on the relationship.
     */
    T(this, "firstKey");
    /**
     * The far key on the relationship.
     */
    T(this, "secondKey");
    /**
     * The local key on the relationship.
     */
    T(this, "localKey");
    /**
     * The local key on the intermediary model.
     */
    T(this, "secondLocalKey");
    this.through = o, this.firstKey = l, this.secondKey = c, this.localKey = g, this.secondLocalKey = p;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return [this.related, this.through];
  }
  /**
   * Define the normalizr schema for the relation.
   */
  define(r) {
    return r.many(this.related, this.parent);
  }
  /**
   * Attach the relational key to the given data. Since has many through
   * relationship doesn't have any foreign key, it would do nothing.
   */
  attach(r, a) {
  }
  /**
   * Only register missing through relation
   */
  addEagerConstraints(r, a) {
  }
  /**
   * Match the eagerly loaded results to their parents.
   */
  match(r, a, o) {
    const l = o.newQuery(this.through.$entity()).where(this.firstKey, this.getKeys(a, this.localKey)).get(!1), c = o.where(this.secondKey, this.getKeys(l, this.secondLocalKey)).groupBy(this.secondKey).get(!1), g = this.buildDictionary(l, c);
    a.forEach((p) => {
      const v = p[this.localKey];
      g[v] ? p.$setRelation(r, g[v][0]) : p.$setRelation(r, []);
    });
  }
  /**
   * Build model dictionary keyed by the relation's foreign key.
   */
  buildDictionary(r, a) {
    return this.mapToDictionary(r, (o) => [o[this.firstKey], a[o[this.secondLocalKey]]]);
  }
  /**
   * Make related models.
   */
  make(r) {
    return r ? r.map((a) => this.related.$newInstance(a)) : [];
  }
}
class iw extends He {
  /**
   * Create a new morph to many to instance.
   */
  constructor(r, a, o, l, c, g, p, v) {
    super(r, a);
    /**
     * The pivot model.
     */
    T(this, "pivot");
    /**
     * The field name that contains id of the parent model.
     */
    T(this, "morphId");
    /**
     * The field name that contains type of the parent model.
     */
    T(this, "morphType");
    /**
     * The associated key of the relation.
     */
    T(this, "relatedId");
    /**
     * The key name of the parent model.
     */
    T(this, "parentKey");
    /**
     * The key name of the related model.
     */
    T(this, "relatedKey");
    /**
     * The key name of the pivot data.
     */
    T(this, "pivotKey", "pivot");
    this.pivot = o, this.morphId = c, this.morphType = g, this.relatedId = l, this.parentKey = p, this.relatedKey = v;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return [this.related, this.pivot];
  }
  /**
   * Define the normalizr schema for the relationship.
   */
  define(r) {
    return r.many(this.related, this.parent);
  }
  /**
   * Attach the parent type and id to the given relation.
   */
  attach(r, a) {
    const o = a[this.pivotKey] ?? {};
    o[this.morphId] = r[this.parentKey], o[this.morphType] = this.parent.$entity(), o[this.relatedId] = a[this.relatedKey], a[`pivot_${this.relatedId}_${this.pivot.$entity()}`] = o;
  }
  /**
   * Convert given value to the appropriate value for the attribute.
   */
  make(r) {
    return r ? r.map((a) => this.related.$newInstance(a)) : [];
  }
  /**
   * Match the eagerly loaded results to their parents.
   */
  match(r, a, o) {
    const l = o.get(!1), c = o.newQuery(this.pivot.$modelEntity()).whereIn(this.relatedId, this.getKeys(l, this.relatedKey)).whereIn(this.morphId, this.getKeys(a, this.parentKey)).groupBy(this.morphId, this.relatedId, this.morphType).get();
    a.forEach((g) => {
      const p = [];
      l.forEach((v) => {
        var D;
        const $ = ((D = c[`[${g[this.parentKey]},${v[this.relatedKey]},${this.parent.$entity()}]`]) == null ? void 0 : D[0]) ?? null;
        if (!$)
          return;
        const O = v.$newInstance(v.$toJson(), { operation: void 0 });
        delete O[`pivot_${this.relatedId}_${this.pivot.$entity()}`], O.$setRelation(this.pivotKey, $, !0), p.push(O);
      }), g.$setRelation(r, p);
    });
  }
  /**
   * Set the constraints for the related relation.
   */
  addEagerConstraints(r, a) {
  }
  /**
   * Specify the custom pivot accessor to use for the relationship.
   */
  as(r) {
    return this.pivotKey = r, this;
  }
}
class sw extends He {
  /**
   * Create a new morph to many to instance.
   */
  constructor(r, a, o, l, c, g, p, v) {
    super(r, a);
    /**
     * The pivot model.
     */
    T(this, "pivot");
    /**
     * The field name that contains id of the parent model.
     */
    T(this, "morphId");
    /**
     * The field name that contains type of the parent model.
     */
    T(this, "morphType");
    /**
     * The associated key of the relation.
     */
    T(this, "relatedId");
    /**
     * The key name of the parent model.
     */
    T(this, "parentKey");
    /**
     * The key name of the related model.
     */
    T(this, "relatedKey");
    /**
     * The key name of the pivot data.
     */
    T(this, "pivotKey", "pivot");
    this.pivot = o, this.morphId = c, this.morphType = g, this.relatedId = l, this.parentKey = p, this.relatedKey = v;
  }
  /**
   * Get all related models for the relationship.
   */
  getRelateds() {
    return [this.related, this.pivot];
  }
  /**
   * Define the normalizr schema for the relationship.
   */
  define(r) {
    return r.many(this.related, this.parent);
  }
  /**
   * Attach the parent type and id to the given relation.
   */
  attach(r, a) {
    const o = r[this.pivotKey] ?? {};
    o[this.morphId] = a[this.relatedKey], o[this.morphType] = this.related.$entity(), o[this.relatedId] = r[this.parentKey], a[`pivot_${this.relatedId}_${this.pivot.$entity()}`] = o;
  }
  /**
   * Convert given value to the appropriate value for the attribute.
   */
  make(r) {
    return r ? r.map((a) => this.related.$newInstance(a)) : [];
  }
  /**
   * Match the eagerly loaded results to their parents.
   */
  match(r, a, o) {
    const l = o.get(!1), c = o.newQuery(this.pivot.$modelEntity()).whereIn(this.relatedId, this.getKeys(a, this.parentKey)).whereIn(this.morphId, this.getKeys(l, this.relatedKey)).groupBy(this.relatedId, this.morphType).get();
    a.forEach((g) => {
      var O;
      const p = this.getKeys(c[`[${g[this.parentKey]},${this.related.$entity()}]`] ?? [], this.morphId), v = l.filter((D) => p.includes(D[this.relatedKey])), $ = ((O = c[`[${g[this.parentKey]},${this.related.$entity()}]`] ?? []) == null ? void 0 : O[0]) ?? null;
      $ && g.$setRelation(this.pivotKey, $, !0), g.$setRelation(r, v);
    });
  }
  /**
   * Set the constraints for the related relation.
   */
  addEagerConstraints(r, a) {
  }
  /**
   * Specify the custom pivot accessor to use for the relationship.
   */
  as(r) {
    return this.pivotKey = r, this;
  }
}
var ye;
let aw = (ye = class {
  /**
   * Create a new model instance.
   */
  constructor(n, r = { operation: "set" }) {
    this.$boot(), (r.fill ?? !0) && this.$fill(n, r);
  }
  /**
   * Create a new model fields definition.
   */
  static fields() {
    return {};
  }
  static usedNamespace() {
    return this.namespace ?? Vt.model.namespace;
  }
  static modelEntity() {
    return (this.usedNamespace() ? this.usedNamespace() + "/" : "") + this.entity;
  }
  /**
   * Build the schema by evaluating fields and registry.
   */
  static initializeSchema() {
    const n = this.modelEntity();
    this.schemas[n] = {}, this.fieldsOnDelete[n] = this.fieldsOnDelete[n] ?? {};
    const r = {
      ...this.fields(),
      ...this.registries[n]
    };
    for (const a in r) {
      const o = r[a];
      this.schemas[n][a] = typeof o == "function" ? o() : o, this.fieldsOnDelete[n][a] && (this.schemas[n][a] = this.schemas[n][a].onDelete(this.fieldsOnDelete[n][a]));
    }
  }
  /**
   * Set the attribute to the registry.
   */
  static setRegistry(n, r) {
    return this.registries[this.modelEntity()] || (this.registries[this.modelEntity()] = {}), this.registries[this.modelEntity()][n] = r, this;
  }
  /**
   * Set delete behaviour for relation field
   */
  static setFieldDeleteMode(n, r) {
    return this.fieldsOnDelete[this.modelEntity()] = this.fieldsOnDelete[this.modelEntity()] ?? {}, this.fieldsOnDelete[this.modelEntity()][n] = r, this;
  }
  /**
   * Set an mutator for a field
   */
  static setMutator(n, r) {
    return this.fieldMutators[n] = r, this;
  }
  /**
   * Set a cast for a field
   */
  static setCast(n, r) {
    return this.fieldCasts[n] = r, this;
  }
  /**
   * Set a field to hidden
   */
  static setHidden(n) {
    return this.hidden.push(n), this;
  }
  /**
   * Clear the list of booted models so they can be re-booted.
   */
  static clearBootedModels() {
    this.booted = {}, this.original = {}, this.schemas = {}, this.fieldMutators = {}, this.fieldCasts = {}, this.hidden = [], this.visible = [];
  }
  /**
   * Clear registries.
   */
  static clearRegistries() {
    this.registries = {};
  }
  /**
   * Create a new model instance without field values being populated.
   *
   * This method is mainly for the internal use when registering models to the
   * database. Since all pre-registered models are for referencing its model
   * setting during the various process, but the fields are not required.
   *
   * Use this method when you want create a new model instance for:
   * - Registering model to a component (eg. Repository, Query, etc.)
   * - Registering model to attributes (String, Has Many, etc.)
   */
  static newRawInstance() {
    return new this(void 0, { fill: !1 });
  }
  /**
   * Create a new Attr attribute instance.
   */
  static attr(n) {
    return new zv(this.newRawInstance(), n);
  }
  /**
   * Create a new String attribute instance.
   */
  static string(n) {
    return new Jv(this.newRawInstance(), n);
  }
  /**
   * Create a new Number attribute instance.
   */
  static number(n) {
    return new Qv(this.newRawInstance(), n);
  }
  /**
   * Create a new Boolean attribute instance.
   */
  static boolean(n) {
    return new Zv(this.newRawInstance(), n);
  }
  /**
   * Create a new Uid attribute instance.
   */
  static uid(n) {
    return new Bc(this.newRawInstance(), n);
  }
  /**
   * Create a new HasOne relation instance.
   */
  static hasOne(n, r, a) {
    const o = this.newRawInstance();
    return a = a ?? o.$getKeyName(), new Xl(o, n.newRawInstance(), r, a);
  }
  /**
   * Create a new BelongsTo relation instance.
   */
  static belongsTo(n, r, a) {
    const o = n.newRawInstance();
    return a = a ?? o.$getKeyName(), new jv(this.newRawInstance(), o, r, a);
  }
  /**
   * Create a new HasMany relation instance.
   */
  static belongsToMany(n, r, a, o, l, c) {
    const g = n.newRawInstance(), p = this.newRawInstance(), v = r.newRawInstance();
    return l = l ?? p.$getLocalKey(), c = c ?? g.$getLocalKey(), this.schemas[n.modelEntity()][`pivot_${o}_${v.$entity()}`] = new Xl(g, v, o, c), new Vc(
      p,
      g,
      v,
      a,
      o,
      l,
      c
    );
  }
  /**
   * Create a new MorphToMany relation instance.
   */
  static morphToMany(n, r, a, o, l, c, g) {
    const p = n.newRawInstance(), v = this.newRawInstance(), $ = r.newRawInstance();
    return c = c ?? v.$getLocalKey(), g = g ?? p.$getLocalKey(), this.schemas[n.modelEntity()][`pivot_${a}_${$.$entity()}`] = new ba(p, $, a, v.$entity(), g), new iw(
      v,
      p,
      $,
      a,
      o,
      l,
      c,
      g
    );
  }
  /**
   * Create a new MorphedByMany relation instance.
   */
  static morphedByMany(n, r, a, o, l, c, g) {
    const p = n.newRawInstance(), v = this.newRawInstance(), $ = r.newRawInstance();
    return c = c ?? v.$getLocalKey(), g = g ?? p.$getLocalKey(), this.schemas[n.modelEntity()][`pivot_${a}_${$.$entity()}`] = new ba(v, $, o, l, g), new sw(
      v,
      p,
      $,
      a,
      o,
      l,
      c,
      g
    );
  }
  /**
   * Create a new HasMany relation instance.
   */
  static hasMany(n, r, a) {
    const o = this.newRawInstance();
    return a = a ?? o.$getKeyName(), new ew(o, n.newRawInstance(), r, a);
  }
  /**
   * Create a new HasManyBy relation instance.
   */
  static hasManyBy(n, r, a) {
    const o = n.newRawInstance();
    return a = a ?? o.$getLocalKey(), new tw(this.newRawInstance(), o, r, a);
  }
  /**
   * Create a new HasMany relation instance.
   */
  static hasManyThrough(n, r, a, o, l, c) {
    const g = this.newRawInstance(), p = r.newRawInstance();
    return l = l ?? g.$getLocalKey(), c = c ?? p.$getLocalKey(), new rw(g, n.newRawInstance(), p, a, o, l, c);
  }
  /**
   * Create a new MorphOne relation instance.
   */
  static morphOne(n, r, a, o) {
    const l = this.newRawInstance();
    return o = o ?? l.$getLocalKey(), new ba(l, n.newRawInstance(), r, a, o);
  }
  /**
   * Create a new MorphTo relation instance.
   */
  static morphTo(n, r, a, o = "") {
    const l = this.newRawInstance(), c = n.map((g) => g.newRawInstance());
    return new xa(l, c, r, a, o);
  }
  /**
   * Create a new MorphMany relation instance.
   */
  static morphMany(n, r, a, o) {
    const l = this.newRawInstance();
    return o = o ?? l.$getLocalKey(), new nw(l, n.newRawInstance(), r, a, o);
  }
  /**
   * Mutators to mutate matching fields when instantiating the model.
   */
  static mutators() {
    return {};
  }
  /**
   * Casts to cast matching fields when instantiating the model.
   */
  static casts() {
    return {};
  }
  /**
   * Types mapping used to dispatch entities based on their discriminator field
   */
  static types() {
    return {};
  }
  /**
   * Get the constructor for this model.
   */
  $self() {
    return this.constructor;
  }
  /**
   * Get the entity for this model.
   */
  $entity() {
    return this.$self().entity;
  }
  /**
   * Get the model config.
   */
  $config() {
    return this.$self().config;
  }
  /**
   * Get the namespace.
   */
  $namespace() {
    return this.$self().usedNamespace();
  }
  /**
   * Get the store name.
   */
  $storeName() {
    return (this.$namespace() ? this.$namespace() + "/" : "") + this.$baseEntity();
  }
  /**
   * Get the base entity for this model.
   */
  $baseEntity() {
    return this.$self().baseEntity ?? this.$entity();
  }
  /**
   * Get the base namespace for this model.
   */
  $baseNamespace() {
    return this.$self().baseNamespace ?? this.$namespace();
  }
  /**
   * Get the model entity for this model.
   */
  $modelEntity() {
    return this.$self().modelEntity();
  }
  /**
   * Get the type key for this model.
   */
  $typeKey() {
    return this.$self().typeKey;
  }
  /**
   * Get the types for this model.
   */
  $types() {
    return this.$self().types();
  }
  /**
   * Get the pinia options for this model.
   */
  $piniaOptions() {
    return this.$self().piniaOptions;
  }
  /**
   * Get the extended functionality.
   */
  $piniaExtend() {
    return this.$self().piniaExtend;
  }
  /**
   * Get the primary key for this model.
   */
  $primaryKey() {
    return this.$self().primaryKey;
  }
  /**
   * Get the model fields for this model.
   */
  $fields() {
    return this.$self().schemas[this.$modelEntity()];
  }
  /**
   * Get the model hidden fields
   */
  $hidden() {
    return this.$self().hidden;
  }
  /**
   * Get the model visible fields
   */
  $visible() {
    return this.$self().visible;
  }
  /**
   * Create a new instance of this model. This method provides a convenient way
   * to re-generate a fresh instance of this model. It's particularly useful
   * during hydration through Query operations.
   */
  $newInstance(n, r) {
    const a = this.$self();
    return new a(n, r);
  }
  /**
   * Bootstrap this model.
   */
  $boot() {
    this.$self().booted[this.$modelEntity()] || (this.$self().booted[this.$modelEntity()] = !0, this.$initializeSchema());
  }
  /**
   * Build the schema by evaluating fields and registry.
   */
  $initializeSchema() {
    this.$self().initializeSchema();
  }
  $casts() {
    return {
      ...this.$getCasts(),
      ...this.$self().fieldCasts
    };
  }
  /**
   * Fill this model by the given attributes. Missing fields will be populated
   * by the attributes default value.
   */
  $fill(n = {}, r = {}) {
    var p, v, $;
    const a = r.operation ?? "get", o = {
      ...Vt.model,
      ...this.$config()
    };
    o.withMeta && (this.$self().schemas[this.$entity()][this.$self().metaKey] = this.$self().attr({}));
    const l = this.$fields(), c = r.relations ?? !0, g = {
      ...this.$getMutators(),
      ...this.$self().fieldMutators
    };
    for (const O in l) {
      if (a === "get" && !this.isFieldVisible(O, this.$hidden(), this.$visible(), r))
        continue;
      const D = l[O];
      let B = n[O];
      if (D instanceof He && !c)
        continue;
      const X = g == null ? void 0 : g[O], Y = (p = this.$casts()[O]) == null ? void 0 : p.newRawInstance(l);
      X && a === "get" && (B = typeof X == "function" ? X(B) : typeof X.get == "function" ? X.get(B) : B), Y && a === "get" && (B = Y.get(B));
      let H = this.$fillField(O, D, B);
      X && typeof X != "function" && a === "set" && X.set && (H = X.set(H)), Y && a === "set" && (H = r.action === "update" ? Y.get(H) : Y.set(H)), this[O] = this[O] ?? H;
    }
    return a === "set" && (((v = this.$self().original)[$ = this.$modelEntity()] ?? (v[$] = {}))[this.$getKey(this, !0)] = this.$getAttributes()), o.withMeta && a === "set" && this.$fillMeta(r.action), this;
  }
  $fillMeta(n = "save") {
    const r = Math.floor(Date.now() / 1e3);
    n === "save" && (this[this.$self().metaKey] = {
      createdAt: r,
      updatedAt: r
    }), n === "update" && (this[this.$self().metaKey].updatedAt = r);
  }
  /**
   * Fill the given attribute with a given value specified by the given key.
   */
  $fillField(n, r, a) {
    if (a !== void 0)
      return r instanceof xa ? r.setKey(n).make(a, this[r.getType()]) : r.setKey(n).make(a);
    if (this[n] === void 0)
      return r.setKey(n).make();
  }
  isFieldVisible(n, r, a, o) {
    const l = r.length > 0 ? r : Vt.model.hidden, c = [...a.length > 0 ? a : Vt.model.visible, String(this.$primaryKey())], g = o.visible ?? [], p = o.hidden ?? [];
    return (l.includes("*") || l.includes(n)) && !g.includes(n) || p.includes(n) ? !1 : (c.includes("*") || c.includes(n)) && !p.includes(n) || g.includes(n);
  }
  /**
   * Get the primary key field name.
   */
  $getKeyName() {
    return this.$primaryKey();
  }
  /**
   * Get primary key value for the model. If the model has the composite key,
   * it will return an array of ids.
   */
  $getKey(n, r = !1) {
    if (n = n ?? this, this.$hasCompositeKey()) {
      const o = this.$getCompositeKey(n);
      return r ? "[" + (o == null ? void 0 : o.join(",")) + "]" : o;
    }
    const a = n[this.$getKeyName()];
    return Ta(a) ? null : a;
  }
  /**
   * Check whether the model has composite key.
   */
  $hasCompositeKey() {
    return Te(this.$getKeyName());
  }
  /**
   * Get the composite key values for the given model as an array of ids.
   */
  $getCompositeKey(n) {
    let r = [];
    return this.$getKeyName().every((a) => {
      const o = n[a];
      return Ta(o) ? (r = null, !1) : (r.push(o), !0);
    }), r === null ? null : r;
  }
  /**
   * Get the index id of this model or for a given record.
   */
  $getIndexId(n) {
    const r = n ?? this, a = this.$getKey(r);
    return Dr(a !== null, [
      "The record is missing the primary key. If you want to persist record",
      "without the primary key, please define the primary key field with the",
      "`uid` attribute."
    ]), this.$stringifyId(a);
  }
  /**
   * Stringify the given id.
   */
  $stringifyId(n) {
    return Te(n) ? JSON.stringify(n) : String(n);
  }
  /**
   * Get the local key name for the model.
   */
  $getLocalKey() {
    return Dr(!this.$hasCompositeKey(), [
      "Please provide the local key for the relationship. The model with the",
      "composite key can't infer its local key."
    ]), this.$getKeyName();
  }
  /**
   * Get the relation instance for the given relation name.
   */
  $getRelation(n) {
    let r = this.$fields()[n];
    return Object.values(this.$types()).forEach((o) => {
      r === void 0 && (r = o.fields()[n]);
    }), Dr(r instanceof He, [
      `Relationship [${n}] on model [${this.$entity()}] not found.`
    ]), r;
  }
  /**
   * Set the given relationship on the model.
   */
  $setRelation(n, r, a = !1) {
    return (this.$fields()[n] || a) && (this[n] = r), this;
  }
  /**
   * Get the mutators of the model
   */
  $getMutators() {
    return this.$self().mutators();
  }
  /**
   * Get the casts of the model
   */
  $getCasts() {
    return this.$self().casts();
  }
  /**
   * Get the original values of the model instance
   */
  $getOriginal() {
    var n, r;
    return ((n = this.$self().original)[r = this.$modelEntity()] ?? (n[r] = {}))[this.$getKey(this, !0)];
  }
  /**
   * Return the model instance with its original state
   */
  $refresh() {
    return this.$isDirty() && Object.entries(this.$getOriginal()).forEach((n) => {
      this[n[0]] = n[1];
    }), this;
  }
  /**
   * Checks if attributes were changed
   */
  $isDirty(n) {
    const r = this.$getOriginal();
    return n ? (Object.keys(r).includes(n) || zi(['The property"', n, '"does not exit in the model "', this.$entity(), '"']), !Aa(this[n], r[n])) : !Aa(r, this.$getAttributes());
  }
  /**
   * Get the serialized model attributes.
   */
  $getAttributes() {
    return this.$toJson(this, { relations: !1 });
  }
  /**
   * Serialize this model, or the given model, as POJO.
   */
  $toJson(n, r = {}) {
    n = n ?? this;
    const a = n.$fields(), o = r.relations ?? !0, l = {};
    for (const c in a) {
      const g = a[c], p = n[c];
      if (!(g instanceof He)) {
        l[c] = this.serializeValue(p);
        continue;
      }
      o && (l[c] = this.serializeRelation(p));
    }
    return l;
  }
  /**
   * Serialize the given value.
   */
  serializeValue(n) {
    return n === null ? null : Te(n) ? this.serializeArray(n) : typeof n == "object" ? Oa(n) ? n.toISOString() : this.serializeObject(n) : n;
  }
  /**
   * Serialize the given array to JSON.
   */
  serializeArray(n) {
    return n.map((r) => this.serializeValue(r));
  }
  /**
   * Serialize the given object to JSON.
   */
  serializeObject(n) {
    const r = {};
    if (n.serialize && typeof n.serialize == "function")
      return n.serialize(n);
    for (const a in n)
      r[a] = this.serializeValue(n[a]);
    return r;
  }
  serializeRelation(n) {
    if (n !== void 0)
      return n === null ? null : Te(n) ? n.map((r) => r.$toJson()) : n.$toJson();
  }
}, /**
 * The name of the model.
 */
T(ye, "entity"), /**
 * The reference to the base entity name if the class extends a base entity.
 */
T(ye, "baseEntity"), /**
 * The reference to the base namespace if the class extends a base with a different namespace.
 */
T(ye, "baseNamespace"), /**
 * Define a namespace if you have multiple equal entity names.
 * Resulting in "{namespace}/{entity}"
 */
T(ye, "namespace"), /**
 * The primary key for the model.
 */
T(ye, "primaryKey", "id"), /**
 * The meta key for the model.
 */
T(ye, "metaKey", "_meta"), /**
 * Hidden properties
 */
T(ye, "hidden", ["_meta"]), /**
 * Visible properties
 */
T(ye, "visible", []), /**
 * The global install options
 */
T(ye, "config"), /**
 * The type key for the model.
 */
T(ye, "typeKey", "type"), /**
 * Behaviour for relational fields on delete.
 */
T(ye, "fieldsOnDelete", {}), /**
 * Original model data.
 */
T(ye, "original", {}), /**
 * The schema for the model. It contains the result of the `fields`
 * method or the attributes defined by decorators.
 */
T(ye, "schemas", {}), /**
 * The registry for the model. It contains predefined model schema generated
 * by the property decorators and gets evaluated, and stored, on the `schema`
 * property when registering models to the database.
 */
T(ye, "registries", {}), /**
 * The pinia options for the model. It can contain options which will passed
 * to the 'defineStore' function of pinia.
 */
T(ye, "piniaOptions", {}), T(ye, "piniaExtend", {}), /**
 * The mutators for the model.
 */
T(ye, "fieldMutators", {}), /**
 * The casts for the model.
 */
T(ye, "fieldCasts", {}), /**
 * The array of booted models.
 */
T(ye, "booted", {}), /**
 * Lifecycle hook for before saving
 */
T(ye, "saving", () => {
}), /**
 * Lifecycle hook for before updating
 */
T(ye, "updating", () => {
}), /**
 * Lifecycle hook for before creating
 */
T(ye, "creating", () => {
}), /**
 * Lifecycle hook for before deleting
 */
T(ye, "deleting", () => {
}), /**
 * Lifecycle hook for after getting data
 */
T(ye, "retrieved", () => {
}), /**
 * Lifecycle hook for after saved
 */
T(ye, "saved", () => {
}), /**
 * Lifecycle hook for after updated
 */
T(ye, "updated", () => {
}), /**
 * Lifecycle hook for after created
 */
T(ye, "created", () => {
}), /**
 * Lifecycle hook for after deleted
 */
T(ye, "deleted", () => {
}), ye);
/*!
  * shared v10.0.8
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function ow(i, n) {
  typeof console < "u" && (console.warn("[intlify] " + i), n && console.warn(n.stack));
}
const Gi = typeof window < "u", Sn = (i, n = !1) => n ? Symbol.for(i) : Symbol(i), uw = (i, n, r) => lw({ l: i, k: n, s: r }), lw = (i) => JSON.stringify(i).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), Ke = (i) => typeof i == "number" && isFinite(i), cw = (i) => eo(i) === "[object Date]", cr = (i) => eo(i) === "[object RegExp]", Qi = (i) => ue(i) && Object.keys(i).length === 0, Be = Object.assign, fw = Object.create, be = (i = null) => fw(i);
let zl;
const Un = () => zl || (zl = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : be());
function Jl(i) {
  return i.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function Ql(i) {
  return i.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function hw(i) {
  return i = i.replace(/(\w+)\s*=\s*"([^"]*)"/g, (a, o, l) => `${o}="${Ql(l)}"`), i = i.replace(/(\w+)\s*=\s*'([^']*)'/g, (a, o, l) => `${o}='${Ql(l)}'`), /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi.test(i) && (i = i.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3")), [
    // In href, src, action, formaction attributes
    /(\s+(?:href|src|action|formaction)\s*=\s*["']?)\s*javascript:/gi,
    // In style attributes within url()
    /(style\s*=\s*["'][^"']*url\s*\(\s*)javascript:/gi
  ].forEach((a) => {
    i = i.replace(a, "$1javascript&#58;");
  }), i;
}
const dw = Object.prototype.hasOwnProperty;
function kt(i, n) {
  return dw.call(i, n);
}
const Me = Array.isArray, Ae = (i) => typeof i == "function", z = (i) => typeof i == "string", ge = (i) => typeof i == "boolean", me = (i) => i !== null && typeof i == "object", gw = (i) => me(i) && Ae(i.then) && Ae(i.catch), Xc = Object.prototype.toString, eo = (i) => Xc.call(i), ue = (i) => eo(i) === "[object Object]", pw = (i) => i == null ? "" : Me(i) || ue(i) && i.toString === Xc ? JSON.stringify(i, null, 2) : String(i);
function to(i, n = "") {
  return i.reduce((r, a, o) => o === 0 ? r + a : r + n + a, "");
}
const Mi = (i) => !me(i) || Me(i);
function Wi(i, n) {
  if (Mi(i) || Mi(n))
    throw new Error("Invalid value");
  const r = [{ src: i, des: n }];
  for (; r.length; ) {
    const { src: a, des: o } = r.pop();
    Object.keys(a).forEach((l) => {
      l !== "__proto__" && (me(a[l]) && !me(o[l]) && (o[l] = Array.isArray(a[l]) ? [] : be()), Mi(o[l]) || Mi(a[l]) ? o[l] = a[l] : r.push({ src: a[l], des: o[l] }));
    });
  }
}
/*!
  * message-compiler v10.0.8
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function mw(i, n, r) {
  return { line: i, column: n, offset: r };
}
function Da(i, n, r) {
  return { start: i, end: n };
}
const Ee = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14
}, _w = 17;
function Zi(i, n, r = {}) {
  const { domain: a, messages: o, args: l } = r, c = i, g = new SyntaxError(String(c));
  return g.code = i, n && (g.location = n), g.domain = a, g;
}
function yw(i) {
  throw i;
}
const an = " ", vw = "\r", tt = `
`, ww = "\u2028", Ew = "\u2029";
function bw(i) {
  const n = i;
  let r = 0, a = 1, o = 1, l = 0;
  const c = (S) => n[S] === vw && n[S + 1] === tt, g = (S) => n[S] === tt, p = (S) => n[S] === Ew, v = (S) => n[S] === ww, $ = (S) => c(S) || g(S) || p(S) || v(S), O = () => r, D = () => a, B = () => o, X = () => l, Y = (S) => c(S) || p(S) || v(S) ? tt : n[S], H = () => Y(r), I = () => Y(r + l);
  function M() {
    return l = 0, $(r) && (a++, o = 0), c(r) && r++, r++, o++, n[r];
  }
  function W() {
    return c(r + l) && l++, l++, n[r + l];
  }
  function N() {
    r = 0, a = 1, o = 1, l = 0;
  }
  function U(S = 0) {
    l = S;
  }
  function R() {
    const S = r + l;
    for (; S !== r; )
      M();
    l = 0;
  }
  return {
    index: O,
    line: D,
    column: B,
    peekOffset: X,
    charAt: Y,
    currentChar: H,
    currentPeek: I,
    next: M,
    peek: W,
    reset: N,
    resetPeek: U,
    skipToPeek: R
  };
}
const In = void 0, Iw = ".", Zl = "'", Lw = "tokenizer";
function Rw(i, n = {}) {
  const r = n.location !== !1, a = bw(i), o = () => a.index(), l = () => mw(a.line(), a.column(), a.index()), c = l(), g = o(), p = {
    currentType: 13,
    offset: g,
    startLoc: c,
    endLoc: c,
    lastType: 13,
    lastOffset: g,
    lastStartLoc: c,
    lastEndLoc: c,
    braceNest: 0,
    inLinked: !1,
    text: ""
  }, v = () => p, { onError: $ } = n;
  function O(y, w, F, ...Q) {
    const Ie = v();
    if (w.column += F, w.offset += F, $) {
      const re = r ? Da(Ie.startLoc, w) : null, A = Zi(y, re, {
        domain: Lw,
        args: Q
      });
      $(A);
    }
  }
  function D(y, w, F) {
    y.endLoc = l(), y.currentType = w;
    const Q = { type: w };
    return r && (Q.loc = Da(y.startLoc, y.endLoc)), F != null && (Q.value = F), Q;
  }
  const B = (y) => D(
    y,
    13
    /* TokenTypes.EOF */
  );
  function X(y, w) {
    return y.currentChar() === w ? (y.next(), w) : (O(Ee.EXPECTED_TOKEN, l(), 0, w), "");
  }
  function Y(y) {
    let w = "";
    for (; y.currentPeek() === an || y.currentPeek() === tt; )
      w += y.currentPeek(), y.peek();
    return w;
  }
  function H(y) {
    const w = Y(y);
    return y.skipToPeek(), w;
  }
  function I(y) {
    if (y === In)
      return !1;
    const w = y.charCodeAt(0);
    return w >= 97 && w <= 122 || // a-z
    w >= 65 && w <= 90 || // A-Z
    w === 95;
  }
  function M(y) {
    if (y === In)
      return !1;
    const w = y.charCodeAt(0);
    return w >= 48 && w <= 57;
  }
  function W(y, w) {
    const { currentType: F } = w;
    if (F !== 2)
      return !1;
    Y(y);
    const Q = I(y.currentPeek());
    return y.resetPeek(), Q;
  }
  function N(y, w) {
    const { currentType: F } = w;
    if (F !== 2)
      return !1;
    Y(y);
    const Q = y.currentPeek() === "-" ? y.peek() : y.currentPeek(), Ie = M(Q);
    return y.resetPeek(), Ie;
  }
  function U(y, w) {
    const { currentType: F } = w;
    if (F !== 2)
      return !1;
    Y(y);
    const Q = y.currentPeek() === Zl;
    return y.resetPeek(), Q;
  }
  function R(y, w) {
    const { currentType: F } = w;
    if (F !== 7)
      return !1;
    Y(y);
    const Q = y.currentPeek() === ".";
    return y.resetPeek(), Q;
  }
  function S(y, w) {
    const { currentType: F } = w;
    if (F !== 8)
      return !1;
    Y(y);
    const Q = I(y.currentPeek());
    return y.resetPeek(), Q;
  }
  function V(y, w) {
    const { currentType: F } = w;
    if (!(F === 7 || F === 11))
      return !1;
    Y(y);
    const Q = y.currentPeek() === ":";
    return y.resetPeek(), Q;
  }
  function G(y, w) {
    const { currentType: F } = w;
    if (F !== 9)
      return !1;
    const Q = () => {
      const re = y.currentPeek();
      return re === "{" ? I(y.peek()) : re === "@" || re === "|" || re === ":" || re === "." || re === an || !re ? !1 : re === tt ? (y.peek(), Q()) : Se(y, !1);
    }, Ie = Q();
    return y.resetPeek(), Ie;
  }
  function le(y) {
    Y(y);
    const w = y.currentPeek() === "|";
    return y.resetPeek(), w;
  }
  function Se(y, w = !0) {
    const F = (Ie = !1, re = "") => {
      const A = y.currentPeek();
      return A === "{" || A === "@" || !A ? Ie : A === "|" ? !(re === an || re === tt) : A === an ? (y.peek(), F(!0, an)) : A === tt ? (y.peek(), F(!0, tt)) : !0;
    }, Q = F();
    return w && y.resetPeek(), Q;
  }
  function he(y, w) {
    const F = y.currentChar();
    return F === In ? In : w(F) ? (y.next(), F) : null;
  }
  function Ye(y) {
    const w = y.charCodeAt(0);
    return w >= 97 && w <= 122 || // a-z
    w >= 65 && w <= 90 || // A-Z
    w >= 48 && w <= 57 || // 0-9
    w === 95 || // _
    w === 36;
  }
  function vt(y) {
    return he(y, Ye);
  }
  function On(y) {
    const w = y.charCodeAt(0);
    return w >= 97 && w <= 122 || // a-z
    w >= 65 && w <= 90 || // A-Z
    w >= 48 && w <= 57 || // 0-9
    w === 95 || // _
    w === 36 || // $
    w === 45;
  }
  function Ct(y) {
    return he(y, On);
  }
  function Ce(y) {
    const w = y.charCodeAt(0);
    return w >= 48 && w <= 57;
  }
  function wt(y) {
    return he(y, Ce);
  }
  function Nt(y) {
    const w = y.charCodeAt(0);
    return w >= 48 && w <= 57 || // 0-9
    w >= 65 && w <= 70 || // A-F
    w >= 97 && w <= 102;
  }
  function qt(y) {
    return he(y, Nt);
  }
  function Qe(y) {
    let w = "", F = "";
    for (; w = wt(y); )
      F += w;
    return F;
  }
  function hr(y) {
    let w = "";
    for (; ; ) {
      const F = y.currentChar();
      if (F === "{" || F === "}" || F === "@" || F === "|" || !F)
        break;
      if (F === an || F === tt)
        if (Se(y))
          w += F, y.next();
        else {
          if (le(y))
            break;
          w += F, y.next();
        }
      else
        w += F, y.next();
    }
    return w;
  }
  function dr(y) {
    H(y);
    let w = "", F = "";
    for (; w = Ct(y); )
      F += w;
    return y.currentChar() === In && O(Ee.UNTERMINATED_CLOSING_BRACE, l(), 0), F;
  }
  function gr(y) {
    H(y);
    let w = "";
    return y.currentChar() === "-" ? (y.next(), w += `-${Qe(y)}`) : w += Qe(y), y.currentChar() === In && O(Ee.UNTERMINATED_CLOSING_BRACE, l(), 0), w;
  }
  function Xt(y) {
    return y !== Zl && y !== tt;
  }
  function ln(y) {
    H(y), X(y, "'");
    let w = "", F = "";
    for (; w = he(y, Xt); )
      w === "\\" ? F += pr(y) : F += w;
    const Q = y.currentChar();
    return Q === tt || Q === In ? (O(Ee.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, l(), 0), Q === tt && (y.next(), X(y, "'")), F) : (X(y, "'"), F);
  }
  function pr(y) {
    const w = y.currentChar();
    switch (w) {
      case "\\":
      case "'":
        return y.next(), `\\${w}`;
      case "u":
        return Kt(y, w, 4);
      case "U":
        return Kt(y, w, 6);
      default:
        return O(Ee.UNKNOWN_ESCAPE_SEQUENCE, l(), 0, w), "";
    }
  }
  function Kt(y, w, F) {
    X(y, w);
    let Q = "";
    for (let Ie = 0; Ie < F; Ie++) {
      const re = qt(y);
      if (!re) {
        O(Ee.INVALID_UNICODE_ESCAPE_SEQUENCE, l(), 0, `\\${w}${Q}${y.currentChar()}`);
        break;
      }
      Q += re;
    }
    return `\\${w}${Q}`;
  }
  function zt(y) {
    return y !== "{" && y !== "}" && y !== an && y !== tt;
  }
  function mr(y) {
    H(y);
    let w = "", F = "";
    for (; w = he(y, zt); )
      F += w;
    return F;
  }
  function cn(y) {
    let w = "", F = "";
    for (; w = vt(y); )
      F += w;
    return F;
  }
  function fn(y) {
    const w = (F) => {
      const Q = y.currentChar();
      return Q === "{" || Q === "@" || Q === "|" || Q === "(" || Q === ")" || !Q || Q === an ? F : (F += Q, y.next(), w(F));
    };
    return w("");
  }
  function hn(y) {
    H(y);
    const w = X(
      y,
      "|"
      /* TokenChars.Pipe */
    );
    return H(y), w;
  }
  function Ge(y, w) {
    let F = null;
    switch (y.currentChar()) {
      case "{":
        return w.braceNest >= 1 && O(Ee.NOT_ALLOW_NEST_PLACEHOLDER, l(), 0), y.next(), F = D(
          w,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), H(y), w.braceNest++, F;
      case "}":
        return w.braceNest > 0 && w.currentType === 2 && O(Ee.EMPTY_PLACEHOLDER, l(), 0), y.next(), F = D(
          w,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), w.braceNest--, w.braceNest > 0 && H(y), w.inLinked && w.braceNest === 0 && (w.inLinked = !1), F;
      case "@":
        return w.braceNest > 0 && O(Ee.UNTERMINATED_CLOSING_BRACE, l(), 0), F = Et(y, w) || B(w), w.braceNest = 0, F;
      default: {
        let Ie = !0, re = !0, A = !0;
        if (le(y))
          return w.braceNest > 0 && O(Ee.UNTERMINATED_CLOSING_BRACE, l(), 0), F = D(w, 1, hn(y)), w.braceNest = 0, w.inLinked = !1, F;
        if (w.braceNest > 0 && (w.currentType === 4 || w.currentType === 5 || w.currentType === 6))
          return O(Ee.UNTERMINATED_CLOSING_BRACE, l(), 0), w.braceNest = 0, An(y, w);
        if (Ie = W(y, w))
          return F = D(w, 4, dr(y)), H(y), F;
        if (re = N(y, w))
          return F = D(w, 5, gr(y)), H(y), F;
        if (A = U(y, w))
          return F = D(w, 6, ln(y)), H(y), F;
        if (!Ie && !re && !A)
          return F = D(w, 12, mr(y)), O(Ee.INVALID_TOKEN_IN_PLACEHOLDER, l(), 0, F.value), H(y), F;
        break;
      }
    }
    return F;
  }
  function Et(y, w) {
    const { currentType: F } = w;
    let Q = null;
    const Ie = y.currentChar();
    switch ((F === 7 || F === 8 || F === 11 || F === 9) && (Ie === tt || Ie === an) && O(Ee.INVALID_LINKED_FORMAT, l(), 0), Ie) {
      case "@":
        return y.next(), Q = D(
          w,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        ), w.inLinked = !0, Q;
      case ".":
        return H(y), y.next(), D(
          w,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return H(y), y.next(), D(
          w,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return le(y) ? (Q = D(w, 1, hn(y)), w.braceNest = 0, w.inLinked = !1, Q) : R(y, w) || V(y, w) ? (H(y), Et(y, w)) : S(y, w) ? (H(y), D(w, 11, cn(y))) : G(y, w) ? (H(y), Ie === "{" ? Ge(y, w) || Q : D(w, 10, fn(y))) : (F === 7 && O(Ee.INVALID_LINKED_FORMAT, l(), 0), w.braceNest = 0, w.inLinked = !1, An(y, w));
    }
  }
  function An(y, w) {
    let F = {
      type: 13
      /* TokenTypes.EOF */
    };
    if (w.braceNest > 0)
      return Ge(y, w) || B(w);
    if (w.inLinked)
      return Et(y, w) || B(w);
    switch (y.currentChar()) {
      case "{":
        return Ge(y, w) || B(w);
      case "}":
        return O(Ee.UNBALANCED_CLOSING_BRACE, l(), 0), y.next(), D(
          w,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return Et(y, w) || B(w);
      default: {
        if (le(y))
          return F = D(w, 1, hn(y)), w.braceNest = 0, w.inLinked = !1, F;
        if (Se(y))
          return D(w, 0, hr(y));
        break;
      }
    }
    return F;
  }
  function ft() {
    const { currentType: y, offset: w, startLoc: F, endLoc: Q } = p;
    return p.lastType = y, p.lastOffset = w, p.lastStartLoc = F, p.lastEndLoc = Q, p.offset = o(), p.startLoc = l(), a.currentChar() === In ? D(
      p,
      13
      /* TokenTypes.EOF */
    ) : An(a, p);
  }
  return {
    nextToken: ft,
    currentOffset: o,
    currentPosition: l,
    context: v
  };
}
const Sw = "parser", $w = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function Tw(i, n, r) {
  switch (i) {
    case "\\\\":
      return "\\";
    case "\\'":
      return "'";
    default: {
      const a = parseInt(n || r, 16);
      return a <= 55295 || a >= 57344 ? String.fromCodePoint(a) : "�";
    }
  }
}
function Ow(i = {}) {
  const n = i.location !== !1, { onError: r } = i;
  function a(I, M, W, N, ...U) {
    const R = I.currentPosition();
    if (R.offset += N, R.column += N, r) {
      const S = n ? Da(W, R) : null, V = Zi(M, S, {
        domain: Sw,
        args: U
      });
      r(V);
    }
  }
  function o(I, M, W) {
    const N = { type: I };
    return n && (N.start = M, N.end = M, N.loc = { start: W, end: W }), N;
  }
  function l(I, M, W, N) {
    n && (I.end = M, I.loc && (I.loc.end = W));
  }
  function c(I, M) {
    const W = I.context(), N = o(3, W.offset, W.startLoc);
    return N.value = M, l(N, I.currentOffset(), I.currentPosition()), N;
  }
  function g(I, M) {
    const W = I.context(), { lastOffset: N, lastStartLoc: U } = W, R = o(5, N, U);
    return R.index = parseInt(M, 10), I.nextToken(), l(R, I.currentOffset(), I.currentPosition()), R;
  }
  function p(I, M) {
    const W = I.context(), { lastOffset: N, lastStartLoc: U } = W, R = o(4, N, U);
    return R.key = M, I.nextToken(), l(R, I.currentOffset(), I.currentPosition()), R;
  }
  function v(I, M) {
    const W = I.context(), { lastOffset: N, lastStartLoc: U } = W, R = o(9, N, U);
    return R.value = M.replace($w, Tw), I.nextToken(), l(R, I.currentOffset(), I.currentPosition()), R;
  }
  function $(I) {
    const M = I.nextToken(), W = I.context(), { lastOffset: N, lastStartLoc: U } = W, R = o(8, N, U);
    return M.type !== 11 ? (a(I, Ee.UNEXPECTED_EMPTY_LINKED_MODIFIER, W.lastStartLoc, 0), R.value = "", l(R, N, U), {
      nextConsumeToken: M,
      node: R
    }) : (M.value == null && a(I, Ee.UNEXPECTED_LEXICAL_ANALYSIS, W.lastStartLoc, 0, Gt(M)), R.value = M.value || "", l(R, I.currentOffset(), I.currentPosition()), {
      node: R
    });
  }
  function O(I, M) {
    const W = I.context(), N = o(7, W.offset, W.startLoc);
    return N.value = M, l(N, I.currentOffset(), I.currentPosition()), N;
  }
  function D(I) {
    const M = I.context(), W = o(6, M.offset, M.startLoc);
    let N = I.nextToken();
    if (N.type === 8) {
      const U = $(I);
      W.modifier = U.node, N = U.nextConsumeToken || I.nextToken();
    }
    switch (N.type !== 9 && a(I, Ee.UNEXPECTED_LEXICAL_ANALYSIS, M.lastStartLoc, 0, Gt(N)), N = I.nextToken(), N.type === 2 && (N = I.nextToken()), N.type) {
      case 10:
        N.value == null && a(I, Ee.UNEXPECTED_LEXICAL_ANALYSIS, M.lastStartLoc, 0, Gt(N)), W.key = O(I, N.value || "");
        break;
      case 4:
        N.value == null && a(I, Ee.UNEXPECTED_LEXICAL_ANALYSIS, M.lastStartLoc, 0, Gt(N)), W.key = p(I, N.value || "");
        break;
      case 5:
        N.value == null && a(I, Ee.UNEXPECTED_LEXICAL_ANALYSIS, M.lastStartLoc, 0, Gt(N)), W.key = g(I, N.value || "");
        break;
      case 6:
        N.value == null && a(I, Ee.UNEXPECTED_LEXICAL_ANALYSIS, M.lastStartLoc, 0, Gt(N)), W.key = v(I, N.value || "");
        break;
      default: {
        a(I, Ee.UNEXPECTED_EMPTY_LINKED_KEY, M.lastStartLoc, 0);
        const U = I.context(), R = o(7, U.offset, U.startLoc);
        return R.value = "", l(R, U.offset, U.startLoc), W.key = R, l(W, U.offset, U.startLoc), {
          nextConsumeToken: N,
          node: W
        };
      }
    }
    return l(W, I.currentOffset(), I.currentPosition()), {
      node: W
    };
  }
  function B(I) {
    const M = I.context(), W = M.currentType === 1 ? I.currentOffset() : M.offset, N = M.currentType === 1 ? M.endLoc : M.startLoc, U = o(2, W, N);
    U.items = [];
    let R = null;
    do {
      const G = R || I.nextToken();
      switch (R = null, G.type) {
        case 0:
          G.value == null && a(I, Ee.UNEXPECTED_LEXICAL_ANALYSIS, M.lastStartLoc, 0, Gt(G)), U.items.push(c(I, G.value || ""));
          break;
        case 5:
          G.value == null && a(I, Ee.UNEXPECTED_LEXICAL_ANALYSIS, M.lastStartLoc, 0, Gt(G)), U.items.push(g(I, G.value || ""));
          break;
        case 4:
          G.value == null && a(I, Ee.UNEXPECTED_LEXICAL_ANALYSIS, M.lastStartLoc, 0, Gt(G)), U.items.push(p(I, G.value || ""));
          break;
        case 6:
          G.value == null && a(I, Ee.UNEXPECTED_LEXICAL_ANALYSIS, M.lastStartLoc, 0, Gt(G)), U.items.push(v(I, G.value || ""));
          break;
        case 7: {
          const le = D(I);
          U.items.push(le.node), R = le.nextConsumeToken || null;
          break;
        }
      }
    } while (M.currentType !== 13 && M.currentType !== 1);
    const S = M.currentType === 1 ? M.lastOffset : I.currentOffset(), V = M.currentType === 1 ? M.lastEndLoc : I.currentPosition();
    return l(U, S, V), U;
  }
  function X(I, M, W, N) {
    const U = I.context();
    let R = N.items.length === 0;
    const S = o(1, M, W);
    S.cases = [], S.cases.push(N);
    do {
      const V = B(I);
      R || (R = V.items.length === 0), S.cases.push(V);
    } while (U.currentType !== 13);
    return R && a(I, Ee.MUST_HAVE_MESSAGES_IN_PLURAL, W, 0), l(S, I.currentOffset(), I.currentPosition()), S;
  }
  function Y(I) {
    const M = I.context(), { offset: W, startLoc: N } = M, U = B(I);
    return M.currentType === 13 ? U : X(I, W, N, U);
  }
  function H(I) {
    const M = Rw(I, Be({}, i)), W = M.context(), N = o(0, W.offset, W.startLoc);
    return n && N.loc && (N.loc.source = I), N.body = Y(M), i.onCacheKey && (N.cacheKey = i.onCacheKey(I)), W.currentType !== 13 && a(M, Ee.UNEXPECTED_LEXICAL_ANALYSIS, W.lastStartLoc, 0, I[W.offset] || ""), l(N, M.currentOffset(), M.currentPosition()), N;
  }
  return { parse: H };
}
function Gt(i) {
  if (i.type === 13)
    return "EOF";
  const n = (i.value || "").replace(/\r?\n/gu, "\\n");
  return n.length > 10 ? n.slice(0, 9) + "…" : n;
}
function Aw(i, n = {}) {
  const r = {
    ast: i,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => r, helper: (l) => (r.helpers.add(l), l) };
}
function jl(i, n) {
  for (let r = 0; r < i.length; r++)
    no(i[r], n);
}
function no(i, n) {
  switch (i.type) {
    case 1:
      jl(i.cases, n), n.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      jl(i.items, n);
      break;
    case 6: {
      no(i.key, n), n.helper(
        "linked"
        /* HelperNameMap.LINKED */
      ), n.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    }
    case 5:
      n.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), n.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      n.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), n.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function Cw(i, n = {}) {
  const r = Aw(i);
  r.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), i.body && no(i.body, r);
  const a = r.context();
  i.helpers = Array.from(a.helpers);
}
function Nw(i) {
  const n = i.body;
  return n.type === 2 ? ec(n) : n.cases.forEach((r) => ec(r)), i;
}
function ec(i) {
  if (i.items.length === 1) {
    const n = i.items[0];
    (n.type === 3 || n.type === 9) && (i.static = n.value, delete n.value);
  } else {
    const n = [];
    for (let r = 0; r < i.items.length; r++) {
      const a = i.items[r];
      if (!(a.type === 3 || a.type === 9) || a.value == null)
        break;
      n.push(a.value);
    }
    if (n.length === i.items.length) {
      i.static = to(n);
      for (let r = 0; r < i.items.length; r++) {
        const a = i.items[r];
        (a.type === 3 || a.type === 9) && delete a.value;
      }
    }
  }
}
function or(i) {
  switch (i.t = i.type, i.type) {
    case 0: {
      const n = i;
      or(n.body), n.b = n.body, delete n.body;
      break;
    }
    case 1: {
      const n = i, r = n.cases;
      for (let a = 0; a < r.length; a++)
        or(r[a]);
      n.c = r, delete n.cases;
      break;
    }
    case 2: {
      const n = i, r = n.items;
      for (let a = 0; a < r.length; a++)
        or(r[a]);
      n.i = r, delete n.items, n.static && (n.s = n.static, delete n.static);
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const n = i;
      n.value && (n.v = n.value, delete n.value);
      break;
    }
    case 6: {
      const n = i;
      or(n.key), n.k = n.key, delete n.key, n.modifier && (or(n.modifier), n.m = n.modifier, delete n.modifier);
      break;
    }
    case 5: {
      const n = i;
      n.i = n.index, delete n.index;
      break;
    }
    case 4: {
      const n = i;
      n.k = n.key, delete n.key;
      break;
    }
  }
  delete i.type;
}
function Pw(i, n) {
  const { filename: r, breakLineCode: a, needIndent: o } = n, l = n.location !== !1, c = {
    filename: r,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode: a,
    needIndent: o,
    indentLevel: 0
  };
  l && i.loc && (c.source = i.loc.source);
  const g = () => c;
  function p(Y, H) {
    c.code += Y;
  }
  function v(Y, H = !0) {
    const I = H ? a : "";
    p(o ? I + "  ".repeat(Y) : I);
  }
  function $(Y = !0) {
    const H = ++c.indentLevel;
    Y && v(H);
  }
  function O(Y = !0) {
    const H = --c.indentLevel;
    Y && v(H);
  }
  function D() {
    v(c.indentLevel);
  }
  return {
    context: g,
    push: p,
    indent: $,
    deindent: O,
    newline: D,
    helper: (Y) => `_${Y}`,
    needIndent: () => c.needIndent
  };
}
function xw(i, n) {
  const { helper: r } = i;
  i.push(`${r(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), fr(i, n.key), n.modifier ? (i.push(", "), fr(i, n.modifier), i.push(", _type")) : i.push(", undefined, _type"), i.push(")");
}
function Dw(i, n) {
  const { helper: r, needIndent: a } = i;
  i.push(`${r(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), i.indent(a());
  const o = n.items.length;
  for (let l = 0; l < o && (fr(i, n.items[l]), l !== o - 1); l++)
    i.push(", ");
  i.deindent(a()), i.push("])");
}
function Mw(i, n) {
  const { helper: r, needIndent: a } = i;
  if (n.cases.length > 1) {
    i.push(`${r(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), i.indent(a());
    const o = n.cases.length;
    for (let l = 0; l < o && (fr(i, n.cases[l]), l !== o - 1); l++)
      i.push(", ");
    i.deindent(a()), i.push("])");
  }
}
function Fw(i, n) {
  n.body ? fr(i, n.body) : i.push("null");
}
function fr(i, n) {
  const { helper: r } = i;
  switch (n.type) {
    case 0:
      Fw(i, n);
      break;
    case 1:
      Mw(i, n);
      break;
    case 2:
      Dw(i, n);
      break;
    case 6:
      xw(i, n);
      break;
    case 8:
      i.push(JSON.stringify(n.value), n);
      break;
    case 7:
      i.push(JSON.stringify(n.value), n);
      break;
    case 5:
      i.push(`${r(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${r(
        "list"
        /* HelperNameMap.LIST */
      )}(${n.index}))`, n);
      break;
    case 4:
      i.push(`${r(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${r(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(n.key)}))`, n);
      break;
    case 9:
      i.push(JSON.stringify(n.value), n);
      break;
    case 3:
      i.push(JSON.stringify(n.value), n);
      break;
  }
}
const kw = (i, n = {}) => {
  const r = z(n.mode) ? n.mode : "normal", a = z(n.filename) ? n.filename : "message.intl";
  n.sourceMap;
  const o = n.breakLineCode != null ? n.breakLineCode : r === "arrow" ? ";" : `
`, l = n.needIndent ? n.needIndent : r !== "arrow", c = i.helpers || [], g = Pw(i, {
    filename: a,
    breakLineCode: o,
    needIndent: l
  });
  g.push(r === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), g.indent(l), c.length > 0 && (g.push(`const { ${to(c.map(($) => `${$}: _${$}`), ", ")} } = ctx`), g.newline()), g.push("return "), fr(g, i), g.deindent(l), g.push("}"), delete i.helpers;
  const { code: p, map: v } = g.context();
  return {
    ast: i,
    code: p,
    map: v ? v.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function Kw(i, n = {}) {
  const r = Be({}, n), a = !!r.jit, o = !!r.minify, l = r.optimize == null ? !0 : r.optimize, g = Ow(r).parse(i);
  return a ? (l && Nw(g), o && or(g), { ast: g, code: "" }) : (Cw(g, r), kw(g, r));
}
/*!
  * core-base v10.0.8
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Ww() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (Un().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (Un().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function Yt(i) {
  return me(i) && ro(i) === 0 && (kt(i, "b") || kt(i, "body"));
}
const zc = ["b", "body"];
function Uw(i) {
  return $n(i, zc);
}
const Jc = ["c", "cases"];
function Hw(i) {
  return $n(i, Jc, []);
}
const Qc = ["s", "static"];
function Bw(i) {
  return $n(i, Qc);
}
const Zc = ["i", "items"];
function Gw(i) {
  return $n(i, Zc, []);
}
const jc = ["t", "type"];
function ro(i) {
  return $n(i, jc);
}
const ef = ["v", "value"];
function Fi(i, n) {
  const r = $n(i, ef);
  if (r != null)
    return r;
  throw Wr(n);
}
const tf = ["m", "modifier"];
function Vw(i) {
  return $n(i, tf);
}
const nf = ["k", "key"];
function Yw(i) {
  const n = $n(i, nf);
  if (n)
    return n;
  throw Wr(
    6
    /* NodeTypes.Linked */
  );
}
function $n(i, n, r) {
  for (let a = 0; a < n.length; a++) {
    const o = n[a];
    if (kt(i, o) && i[o] != null)
      return i[o];
  }
  return r;
}
const rf = [
  ...zc,
  ...Jc,
  ...Qc,
  ...Zc,
  ...nf,
  ...tf,
  ...ef,
  ...jc
];
function Wr(i) {
  return new Error(`unhandled node type: ${i}`);
}
function Ia(i) {
  return (r) => qw(r, i);
}
function qw(i, n) {
  const r = Uw(n);
  if (r == null)
    throw Wr(
      0
      /* NodeTypes.Resource */
    );
  if (ro(r) === 1) {
    const l = Hw(r);
    return i.plural(l.reduce((c, g) => [
      ...c,
      tc(i, g)
    ], []));
  } else
    return tc(i, r);
}
function tc(i, n) {
  const r = Bw(n);
  if (r != null)
    return i.type === "text" ? r : i.normalize([r]);
  {
    const a = Gw(n).reduce((o, l) => [...o, Ma(i, l)], []);
    return i.normalize(a);
  }
}
function Ma(i, n) {
  const r = ro(n);
  switch (r) {
    case 3:
      return Fi(n, r);
    case 9:
      return Fi(n, r);
    case 4: {
      const a = n;
      if (kt(a, "k") && a.k)
        return i.interpolate(i.named(a.k));
      if (kt(a, "key") && a.key)
        return i.interpolate(i.named(a.key));
      throw Wr(r);
    }
    case 5: {
      const a = n;
      if (kt(a, "i") && Ke(a.i))
        return i.interpolate(i.list(a.i));
      if (kt(a, "index") && Ke(a.index))
        return i.interpolate(i.list(a.index));
      throw Wr(r);
    }
    case 6: {
      const a = n, o = Vw(a), l = Yw(a);
      return i.linked(Ma(i, l), o ? Ma(i, o) : void 0, i.type);
    }
    case 7:
      return Fi(n, r);
    case 8:
      return Fi(n, r);
    default:
      throw new Error(`unhandled node on format message part: ${r}`);
  }
}
const Xw = (i) => i;
let ki = be();
function zw(i, n = {}) {
  let r = !1;
  const a = n.onError || yw;
  return n.onError = (o) => {
    r = !0, a(o);
  }, { ...Kw(i, n), detectError: r };
}
// @__NO_SIDE_EFFECTS__
function Jw(i, n) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && z(i)) {
    ge(n.warnHtmlMessage) && n.warnHtmlMessage;
    const a = (n.onCacheKey || Xw)(i), o = ki[a];
    if (o)
      return o;
    const { ast: l, detectError: c } = zw(i, {
      ...n,
      location: !1,
      jit: !0
    }), g = Ia(l);
    return c ? g : ki[a] = g;
  } else {
    const r = i.cacheKey;
    if (r) {
      const a = ki[r];
      return a || (ki[r] = Ia(i));
    } else
      return Ia(i);
  }
}
let Ur = null;
function Qw(i) {
  Ur = i;
}
function Zw(i, n, r) {
  Ur && Ur.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: i,
    version: n,
    meta: r
  });
}
const jw = /* @__PURE__ */ e0("function:translate");
function e0(i) {
  return (n) => Ur && Ur.emit(i, n);
}
const on = {
  INVALID_ARGUMENT: _w,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
}, t0 = 24;
function un(i) {
  return Zi(i, null, void 0);
}
function io(i, n) {
  return n.locale != null ? nc(n.locale) : nc(i.locale);
}
let La;
function nc(i) {
  if (z(i))
    return i;
  if (Ae(i)) {
    if (i.resolvedOnce && La != null)
      return La;
    if (i.constructor.name === "Function") {
      const n = i();
      if (gw(n))
        throw un(on.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return La = n;
    } else
      throw un(on.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw un(on.NOT_SUPPORT_LOCALE_TYPE);
}
function n0(i, n, r) {
  return [.../* @__PURE__ */ new Set([
    r,
    ...Me(n) ? n : me(n) ? Object.keys(n) : z(n) ? [n] : [r]
  ])];
}
function sf(i, n, r) {
  const a = z(r) ? r : Hr, o = i;
  o.__localeChainCache || (o.__localeChainCache = /* @__PURE__ */ new Map());
  let l = o.__localeChainCache.get(a);
  if (!l) {
    l = [];
    let c = [r];
    for (; Me(c); )
      c = rc(l, c, n);
    const g = Me(n) || !ue(n) ? n : n.default ? n.default : null;
    c = z(g) ? [g] : g, Me(c) && rc(l, c, !1), o.__localeChainCache.set(a, l);
  }
  return l;
}
function rc(i, n, r) {
  let a = !0;
  for (let o = 0; o < n.length && ge(a); o++) {
    const l = n[o];
    z(l) && (a = r0(i, n[o], r));
  }
  return a;
}
function r0(i, n, r) {
  let a;
  const o = n.split("-");
  do {
    const l = o.join("-");
    a = i0(i, l, r), o.splice(-1, 1);
  } while (o.length && a === !0);
  return a;
}
function i0(i, n, r) {
  let a = !1;
  if (!i.includes(n) && (a = !0, n)) {
    a = n[n.length - 1] !== "!";
    const o = n.replace(/!/g, "");
    i.push(o), (Me(r) || ue(r)) && r[o] && (a = r[o]);
  }
  return a;
}
const Tn = [];
Tn[
  0
  /* States.BEFORE_PATH */
] = {
  w: [
    0
    /* States.BEFORE_PATH */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
Tn[
  1
  /* States.IN_PATH */
] = {
  w: [
    1
    /* States.IN_PATH */
  ],
  ".": [
    2
    /* States.BEFORE_IDENT */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
Tn[
  2
  /* States.BEFORE_IDENT */
] = {
  w: [
    2
    /* States.BEFORE_IDENT */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ]
};
Tn[
  3
  /* States.IN_IDENT */
] = {
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ],
  w: [
    1,
    1
    /* Actions.PUSH */
  ],
  ".": [
    2,
    1
    /* Actions.PUSH */
  ],
  "[": [
    4,
    1
    /* Actions.PUSH */
  ],
  o: [
    7,
    1
    /* Actions.PUSH */
  ]
};
Tn[
  4
  /* States.IN_SUB_PATH */
] = {
  "'": [
    5,
    0
    /* Actions.APPEND */
  ],
  '"': [
    6,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  "]": [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  o: 8,
  l: [
    4,
    0
    /* Actions.APPEND */
  ]
};
Tn[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  "'": [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    5,
    0
    /* Actions.APPEND */
  ]
};
Tn[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  '"': [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const s0 = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function a0(i) {
  return s0.test(i);
}
function o0(i) {
  const n = i.charCodeAt(0), r = i.charCodeAt(i.length - 1);
  return n === r && (n === 34 || n === 39) ? i.slice(1, -1) : i;
}
function u0(i) {
  if (i == null)
    return "o";
  switch (i.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return i;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function l0(i) {
  const n = i.trim();
  return i.charAt(0) === "0" && isNaN(parseInt(i)) ? !1 : a0(n) ? o0(n) : "*" + n;
}
function c0(i) {
  const n = [];
  let r = -1, a = 0, o = 0, l, c, g, p, v, $, O;
  const D = [];
  D[
    0
    /* Actions.APPEND */
  ] = () => {
    c === void 0 ? c = g : c += g;
  }, D[
    1
    /* Actions.PUSH */
  ] = () => {
    c !== void 0 && (n.push(c), c = void 0);
  }, D[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    D[
      0
      /* Actions.APPEND */
    ](), o++;
  }, D[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (o > 0)
      o--, a = 4, D[
        0
        /* Actions.APPEND */
      ]();
    else {
      if (o = 0, c === void 0 || (c = l0(c), c === !1))
        return !1;
      D[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function B() {
    const X = i[r + 1];
    if (a === 5 && X === "'" || a === 6 && X === '"')
      return r++, g = "\\" + X, D[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; a !== null; )
    if (r++, l = i[r], !(l === "\\" && B())) {
      if (p = u0(l), O = Tn[a], v = O[p] || O.l || 8, v === 8 || (a = v[0], v[1] !== void 0 && ($ = D[v[1]], $ && (g = l, $() === !1))))
        return;
      if (a === 7)
        return n;
    }
}
const ic = /* @__PURE__ */ new Map();
function f0(i, n) {
  return me(i) ? i[n] : null;
}
function h0(i, n) {
  if (!me(i))
    return null;
  let r = ic.get(n);
  if (r || (r = c0(n), r && ic.set(n, r)), !r)
    return null;
  const a = r.length;
  let o = i, l = 0;
  for (; l < a; ) {
    const c = r[l];
    if (rf.includes(c) && Yt(o))
      return null;
    const g = o[c];
    if (g === void 0 || Ae(o))
      return null;
    o = g, l++;
  }
  return o;
}
const d0 = "10.0.8", ji = -1, Hr = "en-US", sc = "", ac = (i) => `${i.charAt(0).toLocaleUpperCase()}${i.substr(1)}`;
function g0() {
  return {
    upper: (i, n) => n === "text" && z(i) ? i.toUpperCase() : n === "vnode" && me(i) && "__v_isVNode" in i ? i.children.toUpperCase() : i,
    lower: (i, n) => n === "text" && z(i) ? i.toLowerCase() : n === "vnode" && me(i) && "__v_isVNode" in i ? i.children.toLowerCase() : i,
    capitalize: (i, n) => n === "text" && z(i) ? ac(i) : n === "vnode" && me(i) && "__v_isVNode" in i ? ac(i.children) : i
  };
}
let af;
function p0(i) {
  af = i;
}
let of;
function m0(i) {
  of = i;
}
let uf;
function _0(i) {
  uf = i;
}
let lf = null;
const y0 = /* @__NO_SIDE_EFFECTS__ */ (i) => {
  lf = i;
}, v0 = /* @__NO_SIDE_EFFECTS__ */ () => lf;
let cf = null;
const oc = (i) => {
  cf = i;
}, w0 = () => cf;
let uc = 0;
function E0(i = {}) {
  const n = Ae(i.onWarn) ? i.onWarn : ow, r = z(i.version) ? i.version : d0, a = z(i.locale) || Ae(i.locale) ? i.locale : Hr, o = Ae(a) ? Hr : a, l = Me(i.fallbackLocale) || ue(i.fallbackLocale) || z(i.fallbackLocale) || i.fallbackLocale === !1 ? i.fallbackLocale : o, c = ue(i.messages) ? i.messages : Ra(o), g = ue(i.datetimeFormats) ? i.datetimeFormats : Ra(o), p = ue(i.numberFormats) ? i.numberFormats : Ra(o), v = Be(be(), i.modifiers, g0()), $ = i.pluralRules || be(), O = Ae(i.missing) ? i.missing : null, D = ge(i.missingWarn) || cr(i.missingWarn) ? i.missingWarn : !0, B = ge(i.fallbackWarn) || cr(i.fallbackWarn) ? i.fallbackWarn : !0, X = !!i.fallbackFormat, Y = !!i.unresolving, H = Ae(i.postTranslation) ? i.postTranslation : null, I = ue(i.processor) ? i.processor : null, M = ge(i.warnHtmlMessage) ? i.warnHtmlMessage : !0, W = !!i.escapeParameter, N = Ae(i.messageCompiler) ? i.messageCompiler : af, U = Ae(i.messageResolver) ? i.messageResolver : of || f0, R = Ae(i.localeFallbacker) ? i.localeFallbacker : uf || n0, S = me(i.fallbackContext) ? i.fallbackContext : void 0, V = i, G = me(V.__datetimeFormatters) ? V.__datetimeFormatters : /* @__PURE__ */ new Map(), le = me(V.__numberFormatters) ? V.__numberFormatters : /* @__PURE__ */ new Map(), Se = me(V.__meta) ? V.__meta : {};
  uc++;
  const he = {
    version: r,
    cid: uc,
    locale: a,
    fallbackLocale: l,
    messages: c,
    modifiers: v,
    pluralRules: $,
    missing: O,
    missingWarn: D,
    fallbackWarn: B,
    fallbackFormat: X,
    unresolving: Y,
    postTranslation: H,
    processor: I,
    warnHtmlMessage: M,
    escapeParameter: W,
    messageCompiler: N,
    messageResolver: U,
    localeFallbacker: R,
    fallbackContext: S,
    onWarn: n,
    __meta: Se
  };
  return he.datetimeFormats = g, he.numberFormats = p, he.__datetimeFormatters = G, he.__numberFormatters = le, __INTLIFY_PROD_DEVTOOLS__ && Zw(he, r, Se), he;
}
const Ra = (i) => ({ [i]: be() });
function so(i, n, r, a, o) {
  const { missing: l, onWarn: c } = i;
  if (l !== null) {
    const g = l(i, r, n, o);
    return z(g) ? g : n;
  } else
    return n;
}
function xr(i, n, r) {
  const a = i;
  a.__localeChainCache = /* @__PURE__ */ new Map(), i.localeFallbacker(i, r, n);
}
function b0(i, n) {
  return i === n ? !1 : i.split("-")[0] === n.split("-")[0];
}
function I0(i, n) {
  const r = n.indexOf(i);
  if (r === -1)
    return !1;
  for (let a = r + 1; a < n.length; a++)
    if (b0(i, n[a]))
      return !0;
  return !1;
}
function lc(i, ...n) {
  const { datetimeFormats: r, unresolving: a, fallbackLocale: o, onWarn: l, localeFallbacker: c } = i, { __datetimeFormatters: g } = i, [p, v, $, O] = Fa(...n), D = ge($.missingWarn) ? $.missingWarn : i.missingWarn;
  ge($.fallbackWarn) ? $.fallbackWarn : i.fallbackWarn;
  const B = !!$.part, X = io(i, $), Y = c(
    i,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    o,
    X
  );
  if (!z(p) || p === "")
    return new Intl.DateTimeFormat(X, O).format(v);
  let H = {}, I, M = null;
  const W = "datetime format";
  for (let R = 0; R < Y.length && (I = Y[R], H = r[I] || {}, M = H[p], !ue(M)); R++)
    so(i, p, I, D, W);
  if (!ue(M) || !z(I))
    return a ? ji : p;
  let N = `${I}__${p}`;
  Qi(O) || (N = `${N}__${JSON.stringify(O)}`);
  let U = g.get(N);
  return U || (U = new Intl.DateTimeFormat(I, Be({}, M, O)), g.set(N, U)), B ? U.formatToParts(v) : U.format(v);
}
const ff = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function Fa(...i) {
  const [n, r, a, o] = i, l = be();
  let c = be(), g;
  if (z(n)) {
    const p = n.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!p)
      throw un(on.INVALID_ISO_DATE_ARGUMENT);
    const v = p[3] ? p[3].trim().startsWith("T") ? `${p[1].trim()}${p[3].trim()}` : `${p[1].trim()}T${p[3].trim()}` : p[1].trim();
    g = new Date(v);
    try {
      g.toISOString();
    } catch {
      throw un(on.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (cw(n)) {
    if (isNaN(n.getTime()))
      throw un(on.INVALID_DATE_ARGUMENT);
    g = n;
  } else if (Ke(n))
    g = n;
  else
    throw un(on.INVALID_ARGUMENT);
  return z(r) ? l.key = r : ue(r) && Object.keys(r).forEach((p) => {
    ff.includes(p) ? c[p] = r[p] : l[p] = r[p];
  }), z(a) ? l.locale = a : ue(a) && (c = a), ue(o) && (c = o), [l.key || "", g, l, c];
}
function cc(i, n, r) {
  const a = i;
  for (const o in r) {
    const l = `${n}__${o}`;
    a.__datetimeFormatters.has(l) && a.__datetimeFormatters.delete(l);
  }
}
function fc(i, ...n) {
  const { numberFormats: r, unresolving: a, fallbackLocale: o, onWarn: l, localeFallbacker: c } = i, { __numberFormatters: g } = i, [p, v, $, O] = ka(...n), D = ge($.missingWarn) ? $.missingWarn : i.missingWarn;
  ge($.fallbackWarn) ? $.fallbackWarn : i.fallbackWarn;
  const B = !!$.part, X = io(i, $), Y = c(
    i,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    o,
    X
  );
  if (!z(p) || p === "")
    return new Intl.NumberFormat(X, O).format(v);
  let H = {}, I, M = null;
  const W = "number format";
  for (let R = 0; R < Y.length && (I = Y[R], H = r[I] || {}, M = H[p], !ue(M)); R++)
    so(i, p, I, D, W);
  if (!ue(M) || !z(I))
    return a ? ji : p;
  let N = `${I}__${p}`;
  Qi(O) || (N = `${N}__${JSON.stringify(O)}`);
  let U = g.get(N);
  return U || (U = new Intl.NumberFormat(I, Be({}, M, O)), g.set(N, U)), B ? U.formatToParts(v) : U.format(v);
}
const hf = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function ka(...i) {
  const [n, r, a, o] = i, l = be();
  let c = be();
  if (!Ke(n))
    throw un(on.INVALID_ARGUMENT);
  const g = n;
  return z(r) ? l.key = r : ue(r) && Object.keys(r).forEach((p) => {
    hf.includes(p) ? c[p] = r[p] : l[p] = r[p];
  }), z(a) ? l.locale = a : ue(a) && (c = a), ue(o) && (c = o), [l.key || "", g, l, c];
}
function hc(i, n, r) {
  const a = i;
  for (const o in r) {
    const l = `${n}__${o}`;
    a.__numberFormatters.has(l) && a.__numberFormatters.delete(l);
  }
}
const L0 = (i) => i, R0 = (i) => "", S0 = "text", $0 = (i) => i.length === 0 ? "" : to(i), T0 = pw;
function dc(i, n) {
  return i = Math.abs(i), n === 2 ? i ? i > 1 ? 1 : 0 : 1 : i ? Math.min(i, 2) : 0;
}
function O0(i) {
  const n = Ke(i.pluralIndex) ? i.pluralIndex : -1;
  return i.named && (Ke(i.named.count) || Ke(i.named.n)) ? Ke(i.named.count) ? i.named.count : Ke(i.named.n) ? i.named.n : n : n;
}
function A0(i, n) {
  n.count || (n.count = i), n.n || (n.n = i);
}
function C0(i = {}) {
  const n = i.locale, r = O0(i), a = me(i.pluralRules) && z(n) && Ae(i.pluralRules[n]) ? i.pluralRules[n] : dc, o = me(i.pluralRules) && z(n) && Ae(i.pluralRules[n]) ? dc : void 0, l = (I) => I[a(r, I.length, o)], c = i.list || [], g = (I) => c[I], p = i.named || be();
  Ke(i.pluralIndex) && A0(r, p);
  const v = (I) => p[I];
  function $(I, M) {
    const W = Ae(i.messages) ? i.messages(I, !!M) : me(i.messages) ? i.messages[I] : !1;
    return W || (i.parent ? i.parent.message(I) : R0);
  }
  const O = (I) => i.modifiers ? i.modifiers[I] : L0, D = ue(i.processor) && Ae(i.processor.normalize) ? i.processor.normalize : $0, B = ue(i.processor) && Ae(i.processor.interpolate) ? i.processor.interpolate : T0, X = ue(i.processor) && z(i.processor.type) ? i.processor.type : S0, H = {
    list: g,
    named: v,
    plural: l,
    linked: (I, ...M) => {
      const [W, N] = M;
      let U = "text", R = "";
      M.length === 1 ? me(W) ? (R = W.modifier || R, U = W.type || U) : z(W) && (R = W || R) : M.length === 2 && (z(W) && (R = W || R), z(N) && (U = N || U));
      const S = $(I, !0)(H), V = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        U === "vnode" && Me(S) && R ? S[0] : S
      );
      return R ? O(R)(V, U) : V;
    },
    message: $,
    type: X,
    interpolate: B,
    normalize: D,
    values: Be(be(), c, p)
  };
  return H;
}
const gc = () => "", At = (i) => Ae(i);
function pc(i, ...n) {
  const { fallbackFormat: r, postTranslation: a, unresolving: o, messageCompiler: l, fallbackLocale: c, messages: g } = i, [p, v] = Ka(...n), $ = ge(v.missingWarn) ? v.missingWarn : i.missingWarn, O = ge(v.fallbackWarn) ? v.fallbackWarn : i.fallbackWarn, D = ge(v.escapeParameter) ? v.escapeParameter : i.escapeParameter, B = !!v.resolvedMessage, X = z(v.default) || ge(v.default) ? ge(v.default) ? l ? p : () => p : v.default : r ? l ? p : () => p : null, Y = r || X != null && (z(X) || Ae(X)), H = io(i, v);
  D && N0(v);
  let [I, M, W] = B ? [
    p,
    H,
    g[H] || be()
  ] : df(i, p, H, c, O, $), N = I, U = p;
  if (!B && !(z(N) || Yt(N) || At(N)) && Y && (N = X, U = N), !B && (!(z(N) || Yt(N) || At(N)) || !z(M)))
    return o ? ji : p;
  let R = !1;
  const S = () => {
    R = !0;
  }, V = At(N) ? N : gf(i, p, M, N, U, S);
  if (R)
    return N;
  const G = D0(i, M, W, v), le = C0(G), Se = P0(i, V, le);
  let he = a ? a(Se, p) : Se;
  if (D && z(he) && (he = hw(he)), __INTLIFY_PROD_DEVTOOLS__) {
    const Ye = {
      timestamp: Date.now(),
      key: z(p) ? p : At(N) ? N.key : "",
      locale: M || (At(N) ? N.locale : ""),
      format: z(N) ? N : At(N) ? N.source : "",
      message: he
    };
    Ye.meta = Be({}, i.__meta, /* @__PURE__ */ v0() || {}), jw(Ye);
  }
  return he;
}
function N0(i) {
  Me(i.list) ? i.list = i.list.map((n) => z(n) ? Jl(n) : n) : me(i.named) && Object.keys(i.named).forEach((n) => {
    z(i.named[n]) && (i.named[n] = Jl(i.named[n]));
  });
}
function df(i, n, r, a, o, l) {
  const { messages: c, onWarn: g, messageResolver: p, localeFallbacker: v } = i, $ = v(i, a, r);
  let O = be(), D, B = null;
  const X = "translate";
  for (let Y = 0; Y < $.length && (D = $[Y], O = c[D] || be(), (B = p(O, n)) === null && (B = O[n]), !(z(B) || Yt(B) || At(B))); Y++)
    if (!I0(D, $)) {
      const H = so(
        i,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        n,
        D,
        l,
        X
      );
      H !== n && (B = H);
    }
  return [B, D, O];
}
function gf(i, n, r, a, o, l) {
  const { messageCompiler: c, warnHtmlMessage: g } = i;
  if (At(a)) {
    const v = a;
    return v.locale = v.locale || r, v.key = v.key || n, v;
  }
  if (c == null) {
    const v = () => a;
    return v.locale = r, v.key = n, v;
  }
  const p = c(a, x0(i, r, o, a, g, l));
  return p.locale = r, p.key = n, p.source = a, p;
}
function P0(i, n, r) {
  return n(r);
}
function Ka(...i) {
  const [n, r, a] = i, o = be();
  if (!z(n) && !Ke(n) && !At(n) && !Yt(n))
    throw un(on.INVALID_ARGUMENT);
  const l = Ke(n) ? String(n) : (At(n), n);
  return Ke(r) ? o.plural = r : z(r) ? o.default = r : ue(r) && !Qi(r) ? o.named = r : Me(r) && (o.list = r), Ke(a) ? o.plural = a : z(a) ? o.default = a : ue(a) && Be(o, a), [l, o];
}
function x0(i, n, r, a, o, l) {
  return {
    locale: n,
    key: r,
    warnHtmlMessage: o,
    onError: (c) => {
      throw l && l(c), c;
    },
    onCacheKey: (c) => uw(n, r, c)
  };
}
function D0(i, n, r, a) {
  const { modifiers: o, pluralRules: l, messageResolver: c, fallbackLocale: g, fallbackWarn: p, missingWarn: v, fallbackContext: $ } = i, D = {
    locale: n,
    modifiers: o,
    pluralRules: l,
    messages: (B, X) => {
      let Y = c(r, B);
      if (Y == null && ($ || X)) {
        const [, , H] = df(
          $ || i,
          // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
          B,
          n,
          g,
          p,
          v
        );
        Y = c(H, B);
      }
      if (z(Y) || Yt(Y)) {
        let H = !1;
        const M = gf(i, B, n, Y, B, () => {
          H = !0;
        });
        return H ? gc : M;
      } else return At(Y) ? Y : gc;
    }
  };
  return i.processor && (D.processor = i.processor), a.list && (D.list = a.list), a.named && (D.named = a.named), Ke(a.plural) && (D.pluralIndex = a.plural), D;
}
Ww();
/*!
  * vue-i18n v10.0.8
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const M0 = "10.0.8";
function F0() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (Un().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (Un().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (Un().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (Un().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const nt = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: t0,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: 25,
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: 26,
  NOT_INSTALLED: 27,
  // directive module errors
  REQUIRED_VALUE: 28,
  INVALID_VALUE: 29,
  NOT_INSTALLED_WITH_PROVIDE: 31,
  // unexpected error
  UNEXPECTED_ERROR: 32
};
function ct(i, ...n) {
  return Zi(i, null, void 0);
}
const Wa = /* @__PURE__ */ Sn("__translateVNode"), Ua = /* @__PURE__ */ Sn("__datetimeParts"), Ha = /* @__PURE__ */ Sn("__numberParts"), pf = Sn("__setPluralRules"), mf = /* @__PURE__ */ Sn("__injectWithOption"), Ba = /* @__PURE__ */ Sn("__dispose");
function Br(i) {
  if (!me(i) || Yt(i))
    return i;
  for (const n in i)
    if (kt(i, n))
      if (!n.includes("."))
        me(i[n]) && Br(i[n]);
      else {
        const r = n.split("."), a = r.length - 1;
        let o = i, l = !1;
        for (let c = 0; c < a; c++) {
          if (r[c] === "__proto__")
            throw new Error(`unsafe key: ${r[c]}`);
          if (r[c] in o || (o[r[c]] = be()), !me(o[r[c]])) {
            l = !0;
            break;
          }
          o = o[r[c]];
        }
        if (l || (Yt(o) ? rf.includes(r[a]) || delete i[n] : (o[r[a]] = i[n], delete i[n])), !Yt(o)) {
          const c = o[r[a]];
          me(c) && Br(c);
        }
      }
  return i;
}
function ao(i, n) {
  const { messages: r, __i18n: a, messageResolver: o, flatJson: l } = n, c = ue(r) ? r : Me(a) ? be() : { [i]: be() };
  if (Me(a) && a.forEach((g) => {
    if ("locale" in g && "resource" in g) {
      const { locale: p, resource: v } = g;
      p ? (c[p] = c[p] || be(), Wi(v, c[p])) : Wi(v, c);
    } else
      z(g) && Wi(JSON.parse(g), c);
  }), o == null && l)
    for (const g in c)
      kt(c, g) && Br(c[g]);
  return c;
}
function _f(i) {
  return i.type;
}
function yf(i, n, r) {
  let a = me(n.messages) ? n.messages : be();
  "__i18nGlobal" in r && (a = ao(i.locale.value, {
    messages: a,
    __i18n: r.__i18nGlobal
  }));
  const o = Object.keys(a);
  o.length && o.forEach((l) => {
    i.mergeLocaleMessage(l, a[l]);
  });
  {
    if (me(n.datetimeFormats)) {
      const l = Object.keys(n.datetimeFormats);
      l.length && l.forEach((c) => {
        i.mergeDateTimeFormat(c, n.datetimeFormats[c]);
      });
    }
    if (me(n.numberFormats)) {
      const l = Object.keys(n.numberFormats);
      l.length && l.forEach((c) => {
        i.mergeNumberFormat(c, n.numberFormats[c]);
      });
    }
  }
}
function mc(i) {
  return cv(fv, null, i, 0);
}
const _c = "__INTLIFY_META__", yc = () => [], k0 = () => !1;
let vc = 0;
function wc(i) {
  return (n, r, a, o) => i(r, a, Kr() || void 0, o);
}
const K0 = /* @__NO_SIDE_EFFECTS__ */ () => {
  const i = Kr();
  let n = null;
  return i && (n = _f(i)[_c]) ? { [_c]: n } : null;
};
function oo(i = {}) {
  const { __root: n, __injectWithOption: r } = i, a = n === void 0, o = i.flatJson, l = Gi ? Gr : uv;
  let c = ge(i.inheritLocale) ? i.inheritLocale : !0;
  const g = l(
    // prettier-ignore
    n && c ? n.locale.value : z(i.locale) ? i.locale : Hr
  ), p = l(
    // prettier-ignore
    n && c ? n.fallbackLocale.value : z(i.fallbackLocale) || Me(i.fallbackLocale) || ue(i.fallbackLocale) || i.fallbackLocale === !1 ? i.fallbackLocale : g.value
  ), v = l(ao(g.value, i)), $ = l(ue(i.datetimeFormats) ? i.datetimeFormats : { [g.value]: {} }), O = l(ue(i.numberFormats) ? i.numberFormats : { [g.value]: {} });
  let D = n ? n.missingWarn : ge(i.missingWarn) || cr(i.missingWarn) ? i.missingWarn : !0, B = n ? n.fallbackWarn : ge(i.fallbackWarn) || cr(i.fallbackWarn) ? i.fallbackWarn : !0, X = n ? n.fallbackRoot : ge(i.fallbackRoot) ? i.fallbackRoot : !0, Y = !!i.fallbackFormat, H = Ae(i.missing) ? i.missing : null, I = Ae(i.missing) ? wc(i.missing) : null, M = Ae(i.postTranslation) ? i.postTranslation : null, W = n ? n.warnHtmlMessage : ge(i.warnHtmlMessage) ? i.warnHtmlMessage : !0, N = !!i.escapeParameter;
  const U = n ? n.modifiers : ue(i.modifiers) ? i.modifiers : {};
  let R = i.pluralRules || n && n.pluralRules, S;
  S = (() => {
    a && oc(null);
    const A = {
      version: M0,
      locale: g.value,
      fallbackLocale: p.value,
      messages: v.value,
      modifiers: U,
      pluralRules: R,
      missing: I === null ? void 0 : I,
      missingWarn: D,
      fallbackWarn: B,
      fallbackFormat: Y,
      unresolving: !0,
      postTranslation: M === null ? void 0 : M,
      warnHtmlMessage: W,
      escapeParameter: N,
      messageResolver: i.messageResolver,
      messageCompiler: i.messageCompiler,
      __meta: { framework: "vue" }
    };
    A.datetimeFormats = $.value, A.numberFormats = O.value, A.__datetimeFormatters = ue(S) ? S.__datetimeFormatters : void 0, A.__numberFormatters = ue(S) ? S.__numberFormatters : void 0;
    const K = E0(A);
    return a && oc(K), K;
  })(), xr(S, g.value, p.value);
  function G() {
    return [
      g.value,
      p.value,
      v.value,
      $.value,
      O.value
    ];
  }
  const le = ut({
    get: () => g.value,
    set: (A) => {
      g.value = A, S.locale = g.value;
    }
  }), Se = ut({
    get: () => p.value,
    set: (A) => {
      p.value = A, S.fallbackLocale = p.value, xr(S, g.value, A);
    }
  }), he = ut(() => v.value), Ye = /* @__PURE__ */ ut(() => $.value), vt = /* @__PURE__ */ ut(() => O.value);
  function On() {
    return Ae(M) ? M : null;
  }
  function Ct(A) {
    M = A, S.postTranslation = A;
  }
  function Ce() {
    return H;
  }
  function wt(A) {
    A !== null && (I = wc(A)), H = A, S.missing = I;
  }
  const Nt = (A, K, ve, Le, rt, dn) => {
    G();
    let Wt;
    try {
      __INTLIFY_PROD_DEVTOOLS__, a || (S.fallbackContext = n ? w0() : void 0), Wt = A(S);
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, a || (S.fallbackContext = void 0);
    }
    if (ve !== "translate exists" && // for not `te` (e.g `t`)
    Ke(Wt) && Wt === ji || ve === "translate exists" && !Wt) {
      const [_r, qr] = K();
      return n && X ? Le(n) : rt(_r);
    } else {
      if (dn(Wt))
        return Wt;
      throw ct(nt.UNEXPECTED_RETURN_TYPE);
    }
  };
  function qt(...A) {
    return Nt((K) => Reflect.apply(pc, null, [K, ...A]), () => Ka(...A), "translate", (K) => Reflect.apply(K.t, K, [...A]), (K) => K, (K) => z(K));
  }
  function Qe(...A) {
    const [K, ve, Le] = A;
    if (Le && !me(Le))
      throw ct(nt.INVALID_ARGUMENT);
    return qt(K, ve, Be({ resolvedMessage: !0 }, Le || {}));
  }
  function hr(...A) {
    return Nt((K) => Reflect.apply(lc, null, [K, ...A]), () => Fa(...A), "datetime format", (K) => Reflect.apply(K.d, K, [...A]), () => sc, (K) => z(K));
  }
  function dr(...A) {
    return Nt((K) => Reflect.apply(fc, null, [K, ...A]), () => ka(...A), "number format", (K) => Reflect.apply(K.n, K, [...A]), () => sc, (K) => z(K));
  }
  function gr(A) {
    return A.map((K) => z(K) || Ke(K) || ge(K) ? mc(String(K)) : K);
  }
  const ln = {
    normalize: gr,
    interpolate: (A) => A,
    type: "vnode"
  };
  function pr(...A) {
    return Nt((K) => {
      let ve;
      const Le = K;
      try {
        Le.processor = ln, ve = Reflect.apply(pc, null, [Le, ...A]);
      } finally {
        Le.processor = null;
      }
      return ve;
    }, () => Ka(...A), "translate", (K) => K[Wa](...A), (K) => [mc(K)], (K) => Me(K));
  }
  function Kt(...A) {
    return Nt((K) => Reflect.apply(fc, null, [K, ...A]), () => ka(...A), "number format", (K) => K[Ha](...A), yc, (K) => z(K) || Me(K));
  }
  function zt(...A) {
    return Nt((K) => Reflect.apply(lc, null, [K, ...A]), () => Fa(...A), "datetime format", (K) => K[Ua](...A), yc, (K) => z(K) || Me(K));
  }
  function mr(A) {
    R = A, S.pluralRules = R;
  }
  function cn(A, K) {
    return Nt(() => {
      if (!A)
        return !1;
      const ve = z(K) ? K : g.value, Le = Ge(ve), rt = S.messageResolver(Le, A);
      return Yt(rt) || At(rt) || z(rt);
    }, () => [A], "translate exists", (ve) => Reflect.apply(ve.te, ve, [A, K]), k0, (ve) => ge(ve));
  }
  function fn(A) {
    let K = null;
    const ve = sf(S, p.value, g.value);
    for (let Le = 0; Le < ve.length; Le++) {
      const rt = v.value[ve[Le]] || {}, dn = S.messageResolver(rt, A);
      if (dn != null) {
        K = dn;
        break;
      }
    }
    return K;
  }
  function hn(A) {
    const K = fn(A);
    return K ?? (n ? n.tm(A) || {} : {});
  }
  function Ge(A) {
    return v.value[A] || {};
  }
  function Et(A, K) {
    if (o) {
      const ve = { [A]: K };
      for (const Le in ve)
        kt(ve, Le) && Br(ve[Le]);
      K = ve[A];
    }
    v.value[A] = K, S.messages = v.value;
  }
  function An(A, K) {
    v.value[A] = v.value[A] || {};
    const ve = { [A]: K };
    if (o)
      for (const Le in ve)
        kt(ve, Le) && Br(ve[Le]);
    K = ve[A], Wi(K, v.value[A]), S.messages = v.value;
  }
  function ft(A) {
    return $.value[A] || {};
  }
  function y(A, K) {
    $.value[A] = K, S.datetimeFormats = $.value, cc(S, A, K);
  }
  function w(A, K) {
    $.value[A] = Be($.value[A] || {}, K), S.datetimeFormats = $.value, cc(S, A, K);
  }
  function F(A) {
    return O.value[A] || {};
  }
  function Q(A, K) {
    O.value[A] = K, S.numberFormats = O.value, hc(S, A, K);
  }
  function Ie(A, K) {
    O.value[A] = Be(O.value[A] || {}, K), S.numberFormats = O.value, hc(S, A, K);
  }
  vc++, n && Gi && (kr(n.locale, (A) => {
    c && (g.value = A, S.locale = A, xr(S, g.value, p.value));
  }), kr(n.fallbackLocale, (A) => {
    c && (p.value = A, S.fallbackLocale = A, xr(S, g.value, p.value));
  }));
  const re = {
    id: vc,
    locale: le,
    fallbackLocale: Se,
    get inheritLocale() {
      return c;
    },
    set inheritLocale(A) {
      c = A, A && n && (g.value = n.locale.value, p.value = n.fallbackLocale.value, xr(S, g.value, p.value));
    },
    get availableLocales() {
      return Object.keys(v.value).sort();
    },
    messages: he,
    get modifiers() {
      return U;
    },
    get pluralRules() {
      return R || {};
    },
    get isGlobal() {
      return a;
    },
    get missingWarn() {
      return D;
    },
    set missingWarn(A) {
      D = A, S.missingWarn = D;
    },
    get fallbackWarn() {
      return B;
    },
    set fallbackWarn(A) {
      B = A, S.fallbackWarn = B;
    },
    get fallbackRoot() {
      return X;
    },
    set fallbackRoot(A) {
      X = A;
    },
    get fallbackFormat() {
      return Y;
    },
    set fallbackFormat(A) {
      Y = A, S.fallbackFormat = Y;
    },
    get warnHtmlMessage() {
      return W;
    },
    set warnHtmlMessage(A) {
      W = A, S.warnHtmlMessage = A;
    },
    get escapeParameter() {
      return N;
    },
    set escapeParameter(A) {
      N = A, S.escapeParameter = A;
    },
    t: qt,
    getLocaleMessage: Ge,
    setLocaleMessage: Et,
    mergeLocaleMessage: An,
    getPostTranslationHandler: On,
    setPostTranslationHandler: Ct,
    getMissingHandler: Ce,
    setMissingHandler: wt,
    [pf]: mr
  };
  return re.datetimeFormats = Ye, re.numberFormats = vt, re.rt = Qe, re.te = cn, re.tm = hn, re.d = hr, re.n = dr, re.getDateTimeFormat = ft, re.setDateTimeFormat = y, re.mergeDateTimeFormat = w, re.getNumberFormat = F, re.setNumberFormat = Q, re.mergeNumberFormat = Ie, re[mf] = r, re[Wa] = pr, re[Ua] = zt, re[Ha] = Kt, re;
}
function W0(i) {
  const n = z(i.locale) ? i.locale : Hr, r = z(i.fallbackLocale) || Me(i.fallbackLocale) || ue(i.fallbackLocale) || i.fallbackLocale === !1 ? i.fallbackLocale : n, a = Ae(i.missing) ? i.missing : void 0, o = ge(i.silentTranslationWarn) || cr(i.silentTranslationWarn) ? !i.silentTranslationWarn : !0, l = ge(i.silentFallbackWarn) || cr(i.silentFallbackWarn) ? !i.silentFallbackWarn : !0, c = ge(i.fallbackRoot) ? i.fallbackRoot : !0, g = !!i.formatFallbackMessages, p = ue(i.modifiers) ? i.modifiers : {}, v = i.pluralizationRules, $ = Ae(i.postTranslation) ? i.postTranslation : void 0, O = z(i.warnHtmlInMessage) ? i.warnHtmlInMessage !== "off" : !0, D = !!i.escapeParameterHtml, B = ge(i.sync) ? i.sync : !0;
  let X = i.messages;
  if (ue(i.sharedMessages)) {
    const U = i.sharedMessages;
    X = Object.keys(U).reduce((S, V) => {
      const G = S[V] || (S[V] = {});
      return Be(G, U[V]), S;
    }, X || {});
  }
  const { __i18n: Y, __root: H, __injectWithOption: I } = i, M = i.datetimeFormats, W = i.numberFormats, N = i.flatJson;
  return {
    locale: n,
    fallbackLocale: r,
    messages: X,
    flatJson: N,
    datetimeFormats: M,
    numberFormats: W,
    missing: a,
    missingWarn: o,
    fallbackWarn: l,
    fallbackRoot: c,
    fallbackFormat: g,
    modifiers: p,
    pluralRules: v,
    postTranslation: $,
    warnHtmlMessage: O,
    escapeParameter: D,
    messageResolver: i.messageResolver,
    inheritLocale: B,
    __i18n: Y,
    __root: H,
    __injectWithOption: I
  };
}
function Ga(i = {}) {
  const n = oo(W0(i)), { __extender: r } = i, a = {
    // id
    id: n.id,
    // locale
    get locale() {
      return n.locale.value;
    },
    set locale(o) {
      n.locale.value = o;
    },
    // fallbackLocale
    get fallbackLocale() {
      return n.fallbackLocale.value;
    },
    set fallbackLocale(o) {
      n.fallbackLocale.value = o;
    },
    // messages
    get messages() {
      return n.messages.value;
    },
    // datetimeFormats
    get datetimeFormats() {
      return n.datetimeFormats.value;
    },
    // numberFormats
    get numberFormats() {
      return n.numberFormats.value;
    },
    // availableLocales
    get availableLocales() {
      return n.availableLocales;
    },
    // missing
    get missing() {
      return n.getMissingHandler();
    },
    set missing(o) {
      n.setMissingHandler(o);
    },
    // silentTranslationWarn
    get silentTranslationWarn() {
      return ge(n.missingWarn) ? !n.missingWarn : n.missingWarn;
    },
    set silentTranslationWarn(o) {
      n.missingWarn = ge(o) ? !o : o;
    },
    // silentFallbackWarn
    get silentFallbackWarn() {
      return ge(n.fallbackWarn) ? !n.fallbackWarn : n.fallbackWarn;
    },
    set silentFallbackWarn(o) {
      n.fallbackWarn = ge(o) ? !o : o;
    },
    // modifiers
    get modifiers() {
      return n.modifiers;
    },
    // formatFallbackMessages
    get formatFallbackMessages() {
      return n.fallbackFormat;
    },
    set formatFallbackMessages(o) {
      n.fallbackFormat = o;
    },
    // postTranslation
    get postTranslation() {
      return n.getPostTranslationHandler();
    },
    set postTranslation(o) {
      n.setPostTranslationHandler(o);
    },
    // sync
    get sync() {
      return n.inheritLocale;
    },
    set sync(o) {
      n.inheritLocale = o;
    },
    // warnInHtmlMessage
    get warnHtmlInMessage() {
      return n.warnHtmlMessage ? "warn" : "off";
    },
    set warnHtmlInMessage(o) {
      n.warnHtmlMessage = o !== "off";
    },
    // escapeParameterHtml
    get escapeParameterHtml() {
      return n.escapeParameter;
    },
    set escapeParameterHtml(o) {
      n.escapeParameter = o;
    },
    // pluralizationRules
    get pluralizationRules() {
      return n.pluralRules || {};
    },
    // for internal
    __composer: n,
    // t
    t(...o) {
      return Reflect.apply(n.t, n, [...o]);
    },
    // rt
    rt(...o) {
      return Reflect.apply(n.rt, n, [...o]);
    },
    // tc
    tc(...o) {
      const [l, c, g] = o, p = { plural: 1 };
      let v = null, $ = null;
      if (!z(l))
        throw ct(nt.INVALID_ARGUMENT);
      const O = l;
      return z(c) ? p.locale = c : Ke(c) ? p.plural = c : Me(c) ? v = c : ue(c) && ($ = c), z(g) ? p.locale = g : Me(g) ? v = g : ue(g) && ($ = g), Reflect.apply(n.t, n, [
        O,
        v || $ || {},
        p
      ]);
    },
    // te
    te(o, l) {
      return n.te(o, l);
    },
    // tm
    tm(o) {
      return n.tm(o);
    },
    // getLocaleMessage
    getLocaleMessage(o) {
      return n.getLocaleMessage(o);
    },
    // setLocaleMessage
    setLocaleMessage(o, l) {
      n.setLocaleMessage(o, l);
    },
    // mergeLocaleMessage
    mergeLocaleMessage(o, l) {
      n.mergeLocaleMessage(o, l);
    },
    // d
    d(...o) {
      return Reflect.apply(n.d, n, [...o]);
    },
    // getDateTimeFormat
    getDateTimeFormat(o) {
      return n.getDateTimeFormat(o);
    },
    // setDateTimeFormat
    setDateTimeFormat(o, l) {
      n.setDateTimeFormat(o, l);
    },
    // mergeDateTimeFormat
    mergeDateTimeFormat(o, l) {
      n.mergeDateTimeFormat(o, l);
    },
    // n
    n(...o) {
      return Reflect.apply(n.n, n, [...o]);
    },
    // getNumberFormat
    getNumberFormat(o) {
      return n.getNumberFormat(o);
    },
    // setNumberFormat
    setNumberFormat(o, l) {
      n.setNumberFormat(o, l);
    },
    // mergeNumberFormat
    mergeNumberFormat(o, l) {
      n.mergeNumberFormat(o, l);
    }
  };
  return a.__extender = r, a;
}
function U0(i, n, r) {
  return {
    beforeCreate() {
      const a = Kr();
      if (!a)
        throw ct(nt.UNEXPECTED_ERROR);
      const o = this.$options;
      if (o.i18n) {
        const l = o.i18n;
        if (o.__i18n && (l.__i18n = o.__i18n), l.__root = n, this === this.$root)
          this.$i18n = Ec(i, l);
        else {
          l.__injectWithOption = !0, l.__extender = r.__vueI18nExtend, this.$i18n = Ga(l);
          const c = this.$i18n;
          c.__extender && (c.__disposer = c.__extender(this.$i18n));
        }
      } else if (o.__i18n)
        if (this === this.$root)
          this.$i18n = Ec(i, o);
        else {
          this.$i18n = Ga({
            __i18n: o.__i18n,
            __injectWithOption: !0,
            __extender: r.__vueI18nExtend,
            __root: n
          });
          const l = this.$i18n;
          l.__extender && (l.__disposer = l.__extender(this.$i18n));
        }
      else
        this.$i18n = i;
      o.__i18nGlobal && yf(n, o, o), this.$t = (...l) => this.$i18n.t(...l), this.$rt = (...l) => this.$i18n.rt(...l), this.$tc = (...l) => this.$i18n.tc(...l), this.$te = (l, c) => this.$i18n.te(l, c), this.$d = (...l) => this.$i18n.d(...l), this.$n = (...l) => this.$i18n.n(...l), this.$tm = (l) => this.$i18n.tm(l), r.__setInstance(a, this.$i18n);
    },
    mounted() {
    },
    unmounted() {
      const a = Kr();
      if (!a)
        throw ct(nt.UNEXPECTED_ERROR);
      const o = this.$i18n;
      delete this.$t, delete this.$rt, delete this.$tc, delete this.$te, delete this.$d, delete this.$n, delete this.$tm, o.__disposer && (o.__disposer(), delete o.__disposer, delete o.__extender), r.__deleteInstance(a), delete this.$i18n;
    }
  };
}
function Ec(i, n) {
  i.locale = n.locale || i.locale, i.fallbackLocale = n.fallbackLocale || i.fallbackLocale, i.missing = n.missing || i.missing, i.silentTranslationWarn = n.silentTranslationWarn || i.silentFallbackWarn, i.silentFallbackWarn = n.silentFallbackWarn || i.silentFallbackWarn, i.formatFallbackMessages = n.formatFallbackMessages || i.formatFallbackMessages, i.postTranslation = n.postTranslation || i.postTranslation, i.warnHtmlInMessage = n.warnHtmlInMessage || i.warnHtmlInMessage, i.escapeParameterHtml = n.escapeParameterHtml || i.escapeParameterHtml, i.sync = n.sync || i.sync, i.__composer[pf](n.pluralizationRules || i.pluralizationRules);
  const r = ao(i.locale, {
    messages: n.messages,
    __i18n: n.__i18n
  });
  return Object.keys(r).forEach((a) => i.mergeLocaleMessage(a, r[a])), n.datetimeFormats && Object.keys(n.datetimeFormats).forEach((a) => i.mergeDateTimeFormat(a, n.datetimeFormats[a])), n.numberFormats && Object.keys(n.numberFormats).forEach((a) => i.mergeNumberFormat(a, n.numberFormats[a])), i;
}
const uo = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (i) => i === "parent" || i === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function H0({ slots: i }, n) {
  return n.length === 1 && n[0] === "default" ? (i.default ? i.default() : []).reduce((a, o) => [
    ...a,
    // prettier-ignore
    ...o.type === xc ? o.children : [o]
  ], []) : n.reduce((r, a) => {
    const o = i[a];
    return o && (r[a] = o()), r;
  }, be());
}
function vf() {
  return xc;
}
const B0 = /* @__PURE__ */ Qa({
  /* eslint-disable */
  name: "i18n-t",
  props: Be({
    keypath: {
      type: String,
      required: !0
    },
    plural: {
      type: [Number, String],
      validator: (i) => Ke(i) || !isNaN(i)
    }
  }, uo),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(i, n) {
    const { slots: r, attrs: a } = n, o = i.i18n || lo({
      useScope: i.scope,
      __useComponent: !0
    });
    return () => {
      const l = Object.keys(r).filter((O) => O !== "_"), c = be();
      i.locale && (c.locale = i.locale), i.plural !== void 0 && (c.plural = z(i.plural) ? +i.plural : i.plural);
      const g = H0(n, l), p = o[Wa](i.keypath, g, c), v = Be(be(), a), $ = z(i.tag) || me(i.tag) ? i.tag : vf();
      return Pc($, v, p);
    };
  }
}), bc = B0;
function G0(i) {
  return Me(i) && !z(i[0]);
}
function wf(i, n, r, a) {
  const { slots: o, attrs: l } = n;
  return () => {
    const c = { part: !0 };
    let g = be();
    i.locale && (c.locale = i.locale), z(i.format) ? c.key = i.format : me(i.format) && (z(i.format.key) && (c.key = i.format.key), g = Object.keys(i.format).reduce((D, B) => r.includes(B) ? Be(be(), D, { [B]: i.format[B] }) : D, be()));
    const p = a(i.value, c, g);
    let v = [c.key];
    Me(p) ? v = p.map((D, B) => {
      const X = o[D.type], Y = X ? X({ [D.type]: D.value, index: B, parts: p }) : [D.value];
      return G0(Y) && (Y[0].key = `${D.type}-${B}`), Y;
    }) : z(p) && (v = [p]);
    const $ = Be(be(), l), O = z(i.tag) || me(i.tag) ? i.tag : vf();
    return Pc(O, $, v);
  };
}
const V0 = /* @__PURE__ */ Qa({
  /* eslint-disable */
  name: "i18n-n",
  props: Be({
    value: {
      type: Number,
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, uo),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(i, n) {
    const r = i.i18n || lo({
      useScope: i.scope,
      __useComponent: !0
    });
    return wf(i, n, hf, (...a) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      r[Ha](...a)
    ));
  }
}), Ic = V0, Y0 = /* @__PURE__ */ Qa({
  /* eslint-disable */
  name: "i18n-d",
  props: Be({
    value: {
      type: [Number, Date],
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, uo),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(i, n) {
    const r = i.i18n || lo({
      useScope: i.scope,
      __useComponent: !0
    });
    return wf(i, n, ff, (...a) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      r[Ua](...a)
    ));
  }
}), Lc = Y0;
function q0(i, n) {
  const r = i;
  if (i.mode === "composition")
    return r.__getInstance(n) || i.global;
  {
    const a = r.__getInstance(n);
    return a != null ? a.__composer : i.global.__composer;
  }
}
function X0(i) {
  const n = (c) => {
    const { instance: g, value: p } = c;
    if (!g || !g.$)
      throw ct(nt.UNEXPECTED_ERROR);
    const v = q0(i, g.$), $ = Rc(p);
    return [
      Reflect.apply(v.t, v, [...Sc($)]),
      v
    ];
  };
  return {
    created: (c, g) => {
      const [p, v] = n(g);
      Gi && i.global === v && (c.__i18nWatcher = kr(v.locale, () => {
        g.instance && g.instance.$forceUpdate();
      })), c.__composer = v, c.textContent = p;
    },
    unmounted: (c) => {
      Gi && c.__i18nWatcher && (c.__i18nWatcher(), c.__i18nWatcher = void 0, delete c.__i18nWatcher), c.__composer && (c.__composer = void 0, delete c.__composer);
    },
    beforeUpdate: (c, { value: g }) => {
      if (c.__composer) {
        const p = c.__composer, v = Rc(g);
        c.textContent = Reflect.apply(p.t, p, [
          ...Sc(v)
        ]);
      }
    },
    getSSRProps: (c) => {
      const [g] = n(c);
      return { textContent: g };
    }
  };
}
function Rc(i) {
  if (z(i))
    return { path: i };
  if (ue(i)) {
    if (!("path" in i))
      throw ct(nt.REQUIRED_VALUE, "path");
    return i;
  } else
    throw ct(nt.INVALID_VALUE);
}
function Sc(i) {
  const { path: n, locale: r, args: a, choice: o, plural: l } = i, c = {}, g = a || {};
  return z(r) && (c.locale = r), Ke(o) && (c.plural = o), Ke(l) && (c.plural = l), [n, g, c];
}
function z0(i, n, ...r) {
  const a = ue(r[0]) ? r[0] : {};
  (ge(a.globalInstall) ? a.globalInstall : !0) && ([bc.name, "I18nT"].forEach((l) => i.component(l, bc)), [Ic.name, "I18nN"].forEach((l) => i.component(l, Ic)), [Lc.name, "I18nD"].forEach((l) => i.component(l, Lc))), i.directive("t", X0(n));
}
const J0 = /* @__PURE__ */ Sn("global-vue-i18n");
function Q0(i = {}, n) {
  const r = __VUE_I18N_LEGACY_API__ && ge(i.legacy) ? i.legacy : __VUE_I18N_LEGACY_API__, a = ge(i.globalInjection) ? i.globalInjection : !0, o = /* @__PURE__ */ new Map(), [l, c] = Z0(i, r), g = /* @__PURE__ */ Sn("");
  function p(D) {
    return o.get(D) || null;
  }
  function v(D, B) {
    o.set(D, B);
  }
  function $(D) {
    o.delete(D);
  }
  const O = {
    // mode
    get mode() {
      return __VUE_I18N_LEGACY_API__ && r ? "legacy" : "composition";
    },
    // install plugin
    async install(D, ...B) {
      if (D.__VUE_I18N_SYMBOL__ = g, D.provide(D.__VUE_I18N_SYMBOL__, O), ue(B[0])) {
        const H = B[0];
        O.__composerExtend = H.__composerExtend, O.__vueI18nExtend = H.__vueI18nExtend;
      }
      let X = null;
      !r && a && (X = aE(D, O.global)), __VUE_I18N_FULL_INSTALL__ && z0(D, O, ...B), __VUE_I18N_LEGACY_API__ && r && D.mixin(U0(c, c.__composer, O));
      const Y = D.unmount;
      D.unmount = () => {
        X && X(), O.dispose(), Y();
      };
    },
    // global accessor
    get global() {
      return c;
    },
    dispose() {
      l.stop();
    },
    // @internal
    __instances: o,
    // @internal
    __getInstance: p,
    // @internal
    __setInstance: v,
    // @internal
    __deleteInstance: $
  };
  return O;
}
function lo(i = {}) {
  const n = Kr();
  if (n == null)
    throw ct(nt.MUST_BE_CALL_SETUP_TOP);
  if (!n.isCE && n.appContext.app != null && !n.appContext.app.__VUE_I18N_SYMBOL__)
    throw ct(nt.NOT_INSTALLED);
  const r = j0(n), a = tE(r), o = _f(n), l = eE(i, o);
  if (l === "global")
    return yf(a, i, o), a;
  if (l === "parent") {
    let p = nE(r, n, i.__useComponent);
    return p == null && (p = a), p;
  }
  const c = r;
  let g = c.__getInstance(n);
  if (g == null) {
    const p = Be({}, i);
    "__i18n" in o && (p.__i18n = o.__i18n), a && (p.__root = a), g = oo(p), c.__composerExtend && (g[Ba] = c.__composerExtend(g)), iE(c, n, g), c.__setInstance(n, g);
  }
  return g;
}
function Z0(i, n, r) {
  const a = Ja(), o = __VUE_I18N_LEGACY_API__ && n ? a.run(() => Ga(i)) : a.run(() => oo(i));
  if (o == null)
    throw ct(nt.UNEXPECTED_ERROR);
  return [a, o];
}
function j0(i) {
  const n = lt(i.isCE ? J0 : i.appContext.app.__VUE_I18N_SYMBOL__);
  if (!n)
    throw ct(i.isCE ? nt.NOT_INSTALLED_WITH_PROVIDE : nt.UNEXPECTED_ERROR);
  return n;
}
function eE(i, n) {
  return Qi(i) ? "__i18n" in n ? "local" : "global" : i.useScope ? i.useScope : "local";
}
function tE(i) {
  return i.mode === "composition" ? i.global : i.global.__composer;
}
function nE(i, n, r = !1) {
  let a = null;
  const o = n.root;
  let l = rE(n, r);
  for (; l != null; ) {
    const c = i;
    if (i.mode === "composition")
      a = c.__getInstance(l);
    else if (__VUE_I18N_LEGACY_API__) {
      const g = c.__getInstance(l);
      g != null && (a = g.__composer, r && a && !a[mf] && (a = null));
    }
    if (a != null || o === l)
      break;
    l = l.parent;
  }
  return a;
}
function rE(i, n = !1) {
  return i == null ? null : n && i.vnode.ctx || i.parent;
}
function iE(i, n, r) {
  lv(() => {
  }, n), qi(() => {
    const a = r;
    i.__deleteInstance(n);
    const o = a[Ba];
    o && (o(), delete a[Ba]);
  }, n);
}
const sE = [
  "locale",
  "fallbackLocale",
  "availableLocales"
], $c = ["t", "rt", "d", "n", "tm", "te"];
function aE(i, n) {
  const r = /* @__PURE__ */ Object.create(null);
  return sE.forEach((o) => {
    const l = Object.getOwnPropertyDescriptor(n, o);
    if (!l)
      throw ct(nt.UNEXPECTED_ERROR);
    const c = lr(l.value) ? {
      get() {
        return l.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(g) {
        l.value.value = g;
      }
    } : {
      get() {
        return l.get && l.get();
      }
    };
    Object.defineProperty(r, o, c);
  }), i.config.globalProperties.$i18n = r, $c.forEach((o) => {
    const l = Object.getOwnPropertyDescriptor(n, o);
    if (!l || !l.value)
      throw ct(nt.UNEXPECTED_ERROR);
    Object.defineProperty(i.config.globalProperties, `$${o}`, l);
  }), () => {
    delete i.config.globalProperties.$i18n, $c.forEach((o) => {
      delete i.config.globalProperties[`$${o}`];
    });
  };
}
F0();
p0(Jw);
m0(h0);
_0(sf);
if (__INTLIFY_PROD_DEVTOOLS__) {
  const i = Un();
  i.__INTLIFY__ = !0, Qw(i.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
const ur = /* @__PURE__ */ new Map();
async function Va(i, n, r, a) {
  const o = Object.entries(a).map(
    ([l, c]) => Ef(i, n, r, l, c)
  );
  return await Promise.all(o);
}
async function Ef(i, n, r, a, o) {
  const l = [], c = `.${n}.json`, g = `.${r}.json`;
  for (var [p, v] of Object.entries(o))
    p.endsWith(c) ? l.push(
      Ya(i, n, a, p, v)
    ) : p.endsWith(g) && l.push(
      Ya(i, r, a, p, v)
    );
  return await Promise.all(l);
}
function Ya(i, n, r, a, o) {
  if (a = `${r}:${n}:${a}`, ur.has(a))
    return ur.get(a);
  const l = (async () => {
    const c = await o();
    c && i.global.mergeLocaleMessage(n, c);
  })();
  return ur[a] = l, l;
}
async function oE(i, n, r) {
  const a = `:${r}:${path}`;
  if (ur.has(a))
    return ur.get(a);
  let o = null;
  try {
    const l = await fetch(n);
    l.ok && (o = await l.json());
  } catch (l) {
    console.warn("Failed to load i18n file", n, l);
  }
  o && i.global.mergeLocaleMessage(r, o), ur.set(a, promise);
}
const CE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loadFromLoader: Ya,
  loadLocaleFromLoaders: Ef,
  loadLocales: Va,
  loadOne: oE
}, Symbol.toStringTag, { value: "Module" })), NE = {
  ox: /* @__PURE__ */ Object.assign({ "../locale/vue.de.json": () => import("./vue.de.js").then((i) => i.default), "../locale/vue.en.json": () => import("./vue.en.js").then((i) => i.default), "../locale/vue.es.json": () => import("./vue.es.js").then((i) => i.default), "../locale/vue.fr.json": () => import("./vue.fr.js").then((i) => i.default), "../locale/vue.nl.json": () => import("./vue.nl.js").then((i) => i.default) })
};
function uE() {
  const n = (yv("lang", ",") || navigator.languages || ["en"]).map(
    (r) => r.toLowerCase().replace(/[_-](\w+)/, "")
  ).find((r) => r in vv.locales);
  return Q0({
    legacy: !1,
    globalInjection: !0,
    fallbackLocale: "en",
    locale: n
  });
}
async function PE({ composer: i = null } = {}) {
  const n = document.querySelectorAll("script[locale]:not([data-loaded])");
  i ?? (i = Hn.global);
  const r = [...n].map(async (a) => {
    const o = a.getAttribute("locale");
    if (o != i.locale.value && o != i.fallbackLocale.value) {
      console.warn(`Locale ${o} is not the current one, nor the fallback. skip`);
      return;
    }
    const l = a.getAttribute("src");
    if (!l) {
      console.warn("No `src` attribute provided on element - skip. Element: ", a);
      return;
    }
    const c = await fetch(l);
    try {
      const g = await c.json();
      i.mergeLocaleMessage(o, g);
    } catch (g) {
      throw a.dataset.loaded = "error", g;
    }
    a.dataset.loaded = "ok";
  });
  await Promise.all(r);
}
const Hn = uE();
function co(i) {
  return i instanceof Bi && (i = i.use), (i == null ? void 0 : i.prototype) instanceof Bn || i.meta ? `${i.meta.app}.${i.meta.model}` : Array.isArray(i) ? co(i[0]) + (i[1] ? `.${i[1]}` : "") : i || "";
}
function qa(i, ...n) {
  return Hn.global.t(co(i), ...n);
}
function lE(i, ...n) {
  return Hn.global.te(co(i), ...n);
}
function xE({ locales: i, composer: n }) {
  n ?? (n = Hn.global), i && (Va(Hn, n.locale.value, n.fallbackLocale.value, i), kr(n.locale, (o) => {
    Va(Hn, o, n.fallbackLocale.value, i);
  }));
  function r(o) {
    n.locale.value = o;
  }
  const a = n.locale;
  return { t: qa, te: lE, i18n: Hn, setLocale: r, locale: a };
}
class Yr {
  constructor(n = { app: "" }) {
    Object.assign(this, n);
  }
  /** Return a model instance's title */
  getTitle(n) {
    return this.title ? this.title instanceof Function ? this.title(n) : `${n[this.title]}` : null;
  }
  /** Return API url based on id and path.
   *
   * If `abs` is provided, prepend api endpoint url.
   */
  getUrl({ path: n = null, id: r = null, absolute: a = !1 }) {
    let o = this.url;
    if (!o)
      throw Error("No url declared on this model.");
    return r && (o += `/${r}/`), n && (o += n), a && (o = `${window.oxylus.apiUrl}/${o}`), `${o}/`.replaceAll("//", "/");
  }
  /** Return permission codename */
  getPermission(n) {
    return `${this.app}.${n}_${this.model}`;
  }
  /** Return translated verbose name of model */
  get verbose_name() {
    return qa(`${this.app}.${this.model}`);
  }
  /** Return translated verbose name of model */
  get verbose_name_plural() {
    return qa(`${this.app}.${this.model}`, 2);
  }
}
class Bn extends aw {
  static fields() {
    return { id: this.attr(null) };
  }
  /** Get model's Meta class */
  get $meta() {
    return this.constructor.meta;
  }
  /** Get instance's title based on Meta class. */
  get $title() {
    return this.$meta.getTitle(this);
  }
  /** Get API's model instance url */
  $url(n) {
    return this.$meta.getUrl({ path: n, id: this.id });
  }
}
/**
 * This static attribute SHOULD be provided by the subclass of this model.
 *
 * It specifies various metadata which are used to provide information to
 * user, API, check permissions, etc.
 */
T(Bn, "meta", new Yr({
  app: "ox_core"
})), T(Bn, "config", {
  axiosApi: { dataKey: "results" }
});
class Ui extends Bn {
  constructor() {
    super(...arguments);
    T(this, "$permissions");
  }
  static fields() {
    return {
      ...super.fields(),
      app: this.string(""),
      model: this.string(""),
      app_verbose: this.string(""),
      model_verbose: this.string(""),
      $permissions: this.hasMany(Rn, "content_type")
    };
  }
  /** Label used as django identifier */
  get label() {
    return `${this.app}.${this.model}`;
  }
  /**
  * Return Permission for the provided action.
  * @param {string} action Permission's action to match.
  * @return Permission or null if not found
  */
  getPermission(r) {
    const a = this.$permissions.filter((o) => o.action == r);
    return a && a[0] || null;
  }
}
T(Ui, "entity", "contentTypes"), T(Ui, "meta", new Yr({
  app: "contenttypes",
  model: "content_type",
  url: "ox/core/content_type/",
  title: "label"
})), T(Ui, "config", {});
class Rn extends Bn {
  static fields() {
    return {
      ...super.fields(),
      name: this.string(""),
      label: this.string(""),
      codename: this.string(""),
      content_type: this.attr(null),
      $content_type: this.belongsTo(Ui, "content_type")
    };
  }
  /**
   * Return permission as codename.
   *
   * Perm can be:
   * - a string
   * - a list of [ClassType, actionString]
   */
  // TODO: correct typescript type
  static getCodename(n) {
    if (Array.isArray(n)) {
      const [r, a] = n;
      return `${hv(r).meta.app}.${a}_${r.meta.model}`;
    }
    return n;
  }
  /** Action based on codename */
  get action() {
    return this.codename.split("_")[0];
  }
}
T(Rn, "entity", "permissions"), T(Rn, "meta", new Yr({
  app: "auth",
  model: "permission",
  url: "ox/core/permission/",
  title: "label"
})), T(Rn, "config", {});
class Xa extends Bn {
  static fields() {
    return {
      ...super.fields(),
      name: this.string(""),
      permissions: this.attr([]),
      $permissions: this.hasManyBy(Rn, "permissions")
    };
  }
}
T(Xa, "entity", "groups"), T(Xa, "meta", new Yr({
  app: "auth",
  model: "group",
  url: "ox/core/group/",
  icon: "mdi-account-multiple",
  title: "name"
}));
class Tc extends Bn {
  static fields() {
    return {
      ...super.fields(),
      username: this.string(""),
      last_name: this.string(""),
      first_name: this.string(""),
      email: this.string(""),
      is_superuser: this.boolean(!1),
      all_permissions: this.attr([]),
      permissions: this.attr([]),
      groups: this.attr([]),
      $permissions: this.hasManyBy(Rn, "permissions"),
      $groups: this.hasManyBy(Xa, "groups")
    };
  }
  /**
   * Return `true` if the user has the provided permission.
   *
   * Permission is checked against `all_permissions` field.
   *
   * It can be ({@link Permission.getCodename}):
   * - a string: permission codename
   * - a list of: `[ModelClass, "action string"]`
   *
   * @param perm - Check for this permission ({@link Permission.getCodename} value)
   * @param obj - a `django-caps` `Owned` object: if provided and the object has an `access`, check for object permissions
   * @return whether user has permission or not.
   */
  can(n, r) {
    var o;
    n = Rn.getCodename(n);
    const a = ((o = this.all_permissions) == null ? void 0 : o.includes(n)) || !1;
    return a && r && r.access ? n in r.access.grants : a;
  }
  /**
   * Return `true` if the user has any of the provided permissions.
   *
   * Value is checked against `all_permissions` field.
   */
  canAny(n) {
    var r;
    return ((r = this.all_permissions) == null ? void 0 : r.some((a) => n.includes(Rn.getCodename(a)))) || !1;
  }
}
T(Tc, "entity", "users"), T(Tc, "meta", new Yr({
  app: "auth",
  model: "user",
  url: "ox/core/user/",
  icon: "mdi-account",
  title: "username"
}));
const DE = ["list", "detail", "create", "dashboard", "workflow", "report", "tool", ""], es = Symbol("OxRouter"), Vi = Symbol("OxPanel"), Yi = Symbol("OxView"), za = Symbol("OxSection");
function ME() {
  const i = Wn(/* @__PURE__ */ new Map()), n = Wn(/* @__PURE__ */ new Map()), r = l(window.location), a = Wn(r);
  Wn({});
  const o = Gr(!1);
  function l(R) {
    const S = new URLSearchParams(R.search);
    let V = S.get("id") ?? void 0;
    return V && V.match(/^[0-9]+$/) && (V = parseInt(V)), {
      panel: S.get("p") ?? void 0,
      view: S.get("v") ?? void 0,
      section: S.get("s") ?? void 0,
      value: V
    };
  }
  function c(R) {
    const S = new URLSearchParams();
    return R.panel && S.set("p", R.panel), R.view && S.set("v", R.view), R.section && S.set("s", R.section), R.value != null && S.set("id", String(R.value)), S.toString();
  }
  async function g(R, S, V) {
    const G = { from: R, to: S, reason: V }, le = [
      "global",
      R.panel && `${R.panel}`,
      R.view && `${R.panel}:${R.view}`,
      R.section && `${R.panel}:${R.view}:${R.section}`
    ].filter(Boolean);
    for (const Se of le) {
      const he = n.get(Se);
      if (he)
        for (const Ye of he) {
          const vt = await Ye(G);
          if (vt !== !0)
            return vt === !1 ? !1 : vt;
        }
    }
    return S;
  }
  function p() {
    return new Proxy({}, {
      get(R, S) {
        return a[S];
      },
      async set(R, S, V) {
        if (o.value) return !0;
        o.value = !0;
        try {
          await $({ [S]: V });
        } finally {
          o.value = !1;
        }
        return !0;
      },
      ownKeys() {
        return Reflect.ownKeys(a);
      },
      getOwnPropertyDescriptor() {
        return { enumerable: !0, configurable: !0 };
      }
    });
  }
  const v = dv(p());
  async function $(R, S = {}) {
    var he, Ye;
    const V = a, G = { ...V, ...R };
    if (!G.panel)
      return;
    G.view ?? (G.view = (he = Y(G.panel)) == null ? void 0 : he.index);
    const le = H(G.panel, G.view);
    (V.panel && V.panel != G.panel || ((Ye = W.value) == null ? void 0 : Ye.category) == "detail" && le.category != "detail") && (G.value = null);
    const Se = await g(V, G, "programmatic");
    Se !== !1 && (Se !== G ? await $(Se, S) : await O(G, S));
  }
  async function O(R, S = {}) {
    const V = window.location.pathname, G = c(R);
    if (R.href && R.href !== V) {
      window.location.href = R.href + "?" + G;
      return;
    }
    const le = S.replace ? "replaceState" : "pushState";
    window.history[le]({}, "", G ? `?${G}` : window.location.pathname), Object.assign(a, R);
  }
  function D() {
    const R = v, S = l(window.location);
    g(R, S, "popstate").then((V) => {
      if (V === !1) {
        const G = c(R);
        window.history.replaceState({}, "", G ? `?${G}` : window.location.pathname);
      } else
        Object.assign(a, V);
    });
  }
  window.addEventListener("popstate", D);
  function B(R) {
    return R.views || (R.views = Wn(/* @__PURE__ */ new Map())), i.set(R.name, R), (!a.panel || a.panel == R.name) && $({ panel: R.name, view: a.view || R.index }), () => i.delete(R.name);
  }
  function X(R, S) {
    return n.has(R) || n.set(R, /* @__PURE__ */ new Set()), n.get(R).add(S), () => n.get(R).delete(S);
  }
  function Y(R) {
    return i.get(R || a.panel);
  }
  function H(R, S) {
    var V, G;
    return (G = (V = Y(R)) == null ? void 0 : V.views) == null ? void 0 : G.get(S || a.view);
  }
  function I(R, S, V) {
    var G, le;
    return (le = (G = H(R, S)) == null ? void 0 : G.sections) == null ? void 0 : le.get(V || a.section);
  }
  const M = ut(() => Y(a.panel)), W = ut(() => {
    var R;
    return (R = M.value) == null ? void 0 : R.views.get(a.view);
  }), N = ut(() => {
    var R;
    return (R = W.value) == null ? void 0 : R.sections.get(a.section);
  }), U = {
    location: v,
    panels: i,
    panel: M,
    view: W,
    section: N,
    go: $,
    addGuard: X,
    registerPanel: B,
    getPanel: Y,
    getView: H,
    getSection: I
  };
  return Xi(es, U), U;
}
function FE(i, n) {
  const r = lt(es);
  if (!r)
    throw new Error("Router not provided");
  if (!n) {
    const { panel: o } = lt(Vi, {});
    if (!o)
      throw new Error("useGuard must be provided a scope or be called from within a panel.");
    const { view: l } = lt(Yi, {}), { section: c } = lt(za, {});
    n = o.name, l && (n += ":" + l.name), c && (n += ":" + c.name);
  }
  const a = r.addGuard(n, i);
  return qi(() => a()), { unregister: a };
}
function kE() {
  return lt(es);
}
function KE(i) {
  const n = lt(Vi, null);
  if (n || !i)
    return n;
  const r = lt(es);
  if (!r)
    throw new Error("Router not provided");
  i = {
    editions: {},
    ...i
  };
  const a = r.registerPanel(i);
  qi(a);
  const o = ut(() => r.location.panel === i.name), l = {
    router: r,
    active: o,
    panel: i,
    scope: i.name,
    activeView: ut(() => o.value && i.views.size ? i.views.get(r.location.view) : null)
  };
  return Xi(Vi, l), l;
}
function WE(i) {
  const n = lt(Yi, null);
  if (n || !i)
    return n;
  const { panel: r, ...a } = lt(Vi);
  i = { ...i }, i.name ?? (i.name = `view-${Dc()}`), i.sections = Wn(/* @__PURE__ */ new Map()), r.views.set(i.name, i), qi(() => views.delete(i.name));
  const o = ut(() => {
    var c;
    return ((c = a.activeView) == null ? void 0 : c.name) == i.name;
  }), l = {
    ...a,
    panel: r,
    active: o,
    view: i,
    scope: `${r.name}:${i.name}`,
    activeSection: ut(() => o.value && i.sections.get(router.location.section))
  };
  return Xi(Yi, l), l;
}
function UE(i) {
  const n = lt(za, null);
  if (n || !i)
    return n;
  const { view: r, active: a, ...o } = lt(Yi);
  i.name ?? (i.name = `section-${Dc()}`), r.sections.set(i.name, i);
  const l = {
    ...o,
    view: r,
    scope: `${o.panel.name}:${r.name}:${i.name}`,
    section: i,
    active: ut(() => a.value && router.location.section == i.name)
  };
  return Xi(za, l), l;
}
export {
  De as $,
  co as A,
  jv as B,
  Ui as C,
  lE as D,
  DE as E,
  es as F,
  Xa as G,
  ew as H,
  Vi as I,
  za as J,
  ME as K,
  FE as L,
  Yr as M,
  kE as N,
  WE as O,
  Rn as P,
  UE as Q,
  Bi as R,
  hE as S,
  Dc as T,
  Tc as U,
  Yi as V,
  Mc as W,
  yv as X,
  ya as Y,
  Bl as Z,
  EE as _,
  He as a,
  gE as a0,
  mv as a1,
  yE as a2,
  vE as a3,
  wE as a4,
  tw as b,
  Vt as c,
  RE as d,
  Xl as e,
  Bn as f,
  IE as g,
  PE as h,
  Hn as i,
  xE as j,
  LE as k,
  pv as l,
  SE as m,
  vv as n,
  dE as o,
  pE as p,
  mE as q,
  bE as r,
  Ji as s,
  qa as t,
  Xv as u,
  _E as v,
  KE as w,
  CE as x,
  NE as y,
  uE as z
};
//# sourceMappingURL=router.js.map

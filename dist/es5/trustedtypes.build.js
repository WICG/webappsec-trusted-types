(function(){/*

 Copyright 2017 Google Inc. All Rights Reserved.

 Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.

  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/
function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}var m="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,e){a!=Array.prototype&&a!=Object.prototype&&(a[b]=e.value)},v="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function ba(){ba=function(){};v.Symbol||(v.Symbol=ja)}function ka(a,b){this.a=a;m(this,"description",{configurable:!0,writable:!0,value:b})}
ka.prototype.toString=function(){return this.a};var ja=function(){function a(e){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new ka("jscomp_symbol_"+(e||"")+"_"+b++,e)}var b=0;return a}();function y(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:aa(a)}}var la="function"==typeof Object.create?Object.create:function(a){function b(){}b.prototype=a;return new b},z;
if("function"==typeof Object.setPrototypeOf)z=Object.setPrototypeOf;else{var C;a:{var ma={o:!0},na={};try{na.__proto__=ma;C=na.o;break a}catch(a){}C=!1}z=C?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var oa=z;
function I(a,b){a.prototype=la(b.prototype);a.prototype.constructor=a;if(oa)oa(a,b);else for(var e in b)if("prototype"!=e)if(Object.defineProperties){var c=Object.getOwnPropertyDescriptor(b,e);c&&Object.defineProperty(a,e,c)}else a[e]=b[e];a.H=b.prototype}function N(a,b){return Object.prototype.hasOwnProperty.call(a,b)}
function pa(a,b){if(b){var e=v;a=a.split(".");for(var c=0;c<a.length-1;c++){var d=a[c];d in e||(e[d]={});e=e[d]}a=a[a.length-1];c=e[a];b=b(c);b!=c&&null!=b&&m(e,a,{configurable:!0,writable:!0,value:b})}}
pa("WeakMap",function(a){function b(f){this.a=(p+=Math.random()+1).toString();if(f){f=y(f);for(var h;!(h=f.next()).done;)h=h.value,this.set(h[0],h[1])}}function e(){}function c(f){if(!N(f,l)){var h=new e;m(f,l,{value:h})}}function d(f){var h=Object[f];h&&(Object[f]=function(r){if(r instanceof e)return r;c(r);return h(r)})}if(function(){if(!a||!Object.seal)return!1;try{var f=Object.seal({}),h=Object.seal({}),r=new a([[f,2],[h,3]]);if(2!=r.get(f)||3!=r.get(h))return!1;r.delete(f);r.set(h,4);return!r.has(f)&&
4==r.get(h)}catch(J){return!1}}())return a;var l="$jscomp_hidden_"+Math.random();d("freeze");d("preventExtensions");d("seal");var p=0;b.prototype.set=function(f,h){c(f);if(!N(f,l))throw Error("WeakMap key fail: "+f);f[l][this.a]=h;return this};b.prototype.get=function(f){return N(f,l)?f[l][this.a]:void 0};b.prototype.has=function(f){return N(f,l)&&N(f[l],this.a)};b.prototype.delete=function(f){return N(f,l)&&N(f[l],this.a)?delete f[l][this.a]:!1};return b});
pa("Object.entries",function(a){return a?a:function(b){var e=[],c;for(c in b)N(b,c)&&e.push([c,b[c]]);return e}});var qa="function"==typeof Object.assign?Object.assign:function(a,b){for(var e=1;e<arguments.length;e++){var c=arguments[e];if(c)for(var d in c)N(c,d)&&(a[d]=c[d])}return a};pa("Object.assign",function(a){return a||qa});function ra(a,b,e,c){this.b=a;this.a=b;this.c=e;this.f=void 0===c?null:c}
function sa(a){var b=/\s+/;return a.trim().split(/\s*;\s*/).map(function(e){return e.split(b)}).reduce(function(e,c){c[0]&&(e[c[0]]=c.slice(1).map(function(d){return d}).sort());return e},{})}function ta(){var a=ua,b=sa(a),e="trusted-types"in b,c=["*"];e&&(c=b["trusted-types"].filter(function(d){return"'"!==d.charAt(0)}));return new ra(!0,e,c,a)};function va(){throw new TypeError("undefined conversion");}var wa=String.prototype,xa=wa.toLowerCase,Ca=wa.toUpperCase;function Da(){throw new TypeError("Illegal constructor");}function Ea(){throw new TypeError("Illegal constructor");}
var Fa=function(){function a(g){return d.apply(this,arguments)||this}function b(g){return d.apply(this,arguments)||this}function e(g){return d.apply(this,arguments)||this}function c(g){return d.apply(this,arguments)||this}function d(g,k){if(g!==ca)throw Error("cannot call the constructor");R(this,"policyName",{value:k,enumerable:!0})}function l(g){var k=da.get(g);void 0===k&&(k=H(null),da.set(g,k));return k}function p(g){var k=ya(g);if(null==k||ya(k)!==za)throw Error();k=y(S(k));for(var q=k.next();!q.done;q=
k.next())q=q.value,R(g,q,{value:g[q]});return g}function f(g,k){D(g.prototype);delete g.name;R(g,"name",{value:k})}function h(g){return function(k){return k instanceof g&&da.has(k)}}function r(g,k){function q(T,K){var Za=k[K]||va,$a=D(new T(ca,g));T={};K=(T[K]=function(E){E=Za(""+E);if(void 0===E||null===E)E="";E=""+E;var Aa=D(H($a));l(Aa).v=E;return Aa},T)[K];return D(K)}for(var n=H(Da.prototype),t=y(S(U)),G=t.next();!G.done;G=t.next())G=G.value,n[G]=q(U[G],G);R(n,"name",{value:g,writable:!1,configurable:!1,
enumerable:!0});return D(n)}function J(g,k,q,n,t){n=void 0===n?"":n;t=void 0===t?"":t;g=Ca.apply(String(g));(n=t?t:n)||(n="http://www.w3.org/1999/xhtml");if(n=L.apply(x,[n])?x[n]:null){if(L.apply(n,[g])&&n[g]&&L.apply(n[g][k],[q])&&n[g][k][q])return n[g][k][q];if(L.apply(n,["*"])&&L.apply(n["*"][k],[q])&&n["*"][k][q])return n["*"][k][q]}}var u=Object,ea=u.assign,H=u.create,R=u.defineProperty,D=u.freeze,S=u.getOwnPropertyNames,ya=u.getPrototypeOf,za=u.prototype,L=za.hasOwnProperty;u=Array.prototype;
var ab=u.forEach,bb=u.push;ba();var ca=Symbol(),da=p(new WeakMap),M=p([]),fa=p([]),ha=null,ia=!1;d.prototype.toString=function(){return l(this).v};d.prototype.valueOf=function(){return l(this).v};I(c,d);f(c,"TrustedURL");I(e,d);f(e,"TrustedScriptURL");I(b,d);f(b,"TrustedHTML");I(a,d);f(a,"TrustedScript");f(d,"TrustedType");u=D(H(new b(ca,"")));l(u).v="";var w={},x=(w["http://www.w3.org/1999/xhtml"]={A:{attributes:{href:c.name}},AREA:{attributes:{href:c.name}},AUDIO:{attributes:{src:c.name}},BASE:{attributes:{href:c.name}},
BUTTON:{attributes:{formaction:c.name}},EMBED:{attributes:{src:e.name}},FORM:{attributes:{action:c.name}},FRAME:{attributes:{src:c.name}},IFRAME:{attributes:{src:c.name,srcdoc:b.name}},IMG:{attributes:{src:c.name}},INPUT:{attributes:{src:c.name,formaction:c.name}},LINK:{attributes:{href:c.name}},OBJECT:{attributes:{data:e.name,codebase:e.name}},SCRIPT:{attributes:{src:e.name,text:a.name},properties:{innerText:a.name,textContent:a.name,text:a.name}},SOURCE:{attributes:{src:c.name}},TRACK:{attributes:{src:c.name}},
VIDEO:{attributes:{src:c.name}},"*":{attributes:{},properties:{innerHTML:b.name,outerHTML:b.name}}},w["http://www.w3.org/1999/xlink"]={"*":{attributes:{href:c.name},properties:{}}},w["http://www.w3.org/2000/svg"]={"*":{attributes:{href:c.name},properties:{}}},w);w={codebase:"codeBase",formaction:"formAction"};"srcdoc"in HTMLIFrameElement.prototype||delete x["http://www.w3.org/1999/xhtml"].IFRAME.attributes.srcdoc;for(var A=y(Object.keys(x["http://www.w3.org/1999/xhtml"])),B=A.next();!B.done;B=A.next()){B=
B.value;x["http://www.w3.org/1999/xhtml"][B].properties||(x["http://www.w3.org/1999/xhtml"][B].properties={});for(var Ba=y(Object.keys(x["http://www.w3.org/1999/xhtml"][B].attributes)),F=Ba.next();!F.done;F=Ba.next())F=F.value,x["http://www.w3.org/1999/xhtml"][B].properties[w[F]?w[F]:F]=x["http://www.w3.org/1999/xhtml"][B].attributes[F]}w=y(S(HTMLElement.prototype));for(A=w.next();!A.done;A=w.next())A=A.value,"on"===A.slice(0,2)&&(x["http://www.w3.org/1999/xhtml"]["*"].attributes[A]="TrustedScript");
var U={createHTML:b,createScriptURL:e,createURL:c,createScript:a},cb=U.hasOwnProperty;w=H(Ea.prototype);ea(w,{createPolicy:function(g,k){if(ia&&-1===fa.indexOf(g))throw new TypeError("Policy "+g+" disallowed.");if(-1!==M.indexOf(g))throw new TypeError("Policy "+g+" exists.");M.push(g);var q=H(null);if(k&&"object"===typeof k)for(var n=y(S(k)),t=n.next();!t.done;t=n.next())t=t.value,cb.call(U,t)&&(q[t]=k[t]);else console.warn("TrustedTypes.createPolicy "+g+" was given an empty policy");D(q);k=r(g,q);
"default"===g&&(ha=k);return k},getPolicyNames:function(){return M.slice()},i:h(b),m:h(c),l:h(e),j:h(a),g:function(g,k,q,n){q=void 0===q?"":q;n=void 0===n?"":n;k=xa.apply(String(k));return J(g,"attributes",k,q,n)},w:function(g,k,q){return J(g,"properties",String(k),void 0===q?"":q)},h:function(g){g=void 0===g?"":g;if(!g)try{g=document.documentElement.namespaceURI}catch(k){g="http://www.w3.org/1999/xhtml"}return(g=x[g])?JSON.parse(JSON.stringify(g)):{}},s:u,TrustedHTML:b,TrustedURL:c,TrustedScriptURL:e,
TrustedScript:a});return{TrustedTypes:D(w),F:function(g){-1!==g.indexOf("*")?ia=!1:(ia=!0,fa.length=0,ab.call(g,function(k){bb.call(fa,""+k)}))},u:function(){return ha},G:function(){ha=null;M.splice(M.indexOf("default"),1)}}}(),O=Fa.TrustedTypes,Ga=Fa.F,Ha=Fa.u;var Ia=Object.defineProperty;function Ja(a,b,e){Ia(a,b,{value:e})};for(var P=Reflect.apply,Ka=Object,La=Ka.getOwnPropertyNames,Q=Ka.getOwnPropertyDescriptor,Ma=Ka.getPrototypeOf,Na=Object.prototype.hasOwnProperty,Oa=String.prototype.slice,Pa="function"==typeof window.URL?URL.prototype.constructor:null,Qa,Ra=document.createElement("div").constructor.name?function(a){return a.name}:function(a){return(""+a).match(/^\[object (\S+)\]$/)[1]},Sa=Q(window,"open")?window:window.constructor.prototype,Ta=P(Na,Element.prototype,["insertAdjacentHTML"])?Element.prototype:HTMLElement.prototype,
Ua=window.SecurityPolicyViolationEvent||null,V=O.h("http://www.w3.org/1999/xhtml"),W={TrustedHTML:O.TrustedHTML,TrustedScript:O.TrustedScript,TrustedScriptURL:O.TrustedScriptURL,TrustedURL:O.TrustedURL},Va=y(Object.keys(V)),Wa=Va.next();!Wa.done;Wa=Va.next())for(var Xa=V[Wa.value].properties,Ya=y(Object.entries(Xa)),db=Ya.next();!db.done;db=Ya.next()){var eb=y(db.value),fb=eb.next().value,gb=eb.next().value;Xa[fb]=W[gb]}
var hb={TrustedHTML:O.i,TrustedURL:O.m,TrustedScriptURL:O.l,TrustedScript:O.j},ib={TrustedHTML:"createHTML",TrustedURL:"createURL",TrustedScriptURL:"createScriptURL",TrustedScript:"createScript"};function X(){this.a=jb;this.c={}}
function kb(){var a=new X;Ga(a.a.c);if(a.a.a||a.a.b)"ShadowRoot"in window&&lb(a,ShadowRoot.prototype,"innerHTML",O.TrustedHTML),Qa=function(b){return 0==b.createRange().createContextualFragment({toString:function(){return"<div></div>"}}).childNodes.length}(document),Y(a,Range.prototype,"createContextualFragment",O.TrustedHTML,0),Y(a,Ta,"insertAdjacentHTML",O.TrustedHTML,1),Q(Document.prototype,"write")?(Y(a,Document.prototype,"write",O.TrustedHTML,0),Y(a,Document.prototype,"open",O.TrustedURL,0)):
(Y(a,HTMLDocument.prototype,"write",O.TrustedHTML,0),Y(a,HTMLDocument.prototype,"open",O.TrustedURL,0)),Y(a,Sa,"open",O.TrustedURL,0),"DOMParser"in window&&Y(a,DOMParser.prototype,"parseFromString",O.TrustedHTML,0),Y(a,window,"setInterval",O.TrustedScript,0),Y(a,window,"setTimeout",O.TrustedScript,0),mb(a),nb(a),ob(a)}
function nb(a){Z(a,Node.prototype,"appendChild",function(b,e){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];return a.f.bind(a,this,b).apply(a,c)});Z(a,Ta,"insertAdjacentText",function(b,e){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];return a.B.bind(a,this,b).apply(a,c)})}
function ob(a){for(var b=y(La(V)),e=b.next();!e.done;e=b.next()){e=e.value;for(var c=y(La(V[e].properties)),d=c.next();!d.done;d=c.next())d=d.value,lb(a,window["*"==e?"HTMLElement":Ra(document.createElement(e).constructor)].prototype,d,V[e].properties[d])}}
function mb(a){Z(a,Element.prototype,"setAttribute",function(b,e){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];return a.D.bind(a,this,b).apply(a,c)});Z(a,Element.prototype,"setAttributeNS",function(b,e){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];return a.C.bind(a,this,b).apply(a,c)})}
X.prototype.D=function(a,b,e){for(var c=[],d=2;d<arguments.length;++d)c[d-2]=arguments[d];return null!==a.constructor&&a instanceof Element&&(d=(c[0]=String(c[0])).toLowerCase(),(d=O.g(a.tagName,d,a.namespaceURI))&&P(Na,W,[d]))?this.b(a,"setAttribute",W[d],b,1,c):b.apply(a,c)};
X.prototype.C=function(a,b,e){for(var c=[],d=2;d<arguments.length;++d)c[d-2]=arguments[d];if(null!==a.constructor&&a instanceof Element){d=c[0]?String(c[0]):null;c[0]=d;var l=(c[1]=String(c[1])).toLowerCase();if((d=O.g(a.tagName,l,a.namespaceURI,d))&&P(Na,W,[d]))return this.b(a,"setAttributeNS",W[d],b,2,c)}return b.apply(a,c)};
X.prototype.f=function(a,b,e){for(var c=[],d=2;d<arguments.length;++d)c[d-2]=arguments[d];return a instanceof HTMLScriptElement&&0<c.length&&c[0]instanceof Node&&c[0].nodeType==Node.TEXT_NODE?(a.textContent+=c[0].textContent,a.children[0]):b.apply(a,c)};
X.prototype.B=function(a,b,e){for(var c=[],d=2;d<arguments.length;++d)c[d-2]=arguments[d];if(!(a instanceof Element&&a.parentElement instanceof HTMLScriptElement&&1<c.length)||"beforebegin"!==c[0]&&"afterend"!=c[0]||c[1]instanceof O.TrustedScript||""===c[1])return b.apply(a,c);d="";for(var l=y(a.parentElement.childNodes),p=l.next();!p.done;p=l.next())p=p.value,p===a&&"beforebegin"==c[0]&&(d+=c[1]),p.nodeType==Node.TEXT_NODE&&(d+=p.textContent),p===a&&"afterend"==c[0]&&(d+=c[1]);a.parentElement.textContent=
d};function Y(a,b,e,c,d){Z(a,b,e,function(l,p){for(var f=[],h=1;h<arguments.length;++h)f[h-1]=arguments[h];return a.b.call(a,this,e,c,l,d,f)})}
function Z(a,b,e,c){var d=Q(b,e),l=d?d.value:null;if(!(l instanceof Function))throw new TypeError("Property "+e+" on object"+b+" is not a function");d=""+(b.constructor.name?b.constructor.name:b.constructor)+"-"+e;if(a.c[d])throw Error("TrustedTypesEnforcer: Double installation detected: "+d+" "+e);Ja(b,e,function(p){for(var f=[],h=0;h<arguments.length;++h)f[h]=arguments[h];return c.bind(this,l).apply(this,f)});a.c[d]=l}
function lb(a,b,e,c){function d(r){a.b.call(a,this,e,c,f,0,[r])}var l=b,p,f,h=Ma(Node.prototype);do(f=(p=Q(l,e))?p.set:null)||(l=Ma(l)||h);while(!f&&l!==h&&l);if(!(f instanceof Function))throw new TypeError("No setter for property "+e+" on object"+b);h=""+(b.constructor.name?b.constructor.name:b.constructor)+"-"+e;if(a.c[h])throw Error("TrustedTypesEnforcer: Double installation detected: "+h+" "+e);l===b?Ia(b,e,{set:d}):Ia(b,e,{set:d,get:p.get,configurable:!0});a.c[h]=f}
X.prototype.b=function(a,b,e,c,d,l){var p=l[d],f=e.name;if(hb.hasOwnProperty(f)&&hb[f](p))return Qa&&"createContextualFragment"==b&&(l[d]=l[d].toString()),P(c,a,l);if(e===O.TrustedScript){var h="setAttribute"==b||"setAttributeNS"===b||"on"===P(Oa,b,[0,2]);if(("setInterval"===b||"setTimeout"===b||h)&&"function"===typeof p||h&&null===p)return P(c,a,l)}if((h=Ha.call(O))&&hb.hasOwnProperty(f)){try{var r=h[ib[f]](p)}catch(ea){var J=!0}if(!J)return l[d]=r,P(c,a,l)}d=Ra(a.constructor)||""+a;f="Failed to set "+
b+" on "+d+": "+("This property requires "+f+".");this.a.b&&console.warn(f,b,a,e,p);if("function"==typeof Ua){r="";if(e===O.TrustedURL||e===O.TrustedScriptURL){try{var u=new Pa(p,document.baseURI||void 0)}catch(ea){u=null}if(r=u||"")r=r.href}e=P(Oa,""+p,[0,40]);b=new Ua("securitypolicyviolation",{bubbles:!0,blockedURI:r,disposition:this.a.a?"enforce":"report",documentURI:document.location.href,effectiveDirective:"trusted-types",originalPolicy:this.a.f,statusCode:0,violatedDirective:"trusted-types",
sample:d+"."+b+" "+e});a instanceof Node&&a.isConnected?a.dispatchEvent(b):document.dispatchEvent(b)}if(this.a.a)throw new TypeError(f);return P(c,a,l)};if("undefined"!==typeof window&&"undefined"===typeof window.TrustedTypes){var pb=Object.create(Ea.prototype);Object.assign(pb,{isHTML:O.i,isURL:O.m,isScriptURL:O.l,isScript:O.j,createPolicy:O.createPolicy,getPolicyNames:O.getPolicyNames,getAttributeType:O.g,getPropertyType:O.w,getTypeMapping:O.h,emptyHTML:O.s,_isPolyfill_:!0});window.TrustedTypes=Object.freeze(pb);window.TrustedHTML=O.TrustedHTML;window.TrustedURL=O.TrustedURL;window.TrustedScriptURL=O.TrustedScriptURL;window.TrustedScript=O.TrustedScript;
window.TrustedTypePolicy=Da;window.TrustedTypePolicyFactory=Ea};function qb(){try{var a;if(!(a=document.currentScript)){var b=document.getElementsByTagName("script");a=b[b.length-1]}if(a&&"Content-Security-Policy:"==a.textContent.trim().substr(0,24))return a.textContent.trim().slice(24);if(a.dataset.csp)return a.dataset.csp;var e=document.head.querySelector('meta[http-equiv^="Content-Security-Policy"]');if(e)return e.content.trim()}catch(c){}return null}if(!window.TrustedTypes||window.TrustedTypes._isPolyfill_){var ua=qb(),jb=ua?ta():new ra(!1,!1,["*"]);kb()};}).call(this);

//# sourceMappingURL=trustedtypes.build.js.map

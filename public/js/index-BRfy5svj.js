(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=globalThis,H=T.ShadowRoot&&(T.ShadyCSS===void 0||T.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,D=Symbol(),F=new WeakMap;let ae=class{constructor(e,a,t){if(this._$cssResult$=!0,t!==D)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=a}get styleSheet(){let e=this.o;const a=this.t;if(H&&e===void 0){const t=a!==void 0&&a.length===1;t&&(e=F.get(a)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&F.set(a,e))}return e}toString(){return this.cssText}};const se=i=>new ae(typeof i=="string"?i:i+"",void 0,D),me=(i,...e)=>{const a=i.length===1?i[0]:e.reduce((t,o,n)=>t+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+i[n+1],i[0]);return new ae(a,i,D)},le=(i,e)=>{if(H)i.adoptedStyleSheets=e.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(const a of e){const t=document.createElement("style"),o=T.litNonce;o!==void 0&&t.setAttribute("nonce",o),t.textContent=a.cssText,i.appendChild(t)}},K=H?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let a="";for(const t of e.cssRules)a+=t.cssText;return se(a)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ne,defineProperty:ce,getOwnPropertyDescriptor:he,getOwnPropertyNames:ue,getOwnPropertySymbols:de,getPrototypeOf:Se}=Object,A=globalThis,J=A.trustedTypes,Ae=J?J.emptyScript:"",B=A.reactiveElementPolyfillSupport,E=(i,e)=>i,G={toAttribute(i,e){switch(e){case Boolean:i=i?Ae:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let a=i;switch(e){case Boolean:a=i!==null;break;case Number:a=i===null?null:Number(i);break;case Object:case Array:try{a=JSON.parse(i)}catch{a=null}}return a}},te=(i,e)=>!Ne(i,e),V={attribute:!0,type:String,converter:G,reflect:!1,useDefault:!1,hasChanged:te};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),A.litPropertyMetadata??(A.litPropertyMetadata=new WeakMap);let C=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,a=V){if(a.state&&(a.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((a=Object.create(a)).wrapped=!0),this.elementProperties.set(e,a),!a.noAccessor){const t=Symbol(),o=this.getPropertyDescriptor(e,t,a);o!==void 0&&ce(this.prototype,e,o)}}static getPropertyDescriptor(e,a,t){const{get:o,set:n}=he(this.prototype,e)??{get(){return this[a]},set(r){this[a]=r}};return{get:o,set(r){const m=o==null?void 0:o.call(this);n==null||n.call(this,r),this.requestUpdate(e,m,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??V}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;const e=Se(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){const a=this.properties,t=[...ue(a),...de(a)];for(const o of t)this.createProperty(o,a[o])}const e=this[Symbol.metadata];if(e!==null){const a=litPropertyMetadata.get(e);if(a!==void 0)for(const[t,o]of a)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[a,t]of this.elementProperties){const o=this._$Eu(a,t);o!==void 0&&this._$Eh.set(o,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const a=[];if(Array.isArray(e)){const t=new Set(e.flat(1/0).reverse());for(const o of t)a.unshift(K(o))}else e!==void 0&&a.push(K(e));return a}static _$Eu(e,a){const t=a.attribute;return t===!1?void 0:typeof t=="string"?t:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(a=>this.enableUpdating=a),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(a=>a(this))}addController(e){var a;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((a=e.hostConnected)==null||a.call(e))}removeController(e){var a;(a=this._$EO)==null||a.delete(e)}_$E_(){const e=new Map,a=this.constructor.elementProperties;for(const t of a.keys())this.hasOwnProperty(t)&&(e.set(t,this[t]),delete this[t]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return le(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(a=>{var t;return(t=a.hostConnected)==null?void 0:t.call(a)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(a=>{var t;return(t=a.hostDisconnected)==null?void 0:t.call(a)})}attributeChangedCallback(e,a,t){this._$AK(e,t)}_$ET(e,a){var n;const t=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,t);if(o!==void 0&&t.reflect===!0){const r=(((n=t.converter)==null?void 0:n.toAttribute)!==void 0?t.converter:G).toAttribute(a,t.type);this._$Em=e,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(e,a){var n,r;const t=this.constructor,o=t._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const m=t.getPropertyOptions(o),s=typeof m.converter=="function"?{fromAttribute:m.converter}:((n=m.converter)==null?void 0:n.fromAttribute)!==void 0?m.converter:G;this._$Em=o,this[o]=s.fromAttribute(a,m.type)??((r=this._$Ej)==null?void 0:r.get(o))??null,this._$Em=null}}requestUpdate(e,a,t){var o;if(e!==void 0){const n=this.constructor,r=this[e];if(t??(t=n.getPropertyOptions(e)),!((t.hasChanged??te)(r,a)||t.useDefault&&t.reflect&&r===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(n._$Eu(e,t))))return;this.C(e,a,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,a,{useDefault:t,reflect:o,wrapped:n},r){t&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,r??a??this[e]),n!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||t||(a=void 0),this._$AL.set(e,a)),o===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[n,r]of o){const{wrapped:m}=r,s=this[n];m!==!0||this._$AL.has(n)||s===void 0||this.C(n,void 0,r,s)}}let e=!1;const a=this._$AL;try{e=this.shouldUpdate(a),e?(this.willUpdate(a),(t=this._$EO)==null||t.forEach(o=>{var n;return(n=o.hostUpdate)==null?void 0:n.call(o)}),this.update(a)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(a)}willUpdate(e){}_$AE(e){var a;(a=this._$EO)==null||a.forEach(t=>{var o;return(o=t.hostUpdated)==null?void 0:o.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(a=>this._$ET(a,this[a]))),this._$EM()}updated(e){}firstUpdated(e){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[E("elementProperties")]=new Map,C[E("finalized")]=new Map,B==null||B({ReactiveElement:C}),(A.reactiveElementVersions??(A.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const v=globalThis,k=v.trustedTypes,Z=k?k.createPolicy("lit-html",{createHTML:i=>i}):void 0,oe="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,ne="?"+S,pe=`<${ne}>`,g=document,_=()=>g.createComment(""),P=i=>i===null||typeof i!="object"&&typeof i!="function",W=Array.isArray,ze=i=>W(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",R=`[ 	
\f\r]`,$=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,j=/>/g,p=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),q=/'/g,Q=/"/g,ie=/^(?:script|style|textarea|title)$/i,ye=i=>(e,...a)=>({_$litType$:i,strings:e,values:a}),ge=ye(1),U=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),X=new WeakMap,z=g.createTreeWalker(g,129);function re(i,e){if(!W(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Z!==void 0?Z.createHTML(e):e}const Ce=(i,e)=>{const a=i.length-1,t=[];let o,n=e===2?"<svg>":e===3?"<math>":"",r=$;for(let m=0;m<a;m++){const s=i[m];let N,h,l=-1,u=0;for(;u<s.length&&(r.lastIndex=u,h=r.exec(s),h!==null);)u=r.lastIndex,r===$?h[1]==="!--"?r=Y:h[1]!==void 0?r=j:h[2]!==void 0?(ie.test(h[2])&&(o=RegExp("</"+h[2],"g")),r=p):h[3]!==void 0&&(r=p):r===p?h[0]===">"?(r=o??$,l=-1):h[1]===void 0?l=-2:(l=r.lastIndex-h[2].length,N=h[1],r=h[3]===void 0?p:h[3]==='"'?Q:q):r===Q||r===q?r=p:r===Y||r===j?r=$:(r=p,o=void 0);const d=r===p&&i[m+1].startsWith("/>")?" ":"";n+=r===$?s+pe:l>=0?(t.push(N),s.slice(0,l)+oe+s.slice(l)+S+d):s+S+(l===-2?m:d)}return[re(i,n+(i[a]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),t]};class M{constructor({strings:e,_$litType$:a},t){let o;this.parts=[];let n=0,r=0;const m=e.length-1,s=this.parts,[N,h]=Ce(e,a);if(this.el=M.createElement(N,t),z.currentNode=this.el.content,a===2||a===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(o=z.nextNode())!==null&&s.length<m;){if(o.nodeType===1){if(o.hasAttributes())for(const l of o.getAttributeNames())if(l.endsWith(oe)){const u=h[r++],d=o.getAttribute(l).split(S),I=/([.?@])?(.*)/.exec(u);s.push({type:1,index:n,name:I[2],strings:d,ctor:I[1]==="."?fe:I[1]==="?"?$e:I[1]==="@"?Ee:L}),o.removeAttribute(l)}else l.startsWith(S)&&(s.push({type:6,index:n}),o.removeAttribute(l));if(ie.test(o.tagName)){const l=o.textContent.split(S),u=l.length-1;if(u>0){o.textContent=k?k.emptyScript:"";for(let d=0;d<u;d++)o.append(l[d],_()),z.nextNode(),s.push({type:2,index:++n});o.append(l[u],_())}}}else if(o.nodeType===8)if(o.data===ne)s.push({type:2,index:n});else{let l=-1;for(;(l=o.data.indexOf(S,l+1))!==-1;)s.push({type:7,index:n}),l+=S.length-1}n++}}static createElement(e,a){const t=g.createElement("template");return t.innerHTML=e,t}}function f(i,e,a=i,t){var r,m;if(e===U)return e;let o=t!==void 0?(r=a._$Co)==null?void 0:r[t]:a._$Cl;const n=P(e)?void 0:e._$litDirective$;return(o==null?void 0:o.constructor)!==n&&((m=o==null?void 0:o._$AO)==null||m.call(o,!1),n===void 0?o=void 0:(o=new n(i),o._$AT(i,a,t)),t!==void 0?(a._$Co??(a._$Co=[]))[t]=o:a._$Cl=o),o!==void 0&&(e=f(i,o._$AS(i,e.values),o,t)),e}class Ue{constructor(e,a){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:a},parts:t}=this._$AD,o=((e==null?void 0:e.creationScope)??g).importNode(a,!0);z.currentNode=o;let n=z.nextNode(),r=0,m=0,s=t[0];for(;s!==void 0;){if(r===s.index){let N;s.type===2?N=new b(n,n.nextSibling,this,e):s.type===1?N=new s.ctor(n,s.name,s.strings,this,e):s.type===6&&(N=new ve(n,this,e)),this._$AV.push(N),s=t[++m]}r!==(s==null?void 0:s.index)&&(n=z.nextNode(),r++)}return z.currentNode=g,o}p(e){let a=0;for(const t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(e,t,a),a+=t.strings.length-2):t._$AI(e[a])),a++}}class b{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,a,t,o){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=a,this._$AM=t,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const a=this._$AM;return a!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=a.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,a=this){e=f(this,e,a),P(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==U&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ze(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(g.createTextNode(e)),this._$AH=e}$(e){var n;const{values:a,_$litType$:t}=e,o=typeof t=="number"?this._$AC(e):(t.el===void 0&&(t.el=M.createElement(re(t.h,t.h[0]),this.options)),t);if(((n=this._$AH)==null?void 0:n._$AD)===o)this._$AH.p(a);else{const r=new Ue(o,this),m=r.u(this.options);r.p(a),this.T(m),this._$AH=r}}_$AC(e){let a=X.get(e.strings);return a===void 0&&X.set(e.strings,a=new M(e)),a}k(e){W(this._$AH)||(this._$AH=[],this._$AR());const a=this._$AH;let t,o=0;for(const n of e)o===a.length?a.push(t=new b(this.O(_()),this.O(_()),this,this.options)):t=a[o],t._$AI(n),o++;o<a.length&&(this._$AR(t&&t._$AB.nextSibling,o),a.length=o)}_$AR(e=this._$AA.nextSibling,a){var t;for((t=this._$AP)==null?void 0:t.call(this,!1,!0,a);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var a;this._$AM===void 0&&(this._$Cv=e,(a=this._$AP)==null||a.call(this,e))}}class L{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,a,t,o,n){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=a,this._$AM=o,this.options=n,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=c}_$AI(e,a=this,t,o){const n=this.strings;let r=!1;if(n===void 0)e=f(this,e,a,0),r=!P(e)||e!==this._$AH&&e!==U,r&&(this._$AH=e);else{const m=e;let s,N;for(e=n[0],s=0;s<n.length-1;s++)N=f(this,m[t+s],a,s),N===U&&(N=this._$AH[s]),r||(r=!P(N)||N!==this._$AH[s]),N===c?e=c:e!==c&&(e+=(N??"")+n[s+1]),this._$AH[s]=N}r&&!o&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class fe extends L{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}}class $e extends L{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}}class Ee extends L{constructor(e,a,t,o,n){super(e,a,t,o,n),this.type=5}_$AI(e,a=this){if((e=f(this,e,a,0)??c)===U)return;const t=this._$AH,o=e===c&&t!==c||e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive,n=e!==c&&(t===c||o);o&&this.element.removeEventListener(this.name,this,t),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var a;typeof this._$AH=="function"?this._$AH.call(((a=this.options)==null?void 0:a.host)??this.element,e):this._$AH.handleEvent(e)}}class ve{constructor(e,a,t){this.element=e,this.type=6,this._$AN=void 0,this._$AM=a,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(e){f(this,e)}}const O=v.litHtmlPolyfillSupport;O==null||O(M,b),(v.litHtmlVersions??(v.litHtmlVersions=[])).push("3.3.0");const we=(i,e,a)=>{const t=(a==null?void 0:a.renderBefore)??e;let o=t._$litPart$;if(o===void 0){const n=(a==null?void 0:a.renderBefore)??null;t._$litPart$=o=new b(e.insertBefore(_(),n),n,void 0,a??{})}return o._$AI(i),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const y=globalThis;class w extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var a;const e=super.createRenderRoot();return(a=this.renderOptions).renderBefore??(a.renderBefore=e.firstChild),e}update(e){const a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=we(a,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return U}}var ee;w._$litElement$=!0,w.finalized=!0,(ee=y.litElementHydrateSupport)==null||ee.call(y,{LitElement:w});const x=y.litElementPolyfillSupport;x==null||x({LitElement:w});(y.litElementVersions??(y.litElementVersions=[])).push("4.2.0");const _e={AD:{zoneName:"Andorra"},AE:{zoneName:"United Arab Emirates"},AF:{zoneName:"Afghanistan"},AG:{zoneName:"Antigua and Barbuda"},AL:{zoneName:"Albania"},AM:{zoneName:"Armenia"},AO:{zoneName:"Angola"},AR:{zoneName:"Argentina"},AT:{zoneName:"Austria"},AU:{zoneName:"Australia"},"AU-LH":{countryName:"Australia",zoneName:"Lord Howe Island"},"AU-NSW":{countryName:"Australia",zoneName:"New South Wales"},"AU-NT":{countryName:"Australia",zoneName:"Northern Territory"},"AU-QLD":{countryName:"Australia",zoneName:"Queensland"},"AU-SA":{countryName:"Australia",zoneName:"South Australia"},"AU-TAS":{countryName:"Australia",zoneName:"Tasmania"},"AU-TAS-CBI":{countryName:"Australia",zoneName:"Cape Barren Island"},"AU-TAS-FI":{countryName:"Australia",zoneName:"Flinders Island"},"AU-TAS-KI":{countryName:"Australia",zoneName:"King Island"},"AU-VIC":{countryName:"Australia",zoneName:"Victoria"},"AU-WA":{countryName:"Australia",zoneName:"Western Australia"},"AU-WA-RI":{countryName:"Australia",zoneName:"Rottnest Island"},AW:{zoneName:"Aruba"},AX:{zoneName:"Åland Islands"},AZ:{zoneName:"Azerbaijan"},BA:{zoneName:"Bosnia and Herzegovina"},BB:{zoneName:"Barbados"},BD:{zoneName:"Bangladesh"},BE:{zoneName:"Belgium"},BF:{zoneName:"Burkina Faso"},BG:{zoneName:"Bulgaria"},BH:{zoneName:"Bahrain"},BI:{zoneName:"Burundi"},BJ:{zoneName:"Benin"},BM:{zoneName:"Bermuda"},BN:{zoneName:"Brunei"},BO:{zoneName:"Bolivia"},BR:{zoneName:"Brazil"},"BR-CS":{countryName:"Brazil",zoneName:"Central Brazil"},"BR-N":{countryName:"Brazil",zoneName:"North Brazil"},"BR-NE":{countryName:"Brazil",zoneName:"North-East Brazil"},"BR-S":{countryName:"Brazil",zoneName:"South Brazil"},BS:{zoneName:"Bahamas"},BT:{zoneName:"Bhutan"},BW:{zoneName:"Botswana"},BY:{zoneName:"Belarus"},BZ:{zoneName:"Belize"},CA:{zoneName:"Canada"},"CA-AB":{countryName:"Canada",zoneName:"Alberta"},"CA-BC":{countryName:"Canada",zoneName:"British Columbia"},"CA-MB":{countryName:"Canada",zoneName:"Manitoba"},"CA-NB":{countryName:"Canada",zoneName:"New Brunswick"},"CA-NL":{countryName:"Canada",zoneName:"Newfoundland and Labrador"},"CA-NS":{countryName:"Canada",zoneName:"Nova Scotia"},"CA-NT":{countryName:"Canada",zoneName:"Northwest Territories"},"CA-NU":{countryName:"Canada",zoneName:"Nunavut"},"CA-ON":{countryName:"Canada",zoneName:"Ontario"},"CA-PE":{countryName:"Canada",zoneName:"Prince Edward Island"},"CA-QC":{countryName:"Canada",zoneName:"Québec"},"CA-SK":{countryName:"Canada",zoneName:"Saskatchewan"},"CA-YT":{countryName:"Canada",zoneName:"Yukon"},CD:{zoneName:"Democratic Republic of the Congo"},CF:{zoneName:"Central African Republic"},CG:{zoneName:"Congo"},CH:{zoneName:"Switzerland"},CI:{zoneName:"Ivory Coast"},"CL-CHP":{countryName:"Chile",zoneName:"Easter Island"},"CL-SEA":{countryName:"Chile",zoneName:"Sistema Eléctrico de Aysén",shortname:"Chile - Aysén"},"CL-SEM":{countryName:"Chile",zoneName:"Sistema Eléctrico de Magallanes",shortname:"Chile - Magallanes"},"CL-SEN":{countryName:"Chile",zoneName:"Sistema Eléctrico Nacional",shortname:"Chile"},CM:{zoneName:"Cameroon"},CN:{zoneName:"China"},CO:{zoneName:"Colombia"},CR:{zoneName:"Costa Rica"},CU:{zoneName:"Cuba"},CV:{zoneName:"Cabo Verde"},CW:{zoneName:"Curaçao"},CY:{zoneName:"Cyprus"},CZ:{zoneName:"Czechia"},DE:{zoneName:"Germany"},DJ:{zoneName:"Djibouti"},DK:{zoneName:"Denmark"},"DK-BHM":{countryName:"Denmark",zoneName:"Bornholm"},"DK-DK1":{countryName:"Denmark",zoneName:"West Denmark"},"DK-DK2":{countryName:"Denmark",zoneName:"East Denmark"},DM:{zoneName:"Dominica"},DO:{zoneName:"Dominican Republic"},DZ:{zoneName:"Algeria"},EC:{zoneName:"Ecuador"},EE:{zoneName:"Estonia"},EG:{zoneName:"Egypt"},EH:{zoneName:"Western Sahara"},ER:{zoneName:"Eritrea"},ES:{zoneName:"Spain"},"ES-CE":{countryName:"Spain",zoneName:"Ceuta"},"ES-CN-FV":{countryName:"Spain",zoneName:"Fuerteventura"},"ES-CN-GC":{countryName:"Spain",zoneName:"Gran Canaria"},"ES-CN-HI":{countryName:"Spain",zoneName:"El Hierro"},"ES-CN-IG":{countryName:"Spain",zoneName:"Isla de la Gomera"},"ES-CN-LP":{countryName:"Spain",zoneName:"La Palma"},"ES-CN-LZ":{countryName:"Spain",zoneName:"Lanzarote"},"ES-CN-TE":{countryName:"Spain",zoneName:"Tenerife"},"ES-IB-FO":{countryName:"Spain",zoneName:"Formentera"},"ES-IB-IZ":{countryName:"Spain",zoneName:"Ibiza"},"ES-IB-MA":{countryName:"Spain",zoneName:"Mallorca"},"ES-IB-ME":{countryName:"Spain",zoneName:"Menorca"},"ES-ML":{countryName:"Spain",zoneName:"Melilla"},ET:{zoneName:"Ethiopia"},FI:{zoneName:"Finland"},FJ:{zoneName:"Fiji"},FK:{zoneName:"Falkland Islands"},FM:{zoneName:"Micronesia"},FO:{zoneName:"Faroe Islands"},"FO-MI":{countryName:"Faroe Islands",zoneName:"Main Islands"},"FO-SI":{countryName:"Faroe Islands",zoneName:"South Island"},FR:{zoneName:"France"},"FR-COR":{countryName:"France",zoneName:"Corsica"},GA:{zoneName:"Gabon"},GB:{zoneName:"Great Britain"},"GB-NIR":{zoneName:"Northern Ireland"},"GB-ORK":{countryName:"Great Britain",zoneName:"Orkney Islands"},"GB-ZET":{countryName:"Great Britain",zoneName:"Shetland Islands"},GE:{zoneName:"Georgia"},GF:{zoneName:"French Guiana"},GG:{zoneName:"Guernsey"},GH:{zoneName:"Ghana"},GI:{zoneName:"Gibraltar"},GL:{zoneName:"Greenland"},GM:{zoneName:"Gambia"},GN:{zoneName:"Guinea"},GP:{zoneName:"Guadeloupe"},GQ:{zoneName:"Equatorial Guinea"},GR:{zoneName:"Greece"},GS:{zoneName:"South Georgia and the South Sandwich Islands",shortName:"SGSSI"},GT:{zoneName:"Guatemala"},GU:{zoneName:"Guam"},GW:{zoneName:"Guinea-Bissau"},GY:{zoneName:"Guyana"},HK:{zoneName:"Hong Kong"},HM:{zoneName:"Heard Island and McDonald Islands",shortName:"HIMI"},HN:{zoneName:"Honduras"},HR:{zoneName:"Croatia"},HT:{zoneName:"Haiti"},HU:{zoneName:"Hungary"},ID:{zoneName:"Indonesia"},IE:{zoneName:"Ireland"},IL:{zoneName:"Israel"},IM:{zoneName:"Isle of Man"},IN:{zoneName:"Mainland India"},"IN-AN":{countryName:"India",zoneName:"Andaman and Nicobar Islands"},"IN-DL":{zoneName:"Unknown"},"IN-EA":{countryName:"India",zoneName:"Eastern India"},"IN-HP":{countryName:"India",zoneName:"Himachal Pradesh"},"IN-KA":{zoneName:"Unknown"},"IN-MH":{zoneName:"Unknown"},"IN-NE":{countryName:"India",zoneName:"North Eastern India"},"IN-NO":{countryName:"India",zoneName:"Northern India"},"IN-PB":{zoneName:"Unknown"},"IN-SO":{countryName:"India",zoneName:"Southern India"},"IN-UP":{countryName:"India",zoneName:"Uttar Pradesh"},"IN-UT":{countryName:"India",zoneName:"Uttarakhand"},"IN-WE":{countryName:"India",zoneName:"Western India"},IQ:{zoneName:"Iraq"},IR:{zoneName:"Iran"},IS:{zoneName:"Iceland"},IT:{zoneName:"Italy"},"IT-CNO":{countryName:"Italy",zoneName:"Central North Italy"},"IT-CSO":{countryName:"Italy",zoneName:"Central South Italy"},"IT-NO":{countryName:"Italy",zoneName:"North Italy"},"IT-SAR":{countryName:"Italy",zoneName:"Sardinia"},"IT-SIC":{countryName:"Italy",zoneName:"Sicily"},"IT-SO":{countryName:"Italy",zoneName:"South Italy"},JE:{zoneName:"Jersey"},JM:{zoneName:"Jamaica"},JO:{zoneName:"Jordan"},JP:{zoneName:"Japan"},"JP-CB":{countryName:"Japan",zoneName:"Chūbu"},"JP-CG":{countryName:"Japan",zoneName:"Chūgoku"},"JP-HKD":{countryName:"Japan",zoneName:"Hokkaidō"},"JP-HR":{countryName:"Japan",zoneName:"Hokuriku"},"JP-KN":{countryName:"Japan",zoneName:"Kansai"},"JP-KY":{countryName:"Japan",zoneName:"Kyūshū"},"JP-ON":{countryName:"Japan",zoneName:"Okinawa"},"JP-SK":{countryName:"Japan",zoneName:"Shikoku"},"JP-TH":{countryName:"Japan",zoneName:"Tōhoku"},"JP-TK":{countryName:"Japan",zoneName:"Tōkyō"},KE:{zoneName:"Kenya"},KG:{zoneName:"Kyrgyzstan"},KH:{zoneName:"Cambodia"},KM:{zoneName:"Comoros"},KP:{zoneName:"North Korea"},KR:{zoneName:"South Korea"},KW:{zoneName:"Kuwait"},KY:{zoneName:"Cayman Islands"},KZ:{zoneName:"Kazakhstan"},LA:{zoneName:"Laos"},LB:{zoneName:"Lebanon"},LC:{zoneName:"Saint Lucia"},LI:{zoneName:"Liechtenstein"},LK:{zoneName:"Sri Lanka"},LR:{zoneName:"Liberia"},LS:{zoneName:"Lesotho"},LT:{zoneName:"Lithuania"},LU:{zoneName:"Luxembourg"},LV:{zoneName:"Latvia"},LY:{zoneName:"Libya"},MA:{zoneName:"Morocco"},MC:{zoneName:"Monaco"},MD:{zoneName:"Moldova"},ME:{zoneName:"Montenegro"},MG:{zoneName:"Madagascar"},MK:{zoneName:"North Macedonia"},ML:{zoneName:"Mali"},MM:{zoneName:"Myanmar"},MN:{zoneName:"Mongolia"},MO:{zoneName:"Macao"},MQ:{zoneName:"Martinique"},MR:{zoneName:"Mauritania"},MT:{zoneName:"Malta"},MU:{zoneName:"Mauritius"},MV:{zoneName:"Maldives"},MW:{zoneName:"Malawi"},MX:{zoneName:"Mexico"},MY:{zoneName:"Malaysia"},"MY-EM":{countryName:"Malaysia",zoneName:"Borneo"},"MY-WM":{countryName:"Malaysia",zoneName:"Peninsula"},MZ:{zoneName:"Mozambique"},NA:{zoneName:"Namibia"},NC:{zoneName:"New Caledonia"},NE:{zoneName:"Niger"},NG:{zoneName:"Nigeria"},NI:{zoneName:"Nicaragua"},NL:{zoneName:"Netherlands"},NO:{zoneName:"Norway"},"NO-NO1":{countryName:"Norway",zoneName:"Southeast Norway"},"NO-NO2":{countryName:"Norway",zoneName:"Southwest Norway"},"NO-NO3":{countryName:"Norway",zoneName:"Middle Norway"},"NO-NO4":{countryName:"Norway",zoneName:"North Norway"},"NO-NO5":{countryName:"Norway",zoneName:"West Norway"},NP:{zoneName:"Nepal"},NZ:{zoneName:"New Zealand"},"NZ-NZA":{countryName:"New Zealand",zoneName:"Auckland Islands"},"NZ-NZC":{countryName:"New Zealand",zoneName:"Chatham Islands"},"NZ-NZST":{countryName:"New Zealand",zoneName:"Stewart Island"},OM:{zoneName:"Oman"},PA:{zoneName:"Panama"},PE:{zoneName:"Peru"},PF:{zoneName:"French Polynesia"},PG:{zoneName:"Papua New Guinea"},PH:{zoneName:"Philippines"},"PH-LU":{countryName:"Philippines",zoneName:"Luzon"},"PH-MI":{countryName:"Philippines",zoneName:"Mindanao"},"PH-VI":{countryName:"Philippines",zoneName:"Visayas"},PK:{zoneName:"Pakistan"},PL:{zoneName:"Poland"},PM:{zoneName:"Saint Pierre and Miquelon"},PR:{zoneName:"Puerto Rico"},PS:{zoneName:"State of Palestine"},PT:{zoneName:"Portugal"},"PT-AC":{countryName:"Portugal",zoneName:"Azores"},"PT-MA":{countryName:"Portugal",zoneName:"Madeira"},PW:{zoneName:"Palau"},PY:{zoneName:"Paraguay"},QA:{zoneName:"Qatar"},RE:{zoneName:"Réunion"},RO:{zoneName:"Romania"},RS:{zoneName:"Serbia"},RU:{zoneName:"Russia"},"RU-1":{countryName:"Russia",zoneName:"Europe-Ural"},"RU-2":{countryName:"Russia",zoneName:"Siberia"},"RU-AS":{countryName:"Russia",zoneName:"East"},"RU-EU":{countryName:"Russia",zoneName:"Arctic"},"RU-FE":{countryName:"Russia",zoneName:"Far East"},"RU-KGD":{countryName:"Russia",zoneName:"Kaliningrad"},RW:{zoneName:"Rwanda"},SA:{zoneName:"Saudi Arabia"},SB:{zoneName:"Solomon Islands"},SC:{zoneName:"Seychelles"},SD:{zoneName:"Sudan"},SE:{zoneName:"Sweden"},"SE-SE1":{countryName:"Sweden",zoneName:"North Sweden"},"SE-SE2":{countryName:"Sweden",zoneName:"North Central Sweden"},"SE-SE3":{countryName:"Sweden",zoneName:"South Central Sweden"},"SE-SE4":{countryName:"Sweden",zoneName:"South Sweden"},SG:{zoneName:"Singapore"},SI:{zoneName:"Slovenia"},SJ:{zoneName:"Svalbard and Jan Mayen"},SK:{zoneName:"Slovakia"},SL:{zoneName:"Sierra Leone"},SN:{zoneName:"Senegal"},SO:{zoneName:"Somalia"},SR:{zoneName:"Suriname"},SS:{zoneName:"South Sudan"},ST:{zoneName:"São Tomé and Príncipe"},SV:{zoneName:"El Salvador"},SY:{zoneName:"Syria"},SZ:{zoneName:"Eswatini"},TD:{zoneName:"Chad"},TF:{zoneName:"French Southern Territories"},TG:{zoneName:"Togo"},TH:{zoneName:"Thailand"},TJ:{zoneName:"Tajikistan"},TL:{zoneName:"Timor-Leste"},TM:{zoneName:"Turkmenistan"},TN:{zoneName:"Tunisia"},TO:{zoneName:"Tonga"},TR:{zoneName:"Turkey"},TT:{zoneName:"Trinidad and Tobago"},TW:{zoneName:"Taiwan"},TZ:{zoneName:"Tanzania"},UA:{zoneName:"Ukraine"},"UA-CR":{countryName:"Ukraine",zoneName:"Crimea"},UG:{zoneName:"Uganda"},US:{zoneName:"United States"},"US-AK":{countryName:"USA",zoneName:"Alaska"},"US-AK-SEAPA":{countryName:"USA",zoneName:"Southeast Alaska Power Agency",shortName:"USA - Alaska"},"US-CAL-BANC":{countryName:"USA",displayName:"BANC",zoneName:"Balancing Authority of Northern California",shortName:"USA - California"},"US-CAL-CISO":{countryName:"USA",displayName:"California ISO",zoneName:"CAISO",shortName:"USA - California"},"US-CAL-IID":{countryName:"USA",zoneName:"Imperial Irrigation District",shortName:"USA - California"},"US-CAL-LDWP":{countryName:"USA",zoneName:"Los Angeles Department of Water and Power",shortName:"USA - Los Angeles"},"US-CAL-TIDC":{countryName:"USA",zoneName:"Turlock Irrigation District",shortName:"USA - California"},"US-CAR-CPLE":{countryName:"USA",zoneName:"Duke Energy Progress East",shortName:"USA - North Carolina"},"US-CAR-CPLW":{countryName:"USA",zoneName:"Duke Energy Progress West",shortName:"USA - North Carolina"},"US-CAR-DUK":{countryName:"USA",zoneName:"Duke Energy Carolinas",shortName:"USA - Carolinas"},"US-CAR-SC":{countryName:"USA",zoneName:"South Carolina Public Service Authority",shortName:"USA - South Carolina"},"US-CAR-SCEG":{countryName:"USA",zoneName:"South Carolina Electric & Gas Company",shortName:"USA - South Carolina"},"US-CAR-YAD":{countryName:"USA",displayName:"Alcoa Power Generating",zoneName:"Alcoa Power Generating, Inc. Yadkin Division",shortName:"USA - North Carolina"},"US-CENT-SPA":{countryName:"USA",zoneName:"Southwestern Power Administration",shortName:"USA - Central"},"US-CENT-SWPP":{countryName:"USA",displayName:"SPP",zoneName:"Southwest Power Pool",shortName:"USA - Central"},"US-FLA-FMPP":{countryName:"USA",zoneName:"Florida Municipal Power Pool",shortName:"USA - Florida"},"US-FLA-FPC":{countryName:"USA",zoneName:"Duke Energy Florida",shortName:"USA - Florida"},"US-FLA-FPL":{countryName:"USA",zoneName:"Florida Power and Light Company",shortName:"USA - Florida"},"US-FLA-GVL":{countryName:"USA",zoneName:"Gainesville Regional Utilities",shortName:"USA - Gainesville"},"US-FLA-HST":{countryName:"USA",zoneName:"City of Homestead",shortName:"USA - Homestead"},"US-FLA-JEA":{countryName:"USA",zoneName:"Jacksonville Electric Authority",shortName:"USA - Jacksonville"},"US-FLA-SEC":{countryName:"USA",zoneName:"Seminole Electric Cooperative",shortName:"USA - Seminole"},"US-FLA-TAL":{countryName:"USA",zoneName:"City of Tallahassee",shortName:"USA - Tallahassee"},"US-FLA-TEC":{countryName:"USA",zoneName:"Tampa Electric Company",shortName:"USA - Tampa"},"US-HI":{countryName:"USA",zoneName:"Hawaii"},"US-MIDA-PJM":{countryName:"USA",displayName:"PJM",zoneName:"PJM Interconnection",shortName:"USA - Mid Atlantic"},"US-MIDW-AECI":{countryName:"USA",zoneName:"Associated Electric Cooperative",shortName:"USA - Midwest"},"US-MIDW-LGEE":{countryName:"USA",displayName:"Louisville Gas And Electric Company",zoneName:"Louisville Gas and Electric Company and Kentucky Utilities",shortName:"USA - Louisville"},"US-MIDW-MISO":{countryName:"USA",displayName:"MISO",zoneName:"Midcontinent ISO",shortName:"USA - Midcontinent"},"US-NE-ISNE":{countryName:"USA",zoneName:"ISO New England",shortName:"USA - New England"},"US-NW-AVA":{countryName:"USA",zoneName:"Avista Corporation",shortName:"USA - Avista"},"US-NW-BPAT":{countryName:"USA",zoneName:"Bonneville Power Administration",shortName:"USA - Bonneville"},"US-NW-CHPD":{countryName:"USA",zoneName:"Chelan County",shortName:"USA - Chelan County"},"US-NW-DOPD":{countryName:"USA",zoneName:"Douglas County",shortName:"USA - Douglas County"},"US-NW-GCPD":{countryName:"USA",zoneName:"Grant County",shortName:"USA - Grant County"},"US-NW-GRID":{countryName:"USA",zoneName:"Gridforce Energy Management",shortName:"USA - Northwest"},"US-NW-IPCO":{countryName:"USA",zoneName:"Idaho Power Company",shortName:"USA - Idaho"},"US-NW-NEVP":{countryName:"USA",zoneName:"Nevada Power Company",shortName:"USA - Nevada"},"US-NW-NWMT":{countryName:"USA",zoneName:"Northwestern Energy",shortName:"USA - Northwest"},"US-NW-PACE":{countryName:"USA",zoneName:"Pacificorp East",shortName:"USA - Northwest"},"US-NW-PACW":{countryName:"USA",zoneName:"Pacificorp West",shortName:"USA - Northwest"},"US-NW-PGE":{countryName:"USA",zoneName:"Portland General Electric Company",shortName:"USA - Portland"},"US-NW-PSCO":{countryName:"USA",displayName:"PSCo",zoneName:"Public Service Company of Colorado",shortName:"USA - Colorado"},"US-NW-PSEI":{countryName:"USA",zoneName:"Puget Sound Energy",shortName:"USA - Puget Sound"},"US-NW-SCL":{countryName:"USA",zoneName:"Seattle City Light",shortName:"USA - Seattle"},"US-NW-TPWR":{countryName:"USA",zoneName:"City of Tacoma",shortName:"USA - Tacoma"},"US-NW-WACM":{countryName:"USA",displayName:"WAPA Rocky Mountains",zoneName:"Western Area Power Administration - Rocky Mountain Region",shortName:"USA - Rocky Mountains"},"US-NW-WAUW":{countryName:"USA",displayName:"WAPA Upper Great Plains",zoneName:"Western Area Power Administration - Upper Great Plains West",shortName:"USA - Upper Great Plains"},"US-NY-NYIS":{countryName:"USA",zoneName:"New York ISO",shortName:"USA - New York"},"US-SE-SEPA":{countryName:"USA",zoneName:"Southeastern Power Administration",shortName:"USA - Southeastern"},"US-SE-SOCO":{countryName:"USA",zoneName:"Southern Company Services",shortName:"USA - Southeastern"},"US-SW-AZPS":{countryName:"USA",zoneName:"Arizona Public Service Company",shortName:"USA - Arizona"},"US-SW-EPE":{countryName:"USA",zoneName:"El Paso Electric Company",shortName:"USA - El Paso"},"US-SW-PNM":{countryName:"USA",zoneName:"Public Service Company of New Mexico",shortName:"USA - New Mexico"},"US-SW-SRP":{countryName:"USA",zoneName:"Salt River Project",shortName:"USA - Salt River"},"US-SW-TEPC":{countryName:"USA",zoneName:"Tucson Electric Power Company",shortName:"USA - Tucson"},"US-SW-WALC":{countryName:"USA",displayName:"WAPA Desert Southwest",zoneName:"Western Area Power Administration - Desert Southwest Region",shortname:"USA - Desert Southwest"},"US-TEN-TVA":{countryName:"USA",displayName:"TVA",zoneName:"Tennessee Valley Authority",shortName:"USA - Tennessee"},"US-TEX-ERCO":{countryName:"USA",displayName:"ERCOT",zoneName:"Electric Reliability Council of Texas",shortName:"USA - Texas"},UY:{zoneName:"Uruguay"},UZ:{zoneName:"Uzbekistan"},VC:{zoneName:"Saint Vincent and the Grenadines",shortName:"Saint Vincent"},VE:{zoneName:"Venezuela"},VI:{countryName:"USA",zoneName:"Virgin Islands"},VN:{zoneName:"Vietnam"},VU:{zoneName:"Vanuatu"},WS:{zoneName:"Samoa"},XK:{zoneName:"Kosovo"},XX:{zoneName:"Northern Cyprus"},YE:{zoneName:"Yemen"},YT:{zoneName:"Mayotte"},ZA:{zoneName:"South Africa"},ZM:{zoneName:"Zambia"},ZW:{zoneName:"Zimbabwe"}};class Pe extends w{static get properties(){return{location:{type:String},gridLevelText:{type:String},autoMode:{type:Boolean}}}constructor(){super(),this.location="Location unknown",this.circleFill="#B0AA9C",this.autoMode=!0,this.gridLevelText="Your local grid: Data unavailable",this.ignoreCookie="gaw-ignore",this.ignoreCookieMaxAge="Session",this.manualVersion="low",this.addEventListener("load",this._init())}render(){return ge`
      <div>
        <div class="holder">
          <div class="divider">
              <svg
                  class="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                            />
                          </svg>

          </div>
          <p>${this.location}</p>
        </div>
        <div class="holder">
          <div class="divider">
            <svg
              class="icon"
              viewBox="0 0 100 100"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="40" fill="${this.circleFill}" />
            </svg>
          </div>
            <div class="split-content">
              <p>${this.gridLevelText}</p>
              <svg
                  class="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                            />
                          </svg>

            </div>
          </div>
        </div>
        <div id="gaw-info-controls">
          <div class="holder">
            <div class="divider" id="gaw-info-bar-auto">
              <p>Grid-aware design</p>
              <label>
                <input
                  type="checkbox"
                  ?checked="${this.autoMode}"
                  id="gaw-info-bar-settings-auto-toggle"
                  @change="${this._handleAutoToggleChange}"
                />
                Auto
              </label>
            </div>
            <div id="gaw-info-bar-manual" class="spaced">
              <button id="gaw-info-bar-settings-manual-low" ?disabled="${this.autoMode}" @click=${this._handleManualModeChange} ?data-active=${this._checkIsActive("low")}>
                Low
              </button>
              <button id="gaw-info-bar-settings-manual-moderate" ?disabled="${this.autoMode}" @click=${this._handleManualModeChange} ?data-active=${this._checkIsActive("moderate")}>
                Moderate
              </button>
              <button id="gaw-info-bar-settings-manual-high" ?disabled="${this.autoMode}" @click=${this._handleManualModeChange} ?data-active=${this._checkIsActive("high")}>
                High
              </button>
            </div>
          </div>
        </div>
      </div>
    `}_formatLocation(e){if(!e)return"Location unknown";try{let a=e.toString();const t=_e[a];return t.shortName?t.shortName:t.zoneName?t.zoneName:t.country}catch(a){return console.error(a),"Location unknown"}}_handleAutoToggleChange(e){this.autoMode=e.target.checked,this.autoMode?(document.cookie=`${this.ignoreCookie}=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`,document.cookie="gaw-manual-view=low; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;",window.location.reload()):(document.cookie=`${this.ignoreCookie}=true; path=/; max-age=${this.ignoreCookieMaxAge}`,document.cookie=`gaw-manual-view=low; path=/; max-age=${this.ignoreCookieMaxAge}`,window.location.reload())}_handleManualModeChange(e){const a=e.target.id.split("-").pop();document.cookie=`gaw-manual-view=${a}; path=/; max-age=${this.ignoreCookieMaxAge}`,window.location.reload()}_checkIsActive(e){return this._getCookie("gaw-manual-view")===e}_hasCookie(e){return document.cookie.split(";").some(a=>a.trim().startsWith(`${e}=`))}_getCookie(e){const a=document.cookie.split("; ");for(let t=0;t<a.length;t++){const o=a[t],n=o.indexOf("=");if((n>-1?o.substr(0,n):o)===e)return decodeURIComponent(o.substring(n+1))}return null}_init(){const e=this.dataset.gawLevel||this.level;this.location=this.dataset.gawLocation||this.location,this.ignoreCookieMaxAge=this.dataset.ignoreCookieMaxAge||this.ignoreCookieMaxAge,this.ignoreCookie=this.dataset.ignoreCookie||this.ignoreCookie;try{const a=this._formatLocation(this.location);this.location=a}catch(a){console.log("Error formatting location:",a)}try{e==="low"?(this.circleFill="#86CA7A",this.gridLevelText="Your local grid: Cleaner than average."):e==="moderate"?(this.circleFill="#ECA75D",this.gridLevelText="Your local grid: Around average emissions."):e==="high"&&(this.circleFill="#E4A08A",this.gridLevelText="Your local grid: Dirtier than average.")}catch(a){console.log(a)}this._hasCookie(this.ignoreCookie)&&(this.autoMode=!1)}static get styles(){return me`
      :host {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 1rem;
        font-family: monospace;
        max-width: 1920px;
        text-transform: uppercase;
        gap: 0.5rem;
        color: inherit;
        /* flex-wrap: wrap-reverse; */
      }

      :host > div {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      :host > .wrapper {
        max-width: 600px;
      }

      .holder {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        border: 1px solid #b8bcb5;
      }

      .holder > * {
        padding-block: 0.25rem;
        padding-inline: 0.75rem;
      }

      .icon {
        width: 1.5rem;
        height: 1.5rem;
        position: relative;
      }

      div.divider {
        position: relative;
        display: flex;
        align-items: center;
      }

      div.divider:after {
        content: "";
        position: absolute;
        height: calc(100% + 1rem);
        width: 1px;
        background-color: #b8bcb5;
        top: -0.5rem;
        right: -0.25rem;
      }

      .split-content {
        postion: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        /* justify-content: center; */
      }

      .split-content > * {
        padding-inline: 0.25rem;
        position: relative;
      }

      .divider:has(input) {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
      }

      div.divider:has(input):after {
        height: calc(100% - 1rem);
        top: 0.5rem;
      }

      .spaced {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      }

      button {
        background: none;
        border: none;
        font-family: inherit;
      }

      label:has(input) {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      :host
        > div:has(+ #gaw-info-controls label > input:not([checked]))
        > .holder {
        display: none;
      }

      button:not(:disabled) {
        background: none;
        border: none;
        font-family: inherit;
        padding: 0.5rem 0.75rem;
        cursor: pointer;
      }

      button#gaw-info-bar-settings-manual-low {
        --activeButtonBackgroundColor: #86ca7a;
      }

      button#gaw-info-bar-settings-manual-moderate {
        --activeButtonBackgroundColor: #eca75d;
      }

      button#gaw-info-bar-settings-manual-high {
        --activeButtonBackgroundColor: #e4a08a;
      }

      button:not(:disabled)[data-active] {
        background: var(--activeButtonBackgroundColor);
      }
    `}}window.customElements.define("gaw-info-bar",Pe);

"use strict";(self.webpackChunkclear_horizon=self.webpackChunkclear_horizon||[]).push([[189],{5502:(t,e,n)=>{n.d(e,{Z:()=>o}),n(7267);const o=class{constructor(){var t,e,n,o;t=this,n={},(e="symbol"==typeof(o=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!=typeof o)return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(e="_params"))?o:String(o))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n}get(t){return this.params()[t]}params(){const t=window.location.href.replace(/#$/,""),e={};return t.replace(/[?&]+(\w+)([^&]*)/gi,(function(t,n){return e[n]=!0,""})),t.replace(/[?&]+([^=&]+)=([^&]*)/gi,(function(t,n,o){return e[n]=decodeURIComponent(o),""})),this._params=e,e}set(t,e){if(e){let n;const o=encodeURIComponent(e);n=this.get(t)?location.search.replace(new RegExp("([?|&]"+t+"=)(.+?)(&|$)"),"$1"+o+"$3"):location.search.length?location.search+"&"+t+"="+o:"?"+t+"="+o;const r={};r[t]=e,this._params[t]=e;const i={state:{url:n,params:r},url:n};return this._pushState(i),i}return this.remove(t)}remove(t){const e=location.search;let n,o,r=e.split("?")[0];const i=-1!==e.indexOf("?")?e.split("?")[1]:"";if(""!==i){o=i.split("&");for(let e=o.length-1;e>=0;e-=1)n=o[e].split("=")[0],n===t&&o.splice(e,1);r=r+"?"+o.join("&")}delete this._params[t];const c={state:{url:r,type:"remove"},url:r};return this._pushState(c),c}_pushState(t){history&&history.replaceState(null,document.title,t.url)}}},4705:(t,e,n)=>{n.d(e,{T:()=>o});class o{constructor(t){var e,n,o,r;e=this,o=!0,(n="symbol"==typeof(r=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!=typeof o)return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n="silent"))?r:String(r))in e?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o,t&&this.copy(t)}static copy(t){return(new o).copy(t)}copy(t){try{return navigator.clipboard?navigator.clipboard.writeText(t):window.clipboardData?window.clipboardData.setData("text",t):this.copyToClipboard(t),!this.silent&&console.log("Copied to Clipboard"),!0}catch(t){!this.silent&&console.log("Please copy manually")}return!1}copyToClipboard(t){const e=document.createElement("input");e.value=t;try{document.body.appendChild(e),this.copyNodeContentsToClipboard(e)}finally{document.body.removeChild(e)}}copyNodeContentsToClipboard(t){t.select(),t.setSelectionRange(0,99999),document.execCommand("copy")}}},4019:(t,e,n)=>{function o(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const o=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];for(;null!==t;t=Object.getPrototypeOf(t)){const n=Object.getOwnPropertyNames(t);for(let t=0;t<n.length;t++)-1==e.indexOf(n[t])&&e.push(n[t])}return e}(t.prototype),r=void 0===n.replace||n.replace;e.forEach((e=>{Object.getOwnPropertyNames(e.prototype).forEach((n=>{const i=-1!==o.indexOf(n);if(!r&&!i||r){const o=Object.getOwnPropertyDescriptor(e.prototype,n);o&&Object.defineProperty(t.prototype,n,o)}}))}))}function r(t,e,n){n.forEach((n=>{const o=Object.getOwnPropertyDescriptor(e.prototype,n);o&&Object.defineProperty(t.prototype,n,o)}))}n.d(e,{FR:()=>r,ef:()=>o}),n(7267)},7450:(t,e,n)=>{function o(t){let e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;function o(){for(var r=arguments.length,i=new Array(r),c=0;c<r;c++)i[c]=arguments[c];o.clear(),e=setTimeout((()=>{e=null,t.apply(this,i)}),n)}return o.clear=function(){e&&(clearTimeout(e),e=null)},o}n.d(e,{D:()=>o})},390:(t,e,n)=>{function o(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=t;const i=e,c=Array.isArray(i);let a=c&&[]||{};return c&&Array.isArray(i)?n?(r=r||[],a=a.concat(r),i.forEach(((t,e)=>{void 0===a[e]?a[e]=t:"object"==typeof t?a[e]=o(r[e],t,n):-1===r.indexOf(t)&&a.push(t)}))):a=i:(r&&"object"==typeof r&&Object.keys(r).forEach((function(t){a[t]=r[t]})),Object.keys(i).forEach((function(t){"object"==typeof i[t]&&i[t]&&"object"==typeof r[t]&&"object"==typeof i[t]?a[t]=o(r[t],i[t],n):a[t]=i[t]}))),a}n.d(e,{v:()=>o})},8651:(t,e,n)=>{function o(t){return null!=t}function r(t){return"string"==typeof t?!!t:o(t)}n.d(e,{f:()=>r,r:()=>o})},3614:(t,e,n)=>{function o(t){if(!t.lngLat&&t.latLng){const e=t.latLng.lat,n=t.latLng.lng;t.lngLat=[n,e]}return t}n.d(e,{V:()=>o})},9788:(t,e,n)=>{function o(t){console.warn("DEPRECATED WARN: ".concat(t))}n.d(e,{v:()=>o})},1895:(t,e,n)=>{function o(t,e){e=e>85.06?85.06:e<-85.06?-85.06:e;const n=20037508.34*t/180;let o=Math.log(Math.tan((90+e)*Math.PI/360))/(Math.PI/180);return o=20037508.34*o/180,[n,o]}n.d(e,{Qm:()=>o})},584:(t,e,n)=>{function o(t){return{type:"Polygon",coordinates:[r(t)]}}function r(t){const e=[t[0],t[1]];return[e,[t[2],t[1]],[t[2],t[3]],[t[0],t[3]],e]}function i(t){return{type:"Feature",properties:{},geometry:o(t)}}n.d(e,{dy:()=>r,pv:()=>i})},5034:(t,e,n)=>{n.d(e,{W:()=>c});const o=6371,r=Math.PI/180,i=180/Math.PI;function c(t,e){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:6;const c=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:10)/o*i,a=c/Math.cos(e*r),l=[];for(let o=0;o<n+1;o++){const r=Math.PI*(o/(n/2)),i=t+a*Math.cos(r),s=e+c*Math.sin(r);l.push([i,s])}return l}},1827:(t,e,n)=>{function o(t,e,n){var o;return(n=null!==(o=n)&&void 0!==o?o:10)*(40075016.686*Math.abs(Math.cos(180*t[1]/Math.PI))/Math.pow(2,e+8))*5e-4}n.d(e,{P:()=>o})},3123:(t,e,n)=>{function o(t){return Array.isArray(t)&&4===t.length&&t.every((t=>"number"==typeof t))}n.d(e,{T:()=>o})},1088:(t,e,n)=>{function o(t,e){const n=e?Number("1e+"+e):1;return Math.round((t+Number.EPSILON)*n)/n}n.d(e,{N:()=>o})},5189:(t,e,n)=>{function o(t,e,n,o){if(t instanceof Array)return e instanceof Array&&e.sort().join("")===t.sort().join("");if(t instanceof Date)return e instanceof Date&&""+t==""+e;if(t instanceof Function){if(!(e instanceof Function))return!1}else if(t instanceof Object)return e instanceof Object&&(t===n?e===o:r(t,e));return t===e}function r(t,e){const n=Object.keys(t).sort(),r=Object.keys(e).sort();if(n.length!==r.length)return!1;if(n.join("")!==r.join(""))return!1;for(let i=0;i<n.length;i++)if(!o(t[n[i]],e[r[i]],t,e))return!1;return!0}n.d(e,{v:()=>r})},1102:(t,e,n)=>{function o(t){const e={};return Object.keys(t).forEach((n=>{t[n]instanceof Array||t[n]!==Object(t[n])?void 0!==t[n]&&(e[n]=t[n]):e[n]=o(t[n])})),e}n.d(e,{d:()=>o})},2476:(t,e,n)=>{function o(t){return"[object Object]"===Object.prototype.toString.call(t)}function r(t){return"[object Array]"===Object.prototype.toString.call(t)}n.d(e,{Kn:()=>o,kJ:()=>r})},77:(t,e,n)=>{function o(t){return t.replace(/([^:]\/)\/+/g,"$1")}n.d(e,{n:()=>o}),n(7267)}}]);
//# sourceMappingURL=main-d9378b794a578ff.js.map
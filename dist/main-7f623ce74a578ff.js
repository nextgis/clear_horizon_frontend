"use strict";(self.webpackChunkclear_horizon=self.webpackChunkclear_horizon||[]).push([[664],{3746:(e,t,r)=>{r.d(t,{Z:()=>f}),r(6265);var n=r(1102),i=r(8651),o=r(5189);function a(e,t,r){var n;return(t="symbol"==typeof(n=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t))?n:String(n))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class s{constructor(){var e;let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};a(this,"cache",[]);const r=null!==(e=t.namespace)&&void 0!==e?e:"default";return s.instance[r]?s.instance[r]:(s.instance[r]=this,this)}clean(){this.cache.length=0}all(){return this.cache}addFull(e,t,r){return this.add(e,t,r,!0)}add(e,t,r,o){const a=this._find(e,r);if(a)return a.value;{let a;a=t instanceof Function?t():t;const s=r&&JSON.parse(JSON.stringify((0,n.d)(r))),f={key:e,value:a,props:s,options:s};return o&&!(0,i.f)(a)?a:(this.cache.push(f),a instanceof Promise?(a.catch((t=>{throw this.delete(e,r),t})),o&&a.then((t=>((0,i.f)(t)||this.delete(e,r),t))),a):a)}}match(e,t){const r=this._find(e,t);if(r)return r.value}matchAll(e,t){return e?this.cache.filter((r=>this._filter(r,e,t))).map((e=>e.value)):this.cache.map((e=>e.value))}delete(e,t){let r=[];"string"==typeof e?r=this.cache.filter((r=>this._filter(r,e,t))):r.push(e);for(const e of r){const t=this.cache.indexOf(e);this.cache.splice(t,1)}}_find(e,t){return this.cache.find((r=>this._filter(r,e,t)))}_filter(e,t,r){if(e.key===t){if(r){const t=e.props||e.options;return(0,o.v)(t||{},(0,n.d)(r))}return!0}return!1}}a(s,"instance",{});const f=s},1521:(e,t,r)=>{r.d(t,{Z:()=>u}),r(6265),r(6409);class n extends Error{constructor(){var e,t,r,i;super(),e=this,r="CancelError",(t="symbol"==typeof(i=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t="name"))?i:String(i))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,Object.setPrototypeOf(this,n.prototype)}}class i{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};var t,r,n,i;this.options=e,t=this,r="_promises",n=new Map,(r="symbol"==typeof(i=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r))?i:String(i))in t?Object.defineProperty(t,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[r]=n}get isLoaded(){return this._promises.size>0}remove(e){this._promises.has(e)&&(this._promises.delete(e),this._onStop())}get(e){return this._promises.get(e)}add(e,t){const r=t||e,n=this._promises.get(r);return this.options.onStart&&!this.isLoaded&&this.options.onStart(),n||(this._promises.set(r,e),e.finally((()=>{this.remove(r)})),e)}abort(){this.isLoaded&&(this._promises.forEach((e=>{e.cancel&&e.cancel()})),this._promises.clear(),this._onStop())}waitFunc(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";t=t||e.name;return this.get(t)||this.add(e(),t)}WaitForMe(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";const t=this.get.bind(this),r=this.add.bind(this);return function(n,i,o){const a=o.value;return e=e||i,o.value=function(){const n=t(e);if(n)return n;for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r(a.apply(this,o),e)},o}}GetOrCreateDecorator(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return this.WaitForMe(e)}_onStop(){this.options.onStop&&!this.isLoaded&&this.options.onStop()}}class o extends Error{constructor(){var e,t,r,n;super(),e=this,r="TimeoutError",(t="symbol"==typeof(n=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t="name"))?n:String(n))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,Object.setPrototypeOf(this,o.prototype)}}let a;function s(e,t,r){var n;return(t="symbol"==typeof(n=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t))?n:String(n))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const f=(e,t,r,n)=>{try{e(r(n))}catch(e){t(e)}};let c=0;a=Symbol.toStringTag;class l{constructor(e,t){s(this,a,void 0),s(this,"id",c++),s(this,"_isCanceled",!1),s(this,"_isPending",!0),s(this,"_promise",void 0),s(this,"_cancelPromise",void 0),s(this,"_cancelHandlers",[]),s(this,"_setCanceledCallback",void 0),s(this,"_parentPromise",void 0),s(this,"_children",[]),this._cancelPromise=new Promise(((e,t)=>{this._setCanceledCallback=t=>e(t||new n)}));const r=[this._cancelPromise,new Promise(((t,r)=>e((e=>{e instanceof l?this.attach(e):this._isPending=!1,t(e)}),(e=>{this._isPending=!1,r(e)}),(e=>{if(!this._isPending)throw new Error("The `onCancel` handler was attached after the promise settled.");this._cancelHandlers.push(e)}))))];t&&r.push(new Promise(((e,r)=>{setTimeout((()=>{if(this._isPending)try{this.cancel()}finally{r(new o)}}),t)}))),this._promise=Promise.race(r)}static createControl(e){return new i(e)}static resolve(e){return new l((t=>t(e)))}static reject(e){return new l(((t,r)=>r(e)))}static all(e){return new l(((t,r)=>{Promise.all(e).then(t).catch(r)})).catch((t=>{if(t instanceof this.CancelError)for(const t of e)"cancel"in t&&t.cancel();throw t}))}attach(e){this._isCanceled?e.cancel():this._children.push(e)}then(e,t){const r=new l(((r,n)=>{if(this._promise){const i=e=>{t?f(r,n,t,e):n(e)};this._promise.then((t=>{this._isCanceled?i(t):e?f(r,n,e,t):r(t)}),i)}}));return r._parentPromise=this,this._children.push(r),r}catch(e){return this._isCanceled&&e&&e(new n),this.then(void 0,e)}finally(e){return this._promise?this._promise.finally(e):this._isCanceled?Promise.reject(new n):Promise.reject(e)}cancel(){if(this._isCanceled||!this._isPending)return this;this._isCanceled=!0;const e=this._getTopParent();if(e&&e.cancel(),this._children&&this._children.forEach((e=>e.cancel())),this._isPending){if(this._cancelHandlers.length)try{for(const e of this._cancelHandlers)e()}catch(e){}this._setCanceledCallback&&this._setCanceledCallback()}return this._destroy(),this}_getTopParent(){let e=this._parentPromise,t=!!e;for(;t;)e&&e._parentPromise?(e=e._parentPromise,t=!!e):t=!1;return e}_destroy(){this._setCanceledCallback=void 0,this._cancelPromise=void 0,this._promise=void 0}}s(l,"CancelError",n),s(l,"TimeoutError",o),s(l,"PromiseControl",i),Object.setPrototypeOf(l.prototype,Promise.prototype);const u=l},9807:(e,t,r)=>{function n(e){return(t,r)=>{const n=t.map((e=>e()));return e(n,r)}}r.d(t,{k:()=>m,U:()=>b}),r(6265);const i={"!":n((function(e){let[t]=e;return!t})),"!=":n((function(e){let[t,r]=e;return t!==r})),"<":n((function(e){let[t,r]=e;return t<r})),"<=":n((function(e){let[t,r]=e;return t<=r})),"==":n((function(e){let[t,r]=e;return t===r})),">":n((function(e){let[t,r]=e;return t>r})),">=":n((function(e){let[t,r]=e;return t>=r})),coalesce:e=>{for(let t=0;t<e.length;t++){const r=e[t]();if(null!=r)return r}return null},all:e=>{for(let t=0;t<e.length;t++)if(!e[t]())return!1;return!0},any:e=>{for(let t=0;t<e.length;t++)if(e[t]())return!0;return!1},case:e=>{if(e.length<2)throw new Error('The "case" function requires at least a condition and a corresponding output.');if(e.length%2==0)throw new Error("Missing a fallback value or unmatched condition-output pair.");for(let t=0;t<e.length-1;t+=2){const r=e[t](),n=e[t+1]();if(r)return n}return(0,e[e.length-1])()},match:e=>{const[t,...r]=e,n=t(),i=r.splice(-1,r.length%2)[0];for(let e=0;e<r.length-1;e+=2)if(r[e]()===n)return r[e+1]();return i()}},o={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4","indianred ":"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function a(e){if("string"==typeof(t=e)&&/^#([A-Fa-f0-9]{3}){1,2}$/.test(t))return s(e);var t,r;if("string"==typeof(r=e)&&r in o)return s(o[e]);if(function(e){return"string"==typeof e&&/^rgb(a?)\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)(?:\s*,\s*([01](?:\.\d+)?))?\s*\)$/.test(e)}(e))return function(e){let t;if(t=e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/))return[parseInt(t[1],10),parseInt(t[2],10),parseInt(t[3],10)];if(t=e.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/))return[parseInt(t[1],10),parseInt(t[2],10),parseInt(t[3],10),parseFloat(t[4])];throw new Error("The '".concat(e,"' Is not valid rgb"))}(e);if(function(e){if("object"==typeof e&&null!==e){const t="r"in e&&"g"in e&&"b"in e,r=!("a"in e)||"number"==typeof e.a&&e.a>=0&&e.a<=1;return t&&r}return!1}(e))return function(e){let{r:t,g:r,b:n,a:i}=e;return[t,r,n,...void 0!==i?[i]:[]]}(e);throw new Error("The '".concat(e,"' cannot be converted to color"))}function s(e){let t;if(t=/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/.exec(e))return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)];if(t=/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/.exec(e))return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16),parseInt(t[4]+t[4],16)/255];if(t=/^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/.exec(e))return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)];if(t=/^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/.exec(e))return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16),parseInt(t[4],16)/255];throw new Error("The '".concat(e,"' Is not valid hex"))}function f(e,t,r,n,i){if("number"==typeof r&&"number"==typeof i)return r+(e-t)/(n-t)*(i-r);try{const s=a(r),c=a(i);return o=s.map(((r,i)=>Math.ceil(f(e,t,r,n,c[i])))),"rgb(".concat(o.join(","),")")}catch(e){console.log(e)}var o;throw new Error("Unsupported output type for linear interpolation.")}const c={step:e=>{const[t,r,...n]=e,i=t();if("number"!=typeof i)return r();for(let e=0;e<n.length-2;e+=2){const t=n[e](),r=n[e+1](),o=n[e+2]();if(i>=t&&i<o)return r}return i>=n[n.length-2]()?n[n.length-1]():r()},interpolate:e=>{let[t,r,...n]=e;if(n.length<2)throw new Error("At least two stops are required");if(n.length<2||n.length%2!=0)throw new Error("Invalid stops provided.");const i=r();if("number"!=typeof i)throw new Error("Input must be a number.");const o=t();for(let e=0;e<n.length-2;e+=2){const t=n[e](),r=n[e+1](),a=n[e+2](),s=n[e+3]();if(i>=t&&i<=a&&"linear"===o[0])return f(i,t,r,a,s)}throw new Error("Invalid interpolation type.")}},l={get:n((function(e,t){let[r,n]=e;const i=n||t;return i&&"object"==typeof i&&r in i?i[r]:null})),length:n((e=>{let[t]=e;if("string"==typeof t||Array.isArray(t))return t.length})),at:n((function(e){let[t,r]=e;return r[t]})),has:n((function(e,t){let[r,n]=e;const i=n||t;return!(!i||"object"!=typeof i||!(r in i))})),in:n((function(e){let[t,r]=e;if("string"==typeof r)return r.includes(String(t));if(Array.isArray(r))return r.includes(t);throw new Error("Invalid input type for 'in'. Expected string or array, got ".concat(typeof r,"."))})),"index-of":n((function(e){let[t,r,n]=e;if("string"==typeof r)return r.indexOf(String(t),n);if(Array.isArray(r))return r.indexOf(t,n);throw new Error("Invalid input type for 'index-of'. Expected string or array, got ".concat(typeof r,"."))})),slice:n((function(e){const[t,r,n]=e;if("string"==typeof t)return t.slice(r,n);if(Array.isArray(t))return t.slice(r,n);throw new Error("Invalid input type for 'slice'. Expected string or array, got ".concat(typeof t,"."))}))},u={"+":n((e=>e.reduce(((e,t)=>e+t),0))),"-":n((e=>e.reduce(((e,t)=>e-t)))),"*":n((e=>e.reduce(((e,t)=>e*t),1))),"/":n((e=>e.reduce(((e,t)=>e/t)))),"%":n((e=>e[0]%e[1])),"^":n((e=>Math.pow(e[0],e[1]))),abs:n((e=>Math.abs(e[0]))),acos:n((e=>Math.acos(e[0]))),asin:n((e=>Math.asin(e[0]))),atan:n((e=>Math.atan(e[0]))),ceil:n((e=>Math.ceil(e[0]))),cos:n((e=>Math.cos(e[0]))),e:()=>Math.E,floor:n((e=>Math.floor(e[0]))),ln:n((e=>Math.log(e[0]))),ln2:()=>Math.LN2,log10:n((e=>Math.log10(e[0]))),log2:n((e=>Math.log2(e[0]))),max:n((e=>Math.max(...e))),min:n((e=>Math.min(...e))),pi:()=>Math.PI,round:n((e=>Math.round(e[0]))),sin:n((e=>Math.sin(e[0]))),sqrt:n((e=>Math.sqrt(e[0]))),tan:n((e=>Math.tan(e[0])))},h={concat:n((e=>e.reduce(((e,t)=>String(e)+String(t)),""))),downcase:n((e=>String(e[0]).toLowerCase())),upcase:n((e=>String(e[0]).toUpperCase()))},d=(e,t,r)=>{try{const n=e(t,r);if(void 0!==n)return n}catch{}};function p(e){return(t,r)=>{for(const n of t){const t=d(e,n,r);if(void 0!==t)return t}throw new Error("Received a mismatched type")}}function b(e){if(Array.isArray(e)){const[t,...r]=e;return"string"==typeof t&&"literal"!==t&&t in g&&r.length>0}return!1}const g={...u,array:n((e=>{const[t,r,n]=e;let i,o,a;if("string"==typeof t&&["string","number","boolean"].includes(t)?(i=t,"number"==typeof r?(o=r,a=n):a=r):Array.isArray(t)&&(a=t),!Array.isArray(a))throw new Error("Expected an array");if(i&&!a.every((e=>typeof e===i)))throw new Error("Expected all items in array to be of type ".concat(i));if(o&&a.length!==o)throw new Error("Expected array of length ".concat(o));return a})),boolean:n(p((e=>"boolean"==typeof e?e:void 0))),literal:n((e=>{let[t]=e;return t})),number:n(p((e=>"number"==typeof e?e:void 0))),object:n(p((e=>null===e||"object"!=typeof e||Array.isArray(e)?void 0:e))),string:n(p((e=>"string"==typeof e?e:void 0))),"to-boolean":n(p(Boolean)),"to-number":n(p(Number)),"to-string":n(p(String)),typeof:n((e=>{let[t]=e;return function(e){if(null===e)return"null";switch(typeof e){case"string":return"string";case"number":return"number";case"boolean":return"boolean";case"object":if(Array.isArray(e)){let t="value";return e.every((e=>"number"==typeof e))?t="number":e.every((e=>"string"==typeof e))?t="string":e.every((e=>"boolean"==typeof e))&&(t="boolean"),"array<".concat(t,", ").concat(e.length,">")}return"object";default:return"undefined"}}(t)})),...h,...l,...i,...c};function m(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const[r,...n]=e,i=g[r];if(i)return i(n.map((e=>()=>b(e)?m(e,t):e)),t);throw new Error('Expression "'.concat(r,'" is not supported.'))}}}]);
//# sourceMappingURL=main-7f623ce74a578ff.js.map
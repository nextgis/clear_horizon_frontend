(self.webpackChunkclear_horizon=self.webpackChunkclear_horizon||[]).push([[971],{17187:function(e){"use strict";var t,n="object"==typeof Reflect?Reflect:null,i=n&&"function"==typeof n.apply?n.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};t=n&&"function"==typeof n.ownKeys?n.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var o=Number.isNaN||function(e){return e!=e};function r(){r.init.call(this)}e.exports=r,e.exports.once=function(e,t){return new Promise((function(n,i){function o(n){e.removeListener(t,r),i(n)}function r(){"function"==typeof e.removeListener&&e.removeListener("error",o),n([].slice.call(arguments))}d(e,t,r,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&d(e,"error",t,{once:!0})}(e,o)}))},r.EventEmitter=r,r.prototype._events=void 0,r.prototype._eventsCount=0,r.prototype._maxListeners=void 0;var s=10;function f(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function u(e){return void 0===e._maxListeners?r.defaultMaxListeners:e._maxListeners}function a(e,t,n,i){var o,r,s,a;if(f(n),void 0===(r=e._events)?(r=e._events=Object.create(null),e._eventsCount=0):(void 0!==r.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),r=e._events),s=r[t]),void 0===s)s=r[t]=n,++e._eventsCount;else if("function"==typeof s?s=r[t]=i?[n,s]:[s,n]:i?s.unshift(n):s.push(n),(o=u(e))>0&&s.length>o&&!s.warned){s.warned=!0;var h=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");h.name="MaxListenersExceededWarning",h.emitter=e,h.type=t,h.count=s.length,a=h,console&&console.warn&&console.warn(a)}return e}function h(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function l(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},o=h.bind(i);return o.listener=n,i.wrapFn=o,o}function c(e,t,n){var i=e._events;if(void 0===i)return[];var o=i[t];return void 0===o?[]:"function"==typeof o?n?[o.listener||o]:[o]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(o):p(o,o.length)}function v(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function p(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}function d(e,t,n,i){if("function"==typeof e.on)i.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function o(r){i.once&&e.removeEventListener(t,o),n(r)}))}}Object.defineProperty(r,"defaultMaxListeners",{enumerable:!0,get:function(){return s},set:function(e){if("number"!=typeof e||e<0||o(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");s=e}}),r.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},r.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||o(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},r.prototype.getMaxListeners=function(){return u(this)},r.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var o="error"===e,r=this._events;if(void 0!==r)o=o&&void 0===r.error;else if(!o)return!1;if(o){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var f=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw f.context=s,f}var u=r[e];if(void 0===u)return!1;if("function"==typeof u)i(u,this,t);else{var a=u.length,h=p(u,a);for(n=0;n<a;++n)i(h[n],this,t)}return!0},r.prototype.addListener=function(e,t){return a(this,e,t,!1)},r.prototype.on=r.prototype.addListener,r.prototype.prependListener=function(e,t){return a(this,e,t,!0)},r.prototype.once=function(e,t){return f(t),this.on(e,l(this,e,t)),this},r.prototype.prependOnceListener=function(e,t){return f(t),this.prependListener(e,l(this,e,t)),this},r.prototype.removeListener=function(e,t){var n,i,o,r,s;if(f(t),void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(o=-1,r=n.length-1;r>=0;r--)if(n[r]===t||n[r].listener===t){s=n[r].listener,o=r;break}if(o<0)return this;0===o?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,o),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,s||t)}return this},r.prototype.off=r.prototype.removeListener,r.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var o,r=Object.keys(n);for(i=0;i<r.length;++i)"removeListener"!==(o=r[i])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},r.prototype.listeners=function(e){return c(this,e,!0)},r.prototype.rawListeners=function(e){return c(this,e,!1)},r.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):v.call(e,t)},r.prototype.listenerCount=v,r.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}},86273:function(e,t,n){e.exports=function(e){"use strict";var t=e.Control.extend({includes:e.Evented?e.Evented.prototype:e.Mixin.Events,options:{closeButton:!0,position:"left",autoPan:!0},initialize:function(t,n){var i;e.setOptions(this,n),"string"==typeof t?i=e.DomUtil.get(t):t instanceof HTMLElement&&(i=t),this._contentContainer=i,i.parentNode&&i.parentNode.removeChild(i);var o="leaflet-",r=this._container=e.DomUtil.create("div",o+"sidebar "+this.options.position);e.DomUtil.addClass(i,o+"control"),r.appendChild(i),this.options.closeButton&&((this._closeButton=e.DomUtil.create("a","close",r)).innerHTML="&times;")},addTo:function(t){var n=this._container,i=this._contentContainer;if(this.options.closeButton){var o=this._closeButton;e.DomEvent.on(o,"click",this.hide,this)}e.DomEvent.on(n,"transitionend",this._handleTransitionEvent,this).on(n,"webkitTransitionEnd",this._handleTransitionEvent,this);var r=t._controlContainer;r.insertBefore(n,r.firstChild),this._map=t;var s=e.DomEvent.stopPropagation,f=e.DomEvent._fakeStop||s;return e.DomEvent.on(i,"contextmenu",s).on(i,"click",f).on(i,"mousedown",s).on(i,"touchstart",s).on(i,"dblclick",f).on(i,"mousewheel",s).on(i,"MozMousePixelScroll",s),this},removeFrom:function(t){this.hide();var n=this._container,i=this._contentContainer;t._controlContainer.removeChild(n),this._map=null;var o=e.DomEvent.stopPropagation,r=e.DomEvent._fakeStop||o;if(e.DomEvent.off(i,"contextmenu",o).off(i,"click",r).off(i,"mousedown",o).off(i,"touchstart",o).off(i,"dblclick",r).off(i,"mousewheel",o).off(i,"MozMousePixelScroll",o),e.DomEvent.off(n,"transitionend",this._handleTransitionEvent,this).off(n,"webkitTransitionEnd",this._handleTransitionEvent,this),this._closeButton&&this._close){var s=this._closeButton;e.DomEvent.off(s,"click",this.hide,this)}return this},isVisible:function(){return e.DomUtil.hasClass(this._container,"visible")},show:function(){this.isVisible()||(e.DomUtil.addClass(this._container,"visible"),this.options.autoPan&&this._map.panBy([-this.getOffset()/2,0],{duration:.5}),this.fire("show"))},hide:function(t){this.isVisible()&&(e.DomUtil.removeClass(this._container,"visible"),this.options.autoPan&&this._map.panBy([this.getOffset()/2,0],{duration:.5}),this.fire("hide")),t&&e.DomEvent.stopPropagation(t)},toggle:function(){this.isVisible()?this.hide():this.show()},getContainer:function(){return this._contentContainer},getCloseButton:function(){return this._closeButton},setContent:function(e){var t=this.getContainer();if("string"==typeof e)t.innerHTML=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(e)}return this},getOffset:function(){return"right"===this.options.position?-this._container.offsetWidth:this._container.offsetWidth},_handleTransitionEvent:function(e){"left"!=e.propertyName&&"right"!=e.propertyName||this.fire(this.isVisible()?"shown":"hidden")}});return e.Control.Sidebar=t,e.control.sidebar=function(e,n){return new t(e,n)},t}(n(45243))}}]);
//# sourceMappingURL=971a224d2b.js.map
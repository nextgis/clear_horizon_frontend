(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{37:function(t,e,r){"use strict";var n=r(55);function o(t){for(var e,r={},n=0;n<t.length;n++)r[t[n]]=1+(r[t[n]]||0);for(var o in r){var i=void 0!==e?r[e]:0;r[o]>(i||0)&&(e=o)}return e}function i(t){var e;if("FeatureCollection"===t.type)e=o(t.features.map((function(t){return t.geometry.type})));else if("GeometryCollection"===t.type){e=o(t.geometries.map((function(t){return t.type})))}else e="Feature"===t.type?t.geometry.type:t.type;return e}var a={Point:"circle",LineString:"line",MultiPoint:"circle",Polygon:"fill",MultiLineString:"line",MultiPolygon:"fill"};function s(t){if(t.data){var e=a[i(t.data)],r=t.paint;r&&Object(n.a)(r)&&(r.type=r.type?r.type:"fill"===e||"line"===e?"path":"html"in r||"className"in r?"icon":e),t.type=t.type||e}return t}var u,c=r(41),p=r(29),l=r(17),h=function(){this.backspace=8,this.tab=9,this.enter=13,this.shift=16,this.ctrl=17,this.alt=18,this["pause/break"]=19,this.caps_lock=20,this.escape=27,this.page_up=33,this.page_down=34,this.end=35,this.home=36,this.left_arrow=37,this.up_arrow=38,this.right_arrow=39,this.down_arrow=40,this.insert=45,this.delete=46,this.left_window_key=91,this.right_window_key=92,this.select_key=93,this.numpad_0=96,this.numpad_1=97,this.numpad_2=98,this.numpad_3=99,this.numpad_4=100,this.numpad_5=101,this.numpad_6=102,this.numpad_7=103,this.numpad_8=104,this.numpad_9=105,this.multiply=106,this.add=107,this.subtract=109,this.decimal_point=110,this.divide=111,this.f1=112,this.f2=113,this.f3=114,this.f4=115,this.f5=116,this.f6=117,this.f7=118,this.f8=119,this.f9=120,this.f10=121,this.f11=122,this.f12=123,this.num_lock=144,this.scroll_lock=145,this["semi-colon"]=186,this.equal_sign=187,this[","]=188,this["-"]=189,this["."]=190,this["/"]=191,this["`"]=192,this["["]=219,this["\\"]=220,this["]"]=221,this["'"]=222},f=function(){function t(){this.keyCodeAlias=new h,this.keys={},this._windowOnFocus=this.windowOnFocus.bind(this),this._keysPressed=this.keysPressed.bind(this),this._keysReleased=this.keysReleased.bind(this),this.addKeyboardEventsListener()}return t.prototype.pressed=function(t){var e=this.keyCodeAlias[t];return!!e&&this.keys[e]},t.prototype.addKeyboardEventsListener=function(){window.addEventListener("focus",this._windowOnFocus,!1),window.addEventListener("keydown",this._keysPressed,!1),window.addEventListener("keyup",this._keysReleased,!1)},t.prototype.removeKeyboardEventsListener=function(){window.removeEventListener("focus",this._windowOnFocus,!1),window.removeEventListener("keydown",this._keysPressed,!1),window.removeEventListener("keyup",this._keysReleased,!1)},t.prototype.keysPressed=function(t){t.stopPropagation(),this.keys[t.keyCode]||(this.keys[t.keyCode]=!0)},t.prototype.keysReleased=function(t){t.stopPropagation(),this.keys[t.keyCode]=!1},t.prototype.windowOnFocus=function(){this.keys={}},t}(),y=function(){function t(t,e){this.webMap=t,e&&(e.value&&this.setValue(e.value),e.name&&(this.name=e.name),e.event&&(this.event=e.event))}return t.prototype.getValue=function(){return this.value},t.prototype.setValue=function(t){this.value=t},t}(),d=(u=function(t,e){return(u=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}u(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),v=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.name="center",e.event="moveend",e}return d(e,t),e.prototype.getValue=function(){return this.webMap.getCenter()},e.prototype.setValue=function(t){this.webMap.setCenter(t)},e.prototype.toString=function(t){var e=t.map((function(t){return t.toFixed(5)}));return e[0]+"_"+e[1]},e.prototype.parse=function(t){return t.split("_").map(Number)},e}(y),m=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),b=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.name="zoom",e.event="zoomend",e}return m(e,t),e.prototype.getValue=function(){var t=this.webMap.getZoom();return void 0!==t?Math.round(t):void 0},e.prototype.setValue=function(t){this.webMap.setZoom(t)},e.prototype.toString=function(t){return String(t)},e.prototype.parse=function(t){return Number(t)},e}(y);function L(t,e){var r=document.createElement("div"),n=!1;e.getStatus?n=e.getStatus():e.status&&(n=e.status);var o=e.title||"",i=e.html;function a(){o&&(r.title="string"==typeof o?o:n?o.on:o.off,r.setAttribute("aria-label",r.title))}function s(t){t instanceof HTMLElement?(r.innerHTML="",r.appendChild(t)):"string"==typeof t&&(r.innerHTML=t)}function u(){i&&("string"==typeof i||i instanceof HTMLElement?s(i):s(n?i.on:i.off),r.setAttribute("aria-label",r.title))}function c(t,e){t.split(" ").forEach((function(t){e?r.classList.add(t):r.classList.remove(t)}))}function p(){e.addClassOn&&c(e.addClassOn,n),e.addClassOff&&c(e.addClassOff,!n)}a(),u(),e.addClass&&c(e.addClass,!0),p();var l=function(t){void 0!==t&&(n=t),u(),a(),p()},h=function(t){if(n=void 0!==t?t:!n,e.onClick){var r=e.onClick(n);Promise.resolve(r).then((function(){return l()})).catch((function(){return n=!n}))}else l()},f=t({html:r,onClick:h});return f.onClick=h,f.changeStatus=l,f}function g(t){return function(e,r,n){var o=n.value;return n.value=function(){for(var e=this,r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];return new Promise((function(n,i){var a=function(){var t=o.apply(e,r);t&&t.then?t.then(n).catch(i):n(t)};e.getEventStatus(t)?a():e.emitter.once(t,(function(){a()}))}))},n}}function _(t){var e=[t[0],t[1]];return{type:"Feature",properties:{},geometry:{type:"Polygon",coordinates:[[e,[t[2],t[1]],[t[2],t[3]],[t[0],t[3]],e]]}}}var w=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function a(t){try{u(n.next(t))}catch(t){i(t)}}function s(t){try{u(n.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(a,s)}u((n=n.apply(t,e||[])).next())}))},A=function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},k={minZoom:0,maxZoom:21,paint:{color:"blue",opacity:1,radius:8,weight:1},selectedPaint:{color:"darkblue",opacity:1,radius:12,weight:1}},C=function(){function t(e){this.options=k,this.emitter=new p.EventEmitter,this.keys=t.keys,this.runtimeParams=[],this.getPaintFunctions=t.getPaintFunctions,this.mapState=[v,b],this._initMapState={},this._mapState=[],this._eventsStatus={},this._mapEvents={},this.mapAdapter=e.mapAdapter,this._starterKits=e.starterKits||[],e.mapOptions&&(this.options=Object(l.d)(k||{},e.mapOptions)),e.runtimeParams&&(this.runtimeParams=e.runtimeParams),this._addEventsListeners(),e.create&&this.create(this.options)}return t.prototype.create=function(t){return w(this,void 0,void 0,(function(){return A(this,(function(e){switch(e.label){case 0:return this.getEventStatus("create")?[3,3]:(this.options=Object(l.d)(k||{},t),[4,this._setInitMapState(this.mapState)]);case 1:return e.sent(),[4,this._setupMap()];case 2:e.sent(),this._emitStatusEvent("create",this),e.label=3;case 3:return[2,this]}}))}))},t.prototype.setRuntimeParams=function(t){this.runtimeParams.push(t)},t.prototype.destroy=function(){this._removeEventsListeners(),function(t){for(var e in t)delete t[e]}(this._emitStatusEvent),this.mapAdapter.destroy&&this.mapAdapter.destroy()},t.prototype.getState=function(){var t={};return this._mapState.forEach((function(e){t[e.name]=e.getValue()})),t},t.prototype.getRuntimeParams=function(){var t=this,e={};return this._mapState.forEach((function(r){for(var n=0,o=t.runtimeParams;n<o.length;n++){var i=o[n].get(r.name);if(void 0!==i){e[r.name]=r.parse(i);break}}})),e},t.prototype.getContainer=function(){if(this.mapAdapter.getContainer)return this.mapAdapter.getContainer();if(this.options.target){if(this.options.target instanceof HTMLElement)return this.options.target;if("string"==typeof this.options.target){var t=document.getElementById(this.options.target);if(t)return t}}},t.prototype.setCursor=function(t){this.mapAdapter.setCursor&&this.mapAdapter.setCursor(t)},t.prototype.setCenter=function(t){return this.mapAdapter.setCenter(t),this},t.prototype.getCenter=function(){return this.mapAdapter.getCenter()},t.prototype.getBounds=function(){if(this.mapAdapter.getBounds)return this.mapAdapter.getBounds()},t.prototype.getBoundsPolygon=function(){var t=this.getBounds();if(t)return _(t)},t.prototype.setZoom=function(t){return this.mapAdapter.setZoom(t),this},t.prototype.getZoom=function(){return this.mapAdapter.getZoom()},t.prototype.setView=function(t,e){this.mapAdapter.setView&&t&&e?this.mapAdapter.setView(t,e):(t&&this.mapAdapter.setCenter(t),e&&this.mapAdapter.setZoom(e))},t.prototype.fitBounds=function(t,e){return this.mapAdapter.fitBounds(t,e),this},t.prototype.getEventStatus=function(t){var e=t,r=this._eventsStatus[e];return null!=r&&r},t.prototype.onLoad=function(t){var e=this;return void 0===t&&(t="create"),new Promise((function(r){e.getEventStatus(t)?r(e):e.emitter.once(t,(function(){r(e)}))}))},t.prototype.onMapLoad=function(t){var e=this;return new Promise((function(r){var n,o=function(){var n=e.mapAdapter;t&&t(n),n&&r(n)},i=null===(n=e.mapAdapter.isLoaded)||void 0===n||n;e.mapAdapter.map&&i?o():e.mapAdapter.emitter.once("create",(function(){o()}))}))},t.prototype.getLayerAdapters=function(){return this.mapAdapter.layerAdapters},t.prototype.getLayerAdapter=function(t){return this.mapAdapter.layerAdapters[t]},t.prototype.locate=function(t,e){if(this.mapAdapter&&this.mapAdapter.locate)return this.mapAdapter.locate(t,e);return{stop:function(){return{}}}},t.prototype._emitStatusEvent=function(t,e){var r=t;this._eventsStatus[r]=!0,this.emitter.emit(r,e)},t.prototype._addLayerProviders=function(){return w(this,void 0,void 0,(function(){return A(this,(function(t){return[2]}))}))},t.prototype._onLoadSync=function(){return w(this,void 0,void 0,(function(){return A(this,(function(t){return[2]}))}))},t.prototype._setupMap=function(){return w(this,void 0,void 0,(function(){return A(this,(function(t){switch(t.label){case 0:return[4,this.mapAdapter.create(this.options)];case 1:return t.sent(),this._zoomToInitialExtent(),[4,this._addLayerProviders()];case 2:return t.sent(),[4,this._onLoadSync()];case 3:return t.sent(),this._emitStatusEvent("build-map",this.mapAdapter),[2,this]}}))}))},t.prototype._zoomToInitialExtent=function(){var t=this.options,e=t.center,r=t.zoom,n=t.bounds;this._extent?this.fitBounds(this._extent):e&&r?this.setView(e,r):n&&this.fitBounds(n)},t.prototype._setInitMapState=function(t){for(var e=0,r=t;e<r.length;e++){var n=new(0,r[e])(this);this._mapState.push(n);for(var o=0,i=this.runtimeParams;o<i.length;o++){var a=i[o].get(n.name);if(void 0!==a){var s=n.parse(a);this._initMapState[n.name]=s,this.options[n.name]=s;break}}}},t.prototype._addEventsListeners=function(){var t=this;["click","zoomstart","zoom","zoomend","movestart","move","moveend"].forEach((function(e){t._mapEvents[e]=function(r){if(t.runtimeParams.length){var n=t._mapState.find((function(t){return t.event===e}));if(n){var o=n.toString(n.getValue());t.runtimeParams.forEach((function(t){t.set(n.name,o)}))}}t._eventsStatus&&t.emitter.emit(e,r)},t.mapAdapter.emitter.on(e,t._mapEvents[e])}))},t.prototype._removeEventsListeners=function(){var t=this;Object.entries(this._mapEvents).forEach((function(e){var r=e[0],n=e[1];t.mapAdapter.emitter.off(r,n)}))},t.keys=new f,t.utils={detectGeometryType:i,findMostFrequentGeomType:o,updateGeoJsonAdapterOptions:s,propertiesFilter:c.c,createToggleControl:L,getBoundsPolygon:_},t.decorators={onLoad:g},t}(),O=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),P=function(){return(P=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},S=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function a(t){try{u(n.next(t))}catch(t){i(t)}}function s(t){try{u(n.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(a,s)}u((n=n.apply(t,e||[])).next())}))},E=function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},x=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e._layersIdCounter=1,e._layersOrderCounter=1,e._baseLayers=[],e._layers={},e._selectedLayers=[],e}return O(e,t),e.prototype.fitLayer=function(t){return S(this,void 0,void 0,(function(){var e,r;return E(this,(function(n){switch(n.label){case 0:return(e=this.getLayer(t))&&e.getExtent?[4,e.getExtent()]:[3,2];case 1:(r=n.sent())&&this.fitBounds(r),n.label=2;case 2:return[2]}}))}))},e.prototype.isBaseLayer=function(t){var e=this.getLayer(t);if(e&&e.id)return-1!==this._baseLayers.indexOf(e.id)},e.prototype.getBaseLayers=function(){return this._baseLayers},e.prototype.getLayer=function(t){return"string"==typeof t?this._layers[t]:t},e.prototype.getLayerId=function(t){var e=this.getLayer(t);if(e&&e.options)return e.options.id;throw new Error("No id for layer")},e.prototype.getLayers=function(){return Object.keys(this._layers)},e.prototype.allLayers=function(){return this._layers},e.prototype.findLayer=function(t){for(var e in this._layers){var r=this._layers[e];if(t(r))return r}},e.prototype.isLayerVisible=function(t){var e=this.getLayer(t);return!(!e||void 0===e.options.visibility)&&e.options.visibility},e.prototype.addBaseLayer=function(t,e){return S(this,void 0,void 0,(function(){return E(this,(function(r){switch(r.label){case 0:return[4,this.addLayer(t,P(P({},e),{baseLayer:!0}))];case 1:return[2,r.sent()]}}))}))},e.prototype.addLayer=function(t,e,r){return S(this,void 0,void 0,(function(){var n,o,i,a,s,u,c,p,l,h,f,y,d,v;return E(this,(function(m){switch(m.label){case 0:return n=this._layersIdCounter++,o=void 0!==r?r:void 0!==e.order?e.order:this.reserveOrder(),"string"!=typeof t?[3,1]:(i=this.getLayerAdapter(t),[3,4]);case 1:return"function"!=typeof t?[3,2]:(i=t,[3,4]);case 2:return"then"in t?[4,t]:[3,4];case 3:i=m.sent(),m.label=4;case 4:return a=e,this._updateGeoJsonOptions(a),s=this.options,u=s.maxZoom,c=s.minZoom,e=P({id:String(n),order:o,maxZoom:u,minZoom:c},e),p=e.visibility,e.visibility=!1,e.baseLayer&&(e.order=0),this.options.onBeforeAddLayer&&(l=this.options.onBeforeAddLayer({options:e,adapter:i}))&&(l.options&&(e=l.options),l.adapter&&(i=l.adapter)),void 0===i?[3,10]:((h=new i(this.mapAdapter.map,e)).options.baseLayer&&(e.baseLayer=!0,e.order=0),(f=h.options.id)&&(this._layers[f]=h),this.emitter.emit("layer:preadd",h),[4,this.onMapLoad()]);case 5:return m.sent(),[4,h.addLayer(e)];case 6:return y=m.sent(),h.layer=y,h.id=h.options.id||String(n),h.order=h.options.order||o,(f=h.options.id)&&(a.filter&&this.filterLayer(h,a.filter),e.baseLayer&&this._baseLayers.push(f),this._layers[f]=h,p&&this.showLayer(f)),void 0!==(d=e.opacity)&&d<=1&&this.setLayerOpacity(h,d),e.fit&&h.getExtent?[4,h.getExtent()]:[3,9];case 7:return(v=m.sent())?[4,this.fitBounds(v)]:[3,9];case 8:m.sent(),m.label=9;case 9:return this.emitter.emit("layer:add",h),[2,h];case 10:return[2,Promise.reject("No adapter")]}}))}))},e.prototype.addLayerFromAsyncAdapter=function(t,e,r){return S(this,void 0,void 0,(function(){var n,o;return E(this,(function(i){switch(i.label){case 0:return n=r||void 0!==e.order?e.order:this.reserveOrder(),[4,t()];case 1:return(o=i.sent())?[2,this.addLayer(o,e,n)]:[2,Promise.reject("No adapter")]}}))}))},e.prototype.removeLayers=function(t){for(var e in this._layers){var r=!0;t&&(r=t(e,this._layers[e])),r&&(this.removeLayer(e),delete this._layers[e])}},e.prototype.reserveOrder=function(){return this._layersOrderCounter++},e.prototype.removeOverlays=function(){this.removeLayers((function(t,e){return!e.options.baseLayer}))},e.prototype.removeLayer=function(t){var e=this.getLayer(t),r=e&&this.getLayerId(e);if(e&&r){if(this.emitter.emit("layer:preremove",e),e.beforeRemove&&e.beforeRemove(),e.removeLayer?e.removeLayer():this.mapAdapter.removeLayer(e.layer),e.options&&e.options.baseLayer){var n=this._baseLayers.indexOf(r);n&&this._baseLayers.splice(n,1)}delete this._layers[r],this.emitter.emit("layer:remove",e)}},e.prototype.addGeoJsonLayer=function(t,e){return S(this,void 0,void 0,(function(){var r;return E(this,(function(n){switch(n.label){case 0:return(t=t||{}).multiselect=void 0!==t.multiselect&&t.multiselect,t.unselectOnSecondClick=void 0===t.unselectOnSecondClick||t.unselectOnSecondClick,e||(t=s(t)),t.paint=t.paint||{},[4,this.addLayer(e||"GEOJSON",t)];case 1:return r=n.sent(),this.showLayer(r),[2,r]}}))}))},e.prototype.showLayer=function(t,e){void 0===e&&(e={}),this.toggleLayer(t,!0,e)},e.prototype.hideLayer=function(t,e){void 0===e&&(e={}),this.toggleLayer(t,!1,e)},e.prototype.toggleLayer=function(t,e,r){var n=this;void 0===r&&(r={});var o=this.getLayer(t),i=o&&o.options.visibility,a=void 0!==e?e:!i,s=void 0!==r.silent&&r.silent,u=function(t,e){e.options.visibility=a;var r=a?"layer:preshow":"layer:prehide",o=a?"layer:show":"layer:hide";if(s||n.emitter.emit(r,e),a&&t){var i=e.options.baseLayer?0:e.options.order;if(0===i&&n._baseLayers.length){var u=n._baseLayers.find((function(t){return t!==e.id&&n.isLayerVisible(t)}));u&&n.hideLayer(u)}e.showLayer?e.showLayer.call(e,e.layer):n.mapAdapter.showLayer(e.layer),void 0!==i&&n.mapAdapter.setLayerOrder(e.layer,i,n._layers)}else e.hideLayer?e.hideLayer.call(e,e.layer):n.mapAdapter.hideLayer(e.layer);s||n.emitter.emit(o,e)};o&&o.options.visibility!==a&&(this.mapAdapter.map?u(this.mapAdapter,o):this.mapAdapter.emitter.once("create",(function(t){u(t.map,o)})))},e.prototype.updateLayer=function(t){var e=this.getLayer(t);e&&(e.updateLayer?e.updateLayer():this.isLayerVisible(e)&&(this.hideLayer(e,{silent:!0}),this.showLayer(e,{silent:!0})))},e.prototype.setLayerOpacity=function(t,e){var r=this.getLayer(t);r&&this.mapAdapter.setLayerOpacity&&r&&this.mapAdapter.setLayerOpacity(r.layer,e)},e.prototype.selectLayer=function(t,e){var r=this.getLayer(t);if(r){var n=r;n&&n.select&&n.select(e);var o=this.getLayerId(r);o&&this._selectedLayers.push(o)}},e.prototype.unSelectLayer=function(t,e){var r=this.getLayer(t);if(r){var n=r&&r;n.unselect&&n.unselect(e);var o=this.getLayerId(r);if(o){var i=this._selectedLayers.indexOf(o);-1!==i&&this._selectedLayers.splice(i,1)}}},e.prototype.filterLayer=function(t,e){var r=this.getLayer(t);return r.filter?r.filter(e):[]},e.prototype.propertiesFilter=function(t,e,r){var n=this.getLayer(t);n.propertiesFilter?n.propertiesFilter(e,r):n.filter&&this.filterLayer(n,(function(t){return!t.feature||!t.feature.properties||Object(c.c)(t.feature.properties,e)}))},e.prototype.removeLayerFilter=function(t){var e=this.getLayer(t);e.removeFilter?e.removeFilter():e.filter&&e.filter((function(){return!0}))},e.prototype.setLayerData=function(t,e){var r=this.getLayer(t);r&&(r.setData?r.setData(e):r.clearLayer&&r.addData&&(r.clearLayer(),r.addData(e)))},e.prototype.addLayerData=function(t,e){var r=this.getLayer(t);r.addData&&r.addData(e)},e.prototype.clearLayerData=function(t,e){var r=this.getLayer(t);r&&r.clearLayer&&r.clearLayer(e)},e.prototype.getAttributions=function(t){var e=[];for(var r in this._layers){var n=this._layers[r];if(!(void 0===t.onlyVisible||t.onlyVisible)||n.options.visibility){var o=n.options&&n.options.attribution;o&&e.push(o)}}return e},e.prototype.getActiveBaseLayer=function(){var t=this,e=this.getBaseLayers().find((function(e){return t.isLayerVisible(e)}));if(e)return this.getLayer(e)},e.prototype._onLayerClick=function(t){return S(this,void 0,void 0,(function(){return E(this,(function(e){return this.emitter.emit("layer:click",t),[2,Promise.resolve(t)]}))}))},e.prototype._updateGeoJsonOptions=function(t){var e=this,r=t.onLayerClick;t.onLayerClick=function(t){return r&&r(t),e._onLayerClick(t)},t.nativePaint||(this.options.paint&&(t.paint=Object(n.c)(t.paint||{},this.options.paint,this.getPaintFunctions)),t.selectedPaint&&this.options.selectedPaint&&(t.selectedPaint=Object(n.c)(t.selectedPaint,this.options.selectedPaint,this.getPaintFunctions)))},e}(C),B=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),M=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function a(t){try{u(n.next(t))}catch(t){i(t)}}function s(t){try{u(n.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(a,s)}u((n=n.apply(t,e||[])).next())}))},T=function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},F=function(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e,r=t[Symbol.asyncIterator];return r?r.call(t):(t="function"==typeof __values?__values(t):t[Symbol.iterator](),e={},n("next"),n("throw"),n("return"),e[Symbol.asyncIterator]=function(){return this},e);function n(r){e[r]=t[r]&&function(e){return new Promise((function(n,o){(function(t,e,r,n){Promise.resolve(n).then((function(e){t({value:e,done:r})}),e)})(n,o,(e=t[r](e)).done,e.value)}))}}},j=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return B(e,t),e.prototype.addControl=function(t,e,r){return M(this,void 0,void 0,(function(){var n,o;return T(this,(function(i){switch(i.label){case 0:return(n="string"==typeof t?this.getControl(t,r):t)?[4,n]:[3,2];case 1:return o=i.sent(),[2,this.mapAdapter.addControl(o,e)];case 2:return[2]}}))}))},e.prototype.createControl=function(t,e){return M(this,void 0,void 0,(function(){return T(this,(function(r){switch(r.label){case 0:return[4,this.onLoad("build-map")];case 1:return r.sent(),this.mapAdapter.createControl?[2,this.mapAdapter.createControl(t,e)]:[2]}}))}))},e.prototype.createButtonControl=function(t){return M(this,void 0,void 0,(function(){return T(this,(function(e){switch(e.label){case 0:return[4,this.onLoad("build-map")];case 1:return e.sent(),this.mapAdapter.createButtonControl?[2,this.mapAdapter.createButtonControl(t)]:[2]}}))}))},e.prototype.createToggleControl=function(t){return M(this,void 0,void 0,(function(){return T(this,(function(r){switch(r.label){case 0:return[4,this.onLoad("build-map")];case 1:return r.sent(),this.mapAdapter.createToggleControl?[2,this.mapAdapter.createToggleControl(t)]:this.mapAdapter.createButtonControl?[2,e.utils.createToggleControl(this.mapAdapter.createButtonControl,t)]:[2]}}))}))},e.prototype.removeControl=function(t){t.remove?t.remove():this.mapAdapter.removeControl&&this.mapAdapter.removeControl(t)},e.prototype.getControl=function(t,r){var n=this.mapAdapter.controlAdapters[t];if(n)return new n(r);var o=e.controls[t];return o?o(this,r):void 0},e.prototype._addLayerProviders=function(){var t,e,r,n;return M(this,void 0,void 0,(function(){var o,i,a,s,u,c,p,l,h,f,y;return T(this,(function(d){switch(d.label){case 0:d.trys.push([0,26,,27]),d.label=1;case 1:d.trys.push([1,19,20,25]),o=F(this._starterKits),d.label=2;case 2:return[4,o.next()];case 3:return(i=d.sent()).done?[3,18]:(a=i.value).getLayerAdapters?[4,a.getLayerAdapters.call(a)]:[3,17];case 4:if(!(s=d.sent()))return[3,17];d.label=5;case 5:d.trys.push([5,11,12,17]),u=F(s),d.label=6;case 6:return[4,u.next()];case 7:return(c=d.sent()).done?[3,10]:[4,(p=c.value).createAdapter(this)];case 8:(l=d.sent())&&(this.mapAdapter.layerAdapters[p.name]=l),d.label=9;case 9:return[3,6];case 10:return[3,17];case 11:return h=d.sent(),r={error:h},[3,17];case 12:return d.trys.push([12,,15,16]),c&&!c.done&&(n=u.return)?[4,n.call(u)]:[3,14];case 13:d.sent(),d.label=14;case 14:return[3,16];case 15:if(r)throw r.error;return[7];case 16:return[7];case 17:return[3,2];case 18:return[3,25];case 19:return f=d.sent(),t={error:f},[3,25];case 20:return d.trys.push([20,,23,24]),i&&!i.done&&(e=o.return)?[4,e.call(o)]:[3,22];case 21:d.sent(),d.label=22;case 22:return[3,24];case 23:if(t)throw t.error;return[7];case 24:return[7];case 25:return[3,27];case 26:throw y=d.sent(),new Error(y);case 27:return[2]}}))}))},e.prototype._onLoadSync=function(){var t,e;return M(this,void 0,void 0,(function(){var r,n,o,i,a;return T(this,(function(s){switch(s.label){case 0:s.trys.push([0,8,9,14]),r=F(this._starterKits),s.label=1;case 1:return[4,r.next()];case 2:if((n=s.sent()).done)return[3,7];if(!(o=n.value).onLoadSync)return[3,6];s.label=3;case 3:return s.trys.push([3,5,,6]),[4,o.onLoadSync.call(o,this)];case 4:return s.sent(),[3,6];case 5:return i=s.sent(),console.error(i),[3,6];case 6:return[3,1];case 7:return[3,14];case 8:return a=s.sent(),t={error:a},[3,14];case 9:return s.trys.push([9,,12,13]),n&&!n.done&&(e=r.return)?[4,e.call(r)]:[3,11];case 10:s.sent(),s.label=11;case 11:return[3,13];case 12:if(t)throw t.error;return[7];case 13:return[7];case 14:return[2]}}))}))},e.controls={CONTROL:function(t,e){return t.createControl(e.control,e.options)},BUTTON:function(t,e){return t.createButtonControl(e)},TOGGLE:function(t,e){return t.createToggleControl(e)}},e}(x);e.a=j}}]);
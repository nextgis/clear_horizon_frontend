(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{112:function(t,e,r){"use strict";var n=function(){return(n=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};function o(t,e,r){var i;if("function"==typeof t)return function(n){return o(t(n),e,r)};if("get-paint"===t.type){var a=function(t,e){if("function"==typeof t.from)return t.from(t.options);if("string"==typeof t.from&&e){var r=e[t.from];if(r)return r(t.options)}}(t,r);a&&(i=o(a,e,r))}else{if("icon"===t.type)return t;(i=n({},t)).fill=void 0===i.fill||i.fill,i.stroke=void 0!==i.stroke?i.stroke:!i.fill||!(!i.strokeColor&&!i.strokeOpacity)}if(i){if("function"==typeof i)return i;i=n(n({},e),i)}else i=n({},e);return"color"in i&&(i.strokeColor||(i.strokeColor=i.color),i.fillColor||(i.fillColor=i.color)),"opacity"in i&&(void 0===i.strokeOpacity&&(i.strokeOpacity=i.opacity),void 0===i.fillOpacity&&(i.fillOpacity=i.opacity)),i}var i=r(115),a=r(114);r.d(e,"a",(function(){return p}));var s=function(){return(s=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},u=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function a(t){try{u(n.next(t))}catch(t){i(t)}}function s(t){try{u(n.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(a,s)}u((n=n.apply(t,e||[])).next())}))},c=function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},p=function(){function t(){this._layersIds=1,this._baseLayers=[],this._layers={},this._selectedLayers=[]}return t.prototype.fitLayer=function(t){return u(this,void 0,void 0,(function(){var e,r;return c(this,(function(n){switch(n.label){case 0:return(e=this.getLayer(t))&&e.getExtent?[4,e.getExtent()]:[3,2];case 1:(r=n.sent())&&this.webMap.fitBounds(r),n.label=2;case 2:return[2]}}))}))},t.prototype.isBaseLayer=function(t){var e=this.getLayer(t);if(e&&e.id)return-1!==this._baseLayers.indexOf(e.id)},t.prototype.getBaseLayers=function(){return this._baseLayers},t.prototype.getLayer=function(t){return"string"==typeof t?this._layers[t]:t},t.prototype.getLayerId=function(t){var e=this.getLayer(t);if(e&&e.options)return e.options.id;throw new Error("No id for layer")},t.prototype.getLayers=function(){return Object.keys(this._layers)},t.prototype.findLayer=function(t){for(var e in this._layers){var r=this._layers[e];if(t(r))return r}},t.prototype.isLayerVisible=function(t){var e=this.getLayer(t);return!(!e||void 0===e.options.visibility)&&e.options.visibility},t.prototype.addBaseLayer=function(t,e){return u(this,void 0,Promise,(function(){return c(this,(function(r){switch(r.label){case 0:return[4,this.addLayer(t,s(s({},e),{baseLayer:!0}))];case 1:return[2,r.sent()]}}))}))},t.prototype.addLayer=function(t,e,r){return u(this,void 0,Promise,(function(){var n,o,i,a,u,p,l,f,h,y,d,v,m;return c(this,(function(c){switch(c.label){case 0:return n=r||this._layersIds++,"string"!=typeof t?[3,1]:(o=this.webMap.getLayerAdapter(t),[3,4]);case 1:return"function"!=typeof t?[3,2]:(o=t,[3,4]);case 2:return"then"in t?[4,t]:[3,4];case 3:o=c.sent(),c.label=4;case 4:return i=e,this._updateGeoJsonOptions(i),a=this.webMap.options,u=a.maxZoom,p=a.minZoom,e=s({id:String(n),order:n,maxZoom:u,minZoom:p},e),l=e.visibility,e.visibility=!1,e.baseLayer&&(e.order=0),this.webMap.options.onBeforeAddLayer&&(f=this.webMap.options.onBeforeAddLayer({options:e,adapter:o}))&&(f.options&&(e=f.options),f.adapter&&(o=f.adapter)),void 0===o?[3,10]:((h=new o(this.webMap.mapAdapter.map,e)).options.baseLayer&&(e.baseLayer=!0,e.order=0),(y=h.options.id)&&(this._layers[y]=h),this.webMap.emitter.emit("layer:preadd",h),[4,this.webMap.onMapLoad()]);case 5:return c.sent(),[4,h.addLayer(e)];case 6:return d=c.sent(),h.layer=d,h.id=h.options.id,(y=h.options.id)&&(i.filter&&this.filterLayer(h,i.filter),e.baseLayer&&this._baseLayers.push(y),this._layers[y]=h,l&&this.showLayer(y)),void 0!==(v=e.opacity)&&v<=1&&this.setLayerOpacity(h,v),e.fit&&h.getExtent?[4,h.getExtent()]:[3,9];case 7:return(m=c.sent())?[4,this.webMap.fitBounds(m)]:[3,9];case 8:c.sent(),c.label=9;case 9:return this.webMap.emitter.emit("layer:add",h),[2,h];case 10:return[2,Promise.reject("No adapter")]}}))}))},t.prototype.addLayerFromAsyncAdapter=function(t,e,r){return u(this,void 0,Promise,(function(){var n,o;return c(this,(function(i){switch(i.label){case 0:return n=r||this._layersIds++,[4,t()];case 1:return(o=i.sent())?[2,this.addLayer(o,e,n)]:[2,Promise.reject("No adapter")]}}))}))},t.prototype.removeLayers=function(t){for(var e in this._layers){var r=!0;t&&(r=t(e,this._layers[e])),r&&(this.removeLayer(e),delete this._layers[e])}},t.prototype.removeOverlays=function(){this.removeLayers((function(t,e){return!e.options.baseLayer}))},t.prototype.removeLayer=function(t){var e=this.getLayer(t),r=e&&this.getLayerId(e);if(e&&r){if(this.webMap.emitter.emit("layer:preremove",e),e.beforeRemove&&e.beforeRemove(),e.beforeRemove&&e.beforeRemove(),e.removeLayer?e.removeLayer():this.webMap.mapAdapter.removeLayer(e.layer),e.options&&e.options.baseLayer){var n=this._baseLayers.indexOf(r);n&&this._baseLayers.splice(n,1)}delete this._layers[r],this.webMap.emitter.emit("layer:remove",e)}},t.prototype.addGeoJsonLayer=function(t,e){return u(this,void 0,void 0,(function(){var r;return c(this,(function(n){switch(n.label){case 0:return(t=t||{}).multiselect=void 0!==t.multiselect&&t.multiselect,t.unselectOnSecondClick=void 0===t.unselectOnSecondClick||t.unselectOnSecondClick,e||(t=Object(i.a)(t)),t.paint=t.paint||{},[4,this.addLayer(e||"GEOJSON",t)];case 1:return r=n.sent(),this.showLayer(r),[2,r]}}))}))},t.prototype.showLayer=function(t,e){void 0===e&&(e={}),this.toggleLayer(t,!0,e)},t.prototype.hideLayer=function(t,e){void 0===e&&(e={}),this.toggleLayer(t,!1,e)},t.prototype.toggleLayer=function(t,e,r){var n=this;void 0===r&&(r={});var o=this.getLayer(t),i=o&&o.options.visibility,a=void 0!==e?e:!i,s=void 0!==r.silent&&r.silent,u=function(t,e){e.options.visibility=a;var r=a?"layer:preshow":"layer:prehide",o=a?"layer:show":"layer:hide";if(s||n.webMap.emitter.emit(r,e),a&&t){var i=e.options.baseLayer?0:e.options.order;if(0===i&&n._baseLayers.length){var u=n._baseLayers.find((function(t){return t!==e.id&&n.isLayerVisible(t)}));u&&n.hideLayer(u)}e.showLayer?e.showLayer.call(e,e.layer):n.webMap.mapAdapter.showLayer(e.layer),void 0!==i&&n.webMap.mapAdapter.setLayerOrder(e.layer,i,n._layers)}else e.hideLayer?e.hideLayer.call(e,e.layer):n.webMap.mapAdapter.hideLayer(e.layer);s||n.webMap.emitter.emit(o,e)};o&&o.options.visibility!==a&&(this.webMap.mapAdapter.map?u(this.webMap.mapAdapter,o):this.webMap.mapAdapter.emitter.once("create",(function(t){u(t.map,o)})))},t.prototype.updateLayer=function(t){var e=this.getLayer(t);e&&this.isLayerVisible(e)&&(this.hideLayer(e,{silent:!0}),this.showLayer(e,{silent:!0}))},t.prototype.setLayerOpacity=function(t,e){var r=this.getLayer(t);r&&this.webMap.mapAdapter.setLayerOpacity&&r&&this.webMap.mapAdapter.setLayerOpacity(r.layer,e)},t.prototype.selectLayer=function(t,e){var r=this.getLayer(t);if(r){var n=r;n&&n.select&&n.select(e);var o=this.getLayerId(r);o&&this._selectedLayers.push(o)}},t.prototype.unSelectLayer=function(t,e){var r=this.getLayer(t);if(r){var n=r&&r;n.unselect&&n.unselect(e);var o=this.getLayerId(r);if(o){var i=this._selectedLayers.indexOf(o);-1!==i&&this._selectedLayers.splice(i,1)}}},t.prototype.filterLayer=function(t,e){var r=this.getLayer(t);return r.filter?r.filter(e):[]},t.prototype.propertiesFilter=function(t,e,r){var n=this.getLayer(t);n.propertiesFilter?n.propertiesFilter(e,r):n.filter&&this.filterLayer(n,(function(t){return!t.feature||!t.feature.properties||Object(a.a)(t.feature.properties,e)}))},t.prototype.removeLayerFilter=function(t){var e=this.getLayer(t);e.removeFilter?e.removeFilter():e.filter&&e.filter((function(){return!0}))},t.prototype.setLayerData=function(t,e){var r=this.getLayer(t);r&&(r.setData?r.setData(e):r.clearLayer&&r.addData&&(r.clearLayer(),r.addData(e)))},t.prototype.addLayerData=function(t,e){var r=this.getLayer(t);r.addData&&r.addData(e)},t.prototype.clearLayerData=function(t,e){var r=this.getLayer(t);r&&r.clearLayer&&r.clearLayer(e)},t.prototype.getAttributions=function(t){var e=[];for(var r in this._layers){var n=this._layers[r];if(!(void 0===t.onlyVisible||t.onlyVisible)||n.options.visibility){var o=n.options&&n.options.attribution;o&&e.push(o)}}return e},t.prototype._onLayerClick=function(t){return u(this,void 0,void 0,(function(){return c(this,(function(e){return this.webMap.emitter.emit("layer:click",t),[2,Promise.resolve(t)]}))}))},t.prototype._updateGeoJsonOptions=function(t){var e=this,r=t.onLayerClick;t.onLayerClick=function(t){return r&&r(t),e._onLayerClick(t)},t.nativePaint||(this.webMap.options.paint&&(t.paint=o(t.paint||{},this.webMap.options.paint,this.webMap.getPaintFunctions)),t.selectedPaint&&this.webMap.options.selectedPaint&&(t.selectedPaint=o(t.selectedPaint,this.webMap.options.selectedPaint,this.webMap.getPaintFunctions)))},t}()},114:function(t,e,r){"use strict";function n(t,e,r){var n=("^"+t+"$").replace(/%/g,".*").replace("_",".");return null!==new RegExp(n,r?"i":"").exec(e)}r.d(e,"a",(function(){return i}));var o={gt:function(t,e){return t>e},lt:function(t,e){return t<e},ge:function(t,e){return t>=e},le:function(t,e){return t<=e},eq:function(t,e){return t===e},ne:function(t,e){return t!==e},in:function(t,e){return-1!==e.indexOf(t)},notin:function(t,e){return-1===e.indexOf(t)},like:function(t,e){return n(t,e)},ilike:function(t,e){return n(t,e,!0)}};function i(t,e){return e.every((function(e){var r=e[0],n=e[1],i=e[2],a=o[n],s=t[r];return!a||!s||a(s,i)}))}},115:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r(87),o={Point:"circle",LineString:"line",MultiPoint:"circle",Polygon:"fill",MultiLineString:"line",MultiPolygon:"fill"};function i(t){if(t.data){var e=o[Object(n.a)(t.data)],r=t.paint;"object"==typeof r&&(r.type=r.type?r.type:"fill"===e||"line"===e?"path":"html"in r||"className"in r?"icon":e),t.type=e}return t}},197:function(t,e){},198:function(t,e){},199:function(t,e){},200:function(t,e){},201:function(t,e){},202:function(t,e){},203:function(t,e){},204:function(t,e){},23:function(t,e,r){"use strict";var n=r(85),o=(r(112),r(197));r.o(o,"ControlPositions")&&r.d(e,"ControlPositions",(function(){return o.ControlPositions}));var i=r(86);r.o(i,"ControlPositions")&&r.d(e,"ControlPositions",(function(){return i.ControlPositions}));var a=r(198);r.o(a,"ControlPositions")&&r.d(e,"ControlPositions",(function(){return a.ControlPositions}));var s=r(199);r.o(s,"ControlPositions")&&r.d(e,"ControlPositions",(function(){return s.ControlPositions}));var u=r(200);r.o(u,"ControlPositions")&&r.d(e,"ControlPositions",(function(){return u.ControlPositions}));var c=r(201);r.o(c,"ControlPositions")&&r.d(e,"ControlPositions",(function(){return c.ControlPositions}));var p=r(202);r.o(p,"ControlPositions")&&r.d(e,"ControlPositions",(function(){return p.ControlPositions}));var l=r(203);r.o(l,"ControlPositions")&&r.d(e,"ControlPositions",(function(){return l.ControlPositions}));var f=r(204);r.o(f,"ControlPositions")&&r.d(e,"ControlPositions",(function(){return f.ControlPositions})),e.default=n.a},85:function(t,e,r){"use strict";var n=r(217),o=r(29),i=r(86);function a(t,e){var r=document.createElement("div"),n=!1;e.getStatus?n=e.getStatus():e.status&&(n=e.status);var o=e.title||"",i=e.html;function a(){o&&(r.title="string"==typeof o?o:n?o.on:o.off,r.setAttribute("aria-label",r.title))}function s(t){t instanceof HTMLElement?(r.innerHTML="",r.appendChild(t)):"string"==typeof t&&(r.innerHTML=t)}function u(){i&&("string"==typeof i||i instanceof HTMLElement?s(i):s(n?i.on:i.off),r.setAttribute("aria-label",r.title))}function c(t,e){t.split(" ").forEach((function(t){e?r.classList.add(t):r.classList.remove(t)}))}function p(){e.addClassOn&&c(e.addClassOn,n),e.addClassOff&&c(e.addClassOff,!n)}a(),u(),e.addClass&&c(e.addClass,!0),p();var l=function(t){n=void 0!==t?t:!n,u(),a(),p(),e.onClick&&e.onClick(n)},f=t({html:r,onClick:l});return f.onClick=l,f}var s=function(){this.backspace=8,this.tab=9,this.enter=13,this.shift=16,this.ctrl=17,this.alt=18,this["pause/break"]=19,this.caps_lock=20,this.escape=27,this.page_up=33,this.page_down=34,this.end=35,this.home=36,this.left_arrow=37,this.up_arrow=38,this.right_arrow=39,this.down_arrow=40,this.insert=45,this.delete=46,this.left_window_key=91,this.right_window_key=92,this.select_key=93,this.numpad_0=96,this.numpad_1=97,this.numpad_2=98,this.numpad_3=99,this.numpad_4=100,this.numpad_5=101,this.numpad_6=102,this.numpad_7=103,this.numpad_8=104,this.numpad_9=105,this.multiply=106,this.add=107,this.subtract=109,this.decimal_point=110,this.divide=111,this.f1=112,this.f2=113,this.f3=114,this.f4=115,this.f5=116,this.f6=117,this.f7=118,this.f8=119,this.f9=120,this.f10=121,this.f11=122,this.f12=123,this.num_lock=144,this.scroll_lock=145,this["semi-colon"]=186,this.equal_sign=187,this[","]=188,this["-"]=189,this["."]=190,this["/"]=191,this["`"]=192,this["["]=219,this["\\"]=220,this["]"]=221,this["'"]=222},u=function(){function t(){this.keyCodeAlias=new s,this.keys={},this._windowOnFocus=this.windowOnFocus.bind(this),this._keysPressed=this.keysPressed.bind(this),this._keysReleased=this.keysReleased.bind(this),this.addKeyboardEventsListener()}return t.prototype.pressed=function(t){var e=this.keyCodeAlias[t];return!!e&&this.keys[e]},t.prototype.addKeyboardEventsListener=function(){window.addEventListener("focus",this._windowOnFocus,!1),window.addEventListener("keydown",this._keysPressed,!1),window.addEventListener("keyup",this._keysReleased,!1)},t.prototype.removeKeyboardEventsListener=function(){window.removeEventListener("focus",this._windowOnFocus,!1),window.removeEventListener("keydown",this._keysPressed,!1),window.removeEventListener("keyup",this._keysReleased,!1)},t.prototype.keysPressed=function(t){t.stopPropagation(),this.keys[t.keyCode]||(this.keys[t.keyCode]=!0)},t.prototype.keysReleased=function(t){t.stopPropagation(),this.keys[t.keyCode]=!1},t.prototype.windowOnFocus=function(){this.keys={}},t}(),c=r(32);function p(t){return function(e,r,n){var o=n.value;return n.value=function(){for(var e=this,r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];return new Promise((function(n,i){var a=function(){var t=o.apply(e,r);t&&t.then?t.then(n).catch(i):n(t)};e.getEventStatus(t)?a():e.emitter.once(t,(function(){a()}))}))},n}}var l=r(114);var f,h=r(87),y=r(115),d=r(112),v=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function a(t){try{u(n.next(t))}catch(t){i(t)}}function s(t){try{u(n.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(a,s)}u((n=n.apply(t,e||[])).next())}))},m=function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},b=function(){function t(){}return t.prototype.addControl=function(t,e,r){return v(this,void 0,Promise,(function(){var n,o;return m(this,(function(i){switch(i.label){case 0:return(n="string"==typeof t?this.getControl(t,r):t)?[4,n]:[3,2];case 1:return o=i.sent(),[2,this.webMap.mapAdapter.addControl(o,e)];case 2:return[2]}}))}))},t.prototype.createControl=function(t,e){return v(this,void 0,Promise,(function(){return m(this,(function(r){switch(r.label){case 0:return[4,this.webMap.onLoad("build-map")];case 1:return r.sent(),this.webMap.mapAdapter.createControl?[2,this.webMap.mapAdapter.createControl(t,e)]:[2]}}))}))},t.prototype.createButtonControl=function(t){return v(this,void 0,Promise,(function(){return m(this,(function(e){switch(e.label){case 0:return[4,this.webMap.onLoad("build-map")];case 1:return e.sent(),this.webMap.mapAdapter.createButtonControl?[2,this.webMap.mapAdapter.createButtonControl(t)]:[2]}}))}))},t.prototype.createToggleControl=function(t){return v(this,void 0,Promise,(function(){return m(this,(function(e){switch(e.label){case 0:return[4,this.webMap.onLoad("build-map")];case 1:return e.sent(),this.webMap.mapAdapter.createToggleControl?[2,this.webMap.mapAdapter.createToggleControl(t)]:this.webMap.mapAdapter.createButtonControl?[2,S.utils.createToggleControl(this.webMap.mapAdapter.createButtonControl,t)]:[2]}}))}))},t.prototype.removeControl=function(t){t.remove?t.remove():this.webMap.mapAdapter.removeControl&&this.webMap.mapAdapter.removeControl(t)},t.prototype.getControl=function(e,r){var n=this.webMap.mapAdapter.controlAdapters[e];if(n)return new n(r);var o=t.controls[e];return o?o(this.webMap,r):void 0},t.controls={CONTROL:function(t,e){return t.createControl(e.control,e.options)},BUTTON:function(t,e){return t.createButtonControl(e)},TOGGLE:function(t,e){return t.createToggleControl(e)}},t}(),w=function(){function t(t,e){this.webMap=t,e&&(e.value&&this.setValue(e.value),e.name&&(this.name=e.name),e.event&&(this.event=e.event))}return t.prototype.getValue=function(){return this.value},t.prototype.setValue=function(t){this.value=t},t}(),L=(f=function(t,e){return(f=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}f(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),g=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.name="center",e.event="moveend",e}return L(e,t),e.prototype.getValue=function(){return this.webMap.getCenter()},e.prototype.setValue=function(t){this.webMap.setCenter(t)},e.prototype.toString=function(t){var e=t.map((function(t){return t.toFixed(5)}));return e[0]+"_"+e[1]},e.prototype.parse=function(t){return t.split("_").map(Number)},e}(w),_=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),C=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.name="zoom",e.event="zoomend",e}return _(e,t),e.prototype.getValue=function(){return this.webMap.getZoom()},e.prototype.setValue=function(t){this.webMap.setZoom(t)},e.prototype.toString=function(t){return String(t)},e.prototype.parse=function(t){return Number(t)},e}(w);r.d(e,"a",(function(){return S}));var P=function(t,e,r,n){var o,i=arguments.length,a=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,r,n);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(i<3?o(a):i>3?o(e,r,a):o(e,r))||a);return i>3&&a&&Object.defineProperty(e,r,a),a},A=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},k=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function a(t){try{u(n.next(t))}catch(t){i(t)}}function s(t){try{u(n.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(a,s)}u((n=n.apply(t,e||[])).next())}))},M=function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},O=function(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e,r=t[Symbol.asyncIterator];return r?r.call(t):(t="function"==typeof __values?__values(t):t[Symbol.iterator](),e={},n("next"),n("throw"),n("return"),e[Symbol.asyncIterator]=function(){return this},e);function n(r){e[r]=t[r]&&function(e){return new Promise((function(n,o){(function(t,e,r,n){Promise.resolve(n).then((function(e){t({value:e,done:r})}),e)})(n,o,(e=t[r](e)).done,e.value)}))}}},E={minZoom:0,maxZoom:21,paint:{color:"blue",opacity:1,radius:8,weight:1},selectedPaint:{color:"darkblue",opacity:1,radius:12,weight:1}},S=function(){function t(t){this.webMap=this,this.options=E,this.emitter=new c.EventEmitter,this.keys=e.keys,this.runtimeParams=[],this.getPaintFunctions=e.getPaintFunctions,this.mapState=[g,C],this._initMapState={},this._mapState=[],this._eventsStatus={},this._mapEvents={},this.mapAdapter=t.mapAdapter,this._starterKits=t.starterKits||[],t.mapOptions&&(this.options=Object(o.b)(E||{},t.mapOptions)),t.runtimeParams&&(this.runtimeParams=t.runtimeParams),this._addEventsListeners(),t.create&&this.create(this.options)}var e,r;return e=t,t.prototype.create=function(t){return k(this,void 0,Promise,(function(){return M(this,(function(e){switch(e.label){case 0:return this.getEventStatus("create")?[3,3]:(this.options=Object(o.b)(E||{},t),[4,this._setInitMapState(this.mapState)]);case 1:return e.sent(),[4,this._setupMap()];case 2:e.sent(),this._emitStatusEvent("create",this),e.label=3;case 3:return[2,this]}}))}))},t.prototype.setRuntimeParams=function(t){this.runtimeParams.push(t)},t.prototype.destroy=function(){this._removeEventsListeners(),function(t){for(var e in t)delete t[e]}(this._emitStatusEvent),this.mapAdapter.destroy&&this.mapAdapter.destroy()},t.prototype.getState=function(){var t={};return this._mapState.forEach((function(e){t[e.name]=e.getValue()})),t},t.prototype.getRuntimeParams=function(){var t=this,e={};return this._mapState.forEach((function(r){for(var n=0,o=t.runtimeParams;n<o.length;n++){var i=o[n].get(r.name);if(void 0!==i){e[r.name]=r.parse(i);break}}})),e},t.prototype.getContainer=function(){if(this.mapAdapter.getContainer)return this.mapAdapter.getContainer();if(this.options.target){if(this.options.target instanceof HTMLElement)return this.options.target;if("string"==typeof this.options.target){var t=document.getElementById(this.options.target);if(t)return t}}},t.prototype.setCursor=function(t){this.mapAdapter.setCursor&&this.mapAdapter.setCursor(t)},t.prototype.setCenter=function(t){return this.mapAdapter.setCenter(t),this},t.prototype.getCenter=function(){return this.mapAdapter.getCenter()},t.prototype.getBounds=function(){if(this.mapAdapter.getBounds)return this.mapAdapter.getBounds()},t.prototype.setZoom=function(t){return this.mapAdapter.setZoom(t),this},t.prototype.getZoom=function(){return this.mapAdapter.getZoom()},t.prototype.setView=function(t,e){this.mapAdapter.setView&&t&&e?this.mapAdapter.setView(t,e):(t&&this.mapAdapter.setCenter(t),e&&this.mapAdapter.setZoom(e))},t.prototype.fitBounds=function(t,e){return this.mapAdapter.fit(t,e),this},t.prototype.getEventStatus=function(t){var e=t,r=this._eventsStatus[e];return void 0!==r&&r},t.prototype.onLoad=function(t){var e=this;return void 0===t&&(t="create"),new Promise((function(r){e.getEventStatus(t)?r(e):e.emitter.once(t,(function(){r(e)}))}))},t.prototype.onMapLoad=function(t){var e=this;return new Promise((function(r){var n=function(){var n=e.mapAdapter;t&&t(n),n&&r(n)},o=void 0===e.mapAdapter.isLoaded||e.mapAdapter.isLoaded;e.mapAdapter.map&&o?n():e.mapAdapter.emitter.once("create",(function(){n()}))}))},t.prototype.getActiveBaseLayer=function(){var t=this,e=this.getBaseLayers().find((function(e){return t.isLayerVisible(e)}));if(e)return this.getLayer(e)},t.prototype.getLayerAdapters=function(){return this.mapAdapter.layerAdapters},t.prototype.getLayerAdapter=function(t){return this.mapAdapter.layerAdapters[t]},t.prototype.locate=function(t,e){if(this.mapAdapter&&this.mapAdapter.locate)return this.mapAdapter.locate(t,e);return{stop:function(){}}},t.prototype._emitStatusEvent=function(t,e){var r=t;this._eventsStatus[r]=!0,this.emitter.emit(r,e)},t.prototype._setupMap=function(){return k(this,void 0,void 0,(function(){return M(this,(function(t){switch(t.label){case 0:return[4,this.mapAdapter.create(this.options)];case 1:return t.sent(),this._zoomToInitialExtent(),[4,this._addLayerProviders()];case 2:return t.sent(),[4,this._onLoadSync()];case 3:return t.sent(),this._emitStatusEvent("build-map",this.mapAdapter),[2,this]}}))}))},t.prototype._zoomToInitialExtent=function(){var t=this.options,e=t.center,r=t.zoom,n=t.bounds;this._extent?this.mapAdapter.fit(this._extent):e&&n?this.setView(e,r):n&&this.fitBounds(n)},t.prototype._addLayerProviders=function(){var t,e,r,n;return k(this,void 0,Promise,(function(){var o,i,a,s,u,c,p,l,f,h,y;return M(this,(function(d){switch(d.label){case 0:d.trys.push([0,26,,27]),d.label=1;case 1:d.trys.push([1,19,20,25]),o=O(this._starterKits),d.label=2;case 2:return[4,o.next()];case 3:return(i=d.sent()).done?[3,18]:(a=i.value).getLayerAdapters?[4,a.getLayerAdapters.call(a)]:[3,17];case 4:if(!(s=d.sent()))return[3,17];d.label=5;case 5:d.trys.push([5,11,12,17]),u=O(s),d.label=6;case 6:return[4,u.next()];case 7:return(c=d.sent()).done?[3,10]:[4,(p=c.value).createAdapter(this)];case 8:(l=d.sent())&&(this.mapAdapter.layerAdapters[p.name]=l),d.label=9;case 9:return[3,6];case 10:return[3,17];case 11:return f=d.sent(),r={error:f},[3,17];case 12:return d.trys.push([12,,15,16]),c&&!c.done&&(n=u.return)?[4,n.call(u)]:[3,14];case 13:d.sent(),d.label=14;case 14:return[3,16];case 15:if(r)throw r.error;return[7];case 16:return[7];case 17:return[3,2];case 18:return[3,25];case 19:return h=d.sent(),t={error:h},[3,25];case 20:return d.trys.push([20,,23,24]),i&&!i.done&&(e=o.return)?[4,e.call(o)]:[3,22];case 21:d.sent(),d.label=22;case 22:return[3,24];case 23:if(t)throw t.error;return[7];case 24:return[7];case 25:return[3,27];case 26:throw y=d.sent(),new Error(y);case 27:return[2]}}))}))},t.prototype._onLoadSync=function(){var t,e;return k(this,void 0,Promise,(function(){var r,n,o,i,a;return M(this,(function(s){switch(s.label){case 0:s.trys.push([0,8,9,14]),r=O(this._starterKits),s.label=1;case 1:return[4,r.next()];case 2:if((n=s.sent()).done)return[3,7];if(!(o=n.value).onLoadSync)return[3,6];s.label=3;case 3:return s.trys.push([3,5,,6]),[4,o.onLoadSync.call(o,this)];case 4:return s.sent(),[3,6];case 5:return i=s.sent(),console.error(i),[3,6];case 6:return[3,1];case 7:return[3,14];case 8:return a=s.sent(),t={error:a},[3,14];case 9:return s.trys.push([9,,12,13]),n&&!n.done&&(e=r.return)?[4,e.call(r)]:[3,11];case 10:s.sent(),s.label=11;case 11:return[3,13];case 12:if(t)throw t.error;return[7];case 13:return[7];case 14:return[2]}}))}))},t.prototype._setInitMapState=function(t){for(var e=0,r=t;e<r.length;e++){var n=new(0,r[e])(this);this._mapState.push(n);for(var o=0,i=this.runtimeParams;o<i.length;o++){var a=i[o].get(n.name);if(void 0!==a){var s=n.parse(a);this._initMapState[n.name]=s,this.options[n.name]=s;break}}}},t.prototype._addEventsListeners=function(){var t=this;["click","zoomstart","zoom","zoomend","movestart","move","moveend"].forEach((function(e){t._mapEvents[e]=function(r){if(t.runtimeParams.length){var n=t._mapState.find((function(t){return t.event===e}));if(n){var o=n.toString(n.getValue());t.runtimeParams.forEach((function(t){t.set(n.name,o)}))}}t._eventsStatus&&t.emitter.emit(e,r)},t.mapAdapter.emitter.on(e,t._mapEvents[e])}))},t.prototype._removeEventsListeners=function(){var t=this;Object.entries(this._mapEvents).forEach((function(e){var r=e[0],n=e[1];t.mapAdapter.emitter.off(r,n)}))},t.keys=new u,t.utils={detectGeometryType:h.a,findMostFrequentGeomType:h.b,updateGeoJsonAdapterOptions:y.a,propertiesFilter:l.a,createToggleControl:a},t.decorators={onLoad:p},t=e=P([Object(n.mix)(d.a,b),A("design:paramtypes",["function"==typeof(r=void 0!==i.AppOptions&&i.AppOptions)?r:Object])],t)}()},86:function(t,e){},87:function(t,e,r){"use strict";function n(t){for(var e,r={},n=0;n<t.length;n++)r[t[n]]=1+(r[t[n]]||0);for(var o in r){var i=void 0!==e?r[e]:0;r[o]>(i||0)&&(e=o)}return e}function o(t){var e;if("FeatureCollection"===t.type)e=n(t.features.map((function(t){return t.geometry.type})));else if("GeometryCollection"===t.type){e=n(t.geometries.map((function(t){return t.type})))}else e="Feature"===t.type?t.geometry.type:t.type;return e}r.d(e,"b",(function(){return n})),r.d(e,"a",(function(){return o}))}}]);
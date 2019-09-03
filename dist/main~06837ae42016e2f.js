(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{357:function(t,e){},360:function(t,e){},361:function(t,e){},362:function(t,e){},363:function(t,e){},364:function(t,e){},368:function(t,e,n){"use strict";n.r(e);n(357);var r=n(78),o=n(82),i=n(169),a=(n(359),n(360),n(14)),s=(n(361),n(362),function(){function t(t){this.options=t,this._container=document.createElement("div"),this.status=void 0===this.options.open||this.options.open,this._updateContainer(),this.options.parent&&this.options.parent.appendChild(this.getContainer())}return t.prototype.getContainer=function(){return this._container},t.prototype.open=function(){this._content||this._createContent(),this._container.appendChild(this._content),this._toggle&&(this._toggle.innerHTML="&times;"),this.status=!0},t.prototype.close=function(){this._content&&this._content.parentNode.removeChild(this._content),this._toggle&&(this._toggle.innerHTML=">>"),this.status=!1},t.prototype.toggle=function(){this.status?this.close():this.open()},t.prototype._updateContainer=function(){if(this._container.innerHTML="",this.options.title){var t=this._createHeader();this._container.appendChild(t)}this.status?this.open():this.close()},t.prototype._createHeader=function(){var t=this,e=document.createElement("div");e.className="panel-header";var n=document.createElement("div");n.className="panel-header__title",n.innerHTML=this.options.title;var r=document.createElement("div");return r.className="panel-header__toggle",r.onclick=function(){t.toggle()},this._toggle=r,e.appendChild(r),e.appendChild(n),e},t.prototype._createContent=function(){var t=document.createElement("div");t.className="panel-content";var e="function"==typeof this.options.content?this.options.content():this.options.content;return t.appendChild(e),this._content=t,t},t}()),c=n(10),l=function(){function t(t){var e=this._createTreeItem(t);e&&(this._container=e)}return t.prototype.getContainer=function(){return this._container},t.prototype._createTreeBranch=function(t){var e=this,n=document.createElement("div");return n.className="tree-container__item-children",t.forEach(function(t){if(t.item){var r=e._createTreeItem(t);r&&n.appendChild(r)}}),n},t.prototype._createTreeItem=function(t){var e=t.item;if(!e)return!1;var n=document.createElement("div");if(n.className="tree-container__item",e.display_name){var r=document.createElement("input");r.setAttribute("type","checkbox");var o="layer"!==e.item_type||e.layer_enabled;r.checked=o;var i=t.properties.property("visibility");i&&(i.emitter.on("change",function(t){r.checked=t.value}),r.onclick=function(){i.set(r.checked,{propagation:c.default.keys.pressed("ctrl")})});var a=document.createElement("span");a.innerHTML=e.display_name,n.appendChild(r),n.appendChild(a)}if("group"===e.item_type||"root"===e.item_type&&e.children.length){var s=t.tree.getChildren(),l=this._createTreeBranch(s.reverse());n.appendChild(l)}return n},t}(),u=(n(363),function(){function t(t){this.options=t,this._select=[["24","24 часа"],["48","48 часов"],["72","72 часа"],["168","неделя"]],this.ngwMap=t.ngwMap,this._container=this._createContainer()}return t.prototype.getContainer=function(){return this._container},t.prototype._createContainer=function(){var t=this,e=document.createElement("div");e.className="fires-contentainer";var n=this._createSelector();e.appendChild(n);var r=document.createElement("div");return r.className="fires-contentainer__layers",this.options.fires.forEach(function(e){t._createFireItem(e,r)}),e.appendChild(r),e},t.prototype._createFireItem=function(t,e){var n=this,r=document.createElement("div");r.className="tree-container__item";var o=this.ngwMap.getLayer(t.id).item,i=document.createElement("input");i.setAttribute("type","checkbox"),i.checked=!0,i.onclick=function(){n.ngwMap.toggleLayer(t.id,i.checked)};var a=document.createElement("span"),s=o.resource.display_name.split("__")[0];a.innerHTML=s.replace("fires","").trim();var c=this._createSymbol(t);r.appendChild(i),r.appendChild(c),r.appendChild(a),e.appendChild(r)},t.prototype._createSymbol=function(t){var e=document.createElement("span");return e.className="item-symbol",e.style.color=t.color,e.style.borderColor=t.color,e.style.backgroundColor=t.color,e},t.prototype._createSelector=function(){var t=this,e=document.createElement("div"),n=document.createElement("label");n.appendChild(document.createTextNode("Просмотр термоточек за: "));var r=document.createElement("select");return this._select.forEach(function(t){var e=document.createElement("option");e.value=t[0],e.text=t[1],r.appendChild(e)}),r.onchange=function(){t.options.fires.forEach(function(e){t.ngwMap.getLayer(e.id).propertiesFilter([["timestamp","ge",Math.floor(Date.now()/1e3)-3600*Number(r.value)]])})},n.appendChild(r),e.appendChild(n),e},t}()),p=function(){return(p=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},h={target:"tree",width:300},d=function(){function t(t){if(this.options=p(p({},h),t),"string"==typeof this.options.target){var e=document.getElementById(this.options.target);if(!e)throw new Error("No element with ID #"+this.options.target+" in document for webmap tree");this._target=e}else this.options.target instanceof HTMLElement&&(this._target=this.options.target);this.ngwLayers=this.options.ngwLayers,this._container=this._createContainer(),this.options.status||this.hide(),this._target.appendChild(this._container)}return t.prototype.show=function(){this._container.classList.remove("hidden")},t.prototype.hide=function(){this._container.classList.add("hidden")},t.prototype._createContainer=function(){var t=this,e=document.createElement("div");return e.className="tree-container",e.style.width=(this.options.width||300)+"px",new s({title:"Базовые слои",content:function(){return t._createNgwLayers()},open:!1,parent:e}),this.options.fires&&new s({title:"Термоточки (FIRMS)",content:function(){return t._createFiresContainer()},parent:e}),e},t.prototype._createNgwLayers=function(){var t=document.createElement("div");for(var e in t.className="",this.ngwLayers){var n=this.ngwLayers[e],r=new l(n.layer.layer).getContainer();r&&t.appendChild(r)}return t},t.prototype._createFiresContainer=function(){var t=document.createElement("div"),e=this.options.fires;if(e){var n=new u({fires:e,ngwMap:this.options.ngwMap});t.appendChild(n.getContainer())}return t},t}(),f=function(){function t(t,e){this.actionMap=t,this.options=e,this.html="<span>&#9776;</span>",this.title={off:"Показать дерево слоёв",on:"Скрыть дерево слоёв"},this.addClass="toggle-control webmap-tree-control",this.addClassOn="active",this.status=!1,this.emitter=new a.EventEmitter,this.tree=new d(e)}return t.prototype.onClick=function(t){this.toggleControl(t)},t.prototype.show=function(){this.tree.show(),this.invalidateMapSize()},t.prototype.hide=function(){this.tree.hide(),this.invalidateMapSize()},t.prototype.invalidateMapSize=function(){this.actionMap.ngwMap.mapAdapter.map.invalidateSize&&this.actionMap.ngwMap.mapAdapter.map.invalidateSize()},t.prototype.toggleControl=function(t){(t=void 0!==t?t:!this.status)?this.show():this.hide(),this.status=t,this.emitter.emit("status",this.status)},t}(),g=(n(364),n(29)),m=n(170),y=function(t,e,n,r){return new(n||(n=Promise))(function(o,i){function a(t){try{c(r.next(t))}catch(t){i(t)}}function s(t){try{c(r.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n(function(t){t(e)})).then(a,s)}c((r=r.apply(t,e||[])).next())})},v=function(t,e){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},w=function(){function t(t){this._storageKey="auth",this._storage=localStorage,this.connector=new g.default({baseUrl:t.baseUrl,auth:t.auth});var e=this._storage.getItem(this._storageKey);e&&(this.auth=JSON.parse(e))}return t.prototype.login=function(t){return y(this,void 0,void 0,function(){var e,n;return v(this,function(r){switch(r.label){case 0:return this._errorMessage="",t?[3,2]:[4,this.getAuth()];case 1:t=r.sent(),r.label=2;case 2:return r.trys.push([2,4,,7]),[4,this.connector.login(t)];case 3:if(r.sent(),!(e=this.connector.user))throw new Error;if("guest"===e.keyname)throw new Error;return[3,7];case 4:return r.sent(),this._errorMessage="Не удаётся войти",[4,this._showLoginDialog(t)];case 5:return n=r.sent(),[4,this.login(n)];case 6:return r.sent(),[3,7];case 7:return this.connector.getUserInfo&&this._storage.setItem(this._storageKey,JSON.stringify(t)),[2]}})})},t.prototype.logout=function(){this.connector.logout(),this._storage.setItem(this._storageKey,""),this._errorMessage=""},t.prototype.getAuth=function(){return y(this,void 0,void 0,function(){return v(this,function(t){switch(t.label){case 0:return[4,this._showLoginDialog(this.auth)];case 1:return[2,t.sent()]}})})},t.prototype._showLoginDialog=function(t){var e=this;return new Promise(function(n,r){var o=new m.a,i=e._createDialogHtml(t,function(t){o.close(),n(t)},function(t){o.close(),r(t)});o.updateContent(i),o.show()})},t.prototype._createDialogHtml=function(t,e,n){void 0===t&&(t={login:"",password:""});var r=t.login,o=t.password,i=document.createElement("div");i.className="dialog--form login";var a='\n      <div><label><div>Имя пользователя:</div>\n        <input value="'+r+'" class="dialog--input name"></input>\n      </label></div>\n      <div><label><div>Пароль:</div>\n        <input value="'+o+'" type="password" class="dialog--input password"></input>\n      </label></div>\n      <div class="dialog-error"></div>\n      <button class="dialog--button accept">Войти</button>\n      <button class="dialog--button cancel">Отмена</button>\n    ';i.innerHTML=a;var s=i.getElementsByClassName("name")[0],c=i.getElementsByClassName("password")[0];if(this._errorMessage){var l=i.getElementsByClassName("dialog-error")[0];l.className="dialog-error",l.innerHTML='<div class="dialog-error--message">'+this._errorMessage+"</div>"}var u=i.getElementsByClassName("accept")[0],p=i.getElementsByClassName("cancel")[0],h=function(){return{login:s.value,password:c.value}},d=function(){var t=h();u.disabled=!(t.login&&t.password)},f=function(){d()},g=function(){[s,c].forEach(function(t){["change","input"].forEach(function(e){return t.removeEventListener(e,f)})})};return u.onclick=function(){g(),e(h())},p.onclick=function(){g(),n("Login cancel")},d(),[s,c].forEach(function(t){["change","input"].forEach(function(e){return t.addEventListener(e,f)})}),i},t}(),_=function(){return(_=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},b=function(t,e,n,r){return new(n||(n=Promise))(function(o,i){function a(t){try{c(r.next(t))}catch(t){i(t)}}function s(t){try{c(r.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n(function(t){t(e)})).then(a,s)}c((r=r.apply(t,e||[])).next())})},C=function(t,e){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},E=function(){function t(t){this.options=t,this._promises={}}return t.prototype.create=function(t,e){return b(this,void 0,void 0,function(){var n,a,s,c,l,u,p=this;return C(this,function(h){switch(h.label){case 0:return[4,(n=new w(t)).login()];case 1:return h.sent(),this.ngwMap=new r.default(new i.a,_({controls:[],connector:n.connector},t)),this.ngwMap.getPaintFunctions={base:o.a},this.ngwMap.addControl("ZOOM","top-left"),this.ngwMap.addControl("ATTRIBUTION","bottom-right"),a=this,[4,this.ngwMap.createButtonControl({html:"<span>&#10162;</span>",title:"Выйти",onClick:function(){n.logout(),window.location.reload()}})];case 2:return a.authControl=h.sent(),this.ngwMap.addControl(this.authControl,"top-right"),[4,this.ngwMap.getNgwLayers()];case 3:if(s=h.sent(),!e)return[3,7];c=0,l=e,h.label=4;case 4:return c<l.length?(u=l[c],[4,this.ngwMap.addNgwLayer({resourceId:u.resourceId,id:u.id,adapterOptions:{propertiesFilter:[["timestamp","ge",Math.floor(Date.now()/1e3)-3600*Number(this.options.timedelta)]],paint:{stroke:!0,color:u.color,fillOpacity:.6,radius:5},selectable:!0,selectedPaint:{stroke:!0,color:u.color,fillOpacity:.9,radius:7},selectOnHover:!0,popupOnSelect:!0,popupOptions:{createPopupContent:function(t){if(t.feature){var e=t.feature;return p._createPopupContent(e)}}}}})]):[3,7];case 5:h.sent(),h.label=6;case 6:return c++,[3,4];case 7:return[4,this._addTreeControl(s,e)];case 8:return h.sent(),this._addEventsListeners(),[2]}})})},t.prototype._createPopupContent=function(t){var e=document.createElement("pre");return e.innerHTML=JSON.stringify(t.properties,null,2),e.style.whiteSpace="pre-wrap",e},t.prototype._addTreeControl=function(t,e){return b(this,void 0,void 0,function(){var n;return C(this,function(r){switch(r.label){case 0:return[4,this.ngwMap.onLoad()];case 1:return r.sent(),this.tree=new f(this,{ngwLayers:t,ngwMap:this.ngwMap,fires:e}),n=this,[4,this.ngwMap.createToggleControl(this.tree)];case 2:return n.treeControl=r.sent(),this.ngwMap.addControl(this.treeControl,"top-left"),[2]}})})},t.prototype._clean=function(){this._promises.getFeaturePromise&&this._promises.getFeaturePromise.cancel&&this._promises.getFeaturePromise.cancel(),this.ngwMap.removeLayer("highlight")},t.prototype._highlighNgwLayer=function(t){var e=this;this._clean(),this._promises.getFeaturePromise=this.ngwMap.getIdentifyGeoJson(t).then(function(t){delete e._promises.getFeaturePromise,e.ngwMap.addLayer("GEOJSON",{id:"highlight",data:t,visibility:!0,paint:{color:"green",stroke:!0,fillOpacity:"0.8"},selectOnHover:!0,popup:!0,popupOptions:{createPopupContent:function(t){if(t.feature)return e._createPopupContent(t.feature)}}})})},t.prototype._addEventsListeners=function(){var t=this;this.ngwMap.emitter.on("ngw:select",function(e){return t._highlighNgwLayer(e)});var e=[this.tree],n=[this.treeControl];e.forEach(function(t,e){t&&t.emitter.on("status",function(t){t&&n.forEach(function(t,n){t&&e!==n&&t.onClick(!1)})})})},t}(),M=function(){return(M=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},L=function(t,e,n,r){return new(n||(n=Promise))(function(o,i){function a(t){try{c(r.next(t))}catch(t){i(t)}}function s(t){try{c(r.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n(function(t){t(e)})).then(a,s)}c((r=r.apply(t,e||[])).next())})},k=function(t,e){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},N=function(){function t(t){this.options=t,this.actionMap=new E(this.options)}return t.prototype.create=function(t){return L(this,void 0,void 0,function(){return k(this,function(e){return this.options=M(M({},this.options),t),this.actionMap.create(this.options.mapOptions,this.options.fires),[2]})})},t}(),O={};try{O=n(367)}catch(t){console.warn("Config file is not funded, run with default settings")}new N(r.default.utils.deepmerge({mapOptions:{target:"map",qmsId:487,bounds:[36.59,43.385,49.374,50.214]},timedelta:24},O)).create()}},[[369,3,5,6,4,2,1]]]);
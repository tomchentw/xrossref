module.exports=function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(2),u=r(o),_=u["default"].PropTypes,d=function(e){function t(){a(this,t),null!=e&&e.apply(this,arguments)}return i(t,e),s(t,[{key:"_render_link_to_stylesheet_",value:function(e){return e.client?u["default"].createElement("link",{rel:"stylesheet",href:e.client.replace(/js$/,"css")}):void 0}},{key:"render",value:function(){var e=this.props,t=(this.state,e.clientAssets),n={__html:e.componentString};return u["default"].createElement("html",null,u["default"].createElement("head",null,u["default"].createElement("title",null,"Xrossref | tomchentw"),u["default"].createElement("link",{href:"//fonts.googleapis.com/css?family=Roboto:400,300,500"}),this._render_link_to_stylesheet_(t)),u["default"].createElement("body",null,u["default"].createElement("div",{id:"react-container",dangerouslySetInnerHTML:n}),u["default"].createElement("script",{src:"//www.parsecdn.com/js/parse-1.4.2.min.js"}),u["default"].createElement("script",{src:t["assets/client"]||t.client})))}}]),t}(u["default"].Component);d.propTypes={componentString:_.string.isRequired,clientAssets:_.object.isRequired},t["default"]=d,e.exports=t["default"]},,function(e,t,n){e.exports=require("react")}]);
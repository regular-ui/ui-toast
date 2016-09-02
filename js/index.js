!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("regularjs")):"function"==typeof define&&define.amd?define(["Regular"],e):"object"==typeof exports?exports.RGUI=e(require("regularjs")):t.RGUI=e(t.Regular)}(this,function(t){return function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return t[o].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){n(1),t.exports=n(1)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(2);Object.keys(o).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return o[t]}})});var r=n(8);Object.keys(r).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return r[t]}})})},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0}),e._=e.Component=void 0;var r=n(3),i=o(r),s=n(7),a=o(s);e.Component=i["default"],e._=a["default"]},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(4),i=o(r),s=n(5),a=o(s),u=n(6),c=o(u),l=n(7),d=o(l),f=i["default"].extend({config:function(){this.defaults({readonly:!1,disabled:!1,visible:!0,"class":""}),this.supr()},defaults:function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return d["default"].defaults.apply(d["default"],[this.data].concat(e))},watch:function(){}}).filter(a["default"]).directive(c["default"]);e["default"]=f},function(e,n){e.exports=t},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={};n.dateFormat=function(){var t=function(){var t=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return t+="",t.length<=1?"0"+t:t},e={yyyy:function(t){return t.getFullYear()},MM:function(e){return t(e.getMonth()+1)},dd:function(e){return t(e.getDate())},HH:function(e){return t(e.getHours())},mm:function(e){return t(e.getMinutes())},ss:function(e){return t(e.getSeconds())}},n=new RegExp(Object.keys(e).join("|"),"g");return function(t){var o=arguments.length<=1||void 0===arguments[1]?"yyyy-MM-dd HH:mm":arguments[1];return t?(t=new Date(t),o.replace(n,function(n){return e[n]?e[n](t):""})):""}}(),n.format=function(t,e){for(var o=arguments.length,r=Array(o>2?o-2:0),i=2;i<o;i++)r[i-2]=arguments[i];return n[e+"Format"].apply(n,[t].concat(r))},e["default"]=n},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(7),i=o(r),s={};s["z-crt"]=i["default"].createBoolClassDirective("z-crt"),s["z-sel"]=i["default"].createBoolClassDirective("z-sel"),s["z-chk"]=i["default"].createBoolClassDirective("z-chk"),s["z-act"]=i["default"].createBoolClassDirective("z-act"),s["z-dis"]=i["default"].createBoolClassDirective("z-dis"),s["r-show"]=i["default"].createBoolDirective(function(t,e){t.style.display=e?"block":""}),s["r-autofocus"]=i["default"].createBoolDirective(function(t,e){e&&setTimeout(function(){return t.focus()},0)}),e["default"]=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},r=n(4),i={defaults:function(t){for(var e=arguments.length,n=Array(e>1?e-1:0),o=1;o<e;o++)n[o-1]=arguments[o];return n.forEach(function(e){for(var n in e)e.hasOwnProperty(n)&&void 0===t[n]&&(t[n]=e[n])}),t},createBoolDirective:function(t){return function(e,n){var r=this;"object"===("undefined"==typeof n?"undefined":o(n))&&"expression"===n.type?this.$watch(n,function(n,o){!n!=!o&&t.call(r,e,n)}):(n||""===n)&&t.call(this,e,!0)}},createBoolClassDirective:function(t){return i.createBoolDirective(function(e,n){r.dom[n?"addClass":"delClass"](e,t)})}};e["default"]=i},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0}),e.Toast=void 0;var r=n(9),i=o(r);e.Toast=i["default"]},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),i=n(10),s=o(i),a=r.Component.extend({name:"toast",template:s["default"],config:function(){this.defaults({list:[],position:"top-center",duration:2e3,single:!1,animation:"on: enter; class: animated fadeIn fast; on: leave; class: animated fadeOut fast;"}),this.supr()},init:function(){this.supr(),this.$root===this&&this.$inject(document.body)},show:function(t,e,n){var o=this,r={text:t,state:n,duration:+(e>=0?e:this.data.duration)},i=this.data.list;return this.data.single&&i[0]?(r=Object.assign(i[0],r),r.counter++):(i.unshift(r),r.counter=0),this.$update(),r.duration&&setTimeout(function(){r.counter?r.counter--:o.close(r)},r.duration),this.$emit("show",{sender:this,item:r}),r},close:function(t){var e=this.data.list.indexOf(t);e<0||(this.data.list.splice(e,1),this.$update(),this.$emit("close",{sender:this,item:t}))},closeAll:function(){this.data.list=[],this.$update()}}),u=["success","warning","info","error"];u.forEach(function(t){a.prototype[t]=function(e,n){this.show(e,n,t)}});var c=a.toast=new a,l=a.METHODS=["show","close","closeAll","success","warning","info","error"];l.forEach(function(t){return a[t]=c[t].bind(c)}),e["default"]=a},function(t,e){t.exports=[{type:"element",tag:"div",attrs:[{type:"attribute",name:"class",value:{type:"expression",body:"['m-toast m-toast-',c._sg_('position', d, e),' ',c._sg_('class', d, e)].join('')",constant:!1,setbody:!1}},{type:"attribute",name:"r-hide",value:{type:"expression",body:"(!c._sg_('visible', d, e))",constant:!1,setbody:!1}}],children:[{type:"text",text:"\n    "},{type:"list",sequence:{type:"expression",body:"c._sg_('list', d, e)",constant:!1,setbody:"c._ss_('list',p_,d, '=', 1)"},alternate:[],variable:"item",body:[{type:"text",text:"\n    "},{type:"element",tag:"div",attrs:[{type:"attribute",name:"class",value:{type:"expression",body:"['toast_item toast_item-',c._sg_('state', c._sg_('item', d, e))].join('')",constant:!1,setbody:!1}},{type:"attribute",name:"r-animation",value:{type:"expression",body:"c._sg_('animation', d, e)",constant:!1,setbody:"c._ss_('animation',p_,d, '=', 1)"}}],children:[{type:"text",text:"\n        "},{type:"expression",body:"c._sg_('text', c._sg_('item', d, e))",constant:!1,setbody:"c._ss_('text',p_,c._sg_('item', d, e), '=', 0)"},{type:"text",text:"\n        "},{type:"element",tag:"a",attrs:[{type:"attribute",name:"class",value:"toast_close"},{type:"attribute",name:"on-click",value:{type:"expression",body:"c['close'](c._sg_('item', d, e))",constant:!1,setbody:!1}}],children:[]},{type:"text",text:"\n    "}]},{type:"text",text:"\n    "}]},{type:"text",text:"\n"}]}]}])});
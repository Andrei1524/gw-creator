(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{158:function(t,e,n){"use strict";var r=n(9),o=n(224),c=n.n(o);r.default.use(c.a)},203:function(t,e,n){var content=n(276);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(64).default)("1198c9ca",content,!0,{sourceMap:!1})},204:function(t,e,n){var content=n(278);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(64).default)("4c12034c",content,!0,{sourceMap:!1})},227:function(t,e,n){"use strict";var r=n(228),o=n(229),c={components:{Header:r.default,Alert:o.default},data:function(){return{}}},l=n(48),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Alert"),t._v(" "),n("Header"),t._v(" "),n("main",[n("Nuxt")],1)],1)}),[],!1,null,null,null);e.a=component.exports},228:function(t,e,n){"use strict";n.r(e);var r={data:function(){return{}},mounted:function(){}},o=(n(275),n(48)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header custom-header"},[n("b-navbar",{class:{"pr-3":!t.$auth.loggedIn},attrs:{toggleable:"lg",type:"dark",variant:"info"}},[n("b-navbar-brand",{attrs:{to:"/"}},[t._v("Giveaway Creator")]),t._v(" "),n("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),t._v(" "),n("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[t.$auth.loggedIn?n("b-navbar-nav",{staticClass:"ml-auto d-flex align-items-center"},[n("b-nav-item",{staticClass:"special-nav-item",attrs:{href:"#"}},[n("b-icon",{attrs:{icon:"gift","aria-hidden":"true"}}),t._v("\n          Create\n        ")],1),t._v(" "),n("b-nav-item",{attrs:{href:"#"}},[n("b-icon",{attrs:{icon:"menu-button-wide","aria-hidden":"true"}}),t._v("\n          Dashboard\n        ")],1),t._v(" "),n("b-nav-item-dropdown",{staticClass:"custom-dropdown",attrs:{right:"","no-caret":"","no-flip":""},scopedSlots:t._u([{key:"button-content",fn:function(){return[n("b-avatar",{attrs:{src:"https://placekitten.com/300/300"}})]},proxy:!0}],null,!1,2961708262)},[t._v(" "),n("b-dropdown-item",{attrs:{href:"#"}},[n("b-icon",{attrs:{icon:"person-fill","aria-hidden":"true"}}),t._v("\n            Profile\n          ")],1),t._v(" "),n("b-dropdown-item",{attrs:{href:"#"}},[n("b-icon",{attrs:{icon:"gear-fill","aria-hidden":"true"}}),t._v("\n            Settings\n          ")],1),t._v(" "),n("hr",{staticClass:"white-hr"}),t._v(" "),n("b-dropdown-item-button",[n("b-icon",{attrs:{icon:"arrow-bar-left","aria-hidden":"true"}}),t._v("\n            Logout\n          ")],1)],1)],1):n("b-navbar-nav",{staticClass:"ml-auto d-flex align-items-center"},[n("b-nav-item",{staticClass:"special-nav-item",attrs:{to:"/register"}},[n("b-icon",{attrs:{icon:"gift","aria-hidden":"true"}}),t._v("\n          Register\n        ")],1),t._v(" "),n("b-nav-item",{attrs:{to:"/login"}},[n("b-icon",{attrs:{icon:"menu-button-wide","aria-hidden":"true"}}),t._v("\n          Login\n        ")],1)],1)],1)],1)],1)}),[],!1,null,"3bf7b762",null);e.default=component.exports},229:function(t,e,n){"use strict";n.r(e);n(5),n(4),n(2),n(1),n(6),n(3),n(7);var r=n(0),o=n(62);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d={data:function(){return{dismissSecs:5,dismissCountDown:0}},computed:l({},Object(o.d)("modules/alert",["showDismissibleAlert","alertMessage","variant"])),watch:{showDismissibleAlert:function(){this.showDismissibleAlert&&this.showAlert()}},mounted:function(){},methods:l(l({},Object(o.c)("modules/alert",["setShowDismissibleAlert"])),{},{countDownChanged:function(t){this.dismissCountDown=t,this.setShowDismissibleAlert(!1)},showAlert:function(){this.dismissCountDown=this.dismissSecs}})},f=(n(277),n(48)),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"custom-alert"},[n("b-alert",{ref:"alert",attrs:{show:t.dismissCountDown,fade:"",variant:t.variant,dismissible:""},on:{dismissed:function(e){t.dismissCountDown=0},"dismiss-count-down":t.countDownChanged}},[t._v("\n    "+t._s(t.alertMessage)+"\n  ")])],1)}),[],!1,null,"f75d1a6e",null);e.default=component.exports},231:function(t,e,n){n(232),t.exports=n(233)},271:function(t,e,n){var content=n(272);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(64).default)("a07579c2",content,!0,{sourceMap:!1})},272:function(t,e,n){var r=n(63),o=n(273),c=n(274),l=r(!1);l.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap);"]);var d=o(c);l.push([t.i,'body{font-family:"Open Sans",sans-serif;background:url('+d+") no-repeat 50% fixed;background-size:cover}h1{color:#fff}.custom-dropdown .nav-link{padding:0 .5rem!important;height:54px;display:flex;align-items:center;justify-content:center}.custom-dropdown .dropdown-menu{background:#1a1a1b;margin:0;border-radius:0 0 0 5px;padding:.5rem 5px}.custom-dropdown .dropdown-item{color:#e3e3e3;padding:.25rem 1.5rem .25rem .5rem}.custom-header .bg-info{background-color:#1a1a1b!important}.custom-header .navbar{padding:0 0 0 1em}.custom-header .navbar-brand{padding:.75rem 0}a:focus,btn:focus{outline:none}.navbar-toggler:focus{outline:none!important;box-shadow:none}.dropdown-item:focus,.dropdown-item:hover,.dropdown:hover,.navbar-dark .navbar-nav .nav-link:focus,.navbar-dark .navbar-nav .nav-link:hover{background-color:rgba(51,63,68,.4)}.navbar-dark .navbar-nav .nav-link{color:#e3e3e3}.nav-item{border-radius:5px}.navbar-dark .navbar-nav .nav-link:hover{color:#e3e3e3;border-radius:5px}.special-nav-item{background-color:rgba(148,243,228,.36078)}.custom-form label{color:#e3e3e3}.custom-form input{background:rgba(26,26,27,.38039);transition:border .4s;border:none;border-bottom:2px solid rgba(208,187,143,.1803921569)}.custom-form input::-moz-placeholder{color:hsla(0,0%,100%,.2);font-size:14px}.custom-form input:-ms-input-placeholder{color:hsla(0,0%,100%,.2);font-size:14px}.custom-form input::placeholder{color:hsla(0,0%,100%,.2);font-size:14px}.custom-form input:focus{outline:none;border-color:unset;border-bottom:2px solid #d0bb8f!important;color:#e3e3e3!important;box-shadow:none;background:rgba(26,26,27,.38039)}.custom-btn{display:flex;align-items:center;background:rgba(148,243,228,.36078);border:none;transition:.3s}.custom-btn svg{margin-right:5px}.custom-btn:focus{outline:none!important;border-color:unset;box-shadow:none}.btn-error,.btn-error:focus,.btn-error:hover{background:#dc3545}.white-hr{margin:5px 0;background-color:hsla(0,0%,100%,.2)}",""]),t.exports=l},274:function(t,e,n){t.exports=n.p+"img/bg-image.2d123ad.jpg"},275:function(t,e,n){"use strict";n(203)},276:function(t,e,n){var r=n(63)(!1);r.push([t.i,".nav-item[data-v-3bf7b762]{margin:0 .25em}.nav-item .nav-link .b-icon.bi[data-v-3bf7b762]{color:#94f3e4}.custom-dropdown[data-v-3bf7b762]{margin:0}",""]),t.exports=r},277:function(t,e,n){"use strict";n(204)},278:function(t,e,n){var r=n(63)(!1);r.push([t.i,".custom-alert[data-v-f75d1a6e]{position:fixed;top:80px;right:30px;z-index:2}",""]),t.exports=r},279:function(t,e){},280:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return r})),n.d(e,"mutations",(function(){return o}));var r=function(){return{alertMessage:"",variant:"",showDismissibleAlert:!1}},o={setShowDismissibleAlert:function(t,e){t.showDismissibleAlert=e},setAlertMessage:function(t,e){t.alertMessage=e},setAlertVariant:function(t,e){t.variant=e}}},316:function(t,e,n){"use strict";n.r(e),n.d(e,"actions",(function(){return c})),n.d(e,"mutations",(function(){return l}));var r=n(23),o=(n(70),n(11),n(19),function(t,e,n){t("modules/alert/setAlertMessage",void 0!==e.response?e.response.data.error:e,{root:!0}),t("modules/alert/setShowDismissibleAlert",!0,{root:!0}),t("modules/alert/setAlertVariant",n,{root:!0})}),c={login:function(t,e){var n=this;return Object(r.a)(regeneratorRuntime.mark((function r(){var c;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return c=t.commit,r.prev=1,r.next=4,n.$auth.loginWith("local",{data:e});case 4:return r.next=6,n.$router.replace("/");case 6:o(c,"Success!","success"),r.next=12;break;case 9:r.prev=9,r.t0=r.catch(1),o(c,r.t0,"warning");case 12:case"end":return r.stop()}}),r,null,[[1,9]])})))()}},l={setAccessToken:function(t,e){t.access_token=e}}}},[[231,7,1,8]]]);
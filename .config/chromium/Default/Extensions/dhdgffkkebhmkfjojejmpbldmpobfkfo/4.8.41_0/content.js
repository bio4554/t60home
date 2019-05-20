'use strict';(function(r){var f=r.rea;if(void 0!==f.globals._content)console.warn('content: Stop here, cause a second Tampermonkey instance was detected!\nThis can be caused by using "document.write" at Userscripts.\nSee https://code.google.com/p/chromium/issues/detail?id=253388 for more information');else{f.globals._content=!0;var h;r.Registry=function(){var d={},e=[],b=function(){e=e.filter(function(a){var b=!1;a.r.forEach(function(a){d[a]||(b=!0)});if(b)return!0;a.fn()})},c=function(a,c,l){d[a]=
l;b()},a=function(a){a=d[a];return a instanceof Function?a():a};return{register:c,registerRaw:c,get:a,getRaw:a,require:function(a,c){e.push({r:a,fn:c});b()}}}();var t=function(){var d=function(b){return({}.toString.apply(b).match(/\s([a-z|A-Z]+)/)||[null,b&&"INPUT"===b.nodeName?"HTMLInputElement":"Object"])[1]},e=function(b){if("Object"==d(b)){var c=[],a;for(a in b)b.hasOwnProperty(a)&&c.push(a+":"+e(b[a]));return"{"+c.join(",")+"}"}if("Array"==d(b)){var k=[];b.forEach(function(a){k.push(e(a))});
return"["+k.join(",")+"]"}return void 0===b?"undefined":null===b?"null":"Function"==d(b)?b.toString():'"'+b.toString()+'"'};return{createUUID:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(b){var c=16*Math.random()|0;return("x"==b?c:c&3|8).toString(16)})},processQueue:function(b){for(var c;c=b.shift();)c()},serialize:e,toType:d}}(),A=function(){var d={_content:!0,JSHINT:!0},e=/(webkitStorageInfo|webkitIDB.*|webkitIndexedDB|webkitOfflineAudioContext|webkitAudioContext|webkitURL|webkitSpeech.*|Bluetooth.*|MIDI.*|StorageManager)/;
return function(){var b={},c,a,k=Object.getOwnPropertyNames(window),n=function(a,b){for(;(a=Object.getPrototypeOf(a))&&a!==Object.prototype;)b=b.concat(Object.getOwnPropertyNames(a));return b}(window,[]);c=0;for(a=null;a=n[c];c++)d[a]||e.exec(a)||(2<a.length&&"on"===a.substr(0,2)?b[a]={proto:!0,event:!0}:b[a]={proto:!0});c=0;for(a=null;a=k[c];c++)d[a]||b[a]||e.exec(a)||(2<a.length&&"on"===a.substr(0,2)?b[a]={window:!0,event:!0}:b[a]={window:!0});var l={addEventListener:{window:1},alert:{window:1},
atob:{window:1},blur:{window:1},btoa:{window:1},clearInterval:{window:1},clearTimeout:{window:1},close:{window:1},confirm:{window:1},decodeURI:{window:1},decodeURIComponent:{window:1},dispatchEvent:{window:1},encodeURI:{window:1},encodeURIComponent:{window:1},eval:{window:1},find:{window:1},focus:{window:1},getComputedStyle:{window:1},getSelection:{window:1},isFinite:{window:1},isNaN:{window:1},location:{window:1},open:{window:1},openDialog:{window:1},parseFloat:{window:1},parseInt:{window:1},postMessage:{window:1},
print:{window:1},prompt:{window:1},removeEventListener:{window:1},resizeBy:{window:1},resizeTo:{window:1},scroll:{window:1},scrollBy:{window:1},scrollByLines:{window:1},scrollByPages:{window:1},scrollTo:{window:1},setInterval:{window:1},setTimeout:{window:1},stop:{window:1}};Object.keys(l).forEach(function(a){b[a]||(b[a]=l[a])});return b}}(),g=t.createUUID(),u=window.self==window.top,y=0,v,m=function(d){var e=function(){return d.dispatchEvent.apply(d,arguments)},b=function(){return d.addEventListener.apply(d,
arguments)},c=function(){return d.removeEventListener.apply(d,arguments)},a=function(a,b){var c=d.createEvent("MutationEvent");c.initMutationEvent(a,!1,!1,null,null,null,JSON.stringify(b),c.ADDITION);return c},k=function(a,b){var c;a&&(c=h[a])&&(c(b),delete h[a])},n,l,x,f,g=1,h={};return{init:function(c){f||(f=c);x="2P_"+f;l="2C_"+f;b(l,function(b){var c=JSON.parse(b.attrName);"message.response"==c.m?k(c.r,c.a):n&&n(c,c.r?function(b){b=a(x,{m:"message.response",a:b,r:c.r});e(b)}:function(){})},!1)},
send:function(b,c,d){if(d){var l=++g;h[g]=d;d=l}else d=null;b=a(x,{m:b,a:c,r:d});e(b)},onMessage:{addListener:function(a){n=a}},cleanup:function(){c(l,n,!1)}}}(document),z=function(){var d={},e,b=function(b){var a=[],e=[],n=function(){l=e=a=null;delete d[b]},l={postMessage:function(a){m.send("port.message",{response_id:b,value:a})},onMessage:{addListener:function(b){a.push(b)}},onDisconnect:{addListener:function(a){e.push(a)}},disconnect:function(){m.send("port.message",{response_id:b,disconnect:!0});
n()}};d[b]={message:function(b){a&&a.forEach(function(a){a(b)})},disconnect:function(a){e&&e.forEach(function(b){b(a)});n()}};return l};return{message:function(c){var a;c.connect?e&&e(c.destination,b(c.response_id)):(a=d[c.response_id])?c.disconnect?a.disconnect():a.message(c.value):h&&console.warn("ports: unkown id",c.response_id,c)},connect:function(c){var a=t.createUUID();m.send("port.message",{response_id:a,connect:!0,destination:c});return b(a)},onConnect:{addListener:function(b){e=b}}}}(),p=
function(){var d,e,b=[],c=[],a=function(){h&&console.log("content: detected DOMContentLoaded "+g);e=!0;window.removeEventListener("DOMContentLoaded",a,!1);a=null;t.processQueue(b)},k=function(){h&&console.log("content: detected load "+g);d=e=!0;n.cleanup();t.processQueue(c)};window.addEventListener("DOMContentLoaded",a,!1);window.addEventListener("load",k,!1);var n={registerDomListener:function(a){e||d?a():b.push(a)},registerPageListener:function(a){d?a():c.push(a)},forcedLoad:function(){d||e||!k||
(h&&console.log("content: use forced load "+g),k(!0))},seen:function(){var a={};a.__defineGetter__("load",function(){return d});a.__defineGetter__("DOMContentLoaded",function(){return e});return a}(),cleanup:function(){a&&(window.removeEventListener("DOMContentLoaded",a,!1),a=null);k&&(window.removeEventListener("load",k,!1),k=null)}};return n}(),q=function(){return{init:function(d){f.page.eval("("+v.backup+')(window, document,"'+d+'",'+h+");\n")},cleanup:function(){m.send("cleanup")},next:function(d,
e,b){var c={short_id:f.runtime.short_id};"inIncognitoContext downloadMode enforce_strict_mode measure_scripts version external_connect statistics".split(" ").forEach(function(a){c[a]=d[a]});c.sandbox_allow_getters=!0;c.detect_constructors_by_keys=f.FEATURES.RUNTIME.DETECT_CONSTRUCTORS_BY_KEYS;h&&(p.seen.load?console.log("content: Start ENV with page loaded "+g):p.seen.DOMContentLoaded?console.log("content: Start ENV with DOMContentLoaded "+g):console.log("content: Start ENV normally "+g));e=v.next(g,
JSON.stringify(d.scripts),t.serialize(e),JSON.stringify(b),JSON.stringify(c),JSON.stringify({}),y,void 0,void 0,void 0,void 0,h,p.seen.load,p.seen.DOMContentLoaded,v.environment);m.send("next",{src:e})}}}(),w=function(){var d={registerMenuCommand:function(b){var c=f.extension.connect("registerMenuCommand");c.onMessage.addListener(function(a){a.run&&null!==c&&b.postMessage("run")});c.onDisconnect.addListener(function(){b.disconnect()});b.onMessage.addListener(function(a){if("register"===a.method){var b=
a.name,d=a.uuid;a=a.accessKey;var e=[g,b,d].join("#");c.postMessage({method:"registerMenuCommand",name:b,uuid:d,menuId:e,accessKey:a})}});b.onDisconnect.addListener(function(){c.disconnect()})},openInTab:function(b){var c=f.extension.connect("openInTab");c.onMessage.addListener(function(a){b.postMessage(a)});c.onDisconnect.addListener(function(){b.disconnect()});b.onMessage.addListener(function(a){if("openTab"==a.method){var b=a.url;a=a.options;if("boolean"===typeof a||void 0===a)a={loadInBackground:a};
var d=void 0===a.active?void 0===a.loadInBackground?!1:!a.loadInBackground:a.active,e=void 0===a.insert?!0:a.insert;b&&0===b.search(/^\/\//)&&(b=location.protocol+b);c.postMessage({method:"openInTab",details:{url:b,options:{active:!!d,insert:!!e,setParent:!!a.setParent}}})}else void 0!==a.name?c.postMessage({name:a.name}):a.close&&c.postMessage({close:!0})});b.onDisconnect.addListener(function(){c.disconnect()})},download:function(b){var c=f.extension.connect("download");c.onMessage.addListener(function(a){b.postMessage(a)});
c.onDisconnect.addListener(function(){b.disconnect()});b.onMessage.addListener(function(a){a.cancel?c.postMessage({cancel:!0,id:g}):(a=a.details,a.url&&"/"===a.url[0]&&(a.url=location.origin+a.url),c.postMessage({method:"download",details:a,id:g}))});b.onDisconnect.addListener(function(){c.disconnect()})},webRequest:function(b){var c=f.extension.connect("webRequest");c.onMessage.addListener(function(a){b.postMessage(a)});c.onDisconnect.addListener(function(){b.disconnect()});b.onMessage.addListener(function(a){c.postMessage({method:"webRequest",
rules:a.rules,uuid:a.uuid})});b.onDisconnect.addListener(function(){c.disconnect()})},xhr:function(b){var c=f.extension.connect("xhr");c.onMessage.addListener(function(a){b.postMessage(a)});c.onDisconnect.addListener(function(){b.disconnect()});b.onMessage.addListener(function(a){c.postMessage(a)});b.onDisconnect.addListener(function(){c.disconnect()})},values:function(b){var c=f.extension.connect("values");c.onMessage.addListener(function(a){b.postMessage(a)});c.onDisconnect.addListener(function(){b.disconnect()});
b.onMessage.addListener(function(a){c.postMessage(a)});b.onDisconnect.addListener(function(){c.disconnect()})}},e={setClipboard:function(b,c){var a=b.content,d=b.info,e=typeof d,l,f;"object"===e?(d.type&&(l=d.type),d.mimetype&&(f=d.mimetype)):"string"===e&&(l=d);var g=function(b){document.removeEventListener("copy",g,!0);b.stopImmediatePropagation();b.preventDefault();b.clipboardData.setData(f||("html"==l?"text/html":"text/plain"),a)};document.addEventListener("copy",g,!0);document.execCommand("copy");
c()},notification:function(b,c){b.method="notification";f.extension.sendMessage(b,c)},syntaxCheck:function(b,c){b.method="syntaxCheck";f.extension.sendMessage(b,c)},closeTab:function(b,c){f.extension.sendMessage({method:"closeTab",id:g},function(a){a.error&&console.warn(a.error);c()})},focusTab:function(b,c){f.extension.sendMessage({method:"focusTab",id:g},function(a){a.error&&console.warn(a.error);c()})},addStyle:function(b,c){try{var a=document.createElement("style");a.textContent=b.css||"";b.id&&
a.setAttribute("id",b.id);(document.head||document.body||document.documentElement||document).appendChild(a);c()}catch(d){console.warn("content: error adding style",d)}},tabs:function(b,c){b.method="tabs";f.extension.sendMessage(b,function(a){c(a.data)})},cookie:function(b,c){b.method="cookie";f.extension.sendMessage(b,function(a){c(a.data)})},api:function(b){b.method="api";f.extension.sendMessage(b,function(){})}};return{init:function(){},getApi:function(){var b={};[e,d].forEach(function(c){Object.keys(c).map(function(a){b["GM_"+
a]=c[a]})});return b},processMessage:function(b,c,a){if(b=e[b])return b(c,a);a()},processConnect:function(b,c){var a;if(a=d[b])return a(c)}}}();f.extension.onMessage.addListener(function(d,e,b){d.id&&d.id!=g?console.warn("content: Not for me! "+g.substr(0,10)+"!="+d.id):"executeScript"==d.method?d.url&&0!==window.location.href.search(d.url)?h&&console.log("exec: URL doesn't match",window.location,d):d.topframe&&!u?h&&console.log("exec: topframe doesn't match",window.self,d):m.send("executeScript",
d):"onLoad"==d.method?(document.readyState&&"complete"!==document.readyState||p.forcedLoad(),b({})):u&&("loadUrl"==d.method?(window.location=d.url,b({})):"reload"==d.method?(window.location.reload(),b({})):"confirm"==d.method?window.setTimeout(function(){var c=window.confirm(d.msg);b({confirm:c})},100):"showMsg"==d.method?window.setTimeout(function(){window.setTimeout(function(){window.alert(d.msg)},1);b({})},100):"setForeignAttr"==d.method?(m.send(d.method,d),b({})):window.console.log("content: unknown method "+
d.method))});z.onConnect.addListener(function(d,e){w.processConnect(d,e)});m.onMessage.addListener(function(d,e){if("document.write"==d.m){var b=document.documentElement;window.setTimeout(function(){b!==document.documentElement&&m.init()},0)}else"port.message"==d.m?z.message(d.a):"csp"==d.m?f.page.eval('window["'+d.a.id+'"] = function() { '+d.a.src+" };\n"):"external.message"==d.m?f.extension.sendMessage({method:"externalMessage",request:d.a},function(b){e(b)}):w.processMessage(d.m,d.a,e)});Registry.require(["page.js"],
function(){v=Registry.getRaw("page.js");var d=!1,e=function(a,b,c){var e=1,k=function(){h&&console.debug('content: send "prepare" message');f.extension.sendMessage({method:"prepare",id:g,topframe:u,url:window.location.href},function(f){d||(f?(d=!0,f.contexters||f.scripts&&f.scripts.length||f.external_connect?(c&&c(),b(f)):(q.cleanup(),a())):(h&&console.debug("content: _early_ execution, connection to bg failed -> retry!"),window.setTimeout(k,e),e*=2))})};f.content.onReady(k)},b=location.pathname+
location.search,c="TM_"+f.runtime.short_id+window.btoa(b.length+b).substr(0,255).replace(/[#=\/]/g,"_"),a=function(){var a,b,d,e;try{e=document.cookie.split(";")}catch(f){return}for(a=0;a<e.length;a++)if(b=e[a].substr(0,e[a].indexOf("=")),d=e[a].substr(e[a].indexOf("=")+1),b=b.replace(/^\s+|\s+$/g,""),0===b.indexOf(c)&&(document.cookie=b+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT;",b=window.decodeURIComponent(d),0===b.indexOf("blob:")&&(d=new XMLHttpRequest,d.open("GET",b,!1),d.send(null),200===d.status||
0===d.status)))try{return JSON.parse(d.responseText)}catch(f){console.warn("content: unable to decode"+d.responseText)}},k=document.contentType&&"text/html"!=document.contentType;(function(a,b,c){k?window.setTimeout(function(){a(b,c)},1):a(b,c)})(function(b,c){h&&console.log("content: Started ("+g+", "+window.location.origin+window.location.pathname+")",r.tm_info);var d;f.FEATURES.RUNTIME.FAST_EXEC_SUPPORT&&(d=a())||(d=r.tm_info)?(delete r.tm_info,d.contexters||d.scripts&&d.scripts.length||d.external_connect?
(q.init(g),m.init(g),c(d,"sync")):b(),f.FEATURES.RUNTIME.FAST_EXEC_SUPPORT&&f.extension.sendMessage({method:"prepare",url:window.location.href,cleanup:!0},function(){})):k?e(b,c,function(){q.init(g);m.init(g)}):(q.init(g),m.init(g),e(b,c))},function(){h&&console.log("content: disable event processing for "+g);p.cleanup();q.cleanup();m.cleanup()},function(a,b){y=a.logLevel;h|=60<=y;p.registerDomListener(function(){m.send("DOMContentLoaded")});p.registerPageListener(function(){m.send("load")});h&&console.log("content: "+
(b||"normal")+" start event processing for "+g+" ("+a.scripts.length+" to run)");w.init(a.scripts);q.next(a,w.getApi(),A());u||window.addEventListener("unload",function(){f.extension.sendMessage({method:"unLoad",id:g,topframe:!1,url:window.location.href},function(){});p.cleanup();q.cleanup();m.cleanup()},!1)})})}})(window);

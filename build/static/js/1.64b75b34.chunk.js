(this["webpackJsonpreact-web"]=this["webpackJsonpreact-web"]||[]).push([[1],{661:function(e,t,n){"use strict";var r=n(0),o=r.createContext({});t.a=o},700:function(e,t,n){"use strict";var r=n(1),o=n(4),i=n(0),a=(n(660),n(2),n(5)),c=n(9),l=n(795),s=n(796),u=n(16),d=n(47),f=n(87),p={vertical:"top",horizontal:"right"},v={vertical:"top",horizontal:"left"},h=i.forwardRef((function(e,t){var n=e.autoFocus,c=void 0===n||n,h=e.children,m=e.classes,b=e.disableAutoFocusItem,g=void 0!==b&&b,E=e.MenuListProps,O=void 0===E?{}:E,y=e.onClose,j=e.onEntering,w=e.open,C=e.PaperProps,x=void 0===C?{}:C,P=e.PopoverClasses,k=e.transitionDuration,D=void 0===k?"auto":k,M=e.variant,N=void 0===M?"selectedMenu":M,T=Object(o.a)(e,["autoFocus","children","classes","disableAutoFocusItem","MenuListProps","onClose","onEntering","open","PaperProps","PopoverClasses","transitionDuration","variant"]),z=Object(f.a)(),F=c&&!g&&w,R=i.useRef(null),I=i.useRef(null),H=-1;i.Children.map(h,(function(e,t){i.isValidElement(e)&&(e.props.disabled||("menu"!==N&&e.props.selected||-1===H)&&(H=t))}));var L=i.Children.map(h,(function(e,t){return t===H?i.cloneElement(e,{ref:function(t){I.current=u.findDOMNode(t),Object(d.a)(e.ref,t)}}):e}));return i.createElement(l.a,Object(r.a)({getContentAnchorEl:function(){return I.current},classes:P,onClose:y,onEntering:function(e,t){R.current&&R.current.adjustStyleForScrollbar(e,z),j&&j(e,t)},anchorOrigin:"rtl"===z.direction?p:v,transformOrigin:"rtl"===z.direction?p:v,PaperProps:Object(r.a)({},x,{classes:Object(r.a)({},x.classes,{root:m.paper})}),open:w,ref:t,transitionDuration:D},T),i.createElement(s.a,Object(r.a)({onKeyDown:function(e){"Tab"===e.key&&(e.preventDefault(),y&&y(e,"tabKeyDown"))},actions:R,autoFocus:c&&(-1===H||g),autoFocusItem:F,variant:N},O,{className:Object(a.a)(m.list,O.className)}),L))}));t.a=Object(c.a)({paper:{maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"},list:{outline:0}},{name:"MuiMenu"})(h)},701:function(e,t,n){"use strict";var r=n(1),o=n(4),i=n(0),a=(n(2),n(5)),c=n(9),l=n(661),s=i.forwardRef((function(e,t){var n=e.children,c=e.classes,s=e.className,u=e.component,d=void 0===u?"ul":u,f=e.dense,p=void 0!==f&&f,v=e.disablePadding,h=void 0!==v&&v,m=e.subheader,b=Object(o.a)(e,["children","classes","className","component","dense","disablePadding","subheader"]),g=i.useMemo((function(){return{dense:p}}),[p]);return i.createElement(l.a.Provider,{value:g},i.createElement(d,Object(r.a)({className:Object(a.a)(c.root,s,p&&c.dense,!h&&c.padding,m&&c.subheader),ref:t},b),m,n))}));t.a=Object(c.a)({root:{listStyle:"none",margin:0,padding:0,position:"relative"},padding:{paddingTop:8,paddingBottom:8},dense:{},subheader:{paddingTop:0}},{name:"MuiList"})(s)},795:function(e,t,n){"use strict";var r=n(1),o=n(4),i=n(0),a=(n(2),n(16)),c=n(171),l=n(5),s=n(25),u=n(92),d=n(48),f=n(9),p=n(624),v=n(618),h=n(375);function m(e,t){var n=0;return"number"===typeof t?n=t:"center"===t?n=e.height/2:"bottom"===t&&(n=e.height),n}function b(e,t){var n=0;return"number"===typeof t?n=t:"center"===t?n=e.width/2:"right"===t&&(n=e.width),n}function g(e){return[e.horizontal,e.vertical].map((function(e){return"number"===typeof e?"".concat(e,"px"):e})).join(" ")}function E(e){return"function"===typeof e?e():e}var O=i.forwardRef((function(e,t){var n=e.action,f=e.anchorEl,O=e.anchorOrigin,y=void 0===O?{vertical:"top",horizontal:"left"}:O,j=e.anchorPosition,w=e.anchorReference,C=void 0===w?"anchorEl":w,x=e.children,P=e.classes,k=e.className,D=e.container,M=e.elevation,N=void 0===M?8:M,T=e.getContentAnchorEl,z=e.marginThreshold,F=void 0===z?16:z,R=e.onEnter,I=e.onEntered,H=e.onEntering,L=e.onExit,S=e.onExited,A=e.onExiting,K=e.open,W=e.PaperProps,B=void 0===W?{}:W,J=e.transformOrigin,V=void 0===J?{vertical:"top",horizontal:"left"}:J,U=e.TransitionComponent,X=void 0===U?v.a:U,Y=e.transitionDuration,q=void 0===Y?"auto":Y,G=e.TransitionProps,Q=void 0===G?{}:G,Z=Object(o.a)(e,["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","classes","className","container","elevation","getContentAnchorEl","marginThreshold","onEnter","onEntered","onEntering","onExit","onExited","onExiting","open","PaperProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps"]),$=i.useRef(),_=i.useCallback((function(e){if("anchorPosition"===C)return j;var t=E(f),n=(t&&1===t.nodeType?t:Object(s.a)($.current).body).getBoundingClientRect(),r=0===e?y.vertical:"center";return{top:n.top+m(n,r),left:n.left+b(n,y.horizontal)}}),[f,y.horizontal,y.vertical,j,C]),ee=i.useCallback((function(e){var t=0;if(T&&"anchorEl"===C){var n=T(e);if(n&&e.contains(n)){var r=function(e,t){for(var n=t,r=0;n&&n!==e;)r+=(n=n.parentElement).scrollTop;return r}(e,n);t=n.offsetTop+n.clientHeight/2-r||0}0}return t}),[y.vertical,C,T]),te=i.useCallback((function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return{vertical:m(e,V.vertical)+t,horizontal:b(e,V.horizontal)}}),[V.horizontal,V.vertical]),ne=i.useCallback((function(e){var t=ee(e),n={width:e.offsetWidth,height:e.offsetHeight},r=te(n,t);if("none"===C)return{top:null,left:null,transformOrigin:g(r)};var o=_(t),i=o.top-r.vertical,a=o.left-r.horizontal,c=i+n.height,l=a+n.width,s=Object(u.a)(E(f)),d=s.innerHeight-F,p=s.innerWidth-F;if(i<F){var v=i-F;i-=v,r.vertical+=v}else if(c>d){var h=c-d;i-=h,r.vertical+=h}if(a<F){var m=a-F;a-=m,r.horizontal+=m}else if(l>p){var b=l-p;a-=b,r.horizontal+=b}return{top:"".concat(Math.round(i),"px"),left:"".concat(Math.round(a),"px"),transformOrigin:g(r)}}),[f,C,_,ee,te,F]),re=i.useCallback((function(){var e=$.current;if(e){var t=ne(e);null!==t.top&&(e.style.top=t.top),null!==t.left&&(e.style.left=t.left),e.style.transformOrigin=t.transformOrigin}}),[ne]),oe=i.useCallback((function(e){$.current=a.findDOMNode(e)}),[]);i.useEffect((function(){K&&re()})),i.useImperativeHandle(n,(function(){return K?{updatePosition:function(){re()}}:null}),[K,re]),i.useEffect((function(){if(K){var e=Object(c.a)((function(){re()}));return window.addEventListener("resize",e),function(){e.clear(),window.removeEventListener("resize",e)}}}),[K,re]);var ie=q;"auto"!==q||X.muiSupportAuto||(ie=void 0);var ae=D||(f?Object(s.a)(E(f)).body:void 0);return i.createElement(p.a,Object(r.a)({container:ae,open:K,ref:t,BackdropProps:{invisible:!0},className:Object(l.a)(P.root,k)},Z),i.createElement(X,Object(r.a)({appear:!0,in:K,onEnter:R,onEntered:I,onExit:L,onExited:S,onExiting:A,timeout:ie},Q,{onEntering:Object(d.a)((function(e,t){H&&H(e,t),re()}),Q.onEntering)}),i.createElement(h.a,Object(r.a)({elevation:N,ref:oe},B,{className:Object(l.a)(P.paper,B.className)}),x)))}));t.a=Object(f.a)({root:{},paper:{position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}},{name:"MuiPopover"})(O)},796:function(e,t,n){"use strict";var r=n(1),o=n(4),i=n(0),a=(n(660),n(2),n(16)),c=n(25),l=n(701),s=n(356),u=n(15);function d(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function f(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function p(e,t){if(void 0===t)return!0;var n=e.innerText;return void 0===n&&(n=e.textContent),0!==(n=n.trim().toLowerCase()).length&&(t.repeating?n[0]===t.keys[0]:0===n.indexOf(t.keys.join("")))}function v(e,t,n,r,o,i){for(var a=!1,c=o(e,t,!!t&&n);c;){if(c===e.firstChild){if(a)return;a=!0}var l=!r&&(c.disabled||"true"===c.getAttribute("aria-disabled"));if(c.hasAttribute("tabindex")&&p(c,i)&&!l)return void c.focus();c=o(e,c,n)}}var h="undefined"===typeof window?i.useEffect:i.useLayoutEffect,m=i.forwardRef((function(e,t){var n=e.actions,m=e.autoFocus,b=void 0!==m&&m,g=e.autoFocusItem,E=void 0!==g&&g,O=e.children,y=e.className,j=e.disabledItemsFocusable,w=void 0!==j&&j,C=e.disableListWrap,x=void 0!==C&&C,P=e.onKeyDown,k=e.variant,D=void 0===k?"selectedMenu":k,M=Object(o.a)(e,["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"]),N=i.useRef(null),T=i.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});h((function(){b&&N.current.focus()}),[b]),i.useImperativeHandle(n,(function(){return{adjustStyleForScrollbar:function(e,t){var n=!N.current.style.width;if(e.clientHeight<N.current.clientHeight&&n){var r="".concat(Object(s.a)(!0),"px");N.current.style["rtl"===t.direction?"paddingLeft":"paddingRight"]=r,N.current.style.width="calc(100% + ".concat(r,")")}return N.current}}}),[]);var z=i.useCallback((function(e){N.current=a.findDOMNode(e)}),[]),F=Object(u.a)(z,t),R=-1;i.Children.forEach(O,(function(e,t){i.isValidElement(e)&&(e.props.disabled||("selectedMenu"===D&&e.props.selected||-1===R)&&(R=t))}));var I=i.Children.map(O,(function(e,t){if(t===R){var n={};return E&&(n.autoFocus=!0),void 0===e.props.tabIndex&&"selectedMenu"===D&&(n.tabIndex=0),i.cloneElement(e,n)}return e}));return i.createElement(l.a,Object(r.a)({role:"menu",ref:F,className:y,onKeyDown:function(e){var t=N.current,n=e.key,r=Object(c.a)(t).activeElement;if("ArrowDown"===n)e.preventDefault(),v(t,r,x,w,d);else if("ArrowUp"===n)e.preventDefault(),v(t,r,x,w,f);else if("Home"===n)e.preventDefault(),v(t,null,x,w,d);else if("End"===n)e.preventDefault(),v(t,null,x,w,f);else if(1===n.length){var o=T.current,i=n.toLowerCase(),a=performance.now();o.keys.length>0&&(a-o.lastTime>500?(o.keys=[],o.repeating=!0,o.previousKeyMatched=!0):o.repeating&&i!==o.keys[0]&&(o.repeating=!1)),o.lastTime=a,o.keys.push(i);var l=r&&!o.repeating&&p(r,o);o.previousKeyMatched&&(l||v(t,r,!1,w,d,o))?e.preventDefault():o.previousKeyMatched=!1}P&&P(e)},tabIndex:b?0:-1},M),I)}));t.a=m}}]);
//# sourceMappingURL=1.64b75b34.chunk.js.map
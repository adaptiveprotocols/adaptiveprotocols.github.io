jQuery(document).ready(function($) { //safety pants!
  // Create browser compatible event handler.
  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
  // Listen for a message from the iframe.
  eventer(messageEvent, function(e) {
    if (isNaN(e.data)) return;

    // replace #sizetracker with what ever what ever iframe id you need
    document.getElementById('sizetracker').style.height = e.data + 'px';
    document.getElementById('onesite-roi').style.height = e.data + 'px';

  }, false);

  /*! iFrame Resizer (iframeSizer.min.js ) - v3.5.14 - 2017-03-30
 *  Desc: Force cross domain iframes to size to content.
 *  Requires: iframeResizer.contentWindow.min.js to be loaded into the target frame.
 *  Copyright: (c) 2017 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */

!function(a){"use strict";function b(a,b,c){"addEventListener"in window?a.addEventListener(b,c,!1):"attachEvent"in window&&a.attachEvent("on"+b,c)}function c(a,b,c){"removeEventListener"in window?a.removeEventListener(b,c,!1):"detachEvent"in window&&a.detachEvent("on"+b,c)}function d(){var a,b=["moz","webkit","o","ms"];for(a=0;a<b.length&&!N;a+=1)N=window[b[a]+"RequestAnimationFrame"];N||h("setup","RequestAnimationFrame not supported")}function e(a){var b="Host page: "+a;return window.top!==window.self&&(b=window.parentIFrame&&window.parentIFrame.getId?window.parentIFrame.getId()+": "+a:"Nested host page: "+a),b}function f(a){return K+"["+e(a)+"]"}function g(a){return P[a]?P[a].log:G}function h(a,b){k("log",a,b,g(a))}function i(a,b){k("info",a,b,g(a))}function j(a,b){k("warn",a,b,!0)}function k(a,b,c,d){!0===d&&"object"==typeof window.console&&console[a](f(b),c)}function l(a){function d(){function a(){s(U),p(V),I("resizedCallback",U)}f("Height"),f("Width"),t(a,U,"init")}function e(){var a=T.substr(L).split(":");return{iframe:P[a[0]].iframe,id:a[0],height:a[1],width:a[2],type:a[3]}}function f(a){var b=Number(P[V]["max"+a]),c=Number(P[V]["min"+a]),d=a.toLowerCase(),e=Number(U[d]);h(V,"Checking "+d+" is in range "+c+"-"+b),c>e&&(e=c,h(V,"Set "+d+" to min value")),e>b&&(e=b,h(V,"Set "+d+" to max value")),U[d]=""+e}function g(){function b(){function a(){var a=0,b=!1;for(h(V,"Checking connection is from allowed list of origins: "+d);a<d.length;a++)if(d[a]===c){b=!0;break}return b}function b(){var a=P[V].remoteHost;return h(V,"Checking connection is from: "+a),c===a}return d.constructor===Array?a():b()}var c=a.origin,d=P[V].checkOrigin;if(d&&""+c!="null"&&!b())throw new Error("Unexpected message received from: "+c+" for "+U.iframe.id+". Message was: "+a.data+". This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.");return!0}function k(){return K===(""+T).substr(0,L)&&T.substr(L).split(":")[0]in P}function l(){var a=U.type in{"true":1,"false":1,undefined:1};return a&&h(V,"Ignoring init message from meta parent page"),a}function w(a){return T.substr(T.indexOf(":")+J+a)}function y(a){h(V,"MessageCallback passed: {iframe: "+U.iframe.id+", message: "+a+"}"),I("messageCallback",{iframe:U.iframe,message:JSON.parse(a)}),h(V,"--")}function z(){var a=document.body.getBoundingClientRect(),b=U.iframe.getBoundingClientRect();return JSON.stringify({iframeHeight:b.height,iframeWidth:b.width,clientHeight:Math.max(document.documentElement.clientHeight,window.innerHeight||0),clientWidth:Math.max(document.documentElement.clientWidth,window.innerWidth||0),offsetTop:parseInt(b.top-a.top,10),offsetLeft:parseInt(b.left-a.left,10),scrollTop:window.pageYOffset,scrollLeft:window.pageXOffset})}function A(a,b){function c(){u("Send Page Info","pageInfo:"+z(),a,b)}x(c,32)}function B(){function a(a,b){function c(){P[f]?A(P[f].iframe,f):d()}["scroll","resize"].forEach(function(d){h(f,a+d+" listener for sendPageInfo"),b(window,d,c)})}function d(){a("Remove ",c)}function e(){a("Add ",b)}var f=V;e(),P[f].stopPageInfo=d}function C(){P[V]&&P[V].stopPageInfo&&(P[V].stopPageInfo(),delete P[V].stopPageInfo)}function D(){var a=!0;return null===U.iframe&&(j(V,"IFrame ("+U.id+") not found"),a=!1),a}function E(a){var b=a.getBoundingClientRect();return o(V),{x:Math.floor(Number(b.left)+Number(M.x)),y:Math.floor(Number(b.top)+Number(M.y))}}function F(a){function b(){M=f,G(),h(V,"--")}function c(){return{x:Number(U.width)+e.x,y:Number(U.height)+e.y}}function d(){window.parentIFrame?window.parentIFrame["scrollTo"+(a?"Offset":"")](f.x,f.y):j(V,"Unable to scroll to requested position, window.parentIFrame not found")}var e=a?E(U.iframe):{x:0,y:0},f=c();h(V,"Reposition requested from iFrame (offset x:"+e.x+" y:"+e.y+")"),window.top!==window.self?d():b()}function G(){!1!==I("scrollCallback",M)?p(V):q()}function H(a){function b(){var a=E(f);h(V,"Moving to in page link (#"+d+") at x: "+a.x+" y: "+a.y),M={x:a.x,y:a.y},G(),h(V,"--")}function c(){window.parentIFrame?window.parentIFrame.moveToAnchor(d):h(V,"In page link #"+d+" not found and window.parentIFrame not found")}var d=a.split("#")[1]||"",e=decodeURIComponent(d),f=document.getElementById(e)||document.getElementsByName(e)[0];f?b():window.top!==window.self?c():h(V,"In page link #"+d+" not found")}function I(a,b){return m(V,a,b)}function N(){switch(P[V].firstRun&&S(),U.type){case"close":n(U.iframe);break;case"message":y(w(6));break;case"scrollTo":F(!1);break;case"scrollToOffset":F(!0);break;case"pageInfo":A(P[V].iframe,V),B();break;case"pageInfoStop":C();break;case"inPageLink":H(w(9));break;case"reset":r(U);break;case"init":d(),I("initCallback",U.iframe);break;default:d()}}function O(a){var b=!0;return P[a]||(b=!1,j(U.type+" No settings for "+a+". Message was: "+T)),b}function Q(){for(var a in P)u("iFrame requested init",v(a),document.getElementById(a),a)}function S(){P[V].firstRun=!1}var T=a.data,U={},V=null;"[iFrameResizerChild]Ready"===T?Q():k()?(U=e(),V=R=U.id,P[V].loaded=!0,!l()&&O(V)&&(h(V,"Received: "+T),D()&&g()&&N())):i(V,"Ignored: "+T)}function m(a,b,c){var d=null,e=null;if(P[a]){if(d=P[a][b],"function"!=typeof d)throw new TypeError(b+" on iFrame["+a+"] is not a function");e=d(c)}return e}function n(a){var b=a.id;h(b,"Removing iFrame: "+b),a.parentNode&&a.parentNode.removeChild(a),m(b,"closedCallback",b),h(b,"--"),delete P[b]}function o(b){null===M&&(M={x:window.pageXOffset!==a?window.pageXOffset:document.documentElement.scrollLeft,y:window.pageYOffset!==a?window.pageYOffset:document.documentElement.scrollTop},h(b,"Get page position: "+M.x+","+M.y))}function p(a){null!==M&&(window.scrollTo(M.x,M.y),h(a,"Set page position: "+M.x+","+M.y),q())}function q(){M=null}function r(a){function b(){s(a),u("reset","reset",a.iframe,a.id)}h(a.id,"Size reset requested by "+("init"===a.type?"host page":"iFrame")),o(a.id),t(b,a,"reset")}function s(a){function b(b){a.iframe.style[b]=a[b]+"px",h(a.id,"IFrame ("+e+") "+b+" set to "+a[b]+"px")}function c(b){H||"0"!==a[b]||(H=!0,h(e,"Hidden iFrame detected, creating visibility listener"),y())}function d(a){b(a),c(a)}var e=a.iframe.id;P[e]&&(P[e].sizeHeight&&d("height"),P[e].sizeWidth&&d("width"))}function t(a,b,c){c!==b.type&&N?(h(b.id,"Requesting animation frame"),N(a)):a()}function u(a,b,c,d,e){function f(){var e=P[d].targetOrigin;h(d,"["+a+"] Sending msg to iframe["+d+"] ("+b+") targetOrigin: "+e),c.contentWindow.postMessage(K+b,e)}function g(){j(d,"["+a+"] IFrame("+d+") not found")}function i(){c&&"contentWindow"in c&&null!==c.contentWindow?f():g()}function k(){function a(){!P[d]||P[d].loaded||l||(l=!0,j(d,"IFrame has not responded within "+P[d].warningTimeout/1e3+" seconds. Check iFrameResizer.contentWindow.js has been loaded in iFrame. This message can be ingored if everything is working, or you can set the warningTimeout option to a higher value or zero to suppress this warning."))}e&&P[d].warningTimeout&&(P[d].msgTimeout=setTimeout(a,P[d].warningTimeout))}var l=!1;d=d||c.id,P[d]&&(i(),k())}function v(a){return a+":"+P[a].bodyMarginV1+":"+P[a].sizeWidth+":"+P[a].log+":"+P[a].interval+":"+P[a].enablePublicMethods+":"+P[a].autoResize+":"+P[a].bodyMargin+":"+P[a].heightCalculationMethod+":"+P[a].bodyBackground+":"+P[a].bodyPadding+":"+P[a].tolerance+":"+P[a].inPageLinks+":"+P[a].resizeFrom+":"+P[a].widthCalculationMethod}function w(c,d){function e(){function a(a){1/0!==P[x][a]&&0!==P[x][a]&&(c.style[a]=P[x][a]+"px",h(x,"Set "+a+" = "+P[x][a]+"px"))}function b(a){if(P[x]["min"+a]>P[x]["max"+a])throw new Error("Value for min"+a+" can not be greater than max"+a)}b("Height"),b("Width"),a("maxHeight"),a("minHeight"),a("maxWidth"),a("minWidth")}function f(){var a=d&&d.id||S.id+F++;return null!==document.getElementById(a)&&(a+=F++),a}function g(a){return R=a,""===a&&(c.id=a=f(),G=(d||{}).log,R=a,h(a,"Added missing iframe ID: "+a+" ("+c.src+")")),a}function i(){switch(h(x,"IFrame scrolling "+(P[x].scrolling?"enabled":"disabled")+" for "+x),c.style.overflow=!1===P[x].scrolling?"hidden":"auto",P[x].scrolling){case!0:c.scrolling="yes";break;case!1:c.scrolling="no";break;default:c.scrolling=P[x].scrolling}}function k(){("number"==typeof P[x].bodyMargin||"0"===P[x].bodyMargin)&&(P[x].bodyMarginV1=P[x].bodyMargin,P[x].bodyMargin=""+P[x].bodyMargin+"px")}function l(){var a=P[x].firstRun,b=P[x].heightCalculationMethod in O;!a&&b&&r({iframe:c,height:0,width:0,type:"init"})}function m(){Function.prototype.bind&&(P[x].iframe.iFrameResizer={close:n.bind(null,P[x].iframe),resize:u.bind(null,"Window resize","resize",P[x].iframe),moveToAnchor:function(a){u("Move to anchor","moveToAnchor:"+a,P[x].iframe,x)},sendMessage:function(a){a=JSON.stringify(a),u("Send Message","message:"+a,P[x].iframe,x)}})}function o(d){function e(){u("iFrame.onload",d,c,a,!0),l()}b(c,"load",e),u("init",d,c,a,!0)}function p(a){if("object"!=typeof a)throw new TypeError("Options is not an object")}function q(a){for(var b in S)S.hasOwnProperty(b)&&(P[x][b]=a.hasOwnProperty(b)?a[b]:S[b])}function s(a){return""===a||"file://"===a?"*":a}function t(a){a=a||{},P[x]={firstRun:!0,iframe:c,remoteHost:c.src.split("/").slice(0,3).join("/")},p(a),q(a),P[x].targetOrigin=!0===P[x].checkOrigin?s(P[x].remoteHost):"*"}function w(){return x in P&&"iFrameResizer"in c}var x=g(c.id);w()?j(x,"Ignored iFrame, already setup."):(t(d),i(),e(),k(),o(v(x)),m())}function x(a,b){null===Q&&(Q=setTimeout(function(){Q=null,a()},b))}function y(){function a(){function a(a){function b(b){return"0px"===P[a].iframe.style[b]}function c(a){return null!==a.offsetParent}c(P[a].iframe)&&(b("height")||b("width"))&&u("Visibility change","resize",P[a].iframe,a)}for(var b in P)a(b)}function b(b){h("window","Mutation observed: "+b[0].target+" "+b[0].type),x(a,16)}function c(){var a=document.querySelector("body"),c={attributes:!0,attributeOldValue:!1,characterData:!0,characterDataOldValue:!1,childList:!0,subtree:!0},e=new d(b);e.observe(a,c)}var d=window.MutationObserver||window.WebKitMutationObserver;d&&c()}function z(a){function b(){B("Window "+a,"resize")}h("window","Trigger event: "+a),x(b,16)}function A(){function a(){B("Tab Visable","resize")}"hidden"!==document.visibilityState&&(h("document","Trigger event: Visiblity change"),x(a,16))}function B(a,b){function c(a){return"parent"===P[a].resizeFrom&&P[a].autoResize&&!P[a].firstRun}for(var d in P)c(d)&&u(a,b,document.getElementById(d),d)}function C(){b(window,"message",l),b(window,"resize",function(){z("resize")}),b(document,"visibilitychange",A),b(document,"-webkit-visibilitychange",A),b(window,"focusin",function(){z("focus")}),b(window,"focus",function(){z("focus")})}function D(){function b(a,b){function c(){if(!b.tagName)throw new TypeError("Object is not a valid DOM element");if("IFRAME"!==b.tagName.toUpperCase())throw new TypeError("Expected <IFRAME> tag, found <"+b.tagName+">")}b&&(c(),w(b,a),e.push(b))}function c(a){a&&a.enablePublicMethods&&j("enablePublicMethods option has been removed, public methods are now always available in the iFrame")}var e;return d(),C(),function(d,f){switch(e=[],c(d),typeof f){case"undefined":case"string":Array.prototype.forEach.call(document.querySelectorAll(f||"iframe"),b.bind(a,d));break;case"object":b(d,f);break;default:throw new TypeError("Unexpected data type ("+typeof f+")")}return e}}function E(a){a.fn?a.fn.iFrameResize||(a.fn.iFrameResize=function(a){function b(b,c){w(c,a)}return this.filter("iframe").each(b).end()}):i("","Unable to bind to jQuery, it is not fully loaded.")}if("undefined"!=typeof window){var F=0,G=!1,H=!1,I="message",J=I.length,K="[iFrameSizer]",L=K.length,M=null,N=window.requestAnimationFrame,O={max:1,scroll:1,bodyScroll:1,documentElementScroll:1},P={},Q=null,R="Host Page",S={autoResize:!0,bodyBackground:null,bodyMargin:null,bodyMarginV1:8,bodyPadding:null,checkOrigin:!0,inPageLinks:!1,enablePublicMethods:!0,heightCalculationMethod:"bodyOffset",id:"iFrameResizer",interval:32,log:!1,maxHeight:1/0,maxWidth:1/0,minHeight:0,minWidth:0,resizeFrom:"parent",scrolling:!1,sizeHeight:!0,sizeWidth:!1,warningTimeout:5e3,tolerance:0,widthCalculationMethod:"scroll",closedCallback:function(){},initCallback:function(){},messageCallback:function(){j("MessageCallback function not defined")},resizedCallback:function(){},scrollCallback:function(){return!0}};window.jQuery&&E(window.jQuery),"function"==typeof define&&define.amd?define([],D):"object"==typeof module&&"object"==typeof module.exports?module.exports=D():window.iFrameResize=window.iFrameResize||D()}}();
//# sourceMappingURL=iframeResizer.map

  (function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function(partial) {

      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;

    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };

})(jQuery);

$(window).scroll(function(event) {

  $('.js-scroll').each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass('is-scrolled');
    }
  });

});

  $('a[href*="#"]') // Select all links with hashes
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top-68
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

  /**
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler ○ gmail • com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.1.3
 */
;(function(f){"use strict";"function"===typeof define&&define.amd?define(["jquery"],f):"undefined"!==typeof module&&module.exports?module.exports=f(require("jquery")):f(jQuery)})(function($){"use strict";function n(a){return!a.nodeName||-1!==$.inArray(a.nodeName.toLowerCase(),["iframe","#document","html","body"])}function h(a){return $.isFunction(a)||$.isPlainObject(a)?a:{top:a,left:a}}var p=$.scrollTo=function(a,d,b){return $(window).scrollTo(a,d,b)};p.defaults={axis:"xy",duration:0,limit:!0};$.fn.scrollTo=function(a,d,b){"object"=== typeof d&&(b=d,d=0);"function"===typeof b&&(b={onAfter:b});"max"===a&&(a=9E9);b=$.extend({},p.defaults,b);d=d||b.duration;var u=b.queue&&1<b.axis.length;u&&(d/=2);b.offset=h(b.offset);b.over=h(b.over);return this.each(function(){function k(a){var k=$.extend({},b,{queue:!0,duration:d,complete:a&&function(){a.call(q,e,b)}});r.animate(f,k)}if(null!==a){var l=n(this),q=l?this.contentWindow||window:this,r=$(q),e=a,f={},t;switch(typeof e){case "number":case "string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)){e= h(e);break}e=l?$(e):$(e,q);case "object":if(e.length===0)return;if(e.is||e.style)t=(e=$(e)).offset()}var v=$.isFunction(b.offset)&&b.offset(q,e)||b.offset;$.each(b.axis.split(""),function(a,c){var d="x"===c?"Left":"Top",m=d.toLowerCase(),g="scroll"+d,h=r[g](),n=p.max(q,c);t?(f[g]=t[m]+(l?0:h-r.offset()[m]),b.margin&&(f[g]-=parseInt(e.css("margin"+d),10)||0,f[g]-=parseInt(e.css("border"+d+"Width"),10)||0),f[g]+=v[m]||0,b.over[m]&&(f[g]+=e["x"===c?"width":"height"]()*b.over[m])):(d=e[m],f[g]=d.slice&& "%"===d.slice(-1)?parseFloat(d)/100*n:d);b.limit&&/^\d+$/.test(f[g])&&(f[g]=0>=f[g]?0:Math.min(f[g],n));!a&&1<b.axis.length&&(h===f[g]?f={}:u&&(k(b.onAfterFirst),f={}))});k(b.onAfter)}})};p.max=function(a,d){var b="x"===d?"Width":"Height",h="scroll"+b;if(!n(a))return a[h]-$(a)[b.toLowerCase()]();var b="client"+b,k=a.ownerDocument||a.document,l=k.documentElement,k=k.body;return Math.max(l[h],k[h])-Math.min(l[b],k[b])};$.Tween.propHooks.scrollLeft=$.Tween.propHooks.scrollTop={get:function(a){return $(a.elem)[a.prop]()}, set:function(a){var d=this.get(a);if(a.options.interrupt&&a._last&&a._last!==d)return $(a.elem).stop();var b=Math.round(a.now);d!==b&&($(a.elem)[a.prop](b),a._last=this.get(a))}};return p});

  $(window).scroll(function(){
  var scroll = $(window).scrollTop();
  var $nav = $('.navbar');
  var navHeight = $nav.height();
  if (scroll >= navHeight) {
    $nav.addClass('is-scrolled');
  } else {
    $nav.removeClass('is-scrolled');
  }
});
$('.js-nav-trigger').click(function(){
  $(this).toggleClass('is-clicked');
  $('nav.nav').toggleClass('is-visible');
});

  $('.tertiary-nav-item').click(function(){ // user clicks on tertiary nav item
  var $this = $(this),
      navID = $this.attr('id');
  $this.parent().children() // localize
    .removeClass('is-selected'); // remove mod class from all
  $this.toggleClass('is-selected'); // toggle mod class on clicked item
  $this.closest('.tertiary')
    .find('.tertiary-nav-content') // select tertiary content
    .removeClass('is-visible') // remove mod class
    .hide(); // hide all
  $('.tertiary-nav-content#' + navID) // find content that matches clicked element
    .show() // show it
    .addClass('is-visible'); // add mod class
  $this.parent() // select parent ul element
    .scrollTo('.is-selected', 600); // scroll to clicked element, animated 600ms
});

  var $slide 			= $('.slide'),
		$firstSlide = $('.slide:first-child'),
		$lastSlide  = $('.slide:last-child');

$('.slider-dot').click(function(){ // user clicks on nav dots on slider

	var dotID = $(this).attr('id');

	$(this).closest('.slider') // localize
		.find('.slider-dot')
		.removeClass('is-selected'); // remove mod class

	$(this).addClass('is-selected'); // add mod class

	$(this).closest('.slider') // localize
		.find('.slide')
		.removeClass('is-visible') // remove mod class from all slides
		.hide(); // bye!

	$('.slide#' + dotID) // target slide with same ID as clicked dot
		.addClass('is-visible') // add mod class
		.show(); // hi!
});
// Previous slide ----------
function prevSlide() {
	var prevID = $(this).parent('.slide').prev('.slide').attr('id');

	$(this).closest('.slider') // localize
		.find('.slide')
		.removeClass('is-visible next prev') // remove mod class
		.hide(); // hide all slides

	$(this).parent('.slide') // localize
		.prev() // find previous slide
		.addClass('is-visible prev') // add mod class to previous
		.show(); // show previous

	$(this).closest('.slider').find('.slider-dot') // localize and find dots
		.removeClass('is-selected'); // remove mod class from all dots
	$('.slider-dot#' + prevID) // target dot with same ID as current slide
		.addClass('is-selected'); // add mod class
}
// Next slide ----------
function nextSlide() {
	var nextID = $(this).parent('.slide').next('.slide').attr('id');

	$(this).closest('.slider') // same functionality as previous, just backwards, duh
		.find('.slide')
		.removeClass('is-visible next prev')
		.hide();

	 $(this).parent('.slide')
		.next()
		.addClass('is-visible next')
		.show();

	 $(this).closest('.slider').find('.slider-dot')
		.removeClass('is-selected');

	 $('.slider-dot#' + nextID)
		.addClass('is-selected');
}
// Cycle to last slide ----------
function firstSlide() {
	$(this).parent() // localize
		.removeClass('is-visible next prev') // remove mod classes
		.hide(); // bye!

	$(this).closest('.slider').find('.slide:last-child') // find last slide in parent
		.show() // hi!
		.addClass('is-visible prev'); // add mod class

	$(this).closest('.slider') // localize
		.find('.slider-dot') // select slider dots
		.removeClass('is-selected') // remove modd class from all
		.siblings(':last-child') // find last slider dot
		.addClass('is-selected'); // add mod class
}
// Cycle to first slide ----------
function lastSlide() {
	$(this).parent() // localize
		.removeClass('is-visible next prev') // remove mod classes
		.hide(); // bye!

	$(this).closest('.slider').find('.slide:first-child') // find first slide in parent
		.show() // hi!
		.addClass('is-visible next'); // add mod classes

	$(this).closest('.slider') // localize
		.find('.slider-dot') // select slider dots
		.removeClass('is-selected') // remove mod class from all
		.siblings(':first-child') // find first slider dot
		.addClass('is-selected'); // add mod class
}

$('.slider-arrow.prev').click(prevSlide); // clicking prev arrow triggers previous slide

$('.slider-arrow.next').click(nextSlide); // clicking next arrow triggers next slide

$firstSlide.children('.slider-arrow.prev').click(firstSlide); // clicking previous on first slide cycles to end

$lastSlide.children('.slider-arrow.next').click(lastSlide); // clicking next on last slide cycles to beginning

$slide.swipe({ // user swipes on slide
	swipeRight:function() { // user swipes right <3
		if ( $(this).is(':first-child') ) { // if first slide
			$(this).children('.slider-arrow.prev')
				.each(firstSlide); // cycle around to last slide
		} else {
			$(this).children('.slider-arrow.prev')
				.each(prevSlide); // else trigger previous slide
		}
	},
	swipeLeft:function() { // user swipes left </3
		if ( $(this).is(':last-child') ) { // if last slide
			$(this).children('.slider-arrow.next')
				.each(lastSlide); // cycle around to first slide
		} else {
			$(this).children('.slider-arrow.next')
				.each(nextSlide); // else trigger next slide
		}
	},
	threshold:178 // swipe length of 178px or more
});

  // Load more button on awards table ----------
$('.js-awards').click(function(){
  $('.js-awards-row:nth-child(n+6)').toggleClass('is-showing');
  $(this).text(function(i, text){
        return text === "Show More" ? "Show Less" : "Show More";
    });
});

  var $salesProfile = $('.sales-map-profile'),
    $firstProfile = $('.sales-map-profile:first-child'),
    $lastProfile  = $('.sales-map-profile:last-child');

$('.territory').click(function(){ // user clicks on dot on map
  var salesID = $(this).attr('id'); // store ID attribute for each dot clicked

  $salesProfile.addClass('is-visible'); // add mod class to all profiles

  $('.sales-map-profile#' + salesID) // find profile with same ID as clicked dot
    .addClass('is-current') // add mod class for current item
    .show(); // show profile for clicked dot
});

function prevProfile() {
  $(this).parent() // find parent (.sales-map-profile)
    .removeClass('is-current next prev') // remove mod classes
    .hide()
    .prev() // Find previous profile
    .show()
    .addClass('is-current prev'); // mod class
}

function nextProfile() {
  $(this).parent() // find parent
    .removeClass('is-current next prev') // remove mod classes
    .hide()
    .next() // find next profile
    .show()
    .addClass('is-current next'); // add mod class
}

function firstProfile() {
  $(this).removeClass('is-current next prev') // remove mod classes
    .parent()
    .hide(); // hide profile
  $lastProfile.show() // cycle around to last profile
    .addClass('is-current prev'); // add mod class
}

function lastProfile() {
  $(this).removeClass('is-current next prev') // remove mod class
    .parent()
    .hide(); // hide profile
  $firstProfile.show() // cycle around to first profile
    .addClass('is-current next'); // add mod class
}

function closeProfile() {
  $salesProfile.hide()
    .removeClass('is-visible is-current next prev');
}

$('.js-prev').click(prevProfile); // previous arrow triggers previous profile

$('.js-next').click(nextProfile); // next arrow triggers next profile

// cycles around to last profile if user clicks prev on first slide
$firstProfile.children('.js-prev').click(firstProfile);

// cycles around to first profile if user clicks next on last slide
$lastProfile.children('.js-next').click(lastProfile);

$('.js-sales-close').click(closeProfile);

$salesProfile.swipe({ // user swipes sales profile
  swipeRight:function() { // user swipes right <3
    if ( $(this).is(':first-child') ) { // if first profile
      $(this).children('.js-prev')
        .each(firstProfile); // cycle around to last profile
    } else {
      $(this).children('.js-prev')
        .each(prevProfile); // else trigger previous profile
    }
  },
  swipeLeft:function() { // user swipes left </3
    if ( $(this).is(':last-child') ) { // if last profile
      $(this).children('.js-next')
        .each(lastProfile); // cycle around to first profile
    } else {
      $(this).children('.js-next')
        .each(nextProfile); // else trigger next profile
    }
  },
  swipeDown:function() {
    $salesProfile
      .hide() // hide
      .removeClass('is-visible is-current next prev'); // remove all mod classes
  },
  threshold:178 // user must swipe at least 178px across
});

  $('select#academy').change(function() {
	var value = this.value;
	$('.asset').hide()
    .removeClass('is-showing');
  $('.asset.' + value).show()
    .addClass('is-showing');
  if (value == 'all') {
  	$('.asset').show()
      .addClass('is-showing');
  }
});

$(window).resize(function() {
	var $assetTitle = $('.asset-title'),
			assetWidth  = $assetTitle.width();

	$assetTitle.css('height', assetWidth + 32);
}).resize();

  $('.product-feature-item').click(function(){

  var $this     = $(this),
      featureID = $this.attr('id'); // store ID attribute in featureID variable

  $this
    .parent().children() // localize
    .removeClass('is-selected'); // clear mod class from all items

  $this.addClass('is-selected'); // add mod class to clicked element

  $this.closest('.slide') // localize
    .find('.product-features-video') // find videos
    .hide() // hide all videos
    .removeClass('is-visible'); // clear mod classes

  $('.product-features-video#' + featureID) // select video with matching ID
    .addClass('is-visible') // add mod class
    .show(); // show only selected video

});


  // one-off stuff
  // Free trial button
  $('.js-trial').click(function(){
    $('.js-trial-container').addClass('is-visible');
  });
  $('.js-trial-close').click(function(){
    $(this).addClass('is-closed');
    $('.js-trial-container').removeClass('is-visible');
  });
});

// (function() { // more safety pants!
//   if ('serviceWorker' in navigator) {
//     console.log('CLIENT: service worker registration in progress.');
//     navigator.serviceWorker.register('/service-worker.js').then(function() {
//       console.log('CLIENT: service worker registration complete.');
//     }, function() {
//       console.log('CLIENT: service worker registration failure.');
//     });
//   } else {
//     console.log('CLIENT: service worker is not supported.');
//   }
// })();

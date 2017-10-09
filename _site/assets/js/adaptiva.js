jQuery(document).ready(function($) { //safety pants!
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
	var value =  this.value,
      $asset = $('.asset');
	$asset.hide()
    .removeClass('is-showing');
  $('.asset.' + value).addClass('is-showing').show();
  if (value == 'all') {
  	$asset.show()
      .addClass('is-showing');
  }
});

$(window).resize(function() {
  var $assetTitle = $('.asset.is-showing .asset-title'),
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
  $('.js-trial').click(function(){ // user clicks free trial button
    $('.js-trial-container').fadeIn(300); // fade in lightbox
  });

  $('.js-trial-close').click(function(){ // user clicks X
    $('.js-trial-container').fadeOut(300); // fade out lightbox
  });
});

(function() { // more safety pants!
  if ('serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration in progress.');
    navigator.serviceWorker.register('/service-worker.js').then(function() {
      console.log('CLIENT: service worker registration complete.');
    }, function() {
      console.log('CLIENT: service worker registration failure.');
    });
  } else {
    console.log('CLIENT: service worker is not supported.');
  }
})();

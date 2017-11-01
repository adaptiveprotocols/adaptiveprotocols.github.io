(function() { // service worker pants

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
  console.log("Somebody once told me the world is gonna roll me / I ain't the sharpest tool in the shed / She was looking kind of dumb with her finger and her thumb / In the shape of an L on her forehead / Well the years start coming and they don't stop coming / Fed to the rules and I hit the ground running / Didn't make sense not to live for fun / Your brain gets smart but your head gets dumb / So much to do, so much to see / So what's wrong with taking the back streets? / You'll never know if you don't go / You'll never shine if you don't glow / Hey now, you're an all-star, get your game on, go play / Hey now, you're a rock star, get the show on, get paid / And all that glitters is gold / Only shooting stars break the mold");
 // lmfao
})();

(function(){ // confirmation URL check pants

  if(window.location.href.indexOf('confirmation') > -1) { // if URL contains 'confirmation'

    var email = window.location.hash.substr(1); // get hash from URL

    if (email) {

      $('h1#confirmation_heading')
        .text('Success!');

      $('p#confirmation_text')
        .text('Awesome! ' + email + ' has been added to the Adaptiva newsletter subscription list.'); // insert hash into specified <p> tag

    } else {

      $('h1#confirmation_heading')
        .text('Nope')

      $('p#confirmation_text')
        .text("Oops, looks like you didn't fill out a form to get here.");

      $('a#close_window').after('<a class="button white outline" style="border:0;" href="https://adaptiva.com">Back to Home</a>')
    }

  }

})();

function isTouch() { // check to see if touch screen
  try {
    document.createEvent("TouchEvent");
    return true;
  }
  catch(e) {
    return false;
  }
}

jQuery(document).ready(function($) { // DOM ready pants

  (function($) {

  /*!
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


  (function(){ // smooth scrolling pants

  $('a[href*="#"]') // Select all links with hashes
    // Remove links that I don't want scrolling the page
    .not('.tertiary-nav-item a') // tertitary nav links
    .not('[href="#"]')
    .not('[href="#0"]') // placeholder links
    .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

      if (target.length) {// Does a scroll target exist?

        event.preventDefault();

        $('html, body').animate({
          scrollTop: target.offset().top-68

        }, 1000, function() { // Must change focus!

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

})();


  /*!
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler ○ gmail • com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.1.3
 */
;(function(f){"use strict";"function"===typeof define&&define.amd?define(["jquery"],f):"undefined"!==typeof module&&module.exports?module.exports=f(require("jquery")):f(jQuery)})(function($){"use strict";function n(a){return!a.nodeName||-1!==$.inArray(a.nodeName.toLowerCase(),["iframe","#document","html","body"])}function h(a){return $.isFunction(a)||$.isPlainObject(a)?a:{top:a,left:a}}var p=$.scrollTo=function(a,d,b){return $(window).scrollTo(a,d,b)};p.defaults={axis:"xy",duration:0,limit:!0};$.fn.scrollTo=function(a,d,b){"object"=== typeof d&&(b=d,d=0);"function"===typeof b&&(b={onAfter:b});"max"===a&&(a=9E9);b=$.extend({},p.defaults,b);d=d||b.duration;var u=b.queue&&1<b.axis.length;u&&(d/=2);b.offset=h(b.offset);b.over=h(b.over);return this.each(function(){function k(a){var k=$.extend({},b,{queue:!0,duration:d,complete:a&&function(){a.call(q,e,b)}});r.animate(f,k)}if(null!==a){var l=n(this),q=l?this.contentWindow||window:this,r=$(q),e=a,f={},t;switch(typeof e){case "number":case "string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)){e= h(e);break}e=l?$(e):$(e,q);case "object":if(e.length===0)return;if(e.is||e.style)t=(e=$(e)).offset()}var v=$.isFunction(b.offset)&&b.offset(q,e)||b.offset;$.each(b.axis.split(""),function(a,c){var d="x"===c?"Left":"Top",m=d.toLowerCase(),g="scroll"+d,h=r[g](),n=p.max(q,c);t?(f[g]=t[m]+(l?0:h-r.offset()[m]),b.margin&&(f[g]-=parseInt(e.css("margin"+d),10)||0,f[g]-=parseInt(e.css("border"+d+"Width"),10)||0),f[g]+=v[m]||0,b.over[m]&&(f[g]+=e["x"===c?"width":"height"]()*b.over[m])):(d=e[m],f[g]=d.slice&& "%"===d.slice(-1)?parseFloat(d)/100*n:d);b.limit&&/^\d+$/.test(f[g])&&(f[g]=0>=f[g]?0:Math.min(f[g],n));!a&&1<b.axis.length&&(h===f[g]?f={}:u&&(k(b.onAfterFirst),f={}))});k(b.onAfter)}})};p.max=function(a,d){var b="x"===d?"Width":"Height",h="scroll"+b;if(!n(a))return a[h]-$(a)[b.toLowerCase()]();var b="client"+b,k=a.ownerDocument||a.document,l=k.documentElement,k=k.body;return Math.max(l[h],k[h])-Math.min(l[b],k[b])};$.Tween.propHooks.scrollLeft=$.Tween.propHooks.scrollTop={get:function(a){return $(a.elem)[a.prop]()}, set:function(a){var d=this.get(a);if(a.options.interrupt&&a._last&&a._last!==d)return $(a.elem).stop();var b=Math.round(a.now);d!==b&&($(a.elem)[a.prop](b),a._last=this.get(a))}};return p});


  (function(){ // nav pants

  $(window).scroll(function(){

    var scroll = $(window).scrollTop();
    var $nav = $('.navbar');
    var navHeight = $nav.height();

    if (scroll >= navHeight) { // user scrolls past height of nav

      $nav.addClass('is-scrolled'); // add mod class

    } else {

      $nav.removeClass('is-scrolled'); // remove mod class

    }

  });

  $('.js-nav-trigger').click(function(){ // user clicks nav trigger

    $(this).toggleClass('is-clicked'); // toggle animation/mod class

    $('nav.nav').toggleClass('is-visible'); // toggle mod class on nav

  });

})();


  (function(){ // safety pants

  $('.tertiary-nav-item a').click(function(event){ // user clicks on tertiary nav item
    event.preventDefault(); // stop from scrolling/jumping

    var $this = $(this);
    var contentID = $this.attr('href');

    $this.closest('ul').children() // localize
      .removeClass('is-selected'); // remove mod class from all

    $this.parent().toggleClass('is-selected'); // toggle mod class on clicked item

    $this.closest('.tertiary')
      .find('.tertiary-nav-content') // select tertiary content
      .removeClass('is-visible') // remove mod class
      .hide(); // hide all

    $('.tertiary-nav-content' + contentID) // find content that matches clicked element
      .show() // show it
      .addClass('is-visible'); // add mod class

    $this.closest('ul') // select parent ul element
      .scrollTo('.is-selected', 600); // scroll to clicked element, animated 600ms

  });

  $(window).load(function(){ // scroll to anchor pants

    var hash = $.trim( window.location.hash ); // get hash value from URL

    if (hash) { // if hash in the URL

      $('.tertiary-nav-item a[href$="'+hash+'"]').click(); // find tertiary link that matches hash and click it on page load
      $('html, body')
        .animate({scrollTop:$('.tertiary-nav-content' + hash) // scroll to anchor
          .offset().top - 288 }, 1000); // offset by 288px

    }

  });

})(); // end safety pants


  (function(){ // slider pants

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
	if ( isTouch() == true ) {

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

	}

})(); // end safety pants


  // Load more button on awards table ----------
$('.js-awards').click(function(){
  $('.js-awards-row:nth-child(n+6)').toggleClass('is-showing');
  $(this).text(function(i, text){
        return text === "Show More" ? "Show Less" : "Show More";
    });
});


  (function(){ // contact pants

  var $salesProfile = $('.sales-map-profile');

  // Next Profile

  function prevProfile() {

    var $currentProfile = $('.sales-map-profile.is-current');

    if ( $currentProfile.is(':first-child') ) { // if current profile is first
      $currentProfile
        .removeClass('is-current prev next') // remove mod classes from current
        .hide() // hide current
        $('.sales-map-profile:last-child') // cycle around to last profile
          .show() // show last profile
          .addClass('is-current prev') // add mod classes
    } else {
        $currentProfile
          .removeClass('is-current prev next') // remove mod classes from current
          .hide() // hide current
          .prev() // select previous profile
            .show() // show previous
            .addClass('is-current prev') // add mod classes to previous
    }
  }

  function nextProfile() {

    var $currentProfile = $('.sales-map-profile.is-current');

    if ( $currentProfile.is(':last-child') ) { // if current profile is last
      $currentProfile
        .removeClass('is-current prev next') // remove mod classes from current
        .hide() // hide current
        $('.sales-map-profile:first-child') // cycle around to first profile
          .show() // show last profile
          .addClass('is-current next') // add mod classes
    } else {
        $currentProfile
          .removeClass('is-current prev next') // remove mod classes from current
          .hide() // hide current
          .next() // select next profile
            .show() // show previous
            .addClass('is-current next') // add mod classes to previous
    }
  }

  function closeProfile() {

    $salesProfile.hide(0, function(){ // hide any visible profiles

      $(this)
        .removeAttr('style') // clear style attribute
        .css({ // set CSS back to original value so it's not blank
          'display': 'none'
        });

    }).removeClass('is-visible is-current next prev'); // remove all mod classes

    $('html,body')
      .css('overflow', '')
      .off('touchmove');

    return false;
  }

  $('.territory').click(function(){ // user clicks on dot on map

    var salesID = $(this).attr('id'); // store ID attribute for each dot clicked

    $salesProfile.addClass('is-visible'); // add mod class to all profiles

    $('.sales-map-profile#' + salesID) // find profile with same ID as clicked dot
      .addClass('is-current') // add mod class for current item
      .show(); // show profile for clicked dot

    $('html,body')
      .css('overflow','hidden') // disable scrolling
      .on('touchmove', function(e){
        e.preventDefault(); // prevent default behavior on touch devices
      });

    $(document).keydown(function(e){

      switch(e.which) {

        case 37: prevProfile();
        break;

        case 39: nextProfile();
        break;

        case 27: closeProfile();
        break;

        default: return;
      }
      e.preventDefault();
    });

    console.log('User clicked profile for ' + salesID); // log activity to console
  });


  $('.js-prev').click(prevProfile); // previous arrow triggers previous profile

  $('.js-next').click(nextProfile); // next arrow triggers next profile

  $('.js-sales-close').click(closeProfile); // close profile when user clicks X

  // Swipe Gestures

  if ( isTouch() == true ) {

    $salesProfile.swipe({

      swipeStatus: function(event, phase, direction, distance) {

        if (direction=='down') { // user swipes down

          if (phase=='move') { // while swipe is in motion

            $(this)
              .css({
                'opacity': 1 - ((distance/2)/100), // fade as user swipes
                'top': distance/2 + '%' // slide downward with swipe
              });

          }

          if (phase=='end') { // if user completes swipe reqs

            closeProfile(); // close profile

          }

          if (phase=='cancel') { // if user fails swipe reqs

            $(this).removeAttr('style') // reset style attribute
            .css({
              'display':'block' // set css display back to default
            });

          }

        }

        if (direction=='left') {

          if (phase=='move') { // while swipe is in motion

            $(this).find('.content') // select content inside
              .css({
                'opacity': 1 - ((distance/2)/100), // fade as user swipes
                'left': 50 - distance/5 + '%' // slide left with swipe
              });

          }

          if (phase=='end') { // if user completes swipe reqs

            nextProfile(); // next profile

            $(this).find('.content')
              .removeAttr('style'); // remove style attr

          }

          if (phase=='cancel') { // if user fails swipe reqs

            $(this).find('.content')
              .removeAttr('style') // remove style attr

          }

        }

        if (direction=='right') { // user swipes right <3

          if (phase=='move') { // while swipe is in motion

            $(this).find('.content')
              .css({
                'opacity': 1 - ((distance/2)/100), // fade as user swipes
                'left': 50 + distance/5 + '%' // slide downward with swipe
              });

          }

          if (phase=='end') { // if user completes swipe reqs

            prevProfile(); // previous profile

            $(this).find('.content')
              .removeAttr('style'); // remove style attr

          }

          if (phase=='cancel') { // if user fails swipe reqs

            $(this).find('.content')
              .removeAttr('style') // remove style attr

          }

        }

      },
      triggerOnTouchEnd: false,
      triggerOnTouchLeave: false,
      threshold: 200,
      cancelThreshold: 42,
      fingers: 1
    });

  }

})(); // end safety pants


  (function(){ // academy pants

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

})();


  
(function(){ // product feature pants

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

})();


  (function(){ // free trial pants

  var container = '.js-trial-container',
      $this = $(this);

  function closeTrial() {

    $(container).fadeOut(300, function(){ // fade out lightbox

      $this.removeAttr('style').css({ // reset CSS on callback
        'display': 'none'
      });

    });

    $('html,body').css({ // reset overflow
      'overflow': ''
    }).off('touchmove'); // unbind from touchmove

  }

  $('.js-trial').click(function(){ // user clicks free trial button

    $(container).fadeIn(300); // fade in modal

    // Disable scrolling while trial container is open
    $('html,body')
      .css({
        'overflow': 'hidden'
      }).on('touchmove', function(e){
        e.preventDefault();
      });

    $(document).keydown(function(e){ // user hits key while modal open

      switch(e.which) {

        case 27: closeTrial(); // ESC: close modal
        break;

        default: return;

      }
      e.preventDefault(); // stop from scrolling or anything weird

    });

  });

  $('.js-trial-close').click(closeTrial); // User clicks X to close

  if ( isTouch() == true ) { // check for touch device

    $(container).swipe({ // user swipes trial container

      swipeStatus: function(event, phase, direction, distance) {

        if (direction=='down') { // user swipes down

          if (phase=='move') { // while swipe is in motion

            $this
              .css({
                'opacity': 1 - ((distance/2)/100), // fade as user swipes
                'top': distance/2 + '%' // slide downward with swipe
              });

          }

          if (phase=='end') { // user completes swipe

            closeTrial();

          }

          if (phase=='cancel') { // user fails or cancels swipe

            $this.removeAttr('style').css({ // reset CSS
              'display': 'flex'
            });

          }

        }

      },
      triggerOnTouchEnd: false,
      triggerOnTouchLeave: false,
      threshold: 200,
      cancelThreshold: 42

    });

  }

})();


  // Form confirmation

  (function(){ // form confirmation pants

    var $form = $('form.adaptiva-form');

    $form.submit(function(){ // on form submission

      var val = $(this).find('input[type="email"]').val(); // get user's email address
      var form_id = $(this).attr('id'); // return ID of form user submitted

      window.open("/confirmation/" + form_id + "/#" + val, 'success_window', 'width=1024,height=640'); // open a new window with correct confirmation message email passed as URL hash

    });

  })();

  // Close Window

  function closeWindow() {
    window.close();
  }

});

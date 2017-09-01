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

  $('.tertiary-nav-item').click(function(){
  var navID = $(this).attr('id');
  $(this).closest('.tertiary').find('.tertiary-nav-item').removeClass('is-selected');
  $(this).toggleClass('is-selected');
  $(this).closest('.tertiary').find('.tertiary-nav-content').removeClass('is-visible').hide();
  $('.tertiary-nav-content#' + navID).show().addClass('is-visible');
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

$('.js-prev').click(prevProfile); // previous arrow triggers previous profile

$('.js-next').click(nextProfile); // next arrow triggers next profile

// cycles around to last profile if user clicks prev on first slide
$firstProfile.children('.js-prev').click(firstProfile);

// cycles around to first profile if user clicks next on last slide
$lastProfile.children('.js-next').click(lastProfile);

$('.js-sales-close').click(function(){ // user clicks close button
  $salesProfile
    .hide() // hide, duh?
    .removeClass('is-visible is-current'); // remove all mod classes
});

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
  threshold:178 // user must swipe at least 178px across
});

  $('select#sccm-academy').change(function() {
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

});

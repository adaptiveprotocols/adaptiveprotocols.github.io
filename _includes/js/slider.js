var $firstSlide = $('.slide:first-child'),
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

$('.slider-arrow.prev').click(function(){ // user clicks 'previous' arrow

	var prevID = $(this).parent('.slide').prev('.slide').attr('id');

	$(this).closest('.slider') // localize
		.find('.slide')
		.removeClass('is-visible') // remove mod class
		.hide(); // hide all slides

	$(this).parent('.slide') // localize
		.prev() // find previous slide
		.addClass('is-visible') // add mod class to previous
		.show(); // show previous

	$(this).closest('.slider').find('.slider-dot') // localize and find dots
		.removeClass('is-selected'); // remove mod class from all dots
	$('.slider-dot#' + prevID) // target dot with same ID as current slide
		.addClass('is-selected'); // add mod class
});

$firstSlide.children('.slider-arrow.prev').click(function(){ // user clicks previous on first slide

	$(this).parent() // localize
		.removeClass('is-visible') // remove mod class
		.hide(); // bye!

	$(this).closest('.slider').find('.slide:last-child') // find last slide in parent
		.show() // hi!
		.addClass('is-visible'); // add mod class

	$(this).closest('.slider') // localize
		.find('.slider-dot:last-child') // find last slider dot
		.addClass('is-selected'); // add modd class
});

$('.slider-arrow.next').click(function(){ // user clicks 'next' arrow

	var nextID = $(this).parent('.slide').next('.slide').attr('id');

	$(this).closest('.slider') // same functionality as previous, just backwards, duh
		.find('.slide')
		.removeClass('is-visible')
		.hide();

	 $(this).parent('.slide')
		.next()
		.addClass('is-visible')
		.show();

	 $(this).closest('.slider').find('.slider-dot')
		.removeClass('is-selected');

	 $('.slider-dot#' + nextID)
		.addClass('is-selected');
});

$lastSlide.children('.slider-arrow.next').click(function(){

	$(this).parent()
		.removeClass('is-visible')
		.hide();

	$(this).closest('.slider').find('.slide:first-child')
		.show()
		.addClass('is-visible');

	$(this).closest('.slider')
		.find('.slider-dot:first-child')
		.addClass('is-selected');
});

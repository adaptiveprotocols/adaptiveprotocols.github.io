$('.lightbox-close').click(function() {
	$(this).closest('.lightbox').removeClass('is-visible').fadeOut();
	$('#site').removeClass('is-blurred').off('touchmove');
	$('html, body').css({
		'overflow': '',
		'height': '',
	});
});

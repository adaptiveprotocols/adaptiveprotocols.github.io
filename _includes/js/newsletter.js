$('#newsletter-email').find('input[type="submit"]').click(function(e) {

	var
	email = $('#newsletter-email').find('input[name="email"]').val(),
	lightbox = $('.newsletterBox');

	e.preventDefault();
	lightbox.fadeIn()
	.find('input[type="email"]').val(email).end()
	.find('input[type="checkbox"]').focus();
	// Disable scrolling while trial container is open
	$('html,body').css({'overflow': 'hidden'});

	$('#site').addClass('is-blurred').on('touchmove', function(e){
			e.preventDefault();
	});

});

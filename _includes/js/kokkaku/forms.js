(function(){
	var
	form = $('form.form'),
	country = form.find('.country').find('select');

	// Dropdown arrow
	$('.selectWrap').click(function() {

		$(this).toggleClass('is-open');

	});

	// Dependent state field
	country.change(function() {

		var
		selection = $(this).val(),
		hasState = new RegExp(/^(United States|Canada)$/),
		state = $(this).closest('.form').find('.state');

		if (selection.match(hasState)) {
			state.fadeIn().find('select').attr('required', '');
		} else {
			state.fadeOut().find('select').removeAttr('required');
		}

	});

	// Success Window
	form.submit(function(){ // on form submission

    var
		$this = $(this),
		email = $this.find('input[type="email"]').val(), // get user's email address
    form_id = $this.attr('id'), // return ID of form user submitted
		name = $this.find('.first-name').val();

		if ( $this.is('#newsletter') ) {
			window.open("/confirmation/" + form_id + "/#" + email, 'success_window', 'width=1024,height=640'); // open a new window with correct confirmation message email passed as URL hash
		} else {
			window.open("/confirmation/" + form_id + "/#" + name, 'success_window', 'width=1024,height=640'); // open a new window with correct confirmation message email passed as URL hash
		}

  });

})();

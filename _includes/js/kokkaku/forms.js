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
	form.submit(function(e){ // on form submission

    var
		$this = $(this),
		email = $this.find('input[type="email"]').val(), // get user's email address
    form_id = $this.attr('id'), // return ID of form user submitted
		name = $this.find('.first-name').val(),
		freeESPs = ['gmail.com', 'yahoo.com', 'msn.com', 'aol.com', 'juno.com', 'hotmail.com', 'live.com', 'comcast.net'];

		if ($this.data('mql')) {

			$.each(freeESPs, function(i) {

				var esp = new RegExp(freeESPs[i], 'g');

				if (email.match(esp)) {

					alert('Sorry, no ' + freeESPs[i] + ' addresses allowed! Please use your corporate email address.');
					e.preventDefault();
					return false;

				} else {

					window.open("/confirmation/" + form_id + "/#" + name, 'success_window', 'width=1024,height=640');

				}

			});

		} else {

			window.open("/confirmation/" + form_id + "/#" + email, 'success_window', 'width=1024,height=640'); // open a new window with correct confirmation message email passed as URL hash

		}

  });

})();

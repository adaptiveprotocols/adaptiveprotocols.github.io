(function(){ // confirmation URL check pants

  var
	data = window.location.hash.substr(1),
	text = $('p#confirmation_text');

	if (data) { // if email address found in hash in URL

		$('h1#confirmation_heading').text('Success!');

		if(window.location.href.indexOf('confirmation/newsletter') > -1) {

			text.text('Awesome! ' + data + ' has been added to the Adaptiva newsletter subscription list.');

		} else if (window.location.href.indexOf('confirmation/insights') > -1) {

			text.text('Awesome! ' + data + ' has been added to the Adaptiva Insights subscription list.');

		} else if (window.location.href.indexOf('confirmation/free-trial') > -1) {

			text.text('Awesome! Thanks, ' + data + ', an Adaptiva associate will be in touch soon to give you a free demo and help you get your free trial set up.');

		} else if (window.location.href.indexOf('confirmation/contact-adaptiva') > -1) {

			text.text("Awesome! Thanks, " + data + ", we'll be in touch soon!.");

		}

	} else {

		$('h1#confirmation_heading') // Change heading text
			.text('Nope')

		text.text("Oops, looks like you didn't fill out a form to get here.");

		$('a#close_window').removeAttr('onclick') // remove JS click event
			.text('Back to Home') // change button text
			.attr('href', '/'); // change button link
	}

  // Close Window

  function closeWindow() {
    window.close();
  }

})();

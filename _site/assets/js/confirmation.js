(function(){ // confirmation URL check pants

  if(window.location.href.indexOf('confirmation') > -1) { // if URL contains 'confirmation'

    var email = window.location.hash.substr(1); // get hash from URL

    if (email) { // if email address found in hash in URL

      $('h1#confirmation_heading') // display success message
        .text('Success!');

      $('p#confirmation_text')
        .text('Awesome! ' + email + ' has been added to the Adaptiva newsletter subscription list.'); // insert hash into specified <p> tag

    } else {

      $('h1#confirmation_heading') // Change heading text
        .text('Nope')

      $('p#confirmation_text') // change body text
        .text("Oops, looks like you didn't fill out a form to get here.");

      $('a#close_window').removeAttr('onclick') // remove JS click event
        .text('Back to Home') // change button text
        .attr('href', '/'); // change button link
    }

  }

  var $form = $('form.adaptiva-form');

  $form.submit(function(){ // on form submission

    var val = $(this).find('input[type="email"]').val(); // get user's email address
    var form_id = $(this).attr('id'); // return ID of form user submitted

    window.open("/confirmation/" + form_id + "/#" + val, 'success_window', 'width=1024,height=640'); // open a new window with correct confirmation message email passed as URL hash

  });

  // Close Window

  function closeWindow() {
    window.close();
  }

})();

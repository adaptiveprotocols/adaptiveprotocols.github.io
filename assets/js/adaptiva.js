---
---

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
  {% include js/secret.js %} // lmfao
})();

(function(){ // confirmation URL check pants

  if(window.location.href.indexOf('confirmation') > -1) { // if URL contains 'confirmation'

    var email = window.location.hash.substr(1); // get hash from URL

    $('p#confirmation_text').text('Success! ' + email + ' has been added to the Adaptiva newsletter subscription list.'); // insert hash into specified <p> tag

  }

})();

jQuery(document).ready(function($) { // DOM ready pants!
  {% include js/visible.js %}
  {% include js/smooth-scroll.js %}
  {% include js/scrollto.js %}
  {% include js/nav.js %}
  {% include js/tertiary.js %}
  {% include js/slider.js %}
  {% include js/about.js %}
  {% include js/contact.js %}
  {% include js/academy.js %}
  {% include js/products.js %}

  // One-off Stuff

  // Free trial button
  $('.js-trial').click(function(){ // user clicks free trial button
    $('.js-trial-container').fadeIn(300); // fade in lightbox
    $('html,body').css('overflow', 'hidden');
  });

  $('.js-trial-close').click(function(){ // user clicks X
    $('.js-trial-container').fadeOut(300); // fade out lightbox
    $('html,body').css('overflow','');
  });

  // Form confirmation

  (function(){ // safety pants

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

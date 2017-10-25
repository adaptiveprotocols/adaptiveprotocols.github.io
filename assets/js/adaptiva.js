---
---

if(window.location.href.indexOf('newsletter') > -1) { // if URL contains 'newsletter'

  var hash = window.location.hash.substr(1); // get hash from URL

  $('span#user_email').text(hash); // insert hash into specified span tag

}

jQuery(document).ready(function($) { //safety pants!
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

  // Newsletter form

  (function(){ // safety pants

    var $form = $('form.newsletter');

    $form.submit(function(){ // on form submission

      var val = $(this).find('input[type="email"]').val(); // get user's email address

      window.open("/newsletter/#" + val, 'success_window', 'width=1024,height=640'); // open a new window with email passed as URL hash

    });

  })();

  // Close Window

  function closeWindow() {
    window.close();
  }

});

(function() { // more safety pants!
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
  {% include js/secret.js %}
})();

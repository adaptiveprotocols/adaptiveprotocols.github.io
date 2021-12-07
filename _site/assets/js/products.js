jQuery(document).ready(function($) {
  // (function() {
//   // make a map to store the string values and their translations (as JSON objects)
//   var productDictionary = new Map();
//
//   // add each string that is marked for translation to map, along with its translation object
//   productDictionary.set("Discover the world’s most trusted endpoint management and security products", {
//     de: "Entdecken Sie die weltweit zuverlässigsten Endpoint Management- und Sicherheitsprodukte"
//   });
//   productDictionary.set("Peer into the Future of Endpoint Management and Security", {
//     de: "Blicken Sie in die Zukunft von Endpoint Management und Sicherheit"
//   });
//   productDictionary.set("Products", {
//     de: "Produkte"
//   });
//   productDictionary.set("Today’s IT teams face increasing workloads and new security threats every day. Adaptiva products make the job of IT professionals easier by eliminating the need for a vast IT infrastructure and automating countless endpoint management and security tasks.", {
//     de: "Die heutigen IT-Teams sind täglich zunehmenden Arbeitslasten und neuen Sicherheitsbedrohungen ausgesetzt. Adaptiva-Produkte erleichtern die Arbeit von IT-Fachleuten, da keine umfangreiche IT-Infrastruktur erforderlich ist und unzählige Aufgaben zur Endpunktverwaltung und -sicherheit automatisiert werden."
//   });
//   productDictionary.set("Whether you’re distributing software, deploying the Windows 10 operating system, or protecting against security vulnerabilities across your enterprise, our peer-to-peer platform and products will help you scale intelligently every step of the way.", {
//     de: "Unabhängig davon, ob Sie Software verteilen, das Windows 10-Betriebssystem bereitstellen oder vor Sicherheitslücken in Ihrem Unternehmen schützen - unsere Peer-to-Peer-Plattform und -Produkte unterstützen Sie bei der intelligenten Skalierung bei jedem Schritt."
//   });
//
//
//   // loop through map and add each to global dictionary
//   productDictionary.forEach(function(value, key) {
//     globalDictionary[key] = value;
//   });
//
//   // profit
//
// })();

    $('.product-feature-item').click(function(){

      var $this     = $(this),
          featureID = $this.attr('id'); // store ID attribute in featureID variable

      $this
        .parent().children() // localize
        .removeClass('is-selected'); // clear mod class from all items

      $this.addClass('is-selected'); // add mod class to clicked element

      $this.closest('.slide') // localize
        .find('.product-features-video') // find videos
        .hide() // hide all videos
        .removeClass('is-visible'); // clear mod classes

      $('.product-features-video#' + featureID) // select video with matching ID
        .addClass('is-visible') // add mod class
        .show(); // show only selected video

    });
});

// var globalDictionary = {
//   "Products": {
//     de: "Produkte"
//   },
//   "Insights": {
//     de: "Einblicke"
//   },
//   "About": {
//     de: "Über"
//   },
//   "Careers": {
//     de: "Karriere"
//   },
//   "Contact": {
//     de: "Kontakt"
//   },
//   "Free Trial": {
//     de: "KOSTENLOSE TESTPHASE"
//   },
// };
//
// var STORAGE_KEY="__ada_lang__";
// var translator = $('body').translate({lang: "en", t: globalDictionary});
// var checkLanguage = function(){
//   if(localStorage.getItem(STORAGE_KEY)) {
//     translator.lang(localStorage.getItem(STORAGE_KEY));
//   } else {
//     translator.lang("en");
//   }
// }
//
//  //use English
// checkLanguage();
// $(".translate-menu-language").click(function(e) {
//   console.log("hello world")
//   console.error($(e.target).data("language"))
//   translator.lang($(e.target).data("language"));
//   localStorage.setItem(STORAGE_KEY,$(e.target).data("language"))
// });

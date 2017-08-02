$('.tertiary-nav-item').click(function(){
  var navID = $(this).attr('id');
  $(this).closest('.tertiary').find('.tertiary-nav-item').removeClass('is-selected');
  $(this).toggleClass('is-selected');
  $(this).closest('.tertiary').find('.tertiary-nav-content').fadeOut(300);
  $('.tertiary-nav-content.' + navID).delay(300).fadeIn(300);
});

$('.tertiary-nav-item').click(function(){
  var navID = $(this).attr('id');
  $(this).closest('.tertiary').find('.tertiary-nav-item').removeClass('is-selected');
  $(this).toggleClass('is-selected');
  $(this).closest('.tertiary').find('.tertiary-nav-content').removeClass('is-visible').hide();
  $('.tertiary-nav-content.' + navID).show().addClass('is-visible');
});

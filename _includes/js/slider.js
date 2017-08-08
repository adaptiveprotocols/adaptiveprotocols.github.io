$('.slider-dot').click(function(){
	var $this = $(this);
  var slideID = $this.attr('id');
  $(this).closest('.slider').find('.slider-dot').removeClass('is-selected');
  $this.addClass('is-selected');
  $(this).closest('.slider').find('.slide').removeClass('is-visible').hide();
  $('.slide#' + slideID).addClass('is-visible').show();
});
$('.slider-arrow.prev').click(function(){
	var $this = $(this);
  var slideID = $this.parent('.slide').prev('.slide').attr('id');
  $(this).closest('.slider').find('.slide').removeClass('is-visible').hide();
  $this.parent('.slide').prev('.slide').addClass('is-visible').show();
  $(this).closest('.slider').find('.slider-dot').removeClass('is-selected');
  $('.slider-dot#' + slideID).addClass('is-selected');
});
$('.slider-arrow.next').click(function(){
	var $this = $(this);
  var slideID = $this.parent('.slide').next('.slide').attr('id');
  $(this).closest('.slider').find('.slide').removeClass('is-visible').hide();
  $this.parent('.slide').next('.slide').addClass('is-visible').show();
  $(this).closest('.slider').find('.slider-dot').removeClass('is-selected');
  $('.slider-dot#' + slideID).addClass('is-selected');
});

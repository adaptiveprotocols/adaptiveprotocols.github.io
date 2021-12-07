---
---
jQuery(document).ready(function($) {
    var intervalTime = 5000;
    var interval;

	$('#slide').find('.q-slide:first').addClass('active-slide');
	$('#pagination').find('.pag:first').addClass('active-pag');
    function cycleSlides(){
        var active = $('.active-slide');
        var activePag = $('.active-pag');
        var first = $('.q-slide:first');
        var firstPag = $('.pag:first');
        active.removeClass('active-slide');
        activePag.removeClass('active-pag');
        if (active.next().length === 0){
            first.addClass('active-slide');
            firstPag.addClass('active-pag') ;
        } else {
            active.next().addClass('active-slide');
            activePag.next().addClass('active-pag');
        }
    }
	var slideInterval = function(){
		interval = setInterval(function(){
			cycleSlides();
		}, intervalTime);
	};
    slideInterval();
    $(document)
    .on('click','.pag',function(){
		$('.active-slide').removeClass('active-slide');
		$('.active-pag').removeClass('active-pag');
		var targetId = $(this).attr('id').split('-')[1];
		$(this).addClass('active-pag');
        $('#slide-'+targetId).addClass('active-slide');
        clearInterval(interval);
        
    })
    .on('click', '.arrow',function(){
        var first = $('.q-slide:first');
        var firstPag = $('.pag:first');
        var last =  $('.q-slide:last');
        var lastPag = $('.pag:last');
        var active = $('.active-slide');
		var activePag = $('.active-pag');
        var direction = $(this).attr('id');
        active.removeClass('active-slide');
        activePag.removeClass('active-pag');
        clearInterval(interval);
        if(direction === 'next'){
            if(active.next().length === 0){
                first.addClass('active-slide');
				firstPag.addClass('active-pag') ;
            } else {
                active.next().addClass('active-slide');
            activePag.next().addClass('active-pag');
            }
        } else {
            if(active.prev().length === 0){
                last.addClass('active-slide');
				lastPag.addClass('active-pag') ;
            } else {
                active.prev().addClass('active-slide');
                activePag.prev().addClass('active-pag');
            }
        }
    });
});

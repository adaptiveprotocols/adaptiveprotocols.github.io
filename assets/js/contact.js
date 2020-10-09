jQuery(document).ready(function($) {
    (function(){ // contact pants
        var $salesProfile = $('.sales-map-profile');
        // Next Profile
        function prevProfile() {
            var $currentProfile = $('.sales-map-profile.is-current');
            if ( $currentProfile.is(':first-child') ) { // if current profile is first
                $currentProfile
                .removeClass('is-current prev next') // remove mod classes from current
                .hide() // hide current
                $('.sales-map-profile:last-child') // cycle around to last profile
                    .show() // show last profile
                    .addClass('is-current prev') // add mod classes
            } else {
                $currentProfile
                    .removeClass('is-current prev next') // remove mod classes from current
                    .hide() // hide current
                    .prev() // select previous profile
                    .show() // show previous
                    .addClass('is-current prev') // add mod classes to previous
            }
        }
        function nextProfile() {
            var $currentProfile = $('.sales-map-profile.is-current');
            if ( $currentProfile.is(':last-child') ) { // if current profile is last
                $currentProfile
                .removeClass('is-current prev next') // remove mod classes from current
                .hide() // hide current
                $('.sales-map-profile:first-child') // cycle around to first profile
                    .show() // show last profile
                    .addClass('is-current next') // add mod classes
            } else {
                $currentProfile
                    .removeClass('is-current prev next') // remove mod classes from current
                    .hide() // hide current
                    .next() // select next profile
                    .show() // show previous
                    .addClass('is-current next') // add mod classes to previous
            }
        }

        function closeProfile() {
            $salesProfile.hide(0, function(){ // hide any visible profiles
                $(this)
                    .removeAttr('style') // clear style attribute
                    .css({ // set CSS back to original value so it's not blank
                    'display': 'none'
                });
            }).removeClass('is-visible is-current next prev'); // remove all mod classes

            $('html,body').css('overflow', '').off('touchmove');
            return false;
        }
        // user clicks on dot on map
        $('.territory').click(function(){ 
            var salesID = $(this).data('territory'); // get sales guy
            $salesProfile.addClass('is-visible'); // add mod class to all profiles
            // find profile with same ID as clicked dot
            // add mod class for current item 
            // show profile for clicked dot
            $('.sales-map-profile#' + salesID).addClass('is-current').show();

            $('html,body').css('overflow','hidden').on('touchmove', function(e){
                    e.preventDefault(); // prevent default behavior on touch devices
            });
            
        });
        $(document).keydown(function(e){
            switch(e.which) {
                case 37: prevProfile();
                break;
                case 39: nextProfile();
                break;
                case 27: closeProfile();
                break;
                default: return;
            }
            e.preventDefault();
        });
        $('.js-prev').click(prevProfile); // previous arrow triggers previous profile
        $('.js-next').click(nextProfile); // next arrow triggers next profile
        $('.js-sales-close').click(closeProfile); // close profile when user clicks X

        // Swipe Gestures

        if ( isTouch() == true ) {

        $salesProfile.swipe({

            swipeStatus: function(event, phase, direction, distance) {

            if (direction=='down') { // user swipes down

                if (phase=='move') { // while swipe is in motion

                $(this)
                    .css({
                    'opacity': 1 - ((distance/2)/100), // fade as user swipes
                    'top': distance/2 + '%' // slide downward with swipe
                    });

                }

                if (phase=='end') { // if user completes swipe reqs

                closeProfile(); // close profile

                }

                if (phase=='cancel') { // if user fails swipe reqs

                $(this).removeAttr('style') // reset style attribute
                .css({
                    'display':'block' // set css display back to default
                });

                }

            }

            if (direction=='left') {

                if (phase=='move') { // while swipe is in motion

                $(this).find('.content') // select content inside
                    .css({
                    'opacity': 1 - ((distance/2)/100), // fade as user swipes
                    'left': 50 - distance/5 + '%' // slide left with swipe
                    });

                }

                if (phase=='end') { // if user completes swipe reqs

                nextProfile(); // next profile

                $(this).find('.content')
                    .removeAttr('style'); // remove style attr

                }

                if (phase=='cancel') { // if user fails swipe reqs

                $(this).find('.content')
                    .removeAttr('style') // remove style attr

                }

            }

            if (direction=='right') { // user swipes right <3

                if (phase=='move') { // while swipe is in motion

                $(this).find('.content')
                    .css({
                    'opacity': 1 - ((distance/2)/100), // fade as user swipes
                    'left': 50 + distance/5 + '%' // slide downward with swipe
                    });

                }

                if (phase=='end') { // if user completes swipe reqs

                prevProfile(); // previous profile

                $(this).find('.content')
                    .removeAttr('style'); // remove style attr

                }

                if (phase=='cancel') { // if user fails swipe reqs

                $(this).find('.content')
                    .removeAttr('style') // remove style attr

                }

            }

            },
            triggerOnTouchEnd: false,
            triggerOnTouchLeave: false,
            threshold: 200,
            cancelThreshold: 42,
            fingers: 1
        });

        }

  })(); // end safety pants
});

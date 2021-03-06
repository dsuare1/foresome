$(document).ready(function() {
    // /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
    // flow of user experience on the New User Admin page
    // /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

    // initial click; yes or no for known handicap
    $('#handicap-yes').on('click', function() {
        $('#welcome').fadeOut(500, function() {
            $('.enter-handicap').fadeIn(500).css('display', 'inline-block').removeClass('hidden');
        });
        // $(this).fadeOut('slow');
        // $('#handicap-no').fadeOut('slow');
        // $('html, body').animate({
        //     scrollTop: $('.enter-handicap').offset().top - 50
        // }, 'slow');
    });

    $('#handicap-no').on('click', function() {
        $('#welcome').fadeOut(500, function() {
            $('.enter-scores').fadeIn(500).css('display', 'inline-block').removeClass('hidden');
        });
        // $(this).fadeOut('slow');
        // $('#handicap-yes').fadeOut('slow');
        // $('html, body').animate({
        //     scrollTop: $('.navbar').offset().top
        // })
    });

    $('.go-back').on('click', function() {
        $(this).parent().fadeOut(500, function() {
            $('#welcome').fadeIn(500);
        });
        // $('html, body').animate({
        //     scrollTop: $('#welcome-back').offset().top
        // })
        // $('#handicap-yes').fadeIn('slow');
        // $('#handicap-no').fadeIn('slow');
    })

    // this click listener shows the second set of inputs for rounds 6 - 10
    $('#show-second-five').on('click', function(e) {
        e.preventDefault();
        $('.second-five-rounds').fadeIn(1000).css('display', 'inline-block').removeClass('hidden');
    });

    // this click listener shows the third set of inputs for rounds 11 - 15
    $('#show-third-five').on('click', function(e) {
        e.preventDefault();
        $('.third-five-rounds').fadeIn(1000).css('display', 'inline-block').removeClass('hidden');
    });

    // this click listener hides the second set of inputs for rounds 6 - 10
    $('#hide-second-five').on('click', function(e) {
        e.preventDefault();
        $('.second-five-rounds').fadeOut(1000);
    });

    // this click listener hides the third set of inputs for rounds 11 - 15
    $('#hide-third-five').on('click', function(e) {
        e.preventDefault();
        $('.third-five-rounds').fadeOut(1000);
    });

    $('#handicap-submit').on('click', function(e) {
        var submittedHandicap = $('#handicap').val();
        submittedHandicap = parseFloat(submittedHandicap);
        e.preventDefault();
        $.ajax({
            url: '/handicapSubmit',
            type: 'PUT',
            data: {
                handicap: submittedHandicap.toFixed(1)
            },
            success: function(data) {
                console.log('ajax put of entered handicap was performed');
            }
        })

        $('#calculated-handicap').html(submittedHandicap.toFixed(1));

        $('.enter-handicap').fadeOut(500, function() {
            $('.calculated-handicap-message').fadeIn(500).css('display', 'inline-block').removeClass('hidden');
        });

        // $('.calculated-handicap-message').fadeIn(1000).css('display', 'inline-block').removeClass('hidden');
        // $('html, body').animate({
        //     scrollTop: $('.calculated-handicap-message').offset().top
        // }, 'slow');

    })

    $('#rounds-submit').on('click', function(e) {
        e.preventDefault();
        // gathers all the rounds input elements (can access value with '.value')
        var roundsCollected = $('.round');
        // array to push all the existing rounds into
        var rounds = [];
        var sum = 0;
        var average = 0;
        var calculatedHandicap = 0;
        // this keeps the empty rounds inputs from being a part of the average calculation (aka, no 0s)
        for (var i = 0; i < roundsCollected.length; i++) {
            if (roundsCollected[i].value !== "") {
                rounds.push(parseInt(roundsCollected[i].value));
            }
        }
        console.log('rounds array: ' + rounds);
        // sum up total of all rounds
        for (var i = 0; i < rounds.length; i++) {
            sum += rounds[i];
        }
        // divide sum of all rounds by # of rounds
        average = sum/rounds.length;
        console.log('sum: ' + sum);
        console.log('average: ' + average.toFixed(1));
        calculatedHandicap = Math.abs(average.toFixed(1) - 72);
        console.log('calculated handicap: ' + calculatedHandicap.toFixed(1));
        $('#calculated-handicap').html(calculatedHandicap.toFixed(1));

        $.ajax({
            url: '/roundsSubmit',
            type: 'PUT',
            data: {
                handicap: calculatedHandicap.toFixed(1)
            },
            success: function(data) {
                console.log('ajax put of calculted handicap was performed');
            }
        })

        $('#calculated-handicap').html(calculatedHandicap.toFixed(1));

        $('.enter-scores').fadeOut(500, function() {
            $('.calculated-handicap-message').fadeIn(500).css('display', 'inline-block').removeClass('hidden');
        });

        // $('.calculated-handicap-message').fadeIn(1000).css('display', 'inline-block').removeClass('hidden');
        // $('html, body').animate({
        //     scrollTop: $('.calculated-handicap-message').offset().top
        // }, 'slow');

    });

    $('#start-over').on('click', function() {
        $('.calculated-handicap-message').fadeOut(500, function() {
            $('#welcome').fadeIn(500);
        })
    })

    // /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
    // geolocation
    var latitude,
        longitude;
    function locateUser() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log('geolocation not possible');
        }
    }

    function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
        $('#map-area').html("<iframe class='courses-map' width='458' height='440' frameborder='0' src='https://www.google.com/maps/embed/v1/search?q=golf+course&amp;center=" + position.coords.latitude + "," + position.coords.longitude + "&amp;zoom=10&amp;key=AIzaSyDchdsjpvalXui_QTAFtm9Hb1Ka67X5s1k'></iframe>");
    }

    locateUser();

});

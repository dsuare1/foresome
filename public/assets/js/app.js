$(document).ready(function() {
    // /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
    // flow of user experience on the New User Admin page
    // /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

    // initial click; yes or no for known handicap
    $('#handicap-yes').on('click', function() {
        $('.enter-handicap').slideDown('slow', function() {
            return;
        });
    });

    $('#handicap-no').on('click', function() {
        $('.enter-scores').slideDown('slow', function() {
            return;
        });
    });

    $('.go-back').on('click', function() {
        $(this).closest('div').slideUp();
    })


    // this click listener shows the second set of inputs for rounds 6 - 10
    $('#show-second-five').on('click', function(e) {
        e.preventDefault();
        $('.second-five-rounds').slideDown('slow', function() {
            return;
        });
    });

    // this click listener shows the third set of inputs for rounds 11 - 15
    $('#show-third-five').on('click', function(e) {
        e.preventDefault();
        $('.third-five-rounds').slideDown('slow', function() {
            return;
        });
    });

    // this click listener hides the second set of inputs for rounds 6 - 10
    $('#hide-second-five').on('click', function(e) {
        e.preventDefault();
        $('.second-five-rounds').slideUp('slow', function() {
            return;
        });
    });

    // this click listener hides the third set of inputs for rounds 11 - 15
    $('#hide-third-five').on('click', function(e) {
        e.preventDefault();
        $('.third-five-rounds').slideUp('slow', function() {
            return;
        });
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

        $('.calculated-handicap-message').slideDown('slow', function() {
            return;
        });

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

        $('.calculated-handicap-message').slideDown('slow', function() {
            return;
        });

    });

    // /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
});

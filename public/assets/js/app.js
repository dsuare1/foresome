$(document).ready(function() {

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

});

$(document).ready(() => {
    $('#gallery-toggle-btn').click(() => {
        $('#gallery-ctr').slideToggle(400);
        setTimeout(() => {
            if ($('#gallery-ctr').is(':visible')) {
                $('#gallery-toggle-btn').text('Hide');
            }
            else if ($('#gallery-ctr').is(':hidden')) {
                $('#gallery-toggle-btn').text('Show');
            }
        }, 450)
    })
})
$(document).ready(function () {
    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('main').stop().animate({
                scrollTop: target.offset().top - 60
            }, 1000);
        }
    });
});
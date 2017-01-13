var ula = {
    slides: ['introduction', 'competence', 'contact-form'],
    index: 0,
    changeSlide: function (dir) {
        this.index = this.index + dir;
        if (this.slides.length <= this.index)
            this.index = 0;
        if (this.index < 0)
            this.index = this.slides.length - 1;
        $('a[href=#'+this.slides[this.index]+']').click();
    },
    submitContactForm: function(){
        var data = $('#contact-form form').serializeArray();
        $.post('/form.php', data, function(){

        });
    }
};


$(document).ready(function () {
    $('body').scrollspy({target: '#navbar'});

    $('body').keydown(function (e) {
        if (e.keyCode == 40) {
            e.preventDefault();
            ula.changeSlide(1);
        }
        if (e.keyCode == 38) {
            e.preventDefault();
            ula.changeSlide(-1);
        }
    });

    $('#navbar ul li a').bind('click', function (e) {
        // prevent default anchor click behavior
        e.preventDefault();

        // store hash
        var hash = this.hash;

        var heading = $(hash).find('h2');
        heading.css('opacity', 0);

        // animate
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 300, function () {

            // when done, add hash to url
            // (default click behaviour)
            window.location.hash = hash;

            $(heading).animate({
                opacity: 1
            });

        });
    });

    $('a[href=' + "#introduction" + ']').click();

});

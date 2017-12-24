var ula = {
    slides: ['introduction', 'competence', 'contact-form'],
    index: 0,
    isOnScreen: function(elm)
    {
        var elm = elm[0];
        var rect = elm.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    },
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
    },
    scrollSpy: function(){
        $('body').scrollspy({target: '#card-links', offset: 56});
	}
};



$(document).ready(function () {
	
	$( window ).resize(function() {
		ula.scrollSpy();
	});
    $( window).scroll(function () {
       if (!ula.isOnScreen($('#card-links-pointer')))
           $('#card-links').addClass('links-top');
       else
           $('#card-links').removeClass('links-top');
    });
    ula.scrollSpy();
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

    $('#card-links ul li a').bind('click', function (e) {
        // prevent default anchor click behavior
        e.preventDefault();

        // store hash
        var hash = this.hash;

        var heading = $(hash).find('h2');
        heading.css('opacity', 0);

        // animate
        $('html, body').animate({
            scrollTop: $(hash).offset().top - 50
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

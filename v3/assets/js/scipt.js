function isInView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return (elemTop <= docViewTop);
};
var u = {
    slides: ['about', 'education', 'prices', 'contact'].reverse()
}
$(document).ready(function () {

    sendForm = function(){
        var form = $('#contact-form');
        var data = {
            name: form.find('input[name="name"]').val(),
            message: form.find('textarea[name="message"]').val(),
            email: form.find('input[name="email"]').val()
        };
        $.ajax({
            type: 'POST',
            url: 'https://3h2k11tklk.execute-api.eu-west-1.amazonaws.com/production/submit',
            contentType: 'application/json',
            data: JSON.stringify(data)
        }).done(function(){
            alert('Wiadomość została przesłana');
        }).fail(function(){
            alert('Wystąpił błąd');
        });
    };

    $('.navbar li').click(function () {
        $('.navbar li').removeClass('active');
        $(this).addClass('active');
    });
    var personalInfo = $('#personal-info');
    var personalInfoTop = personalInfo.position().top;
    $(window).scroll(function () {
        for (var s in u.slides) {
            if (isInView('#' + u.slides[s])) {
                $('.navbar li').removeClass('active');
                $('.navbar li a[href="#' + u.slides[s] + '"]').parent().addClass('active');
                break;
            }
        }
        ;
        var pos = $(window).scrollTop();
        if (pos > personalInfoTop)
            personalInfo.addClass('sticky');
        else
            personalInfo.removeClass('sticky');
    });
});
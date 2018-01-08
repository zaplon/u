function isInView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return (elemTop <= docViewTop);
};
var u = {
    slides: ['prices', 'about', 'education', 'contact'].reverse(),
    adjustPersonalInfo: function(){
        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (w < 767)
            return;
        var pos = $(window).scrollTop();
        if (pos > u.personalInfoTop)
            u.personalInfo.addClass('sticky');
        else
            u.personalInfo.removeClass('sticky');
    },
    showMessage: function(type, msg){
        var slot = $('#message-box .message');
        if (type)
            slot.addClass('message-success');
        else
            slot.addClass('message-error');
        slot.html(msg);
        $('#message-box').fadeIn(500, function(){
            window.setTimeout(function(){
                $('#message-box').fadeOut(500, function(){
                    slot.removeClass('message-success');
                    slot.removeClass('message-error');
                });
            }, 2000);
        })
        $('#message-box').css('display', 'block');
    }
};
$(document).ready(function () {

    u.personalInfo = $('#personal-info');
    u.personalInfoTop = u.personalInfo.position().top;
    u.adjustPersonalInfo();

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
            u.showMessage(1, 'Wiadomość została przesłana');
        }).fail(function(){
            u.showMessage(0, 'Wystąpił błąd');
        });
    };

    $('.navbar li').click(function () {
        $('.navbar li').removeClass('active');
        $(this).addClass('active');
    });

    $(window).scroll(function () {
        for (var s in u.slides) {
            if (isInView('#' + u.slides[s])) {
                $('.navbar li').removeClass('active');
                $('.navbar li a[href="#' + u.slides[s] + '"]').parent().addClass('active');
                break;
            }
        }
        ;
        u.adjustPersonalInfo();
    });
});
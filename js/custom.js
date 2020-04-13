
(function ($) {

    "use strict";

    /*
     * 1.0 preloader
     * -----------------------------------------------------------------------------
     */

    $(window).on('load', function () {
        $('.preloader').delay(100).fadeOut(500);
    });


    /*
     * 2.0 Sticky Header
     * -----------------------------------------------------------------------------
     */

    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= 5) {
            $('header.ntHeader').addClass('ntStickyHeader fixed');
            $('.ntStickyHeader.fixed').addClass('slideDown');
            $('.cd-nav-trigger').addClass('fixed');
        }
        else {
            $('.ntStickyHeader.fixed').removeClass('slideDown');
            $('header.ntHeader').removeClass('ntStickyHeader fixed');
            $('.cd-nav-trigger').removeClass('fixed');
        }
    });

    /*
     * 3.0 Speaker
     * -----------------------------------------------------------------------------
     */


    $('.ntOurSpeakersItem').on('mouseenter mouseleave', function () {
        $(this).find('.caption').slideToggle(150);
        $(this).find('.overlay').slideToggle(150);
    });

    /*
     * 4.0 Smooth Scroll
     * -----------------------------------------------------------------------------
     */
    $(document).on('scroll', onScroll);

    $('.scroll').on('click', function (e) {

        var scroll_speed = 1000;

        e.preventDefault();
        $(document).off('scroll');

        $('a').each(function () {
            $(this).removeClass('active');
        });

        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        var $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 2
        }, scroll_speed, 'swing', function () {
            $(document).on('scroll', onScroll);
        });
    });

    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        $('ul.ntNavbar li a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr('href'));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('ul.ntNavbar li a').removeClass('active');
                currLink.addClass('active');
            }
            else {
                currLink.removeClass('active');
            }
        });
    }

    /*
     * 5.0 Conference Schedule
     * -----------------------------------------------------------------------------
     */

    $('.tnEventInfo .ntCaption:not(.tnSpeakerName)').hide();
    $('.ntEvent.extend span').html("<i class='fa fa-angle-down'></i>");

    // Extend on click
    $('.ntEvent.extend span').on('click', function (e) {

        var $span = $(this);
        var $event = $span.parent().parent();

        if ($span.html() == "<i class='fa fa-angle-up'></i>") {

            $span.html("<i class='fa fa-angle-down'></i>");
        } else {

            $span.html("<i class='fa fa-angle-up'></i>");
        }

        $event.find('.tnEventInfo .ntCaption:not(.tnSpeakerName)').slideToggle(150);

    });

    /*
     * 6.0 Statistic
     * -----------------------------------------------------------------------------
     */

    $(function () {
        $('.ntCounterNumber').countimator();
    });

    /*
     * 7.0 Ajax registration form
     * -----------------------------------------------------------------------------
     */

    // request submission
    var EnableDisableForm = function (objectType, btn1, btn1Text) {
        if (objectType == 'Disable') {
            $('#' + btn1).attr('disabled', 'disabled');
        } else {
            $('#' + btn1).removeAttr('disabled');
        }
        $('#' + btn1).val(btn1Text);
    }


    function AjaxFormSubmit(formname, btn1, btn1Text) {
        var options = {
            complete: function (response) {
                if ('Success') {
                    $('#registerForm').append("<div class='alert alert-success animated fadeInRight' id='success'><strong>Success!</strong> Your registration has been successfully submitted</div>");
                    setTimeout(function () {
                        $('#success').addClass('animated fadeOutRight');
                        $('#success').removeClass('fadeInRight');

                    }, 5000);

                    $('#registerForm')[0].reset();
                }
                EnableDisableForm('Enabled', btn1, btn1Text);
            },
            error: function (response) {
                var data = response.responseText;
                console.log(data);
            }
        };
        $('#' + formname).ajaxSubmit(options);
    }


// Ajax form validation
    $('#registerForm').validate({
        errorElement: 'span',
        rules: {
            reg_name: {
                required: true
            },
            reg_jobtitle: {
                required: true
            },
            reg_email: {
                required: true
            },
            reg_company: {
                required: true
            },
            reg_contact: {
                required: true
            },
            reg_quantity: {
                required: true
            },
            reg_attend: {
                required: true
            }

        },
        messages: {
            reg_name: {
                required: 'Required.'
            },
            reg_jobtitle: {
                required: 'Required.'
            },
            reg_email: {
                required: 'Required.'
            },
            reg_company: {
                required: 'Required.'
            },
            reg_contact: {
                required: 'Required.'
            },
            reg_quantity: {
                required: 'Required.'
            },
            reg_attend: {
                required: 'Required.'
            }

        },
        submitHandler: function (form) {
            EnableDisableForm('Disable');
            AjaxFormSubmit('registerForm', 'submit');
            return false; // required to block normal submit since you used ajax
        }
    });


})(jQuery);

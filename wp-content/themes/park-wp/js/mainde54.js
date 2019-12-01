(function ($) {
    "use strict";

    $(window).on('scroll', function () {
        animateElement();
    });

    $('.single-post .num-comments a, .single-portfolio .num-comments a').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: $(this.hash).offset().top}, 2000);
        return false;
    });

    //Add before and after "blockquote" custom class
    $('blockquote.inline-blockquote').prev('p').addClass('wrap-blockquote');
    $('blockquote.inline-blockquote').next('p').addClass('wrap-blockquote');
    $('blockquote.inline-blockquote').css('display', 'table');

    //Placeholder show/hide
    $('input, textarea').focus(function () {
        $(this).data('placeholder', $(this).attr('placeholder'));
        $(this).attr('placeholder', '');
    });
    $('input, textarea').blur(function () {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });

    //Fix for footer
    if (($('.page .comment-form-holder').length) || ($('.page .comments-list-holder').length))
    {
        $(".page .site-content").css('margin-bottom', '0');
    }

    //Fix for menu alignment
    if (!$('.menu-left-text').length)
    {
        $('.menu-holder').addClass('no-left-part');
    }

    singlePaginationHeightFix();

    $(".site-content").fitVids();

    $(".default-menu ul:first").addClass('sm sm-clean main-menu');


    $(window).on('load', function () {

        //Set menu
        $('.main-menu').smartmenus({
            subMenusSubOffsetX: 1,
            subMenusSubOffsetY: -8,
            markCurrentItem: true
        });

//Show-Hide header sidebar
        $('#toggle, .menu-wraper').on('click', multiClickFunctionStop);
        $('.main-menu, .search-field').on('click', function (e) {
            e.stopPropagation();
        });

        blogLayoutFix();
        contactFormWidthFix();

        // Animate the elemnt if is allready visible on load
        animateElement();


        $('.doc-loader').fadeOut('fast');

    });


    $(window).on('resize', function () {
        blogLayoutFix();
        contactFormWidthFix();
    });

//------------------------------------------------------------------------
//Helper Methods -->
//------------------------------------------------------------------------


    function animateElement (e) {

        $(".animate").each(function (i) {

            var top_of_object = $(this).offset().top;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if ((bottom_of_window) > top_of_object) {
                $(this).addClass('show-it');
            }

        });

    }

    function blogLayoutFix () {

        $('.blog-item-holder.has-post-thumbnail:nth-child(2n)').each(function () {
            var x = $(".blog-holder").width() - $(this).find('.post-thumbnail').width() - (parseFloat($(this).find('.post-thumbnail').css('max-width')) - $(this).find('.post-thumbnail').width()) / 2;
            $(this).find('.post-thumbnail').css('transform', 'translateX(' + x + 'px)');
            x = $(this).find('.entry-holder').innerWidth() - 87 + $(this).find('.post-thumbnail').width() - x;
            $(this).find('.entry-holder').css('transform', 'translateX(-' + x + 'px)');
        });

    }

    function contactFormWidthFix () {
        $('.wpcf7 input[type=text], .wpcf7 input[type=email], .wpcf7 textarea').innerWidth($('.wpcf7-form').width());
    }

    function multiClickFunctionStop(e) {
        if ($(e.target).is('.menu-wraper') || $(e.target).is('.menu-right-part') || $(e.target).is('.menu-holder') || $(e.target).is('#toggle') || $(e.target).is('#toggle div'))
        {

            $('#toggle, .menu-wraper').off("click");
            $('#toggle').toggleClass("on");
            if ($('#toggle').hasClass("on"))
            {
                $('.header-holder').addClass('down');
                $('.menu-wraper, .menu-holder').addClass('show');
                $('#toggle, .menu-wraper').on("click", multiClickFunctionStop);
            } else
            {
                $('.header-holder').removeClass('down');
                $('.menu-wraper, .menu-holder').removeClass('show');
                $('#toggle, .menu-wraper').on("click", multiClickFunctionStop);
            }
        }
    }

    function singlePaginationHeightFix () {
        if ($('.single .nav-previous a').height() > $('.single .nav-next a').height())
        {
            $('.single .nav-next a').height($('.single .nav-previous a').height());
        } else
        {
            $('.single .nav-previous a').height($('.single .nav-next a').height());
        }
    }

    function is_touch_device () {
        return !!('ontouchstart' in window);
    }
})(jQuery);
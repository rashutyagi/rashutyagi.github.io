(function ($) {
    "use stict";

    $(".single-portfolio .content-wrapper").first().css("padding-top", 0);


    if (!$(".single-portfolio .nav-next").length)
    {
        $(".single-portfolio .nav-previous").css("padding-bottom", 0);
    }

    $(".page-content-wrapper .page-content, .single-portfolio .content-wrapper").each(function () {
        if (($.trim($(this).html()) == '') || ($.trim($(this).html()) == '<p></p>') || ($.trim($(this).html()) == '<div class="clear"></div>'))
        {
            $(this).addClass('blank');
        }
    });

//Portfolio
    var grid = $('.grid').imagesLoaded(function () {
        grid.isotope({
            itemSelector: '.grid-item',
            transitionDuration: 0,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });

        $('.grid-sizer, .grid-item').innerWidth($(".grid-sizer, .grid-item").innerWidth());
    });


    $(window).on('load', function () {

        //Image
        $(".image-slider").each(function () {
            var id = $(this).attr('id');

            var auto_value = window[id + '_auto'];
            var hover_pause = window[id + '_hover'];
            var speed_value = window[id + '_speed'];

            auto_value = (auto_value === 'true') ? true : false;
            hover_pause = (hover_pause === 'true') ? true : false;

            $('#' + id).slick({
                arrows: false,
                dots: true,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 750,
                autoplay: auto_value,
                autoplaySpeed: speed_value,
                pauseOnHover: hover_pause,
                fade: true,
                draggable: false,
                adaptiveHeight: true
            });
        });

        imageGallery();

    //PrettyPhoto initial
        $('a[data-rel]').each(function () {
            $(this).attr('rel', $(this).data('rel'));
        });

        $("a[rel^='prettyPhoto']").prettyPhoto({
            slideshow: false, /* false OR interval time in ms */
            overlay_gallery: false, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
            default_width: 1280,
            default_height: 720,
            deeplinking: false,
            social_tools: false,
            iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
        });


    });

    $(window).on('resize', function () {
        imageGallery();
        $('.grid-sizer, .grid-item').innerWidth("50%");
    });


    function imageGallery() {
        var isMobile = $(window).width() < 750;
        var rowHeight = isMobile ? 120 : 300;
        var imgMargin = isMobile ? 10 : 20;
        var borderVal;

        $('.coco-image-gallery').each(function () {
            var id = $(this).attr('id');

            $(this).find('.prettyPhotoLink').each(function () {
                $(this).attr('data-rel', "prettyPhoto[" + id + "]");
            });

            if ($('#' + id).parents('.full-page-width').length)
            {
                borderVal = -1;
            } else
            {
                borderVal = 0;
            }

            $('#' + id).justifiedGallery({
                rowHeight: rowHeight,
                margins: imgMargin,
                border: borderVal
            });
        });
    };
})(jQuery);
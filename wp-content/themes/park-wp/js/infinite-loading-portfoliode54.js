(function ($) {
    "use strict";
    var count = 1;

    if (parseInt(ajax_var_portfolio.posts_per_page) < parseInt(ajax_var_portfolio.total)) {
        $('.more-posts-portfolio').css('visibility', 'visible');
        $('.more-posts-portfolio').animate({opacity: 1}, 1500);
    } else {
        $('.more-posts-portfolio').css('display', 'none');
    }


    $('.more-posts-portfolio:visible').on('click', function () {
        count++;
        loadArticlePortfolio(count);
        $('.more-posts-portfolio').css('display', 'none');
        $('.more-posts-portfolio-loading').css('display', 'inline-block');
    });

    function loadArticlePortfolio(pageNumber) {
        $.ajax({
            url: ajax_var_portfolio.url,
            type: 'POST',
            data: "action=infinite_scroll&page_no=" + pageNumber + '&loop_file=loop-portfolio&security=' + ajax_var_portfolio.nonce,
            success: function (html) {
                var $newItems = $(html);

                //Add new items to the gallery
                $('.grid').isotope('insert', $newItems);
                // initialize Isotope after all images have loaded
                $('.grid').imagesLoaded(function () {
                    $('.grid').isotope();
                    $('.grid-sizer, .grid-item').innerWidth($(".grid-sizer, .grid-item").innerWidth());
                    animateElement();

                    if (count == ajax_var_portfolio.num_pages)
                    {
                        $('.more-posts-portfolio').css('display', 'none');
                        $('.more-posts-portfolio-loading').css('display', 'none');
                        $('.no-more-posts-portfolio').css('display', 'inline-block');
                    } else
                    {
                        $('.more-posts-portfolio').css('display', 'inline-block');
                        $('.more-posts-portfolio-loading').css('display', 'none');
                    }
                });
            }
        });
        return false;
    }

    function animateElement(e) {
        $(".animate").each(function (i) {
            var top_of_object = $(this).offset().top;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if ((bottom_of_window) > top_of_object) {
                $(this).addClass('show-it');
            }
        });
    }

})(jQuery);
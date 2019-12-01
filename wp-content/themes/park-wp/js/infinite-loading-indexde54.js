(function ($) {
    "use strict";

    var count = 1;

    $(document).on('ready', function () {
        if (parseInt(ajax_var.posts_per_page_index) < parseInt(ajax_var.total_index)) {
            $('.more-posts').css('visibility', 'visible');
            $('.more-posts').animate({opacity: 1}, 1500);
        } else {
            $('.more-posts').css('display', 'none');
        }


        $('.more-posts:visible').on('click', function () {
            count++;
            loadArticleIndex(count);
            $('.more-posts').css('display', 'none');
            $('.more-posts-loading').css('display', 'inline-block');
        });
    });

    function loadArticleIndex(pageNumber) {
        $.ajax({
            url: ajax_var.url,
            type: 'POST',
            data: "action=infinite_scroll_index&page_no_index=" + pageNumber + '&loop_file_index=loop-index&security=' + ajax_var.nonce,
            success: function (html) {
                $(".blog-holder").append(html);

                $(".blog-holder").imagesLoaded(function () {

                    $('.blog-item-holder.has-post-thumbnail:nth-child(2n)').each(function () {
                        var x = $(".blog-holder").width() - $(this).find('.post-thumbnail').width() - (parseFloat($(this).find('.post-thumbnail').css('max-width')) - $(this).find('.post-thumbnail').width()) / 2;
                        $(this).find('.post-thumbnail').css('transform', 'translateX(' + x + 'px)');
                        x = $(this).find('.entry-holder').innerWidth() - 87 + $(this).find('.post-thumbnail').width() - x;
                        $(this).find('.entry-holder').css('transform', 'translateX(-' + x + 'px)');
                    });

                    animateElement();

                    if (count == ajax_var.num_pages_index)
                    {
                        $('.more-posts').css('display', 'none');
                        $('.more-posts-loading').css('display', 'none');
                        $('.no-more-posts').css('display', 'inline-block');
                    } else
                    {
                        $('.more-posts').css('display', 'inline-block');
                        $('.more-posts-loading').css('display', 'none');
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
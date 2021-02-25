jQuery(document).ready(function (e) {

    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    // header fixed
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (width > 1024) {
            if (scroll >= 100) {
                $(".header").addClass("fixed");
            } else {
                $(".header").removeClass("fixed");
            }
        } else {
            if (scroll >= 100) {
                $(".header").hide();
                $('.float-menu-icon').addClass('open');
            } else {
                $(".header").show();
                $('.float-menu-icon').removeClass('open');
            }
        }
    });

    var mainSlider = new Swiper('.main-slider', {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        height: 600
    });


    var sliderContainer = new Swiper('.slider-container', {
        loop: true,
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        autoHeight: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
        }
    });


    // open nav menu mobile
    $(".header .menu-icon").on("click", function () {
        $('.mobile-menu').addClass('open');
        $('.overlay').addClass('open');
    });

    $('.float-menu-icon').on('click', function () {
        console.log('ss')
        $('.mobile-menu').addClass('open');
            $('.overlay').addClass('open');
    })

    $('.close-menu').click(function () {
        $('.mobile-menu').removeClass('open');
        $('.overlay').removeClass('open');
    })

    window.onscroll = function () {
        scrollFunction()
    };

    // khai báo hàm scrollFunction
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("scrollTop").style.display = "block";
        } else {
            document.getElementById("scrollTop").style.display = "none";
        }
    }

    //gán sự kiện click cho button
    document.getElementById('scrollTop').addEventListener("click", function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
});
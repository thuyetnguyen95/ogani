'use strict';

/*------------------
    Preloader
--------------------*/
$(window).on('load', function () {
    $(".loader").fadeOut();
    $("#preloder").delay(200).fadeOut("slow");
});

/*------------------
    Background Set
--------------------*/
$('.set-bg').each(function () {
    var bg = $(this).data('setbg');
    $(this).css('background-image', 'url(' + bg + ')');
});

//Humberger Menu
$(".humberger__open").on('click', function () {
    $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
    $(".humberger__menu__overlay").addClass("active");
    $("body").addClass("over_hid");
});

$(".humberger__menu__overlay").on('click', function () {
    $(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
    $(".humberger__menu__overlay").removeClass("active");
    $("body").removeClass("over_hid");
});

/*------------------
    Navigation
--------------------*/
$(".mobile-menu").slicknav({
    prependTo: '#mobile-menu-wrap',
    allowParentLinks: true
});

/*-----------------------
    Categories Slider
------------------------*/
$(".categories__slider").owlCarousel({
    loop: true,
    margin: 0,
    items: 4,
    dots: false,
    nav: true,
    navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true,
    responsive: {

        0: {
            items: 1,
        },

        480: {
            items: 2,
        },

        768: {
            items: 3,
        },

        992: {
            items: 4,
        }
    }
});

/*--------------------------
    Latest Product Slider
----------------------------*/
$(".latest-product__slider").owlCarousel({
    loop: true,
    margin: 0,
    items: 1,
    dots: false,
    nav: true,
    navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true
});

/*-----------------------------
    Product Discount Slider
-------------------------------*/
$(".product__discount__slider").owlCarousel({
    loop: true,
    autoplay: true,
    autoHeight: false,
    items: 3,
    responsive: {
        1000: { items: 3 },
        756: { items: 2 },
        0: { items: 1}
    }
});

/*---------------------------------
    Product Details Pic Slider
----------------------------------*/
$(".product__details__pic__slider").owlCarousel({
    loop: true,
    margin: 20,
    items: 4,
    dots: true,
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true
});

/*--------------------------
    Select
----------------------------*/
$("select").niceSelect();

/*------------------
    Single Product
--------------------*/
$('.product__details__pic__slider img').on('click', function (event) {
    var imgurl = $(this).data('imgbigurl');
    var bigImg = $('.product__details__pic__item--large').attr('src');
    if (imgurl != bigImg) {
        $('.product__details__pic__item--large').attr({
            src: imgurl
        });
    }
});

 /*-------------------
    Quantity change
--------------------- */
// var proQty = $('.pro-qty');
// proQty.prepend('<span class="dec qtybtn">-</span>');
// proQty.append('<span class="inc qtybtn">+</span>');
// proQty.on('click', '.qtybtn', function () {
//     var $button = $(this);
//     var oldValue = $button.parent().find('input').val();
//     if ($button.hasClass('inc')) {
//         var newVal = parseFloat(oldValue) + 1;
//     } else {
//         // Don't allow decrementing below zero
//         if (oldValue > 0) {
//             var newVal = parseFloat(oldValue) - 1;
//         } else {
//             newVal = 0;
//         }
//     }
//     $button.parent().find('input').val(newVal);
// });

// var proQty = $('.pro-qty');
// proQty.prepend('<span class="dec qtybtn">-</span>');
// proQty.append('<span class="qtybtn inc">+</span>');
// $('.qtybtn').on('click', (event) => {
//     let inputQty = proQty.find('input');
//     let inputValue = parseInt(inputQty.val());
//     if ($(event.target).hasClass('inc')) {
//         inputValue += 1
//     } else {
//         if (!inputValue) {
//             inputValue = 0;
//         } else {
//             inputValue -= 1;
//         }
//     }

//     inputQty.val(inputValue);
// })

// Ẩn hiện menu sidebar
$('.hero__categories__all').click(function() {
    $('.hero__categories ul').slideToggle();
})

// Ẩn hiện sản phẩm theo loại
$('.featured__controls li').click(function(event) {
    $('.featured__controls li').removeClass('active');
    $(event.target).addClass('active');

    $('.featured__filter').children().hide();
    $('.featured__filter').children($(event.target).data('filter')).show();
});

// Handle search
function handleSearchProduct() {
// $('#keyword').val()
    if(!$('#keyword').val().trim()) {
        $('.search-products').empty().append('<p>Không có sản phẩm nào!</p>');
        return
    }
    console.log('keyword: ',$('#keyword').val(), !$('#keyword').val().trim());

    let searchResult = PRODUCTS.filter((product) => {
        return product.name.toLowerCase().includes($('#keyword').val().toLowerCase().trim())
    })
    if (!searchResult.length) {
        $('.search-products').empty().append('<p>Không có sản phẩm nào!</p>');
        return
    }

    let searchEl = '';
    searchResult.forEach(product => {
        searchEl += ` <a href="/shop-details.html?id=${product.id}">
            <div class="search-product-item">
                <img src="${product.image}" alt="">
                <div class="search-product-item-info">
                    <p>${product.name}</p>
                    <p>${product.price.toLocaleString()}đ</p>
                </div>
            </div>
        </a>
        `
    });

    $('.search-products').empty().append(searchEl);
};

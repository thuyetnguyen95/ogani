let searchParams = new URLSearchParams(window.location.search);
let productId = searchParams.get('id') || 1;

const _product = PRODUCTS.find(product => {
  return product.id == productId
})

// Set product info
$('.product__details__pic__item--large').attr("src", _product.image);
$('.product__details__text h3').text(_product.name);
$('.product__details__price').text(_product.price.toLocaleString() + 'đ');
$('.product__details__introduction').text(_product.introduction);
$('.product__details--stock').text(_product.stock > 0 ? "Còn hàng" : "Hết hàng");
$('.product__details--weight').text(_product.weight + " kg");

if (_product.collections.length) {
  let collectionsEl = '';
  _product.collections.forEach(image => {
    collectionsEl += `<img data-imgbigurl="${image}" src="${image}" alt=""></img>`;
  })
  $('.product__details__pic__slider').append(collectionsEl);
}

$('#tabs-1 .product__details__tab__desc').append(`<p>${_product.description}</p>`)
$('#tabs-2 .product__details__tab__desc').append(`<p>${_product.information}</p>`)
$('#tabs-3 .product__details__tab__desc').append(`<p>${_product.review}</p>`)

// Xử lý nhập số lượng sản phẩm
var proQty = $('.pro-qty');
proQty.prepend('<span class="dec qtybtn">-</span>');
proQty.append('<span class="qtybtn inc">+</span>');
$('.qtybtn').on('click', (event) => {
    let inputQty = proQty.find('input');
    let inputValue = parseInt(inputQty.val());
    if ($(event.target).hasClass('inc')) {
        inputValue += 1
    } else {
        if (!inputValue) {
            inputValue = 0;
        } else {
            inputValue -= 1;
        }
    }

    inputQty.val(inputValue);
    $('.primary-btn').attr("onclick", `addToCart(${_product.id}, ${inputValue})`);
})
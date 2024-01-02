// Lây id sản phẩm từ URL
let searchParams = new URLSearchParams(window.location.search);
let productId = searchParams.get('id');

// Tìm kiếm sản phẩm theo id
const _product = PRODUCTS.find((product) => {
  return product.id == productId;
})

if (!_product) {
  $('.product-details .container')
    .empty()
    .append('<h2 class="not-found">Sản phẩm không tồn tại</h2>');
}

// Thay thông tin sản phẩm
$('.product__details__text h3').text(_product.name);
$('.product__details__price').text(_product.price.toLocaleString() + 'đ');
$('.product__details__introduction').text(_product.introduction)
$('.product-stock')
  .addClass(_product.stock > 0 ? '' : 'text-danger')
  .text(_product.stock > 0 ? 'Còn hàng' : 'Hết hàng');
$('.product-weight').text(_product.weight + 'kg');
$('#tabs-1 .product__details__tab__desc').append(`<p>${_product.description}</p>`);
$('#tabs-2 .product__details__tab__desc').append(`<p>${_product.information}</p>`);
$('#tabs-3 .product__details__tab__desc').append(`<p>${_product.review}</p>`);
$('.product__details__pic__item--large').attr('src', _product.image);

// Hiển thị collections
let productCollectionDOM = '';
if (_product.collections.length) {
  _product.collections.forEach((image) => {
    productCollectionDOM += `<img class="product-img-small" src="${image}" alt=""></img>`;
  })
}
$('.product__details__pic__slider').append(productCollectionDOM);

// Thêm vào giỏ hàng
let productQty = $('.pro-qty input');
$('#add-to-cart').attr('onclick', `addToCart(${productId}, ${productQty.val()})`);

productQty.on('input', () => {
  if (!isNaN(productQty.val())) {
    $('#add-to-cart').attr('onclick', `addToCart(${productId}, ${parseInt(productQty.val())})`);
  }
})




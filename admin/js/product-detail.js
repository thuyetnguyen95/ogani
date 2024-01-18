let searchParams = new URLSearchParams(window.location.search);
let productId = searchParams.get('productId');

function showProductInfo() {
  if (!PRODUCTS || !PRODUCTS.length) {
    $('.no-product').show();
    return;
  }

  let product = PRODUCTS.filter(productItem => {
    return productItem.id == productId;
  })

  if (!product.length) {
    $('.no-product').show();
    return;
  }
  
  product = product[0];
  console.log('product ', product);

  $('.productId span').text(product.id);
  $('.productName span').text(product.name);
  $('.productPrice span').text(product.price.toLocaleString() + 'đ');
  $('.productImage img').attr("src", '/' + product.image);
  $('.productDiscount span').text(product.discount + '%');
  $('.productColor span').text(product.color);
  $('.productSize span').text(product.size);
  $('.productStock span').text(product.stock);
  $('.productWeight span').text(product.weight + 'kg');
  $('.productIntro span').text(product.introduction);
  $('.productDesc span').text(product.description);
  $('.productInfo span').text(product.information);
  $('.productReview span').text(product.review);

  if (!product.collections.length) {
    $('.productCollection').hide();
  }

  let collectionDOM = '';
  product.collections.forEach(image => {
    collectionDOM += `<img src="${image}" style="width: 150px; margin-right: 32px">`;
  });
  $('.productCollection').append(collectionDOM);
}
showProductInfo();
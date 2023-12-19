// Thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
  console.log('addToCart: ', productId);
}

// renderCart(products);
// Hiển thị giỏ hàng
function renderCart(products) {
  // Hiển thị danh sách sản phẩm ra giỏ hàng.
  // Tạo DOM sản phẩm
  let productsElement = '';

  PRODUCTS.forEach(function (product) {
    productsElement += `<div class="row mt-2 align-items-center">
      <div class="col-md-3 col-3 pr-0">
          <img src="${product.image}" alt="">
      </div>
      <div class="col-md-7 col-7">
          <p class="m-0">${product.name}</p>
          <p class="m-0">${product.price}đ x ${product.qty}</p>
      </div>
      <div class="col-md-1 col-1">
          <button class="btn btn-defaut" onclick="removeCartProduct(${product.id})">x</button>
      </div>
    </div>
    `
  })
  // $('#buy-list').append(productsElement)
  $('#buy-list').empty().append(productsElement);

  // Set số lượng sản phẩm cho icon cart
  $('.cart-amount').text(PRODUCTS.length);

  // Tính tổng giá sản phẩm trong giỏ hàng.
  let totalPrice = 0;
  PRODUCTS.forEach(function (product) {
    totalPrice += product.price * product.qty;
  })
  $('#total-price').text(`${totalPrice}đ`);
}

// Xóa sản phẩm khỏi giỏ hàng
function removeCartProduct(id) {
  let products = PRODUCTS.filter(function (product) {
    return product.id !== id;
  })

  renderCart(products);
}
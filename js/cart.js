

// Hiển thị danh sách sản phẩm ra giỏ hàng.
function renderCart(products) {
  // Tạo DOM sản phẩm
  let productsElement = '';

  products.forEach(function (product) {
    productsElement += `<div class="row mt-2 align-items-center">
      <div class="col-md-3 col-3 pr-0">
          <img src="${product.image}" alt="">
      </div>
      <div class="col-md-7 col-7">
          <p class="m-0">${product.name}</p>
          <p class="m-0">${product.price.toLocaleString()}đ x ${product.qty}</p>
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
  $('.cart-amount').text(products.length);

  // Tính tổng giá sản phẩm trong giỏ hàng.
  let totalPrice = 0;
  products.forEach(function (product) {
    totalPrice += product.price * product.qty;
  })
  $('.total-price').text(`${totalPrice.toLocaleString()}đ`);
}

// Xóa sản phẩm khỏi giỏ hàng
function removeCartProduct(id) {
  let cart = localStorage.getItem('cart'); // lấy giỏ hàng trong localstorage
  let products = JSON.parse(cart || '[]')

  let result = products.filter(function (product) {
    return product.id !== id;
  })

  renderCart(result);
}


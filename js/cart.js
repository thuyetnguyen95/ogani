

// Hiển thị danh sách sản phẩm ra giỏ hàng.
function renderCart(products) {
  if (!products.length) {
    return;
  }
  
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
  let cart = localStorage.getItem('cart') || '[]';
  let products = JSON.parse(cart);

  // Loại bỏ sản phẩm ra khỏi mảng
  let result = products.filter(function (product) {
    return product.id !== id;
  })

  localStorage.setItem('cart', JSON.stringify(result)); // Cập nhật lại giá trị giỏ hàng trong localStorage

  renderCart(result); // Render lại giỏ hàng
}

function addToCart(productId, quantity = 1) {

  let addedProduct = PRODUCTS.filter(function(product) {
    return productId === product.id;
  })
  addedProduct = addedProduct[0];

  let cart = localStorage.getItem('cart');
  cart = JSON.parse(cart);

  if (!cart) {
    cart = [];
    addedProduct.qty = quantity;
    cart.push(addedProduct)
    localStorage.setItem('cart', JSON.stringify(cart));
  } else {
    let oldProductIndex = cart.findIndex(function(product) {
      return product.id == addedProduct.id;
    })

    if (oldProductIndex == -1) {
      addedProduct.qty = quantity;
      cart.push(addedProduct);
      localStorage.setItem('cart', JSON.stringify(cart))
    } else {
      cart[oldProductIndex].qty += quantity;
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }

  renderCart(cart);
}

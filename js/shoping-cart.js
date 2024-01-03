function renderShopingCartPage() {
  let shopingCartProducts = localStorage.getItem('cart') || '[]';
  let products = JSON.parse(shopingCartProducts);

  if (products.length === 0) {
    // 
    $('#shoping-cart-container').empty();
    $('#shoping-cart-container').append('<h2>Bạn không có sản phẩm nào trong giỏ hàng!</h2>');

    return;
  }

  let productDOM = '';
  products.forEach((product) => {
    productDOM += `<tr>
        <td class="shoping__cart__item">
            <img src="${product.image}" alt="">
            <h5>${product.name}</h5>
        </td>
        <td class="shoping__cart__price">
          ${product.price.toLocaleString()}đ
        </td>
        <td class="shoping__cart__quantity">
            <div class="quantity">
                <div class="pro-qty">
                    <input type="text" value="${product.qty}" id="input_product_${product.id}" oninput="updateProductQty(${product.id})">
                </div>
            </div>
        </td>
        <td class="shoping__cart__total">
          ${(product.price * product.qty).toLocaleString()}đ
        </td>
        <td class="shoping__cart__item__close">
            <span class="icon_close" onclick="removeShopingCartItem(${product.id})"></span>
        </td>
      </tr>
    `;
  });

  $('#shoping-cart-table').empty().append(productDOM);
}

// Hiển thị trang shoping cart
renderShopingCartPage();

// Xóa sản phẩm
function removeShopingCartItem(id) {
  // Swal.fire({
  //   title: "Do you want to save the changes?",
  //   showDenyButton: true,
  //   showCancelButton: true,
  //   confirmButtonText: "Save",
  //   denyButtonText: `Don't save`
  // }).then((result) => {
  //   /* Read more about isConfirmed, isDenied below */
  //   if (result.isConfirmed) {
  //     Swal.fire("Saved!", "", "success");
  //   } else if (result.isDenied) {
  //     Swal.fire("Changes are not saved", "", "info");
  //   }
  // });

  removeCartProduct(id);
  renderShopingCartPage();
}

// Cập nhật số lượng sản phẩm
function updateProductQty(id) {
  let newQty = $(`#input_product_${id}`).val();

  let cart = localStorage.getItem('cart') || '[]';
  cart = JSON.parse(cart);

  let productIndex = cart.findIndex((product) => {
    return product.id == id;
  });

  
  if (newQty == '' || newQty == 0) {
    $(`#input_product_${id}`).val(cart[productIndex].qty);

    return;
  }
  
  
  cart[productIndex].qty = parseInt(newQty);
  localStorage.setItem('cart', JSON.stringify(cart));

  renderShopingCartPage();
}

// Tính tổn tiền trong giỏ hàng
function calculateTotalPrice() {
  let cart = localStorage.getItem('cart') || '[]';
  cart = JSON.parse(cart);
  if (cart.length == 0) {
    return;
  }

  let totalPrice = 0;
  cart.forEach((product) => {
    totalPrice += product.price * product.qty; 
  })

  $('#vat').text((totalPrice * 0.08).toLocaleString() + 'đ');
  $('#total').text((totalPrice * 1.08).toLocaleString() + 'đ');

  console.log('Total: ', totalPrice);
}
calculateTotalPrice(); // gọi hàm tính tổng tiền

function applyCoupon() {
  let couponInput = $('#input-coupon').val();
  let coupon = COUPONS.find((cp) => {
    return cp.code == couponInput;
  })

  if (coupon == undefined) {
    $('.coupon-error').show();
    return;
  }

  $('.coupon-error').hide();
  $('.display-coupon').show();
  $('#coupon-rate').text(coupon.rate);

  let cart = localStorage.getItem('cart') || '[]';
  cart = JSON.parse(cart);
  if (cart.length == 0) {
    return;
  }
  let totalPrice = 0;
  cart.forEach((product) => {
    totalPrice += product.price * product.qty; 
  })
  let couponAmount = totalPrice * (coupon.rate / 100)
  $('#coupon-amount').text(couponAmount.toLocaleString() + 'đ');


  $('#total').text(((totalPrice * 1.08) - couponAmount).toLocaleString() + 'đ');
}
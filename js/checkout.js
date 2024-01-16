function showOrder() {
  let cart = localStorage.getItem('cart');
  cart = JSON.parse(cart || '[]')

  let orderDOM = '';

  if (!cart.length) {
    orderDOM = 'Không có sản phẩm nào.'

    return;
  }

  cart.forEach(product => {
    orderDOM += `<li>${product.name}<span>${(product.price * product.qty).toLocaleString()}đ</span></li>`
  });

  $('#order').append(orderDOM);
}

showOrder();

function showOrderPrice() {
  let cart = localStorage.getItem('cart');
  cart = JSON.parse(cart || '[]');

  if (!cart.length) {
    $('.checkout__order__discount').hide();
    $('.checkout__order__discount span').text('0đ');
    $('.checkout__order__total span').text('0đ');
    return;
  }

  let totalPrice = 0;
  cart.forEach(product => {
    totalPrice += product.price*(1-product.discount/100) * product.qty;
  })

  let tax = 8 / 100;
  $('.checkout__order__subtotal span').text((totalPrice * tax).toLocaleString() + 'đ');

  let coupon = localStorage.getItem('coupon');
  coupon = JSON.parse(coupon || '0');

  let discount = 0;
  if (!coupon) {
    $('.checkout__order__discount').hide();
  } else {
    discount = totalPrice * (coupon.rate / 100);

    $('.checkout__order__discount span').text(discount.toLocaleString() + 'đ');
  }

  $('.checkout__order__total span').text((totalPrice*(1 + tax) - discount).toLocaleString() + 'đ');
}

showOrderPrice();

function handleOrder() {
  let ho = $('#input_ho').val().trim();
  let ten = $('#input_ten').val().trim();
  let tinh = $('#input_tinh').val().trim();
  let huyen = $('#input_huyen').val().trim();
  let tenPho = $('#input_tenpho').val().trim();
  let soNha = $('#input_sonha').val().trim();
  let sdt = $('#input_sdt').val().trim();
  let email = $('#input_email').val().trim();
  let ghichu = $('#input_ghichu').val().trim();

  let cart = localStorage.getItem('cart');
  cart = JSON.parse(cart || '[]');

  if(!cart.length) {
    Swal.fire({
      icon: "error",
      text: "Bạn không có sản phẩm nào trong giỏ hàng!"
    });

    return;
  }

  if (!ho || !ten || !tinh || !huyen || !tenPho || !soNha || !sdt || !email) {
    Swal.fire({
      icon: "error",
      text: "Bạn chưa nhập đầy đủ thông tin!"
    });

    return;
  }

  let coupon = localStorage.getItem('coupon');
  coupon = JSON.parse(coupon || '0');

  // danh sách order
  let orders = localStorage.getItem('orders');
  orders = JSON.parse(orders || '[]');

  let myOrder = {cart,coupon,ho,ten,tinh,huyen,tenPho,soNha,sdt,email,ghichu}

  console.log('myOrder ',myOrder);

  orders.push(myOrder);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Xóa order cũ
  localStorage.setItem('cart', '[]');
  localStorage.setItem('coupon', null);
  localStorage.setItem('totalDiscount', null);

  renderCart([]);
  showOrder();
  showOrderPrice();

  $('#input_ho').val('');
  $('#input_ten').val('');
  $('#input_tinh').val('');
  $('#input_huyen').val('');
  $('#input_tenpho').val('');
  $('#input_sonha').val('');
  $('#input_sdt').val('');
  $('#input_email').val('');
  $('#input_ghichu').val('');

  Swal.fire({
    icon: "success",
    text: "Bạn đã đặt hàng thành công!"
  });
}

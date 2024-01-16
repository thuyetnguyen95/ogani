let searchParams = new URLSearchParams(window.location.search);
let orderId = searchParams.get('orderId');

// Hiển thị thông tin người đặt hàng
function showOrderInfo() {
  let currentOrder = getCurrentOrder();
  if (!currentOrder) {
    return;
  }

  $('.order-ten').text(currentOrder.ho + currentOrder.ten);
  $('.order-sdt').text(currentOrder.sdt);
  $('.order-email').text(currentOrder.email);
  $('.order-ghichu').text(currentOrder.ghichu);
  $('.order-tinh').text(currentOrder.tinh);
  $('.order-huyen').text(currentOrder.huyen);
  $('.order-tenpho').text(currentOrder.tenPho);
  $('.order-sonha').text(currentOrder.soNha);
}
showOrderInfo();

// Hiển thị các sản phẩm trong giỏ hàng
function showOrderCart() {
  let currentOrder = getCurrentOrder();
  if (!currentOrder) {
    return;
  }

  let orderCartDOM = '';
  currentOrder.cart.forEach((product) => {
    orderCartDOM += `<tr>
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.price.toLocaleString()}đ</td>
      <td>${product.qty}</td>
      <td>${(product.price * product.qty).toLocaleString()}đ</td>
    </tr>
    `
  })

  $('.order-cart').append(orderCartDOM);
}
showOrderCart();

// Hiển thị tổng tiền
function showTotalPrice() {
  let currentOrder = getCurrentOrder();
  if (!currentOrder) {
    return;
  }

  let cart = currentOrder.cart || [];

  let totalPrice = 0;
  cart.forEach((product) => {
    totalPrice += product.price*(1-product.discount/100) * product.qty;
  })

  let discount = 0;
  if (!currentOrder.coupon) {
    $('#order-coupon').hide();
  } else {
    discount = totalPrice * (currentOrder.coupon.rate/100);
    $('#order-coupon span').text(currentOrder.coupon.rate + '%');
  }

  console.log('totalPrice ', totalPrice, discount, currentOrder);
  $('#order-vat span').text((totalPrice * 0.08).toLocaleString() + 'đ (8%)');
  $('#order-total-price').text((1.08*totalPrice - discount).toLocaleString() + 'đ');
}
showTotalPrice();

// Lấy order hiện tại
function getCurrentOrder() {
  let orders = localStorage.getItem('orders');
  orders = JSON.parse(orders || '[]');

  if(!orders.length) {
    return null;
  }

  let currentOrder = orders.filter((order, index) => {
    return index == orderId;
  })

  if (!currentOrder.length) {
    return null;
  }

  return currentOrder[0];
}

function confirmOrder() {
  let orders = localStorage.getItem('orders');
  orders = JSON.parse(orders || '[]');

  if(!orders.length) {
    return null;
  }

  orders[orderId].trangthai = 'da_xac_nhan_don';
  localStorage.setItem('orders', JSON.stringify(orders));

  Swal.fire({
    icon: "success",
    text: "Đã xác nhận đơn hàng thành công!"
  });
}

function delivered() {
  let orders = localStorage.getItem('orders');
  orders = JSON.parse(orders || '[]');

  if(!orders.length) {
    return null;
  }

  orders[orderId].trangthai = 'da_nhan_hang';
  localStorage.setItem('orders', JSON.stringify(orders));

  Swal.fire({
    icon: "success",
    text: "Đã giao hàng thành công!"
  });
}

function cancelOrder() {
  let orders = localStorage.getItem('orders');
  orders = JSON.parse(orders || '[]');

  if(!orders.length) {
    return null;
  }

  orders[orderId].trangthai = 'da_huy_don';
  localStorage.setItem('orders', JSON.stringify(orders));

  Swal.fire({
    icon: "success",
    text: "Đã hủy đơn hàng thành công!"
  });
}

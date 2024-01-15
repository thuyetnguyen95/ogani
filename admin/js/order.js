function renderTableOrder() {
  let orders = localStorage.getItem('orders');
  orders = JSON.parse(orders || '[]');
  console.log(orders);

  if (orders.length == 0) {
    $('#no-order').show();
  }

  $('#total-order').text(orders.length);

  let tableRowDOM = '';
  orders.forEach((order, index) => {
    tableRowDOM += `
      <tr>
        <td>${index}</td>
        <td>${order.ho} ${order.ten}</td>
        <td>${order.sdt}</td>
        <td>${orderStatus(order)}</td>
        <td>
          <a href="order-detail.html?orderId=${index}">Chi tiết</a>
        </td>
      </tr>
    `
  });

  $('#table-order').append(tableRowDOM);
}

renderTableOrder();


function orderStatus(order) {
  if (!order.trangthai) {
    return 'Đơn mới';
  }

  if (order.trangthai == 'da_huy_don') {
    return 'Đã hủy đơn';
  }

  if (order.trangthai == 'da_xac_nhan_don') {
    return 'Đã xác nhận đơn';
  }

  if (order.trangthai == 'da_nhan_hang') {
    return 'Đã nhận hàng';
  }

  return 'Đơn mới';
}

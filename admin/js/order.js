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
    return '<span>Đơn mới</span>';
  }

  if (order.trangthai == 'da_huy_don') {
    return '<span class="text-danger">Đã hủy đơn</span>';
  }

  if (order.trangthai == 'da_xac_nhan_don') {
    return '<span class="text-primary">Đã xác nhận đơn</span>';
  }

  if (order.trangthai == 'da_nhan_hang') {
    return '<span class="text-success">Đã nhận hàng</span>';
  }

  return '<span>Đơn mới</span>';
}

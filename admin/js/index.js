function showOrdersAnalys() {
  let orders = localStorage.getItem('orders');
  orders = JSON.parse(orders || '[]');

  let newOrders = orders.filter(order => {
    return !order.trangthai;
  });
  $('.newOrders').text(newOrders.length);

  let confirmOrders = orders.filter(order => {
    return order.trangthai == 'da_xac_nhan_don';
  });
  $('.confirmOrders').text(confirmOrders.length);
  
  let daNhanHang = orders.filter(order => {
    return order.trangthai == 'da_nhan_hang';
  });
  $('.daNhanHang').text(daNhanHang.length);


  let daHuyDon = orders.filter(order => {
    return order.trangthai == 'da_huy_don';
  });
  $('.daHuyDon').text(daHuyDon.length);
}

showOrdersAnalys();

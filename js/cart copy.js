
let products = [
  {
    id: 1,
    name: 'Chuối',
    price: 10000,
    image: 'img/cart/cart-1.jpg',
    qty: 2,
  },
  {
    id: 2,
    name: 'Cam',
    price: 8000,
    image: 'img/cart/cart-2.jpg',
    qty: 5,
  },
  {
    id: 3,
    name: 'Táo',
    price: 11000,
    image: 'img/cart/cart-3.jpg',
    qty: 3,
  },
];

// Set số lượng sản phẩm cho icon cart
$('.cart-amount').text(products.length);


// Hiển thị danh sách sản phẩm ra giỏ hàng.
// Tạo DOM sản phẩm
let productsElement = '';

products.forEach(function (product) {
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

$('#buy-list').append(productsElement)

// Tính tổng giá sản phẩm trong giỏ hàng.
let totalPrice = 0;
products.forEach(function (product) {
  totalPrice += product.price * product.qty;
})
$('#total-price').text(`${totalPrice}đ`);

// Xóa sản phẩm khỏi giỏ hàng
function removeCartProduct(id) {
  products = products.filter(function (product) {
    return product.id !== id;
  })

  let productsElement = '';
  products.forEach(function (product) {
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

  $('#buy-list').empty()
  $('#buy-list').append(productsElement)

  // Set số lượng sản phẩm cho icon cart
  $('.cart-amount').text(products.length);

  // Tính tổng giá sản phẩm trong giỏ hàng.
  let totalPrice = 0;
  products.forEach(function (product) {
    totalPrice += product.price * product.qty;
  })
  $('#total-price').text(`${totalPrice}đ`);
}


function addToCart(id) {
  let product = products.find(function(item) {
    return item.id === id
  })

  let carts = JSON.parse(localStorage.getItem('cart') || '[]') || [];
  let cartProductIndex = carts.findIndex(function(p) {return p.id == id})

  if (cartProductIndex == -1) {
    console.log('Khong co ');
    product.qty = 1;
    carts.push(product)
    localStorage.setItem('cart', JSON.stringify(carts))
  } else {
    console.log(' co cart ');
    carts[cartProductIndex].qty += 1;
    localStorage.setItem('cart', JSON.stringify(carts))
  }
}
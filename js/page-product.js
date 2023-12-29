const ITEM_PER_PAGE = 12;

// Phân trang
function showPagination(products) {
  let searchParams = new URLSearchParams(window.location.search);
  let currentPage = searchParams.get('page') || 1;

  let totalPages = Math.ceil(products.length / ITEM_PER_PAGE);
  let paginationEl = '';
  for (let index = 1; index <= totalPages; index++) {
    paginationEl += `<a href="?page=${index}" class="${currentPage == index ? 'active' : ''}">${index}</a>`;
  }

  $('.product__pagination').empty().append(paginationEl);
}
showPagination(PRODUCTS);

function showProductInPage(products) {
  let searchParams = new URLSearchParams(window.location.search);
  let currentPage = searchParams.get('page') || 1;
  let productsInPage = products.slice(ITEM_PER_PAGE * (currentPage - 1), ITEM_PER_PAGE * currentPage)

  showProducts(productsInPage);
}
showProductInPage(PRODUCTS);

// Hiển thị danh sách sản phẩm khuyến mãi
function showDiscountProducts() {
  let discountProducts = PRODUCTS.filter(function(product) {
    return product.discount != 0;
  })

  let discountProductsEl = '';
  discountProducts.forEach(function(product) {
    discountProductsEl += `
      <div class="col-lg-4">
        <div class="product__discount__item">
            <div class="product__discount__item__pic set-bg"
                data-setbg="${product.image}">
                <div class="product__discount__percent">-${product.discount}%</div>
                <ul class="product__item__pic__hover">
                    <li><a href="#"><i class="fa fa-heart"></i></a></li>
                    <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                </ul>
            </div>
            <div class="product__discount__item__text">
                <span>Dried Fruit</span>
                <h5><a href="#">${product.name}</a></h5>
                <div class="product__item__price">
                ${(product.price - (product.price * product.discount/100)).toLocaleString()}đ
                <span>${product.price.toLocaleString()}đ</span>
                </div>
            </div>
        </div>
    </div>
    `;
  })


  $('.product__discount__slider').append(discountProductsEl);
}

showDiscountProducts();

// Hiển thị toàn bộ sản phẩm
function showProducts(products) {
  // Khai báo biến lưu trữ DOM
  let productsEl = '';
  // Lặp qua các phần tử
  products.forEach(function(product) {
    // Nối chuỗi DOM
    productsEl += `
      <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="product__item">
            <div class="product__item__pic set-bg" data-setbg="${product.image}">
                <ul class="product__item__pic__hover">
                    <li><a href="#"><i class="fa fa-heart"></i></a></li>
                    <li><a href="javascript:void(0)" onclick="addToCart(${product.id})"><i class="fa fa-shopping-cart"></i></a></li>
                </ul>
            </div>
            <div class="product__item__text">
                <h6><a href="#">${product.name}</a></h6>
                <h5>${product.price.toLocaleString()}đ</h5>
            </div>
        </div>
    </div>
    `;
  })

  // Append DOM product vào khu vực hiển thị danh sách sản phẩm
  $('#products-area').empty().append(productsEl);

  $('.set-bg').each(function () {
    var bg = $(this).data('setbg');
    $(this).css('background-image', 'url(' + bg + ')');
  });
}

// Sắp xếp sản phẩm
function sortPrice() {
  let sortType = $('#sort-price').val();

  let tempProducts = PRODUCTS.slice();

  if (sortType == 'asc') {
    tempProducts.sort(function(prevProduct, nextProduct) {
      return prevProduct.price - nextProduct.price;
    })
  } else if (sortType == 'desc') {
    tempProducts.sort(function(prevProduct, nextProduct) {
      return nextProduct.price - prevProduct.price;
    })
  } else {
    tempProducts = PRODUCTS;
  }

  showProductInPage(tempProducts);
}

// Lọc sản phẩm theo giá
let minamount = $('.price-range').data('min');
let maxamount = $('.price-range').data('max');

$('#minamount').val(minamount.toLocaleString() + 'đ');
$('#maxamount').val(maxamount.toLocaleString() + 'đ');

$('.price-range').slider({
  step: 1000,
  min: minamount,
  max: maxamount,
  values: [minamount, maxamount],
  // slide: function(event, ui) {
  //   $('#minamount').val(ui.values[0].toLocaleString() + 'đ');
  //   $('#maxamount').val(ui.values[1].toLocaleString() + 'đ');
  // },
  stop: function(event, ui) {
    $('#minamount').val(ui.values[0].toLocaleString() + 'đ');
    $('#maxamount').val(ui.values[1].toLocaleString() + 'đ');

    let result = PRODUCTS.filter(function(product) {
      return product.price >= ui.values[0] && product.price <= ui.values[1]
    });

    showProductInPage(result);
    showPagination(result);
  }
})

function addToCart(productId) {
  let addedProduct = PRODUCTS.filter(function(product) {
    return productId === product.id;
  })
  addedProduct = addedProduct[0];

  let cart = localStorage.getItem('cart');
  cart = JSON.parse(cart);

  if (!cart) {
    cart = [];
    addedProduct.qty = 1;
    cart.push(addedProduct)
    localStorage.setItem('cart', JSON.stringify(cart));
  } else {
    let oldProductIndex = cart.findIndex(function(product) {
      return product.id == addedProduct.id;
    })

    if (oldProductIndex == -1) {
      addedProduct.qty = 1;
      cart.push(addedProduct);
      localStorage.setItem('cart', JSON.stringify(cart))
    } else {
      cart[oldProductIndex].qty += 1;
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }

  renderCart(cart);
}

// Hiển thị sẵn giỏ hàng
let cartDefault = localStorage.getItem('cart');
renderCart(JSON.parse(cartDefault));
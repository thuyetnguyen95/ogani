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
                <span>Hoa quả sấy</span>
                <h5><a href="./shop-details.html?id=${product.id}">${product.name}</a></h5>
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
                <h6><a href="./shop-details.html?id=${product.id}">${product.name}</a></h6>
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
  let sortType = $('.sort-price').val();

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

// // Hiển thị sẵn giỏ hàng
// let cartDefault = localStorage.getItem('cart') || '[]';
// renderCart(JSON.parse(cartDefault));

// Sản phẩm mới nhất
function showLatestProducts() {
  let latestProducts = PRODUCTS.slice(PRODUCTS.length - 6, PRODUCTS.length);

  let latestProductDOM = '';
  for (let index = 0; index < 2; index++) {
    latestProductDOM += `
    <div class="latest-prdouct__slider__item">
      <a href="#" class="latest-product__item">
          <div class="latest-product__item__pic">
              <img src="${latestProducts[index * 3 + 0].image}" alt="">
          </div>
          <div class="latest-product__item__text">
              <h6>${latestProducts[index * 3 + 0].name}</h6>
              <span>${latestProducts[index * 3 + 0].price.toLocaleString()}đ</span>
          </div>
      </a>
      <a href="#" class="latest-product__item">
          <div class="latest-product__item__pic">
              <img src="${latestProducts[index * 3 + 1].image}" alt="">
          </div>
          <div class="latest-product__item__text">
              <h6>${latestProducts[index * 3 + 1].name}</h6>
              <span>${latestProducts[index * 3 + 1].price.toLocaleString()}đ</span>
          </div>
      </a>
      <a href="#" class="latest-product__item">
          <div class="latest-product__item__pic">
              <img src="${latestProducts[index * 3 + 2].image}" alt="">
          </div>
          <div class="latest-product__item__text">
              <h6>${latestProducts[index * 3 + 2].name}</h6>
              <span>${latestProducts[index * 3 + 2].price.toLocaleString()}đ</span>
          </div>
      </a>
    </div> 
    `;
  }

  $('.latest-product__slider').append(latestProductDOM);
}
showLatestProducts();


// function handleSearchProduct() {
//   let keyword = $('#keyword').val().toLowerCase().trim();

//   if (keyword == '') {
//     $('.search-count').text('');
//     $('.search-products').empty().append(`<p>Không có sản phẩm nào!</p>`);
//     return
//   }

//   let products = PRODUCTS.filter((product) => {
//     return product.name.toLowerCase().includes(keyword);
//   });

//   let productsDom = '';
//   if (products.length) {
//     products.forEach((product) => {
//       productsDom += `
//           <a href="#">
//             <div class="search-product-item">
//                 <img src="${product.image}" alt="">
//                 <div class="search-product-item-info">
//                     <p>${product.name}</p>
//                     <p>${product.price.toLocaleString()}đ</p>
//                 </div>
//             </div>
//         </a>
//       `;
//     });
//   } else {
//     productsDom = `<p>Không có sản phẩm nào!</p>`;
//   }

//   $('.search-count').text(products.length);

//   $('.search-products').empty().append(productsDom);
//   console.log(products);
// }

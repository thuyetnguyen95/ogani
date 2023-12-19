const ITEM_PER_PAGE = 12;

// Lấy số page hiện tại
let queryString = new URLSearchParams(window.location.search);
let page = parseInt(queryString.get('page') || 1);

// Lấy sản phẩm của page hiện tại và hiển thị
let pageProducts = PRODUCTS.slice(ITEM_PER_PAGE*(page - 1), ITEM_PER_PAGE*page);
showProducts(pageProducts);
showPagination();

// Hiển thị phân trang
function showPagination() {
  // $('.product__pagination')
  let totalPage = Math.ceil(PRODUCTS.length / ITEM_PER_PAGE);
  console.log(totalPage);
  if (totalPage == 1) {
    $('.product__pagination').append('<a href="?page=1">1</a>');
  } else {
    let paginateEL = '';
    for (let p = 1; p <= totalPage; p++) {
      paginateEL += `<a href="?page=${p}">${p}</a>`
    }
  
    paginateEL += `<a href="javascript:void(0)" onclick="nextPage()"><i class="fa fa-long-arrow-right"></i></a>`
  
    $('.product__pagination').append(paginateEL);
  }
}

// Hiển thị toàn bộ sản phẩm
function showProducts(products) {
  let productsAreaEL = '';
  products.forEach(function(product) {
    productsAreaEL += `
    <div class="col-lg-4 col-md-6 col-sm-6">
      <div class="product__item">
          <div class="product__item__pic set-bg" data-setbg="${product.image}">
              <ul class="product__item__pic__hover">
                  <li><a href="#"><i class="fa fa-heart"></i></a></li>
                  <li><a href="javascript:void(0)"><i class="fa fa-shopping-cart" onclick="addToCart(${product.id})"></i></a></li>
              </ul>
          </div>
          <div class="product__item__text">
              <h6><a href="#">${product.name}</a></h6>
              <h5>${product.price.toLocaleString('vi')}đ</h5>
          </div>
      </div>
    </div>
    `
  })

  $('#products-area').empty().append(productsAreaEL)
}

// Nhảy sang page kế tiếp
function nextPage() {
  console.log('nextPage');
}
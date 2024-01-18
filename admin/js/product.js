
function showProducts() {
  if (!PRODUCTS || !PRODUCTS.length) {
    $('.no-product').show();
    return;
  }

  let productDOM = '';
  PRODUCTS.forEach(product => {
    productDOM += `
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td style="width: 170px">
          <img src="/${product.image}" style="width: 150px">
        </td>
        <td>${product.price.toLocaleString()}đ</td>
        <td>${product.introduction}</td>
        <td>
          <a href="product-detail.html?productId=${product.id}">Chi tiết</a>
        </td>
      </tr>
    `;
  })
  $('#table-product').append(productDOM);
}

showProducts();
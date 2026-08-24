var arr = [];

function save() {
  var a = {
    name: document.getElementById('customer').value,
    id: document.getElementById('productId').value,
    prdname: document.getElementById('productName').value,
    qty: document.getElementById('productQuantity').value,
    price: document.getElementById('productPrice').value
  };

  console.log(a);
  arr.push(a);
}

function show() {
  var html = '';
  var n = 1;

  for (var i in arr) {
    html += '<tr>';
    html += '<td>' + n + '</td>';
    html += '<td>' + arr[i].name + '</td>';
    html += '<td>' + arr[i].id + '</td>';
    html += '<td>' + arr[i].prdname + '</td>';
    html += '<td>' + arr[i].qty + '</td>';
    html += '<td>' + arr[i].price + '</td>';
    html += '<td>' + parseFloat(arr[i].qty) * parseFloat(arr[i].price) + '</td>';
    html += '</tr>';
    n++;
  }

  document.getElementById('tbl').innerHTML = html;
}

function reset() {
  document.getElementById('customer').value = '';
  document.getElementById('productId').value = '';
  document.getElementById('productName').value = '';
  document.getElementById('productQuantity').value = '';
  document.getElementById('productPrice').value = '';
}

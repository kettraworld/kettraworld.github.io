
const query = new URLSearchParams(window.location.search);
const product = parseInt(query.get('product'));

if (isNaN(product) || product < 1 || product > 5) {
  window.location.href = 'loja.html';
}

$("#id").val(query.get('product'));
$(document).ready(() => {
  axios.get('https://api.kettraworld.shop/product').then((result) => {
    const itens = result.data;
    let cards = '';
  itens.forEach(product => {
      const card = `
      <section class="card shop">
      <div class="icon">
      <img src="${product.data.image}" class="card-img-top" alt="${product.data.name}" />
      </div>
      <h3>${product.data.name}</h3>
      <span>${product.data.description}</span>
      <a href="/payment.html?product=${product.ID}">
      <button class="container valor">R$ ${product.data.price}</button>
      </a>
      </section>
      `;
      cards += card;
    });
    $('#shop').html(cards);
  });
});
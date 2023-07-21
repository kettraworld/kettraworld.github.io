const query = new URLSearchParams(window.location.search);

if (query.get('product')) {
  $('.section').remove();
  $('#shop').html(`<form class="box" id="payment" action="https://api.kettraworld.shop/payment" method="post" accept-charset="utf-8">
 <div class="form-group">
  <label for="name">Seu nick:</label>
   <input type="text" class="form-control" id="player" placeholder="Dream..." name="player" minlength="4" maxlength="18" required></div>
   <input type="hidden" name="id" id="id" value="${query.get('product')}" />
  <div class="form-group">
   <label for="email">Seu email:</label>
 <input type="email" class="form-control" id="email" placeholder="Dream@ho..." minlength="14" maxlength="80" name="email" required></div><div class="form-group">
 <label for="cupom">Tem um cupom?</label>
 <input type="text" class="form-control" id="cupom" placeholder="KW80%" minlength="4" maxlength="18" name="cupom"></div>
  <div class="form-group">
 <label for="plataform">Forma de pagamento:</label>
   <select class="form-control" id="payment" name="payment">
 <option value="paypal" disabled>PayPal</option>
 <option value="pix">Pix</option>
 <option value="stripe" disabled>Stripe</option>
 </select>
  </div>
   <button type="submit" style="padding: 6px;" class="valor"><i class="fab fa-gratipay"></i> Pagar</button>
</form>`);

 } else {
   
 $.getJSON('https://api.kettraworld.shop/product', (data) => { 
   let cards = '';
   data.forEach(product => {
      const card = `
     <section class="card shop">
      <div class="icon">
      <img src="${product.image}" class="card-img-top" alt="${product.name}" />
      </div>
      <h3>${product.name}</h3>
      <span>${product.description}</span>
      <a href="/loja.html?product=${product.id}">
      <button class="container valor">R$ ${product.price.replace('.', ',')}</button>
      </a>
      </section>
      `;
      cards += card;
    });
    $('#shop').html(cards);
 });
};
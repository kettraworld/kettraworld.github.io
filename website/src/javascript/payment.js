
$.getJSON('http://129.148.43.196:8080/product').done((data) => {
  
  let categories = {};
  data.forEach(product => {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
  });
  let $card_categories = '';
  for (const category in categories) {
    const category_card = `
  <div class="category " data-category="${category}">
  <img src="src/images/category/${category}.png" alt="${category}" />
   <p>${category}</p>
  </div>`;
    $card_categories += category_card;
  };

  $('#shop-categories').html($card_categories);

 $('.category').click(function() {
    const selectedCategory = $(this).data('category');
    let $card_product = '';

    categories[selectedCategory].forEach(product => {
      const productCard = `
        <shop class="card animate__animated animate__zoomIn ">
          <div class="icon">
            <img src="${product.image}" />
          </div>
          <h3>${product.name}</h3>
          <span>${product.description}</span>
          <button class="shop" product="${product.id}" data-bs-target="#modal-shop" data-bs-toggle="modal">R$ ${product.price.replace('.', ',')}</button>
        </shop>
      `;
      $card_product += productCard;
    });

    $('#shop-itens').html($card_product);
    $('#shop-categories').hide();
    $('#shop-back').removeClass('bx-store').addClass('bx-arrow-back');
  });

 $('#shop-back').click(function() {
    $('#shop-itens').html('');
    $('#shop-categories').show();
    $('#shop-back').removeClass('bx-arrow-back').addClass('bx-store');
  });

}).fail((err) => {
  $('#shop-itens').html(`
    <shop class="card">
      <span style="font-size: 0.9rem; word-break: break-word; color: #fff; margin: 5px; width: 100%;">
        <i class="bx bx-ghost"></i> Nenhum produto encontrado. Por favor tente novamente mais tarde!
      </span>
    </shop>
  `);
});


$("#modal-shop").on('show.bs.modal', (e) => $("#shop #id").val(e.relatedTarget.getAttribute('product')));

$("#shop-coupon").on('click', () => {
  
  if (!$("#shop #coupon").val()) {
    return message('Você não adicionou nenhum código promocional!');
  }

$.post('http://129.148.43.196:8080/payment/coupon', {
  id: $("#shop #id").val(),
  key: $("#shop #coupon").val()
 }).done((response) => {
  if (response.status === 200) {
      $("#shop-coupon").prop("disabled", true);
      $("#shop #coupon").prop("readonly", true);
      return message(`Parabéns, você recebeu <b style="color: green;">${response.data.discount}%</b> de desconto na sua compra!`);
  } else if (response.status === 201) {
      return message('O código promocional já expirou ou não está disponível para este produto!');
  } else {
      return message('Por favor, tente novamente mais tarde. Se o problema continuar, entre em contato pelo <a href="https://discord.gg/d3YgZTfZq5">discord</a>.');
    }
 }).fail(() => {
   return message('Ocorreu um erro ao tentar aplicar o código promocional. Por favor, tente novamente mais tarde.')
 });
});

$('.pay-button').on('click', function() {
 $('.payment-button').removeClass('select');
 $(this).addClass('select');
 $('#shop #platform').val($(this).data('value'));
});
 
$('button#pay').on('click', () => {
 

 if (!$("#shop #id").val()) {
   return message('Não obtivermos o produto desejado, por favor atualize a pagina ou selecione novamente!');
 } else if (!$("#shop #nickname").val()) {
    return message('Você não colocou seu nickname');
 } else if (/\s/.test($("#shop #nickname").val())) {
    return message('Você deve colocar um nickname sem espaços');
  } else if ($("#shop #nickname").val().length < 4 || $("#shop #nickname").val().length > 16) {
    return message('O seu nickname deve ter entre 4 e 16 caracteres!');
  } else if (!$("#shop #email").val()) {
    return message('Você não colocou seu e-mail!');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("#shop #email").val())) {
    return message('Por favor, insira um e-mail válido!');
  } else if ($("#shop #email").val().length < 12 || $("#shop #email").val().length > 80) {
    return message('O seu e-mail deve ter entre 12 e 80 caracteres!');
  } else if (!$("#shop #platform").val()) {
    return message('Escolha qual forma de pagamento você prefere!');
  };
  
 $('#pay').addClass('disabled')
    
$.post('http://129.148.43.196:8080/payment/create', {
  product: $("#shop #id").val(),
  nick: $("#shop #nickname").val(),
  email: $("#shop #email").val(),
  coupon: $("#shop #coupon").val(),
  platform: $("#shop #platform").val()
}).done((payment) => {
  window.location = payment.url;
}).fail((err) => {
  $('#pay').removeClass('disabled');
  return message('Não foi possível criar o pagamento, por favor tente novamente mais tarde!');
});

});
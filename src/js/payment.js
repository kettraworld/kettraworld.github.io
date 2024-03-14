
/*
if (Cookies.get('user_cookie') != 'authorized') {
  window.location = '/?cookie=denied';
};

if (!$query.get('product')) {
 // window.location = '/?product=invalid';
};*/

function $location(latitude, longitude) {
  return new Promise((resolve, reject) => {
    $.getJSON(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`, (response) => {
      return resolve(response)
    });
  });
};

function message(message) {
  $('#message').html(`
 <div class="toast fade show">
    <div class="toast-header">
      <img style="width: 10%;" src="src/img/favicon.ico" class="rounded me-2">
      <strong class="me-auto">
        Kettra World
      </strong>
      <small>Agora</small>
    </div>
    <div class="toast-body">
    <b><i class="fas fa-info-circle"></i> informação:</b> ${message}
    </div>
  </div>`);
  setTimeout(() => {
    $("#message").html("");
  }, 8000);
  return true;
}

const $payment_form = $("#payment");
const $payment = {
  name: $('#name'),
  surname: $('#surname'),
  nick: $('#nick'),
  email: $('#email'),
  coupon: $('#coupon'),
  platform: $('#platform'),
  terms: $('#terms'),
  address: $('#address'),
  city: $('#city'),
  cep: $('#cep'),
  state: $('#state'),
  country: $('#country'),
  latitude: $('#latitude'),
  longitude: $('#longitude')
};

navigator.geolocation.getCurrentPosition(async (g) => {

  let data = await $location(g.coords.latitude, g.coords.longitude);

  $payment.cep.val(data.address.postcode)
  $payment.address.val(data.display_name);
  $payment.city.val(data.address.city || data.address.town);
  $payment.state.val(data.address.state);
  $payment.country.val(data.address.country);
  $payment.latitude.val(g.coords.latitude);
  $payment.longitude.val(g.coords.longitude);
  
}, (err) => {

  $payment_form.find('input, button, select').prop("disabled", true);

  $("#geolocation").css('display', 'block');

  setTimeout(() => {
    $("#geolocation").css('display', 'none');
  }, 30000); // 30s

});

$('#payment-button-coupon').on('click', () => {
  
  if (true) {
  message('O <strong>código promocional</strong> que você forneceu não existe ou ja expirou!');
  return;
  }
});

$('#payment-button').on('click', () => {
  
if (!$payment.name.val()) {
  message('Para prosseguir com a compra é necessário que você insira seu <strong>primeiro nome</strong> no formulário.');
  return;
};

if (!isNaN(parseInt($payment.name.val()))) {
  message('Ops! Seu <strong>nome</strong> não pode ser um número.');
  return;
};

if ($payment.name.val().length < 3 || $payment.name.val().length > 35) {
 message('Para garantir um preenchimento correto do formulário, o <strong>nome</strong> precisa ter no mínimo <strong>3</strong> caracteres e no máximo <strong>35</strong>.');
  return;
};

if (!$payment.surname.val()) {
  message('Para prosseguir com a compra é necessário que você insira seu <strong>sobrenome</strong> no formulário.');
  return;
};

if (!isNaN(parseInt($payment.surname.val()))) {
  message('Ops! Seu <strong>sobrenome</strong> não pode ser um número.');
  return;
};

if ($payment.surname.val().length < 2 || $payment.surname.val().length > 180) {
 message('Para garantir um preenchimento correto do formulário, o <strong>sobrenome</strong> precisa ter no mínimo <strong>2</strong> caracteres e no máximo <strong>180</strong>.');
  return;
};

if (!$payment.nick.val()) {
  message('Para prosseguir com a compra é necessário que você insira seu <strong>nick de jogador(a)</strong> no formulário.');
  return;
};

if (!$payment.email.val()) {
  message('Para prosseguir com a compra é necessário que você insira seu <strong>e-mail</strong> no formulário.');
  return;
};

if ($payment.email.val().length < 12 || $payment.email.val().length > 85) {
 message('Para garantir um preenchimento correto do formulário, o <strong>e-mail</strong> precisa ter no mínimo <strong>12</strong> caracteres e no máximo <strong>85</strong>.');
  return;
};

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($payment.email.val())) {
  message('Ops! Para garantir um preenchimento correto do formulário é necessário que você forneça um <strong>e-mail</strong> valido!');
  return;
};

});

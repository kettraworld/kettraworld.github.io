if ("serviceWorker" in navigator) {
  
  navigator.serviceWorker.register('worker.js').then((worker) => {
    return worker.update();
  }).catch((err) => {
     console.log("Service worker: ", err.message);
  });
  
  navigator.serviceWorker.ready
  .then((worker) => {
    console.log("Service Worker ready!");
  });
  
};

function message(msg) {
  document.getElementById('message').innerHTML = `
  <div class="toast fade show">
  <div class="toast-header">
  <img style="width: 10%;" src="src/images/favicon.ico" class="rounded me-2">
  <strong class="me-auto">Kettra World</strong>
  <small>Agora</small>
  <button type="button" style="box-shadow: none; outline: none;" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
  <b><i class="fas fa-info-circle"></i> informação:</b> ${msg}
  </div>
  </div>`;

  setTimeout(() => {
    document.getElementById('message').innerHTML = "";
  }, 6000);

  return true;
};

function CookieAccepted() {

  $("#cookie").css('animation', 'slideInEnd 1.2s ease forwards');

  Cookies.set('user_cookie', 'authorized', {
    secure: true, sameSite: 'strict', httpOnly: false, expires: 7
  });

  return Cookie();

};

function CookieClose() {

  $("#cookie").css('animation', 'slideInEnd 1.2s ease forwards');

  Cookies.set('user_cookie', 'denied', {
    secure: true, sameSite: 'strict', httpOnly: false, expires: 7
  });

};

function Cookie() {

  $.getJSON("https://api.ipify.org?format=json", (res) => {
    Cookies.set('user_ip',
      res.ip,
      {
        secure: true,
        sameSite: 'strict',
        httpOnly: false,
        expires: 7
      });
  });

  Cookies.set('user_language', navigator.language, {
    secure: true, sameSite: 'strict', httpOnly: false, expires: 7
  });

  Cookies.set('user_browser', navigator.userAgent, {
    secure: true, sameSite: 'strict', httpOnly: false, expires: 7
  });

  Cookies.set('user_platform', navigator.platform, {
    secure: true, sameSite: 'strict', httpOnly: false, expires: 7
  });

  Cookies.set('user_traffic', document.referrer !== '' ? document.referrer: 'direct', {
    secure: true, sameSite: 'strict', httpOnly: false, expires: 7
  });

};

class Particle {
  constructor(x,
    y,
    radius,
    color,
    dx,
    dy,
    duration) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
    this.startTime = Date.now();
    this.duration = duration;
    this.startRadius = radius;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2,
      false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update(ctx) {
    const now = Date.now();
    const elapsedTime = now - this.startTime;
    const progress = Math.min(elapsedTime / this.duration,
      1);

    this.radius = this.startRadius * (1 - progress);

    this.x += this.dx;
    this.y += this.dy;

    this.draw(ctx);
  }

  isVisible() {
    return this.radius > 0.5;
  }
}
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = [];
function $create_particle() {
  const bubbles = 400;

  for (let i = 0; i < bubbles; i++) {
    const radius = Math.random() * 6 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const dx = (Math.random() - 0.5) * 2;
    const dy = (Math.random() - 0.5) * 2;
    const color = `rgba(144, 13, 218, ${Math.random()})`;
    const duration = 10000;

    particles.push(new Particle(x, y, radius, color, dx, dy, duration));
  }
}
function $show_animate() {
  requestAnimationFrame($show_animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    if (particle.isVisible()) {
      particle.update(ctx);
    } else {
      particles.splice(index, 1);
    }
  });
}
function $canvas_effect_purple() {
  $create_particle();
  $show_animate();
}

$(document).ready(() => {

  $("#ip").on('click', () => {
    navigator.clipboard.writeText("play.kettraworld.com").then(() => {
      return message('O ip <b style="color: purple;">play.kettraworld.com</b> foi copiado!');
    });
  });
  $('.level-up-effect').click(() => {
    $(this).prop('disabled', true);
    setTimeout(() => $(this).prop('disabled', false), 5000);
    $('#levelup')[0].play();
    $canvas_effect_purple();
  });
  $.ajax({
    url: 'https://api.minetools.eu/ping/rederevo.com',
    timeout: 10000,
    success: (result) => {
      if (result.error) {
        $('#status').html('<span class="bx bx-ghost"></span> Servidor desligado');
      } else {
        $('#status').html(`<span class="bx bx-cube-alt"></span> ${result.players.online}/${result.players.max} Online`);
      }
    },
    error: (error) => {
      $('#status').html('<span class="bx bx-ghost"></span> Servidor desligado');
    }
  });
  
   let target = 98
   let progress = 0;
   const time = 2000 / target;
   setInterval(() => {
    if (progress < target) {
      progress++;
      $('#progress-bar').css('width', `${progress}%`);
      $('#progress-text').text(`${progress}% completo`);
    };
  }, time);

  $('section').on('pointermove', () => {
   if (Cookies.get('user_cookie') != 'authorized') {
      $("cookie").css('display', 'block');
    };
  });
  
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

});


$('#social.youtube').on('click', () => {
  $('#click')[0].play();
  return window.open('https://youtube.com/@kettraworld', '_blank');
});

$('#social.discord').on('click', () => {
  $('#click')[0].play();
  return window.open('https://discord.com/invite/d3YgZTfZq5', '_blank');
});

$('#social.instagram').on('click', () => {
  $('#click')[0].play();
  return window.open('https://www.instagram.com/kettraworld', '_blank'); 
});

 $('loader').css('display', 'none');
 $('#kettraworld').css('display', 'block');
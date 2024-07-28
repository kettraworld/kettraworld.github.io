if ('serviceWorker' in navigator) {
 navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then((registration) => {
  if (registration.waiting) {
    return registration.waiting.postMessage({ type: 'SKIP_WAITING' });
   } else {
     return registration.update();
   }
 }).catch((err) => {
   console.error('Service Worker: ', err.message);
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
const canvas = $('#canvas')[0];
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = [];

function message(msg) {
  $('#message').html(`
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
    </div>
    `);

  setTimeout(() => {
    $('#message').html('');
  }, 6000);
};
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
function CookieAccepted() {

  $("#cookie").css('animation', 'slideInEnd 1.2s ease forwards');

  Cookies.set('user_cookie', true, {
    secure: true, sameSite: 'strict', httpOnly: false, expires: 7
  });

  return Cookie();

};
function CookieClose() {

  $("#cookie").css('animation', 'slideInEnd 1.2s ease forwards');

  Cookies.set('user_cookie', false, {
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
  
};

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
  
  $('#social.youtube').on('click', () => {
    $('#click')[0].play();
    return window.open('https://youtube.com/@kettraworld', '_blank');
  });

  $('#social.discord').on('click', () => {
    $('#click')[0].play();
    return window.open('https://discord.com/invite/d3YgZTfZq5', '_blank');
  });
  
  $('#social.twitter').on('click', () => {
    $('#click')[0].play();
    return window.open('https://twitter.com/kettraworld', '_blank');
  });

  $('#social.instagram').on('click', () => {
    $('#click')[0].play();
    return window.open('https://www.instagram.com/kettraworld', '_blank');
  });

  axios.get('https://api.minetools.eu/ping/rederevo.com', { timeout: 10000 })
  .then((response) => {
    const result = response.data;
    if (result.error) {
      $('#status').html('<span class="bx bx-ghost"></span> Servidor desligado');
    } else {
      $('#status').html(`<span class="bx bx-cube-alt"></span> ${result.players.online}/${result.players.max} Online`);
    }
  })
  .catch((error) => {
    $('#status').html('<span class="bx bx-ghost"></span> Servidor desligado');
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
   if (!Cookies.get('user_cookie')) {
      return $("cookie").css('display', 'block');
    };
  });

});

setTimeout(() => {
 $('loader').css('display', 'none');
 $('#kettraworld').css('display', 'block');
}, 1000);
const $query = new URLSearchParams(window.location.search);

[...document.querySelectorAll('[data-bs-tog="tooltip"]')].map(x => new bootstrap.Tooltip(x));

 // display message on website
async function message(msg) {
  document.getElementById('message').innerHTML = `
    <div class="toast fade show">
      <div class="toast-header">
        <img style="width: 10%;" src="src/img/favicon.ico" class="rounded me-2">
        <strong class="me-auto">Kettra World</strong>
        <small>Agora</small>
      </div>
      <div class="toast-body">
        <b><i class="fas fa-info-circle"></i> informação:</b> ${msg}
      </div>
    </div>`;
    
  setTimeout(() => {
    document.getElementById('message').innerHTML = "";
  }, 9000);

  return true;
};
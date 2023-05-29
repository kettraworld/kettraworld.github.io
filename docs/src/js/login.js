const query = new URLSearchParams(window.location.search);

if (query.get('erro')) {
  alert(':( Não foi possível realizar o login, verifique se senha/nick estão corretos!');
}

if (Cookies.get('hash')) {
  window.location = '/dashboard/index.html';
}

if (query.get('hash')) {
  Cookies.set('hash', query.get('hash'), { expires: 1 });
  window.location = '/dashboard/index.html';
}


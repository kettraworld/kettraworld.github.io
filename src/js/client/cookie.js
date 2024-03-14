
if (Cookies.get('user_cookie') != 'authorized') {
  setTimeout(() => {
    $("#cookie").css('display', 'block')
  }, 1500);
};

async function CookieAccepted() {
  
  $("#cookie").css('animation', 'slideInEnd 1.2s ease forwards');
  
  Cookies.set('user_cookie', 'authorized', { secure: true, sameSite: 'strict', httpOnly: false, expires: 7 });
  
   await Cookie();
  
};

async function CookieClose() {
  
  $("#cookie").css('animation', 'slideInEnd 1.2s ease forwards');
  
  Cookies.set('user_cookie', 'denied', { secure: true, sameSite: 'strict', httpOnly: false, expires: 7 });
  
};


async function Cookie() {

    $.getJSON("https://api.ipify.org?format=json", (res) => {
        Cookies.set('user_ip', res.ip, { secure: true, sameSite: 'strict', httpOnly: false, expires: 7 });
    });

    Cookies.set('user_language', navigator.language, { secure: true, sameSite: 'strict', httpOnly: false, expires: 7 });

    Cookies.set('user_browser', navigator.userAgent, { secure: true, sameSite: 'strict', httpOnly: false, expires: 7 });

    Cookies.set('user_platform', navigator.platform, { secure: true, sameSite: 'strict', httpOnly: false, expires: 7 });

    Cookies.set('user_traffic', document.referrer !== '' ? document.referrer : 'direct', { secure: true, sameSite: 'strict', httpOnly: false, expires: 7 });

};

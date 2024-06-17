
export async function register(username, token) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>Kettra World</title>
  <style>
    body, table, td, a {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    table, td { 
      mso-table-lspace: 0pt; 
      mso-table-rspace: 0pt; 
      border-collapse: collapse;
    }
    img { 
      -ms-interpolation-mode: bicubic; 
      border: 0; 
      height: auto; 
      line-height: 100%; 
      outline: none; 
      text-decoration: none; 
    }
    body { 
      margin: 0; 
      padding: 0; 
      width: 100%; 
      background-color: #1c1e29; 
    }
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
    }
    @media screen and (max-width: 600px) {
      .img-max, .max-width { width: 100% !important; max-width: 100% !important; height: auto !important; }
      .mobile-wrapper { width: 85% !important; max-width: 85% !important; }
      .mobile-padding { padding-left: 5% !important; padding-right: 5% !important; }
    }
    .header {
      padding: 20px 0;
    }
    .content {
      padding: 20px;
      color: #ffffff;
      background-color: #272a36;
      text-align: left;
    }
    .footer {
      padding: 20px;
      color: #999999;
      font-size: 12px;
    }
    h1 {
      font-size: 24px;
      font-weight: bold;
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    p {
      margin: 10px 0;
      font-size: 14px;
      line-height: 20px;
    }
  </style>
</head>
<body>
  <center>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center">
          <table border="0" cellpadding="0" cellspacing="0" width="600" class="mobile-wrapper">
            <tr>
              <td align="center" class="header">
                <img src="https://kettraworld.github.io/src/img/favicon.ico" width="100" height="50" alt="Logo do Kettra World">
              </td>
            </tr>


<tr>
  <td align="center" class="content">
    <h1>Bem-vindo a Kettra World</h1>
    <p>Olá, <b>${username}</b>.</p>
    <p>• Registre o seu nickname do minecraft <a href="https://kettraworld.github.io/?register=${token}" style="color: #8a2be2;">aqui</a>
    </p>
  </td>
</tr>
            <tr>
              <td align="center" class="footer">
                <p>© 2024 Kettra World</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>

  `
}

 // get discord user token 
async function oauth2(hash) {
 const response = await fetch('https://discord.com/api/oauth2/token', {
  method: 'POST',
  body: new URLSearchParams({
      client_id: '993546761991884911',
      client_secret: 'HEMd4cMnPerZ2mX1PV_UPnplSy7Lm6wo',
      code: hash,
      grant_type: 'authorization_code',
      redirect_uri: `http://localhost:8158/callback.html`,
      scope: [],
    }).toString(),
  headers: {
   'Content-Type': 'application/x-www-form-urlencoded',
  }
 });
 return await response.json();
};
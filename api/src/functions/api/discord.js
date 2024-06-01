
// get discord user token
export async function $auth2(hash) {
  const response = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: '993546761991884911',
      client_secret: 'HEMd4cMnPerZ2mX1PV_UPnplSy7Lm6wo',
      code: hash,
      grant_type: 'authorization_code',
      redirect_uri: `http://0.0.0.0:8080/auth2/discord`,
      scope: [],
    }).toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
  return await response.json();
};

export async function $user(token) {
  const response = await fetch('https://discord.com/api/v10/users/@me', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'authorization': token
    }
  });
    return await response.json();
};

export async function $guild(token) {
  const response = await fetch('https://discord.com/api/v10/users/@me/guilds/893997835412971570/member', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'authorization': token
    }
  });
    return await response.json();
};

export async function $guilds(token) {
  const response = await fetch(`https://discord.com/api/v10/users/@me/guilds`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'authorization': token
    }
  });
    return await response.json();
};

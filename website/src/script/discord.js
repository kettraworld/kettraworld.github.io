import config from '@default';
import { request } from 'undici';

export async function auth2_discord(hash) {
 const response = await request('https://discord.com/api/oauth2/token', {
    method: 'POST',
		body: new URLSearchParams({
		  client_id: config.DISCORD.client_id,
			client_secret: config.DISCORD.client_secret,
			code: hash,
			grant_type: 'authorization_code',
			redirect_uri: `http://129.148.43.196:8080/api/auth2/discord`,
		  scope: [],
	  }).toString(),
	  headers: {
	   'Content-Type': 'application/x-www-form-urlencoded',
   }
  });
 const res = await response.body.json();
 return res;
};
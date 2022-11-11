import fs from 'fs';
import fetch from 'node-fetch';
import queryString from 'query-string';

export default async function getSpotifyAuth(credentials) {
	const params = {
		client_id: encodeURIComponent(credentials.client_id),
		redirect_uri: encodeURIComponent('http://localhost/data/'),
		scope: encodeURIComponent('user-read-private user-read-email'),
	};
	const queries = queryString.stringify(params);
	const url = 'https://accounts.spotify.com/authorize?' + queries;

	const response = await fetch(url).then((res) => res);

	throw console.log(response);

	return await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		body: new URLSearchParams({
			grant_type: 'client_credentials',
		}),
		headers: {
			Authorization:
				'Basic ' +
				Buffer.from(
					credentials.client_id + ':' + credentials.client_secret
				).toString('base64'),
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
		.then(async (res) => {
			const token = (await res.json()).access_token;
			credentials.token = token;
			fs.writeFileSync('./credentials.json', JSON.stringify(credentials));
			return token;
		})
		.catch((err) => console.log(err));
}

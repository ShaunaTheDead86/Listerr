import Bottleneck from 'bottleneck';
import fetch from 'node-fetch';
import fs from 'fs';
import getSpotifyAuth from './getSpotifyAuth.js';
import queryString from 'query-string';

const limiter = new Bottleneck({
	reservoir: 250,
	reservoirRefreshAmount: 250,
	reservoirRefreshInterval: 25 * 250,

	maxConcurrent: 50,
	minTime: 0,
});
const credentials = fs.existsSync('./credentials.json')
	? JSON.parse(fs.readFileSync('./credentials.json'))
	: {
			client_id: '96ddc86f439d4681a6f3a95fe5ca9b19',
			client_secret: '557d9b3be23e4a3a84c054d8020f9393',
	  };
credentials.token = await getSpotifyAuth(credentials);
const api_url = 'https://api.spotify.com/v1/';

async function renewToken(credentials) {
	return await getSpotifyAuth(credentials);
}

async function getSeeds(options) {
	const query_string = queryString.stringify(options);
	const any_options = query_string !== '' ? '?' : '';
	const query_url = api_url + 'recommendations' + any_options + query_string;
	const fetch_options = {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + credentials.token,
			'Content-Type': 'application/json',
		},
	};

	return await fetch(query_url, fetch_options)
		.then((res) => res.json())
		.catch((err) => console.log(err));
}

async function getUserTracks(options) {
	const query_url = api_url + 'me/tracks';
	const fetch_options = {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + credentials.token,
			'Content-Type': 'application/json',
		},
	};
	console.log('token: ', credentials, fetch_options);

	return await fetch(query_url, fetch_options)
		.then((res) => {
			if (res.error && res.error.status === 401) {
			}

			return res.json();
		})
		.catch((err) => console.log(err));
}

console.log(await getUserTracks({ market: 'ES' }));

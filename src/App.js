import './App.css';
import { useEffect, useState } from 'react';
import helpers from './helpers/helpers.js';
import spotifyApi from './helpers/spotifyApi.js';

export default function App() {
	const CLIENT_ID = '96ddc86f439d4681a6f3a95fe5ca9b19';
	// eslint-disable-next-line
	const CLIENT_SECRET = '557d9b3be23e4a3a84c054d8020f9393';
	const REDIRECT_URI = 'http://localhost:3000';
	const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
	const RESPONSE_TYPE = 'token';

	const [state, setState] = useState({
		set: (key, value) => setState((prev) => ({ ...prev, [key]: value })),
		helpers,
		spotifyApi,
		token: '',
		searchKey: '',
		artists: [],
	});

	useEffect(() => {
		state.spotifyApi.login(state);
		// eslint-disable-next-line
	}, []);

	// console.log('before render: ', state);

	return (
		<div className="App">
			<h1>Spotify React</h1>
			{!state.token ? (
				<a
					href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
				>
					Login to Spotify
				</a>
			) : (
				<button onClick={() => state.spotifyApi.logout(state)}>Logout</button>
			)}
			<br />
			<br />
			<div>Search Artists: </div>
			<div>
				<form
					onSubmit={async (e) => await state.helpers.searchArtists(state, e)}
				>
					<input
						type="text"
						onChange={(e) => state.set('searchKey', e.target.value)}
					/>
					<button type={'submit'}>Search</button>
				</form>
				{state.artists.length > 0 && state.helpers.renderArtists(state.artists)}
			</div>
		</div>
	);
}

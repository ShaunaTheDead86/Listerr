import { useEffect, useState } from 'react';
import { spotifyAuth, searchForm } from './components';
import { spotify, helpers } from './helpers';
import './App.css';

export default function App() {
	const [state, setState] = useState({
		set: (key, value) => setState((prev) => ({ ...prev, [key]: value })),
		CLIENT_SECRET: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
		CLIENT_ID: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
		helpers,
		searchKey: '',
		searchResults: '',
		spotify: undefined,
		token: undefined,
		search: {
			limit: 100,
			seed_artists: [],
			seed_genres: [],
			seed_tracks: [],
			type: 'artist',
			input: '',
		},
	});

	useEffect(() => {
		state.set('spotify', spotify());
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (state.spotify) state.spotify.login(state);
		// eslint-disable-next-line
	}, [state.spotify]);

	// console.log('state before render: ', state);

	return (
		<div className="App">
			<br />
			<br />
			{spotifyAuth(state)}
			<br />
			<br />
			{state.token && searchForm(state)}
			<br />
		</div>
	);
}

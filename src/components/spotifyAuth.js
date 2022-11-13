import React from 'react';

export default function spotifyAuth(state) {
	const REDIRECT_URI = 'http://localhost:3000';
	const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
	const RESPONSE_TYPE = 'token';

	return (
		<div>
			{!state.token ? (
				<a
					href={`${AUTH_ENDPOINT}?client_id=${state.CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
				>
					Login to Spotify
				</a>
			) : (
				<button onClick={() => state.spotify.logout(state)}>
					Logout of Spotify
				</button>
			)}
		</div>
	);
}

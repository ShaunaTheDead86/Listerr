import axios from 'axios';

const helpers = {
	login: (state) => {
		const hash = window.location.hash;
		const stored_token = window.localStorage.getItem('token');

		if (!stored_token && hash) {
			const hash_token = hash
				.substring(1)
				.split('&')
				.find((elem) => elem.startsWith('access_token'))
				.split('=')[1];
			window.localStorage.setItem('token', hash_token);
			return state.set('token', hash_token);
		}

		return state.set('token', stored_token);
	},
	logout: (state) => {
		state.set('token', '');
		window.localStorage.removeItem('token');
	},
	addSpaces: (num) => {
		num--;
		return <br /> + num > 0 ? this.addSpaces(num) : '';
	},
	searchArtists: async (state, e) => {
		console.log('searchArtists: ', state);
		e.preventDefault();
		const { data } = await axios.get('https://api.spotify.com/v1/search', {
			headers: {
				Authorization: `Bearer ${state.token}`,
			},
			params: {
				q: state.searchKey,
				type: 'artist',
			},
		});

		state.set('artists', data.artists.items);
	},
	renderArtists: (artists) => {
		console.log('renderArtists: ', artists);
		return artists.map((artist) => (
			<div key={artist.id}>
				<br />
				<br />
				{artist.images.length ? (
					<img width={'100px'} src={artist.images[0].url} alt="" />
				) : (
					<div>No Image</div>
				)}
				<br />
				<br />
				{artist.name}
				<br />
			</div>
		));
	},
};

export default helpers;

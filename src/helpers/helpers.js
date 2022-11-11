import axios from 'axios';

const helpers = {
	addSpaces: (num) => {
		num--;
		return <br /> + num > 0 ? this.addSpaces(num) : '';
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

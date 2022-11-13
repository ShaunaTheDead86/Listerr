const helpers = {
	addSpaces: (num) => {
		num--;
		return <br /> + num > 0 ? this.addSpaces(num) : '';
	},
	renderSearchResults: (searchResults) => {
		console.log('renderSearchResults: ', searchResults);
		return (
			<table>
				<thead>
					<tr>
						<td></td>
						<td>Track</td>
						<td>Artist</td>
						<td>Spotify ID</td>
					</tr>
				</thead>
				<tbody>
					{searchResults.tracks.map((track, i) => (
						<tr key={i + 1}>
							<td>{`${i + 1}`}</td>
							<td>{track.name}</td>
							<td>{track.album.artists[0].name}</td>
							<td>{track.id}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	},
	getArtistRadio: (artist) => {
		// get top tracks
		// get related artists
		// get related artists top tracks
	},
};

export default helpers;

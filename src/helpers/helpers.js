const helpers = {
	addSpaces: (num) => {
		num--;
		return <br /> + num > 0 ? this.addSpaces(num) : '';
	},
	renderSearchResults: (searchResults) => {
		console.log('renderArtists: ', searchResults);
		return searchResults.map((result) => (
			<div key={result.id}>
				<br />
				<br />
				{result.images.length ? (
					<img width={'100px'} src={result.images[0].url} alt="" />
				) : (
					<div>No Image</div>
				)}
				<br />
				<br />
				{result.name}
				<br />
			</div>
		));
	},
};

export default helpers;

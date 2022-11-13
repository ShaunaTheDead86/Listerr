export default function SearchForm(state) {
	const setSearch = (key, value) =>
		state.set('search', {
			...state.search,
			[key]:
				typeof value === 'object' || key === 'seed_genres'
					? [...state.search[key], value]
					: value,
		});
	const getAllSeeds = () => [
		...state.search.seed_artists,
		...state.search.seed_genres,
		...state.search.seed_tracks,
	];

	const inputRadio = (id) => {
		return (
			<div>
				<label htmlFor={id}>{`${id[0].toUpperCase() + id.slice(1)}s: `}</label>
				<input
					type="radio"
					name="seed"
					id={id}
					onClick={() => setSearch('type', id)}
					defaultChecked={state.search.type === id ? true : false}
				/>
			</div>
		);
	};

	const inputBox = () => {
		return (
			<div>
				<br />
				<div>
					<label htmlFor="input">{`Search for ${state.search.type}s: `}</label>
				</div>
				<br />
				<div>
					<input
						id="input"
						type="text"
						value={state.search.input}
						onChange={(e) => setSearch('input', e.target.value)}
					/>
				</div>
				<br />
				<div>
					<button
						onClick={async (e) => {
							e.preventDefault();
							if (getAllSeeds().length < 5) {
								if (state.search.type === 'genre') {
									console.log();
									state.search.seed_genres.push(state.search.input);
									return setSearch('input', '');
								}

								const searchResult = (
									await state.spotify.api.search(state, {
										params: { q: state.search.input, type: state.search.type },
									})
								)[0];

								console.log('searchResult: ', searchResult);
								if (state.search.type === 'artist')
									state.search.seed_artists.push(searchResult);
								if (state.search.type === 'track')
									state.search.seed_tracks.push(searchResult);
								console.log('state.search: ', state.search);
								setSearch('input', '');
							}
						}}
					>{`Add ${state.search.type}`}</button>
				</div>
				<br />
			</div>
		);
	};

	const inputSlider = (label, id) => {
		return (
			<div>
				<br />
				<div>
					<label htmlFor={id}>{label}</label>
				</div>
				<br />
				<div>
					<input
						type="range"
						min="1"
						max="100"
						value={state.search.limit}
						id={id}
						onChange={(e) => setSearch('limit', e.target.value)}
					/>
					<div>
						<label htmlFor={id}>{state.search.limit}</label>
					</div>
				</div>
				<br />
			</div>
		);
	};

	return (
		<div>
			<div>Enter between 1 and 5 seeds of any type below</div>
			<br />
			<div>
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						state.set(
							'searchResults',
							await state.spotify.api.tracks.getRecommendations(state, {
								params: {
									seed_artists: state.search.seed_artists
										.map((e) => e.id)
										.join(','),
									seed_genres: state.search.seed_genres.join(','),
									seed_tracks: state.search.seed_tracks
										.map((e) => e.id)
										.join(','),
									limit: state.search.limit,
								},
							})
						);
					}}
				>
					<div>
						<div>
							{inputRadio('artist')}
							{inputRadio('genre')}
							{inputRadio('track')}
						</div>
						<div>{inputBox()}</div>
						<div>
							{inputSlider('How many tracks to return (1 - 100): ', 'limit')}
						</div>
					</div>
					<div>
						{getAllSeeds().length > 0
							? `Your currently selected seeds are: ${getAllSeeds()
									.map((e) =>
										typeof e === 'object'
											? e.name
											: e[0].toUpperCase() + e.slice(1)
									)
									.join(', ')}`
							: ''}
					</div>
					<br />
					<div>
						<button type={'submit'}>Search</button>
					</div>
				</form>
				{state.searchResults &&
					state.helpers.renderSearchResults(state.searchResults)}
			</div>
		</div>
	);
}

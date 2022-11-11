export default spotifyApi = {
	auth: {
		client_id: '96ddc86f439d4681a6f3a95fe5ca9b19',
		client_secret: '557d9b3be23e4a3a84c054d8020f9393',
		access_token: '',
	},
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
	fetch: async (end_point = '', options = {}) => {
		const { data } = await axios.get('https://api.spotify.com/v1' + end_point, {
			headers: {
				Authorization: `Bearer ${this.auth.access_token}`,
			},
			...options,
		});

		return data;
	},
	albums: {
		getAlbum: (album_id, params) => {
			// GET /albums/{album_id}, params: { market }
			this.fetch(`/albums/${album_id}`, { method: 'GET', params });
		},
		getAlbums: (params) => {
			// GET /albums, params: { ids, market }
			this.fetch('/albums/', { method: 'GET', params });
		},
		getAlbumTracks: (album_id, params) => {
			// GET /albums/{album_id}/tracks, params: { limit, market, offset }
			this.fetch(`/albums/${album_id}/tracks`, {
				method: 'GET',
				params,
			});
		},
		getMyAlbums: (params) => {
			// GET /me/albums, params: { limit, market, offset }
			this.fetch('/me/albums/', { method: 'GET', params });
		},
		updateUserAlbums: (params, body) => {
			// PUT /me/albums, params (required): { ids }, body (application/json): { ids }
			this.fetch('/me/albums/', { method: 'PUT', params, body });
		},
		deleteUserAlbums: (params, body) => {
			// DELETE /me/albums, params (required): { ids }, body (application/json): { ids }
			this.fetch('/me/albums/', { method: 'DELETE', params, body });
		},
		checkUserAlbums: (params) => {
			// GET /me/albums/contains, params: { ids }
			this.fetch('/me/albums/contains', { method: 'PUT', params });
		},
		getNewReleases: (params) => {
			// GET /browse/new-releases, params: { country, limit, offset }
			this.fetch('/browse/new-releases', { method: 'GET', params });
		},
	},
	artists: {
		getArtist: (artist_id) => {
			// GET /artists/{artist_id}
			this.fetch(`/artists/${artist_id}`);
		},
		getArtists: (params) => {
			// GET /artists, params: { ids }
			this.fetch('/artists/', { method: 'GET', params });
		},
		getArtistAlbums: (artist_id, params) => {
			// GET /artists/{artist_id}/albums, params: { include_groups, limit, market, offset }
			this.fetch(`/artists/${artist_id}/albums`, { method: 'GET', params });
		},
		getArtistTopTracks: (artist_id, params) => {
			// GET /artists/{artist_id}/top-tracks, params: { market }
			this.fetch(`/artists/${artist_id}/top-tracks`, { method: 'GET', params });
		},
		getArtistRelatedArtists: (artist_id) => {
			// GET /artists/{artist_id}/related-artists
			this.fetch(`/artists/${artist_id}/related-artists`);
		},
	},
	shows: {
		getShow: (show_id, params) => {
			// GET /shows/{show_id}, params: { market }
			this.fetch(`/shows/${show_id}`, { method: 'GET', params });
		},
		getShows: (params) => {
			// GET /shows, params: { ids, market }
			this.fetch(`/shows`, { method: 'GET', params });
		},
		getShowEpisodes: (show_id) => {
			// GET /shows/{show_id}/episodes, params: { limit, market, offset }
			this.fetch(`/shows/${show_id}/episodes`, { method: 'GET', params });
		},
		getUserShows: (params) => {
			// GET /me/shows, params: { limit, offset }
			this.fetch(`/me/shows`, { method: 'GET', params });
		},
		updateUserShows: (params) => {
			// PUT /me/shows, params: { ids }
			this.fetch(`/me/shows`, { method: 'PUT', params });
		},
		deleteUserShows: (params) => {
			// DELETE /me/shows, params: { ids, market }
			this.fetch(`/me/shows`, { method: 'DELETE', params });
		},
		checkUserShows: (params) => {
			// GET /me/shows/contains, params: { ids }
			this.fetch(`/me/shows/contains`, { method: 'GET', params });
		},
	},
	episodes: {
		getEpisode: (episode_id, params) => {
			// GET /episodes/{episode_id}, params: { market }
			this.fetch(`/episodes/${episode_id}`, { method: 'GET', params });
		},
		getEpisodes: (params) => {
			// GET /episodes, params: { ids, market }
			this.fetch(`/episodes`, { method: 'GET', params });
		},
		getUserShows: (params) => {
			// GET /me/episodes, params: { limit, market, offset }
			this.fetch(`/me/episodes`, { method: 'GET', params });
		},
		updateUserShows: (params, body) => {
			// PUT /me/episodes, params: { ids }, body: { ids }
			this.fetch(`/me/episodes`, { method: 'PUT', params, body });
		},
		deleteUserShows: (params, body) => {
			// DELETE /me/episodes, params: { ids }, body: { ids }
			this.fetch(`/me/episodes`, { method: 'DELETE', params, body });
		},
		checkUserShows: (params) => {
			// GET /me/episodes/contains, params: { ids }
			this.fetch(`/me/episodes/contains`, { method: 'GET', params });
		},
	},
	audiobooks: {
		getAudiobook: (audiobook_id, params) => {
			// GET /audiobooks/{audiobook_id}, params: market
			this.fetch(`/audiobooks/${audiobook_id}`, { method: 'GET', params });
		},
		getAudiobooks: (params) => {
			// GET /audiobooks, params: ids, market
			this.fetch(`/audiobooks`, { method: 'GET', params });
		},
		getAudiobookChapters: (audiobook_id, params) => {
			// GET /audiobooks/{audiobook_id}/chapters, params: limit, market, offset
			this.fetch(`/audiobooks/${audiobook_id}/chapters`, {
				method: 'GET',
				params,
			});
		},
		getUserAudiobooks: (params) => {
			// GET /me/audiobooks, params: limit, offset
			this.fetch(`/me/audiobooks`, {
				method: 'GET',
				params,
			});
		},
		updateUserAudiobooks: (params) => {
			// PUT /me/audiobooks, params: ids
			this.fetch(`/me/audiobooks`, {
				method: 'PUT',
				params,
			});
		},
		deleteUserAudiobooks: (params) => {
			// DELETE /me/audiobooks, params: ids
			this.fetch(`/me/audiobooks`, {
				method: 'DELETE',
				params,
			});
		},
		checkUserAudiobooks: (params) => {
			// GET /me/audiobooks/contains, params: ids
			this.fetch(`/me/audiobooks/contains`, {
				method: 'GET',
				params,
			});
		},
	},
	chapters: {
		getChapter: (chapter_id, params) => {
			// GET /chapters/{chapter_id}
			this.fetch(`/chapters/${chapter_id}`, {
				method: 'GET',
				params,
			});
		},
		getChapters: (params) => {
			// GET /chapters
			this.fetch(`/chapters`, {
				method: 'GET',
				params,
			});
		},
	},
	tracks: {
		getTrack: (track_id, params) => {
			// GET /tracks/{track_id}, params: { market: str }
			this.fetch(`/tracks/${track_id}`, {
				method: 'GET',
				params,
			});
		},
		getTracks: (params) => {
			// GET /tracks, params: { ids: str[], market: str }
			this.fetch(`/tracks`, {
				method: 'GET',
				params,
			});
		},
		getUserTracks: (params) => {
			// GET /me/tracks, params: { limit: str, market: str, offset: int }
			this.fetch(`/me/tracks`, {
				method: 'GET',
				params,
			});
		},
		updateUserTracks: (params, body) => {
			// PUT /me/tracks, params: { ids: ...str[] }, body: { ids: str[] }
			this.fetch(`/me/tracks`, {
				method: 'PUT',
				params,
				body,
			});
		},
		deleteUserTracks: (params, body) => {
			// DELETE /me/tracks, params: { ids: ...str[] }, body: { ids: str[] }
			this.fetch(`/me/tracks`, {
				method: 'DELETE',
				params,
				body,
			});
		},
		checkUserTracks: (params) => {
			// GET /me/tracks/contains, params: { ids: ...str[] }
			this.fetch(`/me/tracks/contains`, {
				method: 'GET',
				params,
			});
		},
		getTrackAudioFeatures: (params) => {
			// GET /audio-features, params: { ids: ...str[] }
			this.fetch(`/audio-features`, {
				method: 'GET',
				params,
			});
		},
		getTracksAudioFeatures: (track_id, params) => {
			// GET /audio-features/{track_id}
			this.fetch(`/audio-features/${track_id}`, {
				method: 'GET',
				params,
			});
		},
		getTracksAudioAnalysis: (track_id, params) => {
			// GET /audio-analysis/{track_id}
			this.fetch(`/audio-analysis/${track_id}`, {
				method: 'GET',
				params,
			});
		},
		getRecommendations: (params) => {
			// GET /recommendations, params: { seed_artists: ...str[], seed_genres: ...str[], seed_tracks: ...str[], limit: int, market: str, max_accousticness: int, max_danceability: int, max_duration_ms: int, max_energy: int, max_intrumentalness: int, max_key: int, max_liveness: num, max_loudness: num, max_mode: int, max_popularity: int, max_speechiness: num, max_tempo: num, max_time_signature: int, max_valence: num, min_acousticness: num, min_danceability: num, min_duration_ms: int, min_enegry: num, min_instrumentalness: num, min_key: int, min_liveness: num, min_loudness: num, min_mode: int, min_popularity: int, }
			this.fetch(`/recommendations`, {
				method: 'GET',
				params,
			});
		},
	},
	search: (params) => {
		// GET /search, params: trackDetails: {...trackDetails}
		this.fetch(`/search`, {
			method: 'GET',
			params,
		});
	},
	users: {
		getUser: () => {
			// GET /me
			this.fetch(`/me`, {
				method: 'GET',
			});
		},
		getUserTopTracks: (params) => {
			// GET /me/top/tracks, params: { limit, offset, time_range }
			this.fetch(`/me/top/tracks`, {
				method: 'GET',
				params,
			});
		},
		getUserTopArtists: (params) => {
			// GET /me/top/artists, params: { limit, offset, time_range }
			this.fetch(`/me/top/artists`, {
				method: 'GET',
				params,
			});
		},
		getUserProfile: (user_id) => {
			// GET /users/{user_id}
			this.fetch(`/users/${user_id}`, {
				method: 'GET',
				params,
			});
		},
		followPlaylist: (playlist_id, body) => {
			// PUT /playlists/{playlist_id}/followers, body: { public }
			this.fetch(`/playlists/${playlist_id}/followers`, {
				method: 'PUT',
				body,
			});
		},
		unfollowPlaylist: (playlist_id) => {
			// DELETE /playlists/{playlist_id/followers
			this.fetch(`/playlists/${playlist_id}/followers`, {
				method: 'DELETE',
			});
		},
		getUserFollowedArtists: (params) => {
			// GET /me/following, params: { type, after, limit }
			this.fetch(`/me/following`, {
				method: 'GET',
				params,
			});
		},
		updateMyFollowedArtists: (params, body) => {
			// PUT /me/following, params: { ids, type }, body: { ids }
			this.fetch(`/me/following`, {
				method: 'PUT',
				params,
				body,
			});
		},
		deleteMyFollowedArtists: (params, body) => {
			// DELETE /me/following, params: { ids, type }, body: { ids }
			this.fetch(`/me/following`, {
				method: 'DELETE',
				params,
				body,
			});
		},
		checkMyFollowedUsersOrArtists: (params) => {
			// GET /me/following/contains, params: { ids, type }
			this.fetch(`/me/following/contains`, {
				method: 'GET',
				params,
			});
		},
		checkMyFollowPlaylistState: (playlist_id, params) => {
			// GET /playlists/{playlist_id}/followers/contains, params: { ids }
			this.fetch(`/playlists/${playlist_id}/followers/contains`, {
				method: 'GET',
				params,
			});
		},
	},
	playlists: {
		getPlaylist: (playlist_id, params) => {
			// GET /playlists/{playlist_id}, params: { additional_types, fields, market }
			this.fetch(`/playlists/${playlist_id}`, {
				method: 'GET',
				params,
			});
		},
		updateDetails: (playlist_id, body) => {
			// PUT /playlists/{playlist_id}, body: { playlistName, isPublic, collaborative, description }
			this.fetch(`/playlists/${playlist_id}`, {
				method: 'PUT',
				body,
			});
		},
		getTracks: (playlist_id, params) => {
			// GET /playlists/{playlist_id}/tracks, params: { additional_types, fields, limit, market, offset }
			this.fetch(`/playlists/${playlist_id}/tracks`, {
				method: 'GET',
				params,
			});
		},
		postTracks: (playlist_id, params, body) => {
			// POST /playlists/{playlist_id}/tracks, params: { position, uris }, body: { uris, position }
			this.fetch(`/playlists/${playlist_id}/tracks`, {
				method: 'POST',
				params,
				body,
			});
		},
		updateTracks: (playlist_id, params, body) => {
			// PUT /playlists/{playlist_id}/tracks, params: { uris }, body: { uris, range_str, insert_before, range_length, snapshot_id }
			this.fetch(`/playlists/${playlist_id}/tracks`, {
				method: 'PUT',
				params,
				body,
			});
		},
		deleteTracks: (playlist_id, body) => {
			// DELETE /playlists/{playlist_id}/tracks, body: { tracks: [ ... { uri }], snapshot_id }
			this.fetch(`/playlists/${playlist_id}/tracks`, {
				method: 'DELETE',
				body,
			});
		},
		getMyPlaylists: (params) => {
			// GET /me/playlists, params: { limit, offset }
			this.fetch(`/me/playlists`, {
				method: 'GET',
				params,
			});
		},
		getUserPlaylists: (user_id, params) => {
			// GET /users/{user_id}/playlists, params: { limit, offset }
			this.fetch(`/users/${user_id}/playlists`, {
				method: 'GET',
				params,
			});
		},
		postNewPlaylist: (user_id, body) => {
			// POST /users/{user_id}/playlists, body: { playlistName, isPublic, collaborative, description }
			this.fetch(`/users/${user_id}/playlists`, {
				method: 'POST',
				body,
			});
		},
		getFeatured: (params) => {
			// GET /browse/featured-playlists, params: { country, limit, locale, offset, timestamp }
			this.fetch(`/browse/featured-playlists`, {
				method: 'GET',
				params,
			});
		},
		getByCategory: (category_id, params) => {
			// GET /browse/categories/{category_id}/playlists, params: { country, limit, offset }
			this.fetch(`/browse/categories/${category_id}/playlists`, {
				method: 'GET',
				params,
			});
		},
		getCoverImage: (playlist_id) => {
			// GET /playlists/{playlist_id}/images
			this.fetch(`/playlists/${playlist_id}/images`, {
				method: 'GET',
			});
		},
		updateCoverImage: (playlist_id) => {
			// PUT /playlists/{playlist_id}/images
			this.fetch(`/playlists/${playlist_id}/images`, {
				method: 'PUT',
			});
		},
	},
	categories: {
		getMany: (params) => {
			// GET /browse/categories, params: { country, limit, locale, offset }
			this.fetch(`/browse/categories`, {
				method: 'GET',
				params,
			});
		},
		getOne: (category_id, params) => {
			// GET /browse/categories/{category_id}, params: { country, locale }
			this.fetch(`/browse/categories/${category_id}`, {
				method: 'GET',
				params,
			});
		},
	},
	genres: {
		getSeeds: () => {
			// GET /recommendations/available-genre-seeds
			this.fetch(`/recommendations/available-genre-seeds`, {
				method: 'GET',
			});
		},
	},
	player: {
		getPlayback: (params) => {
			// GET /me/player, params: { additional_types, market }
			this.fetch(`/me/player`, {
				method: 'GET',
				params,
			});
		},
		updateCurrentDevice: (body) => {
			// PUT /me/player, body: { device_ids, play }
			this.fetch(`/me/player`, {
				method: 'PUT',
				body,
			});
		},
		getDevices: () => {
			// GET /me/player/devices
			this.fetch(`/me/player/devices`, {
				method: 'GET',
			});
		},
		getCurrentTrack: (params) => {
			// GET /me/player/current-playing, params: { additional_types, market }
			this.fetch(`/me/player/currently-playing`, {
				method: 'GET',
				params,
			});
		},
		updatePlaying: (params, body) => {
			// PUT /me/player/play, params: device_id, body: { context_url, uris, offset, position_ms }
			this.fetch(`/me/player/play`, {
				method: 'PUT',
				params,
				body,
			});
		},
		updatePaused: (params) => {
			// PUT /me/player/pause, params: { device_id }
			this.fetch(`/me/player/pause`, {
				method: 'PUT',
				params,
			});
		},
		postNextTrack: (params) => {
			// POST /me/player/next, params: { device_id }
			this.fetch(`/me/player/next`, {
				method: 'POST',
				params,
			});
		},
		postPreviousTrack: (params) => {
			// POST /me/player/previous, params: { device_id }
			this.fetch(`/me/player/previous`, {
				method: 'POST',
				params,
			});
		},
		updatePosition: (params) => {
			// PUT /me/player/seek, params: { position_ms, device_id }
			this.fetch(`/me/player/seek`, {
				method: 'PUT',
				params,
			});
		},
		updateRepeat: (params) => {
			// PUT /me/player/repeat, params: { state, device_id }
			this.fetch(`/me/player/repeat`, {
				method: 'PUT',
				params,
			});
		},
		updateVolume: (params) => {
			// PUT /me/player/volume, params: { volume_percent, device_id }
			this.fetch(`/me/player/volume`, {
				method: 'PUT',
				params,
			});
		},
		updateShuffle: (params) => {
			// PUT /me/player/shuffle, params: { state, device_id }
			this.fetch(`/me/player/shuffle`, {
				method: 'PUT',
				params,
			});
		},
		getRecentTracks: (params) => {
			// GET /me/player/recently-played, params: { after, before, limit }
			this.fetch(`/me/player/recently-played`, {
				method: 'GET',
				params,
			});
		},
		getQueue: () => {
			// GET /me/player/queue
			this.fetch(`/me/player/queue`, {
				method: 'GET',
			});
		},
		postAddTrack: (params) => {
			// POST /me/player/queue, params: { uri, device_id }
			this.fetch(`/me/player/volume`, {
				method: 'POST',
				params,
			});
		},
	},
	markets: {
		getMarkets: () => {
			// GET /markets
			this.fetch(`/markets`, {
				method: 'GET',
			});
		},
	},
};

// params: {
// 	body: {
// 		collaborative, // bool
// 		description, // str
// 		device_ids, // ...str[]
// 		ids, // ...str[]
// 		insert_before, // int
// 		isPublic, // bool
// 		play, // bool
// 		playlistName, // str
// 		position, // int
// 		range_length, // int
// 		range_start, // int
// 		snapshot_id, // str?
// 		tracks, // obj[]
// 		uris, // str[]
// 	},
// 	params: {
// 		after, // str
// 		collaborate, // bool
// 		description, // str
// 		additional_types, // str
// 		after, // int
// 		before, // int
// 		context_url, // str
// 		country, // str
// 		device_id, // str
// 		fields, // str
// 		ids, // ...str[]
// 		isPublic, // bool
// 		limit, // int
// 		locale, // str
// 		market, // str
// 		offset, // obj
// 		playlistName, // str
// 		position, // int
// 		position_ms, // int
// 		repeatState, // str
// 		shuffleState, // bool
// 		time_range, // str
// 		type, // str
// 		uris, // str[]
// 		volume_percent, // int
// 		uri, // str
// 		market, // str
// 		seed: {
// 			artists,
// 			genres,
// 			tracks,
// 		},
// 		max: {
// 			acousticness,
// 			danceability,
// 			duration_ms,
// 			energy,
// 			instrumentalness,
// 			key,
// 			loudness,
// 			mode,
// 			popularity,
// 			speechiness,
// 			tempo,
// 			time_signature,
// 			valence,
// 		},
// 		min: {
// 			acousticness,
// 			danceability,
// 			duration_ms,
// 			energy,
// 			instrumentalness,
// 			key,
// 			loudness,
// 			mode,
// 			popularity,
// 			speechiness,
// 			tempo,
// 			time_signature,
// 			valence,
// 		},
// 		target: {
// 			acousticness,
// 			danceability,
// 			duration_ms,
// 			energy,
// 			instrumentalness,
// 			key,
// 			loudness,
// 			mode,
// 			popularity,
// 			speechiness,
// 			tempo,
// 			time_signature,
// 			valence,
// 		},
// 	},
// },

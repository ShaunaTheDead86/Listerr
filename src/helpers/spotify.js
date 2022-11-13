import axios from 'axios';

export default function Spotify() {
	const login = (state) => {
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
			// return hash_token;
		}
		return state.set('token', stored_token);
		// return stored_token;
	};

	const logout = (state) => {
		state.set('token', undefined);
		window.localStorage.removeItem('token');
	};

	const fetch = async (state, end_point = '', params = {}) => {
		console.log('fetch: ', state, end_point, params);
		const axios_options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${state.token}`,
				'Content-Type': 'application/json',
			},
			...params,
		};
		console.log('options: ', axios_options);
		return await axios
			.get('https://api.spotify.com/v1' + end_point, axios_options)
			.then((res) => {
				console.log('fetch results: ', res.data);
				return res.data;
			})
			.catch((err) => {
				if (err.response.data.error.status === 401) {
					logout(state);
					login(state);
					if (state.token)
						return async () => await fetch(state, end_point, params);
				}
				console.log('Error in fetch: ', err);
			});
	};

	const api = {
		albums: {
			params: {
				country: '',
				ids: ['', ''], // ...['', '']
				limit: 0,
				market: '',
				offset: 0,
			},
			body: {
				ids: [''], // ['']
			},
			getAlbum: async (state, album_id, axios_options) => {
				// GET /albums/{album_id}, params: { market }
				return await fetch(state, `/albums/${album_id}`, axios_options);
			},
			getAlbums: async (state, axios_options) => {
				// GET /albums, params: { ids, market }
				return await fetch(state, '/albums/', axios_options);
			},
			getAlbumTracks: async (state, album_id, axios_options) => {
				// GET /albums/{album_id}/tracks, params: { limit, market, offset }
				return await fetch(state, `/albums/${album_id}/tracks`, axios_options);
			},
			getMyAlbums: async (state, axios_options) => {
				// GET /me/albums, params: { limit, market, offset }
				return await fetch(state, '/me/albums/', axios_options);
			},
			updateUserAlbums: async (state, axios_options) => {
				// PUT /me/albums, params (required): { ids }, body (application/json): { ids }
				return await fetch(state, '/me/albums/', axios_options);
			},
			deleteUserAlbums: async (state, axios_options) => {
				// DELETE /me/albums, params (required): { ids }, body (application/json): { ids }
				return await fetch(state, '/me/albums/', axios_options);
			},
			checkUserAlbums: async (state, axios_options) => {
				// GET /me/albums/contains, params: { ids }
				return await fetch(state, '/me/albums/contains', axios_options);
			},
			getNewReleases: async (state, axios_options) => {
				// GET /browse/new-releases, params: { country, limit, offset }
				return await fetch(state, '/browse/new-releases', axios_options);
			},
		},
		artists: {
			params: {
				ids: ['', ''], // ...['', '']
				include_groups: ['', ''], // ...['', ''] album, single, appears_on, compilation
				limit: 0,
				market: '',
				offset: 0,
			},
			getArtist: async (state, artist_id, axios_options) => {
				// GET /artists/{artist_id}
				return await fetch(state, `/artists/${artist_id}`, axios_options);
			},
			getArtists: async (state, axios_options) => {
				// GET /artists, params: { ids }
				return await fetch(state, '/artists/', axios_options);
			},
			getArtistAlbums: async (state, artist_id, axios_options) => {
				// GET /artists/{artist_id}/albums, params: { include_groups, limit, market, offset }
				return await fetch(
					state,
					`/artists/${artist_id}/albums`,
					axios_options
				);
			},
			getArtistTopTracks: async (state, artist_id, axios_options) => {
				// GET /artists/{artist_id}/top-tracks, params: { market }
				return await fetch(
					state,
					`/artists/${artist_id}/top-tracks`,
					axios_options
				);
			},
			getArtistRelatedArtists: async (state, artist_id, axios_options) => {
				// GET /artists/{artist_id}/related-artists
				return await fetch(
					state,
					`/artists/${artist_id}/related-artists`,
					axios_options
				);
			},
		},
		shows: {
			params: {
				ids: ['', ''], // ...['', '']
				limit: 0,
				market: '',
				offset: 0,
			},
			getShow: async (state, show_id, axios_options) => {
				// GET /shows/{show_id}, params: { market }
				return await fetch(state, `/shows/${show_id}`, axios_options);
			},
			getShows: async (state, axios_options) => {
				// GET /shows, params: { ids, market }
				return await fetch(state, `/shows`, axios_options);
			},
			getShowEpisodes: async (state, show_id, axios_options) => {
				// GET /shows/{show_id}/episodes, params: { limit, market, offset }
				return await fetch(state, `/shows/${show_id}/episodes`, axios_options);
			},
			getUserShows: async (state, axios_options) => {
				// GET /me/shows, params: { limit, offset }
				return await fetch(state, `/me/shows`, axios_options);
			},
			updateUserShows: async (state, axios_options) => {
				// PUT /me/shows, params: { ids }
				return await fetch(state, `/me/shows`, axios_options);
			},
			deleteUserShows: async (state, axios_options) => {
				// DELETE /me/shows, params: { ids, market }
				return await fetch(state, `/me/shows`, axios_options);
			},
			checkUserShows: async (state, axios_options) => {
				// GET /me/shows/contains, params: { ids }
				return await fetch(state, `/me/shows/contains`, axios_options);
			},
		},
		episodes: {
			params: {
				ids: ['', ''], // ...['', '']
				limit: 0,
				market: '',
				offset: 0,
			},
			body: {
				ids: [''], // ['']
			},
			getEpisode: async (state, episode_id, axios_options) => {
				// GET /episodes/{episode_id}, params: { market }
				return await fetch(state, `/episodes/${episode_id}`, axios_options);
			},
			getEpisodes: async (state, axios_options) => {
				// GET /episodes, params: { ids, market }
				return await fetch(state, `/episodes`, axios_options);
			},
			getUserShows: async (state, axios_options) => {
				// GET /me/episodes, params: { limit, market, offset }
				return await fetch(state, `/me/episodes`, axios_options);
			},
			updateUserShows: async (state, axios_options) => {
				// PUT /me/episodes, params: { ids }, body: { ids }
				return await fetch(state, `/me/episodes`, axios_options);
			},
			deleteUserShows: async (state, axios_options) => {
				// DELETE /me/episodes, params: { ids }, body: { ids }
				return await fetch(state, `/me/episodes`, axios_options);
			},
			checkUserShows: async (state, axios_options) => {
				// GET /me/episodes/contains, params: { ids }
				return await fetch(state, `/me/episodes/contains`, axios_options);
			},
		},
		audiobooks: {
			params: {
				ids: ['', ''], // ...['', '']
				limit: 0,
				market: '',
				offset: 0,
			},
			getAudiobook: async (state, audiobook_id, axios_options) => {
				// GET /audiobooks/{audiobook_id}, params: market
				return await fetch(state, `/audiobooks/${audiobook_id}`, axios_options);
			},
			getAudiobooks: async (state, axios_options) => {
				// GET /audiobooks, params: ids, market
				return await fetch(state, `/audiobooks`, axios_options);
			},
			getAudiobookChapters: async (state, audiobook_id, axios_options) => {
				// GET /audiobooks/{audiobook_id}/chapters, params: limit, market, offset
				return await fetch(
					state,
					`/audiobooks/${audiobook_id}/chapters`,
					axios_options
				);
			},
			getUserAudiobooks: async (state, axios_options) => {
				// GET /me/audiobooks, params: limit, offset
				return await fetch(state, `/me/audiobooks`, axios_options);
			},
			updateUserAudiobooks: async (state, axios_options) => {
				// PUT /me/audiobooks, params: ids
				return await fetch(state, `/me/audiobooks`, axios_options);
			},
			deleteUserAudiobooks: async (state, axios_options) => {
				// DELETE /me/audiobooks, params: ids
				return await fetch(state, `/me/audiobooks`, axios_options);
			},
			checkUserAudiobooks: async (state, axios_options) => {
				// GET /me/audiobooks/contains, params: ids
				return await fetch(state, `/me/audiobooks/contains`, axios_options);
			},
		},
		chapters: {
			params: {
				ids: ['', ''], // ...['', '']
				market: '',
			},
			getChapter: async (state, chapter_id, axios_options) => {
				// GET /chapters/{chapter_id}
				return await fetch(state, `/chapters/${chapter_id}`, axios_options);
			},
			getChapters: async (state, axios_options) => {
				// GET /chapters
				return await fetch(state, `/chapters`, axios_options);
			},
		},
		tracks: {
			params: {
				ids: ['', ''], // ...['', '']
				limit: 0,
				market: '',
				offset: 0,
				seed_artists: ['', ''], // ...['', '']
				seed_genres: ['', ''], // ...['', '']
				seed_tracks: ['', ''], // ...['', '']
				max_acousticness: 0, // number
				max_danceability: 0, // number
				max_duration_ms: 0, // int
				max_energy: 0, // number
				max_instrumentalness: 0, // number
				max_key: 0, // int
				max_liveness: 0, // number
				max_loudness: 0, // number
				max_mode: 0, // int
				max_popularity: 0, // int
				max_speechiness: 0, // number
				max_tempo: 0, // number
				max_time_signature: 0, // int
				max_valence: 0, // number
				min_acousticness: 0, // number
				min_danceability: 0, // number
				min_duration_ms: 0, // int
				min_energy: 0, // number
				min_instrumentalness: 0, // number
				min_key: 0, // int
				min_liveness: 0, // number
				min_loudness: 0, // number
				min_mode: 0, // int
				min_popularity: 0, // int
				min_speechiness: 0, // number
				min_tempo: 0, // number
				min_time_signature: 0, // int
				min_valence: 0, // number
				target_acousticness: 0, // number
				target_danceability: 0, // number
				target_duration_ms: 0, // int
				target_energy: 0, // number
				target_instrumentalness: 0, // number
				target_key: 0, // int
				target_liveness: 0, // number
				target_loudness: 0, // number
				target_mode: 0, // int
				target_popularity: 0, // int
				target_speechiness: 0, // number
				target_tempo: 0, // number
				target_time_signature: 0, // int
				target_valence: 0, // number
			},
			body: {
				ids: [''], // ['']
			},
			getTrack: async (state, track_id, axios_options) => {
				// GET /tracks/{track_id}, params: { market: str }
				return await fetch(state, `/tracks/${track_id}`, axios_options);
			},
			getTracks: async (state, axios_options) => {
				// GET /tracks, params: { ids: str[], market: str }
				return await fetch(state, `/tracks`, axios_options);
			},
			getUserTracks: async (state, axios_options) => {
				// GET /me/tracks, params: { limit: str, market: str, offset: int }
				return await fetch(state, `/me/tracks`, axios_options);
			},
			updateUserTracks: async (state, axios_options) => {
				// PUT /me/tracks, params: { ids: ...str[] }, body: { ids: str[] }
				return await fetch(state, `/me/tracks`, axios_options);
			},
			deleteUserTracks: async (state, axios_options) => {
				// DELETE /me/tracks, params: { ids: ...str[] }, body: { ids: str[] }
				return await fetch(state, `/me/tracks`, axios_options);
			},
			checkUserTracks: async (state, axios_options) => {
				// GET /me/tracks/contains, params: { ids: ...str[] }
				return await fetch(state, `/me/tracks/contains`, axios_options);
			},
			getTrackAudioFeatures: async (state, axios_options) => {
				// GET /audio-features, params: { ids: ...str[] }
				return await fetch(state, `/audio-features`, axios_options);
			},
			getTracksAudioFeatures: async (state, track_id, axios_options) => {
				// GET /audio-features/{track_id}
				return await fetch(state, `/audio-features/${track_id}`, axios_options);
			},
			getTracksAudioAnalysis: async (state, track_id, axios_options) => {
				// GET /audio-analysis/{track_id}
				return await fetch(state, `/audio-analysis/${track_id}`, axios_options);
			},
			getRecommendations: async (state, axios_options) => {
				console.log('getRecommendations: ', axios_options);
				// GET /recommendations, params: { seed_artists: ...str[], seed_genres: ...str[], seed_tracks: ...str[], limit: int, market: str, max_accousticness: int, max_danceability: int, max_duration_ms: int, max_energy: int, max_intrumentalness: int, max_key: int, max_liveness: num, max_loudness: num, max_mode: int, max_popularity: int, max_speechiness: num, max_tempo: num, max_time_signature: int, max_valence: num, min_acousticness: num, min_danceability: num, min_duration_ms: int, min_enegry: num, min_instrumentalness: num, min_key: int, min_liveness: num, min_loudness: num, min_mode: int, min_popularity: int, }
				return await fetch(state, `/recommendations`, axios_options);
			},
		},
		search_params: {
			ids: ['', ''], // ...['', '']
			limit: 0,
			market: '',
			offset: 0,
			q: '',
			type: ['', ''], // ...['', ''], ['album', 'artist', 'playlist', 'track', 'show', 'episode', 'audiobook']
			include_external: '', // audio
		},
		search: async (state, axios_options) => {
			console.log('search: ', axios_options);
			// GET /search, params: trackDetails: {...trackDetails}
			return await fetch(state, `/search`, axios_options)
				.then((res) => res[Object.keys(res)[0]].items)
				.catch((err) => console.log('Error in spotify.api.search: ', err));
		},
		users: {
			params: {
				after: '',
				ids: ['', ''], // ...['', '']
				limit: 0,
				// market: '',
				offset: 0,
				time_range: '', // 'long_term' (years), 'medium_term' (default, 6 months), 'short_term' (1 month)
				type: 'artist', // only allowed value is 'artist'
			},
			body: {
				ids: [''], // ['']
				public: true, // default: true
			},
			getUser: async (state, axios_options) => {
				// GET /me
				return await fetch(state, `/me`, axios_options);
			},
			getUserTopTracks: async (state, axios_options) => {
				// GET /me/top/tracks, params: { limit, offset, time_range }
				return await fetch(state, `/me/top/tracks`, axios_options);
			},
			getUserTopArtists: async (state, axios_options) => {
				// GET /me/top/artists, params: { limit, offset, time_range }
				return await fetch(state, `/me/top/artists`, axios_options);
			},
			getUserProfile: async (state, user_id, axios_options) => {
				// GET /users/{user_id}
				return await fetch(state, `/users/${user_id}`, axios_options);
			},
			followPlaylist: async (state, playlist_id, axios_options) => {
				// PUT /playlists/{playlist_id}/followers, body: { public }
				return await fetch(
					state,
					`/playlists/${playlist_id}/followers`,
					axios_options
				);
			},
			unfollowPlaylist: async (state, playlist_id, axios_options) => {
				// DELETE /playlists/{playlist_id/followers
				return await fetch(
					state,
					`/playlists/${playlist_id}/followers`,
					axios_options
				);
			},
			getUserFollowedArtists: async (state, axios_options) => {
				// GET /me/following, params: { type, after, limit }
				return await fetch(state, `/me/following`, axios_options);
			},
			updateMyFollowedArtists: async (state, axios_options) => {
				// PUT /me/following, params: { ids, type }, body: { ids }
				return await fetch(state, `/me/following`, axios_options);
			},
			deleteMyFollowedArtists: async (state, axios_options) => {
				// DELETE /me/following, params: { ids, type }, body: { ids }
				return await fetch(state, `/me/following`, axios_options);
			},
			checkMyFollowedUsersOrArtists: async (state, axios_options) => {
				// GET /me/following/contains, params: { ids, type }
				return await fetch(state, `/me/following/contains`, axios_options);
			},
			checkMyFollowPlaylistState: async (state, playlist_id, axios_options) => {
				// GET /playlists/{playlist_id}/followers/contains, params: { ids }
				return await fetch(
					state,
					`/playlists/${playlist_id}/followers/contains`,
					axios_options
				);
			},
		},
		playlists: {
			params: {
				additional_types: ['', ''], // ...['', '']
				country: '',
				fields: '',
				limit: 0, // int
				locale: '',
				market: '',
				offset: 0, // int
				position: 0, // int
				timestamp: '', // 'yyyy-MM-ddTHH:mm:ss'
				uris: ['', ''], // ...['', '']
			},
			body: {
				collaborative: false,
				description: '',
				insert_before: 0, // int
				name: '',
				position: 0, // int
				public: false,
				range_length: 0, // int
				range_start: 0, // int
				snapshot_id: '',
				tracks: { tracks: [{ uri: 'spotify:track:XXXXXXXXXXXXXXXX' }] },
				uris: ['', ''], // ['', '']
			},
			getPlaylist: async (state, playlist_id, axios_options) => {
				// GET /playlists/{playlist_id}, params: { additional_types, fields, market }
				return await fetch(state, `/playlists/${playlist_id}`, axios_options);
			},
			updateDetails: async (state, playlist_id, axios_options) => {
				// PUT /playlists/{playlist_id}, body: { playlistName, isPublic, collaborative, description }
				return await fetch(state, `/playlists/${playlist_id}`, axios_options);
			},
			getTracks: async (state, playlist_id, axios_options) => {
				// GET /playlists/{playlist_id}/tracks, params: { additional_types, fields, limit, market, offset }
				return await fetch(
					state,
					`/playlists/${playlist_id}/tracks`,
					axios_options
				);
			},
			postTracks: async (state, playlist_id, axios_options) => {
				// POST /playlists/{playlist_id}/tracks, params: { position, uris }, body: { uris, position }
				return await fetch(
					state,
					`/playlists/${playlist_id}/tracks`,
					axios_options
				);
			},
			updateTracks: async (state, playlist_id, axios_options) => {
				// PUT /playlists/{playlist_id}/tracks, params: { uris }, body: { uris, range_str, insert_before, range_length, snapshot_id }
				return await fetch(
					state,
					`/playlists/${playlist_id}/tracks`,
					axios_options
				);
			},
			deleteTracks: async (state, playlist_id, axios_options) => {
				// DELETE /playlists/{playlist_id}/tracks, body: { tracks: [ ... { uri }], snapshot_id }
				return await fetch(
					state,
					`/playlists/${playlist_id}/tracks`,
					axios_options
				);
			},
			getMyPlaylists: async (state, axios_options) => {
				// GET /me/playlists, params: { limit, offset }
				return await fetch(state, `/me/playlists`, axios_options);
			},
			getUserPlaylists: async (state, user_id, axios_options) => {
				// GET /users/{user_id}/playlists, params: { limit, offset }
				return await fetch(state, `/users/${user_id}/playlists`, axios_options);
			},
			postNewPlaylist: async (state, user_id, axios_options) => {
				// POST /users/{user_id}/playlists, body: { playlistName, isPublic, collaborative, description }
				return await fetch(state, `/users/${user_id}/playlists`, axios_options);
			},
			getFeatured: async (state, axios_options) => {
				// GET /browse/featured-playlists, params: { country, limit, locale, offset, timestamp }
				return await fetch(state, `/browse/featured-playlists`, axios_options);
			},
			getByCategory: async (state, category_id, axios_options) => {
				// GET /browse/categories/{category_id}/playlists, params: { country, limit, offset }
				return await fetch(
					state,
					`/browse/categories/${category_id}/playlists`,
					axios_options
				);
			},
			getCoverImage: async (state, playlist_id, axios_options) => {
				// GET /playlists/{playlist_id}/images
				return await fetch(
					state,
					`/playlists/${playlist_id}/images`,
					axios_options
				);
			},
			updateCoverImage: async (state, playlist_id, axios_options) => {
				// PUT /playlists/{playlist_id}/images
				return await fetch(
					state,
					`/playlists/${playlist_id}/images`,
					axios_options
				);
			},
		},
		categories: {
			params: {
				country: '',
				limit: 0, // int
				locale: '',
				offset: 0, // int
			},
			getMany: async (state, axios_options) => {
				// GET /browse/categories, params: { country, limit, locale, offset }
				return await fetch(state, `/browse/categories`, axios_options);
			},
			getOne: async (state, category_id, axios_options) => {
				// GET /browse/categories/{category_id}, params: { country, locale }
				return await fetch(
					state,
					`/browse/categories/${category_id}`,
					axios_options
				);
			},
		},
		genres: {
			getSeeds: async (state, axios_options) => {
				// GET /recommendations/available-genre-seeds
				return await fetch(
					`/recommendations/available-genre-seeds`,
					axios_options
				);
			},
		},
		player: {
			params: {
				additional_types: '',
				after: '', // unix timestamp in ms
				before: '', // unix timestamp in ms
				device_id: '',
				limit: 0, // int
				market: '',
				position_ms: 0, // int
				state: [
					['setRepeat', '"track", "context", "off"'],
					['setShuffle', false],
				],
				volume_percent: 0, // int
				uri: '',
			},
			body: {
				context_uri: '',
				device_ids: { device_ids: ['XXXXXXXXX'] }, // JSON array
				devices: {
					id: '',
					is_active: false,
					is_private_session: false,
					is_restricted: false,
					name: '',
					type: '', // 'computer', 'smartphone', 'speaker'
					volume_percent: 0, // int
				},
				offset: { offset: { uri: 'spotify:track:XXXXXXX' } },
				play: false,
				position: 0, // int
				uris: { uris: ['spotify:track:XXXXXXXXXXXXX'] },
			},
			getPlayback: async (state, axios_options) => {
				// GET /me/player, params: { additional_types, market }
				return await fetch(state, `/me/player`, axios_options);
			},
			updateCurrentDevice: async (state, axios_options) => {
				// PUT /me/player, body: { device_ids, play }
				return await fetch(state, `/me/player`, axios_options);
			},
			getDevices: async (state, axios_options) => {
				// GET /me/player/devices
				return await fetch(state, `/me/player/devices`, axios_options);
			},
			getCurrentTrack: async (state, axios_options) => {
				// GET /me/player/current-playing, params: { additional_types, market }
				return await fetch(
					state,
					`/me/player/currently-playing`,
					axios_options
				);
			},
			updatePlaying: async (state, axios_options) => {
				// PUT /me/player/play, params: device_id, body: { context_url, uris, offset, position_ms }
				return await fetch(state, `/me/player/play`, axios_options);
			},
			updatePaused: async (state, axios_options) => {
				// PUT /me/player/pause, params: { device_id }
				return await fetch(state, `/me/player/pause`, axios_options);
			},
			postNextTrack: async (state, axios_options) => {
				// POST /me/player/next, params: { device_id }
				return await fetch(state, `/me/player/next`, axios_options);
			},
			postPreviousTrack: async (state, axios_options) => {
				// POST /me/player/previous, params: { device_id }
				return await fetch(state, `/me/player/previous`, axios_options);
			},
			updatePosition: async (state, axios_options) => {
				// PUT /me/player/seek, params: { position_ms, device_id }
				return await fetch(state, `/me/player/seek`, axios_options);
			},
			updateRepeat: async (state, axios_options) => {
				// PUT /me/player/repeat, params: { state, device_id }
				return await fetch(state, `/me/player/repeat`, axios_options);
			},
			updateVolume: async (state, axios_options) => {
				// PUT /me/player/volume, params: { volume_percent, device_id }
				return await fetch(state, `/me/player/volume`, axios_options);
			},
			updateShuffle: async (state, axios_options) => {
				// PUT /me/player/shuffle, params: { state, device_id }
				return await fetch(state, `/me/player/shuffle`, axios_options);
			},
			getRecentTracks: async (state, axios_options) => {
				// GET /me/player/recently-played, params: { after, before, limit }
				return await fetch(state, `/me/player/recently-played`, axios_options);
			},
			getQueue: async (state, axios_options) => {
				// GET /me/player/queue
				return await fetch(state, `/me/player/queue`, axios_options);
			},
			postAddTrack: async (state, axios_options) => {
				// POST /me/player/queue, params: { uri, device_id }
				return await fetch(state, `/me/player/volume`, axios_options);
			},
		},
		markets: {
			getMarkets: async (state, axios_options) => {
				// GET /markets
				return await fetch(state, `/markets`, axios_options);
			},
		},
	};

	return { login, logout, fetch, api };
}

import axios from 'axios';

export default function spotifyApi(state) {
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
		}
		return state.set('token', stored_token);
	};

	const logout = (state) => {
		state.set('token', '');
		window.localStorage.removeItem('token');
	};

	const fetch = async (end_point = '', options = {}) => {
		return await axios
			.get('https://api.spotify.com/v1' + end_point, {
				headers: {
					Authorization: `Bearer ${state.token}`,
				},
				...options,
			})
			.then((res) => res.data);
	};

	const api = {
		albums: {
			getAlbum: async (album_id, params) => {
				// GET /albums/{album_id}, params: { market }
				return fetch(`/albums/${album_id}`, { method: 'GET', params });
			},
			getAlbums: async (params) => {
				// GET /albums, params: { ids, market }
				return fetch('/albums/', { method: 'GET', params });
			},
			getAlbumTracks: async (album_id, params) => {
				// GET /albums/{album_id}/tracks, params: { limit, market, offset }
				return fetch(`/albums/${album_id}/tracks`, {
					method: 'GET',
					params,
				});
			},
			getMyAlbums: async (params) => {
				// GET /me/albums, params: { limit, market, offset }
				return fetch('/me/albums/', { method: 'GET', params });
			},
			updateUserAlbums: async (params, body) => {
				// PUT /me/albums, params (required): { ids }, body (application/json): { ids }
				return fetch('/me/albums/', { method: 'PUT', params, body });
			},
			deleteUserAlbums: async (params, body) => {
				// DELETE /me/albums, params (required): { ids }, body (application/json): { ids }
				return fetch('/me/albums/', { method: 'DELETE', params, body });
			},
			checkUserAlbums: async (params) => {
				// GET /me/albums/contains, params: { ids }
				return fetch('/me/albums/contains', { method: 'PUT', params });
			},
			getNewReleases: async (params) => {
				// GET /browse/new-releases, params: { country, limit, offset }
				return fetch('/browse/new-releases', { method: 'GET', params });
			},
		},
		artists: {
			getArtist: async (artist_id) => {
				// GET /artists/{artist_id}
				return fetch(`/artists/${artist_id}`);
			},
			getArtists: async (params) => {
				// GET /artists, params: { ids }
				return fetch('/artists/', { method: 'GET', params });
			},
			getArtistAlbums: async (artist_id, params) => {
				// GET /artists/{artist_id}/albums, params: { include_groups, limit, market, offset }
				return fetch(`/artists/${artist_id}/albums`, {
					method: 'GET',
					params,
				});
			},
			getArtistTopTracks: async (artist_id, params) => {
				// GET /artists/{artist_id}/top-tracks, params: { market }
				return fetch(`/artists/${artist_id}/top-tracks`, {
					method: 'GET',
					params,
				});
			},
			getArtistRelatedArtists: async (artist_id) => {
				// GET /artists/{artist_id}/related-artists
				return fetch(`/artists/${artist_id}/related-artists`);
			},
		},
		shows: {
			getShow: async (show_id, params) => {
				// GET /shows/{show_id}, params: { market }
				return fetch(`/shows/${show_id}`, { method: 'GET', params });
			},
			getShows: async (params) => {
				// GET /shows, params: { ids, market }
				return fetch(`/shows`, { method: 'GET', params });
			},
			getShowEpisodes: async (show_id) => {
				// GET /shows/{show_id}/episodes, params: { limit, market, offset }
				return fetch(`/shows/${show_id}/episodes`, { method: 'GET' });
			},
			getUserShows: async (params) => {
				// GET /me/shows, params: { limit, offset }
				return fetch(`/me/shows`, { method: 'GET', params });
			},
			updateUserShows: async (params) => {
				// PUT /me/shows, params: { ids }
				return fetch(`/me/shows`, { method: 'PUT', params });
			},
			deleteUserShows: async (params) => {
				// DELETE /me/shows, params: { ids, market }
				return fetch(`/me/shows`, { method: 'DELETE', params });
			},
			checkUserShows: async (params) => {
				// GET /me/shows/contains, params: { ids }
				return fetch(`/me/shows/contains`, { method: 'GET', params });
			},
		},
		episodes: {
			getEpisode: async (episode_id, params) => {
				// GET /episodes/{episode_id}, params: { market }
				return fetch(`/episodes/${episode_id}`, {
					method: 'GET',
					params,
				});
			},
			getEpisodes: async (params) => {
				// GET /episodes, params: { ids, market }
				return fetch(`/episodes`, { method: 'GET', params });
			},
			getUserShows: async (params) => {
				// GET /me/episodes, params: { limit, market, offset }
				return fetch(`/me/episodes`, { method: 'GET', params });
			},
			updateUserShows: async (params, body) => {
				// PUT /me/episodes, params: { ids }, body: { ids }
				return fetch(`/me/episodes`, { method: 'PUT', params, body });
			},
			deleteUserShows: async (params, body) => {
				// DELETE /me/episodes, params: { ids }, body: { ids }
				return fetch(`/me/episodes`, { method: 'DELETE', params, body });
			},
			checkUserShows: async (params) => {
				// GET /me/episodes/contains, params: { ids }
				return fetch(`/me/episodes/contains`, { method: 'GET', params });
			},
		},
		audiobooks: {
			getAudiobook: async (audiobook_id, params) => {
				// GET /audiobooks/{audiobook_id}, params: market
				return fetch(`/audiobooks/${audiobook_id}`, {
					method: 'GET',
					params,
				});
			},
			getAudiobooks: async (params) => {
				// GET /audiobooks, params: ids, market
				return fetch(`/audiobooks`, { method: 'GET', params });
			},
			getAudiobookChapters: async (audiobook_id, params) => {
				// GET /audiobooks/{audiobook_id}/chapters, params: limit, market, offset
				return fetch(`/audiobooks/${audiobook_id}/chapters`, {
					method: 'GET',
					params,
				});
			},
			getUserAudiobooks: async (params) => {
				// GET /me/audiobooks, params: limit, offset
				return fetch(`/me/audiobooks`, {
					method: 'GET',
					params,
				});
			},
			updateUserAudiobooks: async (params) => {
				// PUT /me/audiobooks, params: ids
				return fetch(`/me/audiobooks`, {
					method: 'PUT',
					params,
				});
			},
			deleteUserAudiobooks: async (params) => {
				// DELETE /me/audiobooks, params: ids
				return fetch(`/me/audiobooks`, {
					method: 'DELETE',
					params,
				});
			},
			checkUserAudiobooks: async (params) => {
				// GET /me/audiobooks/contains, params: ids
				return fetch(`/me/audiobooks/contains`, {
					method: 'GET',
					params,
				});
			},
		},
		chapters: {
			getChapter: async (chapter_id, params) => {
				// GET /chapters/{chapter_id}
				return fetch(`/chapters/${chapter_id}`, {
					method: 'GET',
					params,
				});
			},
			getChapters: async (params) => {
				// GET /chapters
				return fetch(`/chapters`, {
					method: 'GET',
					params,
				});
			},
		},
		tracks: {
			getTrack: async (track_id, params) => {
				// GET /tracks/{track_id}, params: { market: str }
				return fetch(`/tracks/${track_id}`, {
					method: 'GET',
					params,
				});
			},
			getTracks: async (params) => {
				// GET /tracks, params: { ids: str[], market: str }
				return fetch(`/tracks`, {
					method: 'GET',
					params,
				});
			},
			getUserTracks: async (params) => {
				// GET /me/tracks, params: { limit: str, market: str, offset: int }
				return fetch(`/me/tracks`, {
					method: 'GET',
					params,
				});
			},
			updateUserTracks: async (params, body) => {
				// PUT /me/tracks, params: { ids: ...str[] }, body: { ids: str[] }
				return fetch(`/me/tracks`, {
					method: 'PUT',
					params,
					body,
				});
			},
			deleteUserTracks: async (params, body) => {
				// DELETE /me/tracks, params: { ids: ...str[] }, body: { ids: str[] }
				return fetch(`/me/tracks`, {
					method: 'DELETE',
					params,
					body,
				});
			},
			checkUserTracks: async (params) => {
				// GET /me/tracks/contains, params: { ids: ...str[] }
				return fetch(`/me/tracks/contains`, {
					method: 'GET',
					params,
				});
			},
			getTrackAudioFeatures: async (params) => {
				// GET /audio-features, params: { ids: ...str[] }
				return fetch(`/audio-features`, {
					method: 'GET',
					params,
				});
			},
			getTracksAudioFeatures: async (track_id, params) => {
				// GET /audio-features/{track_id}
				return fetch(`/audio-features/${track_id}`, {
					method: 'GET',
					params,
				});
			},
			getTracksAudioAnalysis: async (track_id, params) => {
				// GET /audio-analysis/{track_id}
				return fetch(`/audio-analysis/${track_id}`, {
					method: 'GET',
					params,
				});
			},
			getRecommendations: async (params) => {
				// GET /recommendations, params: { seed_artists: ...str[], seed_genres: ...str[], seed_tracks: ...str[], limit: int, market: str, max_accousticness: int, max_danceability: int, max_duration_ms: int, max_energy: int, max_intrumentalness: int, max_key: int, max_liveness: num, max_loudness: num, max_mode: int, max_popularity: int, max_speechiness: num, max_tempo: num, max_time_signature: int, max_valence: num, min_acousticness: num, min_danceability: num, min_duration_ms: int, min_enegry: num, min_instrumentalness: num, min_key: int, min_liveness: num, min_loudness: num, min_mode: int, min_popularity: int, }
				return fetch(`/recommendations`, {
					method: 'GET',
					params,
				});
			},
		},
		search: async (params) => {
			console.log(
				'Initiating Spotify API Search with the following parameters: ',
				params
			);
			// GET /search, params: trackDetails: {...trackDetails}
			return await fetch(`/search`, {
				method: 'GET',
				params,
			}).then((res) => res[Object.keys(res)[0]].items);
		},
		users: {
			getUser: async () => {
				// GET /me
				return fetch(`/me`, {
					method: 'GET',
				});
			},
			getUserTopTracks: async (params) => {
				// GET /me/top/tracks, params: { limit, offset, time_range }
				return fetch(`/me/top/tracks`, {
					method: 'GET',
					params,
				});
			},
			getUserTopArtists: async (params) => {
				// GET /me/top/artists, params: { limit, offset, time_range }
				return fetch(`/me/top/artists`, {
					method: 'GET',
					params,
				});
			},
			getUserProfile: async (user_id) => {
				// GET /users/{user_id}
				return fetch(`/users/${user_id}`, {
					method: 'GET',
				});
			},
			followPlaylist: async (playlist_id, body) => {
				// PUT /playlists/{playlist_id}/followers, body: { public }
				return fetch(`/playlists/${playlist_id}/followers`, {
					method: 'PUT',
					body,
				});
			},
			unfollowPlaylist: async (playlist_id) => {
				// DELETE /playlists/{playlist_id/followers
				return fetch(`/playlists/${playlist_id}/followers`, {
					method: 'DELETE',
				});
			},
			getUserFollowedArtists: async (params) => {
				// GET /me/following, params: { type, after, limit }
				return fetch(`/me/following`, {
					method: 'GET',
					params,
				});
			},
			updateMyFollowedArtists: async (params, body) => {
				// PUT /me/following, params: { ids, type }, body: { ids }
				return fetch(`/me/following`, {
					method: 'PUT',
					params,
					body,
				});
			},
			deleteMyFollowedArtists: async (params, body) => {
				// DELETE /me/following, params: { ids, type }, body: { ids }
				return fetch(`/me/following`, {
					method: 'DELETE',
					params,
					body,
				});
			},
			checkMyFollowedUsersOrArtists: async (params) => {
				// GET /me/following/contains, params: { ids, type }
				return fetch(`/me/following/contains`, {
					method: 'GET',
					params,
				});
			},
			checkMyFollowPlaylistState: async (playlist_id, params) => {
				// GET /playlists/{playlist_id}/followers/contains, params: { ids }
				return fetch(`/playlists/${playlist_id}/followers/contains`, {
					method: 'GET',
					params,
				});
			},
		},
		playlists: {
			getPlaylist: async (playlist_id, params) => {
				// GET /playlists/{playlist_id}, params: { additional_types, fields, market }
				return fetch(`/playlists/${playlist_id}`, {
					method: 'GET',
					params,
				});
			},
			updateDetails: async (playlist_id, body) => {
				// PUT /playlists/{playlist_id}, body: { playlistName, isPublic, collaborative, description }
				return fetch(`/playlists/${playlist_id}`, {
					method: 'PUT',
					body,
				});
			},
			getTracks: async (playlist_id, params) => {
				// GET /playlists/{playlist_id}/tracks, params: { additional_types, fields, limit, market, offset }
				return fetch(`/playlists/${playlist_id}/tracks`, {
					method: 'GET',
					params,
				});
			},
			postTracks: async (playlist_id, params, body) => {
				// POST /playlists/{playlist_id}/tracks, params: { position, uris }, body: { uris, position }
				return fetch(`/playlists/${playlist_id}/tracks`, {
					method: 'POST',
					params,
					body,
				});
			},
			updateTracks: async (playlist_id, params, body) => {
				// PUT /playlists/{playlist_id}/tracks, params: { uris }, body: { uris, range_str, insert_before, range_length, snapshot_id }
				return fetch(`/playlists/${playlist_id}/tracks`, {
					method: 'PUT',
					params,
					body,
				});
			},
			deleteTracks: async (playlist_id, body) => {
				// DELETE /playlists/{playlist_id}/tracks, body: { tracks: [ ... { uri }], snapshot_id }
				return fetch(`/playlists/${playlist_id}/tracks`, {
					method: 'DELETE',
					body,
				});
			},
			getMyPlaylists: async (params) => {
				// GET /me/playlists, params: { limit, offset }
				return fetch(`/me/playlists`, {
					method: 'GET',
					params,
				});
			},
			getUserPlaylists: async (user_id, params) => {
				// GET /users/{user_id}/playlists, params: { limit, offset }
				return fetch(`/users/${user_id}/playlists`, {
					method: 'GET',
					params,
				});
			},
			postNewPlaylist: async (user_id, body) => {
				// POST /users/{user_id}/playlists, body: { playlistName, isPublic, collaborative, description }
				return fetch(`/users/${user_id}/playlists`, {
					method: 'POST',
					body,
				});
			},
			getFeatured: async (params) => {
				// GET /browse/featured-playlists, params: { country, limit, locale, offset, timestamp }
				return fetch(`/browse/featured-playlists`, {
					method: 'GET',
					params,
				});
			},
			getByCategory: async (category_id, params) => {
				// GET /browse/categories/{category_id}/playlists, params: { country, limit, offset }
				return fetch(`/browse/categories/${category_id}/playlists`, {
					method: 'GET',
					params,
				});
			},
			getCoverImage: async (playlist_id) => {
				// GET /playlists/{playlist_id}/images
				return fetch(`/playlists/${playlist_id}/images`, {
					method: 'GET',
				});
			},
			updateCoverImage: async (playlist_id) => {
				// PUT /playlists/{playlist_id}/images
				return fetch(`/playlists/${playlist_id}/images`, {
					method: 'PUT',
				});
			},
		},
		categories: {
			getMany: async (params) => {
				// GET /browse/categories, params: { country, limit, locale, offset }
				return fetch(`/browse/categories`, {
					method: 'GET',
					params,
				});
			},
			getOne: async (category_id, params) => {
				// GET /browse/categories/{category_id}, params: { country, locale }
				return fetch(`/browse/categories/${category_id}`, {
					method: 'GET',
					params,
				});
			},
		},
		genres: {
			getSeeds: async () => {
				// GET /recommendations/available-genre-seeds
				return fetch(`/recommendations/available-genre-seeds`, {
					method: 'GET',
				});
			},
		},
		player: {
			getPlayback: async (params) => {
				// GET /me/player, params: { additional_types, market }
				return fetch(`/me/player`, {
					method: 'GET',
					params,
				});
			},
			updateCurrentDevice: async (body) => {
				// PUT /me/player, body: { device_ids, play }
				return fetch(`/me/player`, {
					method: 'PUT',
					body,
				});
			},
			getDevices: async () => {
				// GET /me/player/devices
				return fetch(`/me/player/devices`, {
					method: 'GET',
				});
			},
			getCurrentTrack: async (params) => {
				// GET /me/player/current-playing, params: { additional_types, market }
				return fetch(`/me/player/currently-playing`, {
					method: 'GET',
					params,
				});
			},
			updatePlaying: async (params, body) => {
				// PUT /me/player/play, params: device_id, body: { context_url, uris, offset, position_ms }
				return fetch(`/me/player/play`, {
					method: 'PUT',
					params,
					body,
				});
			},
			updatePaused: async (params) => {
				// PUT /me/player/pause, params: { device_id }
				return fetch(`/me/player/pause`, {
					method: 'PUT',
					params,
				});
			},
			postNextTrack: async (params) => {
				// POST /me/player/next, params: { device_id }
				return fetch(`/me/player/next`, {
					method: 'POST',
					params,
				});
			},
			postPreviousTrack: async (params) => {
				// POST /me/player/previous, params: { device_id }
				return fetch(`/me/player/previous`, {
					method: 'POST',
					params,
				});
			},
			updatePosition: async (params) => {
				// PUT /me/player/seek, params: { position_ms, device_id }
				return fetch(`/me/player/seek`, {
					method: 'PUT',
					params,
				});
			},
			updateRepeat: async (params) => {
				// PUT /me/player/repeat, params: { state, device_id }
				return fetch(`/me/player/repeat`, {
					method: 'PUT',
					params,
				});
			},
			updateVolume: async (params) => {
				// PUT /me/player/volume, params: { volume_percent, device_id }
				return fetch(`/me/player/volume`, {
					method: 'PUT',
					params,
				});
			},
			updateShuffle: async (params) => {
				// PUT /me/player/shuffle, params: { state, device_id }
				return fetch(`/me/player/shuffle`, {
					method: 'PUT',
					params,
				});
			},
			getRecentTracks: async (params) => {
				// GET /me/player/recently-played, params: { after, before, limit }
				return fetch(`/me/player/recently-played`, {
					method: 'GET',
					params,
				});
			},
			getQueue: async () => {
				// GET /me/player/queue
				return fetch(`/me/player/queue`, {
					method: 'GET',
				});
			},
			postAddTrack: async (params) => {
				// POST /me/player/queue, params: { uri, device_id }
				return fetch(`/me/player/volume`, {
					method: 'POST',
					params,
				});
			},
		},
		markets: {
			getMarkets: async () => {
				// GET /markets
				return fetch(`/markets`, {
					method: 'GET',
				});
			},
		},
	};

	return { login, logout, fetch, api };
}

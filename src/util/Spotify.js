let accessToken;
const clientID = process.env.REACT_APP_CLIENT_ID;
const redirectURI = process.env.REACT_APP_REDIRECT;

const Spotify = {
	// Retrieve access token for Spotify API
	getAccessToken() {
		if (accessToken) {
			return accessToken;
		}

		// Check for access token match
		const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
		const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

		// Once found in url, set values
		if (accessTokenMatch && expiresInMatch) {
			accessToken = accessTokenMatch[1];
			const expiresIn = Number(expiresInMatch[1]);

			// Clear parameters from URL, allowing ability to grab new access token when expired
			window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');

			return accessToken;
		} else {
			//console.log(clientID, redirectURI);
			const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
			console.log(accessUrl);
			window.location = accessUrl;
		}
	},

	// Search for term on Spotify
	search(term) {
		accessToken = Spotify.getAccessToken();
		console.log(accessToken);

		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: { Authorization: `Bearer ${accessToken}` },
		})
			.then((response) => {
				return response.json();
			})
			.then((jsonResponse) => {
				if (!jsonResponse.tracks) {
					return [];
				}
				return jsonResponse.tracks.items.map((track) => ({
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					album: track.album.name,
					uri: track.uri,
				}));
			});
	},

	// Save playlist to Spotify
	savePlaylist(name, trackUris) {
		if (!name || !trackUris) {
			return;
		}

		accessToken = Spotify.getAccessToken();
		const headers = { Authorization: `Bearer ${accessToken}` };
		let userID;

		return fetch('https://api.spotify.com/v1/me', { headers: headers })
			.then((response) => {
				return response.json();
			})
			.then((jsonResponse) => {
				console.log('Test', jsonResponse.id);
				userID = jsonResponse.id;
				return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
					headers: headers,
					method: 'POST',
					body: JSON.stringify({ name: name }),
				})
					.then((response) => response.json())
					.then((jsonResponse) => {
						const playlistID = jsonResponse.id;
						return fetch(
							`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
							{
								headers: headers,
								method: 'POST',
								body: JSON.stringify({ uris: trackUris }),
							}
						);
					});
			});
	},
};

export default Spotify;

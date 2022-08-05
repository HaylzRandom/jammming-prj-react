import React, { Component } from 'react';
import './App.css';

import Spotify from '../../util/Spotify';

// Components
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends Component {
	constructor(props) {
		super(props);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.search = this.search.bind(this);
		this.state = {
			searchResults: [],
			playlistName: 'Test Playlist',
			playlistTracks: [
				{
					name: 'Name4',
					artist: 'Artist4',
					album: 'Album4',
					id: 4,
				},
				{
					name: 'Name5',
					artist: 'Artist5',
					album: 'Album5',
					id: 5,
				},
				{
					name: 'Name6',
					artist: 'Artist6',
					album: 'Album6',
					id: 6,
				},
				{
					name: 'Name7',
					artist: 'Artist7',
					album: 'Album7',
					id: 7,
				},
			],
		};
	}

	// Add track to playlist
	addTrack(track) {
		let tracks = this.state.playlistTracks;

		// If song already on playlist, do nothing
		if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
			return;
		}

		tracks.push(track);
		this.setState({ playlistTracks: tracks });
	}

	// Remove track from playlist
	removeTrack(track) {
		let tracks = this.state.playlistTracks;

		tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);

		this.setState({ playlistTracks: tracks });
	}

	// Updates playlist name
	updatePlaylistName(name) {
		this.setState({ playlistName: name });
	}

	// Save playlist
	savePlaylist() {
		const trackUris = this.state.playlistTracks.map((track) => track.uri);
	}

	// Searches for a term
	search(term) {
		Spotify.search(term).then((searchResults) => {
			this.setState({ searchResults: searchResults });
		});
	}

	render() {
		return (
			<div>
				<h1>
					Ja<span className='highlight'>mmm</span>ing
				</h1>
				<div className='App'>
					{/* SearchBar Component */}
					<SearchBar onSearch={this.search} />
					<div className='App-playlist'>
						{/* SearchResults Component */}
						<SearchResults
							searchResults={this.state.searchResults}
							onAdd={this.addTrack}
						/>
						{/* Playlist Component */}
						<Playlist
							playlistName={this.state.playlistName}
							playlistTracks={this.state.playlistTracks}
							onRemove={this.removeTrack}
							onNameChange={this.updatePlaylistName}
							onSave={this.savePlaylist}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;

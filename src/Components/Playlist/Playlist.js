import React, { Component } from 'react';
import './Playlist.css';

// Components
import { TrackList } from '../TrackList/TrackList';

export class Playlist extends Component {
	constructor(props) {
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	// Handle updated playlist name
	handleNameChange(e) {
		let playlistName = e.target.value;
		this.props.onNameChange(playlistName);
	}

	render() {
		return (
			<div className='Playlist'>
				<input
					defaultValue={this.props.playlistName}
					onChange={this.handleNameChange}
				/>
				{/* TrackList Component */}
				<TrackList
					tracks={this.props.playlistTracks}
					onRemove={this.props.onRemove}
					isRemoval={true}
				/>
				<button className='Playlist-save' onClick={this.props.onSave}>
					SAVE TO SPOTIFY
				</button>
			</div>
		);
	}
}

export default Playlist;

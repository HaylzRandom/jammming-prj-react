import React, { Component } from 'react';
import './TrackList.css';

// Components
import { Track } from '../Track/Track';

export class TrackList extends Component {
	render() {
		return (
			<div className='TrackList'>
				{/* Map method to render set of Track components */}
				{this.props.tracks.map((track) => (
					<Track
						key={track.id}
						track={track}
						onAdd={this.props.onAdd}
						onRemove={this.props.onRemove}
						isRemoval={this.props.isRemoval}
					/>
				))}
			</div>
		);
	}
}

export default TrackList;

import React, { Component } from 'react';
import './SearchResults.css';

// Components
import { TrackList } from '../TrackList/TrackList';

export class SearchResults extends Component {
	render() {
		return (
			<div className='SearchResults'>
				<h2>Results</h2>
				{/* TrackList Component */}
				<TrackList
					tracks={this.props.searchResults}
					onAdd={this.props.onAdd}
					isRemoval={false}
				/>
			</div>
		);
	}
}

export default SearchResults;

import React, { Component } from 'react';
import './SearchBar.css';

export class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
		this.state = {
			term: '',
		};
	}

	search() {
		this.props.onSearch(this.state.term);
	}

	handleTermChange(e) {
		e.preventDefault();
		let term = e.target.value;
		this.setState({ term: term });
	}
	render() {
		return (
			<div className='SearchBar'>
				<input
					placeholder='Enter a Song, Album, or Artist'
					onChange={this.handleTermChange}
				/>
				<button className='SearchButton' onClick={this.search}>
					SEARCH
				</button>
			</div>
		);
	}
}

export default SearchBar;

import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Jokes from '../api/unsplash';

function Search({setNewImagesFromSearch, setLoading, setText}) {

	const [query, setQuery] = React.useState("");

	const handleSearchCollection = async (e) => {
		e.preventDefault();

		setText(query);
		setLoading(true);
		const {data} = await Jokes.get(`/search/collections?query=${query}&per_page=25`);

		// set data to the parents state
		setNewImagesFromSearch(data.results);
		setQuery("");
		setLoading(false);
	}

	return(
		<div style={{backgroundColor: "#111", color: "#fff", paddingBottom: "10px"}}>
			<div>
				<h1 className="ui center aligned header" style={{color: "#fff"}}>Image API (Unsplash)</h1>
				<form className="ui form" onSubmit={handleSearchCollection}>
					<h4 className="ui center aligned header" style={{color: "#fff"}}>Search image (collection):</h4>
					<div className="ui category search" style={{textAlign: "center"}}>
						<div className="ui icon input">
							<input className="prompt" type="search" placeholder="search" value={query} onChange={(e) => setQuery(e.target.value)} />
							<i className="search icon"></i>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Search;
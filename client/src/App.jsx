import React from 'react';
import axios from 'axios';
import Chirps from './Chirps';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			chirps: []
		}

		this.getChirps = this.getChirps.bind(this);
	}

	componentDidMount() {
		this.getChirps();
	}

	getChirps() {
		axios
			.get('/index')
			.then(chirps => {
				this.setState({chirps: chirps.data.chirps})
			})
			.catch(err => {
				this.setState({chirps: []})
			});
	}

	render() {
		return (
			<Chirps chirps={ this.state.chirps }/>
		);
	}
}

export default App;

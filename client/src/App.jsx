import React from 'react';
import axios from 'axios';
import Chirps from './Chirps';
import Input from './Input';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			chirps: [],
			value: ''
		}

		this.getChirps = this.getChirps.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpdateRefresh = this.handleUpdateRefresh.bind(this);
	}

	componentDidMount() {
		this.getChirps();
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();

		axios
			.post('/index', {
				text: this.state.value
			})
			.then( chirp => {
				let chirps = [{id: chirp.data.id, text: chirp.data.chirp.text, upvotes: 0}].concat(this.state.chirps);

				this.setState({chirps: chirps})
			})
			.catch(err => {
				this.setState({chirps: []})
			});
	}

	handleUpdateRefresh(chirp) {
		const chirpId = chirp.data.id,
			upvotes = chirp.data.chirp.upvotes;

		let chirpsCopy = Object.assign([], this.state.chirps);
		let chirpToUpdate = chirpsCopy.find( chirp => chirp.id === chirpId);


		chirpToUpdate.upvotes = upvotes;

		this.setState({ chirps: chirpsCopy });
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
			<React.Fragment>
				<h1>Chirps</h1>
				<Input
					value= { this.state.value }
					onChange={ this.handleChange }
					onSubmit= { this.handleSubmit }
				/>
				<Chirps
					chirps={ this.state.chirps }
					onUpdateRefresh= { this.handleUpdateRefresh }
				/>
			</React.Fragment>
		);
	}
}

export default App;

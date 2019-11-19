import React from 'react';
import axios from 'axios';

class Upvote extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isUpvote: false
		};

		this.handleOnlick = this.handleOnlick.bind(this);
	}

	handleOnlick(event) {
		const isUpvote = this.state.isUpvote;

		event.preventDefault();

		axios
			.post(`/index/${this.props.id}`, {
				upvotes: this.props.upvotes + (isUpvote ? -1 : 1)
			})
			.then(chirp => {
				this.props.onUpdateRefresh(chirp);

				this.setState({
					isUpvote: !this.state.isUpvote
				});
			})
			.catch(err => {
				console.log('err', err);
			});
	}

	render() {
		return (
			<button onClick={this.handleOnlick}>
				Upvote: {this.props.upvotes}
			</button>
		);
	}
}

export default Upvote;

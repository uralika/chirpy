import React from 'react';
import Chirp from './Chirp';

export default function Chirps(props) {
	return (
		<ul>
			{props.chirps.map( chirp => (
					<Chirp
						key= {chirp.id}
						text= {chirp.text}
						upvotes= {chirp.upvotes}
						id= {chirp.id}
						onUpdateRefresh = {props.onUpdateRefresh }
					/>
			))}
		</ul>
	);
}


import React from 'react';
import Chirp from './Chirp';

export default function Chirps(props) {
	return (
		<React.Fragment>
			<h1>Chirps</h1>
			<ul>
				{props.chirps.map( chirp => (
						<Chirp
							key= {chirp.id}
							text= {chirp.text}
							id= {chirp.id}
						/>
				))}
			</ul>
		</React.Fragment>
	);
}


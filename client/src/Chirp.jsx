import React from 'react';

export default function Chirp(props) {
	return (
		<li>
			{props.id} -- {props.text}
		</li>
	);
}

import React from 'react';
import Upvote from './Upvote';

export default function Chirp(props) {
	return (
		<li>
			{props.id} -- {props.text.toUpperCase()}
			&nbsp;
			<Upvote
				upvotes = {props.upvotes}
				id = {props.id}
				onUpdateRefresh= {props.onUpdateRefresh}
			/>
		</li>
	);
}

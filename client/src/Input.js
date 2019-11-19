import React from 'react';

export default function Input(props) {
		return (
			<form onSubmit={props.onSubmit}>
				<label>
					Chirp:&nbsp;
					<input type="text" value={props.value} onChange={props.onChange} />
				</label>
				&nbsp;
				<input type="submit" value="Submit" />
			</form>
		);
}

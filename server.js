// Create express app
const express = require('express');
const app = express();
const db = require('./database.js');
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Cache-Control', 'no-cache');
	next();
});

// Server port
const HTTP_PORT = 3001;

// Start server
app.listen(HTTP_PORT, () => {
	console.log(`Server running on port ${HTTP_PORT}`);
});

// Root endpoint
app.get('/', (req, res, next) => {
	res.redirect('/index');
});

app.get('/index', (req, res, next) => {
	const chirps = 'SELECT * FROM chirps';

	db.all(chirps, (err, rows) => {
		if (err) {
			res.status(400).json({'error': err.message});
			return;
		}

		res.send({'chirps': rows}).status(200);
	});
});

// Default response for any other request
app.use('*', (req, res) => {
	res.send({
		error: 'This is not a supported request.'
	}).status(404).end();
});

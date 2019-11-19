// Create express app
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
const db = require('./database.js');

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
	const chirps = 'SELECT * FROM chirps ORDER BY id DESC';

	db.all(chirps, (err, rows) => {
		if (err) {
			res.status(400).json({'error': err.message});
			return;
		}

		res.send({'chirps': rows}).status(200);
	});
});

app.post('/index', (req, res, next) => {
	const reqBody = req.body;
	let errors = [];

	if (!reqBody.text || typeof(reqBody.text) !== 'string') {
		errors.push('text');
	}

	if (errors.length) {
		res.status(400).json(
			{
				'errors': `Please fix the following field(s): ${errors.join(', ')}.`
			}
		);
		return;
	}

	const data = {
		text: reqBody.text
	}

	let sql ='INSERT INTO chirps (text) VALUES (?)';
	const params =[data.text];

	db.run(sql, params, function (err, result) {
		if (err){
			res.status(400).json({"error": err.message})
			return;
		}

		axios.post('https://bellbird.joinhandshake-internal.com/push', {
			chirp_id: this.lastID
		})
		.then(res => {
			console.log(`chirp ${this.lastID} sent`);
		})
		.catch(err => {
			console.log(`error sending chirp ${this.lastID}`);
		});


		res.send({
			'id' : this.lastID,
			'chirp': data
		}).status(201);
	});
});

app.post('/index/:id', (req, res, next) => {
	const reqBody = req.body;

	let errors = [];

	if (!Number.isInteger(reqBody.upvotes)) {
		errors.push('upvotes');
	}

	if (errors.length) {
		res.status(400).json(
			{
				'errors': `Please fix the following field(s): ${errors.join(', ')}.`
			}
		);
		return;
	}

	const data = {
		upvotes: reqBody.upvotes
	}

	let sql ="UPDATE chirps SET upvotes = ? WHERE id = ?";

	params = [data.upvotes, req.params.id]

	db.run(sql, params, function (err, result) {
		if (err){
			res.status(400).json({"error": err.message})
			return;
		}

		res.send({
			'id' : parseInt(req.params.id),
			'chirp': data
		}).status(201);
	});
});


// Default response for any other request
app.use('*', (req, res) => {
	res.send({
		error: 'This is not a supported request.'
	}).status(404).end();
});

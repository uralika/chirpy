const sqlite3 = require('sqlite3').verbose(),
	DBSOURCE = 'db.sqlite',
	server = require('./server'),
	urlPrefix = 'http://localhost:8000/';


let db = new sqlite3.Database(DBSOURCE, (err) => {
	if (err) {
	// Cannot open database
	console.error(err.message)
	throw err
	} else {
		console.log('Connected to the SQLite database.')
		db.run(`CREATE TABLE chirps (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			text string NOT NULL,
			upvotes INTEGER DEFAULT 0
			)`,
		(err) => {
			if (err) {
				// Table already created
			} else {
				// Table just created, creating some rows
				let insert = 'INSERT INTO chirps (text) VALUES (?)';
				db.run(insert, ['this is the first chirp']);
				db.run(insert, ['this is the second chirp']);
			}
		});
	}
});


module.exports = db;

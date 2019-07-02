var mysql = require('mysql');
var connection;

if (process.env.JAWSDB_URL) {
	// *** HEROKU DB 
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	// *** LOCAL DB 
	connection = mysql.createConnection({
		port: 3306,
		host: 'localhost',
		user: 'root',
		password: 'MyNewPass',
		database: 'burgers_db'
	})
};


// ** MYSQL CONNECTION CODE ** ---->START
connection.connect(function(err) {
  if (err) {
    console.error('ERROR: MySQL connection error -- ' + err.stack + '\n\n');
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId + '\n\n');
});
// ** MYSQL CONNECTION CODE ** ---->END


module.exports = connection;

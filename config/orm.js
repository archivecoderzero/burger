// Import the MySQL connection object
var connection = require ('./connection.js');



// Helper function for generating My SQL syntax
function objToSql(ob) {
	var arr = [];
	for (var key in ob) {
		arr.push(key + "=" + ob[key]);
	}
	return arr.toString();
}

// Create the ORM object to perform SQL queries
var orm = {
	// Function that returns all table entries
	selectAll: function(tableInput, cb) {
		// Construct the query string that returns all rows from the target table
		var queryString = "SELECT * FROM " + tableInput + ";";

		// Perform the database query
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results in callback
			cb(result);
		});
	},

	delete: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table + " WHERE " + condition;

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

	// Function that insert a single table entry
	insertOne: function(table, cols, vals, cb) {
		// Construct the query string that inserts a single row into the target table
		var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += "?"
		queryString += ") ";
		console.log(vals +" test 1");

		
		// it should look like this  : INSERT INTO burgers (burger_name) VALUES (?) , this que

		// Perform the database query

		// console.log(queryString +" Query String");

		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}
			// Return results in callback
			cb(result);
		});
	},

	// Function that updates a single table entry
	updateOne: function(table, objColVals, condition, cb) {
		// Construct the query string that updates a single entry in the target table
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		// generate usable query
		queryString += objToSql(objColVals);
		// console.log(objColVals) + "mid query";
		queryString += " WHERE ";
		queryString += condition;
		// Perform the database query
		// console.log(queryString) + "final query";
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results in callback
			cb(result);
		});
	},

};

// Export the orm object for use in other modules
module.exports = orm;
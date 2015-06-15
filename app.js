
var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , client
  , query;

client = new pg.Client(connectionString);
client.connect();





/*
	trys to enter the user into the database.
*/
function create_new_user (name,age,difficulty) {

	client.connect(function (err) {
		
		if(err){
			//there was a connection error
			return;
		}

		//connected
	});





	query.on('end', function(result) { client.end(); });
	return true;// or false
}










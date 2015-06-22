var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , password = require('password-hash-and-salt')
  , port = process.env.PORT 
  , client
  , query
  , auth = require('./auth.js')
  , accessTokens = [];  //to sore all valid tokens

client = new pg.Client(connectionString);
client.connect();

var exports = module.exports = {};

exports.createUser = function(req, res, next){
	console.log('in createUser');
	if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password') 
		|| !req.body.hasOwnProperty('difficulty') || !req.body.hasOwnProperty('name') 
		|| !req.body.hasOwnProperty('age')){
		res.statusCode = 400;
    	return res.send('Error 400: Post syntax incorrect.');
	}

	password(req.body.password).hash(function(error, hash) {
	  if(error){
	  	res.statusCode = 400;
	    res.send('Error 400: unable to add user');
	  }
	  // Store hash (incl. algorithm, iterations, and salt) 
	  query = client.query('Insert into logins(username, password) values($1, $2)', [req.body.username, hash]);
	  
	  query.on('error', function(error){
	  	res.statusCode = 400;
	    res.send('Error: username already exists');
	  });

	  query.on('end', function(result){
	  	if(result.rowCount === 0){
	  		res.statusCode = 400;
	    	res.send('Error: username already exists');	
	  	}
	  	addDetails(req, res, next);
	  });

	});
}

var addDetails = function(req, res, next){
	query = client.query('select id from logins where username = $1', [req.body.username]);

	query.on('end', function(result){
		console.log(result);
		if(result.rowCount === 0){
			res.statusCode = 400;
	    	res.send('Cannot find id');	
		}
		query = client.query('Insert into users(id, name, age, difficulty) values ($1, $2, $3, $4)', [result.rows[0].id, req.body.name, req.body.age, req.body.difficulty]);
	});

	query.on('end', function(result){
		if(result.rowCount === 0){
			res.statusCode = 400;
	    	res.send('Cannot find id');	
		}
	});

	query = client.query('SELECT * from logins where username = $1', [req.body.username]);

  query.on('row', function(result){
    res.send(auth.addToken(result));
  });
	
}

exports.getColours = function (req, res){
	var id = auth.getId(req, res);

	query = client.query('select rgb from avcolours where user_id = $1', [id]);

	query.on('end', function(result){
		if(result.rowCount === 0){
			res.statusCode = 400;
			return res.send('Error 400: no rows returned for that id');
		}
		else{
			return res.send(result.rows);
		}

	});
}

exports.removeColours = function (req, res){
	var id = auth.getId(req, res);

	query = client.query('delete from avcolours where user_id = $1', [id]);

	query.on('end', function(result){
		if(result.rowCount === 0){
			res.statusCode = 400;
			return res.send('Error 400: could not delete colours');
		}
		else{
			return res.json('Successfully Deleted');
		}
	})


}

exports.addColour = function (req, res){
	if(!req.body.hasOwnProperty('rgb')){
		res.statusCode = 400;
    	return res.send('Error 400: Post syntax incorrect.');
	}

	var id = auth.getId(req, res);

	query = client.query('Insert into avcolours values ($1, $2)', [id, req.body.rgb]);

	query.on('end', function(result){
		if (result.rowCount === 0){
			res.statusCode = 400;
			return res.send('Error 400: could not add colour');
		}
		else{
			return res.json('Successfully Added');
		}
	});


}
// use the express middleware
var express = require('express');
var password = require('password-hash-and-salt');

var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , start = new Date()
  , port = process.env.PORT
  , client
  , query;

  client = new pg.Client(connectionString);
  client.connect();

// make express handle JSON and other requests
var bodyParser = require('body-parser');

// use cross origin resource sharing
var cors = require('cors');

// instantiate app
var app = express();

// make sure we can parse JSON
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// serve up files from this directory 
app.use(express.static(__dirname));
// make sure we use CORS to avoid cross domain problems
app.use(cors());

app.post('/login', function(req, res){
  console.log(req.body);
  if(!req.body.hasOwnProperty('user') || !req.body.hasOwnProperty('password')){
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.')
  }

  //executing sql query to retieve encrypted password
  query = client.query('SELECT password from logins where username = $1', [req.body.user]);
  console.log(req.body.user);

  query.on('row', function(result){
    // Verifying a hash 
    password(req.body.password).verifyAgainst(result.password, function(error, verified) {
      console.log('in row');
        if(error)
            throw new Error('Something went wrong! ->' + error);
        if(!verified) {
          //wrong password
          res.statusCode = 401;
          res.send('Error 401: wrong user or password');
        } else {
            //send bac confirmation
            res.send('all verified');
        }
    });
  });

    //error checking for invalid username
  query.on('end', function(result){
    console.log(result);
    if(result.rowCount === 0){
      res.statusCode = 401;
      console.log('inside end 0 rowCount');
      res.send('Error 401: wrong username or password');
    }
  });
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
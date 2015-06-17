// use the express middleware
var express = require('express');
var password = require('password-hash-and-salt');
var multer  = require('multer');
var auth = require('./middleware/auth.js');

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

var done=false;

// make sure we can parse JSON
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// serve up files from this directory 
app.use(express.static(__dirname));
// make sure we use CORS to avoid cross domain problems
app.use(cors());

/*Configure the multer.*/

app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));

/*Handling routes.*/

app.get('/',function(req,res){
      res.sendfile("index.html");
});

app.all('/api/*', function(req, res){
  
});

app.post('/api/photo',function(req,res){
  if(done==true){
    console.log(req.files);
    res.end("To view image on server https://murmuring-cliffs-3537.herokuapp.com/" + req.files.userPhoto.path);
  }
});

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
            // res.send('all verified');
            console.log('adding token');
            res.send(auth.addToken(result));
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


// use PORT set as an environment variable
// var server = app.listen(process.env.PORT, function() {
//     console.log('Listening on port %d', server.address().port);
// });

var server = app.listen(50000, function() {
    console.log('Listening on port %d', server.address().port);
});
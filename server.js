// use the express middleware
var express = require('express');
var password = require('password-hash-and-salt');
var multer  = require('multer');
var auth = require('./middleware/auth.js');
var user = require('./middleware/user.js');

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
app.use(bodyParser.urlencoded({limit: '5mb'}));
app.use(bodyParser.json({limit: '5mb'}));

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

/* Runs all refrences with /api though the authenticator */
app.all('/api/*', auth.authToken);

/* Adds a new user to the system and returns a valid access token*/
app.post('/newUser', user.createUser);

app.get('/api/project/:id', user.getProject)

app.get('/api/colours', user.getColours);

app.get('/api/projectDetails', user.getProjectDetails);

app.post('/api/colour', user.addColour);

app.post('/api/project', user.uploadFile);


/* Route for logging in, which must be done before anything
    or a new user must be made */
app.post('/login', auth.login);


app.post('/addFriends', function(req, res){

});

/* Logs out the current user bu removing their access token */
app.post('/logout',[auth.removeToken], function(req, res){
  res.json('successfully logged out');
});

app.delete('/api/colours', user.removeColours);


// use PORT set as an environment variable
var server = app.listen(process.env.PORT || 50000, function() {
    console.log('Listening on port %d', server.address().port);
});

// var server = app.listen(50000, function() {
//     console.log('Listening on port %d', server.address().port);
// });
var url = require('url')
  , jwt = require('jwt-simple')
  , moment = require('moment');

var accessTokens = [];  //to sore all valid tokens

var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , port = process.env.PORT 
  , client
  , query
  , tokenSecret = 'mySecret';

client = new pg.Client(connectionString);
client.connect();

var exports = module.exports = {};

exports.authToken = function(req, res, next){

  // Parse the URL, we might need this
  var parsed_url = url.parse(req.url, true)
  /**
   * Take the token from:
   * 
   *  - the POST value access_token
   *  - the GET parameter access_token
   *  - the x-access-token header
   *    ...in that order.
   */
  var token = (req.body && req.body.access_token) || parsed_url.query.access_token || req.headers["x-access-token"];

  if (token) {
    console.log(token);
    console.log(accessTokens);
    var verified = false;
    //check if the token passed is a valid one
    for(var i=0; i<accessTokens.length; i++){
      if(accessTokens[i] === token){
        verified = true;
      }
    }

    if (verified){
    //make sure the user is still a valid user
      try {
              //decode token
              var decoded = jwt.decode(token, tokenSecret);

              //checks if the token has expired
              if (decoded.exp <= Date.now()) {
                res.statusCode = 400;
                return res.send('Access token has expired');
              }

              //to check if valid user
              query = client.query('SELECT id FROM logins WHERE id = $1', [decoded.iss]);

              //sql sucessful so just return back
              query.on('row', function(result){
                console.log('auth sucessfull');
                return next();
              });

              //if no result is returned then user does not exist
              query.on('end', function(result){
                if(result.rowCount === 0){
                  console.log('in end')
                  return res.end('Cannot authenticate token', 400);
                }
              });

            } catch(err){
              console.log('caught error ' +err);
              return res.end('token authentication failed', 400);
            }      
        } else{
          res.statusCode = 400;
          return res.send('Invalid access token');
        }
      } else {
           return res.end('Cannot authenticate token', 400);
      }

}

exports.addToken = function(result){
  var expires = moment().add(7, 'days').valueOf()       
  var token = jwt.encode(
    {
      iss: result.id,
      exp: expires
    }, 
    tokenSecret
  );
  //save token to list
  accessTokens.push(token);
  //send token          
  return ({
    token : token,
    expires : expires
  });
}


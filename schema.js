var password = require('password-hash-and-salt');
var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , client
  , query;

client = new pg.Client(connectionString);
client.connect();


create_users_table ();

create_login_table();

create_friends_table();

query.on('end', function(result) { client.end(); });






/*
  creates table for user infomation
*/
function create_users_table () {

  var queryString = "Drop table if exists users; create table users (id serial primary key, name varchar(80) NOT NULL,username varchar(80)  UNIQUE NOT NULL, age int NOT NULL, difficulty varchar(6) DEFAULT 'easy', friendCode VARCHAR  NOT NULL, constraint chk_diff check (difficulty in ('easy', 'medium', 'hard')) )";
  query = client.query(queryString);
  //if successfull
  query.on('end', function(result){
    console.log('Creted Table users ' + result);
  });

  //error checking
  query.on('error', function(error){
    throw new Error('user table not created-> ' + error);
  });

}


function create_avalible_colours_table () {
  var queryString = "Drop table if exists AvColours; create table AvColours (user_id integer REFERENCES users (id), rgb VARCHAR)";
  query = client.query(queryString);
  //if successfull
  query.on('end', function(result){
    console.log('Creted Table AvColours ' + result);
  });

  //error checking
  query.on('error', function(error){
    throw new Error('AvColours table not created-> ' + error);
  });
}


/*
  creates a project table
*/
function create_project_table () {

  //creating projects table structure
  query = client.query('Drop table if exists projects; CREATE TABLE projects (project_id serial PRIMARY KEY, user_id integer, project_name VARCHAR, private boolean DEFAULT true, CONSTRAINT user_id FORGEIGN KEY (user_id) REFERENCES users (id))');

  //if successfull
  query.on('end', function(result){
  console.log('Creted Table projects');
  });

  //error checking
  query.on('error', function(error){
   throw new Error('Table not created -> ' + error);
  });
}




/*
  creates the friends table
*/
function create_friends_table () {

  //creating freinds table structure
  query = client.query('Drop table if exists freinds; CREATE TABLE freinds (user integer NOT NULL, freind integer NOT NULL, CONSTRAINT user FORGEIGN KEY (id) REFERENCES users (id),CONSTRAINT freind FORGEIGN KEY (id) REFERENCES users (id))');

  //if successfull
  query.on('end', function(result){
  console.log('Creted Table friends');
  });

  //error checking
  query.on('error', function(error){
   throw new Error('Table not created -> ' + error);
  });
}



/*
  creates the user login details
*/
function create_login_table(){
//creating login table structure
query = client.query('Drop table if exists logins; CREATE TABLE logins (id serial PRIMARY KEY, username varchar(80) UNIQUE NOT NULL, password varchar(500) NOT NULL, CONSTRAINT username FORGEIGN KEY (username) REFERENCES users (username))');

//if successfull
query.on('end', function(result){
  console.log('Creted Table login');
});

//error checking
query.on('error', function(error){
  throw new Error('Table not created -> ' + error);
});


password('password1').hash(function(error, hash) {
  if(error){
      throw new Error('Something went wrong!');
  }
  console.log('in password1');
  // Store hash (incl. algorithm, iterations, and salt) 
  query = client.query('Insert into logins(username, password) values($1, $2)', ['sam', hash]);
  
  query.on('error', function(error){
      throw new Error('failed on inserting first val ->' + error);
  });

});
}


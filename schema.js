var password = require('password-hash-and-salt');
var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , client
  , query;

client = new pg.Client(connectionString);


//
client.connect();

start();

//client.end();





function start () {


 dropall();

create_users_table ();

create_login_table();


create_avalible_colours_table()


create_project_table();


create_friends_table();


}


function dropall () {

	var queryString = "drop table if EXISTS users;drop table if EXISTS AvColours;drop table if EXISTS projects;drop table if EXISTS logins;drop table if EXISTS freinds;";
  query = client.query(queryString);
 

  //error checking
  query.on('error', function(error){
    throw new Error('failed to drop all tables -> ' + error);
  });


   //if successfull
  query.on('end', function(result){
    console.log('dropped all');
    
  });
}




/*
  creates table for user infomation
*/
function create_users_table () {

  var queryString = "create table IF NOT EXISTS users (id serial primary key, name varchar(80) NOT NULL, age int NOT NULL, difficulty varchar(6) DEFAULT 'easy', friendCode VARCHAR, constraint chk_diff check (difficulty in ('easy', 'medium', 'hard')) )";
  query = client.query(queryString);
 

  //error checking
  query.on('error', function(error){
    throw new Error('user table not created-> ' + error);
  });


   //if successfull
  query.on('end', function(result){
    console.log('Creted Table users ' + result);
    
  });

}


function create_avalible_colours_table () {
	
  var queryString = "create table IF NOT EXISTS AvColours (user_id integer , rgb VARCHAR)";
  query = client.query(queryString);


  //error checking
  query.on('error', function(error){
    throw new Error('AvColours table not created-> ' + error);
  });

    //if successfull
  query.on('end', function(result){
    console.log('Creted Table AvColours ' + result);
    
  });
}


/*
  creates a project table
*/
function create_project_table () {
	

  //creating projects table structure
  query = client.query('CREATE TABLE IF NOT EXISTS projects (project_id serial PRIMARY KEY, user_id integer, project_name VARCHAR, private boolean DEFAULT true, link varchar(400))');

  
  //error checking
  query.on('error', function(error){
   throw new Error('Table not created -> ' + error);
  });


  //if successfull
  query.on('end', function(result){
  console.log('Creted Table projects');
  
  });

}






/*
  creates the user login details
*/
function create_login_table(){
	
//creating login table structure
query = client.query('CREATE TABLE IF NOT EXISTS logins (id serial PRIMARY KEY, username varchar(80) UNIQUE NOT NULL, password varchar(500) NOT NULL)');



//error checking
query.on('error', function(error){
  throw new Error('Table not created -> ' + error);
});

//if successfull
query.on('end', function(result){
  console.log('Creted Table login');
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



  query.on('end', function(result){
  console.log('added sam');
  
});
  

});
}





/*
  creates the friends table
*/
function create_friends_table () {

  //creating freinds table structure
  query = client.query('CREATE TABLE IF NOT EXISTS freinds (userId integer NOT NULL, freind integer NOT NULL)');

  

  //error checking
  query.on('error', function(error){
   throw new Error('Table not created -> ' + error);
  });

//if successfull
  query.on('end', function(result){
  console.log('Creted Table friends');



  });



}

var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , client
  , query;

client = new pg.Client(connectionString);
client.connect();

//creating login table structure
query = client.query('Drop table if exists logins; CREATE TABLE logins (id serial PRIMARY KEY, username varchar(80) UNIQUE NOT NULL, password varchar(500) NOT NULL)');

//if successfull
query.on('end', function(result){
  console.log('Creted Table login');
});

//error checking
query.on('error', function(error){
  throw new Error('Table not created -> ' + error);
});

query = client.query('Drop table if exists users; create table users (id int primary key, name varchar(80), age int, difficulty varchar(6), constraint chk_diff check (difficulty in ($1, $2, $3)) )' ['easy', 'medium', 'hard']);

//if successfull
query.on('end', function(result){
  console.log('Creted Table users');
});

//error checking
query.on('error', function(error){
  throw new Error(' failed on :' + i);
});


query.on('end', function(result) { client.end(); });



/*
	trys to enter the user into the database.
*/
function create_new_user (url, name, age, difficulty) {
	var Posturl = url+'/newUser';
    var newUser = { "name" : name, "age" : age, "difficulty" : difficulty };

    $.post(Posturl,newUser, function(data) {

      if(data.error){
        //error in request or in database insert

        //false
      }


      //true
    }, 'json');
}


/*
	add friend to user
*/
function add_friend (url, user, friend, friend_code) {
	var Posturl = url+'/addFriend';

	var friendRequest = {"user" : user, "friend" : friend, "code" : friend_code};

	$.post(Posturl,friendRequest, function(data) {

      if(data.error){
        //error in request or in database insert

        //false
      }


      //true
    }, 'json');

}


/*
	
*/
function function_name (argument) {
	// body...
}




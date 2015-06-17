

/*
	called to log the user into there account
*/
function login (username, password) {

	var Posturl = url+'/login';
	var loginDetails = {"user" : username, "password" : password};

	$.post(Posturl,loginDetails, function(data) {

      //error
      if(/*error*/){

      }


      //true
      window.localStorage.setItem('token', data.token);

      setToken();

    }, 'json');
}


/*
	set the token header
*/
function setToken () {

	$.ajaxSetup({
      headers: {
        'x-access-token': token
      }
    });

}



/*
	trys to enter the user into the database.
*/
function create_new_user (url, name, username, password, age, difficulty) {
	var Posturl = url+'/newUser';
    var newUser = { "name" : name,"username" : username,"password" : password, "age" : age, "difficulty" : difficulty };

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
	adds colour to the users selection
*/
function add_colour (url, user, rbg) {
  var Posturl = url+'/addColour';

  var Colour = {"rgb":rgb};

  $.post(Posturl,Colour, function(data) {

      if(data.error){
        //error in request or in database insert

        //false
      }


      //true
    }, 'json');
}



/*
	gets the colours the user has made
*/
function get_colours (url, user) {
	var GetUrl = url+'/getColours';

	$.get(GetUrl, function(data) {

		if(data.error){
			//error
		}


		//put json into array.


	});
}


/*
	method to delete a colour the user has avalible
*/
function delete_colour (url, users, colour) {
	//use all in json if delete all or the rbg of the individual colour
	
	var DelUrl = url+'/deleteColour'

	var DelColour = {"colour" : colour};

	$.ajax({
      url: DelUrl,
      type: 'DELETE',
      dataType: json,
      data: DelColour,
      success:function(result){
        
        if(result.error){
        	//error        	
        }

        //delete success

      }

    });

}

//new projects




//get project



//get friends project
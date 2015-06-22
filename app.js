

/*
	called to log the user into there account
*/
function login (url, username, password) {

	var Posturl = url+'/login';
	var loginDetails = {"user" : username, "password" : password};


	$.ajax({
      url: Posturl,
      type: 'Post',
      dataType: 'json',
      data: loginDetails,
      success:function(result){
        
        //success
        console.log("login success");
        window.localStorage.setItem('token', result.token);

      	setToken();

        //return user details
        return true;

      },
      error: function (error) {

      	// error

        alert(error);


        return false;

      }

    });
}

/*
  logs the user out
*/
function logout (url) {

  var Posturl = url+'/logout';

  $.ajax({
      url: Posturl,
      type: 'Post',
      //dont need file with user name, just remove the token???
      success:function(result){
        
        //success
        console.log("logged out");
        return true;        

      },
      error: function (error) {

        // error
        console.log("error ion log out -> "+ JSON.stringify(error));

        alert(error);

        return false;
      }

    });
}

/*
	set the token header
*/
function setToken () {
  var token = window.localStorage.getItem("token");
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

    $.ajax({
      url: Posturl,
      type: 'Post',
      dataType: 'json',
      data: newUser,
      success:function(result){
        
        //success
        console.log('success, newUser created ->'+  JSON.stringify(result));

        console.log("login success");
        window.localStorage.setItem('token', result.token);

        setToken();

        return true;

      },
      error: function (error) {

      	// error

        console.log("error in create new user -> "+ JSON.stringify(error));
        alert(error);

        return false;

      }

    });
}


/*
	add friend to user
*/
function add_friend (url, friend_user_name, friend_code) {
	var Posturl = url+'/addFriend';

	var friendRequest = {"friend" : friend_user_name, "code" : friend_code};

	$.ajax({
      url: Posturl,
      type: 'Post',
      dataType: 'json',
      data: friendRequest,
      success:function(result){
        
        //success
        console.log("new friend added");
        return true;

      },
      error: function (error) {

      	// error
        console.log("error in adding friend -> "+ JSON.stringify(error));
        alert(error);

        return false;

      }

    });

}


/*
	adds colour to the users selection
*/
function add_colour (url, rgb) {
  var Posturl = url+'/api/colour';

  var Colour = {"rgb":rgb};

  $.ajax({
      url: Posturl,
      type: 'POST',
      dataType: 'json',
      data: Colour,
      success:function(result){
        
        //success
        console.log("added new colour");
        return 1;

      },
      error: function (error) {

      	// error
        console.log("failed to added new colour -> "+ JSON.stringify(error));
        return -1;

      }

    });
}



/*
	gets the colours the user has made
*/
function get_colours (url) {
	var GetUrl = url+'/colours';

	$.ajax({
      url: GetUrl,
      type: 'GET',
      success:function(result){
        
        //success
        console.log('got all the users colours-> '+ JSON.stringify(result));

       var colour=[];

       for(var i=0;i<result.length;i++){
        colour.push(result[i].rgb);
       }

        return colour;

      },
      error: function (error) {

      	// error

        console.log("error geting users colours -> "+ JSON.stringify(error));


        var  res = {"error" : error};

        return res;

      }

    });
}


/*
	method to delete a colour the user has avalible
*/
function delete_colour (url) {
	//use all in json if delete all or the rbg of the individual colour
	
	var DelUrl = url+'/api/colours'

	$.ajax({
      url: DelUrl,
      type: 'DELETE',
      success:function(result){
        
        //success

        console.log("deleted the user colour");
        return true;

      },
      error: function (error) {

      	// error

        console.log("error deleteing thye user colour -> "+ JSON.stringify(error));

      return false;
      }

    });

}

//new projects

/*
  uploads a new project the user has created
*/
function new_project (url,data, projectName, privateP) {

  //
  //
  //upload a file here 
  //
  //
  //

  var Posturl = url+"/api/project";
  var projectDetails = {"data":data,"project" : projectName, "privateP" : privateP};

  $.ajax({
      url: Posturl,
      type: 'POST',
      dataType: 'json',
      data: projectDetails,
      success:function(result){
        
        //success
        console.log("added new project");

        return true;

      },
      error: function (error) {

        // error
        console.log("failed to added new project -> "+JSON.stringify(error));
        return false;

      }

    });

}

//get project

/*
  donwloads images of projects the user has done in the past
*/

function getProjects (url, user) {

  //
  //
  //
  //DOWNLOAD PHOTOS ????????????
  //
  //
  //
  //
  var GetUrl = url+"/getproject";
  var userDetails = {"user" : user};

  $.ajax({
      url: GetUrl,
      type: 'GET',
      dataType: 'json',
      data: userDetails,
      success:function(result){
        
        //success
        console.log('got all the users projects-> '+ JSON.stringify(result));


        return result;

      },
      error: function (error) {

        // error

        console.log("error geting users projects -> "+ JSON.stringify(error));


        var  res = {"error" : error};

        return res;

      }

    });


}



//get friends project
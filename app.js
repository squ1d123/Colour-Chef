

/*
	trys to enter the user into the database.
*/
function create_new_user (url,name,age,difficulty) {
	var Posturl = url+'/newUser'
    var newUser = { "name" : name, "age" : age, "difficulty" : difficulty };

    $.post(Posturl,newUser, function(data) {

      if(data.error){
        //error in request or in database insert

        //false
      }


      //true
    }, 'json');
}










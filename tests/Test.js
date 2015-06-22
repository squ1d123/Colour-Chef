var ulr = abc;
var nameName = sam;
var password = password1;
var difficulty = easy;
var age = Math.floor(Math.random() * 11);
var user = "John";
var friendName = "Adolf";
var friendCode = 123ABC;
var projectName = "ProjectName";
var privateP = true;

//Make random colour
function rgb(r, g, b){
 	var r = Math.floor(Math.random() * 255);
	var g = Math.floor(Math.random() * 255);
	var b = Math.floor(Math.random() * 255);
	var col = "rgb("+r+","+g+","+b+")";
	return col;
}

//Test login
function testLogin(){
	assert.equals(login(url, nameName, password), true);
}

//Test logout
function testLogout(){
	assert.equals(logout, true);
}

//Test setToken
function testSetToken(){
}

//Test Create new user
function test_create_new_user(){
	asert.equals(create_new_user(url, name, username, password, age, difficulty), true);
}

//Test Add friend
function test_add_friend(){
	assert.equals(add_friend(url, user, friendName, friendCode), true);
}

//Test add colour
function test_add_colour(){
	assert.equals(add_colour(url, user, rgb(r,g,b)). true);
}

//Test get colours
function testGetColours(){
	assert(get_colours(url, user), true);
}

//Test delete colours
function testDeleteColours(){
	assert(delete_colours(url,user,rgb(r,g,b)), true);
}

//Test delete colours
function test_new_project(){
	assert(new_project(url, user,projectName,privateP ), true);
}

//Test get project
function test_get_project(){
	assert(get_project(url,user), true);
}

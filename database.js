var type = 0;

var db_functions = (function($){
	var postPosts = function(topic, body, user_id){
		return $.ajax({
			type:"POST",
			url:"postPost.php",
			data: {topic:topic, body:body, user_id:user_id},
			success: function(response){
                console.log(response);
				document.getElementById("anon").style.display = "none";
				document.getElementById("submitbtn").style.display = "block";
			},
			error: function(response){
                console.log(response);
			}
		});
	}
	
	var postAccount = function(username, passcode, signIn){
		return $.ajax({
			type:"POST",
			url:"./postAccount.php",
			data: {username:username, passcode:passcode, signIn:signIn},
			success: function(response){
                console.log(response);
				if(Number.isInteger(parseInt(response))){
					localStorage.setItem("user_id", response);
					document.getElementById("signin").style.display = "none";
					document.getElementById("submitbtn").style.display = "block";
					if(type === 3){
						document.getElementById("signin").style.display = "none";
						document.getElementById("Profile").style.display = "block";
						getUsername();
					}
				}
				else{
					document.getElementById("signinreply").innerHTML = response;
				}
			},
			error: function(response){
                console.log(response);
			}
		});
	}
	
	var postVotes = function(user_id, post_id, vote){
		return $.ajax({
			type:"POST",
			url:"postVote.php",
			data: {user_id:user_id, post_id:post_id, vote:vote},
			success: function(response){
                console.log(response);
			},
			error: function(response){
                console.log(response);
			}
		});
	}
	
	var getAllPosts = function(){
		return $.ajax({
			type:"POST",
			url:"getPost.php",
			data: {},
			success: function(response){
				console.log(response);
                POSTS = eval(response);
				console.log(POSTS);
			},
			error: function(response){
                console.log(response);
			}
		});
	}
	
	var getUserPosts = function(user_id){
		return $.ajax({
			type:"POST",
			url:"getUserPoints.php",
			data: {user_id: user_id},
			success: function(response){
                POSTS = eval(response);
			},
			error: function(response){
                console.log(response);
			}
		});
	}
	
	var getUserName = function(user_id){
		return $.ajax({
			type:"POST",
			url:"getUserPoints.php",
			data: {user_id: user_id},
			success: function(response){
                document.getElementById("profileusername").innerHTML = response;
			},
			error: function(response){
                console.log(response);
			}
		});
	}
	
	return{
		postPosts: postPosts,
		postAccount: postAccount,
		postVotes: postVotes,
		getAllPosts: getAllPosts,
		getUserPosts: getUserPosts,
		getUserName: getUserName
	}
}(jQuery));

function postPost(topic, body, user_id){
	$.when(db_functions.postPosts(topic, body, user_id)).done(function(){
		console.log("postPost finish");
	});
}

function postAccount(username, passcode, signIn){
	$.when(db_functions.postAccount(username, passcode, signIn)).done(function(){
		getUsername();
		console.log("postAccount finish");
	});
}

function postVotes(user_id, post_id, vote){
	$.when(db_functions.postVotes(user_id, post_id, vote)).done(function(){
		console.log("postVotes finish");
	});	
}

function getAllPosts(){
	$.when(db_functions.getAllPosts()).done(function(){
		console.log("getAllPosts finish");
		return POSTS;
	});
	
}

function getUserPosts(user_id){
	$.when(db_functions.getUserPosts(user_id)).done(function(){
		console.log("getUserPosts finish");
		return POSTS;
	});
}

function getUN(user_id){
	$.when(db_functions.getUserName(user_id)).done(function(){
		console.log("getUserName finish");
	});
}

function showWrite(){
	type = 1;
	document.getElementById('write_nav').className = 'nav-item active';
	document.getElementById('Community_nav').className = 'nav-item';
	document.getElementById('Profile_nav').className = 'nav-item';
	document.getElementById('About_nav').className = 'nav-item';
	
	document.getElementById("write").style.display = 'block';
	document.getElementById("Community").style.display = 'none';
	document.getElementById("Profile").style.display = 'none';
	document.getElementById("About").style.display = 'none';
}

function showCommunity(){
	type = 2;
	document.getElementById('write_nav').className = 'nav-item';
	document.getElementById('Community_nav').className = 'nav-item active';
	document.getElementById('Profile_nav').className = 'nav-item';
	document.getElementById('About_nav').className = 'nav-item';
	
	document.getElementById("write").style.display = 'none';
	document.getElementById("Community").style.display = 'block';
	document.getElementById("Profile").style.display = 'none';
	document.getElementById("About").style.display = 'none';
	
	getAllPosts();
	console.log(POSTS);
}

function showProfile(){
	type = 3;
	document.getElementById('write_nav').className = 'nav-item';
	document.getElementById('Community_nav').className = 'nav-item';
	document.getElementById('Profile_nav').className = 'nav-item active';
	document.getElementById('About_nav').className = 'nav-item';
	
	document.getElementById("write").style.display = 'none';
	document.getElementById("Community").style.display = 'none';
	document.getElementById("Profile").style.display = 'block';
	document.getElementById("About").style.display = 'none';
	
	getUsername();
}

function showAbout(){
	type = 4;
	document.getElementById('write_nav').className = 'nav-item';
	document.getElementById('Community_nav').className = 'nav-item';
	document.getElementById('Profile_nav').className = 'nav-item';
	document.getElementById('About_nav').className = 'nav-item active';
	
	document.getElementById("write").style.display = 'none';
	document.getElementById("Community").style.display = 'none';
	document.getElementById("Profile").style.display = 'none';
	document.getElementById("About").style.display = 'block';
}

var signIn = true;
function toggleLogin(){
	if(document.getElementById("sign-in").className === "text-muted"){
		document.getElementById("sign-in").className = "";
		document.getElementById("register").className = "text-muted";
		signIn = true;
	}
	else{
		document.getElementById("register").className = "";
		document.getElementById("sign-in").className = "text-muted";
		signIn = false;
	}
}
function loginRegister(){
	console.log(document.getElementById("InputEmail1").value + document.getElementById("InputPassword1").value + signIn);
	var returnValue = postAccount(document.getElementById("InputEmail1").value, document.getElementById("InputPassword1").value, signIn);
	if(returnValue === "Login Successful"){
		console.log(returnValue + "0000");
		
	}
	else{
		document.getElementById("signinreply").innerHTML = returnValue;
	}
}

function submitPost(){
	console.log(localStorage.getItem("user_id"));
	if(localStorage.getItem("user_id") === "-1"){
		document.getElementById("anon").style.display = "block";
		document.getElementById("submitbtn").style.display = "none";
	}
	else{
		postPost(document.getElementById("wordoftheday").innerHTML, document.getElementById("storyTextArea").value, localStorage.getItem("user_id"));
	}
}

function anonToggle(){
	document.getElementById("anon").style.display = "none";
	document.getElementById("signin").style.display = "block";
}

function submitAnon(){
	postPost(document.getElementById("wordoftheday").innerHTML, document.getElementById("storyTextArea").value, -1);
}

function getUsername(){
	console.log("get un");
	if(localStorage.getItem("user_id") === "-1"){
		document.getElementById("signin").style.display = "block";
		document.getElementById("Profile").style.display = "none";
	}
	else{
		getUN(localStorage.getItem("user_id"));
	}
}
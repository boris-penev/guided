
	window.fbAsyncInit = function() {
		FB.init({
			appId      : '1541632769395178',
			status     : true, // check login status
			cookie     : true, // enable cookies to allow the server to access the session
			xfbml      : true  // parse XFBML
		});
		
		// Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
		// for any authentication related change, such as login, logout or session refresh. This means that
		// whenever someone who was previously logged out tries to log in again, the correct case below 
		// will be handled. 
		FB.Event.subscribe('auth.authResponseChange', function(response) {
			// Here we specify what we do with the response anytime this event occurs. 
			if (response.status === 'connected') {
				// logged in facebook and authorized the app
				checkPermissionsAndDoLoginOrWork();
				console.log("CONNECTED");
			} else if (response.status === 'not_authorized') {
				//logged in facebook, not authorized app
				doLogin();
			} else {
				//not logged into facebook
				doLogin();
			}
		});
	};
	
	
	function doLogin() {
		FB.login(function(response){}, {scope:"read_stream"});
	}
	
	function checkPermissionsAndDoLoginOrWork() {
		// read_stream required to read user data
		FB.api("/me/permissions", function(response) {
			if (!response || !(response.data) || !(response.data[0])) {
				doLogin();
			}
			else if (!(response.data[0].read_stream)) {
				doLogin();
			}
			else {
				alert("work");
				doWork();
			}
		});
	}
	
	// Load the SDK asynchronously
	(function(d){
		var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement('script'); js.id = id; js.async = true;
		js.src = "//connect.facebook.net/en_US/all.js";
		ref.parentNode.insertBefore(js, ref);
	}(document));

	// Here we run a very simple test of the Graph API after login is successful. 
	// This testAPI() function is only called in those cases. 
	function doWork() {
		
		FB.api("/me/home?limit=1000",
		/*
		{
			"with": "location"
		},
		*/
		function (response) {
			alert("resp " + response.toSource());
			if (response && !response.error) {
				var div = document.getElementById('content');
				var posts = response.data;
				for (var i=0;i<posts.length;i++)
				{
					//if (!posts[i].place) continue;
					/*
					div.innerHTML = div.innerHTML
						+ "<div>" + posts[i].place.name + " - lat:" 
						+ posts[i].place.location.latitude + " lon:" + posts[i].place.location.longitude + "</div><br/>";
					*/
					
					
					div.innerHTML = div.innerHTML
						+ "<div>" + posts[i].id + "</div><br/>";
					
				}
			}
			if (response && response.error) {
				alert("ERROR: " + response.error.message);
			}
		});
	}
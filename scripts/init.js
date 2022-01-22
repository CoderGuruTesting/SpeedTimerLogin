const firebaseConfig = {
    apiKey: "AIzaSyDqcNp6emfuSO6NI02XqVieQqjXLQInZ4I",
    authDomain: "speedtimer-2.firebaseapp.com",
    databaseURL: "https://speedtimer-2-default-rtdb.firebaseio.com",
    projectId: "speedtimer-2",
    storageBucket: "speedtimer-2.appspot.com",
    messagingSenderId: "180745090172",
    appId: "1:180745090172:web:588dc6489bae5c2e1ac5f9"
};

firebase.initializeApp(firebaseConfig);

function writeUserData(googleProfile, userId, name, email, imageUrl) {
    var userSolveData = [];

	function createSession(type, nameStr) {
		let sessionTemp = {
			type: type,
			times: [],
			scrambles: [],
			name: nameStr
		}

		userSolveData.push(sessionTemp);
	}

	createSession("3x3", "Session 01");

    var check = firebase.database().ref('users').orderByKey().equalTo(googleProfile.id).once("value", function (snapshot) {
        if (snapshot.exists()) {
            var speedtimerReference = firebase.database().ref('users/' + googleProfile.id + '/speedtimerData');
            speedtimerReference.on('value', (snapshot) => {
                const data = snapshot.val();
                localStorage.setItem("speedtimer", JSON.stringify(data));
            });
        } else {
            if(localStorage.getItem("speedtimer") != null) {
                userSolveData = JSON.parse(localStorage.getItem("speedtimer"));
            }

            firebase.database().ref('users/' + userId).set({
                username: name,
                email: email,
                profile_picture: imageUrl,
                speedtimerData: JSON.stringify(userSolveData)
            });
        }
    });
}

function setSpeedtimerData(userId, data) {
    firebase.database().ref('users/' + userId).update({
        speedtimerData: data
    });
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    var userEntity = {
        id: profile.getId(),
        username: profile.getName(),
        email: profile.getEmail(),
        profile_picture: profile.getImageUrl(),
    };

    localStorage.setItem('myUserEntity', JSON.stringify(userEntity));
    localStorage.setItem("signedIn", JSON.stringify(true));

    afterSignIn(userEntity);
}

// document.getElementById("signoutLink").addEventListener("click", function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//         localStorage.removeItem("myUserEntity");
//     });
// });

function afterSignIn(userProfile) {
    var googleProfile = userProfile;

    writeUserData(googleProfile, googleProfile.id, googleProfile.username, googleProfile.email, googleProfile.profile_picture);
}

var script = document.createElement('script');
script.src = "scripts/script.js";
script.async = true;
script.type = "module";
document.body.appendChild(script);
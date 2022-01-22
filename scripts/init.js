document.querySelector(".leftT").innerHTML =
    '<div class="logo"><img src="images/logo1.jpg"></div><div class="text">SpeedTimer</div><div class = "loginUser" loggedout><span class="g-signin2" data-onsuccess="onSignIn" data-theme="dark" data-width="120" data-height="35"></span></div><div class = "userDetails"><div class = "userImg"></div><div class = "userName">Name</div></div><div style="flex: 2 1 0%; display: flex; flex-direction: column; align-items: center; justify-content: space-evenly;"><div><a class="link" href="index.html" id="timer"><i class="fas fa-stopwatch"></i>&nbsp;<span>Timer</span></a></div><div><a class="link" href="sessions.html" id="sessions"><i class="fas fa-list"></i>&nbsp;<span>Sessions</span></a></div><div><a class="link" href="algs-3-oll.html" id="algorithms"><i class="fas fa-th"></i>&nbsp;<span>Algorithms</span></a></div><div><a class="link" href="cubeslist.html" id="cubeslist"><i class="fas fa-cube"></i>&nbsp;<span>Cubeslist</span></a></div><div><a class="link" href="tools.html" id="tools"><i class="fas fa-tools"></i>&nbsp;<span>Tools</span></a></div><div><a class="link" href="games.html" id="games"><i class="fas fa-gamepad"></i>&nbsp;<span>Games</span></a></div><div><a class="link" href="settings.html" id="settings"><i class="fas fa-cog"></i>&nbsp;<span>Settings</span></a></div></div><div class = "signOut">Sign Out</div><div class="lastPart"><div><span><button class="credits" onclick="credits()" id="info"><i class="fas fa-question"></i></button></span><a class="infoBtn" href="info.html" target="_blank"><i class="fas fa-info"></i></a><a class="infoBtn" href="updates.html" target="_blank"><i class="fas fa-bell"></i></a></div><div><button class="collapse" onclick="collapse()" style="display: flex;"><i id="col" class="fas fa-angle-left"></i></button></div></div>';

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
                localStorage.setItem("speedtimer", JSON.stringify(JSON.parse(data)));
            });
        } else {
            if (localStorage.getItem("speedtimer") != null && localStorage.getItem("signedIn") != "true") {
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

document.querySelector(".signOut").addEventListener("click", function() {
    signOut();
});

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem("myUserEntity");
    });

    document.querySelector(".loginUser").classList.remove("loggedin");
    document.querySelector(".loginUser").classList.add("loggedout");

    document.querySelector(".userDetails").style.display = "none";

    document.querySelector(".signOut").style.display = "none";
};

function afterSignIn(userProfile) {
    if (!localStorage.getItem('firstLoad')) {
        localStorage['firstLoad'] = userProfile.id;

        window.location.reload();
    } else if(userProfile.id != localStorage.getItem('firstLoad')) {
        window.location.reload();
        localStorage['firstLoad'] = userProfile.id;
    }

    var googleProfile = userProfile;

    document.querySelector(".loginUser").classList.remove("loggedout");
    document.querySelector(".loginUser").classList.add("loggedin");

    document.querySelector(".userDetails").style.display = "flex";

    document.querySelector(".signOut").style.display = "flex";

    document.querySelector(".userImg").style.backgroundImage = "url('" + googleProfile.profile_picture + "')";
    document.querySelector(".userImg").style.backgroundSize = "cover";

    document.querySelector(".userName").innerHTML = googleProfile.username;

    writeUserData(googleProfile, googleProfile.id, googleProfile.username, googleProfile.email, googleProfile.profile_picture);  
}

var script = document.createElement('script');
script.src = "scripts/defaults.js";
script.async = true;
script.type = "module";
document.body.appendChild(script);

var script = document.createElement('script');
script.src = "scripts/script.js";
script.async = true;
script.type = "module";
document.body.appendChild(script);
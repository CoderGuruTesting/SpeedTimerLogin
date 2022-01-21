var leftT = document.querySelector(".leftT");
leftT.innerHTML = "";

var logo = document.createElement("div");
logo.classList.add("logo");

var img = document.createElement("img");
img.src = "images/logo1.jpg";

logo.appendChild(img);
leftT.appendChild(logo);

var text = document.createElement("div");
text.classList.add("text");
text.innerHTML = "SpeedTimer";

leftT.appendChild(text);

// var login = document.createElement("span");
// // login.classList.add("loginBtn");
// login.classList.add("g-signin2");
// login.dataOnsuccess = "onSignIn";
// login.innerHTML = '<span class="g-signin2" data-onsuccess="onSignIn" data-theme="dark" data-width="120" data-height="35"></span>';

var login = '<span class="g-signin2" data-onsuccess="onSignIn" data-theme="dark" data-width="120" data-height="35"></span>';

leftT.appendChild(login);

var div = document.createElement("div");
div.style.flex = "2";
div.style.display = "flex";
div.style.flexDirection = "column";
div.style.alignItems = "center";
div.style.justifyContent = "space-evenly";

function createSection(href, id, iconNo, linkName) {
    var division = document.createElement("div");

    var anchor = document.createElement("a");
    anchor.classList.add("link");
    anchor.href = href;
    anchor.id = id;

    if (document.URL.includes(href)) {
        anchor.classList.add("active");
    }

    anchor.innerHTML = "<i class='fas fa-" + iconNo + "'></i>" + "&nbsp;" + "<span>" + linkName + "</span>";

    division.appendChild(anchor);

    div.appendChild(division);
}

createSection("index.html", "timer", "stopwatch", "Timer");
createSection("sessions.html", "sessions", "list", "Sessions");
createSection("algs-3-oll.html", "algorithms", "th", "Algorithms");
createSection("cubeslist.html", "cubeslist", "cube", "Cubeslist");
createSection("tools.html", "tools", "tools", "Tools");
if(innerWidth > 900) {
    createSection("games.html", "games", "gamepad", "Games");
}
createSection("settings.html", "settings", "cog", "Settings");

leftT.appendChild(div);

var lastPart = document.createElement("div");
lastPart.classList.add("lastPart");

var div2 = document.createElement("div");

var button = document.createElement("span");
button.innerHTML = "<button class='credits' onclick='credits()' id='info'><i class='fas fa-question'></i></button>";

div2.appendChild(button);

var infoBtn1 = document.createElement("a");
infoBtn1.classList.add("infoBtn");
infoBtn1.href = "info.html";
infoBtn1.target = "_blank";
infoBtn1.innerHTML = "<i class='fas fa-info'></i>"

div2.appendChild(infoBtn1);

var infoBtn2 = document.createElement("a");
infoBtn2.classList.add("infoBtn");
infoBtn2.href = "updates.html";
infoBtn2.target = "_blank";
infoBtn2.innerHTML = "<i class='fas fa-bell'></i>"

div2.appendChild(infoBtn2);

lastPart.appendChild(div2);

var collapse = document.createElement("span");
collapse.innerHTML = "<button class='collapse' onclick='collapse()'><i id='col' class='fas fa-angle-left'></i></button>";

lastPart.appendChild(collapse);

leftT.appendChild(lastPart);

function credits() {
    document.querySelector(".overlay").style.display = "block";
    document.querySelector(".creditpopup").style.display = "block";
}

document.querySelector(".overlay").addEventListener("click", function () {
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".creditpopup").style.display = "none";
});

var script = document.createElement('script');
script.src = "scripts/collapse.js";
script.async = true;
document.body.appendChild(script);
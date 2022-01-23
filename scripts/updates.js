var secs = document.querySelectorAll(".sec");
var updateCons = document.querySelectorAll(".updateCon");

for(i = 2; i < secs.length + 2; i++) {
    if(i % 2 == 0) {
        secs[i - 2].id = "odd";
    } else {
        secs[i - 2].id = "even";
    }
}

for(i = 2; i < updateCons.length + 2; i++) {
    if(i % 2 == 0) {
        updateCons[i - 2].id = "odd";
    } else {
        updateCons[i - 2].id = "even";
    }
}

if(secs[secs.length - 1].id == "odd") {
    document.querySelector("footer").id = "even";
} else {
    document.querySelector("footer").id = "odd";
}
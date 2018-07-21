function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

var introText = [
    "Don't stop hacking!",
    "What the hack are you doing?",
    "Keep up the energy!",
    "Did anyone see Megan?",
    "Sean is bad at league. Don't be like Sean. Build great projects. -Eric",
    "Tired? Enjoy a cup of <a style=\"color: white; text-decoration: underline!important\" href=\"https://www.urbandictionary.com/define.php?term=Latta%20Latte\">Latta Latte</a>.",
    "Feeling hungry? Try some <a style=\"color: white; text-decoration: underline!important\" href=\"https://twitter.com/yevbar/status/1020753055883714561\">Wofford Waffles</a>!"
]

function initializeClock(id, endtime) {

    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        
        var t = getTimeRemaining(endtime);
         
        if (t.total < 0) {
            closeCD();
        }

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

/* Refresh punch text every 5 seconds */
setInterval(() => {
    document.getElementById("countdown-intro").innerHTML = introText[Math.floor(Math.random()*introText.length)];
}, 5000);

setTimeout(() => {
    document.getElementById('clockdiv').style.visibility = "";
}, 1000);

var deadline = new Date(Date.parse("22 Jul 2018 13:00:00 -0400"));
initializeClock('clockdiv', deadline);

function closeCD() {
    $("#clockdiv").hide();
    $("#cover").hide();
}
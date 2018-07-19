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
    "Almost there!",
    "Are you ready to hack?",
    "It's coming up!",
    "What the hack?",
    "Yes! Yes! Yes! Yes!",
    'Bring your <a href="/fire" style="decoration: none;color: inherit;">f</a>riends!',
    "Buckle up!"
]

function initializeClock(id, endtime) {

    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);

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

var deadline = new Date(Date.parse("21 Jul 2018 11:00:00 -0600"));
initializeClock('clockdiv', deadline);
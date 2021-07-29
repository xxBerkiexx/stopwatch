//----------------------------------- LAP LIST WIDTH -----------------------------------
let stopwatchCntr = document.getElementById("Stopwatch-Cntr");
let lapListCntr = document.querySelector(".lap-list-cntr");

//Set list container's width on load
lapListCntr.style.width = stopwatchCntr.getBoundingClientRect().width + "px";

//Update list container's width on resize
window.addEventListener("resize", function() {
    lapListCntr.style.width = stopwatchCntr.getBoundingClientRect().width + "px";
});

//----------------------------------- STOPWATCH -----------------------------------
//1ms = 10ms; Count up 1 every 10
//1 second = 1000ms
//1 minute = 60s; Obviously
//Stopwatch will stop completely at 59:59:99

//------------------ BUTTONS ------------------
let startBtn = document.getElementById("Start-Btn");
let resetBtn = document.getElementById("Reset-Btn");
let lapBtn = document.getElementById("Lap-Btn");

startBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", function() {
    if (!lapBtnDisabled) {
        addLap();
    }
});

//------------------ CLOCKS ------------------
//Total minutes, seconds, & milliseconds
let minutes = document.getElementById("Total-Minutes");
let seconds = document.getElementById("Total-Seconds");
let milliseconds = document.getElementById("Total-Milliseconds");
let min = 0;
let sec = 0;
let msec = 0;
//Lap minutes, seconds, & milliseconds
let lapMinutes = document.getElementById("Lap-Minutes");
let lapSeconds = document.getElementById("Lap-Seconds");
let lapMilliseconds = document.getElementById("Lap-Milliseconds");
let lapMin = 0;
let lapSec = 0;
let lapMsec = 0;
//Turn stopwatch On/Off
let stopwatchActive = false;

//------------------ LAP LIST ------------------
//How many laps on the list
let laps = 0;
//Lap list text
let lapText = "";
//Can click lap button or not
let lapBtnDisabled = true;


//------------------ STOPWATCH FUNCTIONS ------------------
//Toggle the start/stop of the stopwatch
function startStop() {
    //Start
    if (!stopwatchActive) {
        stopwatchActive = true;
        //Call main stopwatch function
        stopwatch();
        toggleStartBtn();
        toggleLapBtn();
    }
    //Stop
    else {
        stopwatchActive = false;
        toggleStartBtn();
        toggleLapBtn();
        //Add a lap to the list
        addLap();
    }
}

//Completely reset the stopwatch
function resetStopwatch() {
    //Reset start button
    resetStartBtn();
    //Reset total
    minutes.innerText = "00";
    seconds.innerText = "00";
    milliseconds.innerText = "00";
    min = 0;
    sec = 0;
    msec = 0;
    //Reset lap
    lapMinutes.innerText = "00";
    lapSeconds.innerText = "00";
    lapMilliseconds.innerText = "00";
    lapMin = 0;
    lapSec = 0;
    lapMsec = 0;
    //Reset on/off switch
    stopwatchActive = false;
    //Reset lap
    laps = 0;
    lapText = "";
    lapBtnDisabled = true;
    lapListCntr.innerHTML = lapText;
}

//Reset the lap clock only
function resetLap() {
    lapMinutes.innerText = "00";
    lapSeconds.innerText = "00";
    lapMilliseconds.innerText = "00";
    lapMin = 0;
    lapSec = 0;
    lapMsec = 0;
}

//Main stopwatch function
function stopwatch() {
    if (stopwatchActive) {
        //Check if total is maxed out
        if (min === 59 && sec === 59 && msec === 99) {
            startStop();
            return
        }

        //Tick the clocks forward
        tick();

        //Update the clock outputs
        updateOutputs();

        //Recall stopwatch() after 10ms
        setTimeout(stopwatch, 10);
    }
    
}

//Tick the clocks forward
function tick() {
    //------------------ TOTAL ------------------
    msec++;
    if (msec >= 100) {
        msec = 0;
        sec++;
        if (sec >= 60) {
            sec = 0;
            min++;
        }
    }

    //------------------ LAP ------------------
    lapMsec++;
    if (lapMsec >= 100) {
        lapMsec = 0;
        lapSec++;
        if (lapSec >= 60) {
            lapSec = 0;
            lapMin++;
        }
    }
}

//Update the clock outputs
function updateOutputs() {
    //------------------ TOTAL ------------------
    //Milliseconds
    if (msec < 10) {
        milliseconds.innerText = "0" + msec;
    }
    else if (msec > 99) {
        milliseconds.innerText = "99";
    }
    else {
        milliseconds.innerText = msec;
    }

    //Seconds
    if (sec < 10) {
        seconds.innerText = "0" + sec;
    }
    else {
        seconds.innerText = sec;
    }

    //Minutes
    if (min < 10) {
        minutes.innerText = "0" + min;
    }
    else {
        minutes.innerText = min;
    }

    //------------------ LAP ------------------
    //Milliseconds
    if (lapMsec < 10) {
        lapMilliseconds.innerText = "0" + lapMsec;
    }
    else if (lapMsec > 99) {
        lapMilliseconds.innerText = "99";
    }
    else {
        lapMilliseconds.innerText = lapMsec;
    }

    //Seconds
    if (lapSec < 10) {
        lapSeconds.innerText = "0" + lapSec;
    }
    else {
        lapSeconds.innerText = lapSec;
    }

    //Minutes
    if (lapMin < 10) {
        lapMinutes.innerText = "0" + lapMin;
    }
    else {
        lapMinutes.innerText = lapMin;
    }
}

//Create an output for the lap list
function lapOutput() {
    //------------------ TOTAL ------------------
    let ms;     //Total milliseconds
    let s;      //Total seconds
    let m;      //Total minutes
    let total;
    
    //Milliseconds
    if (msec < 10) {
        ms = "0" + msec;
    }
    else if (msec > 99) {
        ms = "99";
    }
    else {
        ms = msec;
    }

    //Seconds
    if (sec < 10) {
        s = "0" + sec;
    }
    else {
        s = sec;
    }

    //Minutes
    if (min < 10) {
        m = "0" + min;
    }
    else {
        m = min;
    }

    total = m + ":" + s + "." + ms;

    //------------------ LAP ------------------
    let lapMs;
    let lapS;
    let lapM;
    let lap;

    //Milliseconds
    if (lapMsec < 10) {
        lapMs = "0" + lapMsec;
    }
    else if (lapMsec > 99) {
        lapMs = "99";
    }
    else {
        lapMs = lapMsec;
    }

    //Seconds
    if (lapSec < 10) {
        lapS = "0" + lapSec;
    }
    else {
        lapS = lapSec;
    }

    //Minutes
    if (lapMin < 10) {
        lapM = "0" + lapMin;
    }
    else {
        lapM = lapMin;
    }

    lap = lapM + ":" + lapS + "." + lapMs;

    //Add total and lap to object
    let output = {
        total: total,
        lap: lap
    }

    //Return object
    return output;
}

//Add a lap to the list
function addLap() {
    //Increase lap counter
    laps++;
    
    //Create HTML for lap
    let newLap = "<hr>" +
                 "<div class='list-item-cntr'>" +
                    "<p>" + laps + "</p>" +
                    "<p>" + lapOutput().total + "</p>" +
                    "<p>" + lapOutput().lap + "</p>" +
                 "</div>";

    //Add new lap to lap text
    lapText = newLap + lapText;

    //Update HTML
    lapListCntr.innerHTML = lapText;

    //Reset lap clock
    resetLap();
}



//------------------ BUTTONS ------------------
//Toggle the start button between start and stop
function toggleStartBtn() {
    //Show stop
    if (startBtn.classList.contains("green-btn")) {
        //Remove green and add red
        startBtn.classList.remove("green-btn");
        startBtn.classList.add("red-btn");
        //Replace text
        startBtn.innerText = "STOP";
    }
    //Show start
    else if (startBtn.classList.contains("red-btn")) {
        //Remove red and add green
        startBtn.classList.remove("red-btn");
        startBtn.classList.add("green-btn");
        //Replace text
        startBtn.innerText = "START";
    }
}

//Return the stop/start button to start
function resetStartBtn() {
    if (startBtn.classList.contains("red-btn")) {
        //Remove red and add green
        startBtn.classList.remove("red-btn");
        startBtn.classList.add("green-btn");
        //Replace text
        startBtn.innerText = "START";
    }
}

//Toggle whether the lap button is disabled or not
function toggleLapBtn() {
    if (lapBtnDisabled) {
        lapBtn.classList.remove("btn-disabled");
        lapBtnDisabled = false;
    }
    else {
        lapBtn.classList.add("btn-disabled");
        lapBtnDisabled = true;
    }
}
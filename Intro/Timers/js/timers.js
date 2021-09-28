// setTimeout
// setInterval
// requestAnimationFrame

// Set Timeout Timer

let timeoutTimer;
let timeoutTime = 10000; // Measured in milliseconds (2 seconds)

function startTimeoutTimer() {
    // Create and start a timeout timer
    timeoutTimer = setTimeout(timeoutFunction, timeoutTime);

    console.log("Timer has started");
}

function timeoutFunction () {
    console.log("Timer has expired");
}

function stopTimeoutTimer() {
    // Stop the timeout timer
    clearTimeout(timeoutTimer);

    console.log("Timer has been stopped");
}

// This will start our timeout timer when the entire page has loaded
window.addEventListener("load", startTimeoutTimer);

// This will stop our timeout timer when the user clicks on the page
window.addEventListener("click", stopTimeoutTimer);
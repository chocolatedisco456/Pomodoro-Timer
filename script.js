let isRunning = false;
let timerId;
let time = 40 * 60; // 40 minutes in seconds
let isBreakTime = false; // Flag to indicate if it's break time
let workDuration = 40 * 60; // Work duration in seconds, set this dynamically as needed
let breakDuration = 10 * 60; // Break duration in seconds, set this dynamically as needed

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerId = setInterval(() => {
            if (time === 0) {
                clearInterval(timerId);
                isRunning = false; // Stop the timer to reset the interval
                if (!isBreakTime) {
                    document.getElementById('work-sound').play();
                    document.getElementById('break-time-sign').style.display = 'block'; // Show break time sign
                    time = breakDuration; // Set time to break duration
                    isBreakTime = true; // Set break time flag
                    startTimer(); // Restart timer for the break period
                } else {
                    document.getElementById('break-sound').play();
                    document.getElementById('break-time-sign').style.display = 'none'; // Hide break time sign
                    time = workDuration; // Reset time to work duration
                    isBreakTime = false; // Reset break time flag
                    startTimer(); // Restart timer for the work period
                }
            } else {
                time--;
                displayTime();
            }
        }, 1000);
    }
}


function pauseTimer() {
    clearInterval(timerId);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerId);
    time = workDuration; // Reset to default work duration
    displayTime();
    isRunning = false;
    isBreakTime = false; // Ensure break flag is reset on timer reset
    document.getElementById('break-time-sign').style.display = 'none'; // Ensure break sign is hidden
}

function displayTime() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    document.getElementById('time-display').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

document.addEventListener('DOMContentLoaded', () => {
    displayTime(); // Initial display of timer
});

function toggleSettings() {
    const settingsPanel = document.getElementById('settings-panel');
    settingsPanel.style.display = settingsPanel.style.display === 'none' ? 'block' : 'none';
}

function applySettings() {
    const workTime = parseInt(document.getElementById('work-time').value) * 60;
    const breakTime = parseInt(document.getElementById('break-time').value) * 60;

    if (isRunning) {
        alert("Stop the timer before changing settings.");
        return;
    }

    if (workTime > 0 && breakTime > 0) {
        time = workTime;  // Update the work time
        workDuration = workTime; // Update global work duration
        breakDuration = breakTime;  // Update the break time
        displayTime();  // Refresh the display with new work time
    } else {
        alert("Please enter valid times for work and break periods.");
    }
}

let currentRound = 1;  // Initialize the round counter

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerId = setInterval(() => {
            if (time === 0) {
                clearInterval(timerId);
                isRunning = false; // Reset the running state
                if (!isBreakTime) {
                    document.getElementById('work-sound').play();
                    document.getElementById('break-time-sign').style.display = 'block';
                    time = breakDuration;
                    isBreakTime = true;
                    startTimer();
                } else {
                    document.getElementById('break-sound').play();
                    document.getElementById('break-time-sign').style.display = 'none';
                    time = workDuration;
                    isBreakTime = false;
                    currentRound++;  // Increment the round counter
                    updateRoundDisplay();  // Update the round display on the UI
                    startTimer();
                }
            } else {
                time--;
                displayTime();
            }
        }, 1000);
    }
}

function updateRoundDisplay() {
    document.getElementById('round-display').textContent = 'Round ' + currentRound;
}
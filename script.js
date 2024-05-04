let isRunning = false;
let timerId;
let time = 40 * 60; // 40 minutes in seconds
let isBreakTime = false; // Flag to indicate if it's break time
let workDuration = 40 * 60; // Work duration in seconds, set this dynamically as needed
let breakDuration = 10 * 60; // Break duration in seconds, set this dynamically as needed
let currentRound = 1;  // Initialize the round counter

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerId = setInterval(() => {
            if (time <= 0) {
                clearInterval(timerId);
                isRunning = false;
                if (!isBreakTime) {
                    document.getElementById('work-sound').play();
                    document.getElementById('break-time-sign').style.display = 'block';
                    time = breakDuration;
                    isBreakTime = true;
                } else {
                    document.getElementById('break-sound').play();
                    document.getElementById('break-time-sign').style.display = 'none';
                    time = workDuration;
                    isBreakTime = false;
                    currentRound++;
                    updateRoundDisplay();
                }
                startTimer();
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
    document.getElementById('work-sound').pause();
    document.getElementById('work-sound').currentTime = 0;
    document.getElementById('break-sound').pause();
    document.getElementById('break-sound').currentTime = 0;
}

function resetTimer() {
    clearInterval(timerId);
    time = workDuration;
    displayTime();
    isRunning = false;
    isBreakTime = false;
    document.getElementById('break-time-sign').style.display = 'none';
    document.getElementById('work-sound').pause();
    document.getElementById('work-sound').currentTime = 0;
    document.getElementById('break-sound').pause();
    document.getElementById('break-sound').currentTime = 0;
}

function displayTime() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    document.getElementById('time-display').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

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
        time = workTime;
        workDuration = workTime;
        breakDuration = breakTime;
        displayTime();
    } else {
        alert("Please enter valid times for work and break periods.");
    }
}

function updateRoundDisplay() {
    document.getElementById('round-display').textContent = 'Round ' + currentRound;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('start-button').addEventListener('click', function() {
        document.getElementById('click-sound').play(); // Play the click sound
        startTimer(); // Start the timer
    });
    displayTime(); // Ensure this is called to initially display the timer
});

function setMasterVolume(value) {
    var audioElements = document.querySelectorAll('audio');
    audioElements.forEach(function(audio) {
        audio.volume = value;
    });
}


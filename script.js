let isRunning = false;
let timerId;
let time = 40 * 60; // 40 minutes in seconds
let isBreakTime = false; // Flag to indicate if it's break time
let workDuration = 40 * 60; // Work duration in seconds, set this dynamically as needed
let breakDuration = 10 * 60; // Break duration in seconds, set this dynamically as needed
let currentRound = 1;  // Initialize the round counter
let lastTimestamp;

document.addEventListener('DOMContentLoaded', function() {
    const startPauseBtn = document.getElementById('start-pause-btn');
    startPauseBtn.addEventListener('click', function() {
        document.getElementById('click-sound').play(); // Play the click sound

        if (!isRunning) {
            startTimer();
            startPauseBtn.textContent = 'Pause'; // Change button text to 'Pause'
        } else {
            pauseTimer();
            startPauseBtn.textContent = 'Start'; // Change button text to 'Start'
        }
    });
    displayTime(); // Ensure this is called to initially display the timer
});

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        lastTimestamp = Date.now();
        timerId = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerId);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerId);
    time = workDuration; // Reset to default work duration
    displayTime();
    isRunning = false;
    isBreakTime = false; // Reset to initial state indicating it's not break time
    currentRound = 1; // Reset round count to 1

    // Update the round display to reflect the reset
    updateRoundDisplay();

    // Hide the break time sign if visible
    document.getElementById('break-time-sign').style.display = 'none';

    // Stop any playing audio and reset their positions
    document.getElementById('work-sound').pause();
    document.getElementById('work-sound').currentTime = 0;
    document.getElementById('break-sound').pause();
    document.getElementById('break-sound').currentTime = 0;
}

function updateTimer() {
    const now = Date.now();
    const elapsed = (now - lastTimestamp) / 1000; // Time elapsed in seconds
    lastTimestamp = now;

    time -= elapsed;

    if (time <= 0) {
        clearInterval(timerId);
        isRunning = false;
        togglePeriod(); // Function to handle period switch between work and break
    } else {
        displayTime();
    }
}

function togglePeriod() {
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
    startTimer(); // Automatically start the next period
}

function displayTime() {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    document.getElementById('time-display').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function toggleSettings() {
    const settingsPanel = document.getElementById('settings-panel');
    const volumeControls = document.getElementById('volume-controls');
    const applyButton = document.getElementById('apply-settings');
    
    if (settingsPanel.style.display === 'none') {
        settingsPanel.style.display = 'block';
        volumeControls.style.display = 'none';  // Hide the volume mixer
        applyButton.style.display = 'block';  // Show the apply button in the vacated space
    } else {
        settingsPanel.style.display = 'none';
        volumeControls.style.display = 'block';  // Show the volume mixer again
        applyButton.style.display = 'none';  // Hide the apply button
    }
}

function applySettings() {
    const newWorkTime = parseInt(document.getElementById('work-time').value) * 60;
    const newBreakTime = parseInt(document.getElementById('break-time').value) * 60;

    if (isRunning) {
        alert("Stop the timer before changing settings.");
        return;
    }

    if (newWorkTime > 0 && newBreakTime > 0) {
        workDuration = newWorkTime;  // Update global work duration
        breakDuration = newBreakTime;  // Update global break duration
        
        if (isBreakTime) {
            time = breakDuration;  // Apply new break duration if it's currently break time
        } else {
            time = workDuration;  // Apply new work duration if it's currently work time
        }
        
        displayTime();  // Refresh the display with new time
    } else {
        alert("Please enter valid times for work and break periods.");
    }
}

function updateRoundDisplay() {
    document.getElementById('round-display').textContent = 'Round ' + currentRound;
}

function setMasterVolume(value) {
    var audioElements = document.querySelectorAll('audio');
    audioElements.forEach(function(audio) {
        audio.volume = value;
    });
}

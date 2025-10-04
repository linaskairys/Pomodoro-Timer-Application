var timerInterval;
var isPaused = false;
var timeLeft = 25 * 60; // 25 minutes in seconds

var timerElement = document.getElementById('timer');
var startButton = document.getElementById('start');
var pauseButton = document.getElementById('pause');
var stopButton = document.getElementById('stop');

function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
   
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (remainingSeconds < 10) {
        remainingSeconds = '0' + remainingSeconds;
    }
   
    return minutes + ':' + remainingSeconds;
}

function updateTimer() {
    timerElement.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert("Time to take a break!");
    }
   
    if (timeLeft < 60) {
        timerElement.classList.add('warning');
    } else {
        timerElement.classList.remove('warning');
    }
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(function() {
            if (!isPaused) {
                timeLeft = timeLeft - 1;
                updateTimer();
            }
        }, 1000);
    }
}

startButton.addEventListener('click', function() {
    startTimer();
    startButton.disabled = true;
});

pauseButton.addEventListener('click', function() {
    if (isPaused) {
        isPaused = false;
        pauseButton.textContent = 'Pause';
    } else {
        isPaused = true;
        pauseButton.textContent = 'Resume';
    }
});

stopButton.addEventListener('click', function() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 25 * 60;
    updateTimer();
    startButton.disabled = false;
    isPaused = false;
    pauseButton.textContent = 'Pause';
});

updateTimer();
function changeBodyColor(color) {
  document.body.style.background = color;
}

function updateName(name) {
  document.getElementById("name").textContent = name
}

function updateTimerText(text) {
  document.getElementById("timer").innerHTML = text;
}

function getTalker() {
  let element = document.getElementById("name");
  return element.textContent || element.innerText;
}

function switchTalker() {
  let name = getTalker(); 
  
  if(name === 'B') {
    changeBodyColor("#27AE60");
    updateName('A')
  } else if (name === 'A') {
    changeBodyColor("#E67E22");
    updateName('B')
  }
}

function increaseTimer() {
    talkTime = talkTime + 1;

    window.clearInterval(window.timerInterval);

    // At most have 60 mins of talk time
    if (talkTime >= 60) {
        talkTime = 60;
    }

    updateTimerText(talkTime + "m");
    startTimer(talkTime);
}

function decreaseTimer() {
    talkTime = talkTime - 1;

    window.clearInterval(window.timerInterval);

    // At least have 1 min of talk time
    if (talkTime <= 1) {
        talkTime = 1;
    }

    updateTimerText(talkTime + "m");
    startTimer(talkTime);
}

function startTimer(talkTime) {
    // Set the date we're counting down to
    let startDate = new Date();

    // Update the count down every 1 second
    // let x = window.setInterval(function() {
    // Attach the interval to the window object so we can restart it with button onClick
    window.timerInterval = window.setInterval(function() {
      let endDate = new Date(startDate.getTime() + talkTime * 60000);
      
      let now = new Date().getTime();
      
      // Find the distance between now and the count down date
      let timeRemaining = endDate - now;
      
      // If the timer has expired, reset the startDate to now
      if (timeRemaining < 0) {
        updateTimerText("CHANGE");
        changeBodyColor("#FFFFFF");
        startDate = new Date();
        switchTalker();
      } 
      // Else update the timer with the remaining time
      else {
        let mins = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        let secs = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        updateTimerText(mins + "m " + secs + "s ");
      }
     
    }, 1000);

}

// Talker time
let talkTime = 1;

document.addEventListener("DOMContentLoaded", function (event) {
    startTimer(talkTime);
    switchTalker();
});

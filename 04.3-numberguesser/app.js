// Game values
let min = 1,
    max = 10,
    winningNum = getRandonNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
  minNum.textContent = min;
  maxNum.textContent = max;

  // Play again event listener
  game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
      window.location.reload();
    }
  })

// Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);
  // Validate guess number
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  } else {
    // Check if won
    if(guess === winningNum) {
      // Game Over win
      gameOver(true, `${winningNum} is correct, YOU WIN!`)
    } else {
      // Wrong number
      guessesLeft -= 1;
      if (guessesLeft === 0){
        // Game over lose
        gameOver(false, `Game Over! The correct number was ${winningNum}`)
      } else {
        // Game continues - answer wrong
        // Clear guess input
        guessInput.value = '';
        // Tell user is the wrong number
        setMessage(`${guess} is not correct! You have ${guessesLeft} guesses left`, 'red')
      }
    }
  }
});

function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  // Disable input
  guessInput.disabled = true;
  // Change border
  guessInput.style.borderColor = color;
  // Set message
  setMessage(msg, color)

  // Play again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again'
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Get winning number
function getRandonNum(min , max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
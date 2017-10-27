function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1
}

function shuffle(array) {
  var remaining = array.length;
  var elemToShuffle;
  var temp;
  while(remaining) {
    elemToShuffle = Math.floor(Math.random() * remaining--);
    temp = array[remaining];
    array[remaining] = array[elemToShuffle];
    array[elemToShuffle] = temp;
  }
  return array;
}

function Game () {
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function () {
  return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function() {
  return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(num) {
  if (num >= 1 && num <= 100) {
    this.playersGuess = num;
    return this.checkGuess(num);
  } else {
    throw 'That is an invalid guess.';
  }
}

Game.prototype.checkGuess = function(num) {
  if (num === this.winningNumber) {
    return 'You Win!';
  } else if (this.pastGuesses.includes(num)) {
    return 'You have already guessed that number.';
  } else {
    this.pastGuesses.push(num);
    if (this.pastGuesses.length === 5) {
      return 'You Lose.';
    } else if (this.difference() < 10) {
      return 'You\'re burning up!';
    } else if (this.difference() < 25) {
      return 'You\'re lukewarm.';
    } else if (this.difference() < 50) {
      return 'You\'re a bit chilly.';
    } else {
      return 'You\'re ice cold!'
    }
  }
}

Game.prototype.provideHint = function () {
  return shuffle([this.winningNumber, generateWinningNumber(), generateWinningNumber()]);
}

function newGame () {
  return new Game;
}

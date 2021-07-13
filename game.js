export class SimonGame {
  constructor(feedbackCallback, gameoverCallback) {
    this.feedbackCallback = feedbackCallback;
    this.gameoverCallback = gameoverCallback;

    this.actualSequence = [];
    this.userSequence = [];

    this.currentLevel = 0;
    this.isGameRunning = false;
  }

  reset() {
    this.currentLevel = 0;
    this.actualSequence = [];
    this.isGameRunning = true;
    this.incrementLevel(true);
  }

  getMove(userInput) {
    if (!this.isGameRunning) {
      return this.isGameRunning;
    }

    this.userSequence.push(userInput);
    this.feedbackCallback(userInput);

    if (this.userSequence[this.userSequence.length - 1] == this.actualSequence[this.userSequence.length - 1]) {
      if (this.userSequence.length == this.currentLevel) {
        this.incrementLevel();
      }
    } else {
      this.gameoverCallback();
      this.isGameRunning = false;;
    }

    return this.isGameRunning;
  }

  incrementLevel(isNewGame = false) {
    this.userSequence = [];
    this.actualSequence.push(Math.floor(Math.random() * 4));
    this.currentLevel++;

    if (isNewGame) {
      this.feedbackCallback(this.actualSequence[this.currentLevel - 1]);
      return;
    }

    self = this;
    setTimeout(function () {
      self.feedbackCallback(self.actualSequence[self.currentLevel - 1]);
    }, 500)
  }
}
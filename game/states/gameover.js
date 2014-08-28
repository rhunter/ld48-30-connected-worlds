
'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);
    this.titleText.fixedToCamera = true

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'And that was just the beginning...', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);
    this.congratsText.fixedToCamera = true

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
    this.instructionText.fixedToCamera = true

    this.music = this.game.add.sound('winmusic');
    this.music.play();
  },
  init: function() {
    this.game.world.setBounds(0,0,800,600);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  },
  shutdown: function() {
    this.music.stop();
  }
};
module.exports = GameOver;


'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.game.scale.maxWidth = 1024;
    this.game.scale.maxHeight = 768;
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.setScreenSize();

    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

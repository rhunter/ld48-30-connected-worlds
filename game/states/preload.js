
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.tilemap('mytilemap', 'assets/worldmap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('mytileimage', 'assets/grassy.png');
    this.load.image('dudebutton', 'assets/dude.png');
    this.load.image('dude1', 'assets/dude1.png');
    this.load.image('dude2', 'assets/dude2.png');
    this.load.image('hut1', 'assets/hut1.png');
    this.load.image('hut2', 'assets/hut2.png');
    this.load.image('zoombutton', 'assets/zoombutton.png');
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

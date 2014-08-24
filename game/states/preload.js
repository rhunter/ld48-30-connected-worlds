
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
    this.load.image('sky', 'assets/space.png');
    this.load.image('land', 'assets/sector.png');
    this.load.image('dudebutton', 'assets/dude.png');
    this.load.image('dude1', 'assets/dude1.png');
    this.load.image('dude2', 'assets/dude2.png');
    this.load.image('hut1', 'assets/hut1.png');
    this.load.image('hut2', 'assets/hut2.png');
    this.load.image('zoombutton', 'assets/zoombutton.png');
    this.load.audio('cry1', 'assets/cry-01.wav');
    this.load.audio('cry2', 'assets/cry-02.wav');
    this.load.audio('cry3', 'assets/cry-03.wav');
    this.load.audio('cry4', 'assets/cry-04.wav');
    this.load.audio('cry5', 'assets/cry-05.wav');
    this.load.audio('cry6', 'assets/cry-06.wav');
    this.load.audio('cry7', 'assets/cry-07.wav');
    this.load.audio('cry8', 'assets/cry-08.wav');
    this.load.audio('cry9', 'assets/cry-09.wav');
    this.load.audio('cry10', 'assets/cry-10.wav');
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

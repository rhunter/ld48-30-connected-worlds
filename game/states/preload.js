
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
    this.load.image('noise', 'assets/noise.png');
    this.load.image('dudebutton', 'assets/dude.png');
    this.load.image('dude1', 'assets/dude1.png');
    this.load.image('dude2', 'assets/dude2.png');
    this.load.image('hut1', 'assets/hut1.png');
    this.load.image('hut2', 'assets/hut2.png');
    this.load.image('zoombutton', 'assets/zoombutton.png');
    this.load.audio('buttonpress', 'assets/button-03.wav');
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
    this.load.audio('sword1', 'assets/sword-01.wav');
    this.load.audio('sword2', 'assets/sword-02.wav');
    this.load.audio('sword3', 'assets/sword-03.wav');
    this.load.audio('sword4', 'assets/sword-04.wav');
    this.load.audio('sword5', 'assets/sword-05.wav');
    this.load.audio('sword6', 'assets/sword-06.wav');
    this.load.audio('sword7', 'assets/sword-07.wav');
    this.load.audio('sword8', 'assets/sword-08.wav');
    this.load.audio('sword9', 'assets/sword-09.wav');
    this.load.audio('sword10', 'assets/sword-10.wav');
    this.load.audio('sword11', 'assets/sword-11.wav');
    this.load.audio('sword12', 'assets/sword-12.wav');
    this.load.audio('sword13', 'assets/sword-13.wav');
    this.load.audio('sword14', 'assets/sword-14.wav');
    this.load.audio('sword15', 'assets/sword-15.wav');
    this.load.audio('sword16', 'assets/sword-16.wav');
    this.load.audio('sword17', 'assets/sword-17.wav');
    this.load.audio('sword18', 'assets/sword-18.wav');
    this.load.audio('sword19', 'assets/sword-19.wav');
    this.load.audio('sword20', 'assets/sword-20.wav');
    this.load.audio('sword21', 'assets/sword-21.wav');
    this.load.audio('sword22', 'assets/sword-22.wav');
    this.load.audio('sword23', 'assets/sword-23.wav');
    this.load.audio('sword24', 'assets/sword-24.wav');
    this.load.audio('sword25', 'assets/sword-25.wav');
    this.load.audio('sword26', 'assets/sword-26.wav');
    this.load.audio('sword27', 'assets/sword-27.wav');
    this.load.audio('sword28', 'assets/sword-28.wav');
    this.load.audio('music', [
      'assets/ambient-music.opus',
      'assets/ambient-music.ogg',
      'assets/ambient-music.wav'
    ]);

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


'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

// HACK: Firefox (31 on Mac) claims to support Ogg and Web Audio but
// throws errors on decoding the streams.
//
// User agent sniffing makes the problem "go away" for now, but Firefox
// will eventually fix the decoding issue (and another browser/platform
// might have the same problem). I'd prefer to detect the feature.
window.PhaserGlobal = {disableWebAudio: /Firefox/.test(navigator.userAgent)};

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.game.width/2,this.game.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.tilemap('mytilemap', 'assets/worldmap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('sky', 'assets/space.png');
    this.load.image('landouter', 'assets/sectorouter.png');
    this.load.image('landsurface', 'assets/sectorcover.png');
    this.load.spritesheet('pet1', 'assets/megupets_kohala_walk_sheet.png', 140, 168, 19);
    this.load.spritesheet('pet2', 'assets/megupets_fat_orange_cat_walk_sheet.png', 158, 206, 19);
    this.load.spritesheet('noisered', 'assets/noisered.png', 3, 2);
    this.load.spritesheet('noiseblue', 'assets/noiseblue.png', 3, 2);
    this.load.image('dudebutton', 'assets/dude.png');
    this.load.image('dude1', 'assets/dude1.png');
    this.load.image('dude2', 'assets/dude2.png');
    this.load.image('hut1', 'assets/hut1.png');
    this.load.image('hut2', 'assets/hut2.png');
    this.load.image('zoombutton', 'assets/zoombutton.png');
    this.load.image('flag', 'assets/flag.png');
    this.load.audio('buttonpress', ['assets/button-03.ogg', 'assets/button-03.mp3']);
    this.load.audio('buttonfail', ['assets/zipdown.ogg', 'assets/zipdown.mp3']);
    this.load.audio('flagup', ['assets/zipup.ogg', 'assets/zipup.mp3']);
    this.load.audio('flagdown', ['assets/zipdown.ogg', 'assets/zipdown.mp3']);
    this.load.audio('worldscrape', ['assets/boomcrunch.ogg', 'assets/boomcrunch.mp3']);
    this.load.audio('cry1', ['assets/cry-01.ogg', 'assets/cry-01.mp3']);
    this.load.audio('cry2', ['assets/cry-02.ogg', 'assets/cry-02.mp3']);
    this.load.audio('cry3', ['assets/cry-03.ogg', 'assets/cry-03.mp3']);
    this.load.audio('cry4', ['assets/cry-04.ogg', 'assets/cry-04.mp3']);
    this.load.audio('cry5', ['assets/cry-05.ogg', 'assets/cry-05.mp3']);
    this.load.audio('cry6', ['assets/cry-06.ogg', 'assets/cry-06.mp3']);
    this.load.audio('cry7', ['assets/cry-07.ogg', 'assets/cry-07.mp3']);
    this.load.audio('cry8', ['assets/cry-08.ogg', 'assets/cry-08.mp3']);
    this.load.audio('cry9', ['assets/cry-09.ogg', 'assets/cry-09.mp3']);
    this.load.audio('cry10', ['assets/cry-10.ogg', 'assets/cry-10.mp3']);
    this.load.audio('sword1', ['assets/sword-01.ogg', 'assets/sword-01.mp3']);
    this.load.audio('sword2', ['assets/sword-02.ogg', 'assets/sword-02.mp3']);
    this.load.audio('sword3', ['assets/sword-03.ogg', 'assets/sword-03.mp3']);
    this.load.audio('sword4', ['assets/sword-04.ogg', 'assets/sword-04.mp3']);
    this.load.audio('sword5', ['assets/sword-05.ogg', 'assets/sword-05.mp3']);
    this.load.audio('sword6', ['assets/sword-06.ogg', 'assets/sword-06.mp3']);
    this.load.audio('sword7', ['assets/sword-07.ogg', 'assets/sword-07.mp3']);
    this.load.audio('sword8', ['assets/sword-08.ogg', 'assets/sword-08.mp3']);
    this.load.audio('sword9', ['assets/sword-09.ogg', 'assets/sword-09.mp3']);
    this.load.audio('sword10', ['assets/sword-10.ogg', 'assets/sword-10.mp3']);
    this.load.audio('sword11', ['assets/sword-11.ogg', 'assets/sword-11.mp3']);
    this.load.audio('sword12', ['assets/sword-12.ogg', 'assets/sword-12.mp3']);
    this.load.audio('sword13', ['assets/sword-13.ogg', 'assets/sword-13.mp3']);
    this.load.audio('sword14', ['assets/sword-14.ogg', 'assets/sword-14.mp3']);
    this.load.audio('sword15', ['assets/sword-15.ogg', 'assets/sword-15.mp3']);
    this.load.audio('sword16', ['assets/sword-16.ogg', 'assets/sword-16.mp3']);
    this.load.audio('sword17', ['assets/sword-17.ogg', 'assets/sword-17.mp3']);
    this.load.audio('sword18', ['assets/sword-18.ogg', 'assets/sword-18.mp3']);
    this.load.audio('sword19', ['assets/sword-19.ogg', 'assets/sword-19.mp3']);
    this.load.audio('sword20', ['assets/sword-20.ogg', 'assets/sword-20.mp3']);
    this.load.audio('sword21', ['assets/sword-21.ogg', 'assets/sword-21.mp3']);
    this.load.audio('sword22', ['assets/sword-22.ogg', 'assets/sword-22.mp3']);
    this.load.audio('sword23', ['assets/sword-23.ogg', 'assets/sword-23.mp3']);
    this.load.audio('sword24', ['assets/sword-24.ogg', 'assets/sword-24.mp3']);
    this.load.audio('sword25', ['assets/sword-25.ogg', 'assets/sword-25.mp3']);
    this.load.audio('sword26', ['assets/sword-26.ogg', 'assets/sword-26.mp3']);
    this.load.audio('sword27', ['assets/sword-27.ogg', 'assets/sword-27.mp3']);
    this.load.audio('sword28', ['assets/sword-28.ogg', 'assets/sword-28.mp3']);
    this.load.audio('music', ['assets/ambient-music.ogg', 'assets/ambient-music.mp3']);
    this.load.audio('winmusic', ['assets/forward-music.ogg', 'assets/forward-music.mp3']);
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

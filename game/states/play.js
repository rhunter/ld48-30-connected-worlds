
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.map = this.game.add.tilemap('mytilemap');
      this.map.addTilesetImage('ImageSlotInMap', 'mytileimage');
      this.map.setCollision([42], true);
      //this.map.setCollisionByExclusion([0, 1]);
      this.mapLayer = this.map.createLayer('Ground');
      this.mapLayer.resizeWorld();
      this.mapLayer.debug = true;
      this.desireCloseness = true;
      this.showCloseness();
      this.numberOfDudes = 0;
      this.dudesGroup = this.game.add.group();

      this.uiZoomButton = this.game.add.button(100,5,'zoombutton',this.onZoomButton, this);
      this.uiDudeSpawner = this.game.add.button(5,5,'dude1',this.onSpawnButton, this);
      var counterStyle = {font: '20px Arial', fill: '#d0d0d0', stroke: '#303030', strokeThickness: 4, align: 'left'};
      this.uiDudeCountLabel = this.game.add.text(15,60, '', counterStyle);
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
    },
    update: function() {
      this.game.physics.arcade.collide(this.dudesGroup, this.mapLayer);
      this.showCloseness();
      this.showNumbers();
    },
    render: function() {
      // this.game.debug.bodyInfo(this.sprites[0], 32, 32);
    },
    onZoomButton: function() {
      console.debug('zooooom');
      this.desireCloseness = !this.desireCloseness;
    },
    onSpawnButton: function() {
      this.numberOfDudes++;
      var sprite = this.game.add.sprite(0, 50, 'dude2');
      this.game.physics.arcade.enable(sprite);
      sprite.body.velocity.x = 25;
      sprite.body.tilePadding.set(3);
      sprite.body.collideWorldBounds = true;
      sprite.body.bounce.set(1.0);
      this.dudesGroup.add(sprite);
    },
    showNumbers: function() {
      this.uiDudeCountLabel.setText(this.numberOfDudes.toString());
    },
    showCloseness: function() {
      var multiplier = this.desireCloseness ? 4 : 1;
      this.game.world.scale.setTo(multiplier, multiplier);
    }
  };

  module.exports = Play;

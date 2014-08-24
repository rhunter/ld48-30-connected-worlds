
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
      this.numberOfDudes = 2;
      this.sprites = [
        this.game.add.sprite(0, 50, 'dude1'),
        this.game.add.sprite(100, 50, 'dude2'),
      ];

      this.uiZoomButton = this.game.add.button(100,5,'zoombutton',this.onZoomButton, this);
      this.uiDudeSpawner = this.game.add.button(5,5,'dude1',this.onSpawnButton, this);
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.enable(this.sprites[0]);
      this.game.physics.arcade.enable(this.sprites[1]);
      this.sprites[0].body.velocity.x = 25;
      this.sprites[1].body.velocity.x = -25;
      this.sprites[0].body.tilePadding.set(3);
      this.sprites[0].body.collideWorldBounds = true;
      this.sprites[1].body.collideWorldBounds = true;
      this.sprites[0].body.bounce.set(1.0);
      this.sprites[1].body.bounce.set(1.0);
    },
    update: function() {
      this.game.physics.arcade.collide(this.sprites[0], this.mapLayer);
      this.game.physics.arcade.collide(this.sprites[1], this.mapLayer);
      this.game.physics.arcade.collide(this.sprites[0], this.sprites[1]);

      this.showCloseness();
    },
    render: function() {
      this.game.debug.bodyInfo(this.sprites[0], 32, 32);
    },
    onZoomButton: function() {
      console.debug('zooooom');
      this.desireCloseness = !this.desireCloseness;
    },
    onSpawnButton: function() {
      console.debug('spawwwwn');
      this.numberOfDudes++;
    },
    showCloseness: function() {
      var multiplier = this.desireCloseness ? 4 : 1;
      this.game.world.scale.setTo(multiplier, multiplier);
    }
  };

  module.exports = Play;


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
      this.sprites = [
        this.game.add.sprite(0, 50, 'dude1'),
        this.game.add.sprite(100, 50, 'dude2'),
      ];
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
      if (this.game.input.mousePointer.isDown) {
        this.clickListener();
      }
      this.showCloseness();
    },
    render: function() {
      this.game.debug.bodyInfo(this.sprites[0], 32, 32);

    },
    clickListener: function() {
      this.desireCloseness = !this.desireCloseness;
    },
    showCloseness: function() {
      var multiplier = this.desireCloseness ? 4 : 1;
      this.game.world.scale.setTo(multiplier, multiplier);
    }
  };

  module.exports = Play;

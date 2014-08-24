
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.skyLayer = this.game.add.group();
      this.skyLayer.z = 0;
      this.skyLayer.add(this.game.add.sprite(0,0,'sky'));
      this.playfield = this.game.add.group();
      this.playfield.z = 1;
      this.playfield.add(this.game.add.sprite(0,0,'land'));

      this.desireCloseness = true;
      this.numberOfDudes = 0;

      this.buildingsGroup = this.game.add.group(this.playfield);
      this.buildingsGroup.z = 2;
      this.dudeHouse = this.game.add.sprite(200, 240, 'hut1');
      this.broHouse = this.game.add.sprite(700, 400, 'hut2');
      this.buildingsGroup.add(this.broHouse);
      this.buildingsGroup.add(this.dudeHouse);

      this.dudesGroup = this.game.add.group(this.playfield);
      this.dudesGroup.z = 3;
      this.brosGroup = this.game.add.group(this.playfield);
      this.brosGroup.z = 4;

      this.uiGroup = this.game.add.group(this.game.world, 'ui', false);
      this.uiGroup.z = 10;
      this.uiGroup.fixedToCamera = true;
      this.uiZoomButton = this.game.add.button(100,5,'zoombutton',this.onZoomButton, this);
      this.uiDudeSpawner = this.game.add.button(5,5,'dudebutton',this.onSpawnButton, this);
      this.uiGroup.add(this.uiZoomButton);
      this.uiGroup.add(this.uiDudeSpawner);
      var counterStyle = {font: '20px Arial', fill: '#d0d0d0', stroke: '#303030', strokeThickness: 4, align: 'left'};
      this.uiDudeCountLabel = this.game.add.text(15,60, '', counterStyle);
      this.uiGroup.add(this.uiDudeCountLabel)
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.time.events.loop(Phaser.Timer.SECOND, this.spawnEnemy, this);
    },
    update: function() {
      // this.game.physics.arcade.collide(this.dudesGroup, this.mapLayer);
      // this.game.physics.arcade.collide(this.brosGroup, this.mapLayer);
      this.game.physics.arcade.collide(this.dudesGroup, this.brosGroup);
      this.showCloseness();
      this.showNumbers();
    },
    render: function() {
      // this.game.debug.bodyInfo(this.sprites[0], 32, 32);
    },
    onZoomButton: function() {
      this.desireCloseness = !this.desireCloseness;
    },
    onSpawnButton: function() {
      this.numberOfDudes++;
      var sprite = this.game.add.sprite(this.dudeHouse.x, this.dudeHouse.y, 'dude1');
      this.game.physics.arcade.enable(sprite);
      sprite.body.velocity.x = 25;
      sprite.body.tilePadding.set(3);
      sprite.body.collideWorldBounds = true;
      sprite.body.bounce.set(1.0);
      this.dudesGroup.add(sprite);
    },
    spawnEnemy: function() {
      var sprite = this.game.add.sprite(this.broHouse.x, this.broHouse.y, 'dude2');
      this.game.physics.arcade.enable(sprite);
      sprite.body.velocity.y = -25;
      sprite.body.tilePadding.set(3);
      sprite.body.collideWorldBounds = true;
      sprite.body.bounce.set(1.0);
      this.brosGroup.add(sprite);
    },
    showNumbers: function() {
      this.uiDudeCountLabel.setText(this.numberOfDudes.toString());
    },
    showCloseness: function() {
      var multiplier = this.desireCloseness ? 1 : 0.25;
      this.playfield.scale.setTo(multiplier, multiplier);
    }
  };

  module.exports = Play;

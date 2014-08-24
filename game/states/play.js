
  'use strict';
  function Play() {}
  function WanderingDude(game, x, y, options) {
    this.affiliation = options.affiliation;
    Phaser.Sprite.call(this, game, x, y, 'dude' + this.affiliation);

    // this.timeSinceLastTurn = 0;
    // this.timeSinceLastMateSeen = 0;
    // this.desiredLocation = new Phaser.Point();
      this.game.physics.arcade.enable(this);
      this.health = 100;
      this.body.collideWorldBounds = true;
      this.body.bounce.set(1.0);
      this.game.time.events.add(Phaser.Timer.SECOND * 5, this.turn, this);
  }
  WanderingDude.prototype = Object.create(Phaser.Sprite.prototype);
  WanderingDude.prototype.constructor = WanderingDude;
  WanderingDude.prototype.update = function() {
    // collision with invisible walls is hard
    // hardcoded sector borders:  [[150,200], [860,460]]
    if(this.x < 150) {
      this.body.velocity.x = Math.abs(this.body.velocity.x) * this.body.bounce.x;
    }
    if(this.x > 860) {
      this.body.velocity.x = -1 * Math.abs(this.body.velocity.x) * this.body.bounce.x;
    }

    if(this.y < 200) {
      this.body.velocity.y = Math.abs(this.body.velocity.y) * this.body.bounce.y;
    }
    if(this.y > 460) {
      //this.y = 460;
      this.body.velocity.y = -1 * Math.abs(this.body.velocity.y) * this.body.bounce.y;
    }
  }
  WanderingDude.prototype.turn = function() {
    var oldX = this.body.velocity.x;
    var oldY = this.body.velocity.y;
    this.body.velocity.x = oldY;
    this.body.velocity.y = oldX;
  }

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
      this.numberOfBros = 0;

      this.buildingsGroup = this.game.add.group(this.playfield);
      this.buildingsGroup.z = 2;
      this.dudeHouse = this.game.add.sprite(200, 240, 'hut1');
      this.dudeHouse.inputEnabled = true;
      this.dudeHouse.events.onInputDown.add(this.onSpawnButton, this);

      this.broHouse = this.game.add.sprite(700, 400, 'hut2');
      this.broHouse.inputEnabled = true;
      this.broHouse.events.onInputDown.add(this.spawnEnemy, this);
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
      this.uiGroup.add(this.uiZoomButton);
      var counterStyle = {font: '20px Arial', fill: '#d0d0d0', stroke: '#303030', strokeThickness: 4, align: 'left'};
      this.uiDudeCountLabel = this.game.add.text(this.dudeHouse.x,this.dudeHouse.y, '', counterStyle);
      this.uiDudeCountLabel.anchor.setTo(0.5, 0.5)
      this.uiBroCountLabel = this.game.add.text(this.broHouse.x,this.broHouse.y, '', counterStyle);
      this.uiBroCountLabel.anchor.setTo(0.5, 0.5)


      this.uiGroup.add(this.uiDudeCountLabel);
      this.uiGroup.add(this.uiBroCountLabel)

      this.game.physics.startSystem(Phaser.Physics.ARCADE);
    },
    update: function() {
      this.game.physics.arcade.collide(this.dudesGroup, this.sectorBorders);
      this.game.physics.arcade.collide(this.brosGroup, this.sectorBorders);
      this.game.physics.arcade.collide(this.dudesGroup, this.brosGroup);
      this.showCloseness();
      this.showNumbers();
    },
    render: function() {
      //this.game.debug.bodyInfo(window.myborders[0], 32, 32);
    },
    onZoomButton: function() {
      this.desireCloseness = !this.desireCloseness;
    },
    onSpawnButton: function() {
      this.numberOfDudes++;
      var dude = new WanderingDude(this.game, this.dudeHouse.x, this.dudeHouse.y, {affiliation: 1});
      dude.body.velocity.x = -25;
      this.dudesGroup.add(dude);
    },
    spawnEnemy: function() {
      this.numberOfBros++;
      var sprite = new WanderingDude(this.game, this.broHouse.x, this.broHouse.y, {affiliation: 2});
      this.game.physics.arcade.enable(sprite);
      sprite.body.velocity.y = -25;
      this.brosGroup.add(sprite);
    },
    showNumbers: function() {
      this.uiDudeCountLabel.setText(this.numberOfDudes.toString());
      this.uiBroCountLabel.setText(this.numberOfBros.toString());
    },
    showCloseness: function() {
      var multiplier = this.desireCloseness ? 1 : 0.25;
      this.playfield.scale.setTo(multiplier, multiplier);
    }
  };

  module.exports = Play;

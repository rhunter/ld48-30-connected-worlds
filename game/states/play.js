
  'use strict';
  // XXX: monkey patch
  // Phaser (in 2.0.7) doesn't scale bodies when their parent sprite is scaled indirectly (via a group)

    var updateBoundsConsideringContainerScale = function () {
        // this bit is relevant
        var ptr, asx = 1, asy = 1;
        for (ptr = this.sprite; ptr.parent ; ptr = ptr.parent) {
          asx *= ptr.scale.x;
          asy *= ptr.scale.y;
        }

        asx = Math.abs(asx);
        asy = Math.abs(asy);

        if (asx !== this._sx || asy !== this._sy)
        {
            this.width = this.sourceWidth * asx;
            this.height = this.sourceHeight * asy;
            this.halfWidth = Math.floor(this.width / 2);
            this.halfHeight = Math.floor(this.height / 2);
            this._sx = asx;
            this._sy = asy;
            this.center.setTo(this.position.x + this.halfWidth, this.position.y + this.halfHeight);

            this._reset = true;
        }

    }


  function Play() {}
  function Island(x, y, game, parent, name, addToStage, enableBody, physicsBodyType) {
    var actualName = name ? name : 'island';
    Phaser.Group.prototype.constructor.call(this, game, parent, actualName, addToStage, enableBody, physicsBodyType);

    this.outerSprite = this.create(x, y, 'landouter');
    this.outerSprite.anchor.setTo(0.5, 0.5);
    this.innerSprite = this.create(x, y, 'landsurface');
    this.innerSprite.anchor.setTo(0.5, 0.5);
    this.outerSprite.position = this.innerSprite.position; // everything should move together
    this.outerSprite.z = 10;
    this.innerSprite.z = 12;
    this.game.physics.arcade.enable(this.innerSprite);
    this.innerSprite.body.updateBounds = updateBoundsConsideringContainerScale;
    this.hasMadeContactWithAnotherLand = false;
  }

  Island.prototype = Object.create(Phaser.Group.prototype);
  Island.prototype.constructor = Island;
  Island.prototype.update = function() {
  }
  function WanderingDude(game, x, y, options) {
    this.affiliation = options.affiliation;
    this.rallyFlag = options.rallyFlag;
    Phaser.Sprite.call(this, game, x, y, 'dude' + this.affiliation);

    // this.timeSinceLastTurn = 0;
    // this.timeSinceLastMateSeen = 0;
      this.desiredLocation = new Phaser.Point();
      this.game.physics.arcade.enable(this);
      this.body.updateBounds = updateBoundsConsideringContainerScale;
      this.anchor.setTo(0.5, 1.0);
      this.health = 100;
      this.body.collideWorldBounds = false;
      this.body.bounce.set(1.0);

      var when = this.game.rnd.between(3,8);

      this.game.time.events.add(Phaser.Timer.SECOND * when, this.decideNextMove, this);
  }
  WanderingDude.prototype = Object.create(Phaser.Sprite.prototype);
  WanderingDude.prototype.constructor = WanderingDude;
  WanderingDude.prototype.update = function() {
    // collision with invisible walls is hard
    // (or is it? what about sprite.overlapping(playfield))
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
  WanderingDude.prototype.decideNextMove = function() {
    //if rally point flag is set, go there
    if (this.rallyFlag.visible) {
      this.desiredLocation.copyFrom(this.rallyFlag.position);
    }

    //if there are enemies nearby, head toward them
    //if there are friends nearby, head away from them
    //otherwise just go wherever
    else {
      this.aimForWherever();
    }

    this.turnTowardDesire();

    this.game.time.events.add(Phaser.Timer.SECOND * this.game.rnd.between(3,8), this.decideNextMove, this);
  };
  WanderingDude.prototype.aimForWherever = function() {
    this.desiredLocation.x = this.game.rnd.between(0,800);
    this.desiredLocation.y = this.game.rnd.between(300, 500);
  }
  WanderingDude.prototype.turnTowardDesire = function() {
    var newVelocity = Phaser.Point.subtract(this.desiredLocation, this.position).setMagnitude(25);
    this.body.velocity.copyFrom(newVelocity);
  }
  WanderingDude.prototype.damage = function(amount) {
    Phaser.Sprite.prototype.damage.call(this, amount);
    if (this.alive) {
      this.flash();
    }
  }
  WanderingDude.prototype.flash = function() {
    var restoreTint = function() {
      this.tint = 0xffffff;
    }
    this.tint = 0xff8080;

    this.game.time.events.add(100, restoreTint, this);
  }

  Play.prototype = {
    init: function() {
      this.hasPlayerAchievedVictory = false;
      this.desireCloseness = true;
      this.numberOfAvailableDudes = 30;
      this.numberOfAvailableBros = 30;
      this.game.world.setBounds(0,0,1024,768);
    },
    create: function() {
      this.skyLayer = this.game.add.group(this.game.world, 'sky');
      this.skyLayer.z = 0;
      this.skyLayer.add(this.game.add.sprite(0,0,'sky'));
      this.playfield = this.game.add.group(this.game.world, 'playfield');
      this.playfield.z = 1;

      this.land1 = new Island(540, 330, this.game, this.playfield, 'land1');
      this.landSprite = this.land1.innerSprite;
      this.land1.z = 0;
      this.land2 = new Island(1600, 400, this.game, this.playfield, 'land2');
      this.land2.z = 1;
      this.landSprite2 = this.land2.innerSprite;
      this.landSprite2.inputEnabled = true;
      this.landSprite2.events.onInputDown.add(this.onTouchLand, this);
      this.landSprite.inputEnabled = true;
      this.landSprite.events.onInputDown.add(this.onTouchLand, this);

      this.buildingsGroup = this.game.add.group(this.land1);
      this.buildingsGroup.z = 2;
      this.dudeHouse = this.game.add.sprite(200, 240, 'hut1');
      this.dudeHouse.anchor.setTo(0.5, 0.7)
      this.dudeHouse.inputEnabled = true;
      this.dudeHouse.events.onInputDown.add(this.onSpawnButton, this);

      this.broHouse = this.game.add.sprite(700, 400, 'hut2');
      this.broHouse.anchor.setTo(0.5, 0.5)
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
      this.uiDudeCountLabel = this.game.add.text(this.dudeHouse.x,this.dudeHouse.y - 65, '', counterStyle);
      this.uiDudeCountLabel.anchor.setTo(0.5, 0.5)
      this.uiBroCountLabel = this.game.add.text(this.broHouse.x,this.broHouse.y - 35, '', counterStyle);
      this.uiBroCountLabel.anchor.setTo(0.5, 0.5)


      this.playfield.add(this.uiDudeCountLabel);
      this.playfield.add(this.uiBroCountLabel)

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.dyingSounds = [
        this.game.add.sound('cry1'),
        this.game.add.sound('cry2'),
        this.game.add.sound('cry3'),
        this.game.add.sound('cry4'),
        this.game.add.sound('cry5'),
        this.game.add.sound('cry6'),
        this.game.add.sound('cry7'),
        this.game.add.sound('cry8'),
        this.game.add.sound('cry9'),
        this.game.add.sound('cry10')
      ];
      this.attackSounds = [
        this.game.add.sound('sword1'),
        this.game.add.sound('sword2'),
        this.game.add.sound('sword3'),
        this.game.add.sound('sword4'),
        this.game.add.sound('sword5'),
        this.game.add.sound('sword6'),
        this.game.add.sound('sword7'),
        this.game.add.sound('sword8'),
        this.game.add.sound('sword9'),
        this.game.add.sound('sword10'),
        this.game.add.sound('sword11'),
        this.game.add.sound('sword12'),
        this.game.add.sound('sword13'),
        this.game.add.sound('sword14'),
        this.game.add.sound('sword15'),
        this.game.add.sound('sword16'),
        this.game.add.sound('sword17'),
        this.game.add.sound('sword18'),
        this.game.add.sound('sword19'),
        this.game.add.sound('sword20'),
        this.game.add.sound('sword21'),
        this.game.add.sound('sword22'),
        this.game.add.sound('sword23'),
        this.game.add.sound('sword24'),
        this.game.add.sound('sword25'),
        this.game.add.sound('sword26'),
        this.game.add.sound('sword27'),
        this.game.add.sound('sword28'),
      ];
      this.buttonSound = this.game.add.sound('buttonpress');
      this.deadButtonSound = this.game.add.sound('buttonfail');
      this.flagPlantedSound = this.game.add.sound('flagup');
      this.flagRemovedSound = this.game.add.sound('flagdown');
      this.scrapingSound = this.game.add.sound('worldscrape');
      this.music = this.game.add.sound('music',1,true);
      this.music.play();

      this.targetFlag = this.game.add.sprite(0,0, 'flag');
      this.targetFlag.anchor.setTo(0.5, 0.5);
      this.targetFlag.alpha = 0.2;
      this.targetFlag.visible = false;
      this.targetFlag.inputEnabled = true;
      this.targetFlag.events.onInputDown.add(this.onTouchFlag, this);
      this.playfield.add(this.targetFlag)

      this.enemyFlag = this.game.add.sprite(0,0, 'flag');
      this.enemyFlag.visible = false;

      this.explosionEmitter = this.game.add.emitter(0,0, 100);
      this.explosionEmitter.makeParticles('noisered');
      this.explosionEmitter.gravity = 200;

      this.cursors = this.game.input.keyboard.createCursorKeys();

      this.playfield.sort();
    },
    update: function() {
      this.game.physics.arcade.collide(this.dudesGroup, this.brosGroup, this.onFolksMeet, null, this);
      if (!this.landSprite.hasMadeContactWithAnotherLand) {
        this.game.physics.arcade.collide(this.land1, this.land2, this.onWorldsCollide, null, this);
      }
      this.handleScrolling();
      this.showCloseness();
      this.showNumbers();
      this.maybeWin();
      if(this.hasPlayerAchievedVictory) {
        this.game.time.events.add(Phaser.Timer.SECOND * 4, this.onWin, this);
      }
    },
    render: function() {
      // this.dudesGroup.forEachAlive(this.game.debug.body, this.game.debug);
      // this.brosGroup.forEachAlive(this.game.debug.body, this.game.debug);
      // this.game.debug.body(this.landSprite);
      // this.game.debug.body(this.landSprite2);
      // this.game.debug.bodyInfo(this.landSprite2, 32, 32);
    },
    shutdown: function() {
      this.music.stop();
    },
    onZoomButton: function() {
      this.desireCloseness = !this.desireCloseness;
    },
    onFolksMeet: function(dude, bro) {
      dude.damage(20);
      bro.damage(30);
      this.game.rnd.pick(this.attackSounds).play();
      this.game.rnd.pick(this.attackSounds).play();
    },
    onWorldsCollide: function(land1, land2) {
      console.debug('crash! boom!');
      this.scrapingSound.play();

      land1.hasMadeContactWithAnotherLand = true;
      land2.hasMadeContactWithAnotherLand = true;
      this.game.add.tween(land1.body.velocity).to({x: 0, y: 0}, 2000, Phaser.Easing.Linear.None, true);
      this.game.add.tween(land2.body.velocity).to({x: 0, y: 0}, 2000, Phaser.Easing.Linear.None, true);
    },
    onSpawnButton: function() {
      if (this.numberOfAvailableDudes < 1) {
        this.deadButtonSound.play();
        return;
      }
      this.numberOfAvailableDudes--;
      var dude = new WanderingDude(this.game, this.dudeHouse.x, this.dudeHouse.y, {affiliation: 1, rallyFlag: this.targetFlag});
      dude.body.velocity.setTo(25, 25);
      this.dudesGroup.add(dude);
      this.buttonSound.play();
    },
    onDudeKilled: function(dude) {
      var sound = this.game.rnd.pick(this.dyingSounds);
      sound.play();

      this.explosionEmitter.at(dude);
      this.explosionEmitter.start(true, 300, null, 10)
    },
    onTouchLand: function(land, pointer) {
      if (!this.desireCloseness) {
        this.landSprite.tint = 0x808080;
        this.landSprite2.tint = 0x808080;
        land.tint = 0xffffff;
        return;
      }
      // XXX: only works with unzoomed map
      var worldPositionTouched = Phaser.Point.add(this.game.camera, pointer.positionDown);
      this.plantFlagAt(worldPositionTouched);
    },
    onTouchFlag: function(flag, pointer) {
      this.removeFlag();
    },
    onWin: function() {
      var blackness = this.game.add.graphics(0,0);
      blackness.beginFill('black');
      blackness.drawRect(0,0,this.game.width, this.game.height);
      blackness.alpha = 1;
      blackness.endFill();
      var fadingTween = this.game.add.tween(blackness).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
      fadingTween.onComplete.add(this.advanceToWinScreen, this);
    },
    advanceToWinScreen: function() {
      this.game.state.start('gameover');
    },
    spawnEnemy: function() {
      if (this.numberOfAvailableBros < 1) {
        this.deadButtonSound.play();
        return;
      }
      this.numberOfAvailableBros--;
      var sprite = new WanderingDude(this.game, this.broHouse.x, this.broHouse.y, {affiliation: 2, rallyFlag: this.enemyFlag});
      this.game.physics.arcade.enable(sprite);
      sprite.body.velocity.setTo(-25, 25);
      sprite.events.onKilled.add(this.onDudeKilled, this);
      this.brosGroup.add(sprite);
      this.buttonSound.play();
    },
    handleScrolling: function() {
      if (this.cursors.left.isDown) {
        this.game.camera.x -= 4
      }
      if (this.cursors.right.isDown) {
        this.game.camera.x += 4
      }
    },
    showNumbers: function() {
      this.uiDudeCountLabel.visible = this.desireCloseness;
      this.uiBroCountLabel.visible = this.desireCloseness;

      this.uiDudeCountLabel.setText(this.numberOfAvailableDudes.toString() + '(+' + this.dudesGroup.countLiving() + ')');
      this.uiBroCountLabel.setText(this.numberOfAvailableBros.toString() + '(+' + this.brosGroup.countLiving() + ')');
    },
    showCloseness: function() {
      var multiplier = this.desireCloseness ? 1 : 0.25;
      this.playfield.scale.setTo(multiplier, multiplier);
    },
    maybeWin: function() {
      if (this.brosGroup.countLiving() > 0) { return; }
      if (this.numberOfAvailableBros > 0) { return; }
      this.hasPlayerAchievedVictory = true;
    },
    plantFlagAt: function(pos) {
      this.targetFlag.position.copyFrom(pos);
      this.targetFlag.visible = true; // TODO: slide in/up
      this.targetFlag.alpha = 1.0;
      var fadingTween = this.game.add.tween(this.targetFlag).to({alpha: 0.25}, 200, Phaser.Easing.Linear.None, true);
      this.flagPlantedSound.play();

      if (!this.landSprite2.hasMadeContactWithAnotherLand) {
        //TODO: replace with physics.accelerateTo
        var newLandVelocity = Phaser.Point.subtract(pos, this.landSprite2.position).setMagnitude(10);
        this.landSprite2.body.velocity.copyFrom(newLandVelocity);
      }
    },
    removeFlag: function() {
      this.targetFlag.visible = false; // TODO: slide away
      this.flagRemovedSound.play();
    }
  };

  module.exports = Play;

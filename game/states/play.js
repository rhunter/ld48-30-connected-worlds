
  'use strict';
  function Play() {}
  function WanderingDude(game, x, y, options) {
    this.affiliation = options.affiliation;
    Phaser.Sprite.call(this, game, x, y, 'dude' + this.affiliation);

    // this.timeSinceLastTurn = 0;
    // this.timeSinceLastMateSeen = 0;
    // this.desiredLocation = new Phaser.Point();
      this.game.physics.arcade.enable(this);
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
    //if there are enemies nearby, head toward them
    //if there are friends nearby, head away from them
    //otherwise just go wherever
    this.turn();

    this.game.time.events.add(Phaser.Timer.SECOND * this.game.rnd.between(3,8), this.decideNextMove, this);
  };
  WanderingDude.prototype.turn = function() {
    this.body.velocity.x = this.game.rnd.pick([-25,0,25]);
    this.body.velocity.y = this.game.rnd.pick([-25,0,0,0,25]);
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
      this.skyLayer = this.game.add.group();
      this.skyLayer.z = 0;
      this.skyLayer.add(this.game.add.sprite(0,0,'sky'));
      this.playfield = this.game.add.group();
      this.playfield.z = 1;
      this.playfield.add(this.game.add.sprite(0,0,'land'));

      this.buildingsGroup = this.game.add.group(this.playfield);
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


      this.uiGroup.add(this.uiDudeCountLabel);
      this.uiGroup.add(this.uiBroCountLabel)

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
      this.music = this.game.add.sound('music',1,true);
      this.music.play();


      this.explosionEmitter = this.game.add.emitter(0,0, 100);
      this.explosionEmitter.makeParticles('noise');
      this.explosionEmitter.gravity = 200;

      this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    update: function() {
      this.game.physics.arcade.collide(this.dudesGroup, this.brosGroup, this.onFolksMeet, null, this);
      this.handleScrolling();
      this.showCloseness();
      this.showNumbers();
      this.maybeWin();
      if(this.hasPlayerAchievedVictory) {
        this.game.time.events.add(Phaser.Timer.SECOND * 4, this.onWin, this);
      }
    },
    render: function() {
      //this.game.debug.bodyInfo(window.myborders[0], 32, 32);
    },
    onZoomButton: function() {
      this.hasPlayerAchievedVictory = true;
      this.desireCloseness = !this.desireCloseness;
    },
    onFolksMeet: function(dude, bro) {
      dude.damage(20);
      bro.damage(30);
      this.game.rnd.pick(this.attackSounds).play();
      this.game.rnd.pick(this.attackSounds).play();
    },
    onSpawnButton: function() {
      if (this.numberOfAvailableDudes < 1) {
        this.deadButtonSound.play();
        return;
      }
      this.numberOfAvailableDudes--;
      var dude = new WanderingDude(this.game, this.dudeHouse.x, this.dudeHouse.y, {affiliation: 1});
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
      var sprite = new WanderingDude(this.game, this.broHouse.x, this.broHouse.y, {affiliation: 2});
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
    }
  };

  module.exports = Play;

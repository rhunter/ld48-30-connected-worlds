
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.map = this.game.add.tilemap('mytilemap');
      this.map.addTilesetImage('ImageSlotInMap', 'mytileimage');
      this.mapLayer = this.map.createLayer('Ground');
      this.mapLayer.resizeWorld();
      this.game.world.scale.setTo(4, 4);

    },
    update: function() {
      if (this.game.input.mousePointer.isDown) {
        this.clickListener();
      }
    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };

  module.exports = Play;

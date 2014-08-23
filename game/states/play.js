
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.map = this.game.add.tilemap('mytilemap');
      this.map.addTilesetImage('ImageSlotInMap', 'mytileimage');
      this.mapLayer = this.map.createLayer('Ground');
      this.mapLayer.resizeWorld();
      this.desireCloseness = true;
      this.showCloseness();
    },
    update: function() {
      if (this.game.input.mousePointer.isDown) {
        this.clickListener();
      }
      this.showCloseness();
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

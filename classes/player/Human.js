"use strict";

const Player = require('./player.js');

class Human extends Player {
   constructor(name, gameGrid) {
      super(name, gameGrid);
      this.isHuman = true;
   }

}


module.exports = Human;
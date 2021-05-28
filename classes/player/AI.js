"use strict";

const Player = require('./player');

class AI extends Player {
   constructor(name, gameGrid) {
      super(name, gameGrid);
      this.isHuman = false;
   }
}


module.exports = AI;
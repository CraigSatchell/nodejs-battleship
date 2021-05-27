"use strict";

const Player = require('./player');

class AI extends Player {
   constructor(name) {
      super(name);
      this.isHuman = false;
   }

}


module.exports = AI;
"use strict";

const Ship = require('./ship');

class Battleship extends Ship {
   constructor() {
      super();
      this.type = 'battleship';
      this.size = 4;
   }
}


module.exports = Battleship;
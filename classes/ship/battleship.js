"use strict";

const Ship = require('./ship');

class Battleship extends Ship {
   constructor(name, id) {
      super(name, id);
      this.type = 'battleship';
      this.size = 4;
   }
}


module.exports = Battleship;
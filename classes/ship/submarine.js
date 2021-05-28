"use strict";

const Ship = require('./ship');

class Submarine extends Ship {
   constructor() {
      super();
      this.type = 'submarine';
      this.size = 3;
   }
}


module.exports = Submarine;
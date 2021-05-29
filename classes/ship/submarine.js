"use strict";

const Ship = require('./ship');

class Submarine extends Ship {
   constructor(name, id) {
      super(name, id);
      this.type = 'submarine';
      this.size = 3;
   }
}


module.exports = Submarine;
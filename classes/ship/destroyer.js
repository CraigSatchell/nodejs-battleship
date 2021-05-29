"use strict";

const Ship = require('./ship');

class Destroyer extends Ship {
   constructor(name, id) {
      super(name, id);
      this.type = 'destroyer';
      this.size = 2;
   }
}


module.exports = Destroyer;
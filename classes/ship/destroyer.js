"use strict";

const Ship = require('./ship');

class Destroyer extends Ship {
   constructor() {
      super();
      this.type = 'destroyer';
      this.size = 2;
   }
}


module.exports = Destroyer;
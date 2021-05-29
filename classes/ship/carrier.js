"use strict";

const Ship = require('./ship');

class Carrier extends Ship {
   constructor(name, id) {
      super(name, id);
      this.type = 'carrier';
      this.size = 5;
   }

}


module.exports = Carrier;
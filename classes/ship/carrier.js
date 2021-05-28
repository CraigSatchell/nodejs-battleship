"use strict";

const Ship = require('./ship');

class Carrier extends Ship {
   constructor() {
      super();
      this.type = 'carrier';
      this.size = 5;
   }
   
}


module.exports = Carrier;
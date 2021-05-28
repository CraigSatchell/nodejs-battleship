"use strict";

class Ship {
   constructor(name) {
      this.name = name;
      this.size = 0;
      this.hits = 0;
      this.orientation = '';
      this.locStartPos = [];
      this.locHits = [];
      this.locMisses = [];
      this.isSunk = false;
      this.type = 'unknown';
   }
}

module.exports = Ship;
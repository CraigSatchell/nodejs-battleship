"use strict";

class Ship {
   constructor(name, id) {
      this.name = name;
      this.id = id;
      this.size = 0;
      this.hits = 0;
      this.orientation = '';
      this.locNodes = [];
      this.locHits = [];
      this.isSunk = false;
      this.type = 'unknown';
   }
}

module.exports = Ship;
"use strict";

class Player {
   constructor(name, gameGrid) {
      this.name = name;
      this.isHuman = true;
      this.gameGrid = gameGrid;
   }
}


module.exports = Player;
"use strict";

const Ship = require('../ship/ship');
const BattleShip = require('../ship/battleship');
const Carrier = require('../ship/carrier');
const Destroyer = require('../ship/destroyer');
const Submarine = require('../ship/submarine');


class Player {
   constructor(name, gameGrid) {
      this.name = name;
      this.isHuman = true;
      this.gameGrid = gameGrid;
      this.ships = [new BattleShip(), new BattleShip(), new Carrier, new Destroyer, new Submarine ];
   }
}


module.exports = Player;
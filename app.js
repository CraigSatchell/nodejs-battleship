"use strict";

const { pressReturn } = require("./helper");
const Ship = require('./classes/ship/ship');

let gameGrid = [];

const displayBattleGrid = () => {
   const gridLabels = 'A B C D E F G H I J K L M N O P Q R S T'.split(" ");
   console.clear();
   console.log('\n\n\t     1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20');
   for (let i in gridLabels) {
      console.log('\t', gridLabels[i], '  *'.repeat(20));
   }
}



function initGameGrid(rows, grid) {
   if (rows > 0) {
      grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      initGameGrid(rows - 1, grid);
   }
   return grid;
}


//gameGrid = initGameGrid(20, []);
displayBattleGrid();

//console.log(gameGrid);
let ship = new Ship('HSS Samuel');
console.log('\n\t\t', ship.name);

pressReturn('Press RETURN to Quit');
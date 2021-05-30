"use strict";

const { promptFor, pressReturn, cenText, indentText, appBanner, setupGameBanner, appTitle, playGameBanner, promptForPlayerName, colorHitShot, colorMissShot, colorShipNode } = require('./helper');
const { shipList1, shipList2, randShipName } = require('../shiplist');
const AI = require('../classes/player/AI');
const Human = require('../classes/player/human');




// Run application and game simulation
const runApplication = () => {
   let player1;
   let player2;

   [player1, player2] = setupGame(player1, player2);
   //randPlaceShips(player1);
   //let success = placeShip(player1, 0, [2, 17], 'vertical', isAnyNodeOccuppied);
   //let hit = isHit([3, 17], player1);
   //hit = isHit([2, 5], player1);
   viewBattleGridPlayer(player1);
   for (let i in player1.ships) {
      player1.ships[i].isSunk = true;
   }
   if (allSunkPlayer(player1, player2) === player1) {
      console.log('\n\tCongratulation! ' + player2.name + ', you are the winner!');
   } else if (allSunkPlayer(player1, player2) === player2) {
      console.log('\n\tCongratulation! ' + player1.name + ', you are the winner!');
      
   }

   //console.log('place ship ok?', success);
   //console.log(player1.ships[0].locNodes);

}
   


// Setup game parameters (ex. game grid, player info, solo or two player)
const setupGame = (player1, player2) => {
   let loop = true;
   while (loop) {
      setupGameBanner();
      console.log(indentText("Do you wish to play solo or against another person? "));
      let gameMode = promptFor(indentText("Enter 'S' for solo or 'P' for another person: ")).toUpperCase();
      if (gameMode === 'P' || gameMode === 'S') {  // create AI and human player instances as required
         if (gameMode === 'S') {
            player1 = new Human('Player 1', initBattleGrid(20));
            player2 = new AI('AI Player', initBattleGrid(20));
         } else {
            player1 = new Human('Player 1', initBattleGrid(20));
            player2 = new Human('Player 2', initBattleGrid(20));
         }

         randomNamePlayerShips(player1, shipList1);   // random name player 1 ships
         randomNamePlayerShips(player2, shipList2);   // random name player 2 ships
         loop = false;
         //return [player1, player2]  // array containing AI/Human class instances
      }
   }

   player1.name = promptForPlayerName(player1.name);    // get name for player 1
   if (player2.isHuman) {
      player2.name = promptForPlayerName(player2.name);    // get name for player 2
   }

   //console.log('\n' + indentText('E100 >> Player 1:'), player1, '\n\t\tE100 >> Player 2:', player2);

   return [player1, player2]  // array containing AI/Human class instances
}


// Simulate game play
const playGame = (player1, player2) => {
   let activePlayer;
   activePlayer = player1;
   let shot = callShot(activePlayer, isValidShotCoord);
   let gridCoord = convertShot2GridCoords(shot);

}



// Generate random name for player ships
const randomNamePlayerShips = (player, shipList) => {
   for (let i = 0; i < player.ships.length; i++) {
      player.ships[i].name = randShipName(shipList)
   }

}


// Prompt current player for shot using game grid coordinates
const callShot = (player, validShotCallback) => {
   let shot = '';
   let loop = true;
   while (loop) {
      playGameBanner();
      showBattleGrid();    // display battle grid
      shot = promptFor('\t\t\t' + player.name + ' >> Call Shot (ex. F4, A1): ').toUpperCase();
      if (shot.length <= 3 && validShotCallback(shot)) {
         //console.log(shot);
         loop = false;
      }
   }
   return shot    // string containing called shot
}



// Check if player entered valid shot coordinates
const isValidShotCoord = (shotCoord) => {
   const gridRows = 'A B C D E F G H I J K L M N O P Q R S T'.split(' ');
   const gridCols = 20;
   const len = shotCoord.length;
   let rowValue = shotCoord[0];
   let colValue = len === 3 ? parseInt(shotCoord.slice(len - 2, len)) : parseInt(shotCoord[1]);

   if (gridRows.includes(rowValue) && (colValue >= 1 && colValue <= gridCols)) {
      return true;
   }
   return false;  // return boolean
}



// Convert shot coordinates into game grid coordinates
const convertShot2GridCoords = (shotCoord) => {  // 
   let row;
   let col;
   let len = shotCoord.length;
   let gridRows = 'A B C D E F G H I J K L M N O P Q R S T'.split(' ');
   row = gridRows.indexOf(shotCoord[0]); // convert row value
   col = (len === 3 ? parseInt(shotCoord.slice(len - 2, len)) : parseInt(shotCoord[1])) - 1;

   //console.log('\n\tE200 >> Game Grid Coord:', `(${row},${col})`);
   return [row, col]    // array referencing game grid row and column
}


const displayBattleGrid = () => {
   const gridLabels = 'A B C D E F G H I J K L M N O P Q R S T'.split(" ");
   console.log('\n\t     1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20');
   for (let i in gridLabels) {
      console.log('\t', gridLabels[i], '  *'.repeat(20));
   }
   console.log('\n');
}


const viewBattleGridPlayer = (player) => {
   const gridLabels = 'A B C D E F G H I J K L M N O P Q R S T'.split(" ");
   console.log('\n\n\t   1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20');

   for (let i = 0; i < player.battleGrid.length; i++) {
      let row = '\t' + gridLabels[i];
      for (let j = 0; j < player.battleGrid[0].length; j++) {
         if (player.battleGrid[i][j] === '0') {
            row += '  *';
         } else if (player.battleGrid[i][j] === 'XX') {
            row += ' ' + colorMissShot(player.battleGrid[i][j])
         } else if (player.battleGrid[i][j].includes('X')) {
            row += ' ' + colorHitShot(player.battleGrid[i][j])
         } else {
            row += ' ' + colorShipNode(player.battleGrid[i][j])
         }
      }
      console.log(row);
   }
   // display legend
   console.log('\n\n' + cenText('*** SHIP LEGEND ***\n', 76));
   for (let i in player.ships) {
      console.log('\t', player.ships[i].id, '  - ', player.ships[i].name + ' (' + player.ships[i].type + ')');
   }
   console.log('\n\n');
}


// initialize 20x20 player's game grid
const initBattleGrid = (size) => {
   let grid = new Array(size); // create an empty array of length n
   for (var i = 0; i < size; i++) {
      grid[i] = new Array(size); // make each element an array
      grid[i].fill('0');
   }

   //console.log(grid);
   return grid;   // return game grid
}


// Place selected player ship on game grid
const placeShip = (player, shipArrPos, gridCoord, orientation, isAnyNodeOccuppied) => {
   if (isAnyNodeOccuppied(player, gridCoord, player.ships[shipArrPos].size, orientation) === false) {

      if (orientation === 'vertical') {   // vertical ship placement
         for (let i = gridCoord[0]; i < (gridCoord[0] + player.ships[shipArrPos].size); i++) {
            player.battleGrid[i][gridCoord[1]] = player.ships[shipArrPos].id; // populate game grid with ship id value
            player.ships[shipArrPos].locNodes.push([i, gridCoord[1]]);  // add grid coords to ship node props
            player.ships[shipArrPos].orientation = 'vertical';
         }

      } else if (orientation === 'horizontal') {   // horizontal ship placement
         for (let i = gridCoord[1]; i < (gridCoord[1] + player.ships[shipArrPos].size); i < i++) {
            player.battleGrid[gridCoord[0]][i] = player.ships[shipArrPos].id; // populate game grid with ship id value
            player.ships[shipArrPos].locNodes.push([gridCoord[0], i]);  // add grid coords to ship node props
            player.ships[shipArrPos].orientation = 'horizontal';
         }
      }
      return true;   // ship placement was successful
   }
   return false;  // ship placement failed
}



// Randomly place ships on game grid.
const randPlaceShips = (player) => {
   let success = false;
   let maxRowCol = 20;
   let randOrientation;
   let orientation;
   let randRow;
   let randCol;
   for (let i = 0; i < player.ships.length; i++) {
      // random generate ship placement parameters
      while (!success) {
         randOrientation = Math.floor(Math.random() * 2) + 1;
         orientation = randOrientation === 1 ? 'horizontal' : 'vertical';
         randRow = Math.floor(Math.random() * maxRowCol);
         randCol = Math.floor(Math.random() * maxRowCol);

         success = placeShip(player, i, [randRow, randCol], orientation, isAnyNodeOccuppied); // place ship
      }
      success = false;
      //console.log('Ship Type:', player.ships[i].type, '\trow:', randRow, 'col:', randCol, 'orientation:', orientation);
   }
}


// Check whether any items within a range of nodes are occuppied
// on a player's game grid
const isAnyNodeOccuppied = (player, startNode, rangeSize, orientation) => {
   let occuppied = false;
   let count = 0;
   if (orientation === 'vertical') {
      for (let i = startNode[0]; i < (startNode[0] + rangeSize); i++) {
         count = i;
         if (i < 20) {
            if (player.battleGrid[i][startNode[1]] !== '0') {
               occuppied = true;
               break;
            }
         }
      }
   } else if (orientation === 'horizontal') {
      for (let i = startNode[1]; i < (startNode[1] + rangeSize); i++) {
         count = i;
         if (i < 20) {
            if (player.battleGrid[startNode[0]][i] !== '0') {
               occuppied = true;
               break;
            }
         }
      }
   }
   return count >= 20 ? true : occuppied;  // returns true if grid range is out of bounds
}


// Check if player shot was a hit on opponent's game grid
const isHit = (gridCoord, player) => {
   if (player.battleGrid[gridCoord[0]][gridCoord[1]] !== '0') {
      console.log('\n\t\tBoom!');
      markHit(gridCoord, player);   // mark hit on player's game grid
      return true;
   } else {
      markMiss(gridCoord, player);  // mark hit on player's game grid
   }
   return false;
}


// Mark shot as hit on opponent's game grid
const markHit = (gridCoord, player) => {
   let gridValue = player.battleGrid[gridCoord[0]][gridCoord[1]];
   let ship = player.ships.find((ship) => ship.id === gridValue);

   ship.locHits.push(gridCoord);    // add grid coord to ship instance locHits props
   ship.hits += 1;   // increment ship instance hit indicator
   player.battleGrid[gridCoord[0]][gridCoord[1]] = player.battleGrid[gridCoord[0]][gridCoord[1]][0] + 'X' // mark player's game grid with hit indicator
   
   // check whether ship is sunk
   if (isShipSunk(ship)) {
      ship.isSunk = true;
   }
}



// Mark shot as miss on opponent's game grid
const markMiss = (gridCoord, player) => {
   player.battleGrid[gridCoord[0]][gridCoord[1]] = 'XX';
}





// TODO: display current game statistics (i.e, hits, misses, ships sunk, ships damaged, etc)
const displayGameStats = (player1, player2) => {
   /*
      display in game statistic (ex. hits, shots, misses, ships damaged, ships sunk, etc)
   */


}



// Check for game winner after each shot in which there was a hit.
const allSunkPlayer = (player1, player2) => {  // player instances
   let playerAllSunk;

   // checks, player.ships[].isSunk prop for each ship
   playerAllSunk = player1.ships.every(ship => ship.isSunk) ? player1 : null;
   if (playerAllSunk === null) {
      playerAllSunk = player2.ships.every(ship => ship.isSunk) ? player2 : null;
   }

   return playerAllSunk;   // return player instances or null, if no winner was detected
}




// TODO: show relavent event message after each shot whether hit, missed, ship sunk or damaged
const showCommentary = (messages, msgType) => {
   /*
      console.log random game play message (ex. 'ha ha! you missed...)
   */

}




// TODO: show game grid for selected player
const showBattleGrid = () => {
   displayBattleGrid();
}



// Check if ship has been sunk
const isShipSunk = (ship) => {
   if (ship.size === ship.hits || ship.isSunk === true) {
      return true;
   }
   return false;
}


module.exports.runApplication = runApplication;
module.exports.initBattleGrid = initBattleGrid;
"use strict";

const { promptFor, pressReturn, cenText, indentText, appBanner, setupGameBanner, appTitle, playGameBanner, promptForPlayerName, promptForShotCoord, promptForGameMode, colorHitShot, colorMissShot, colorShipNode } = require('./helper');
const { shipList1, shipList2, randShipName } = require('../shiplist');
const AI = require('../classes/player/AI');
const Human = require('../classes/player/human');

const gridSize = 20;    // global variable for battle grid size


// Run application and game simulation
const runApplication = () => {
   let player1;
   let player2;

   [player1, player2] = setupGame(player1, player2);
   playGame(player1, player2);
   console.log('\n\n' + cenText('Thanks for playing Battleship...', 80));
}



// Setup game parameters (ex. battle grid, player info, solo or two player)
const setupGame = (player1, player2) => {
   let loop = true;
   while (loop) {
      setupGameBanner();
      let gameMode = promptForGameMode();
      if (gameMode === 'P' || gameMode === 'S') {  // create AI and human player instances as required
         if (gameMode === 'S') {
            player1 = new Human('Player 1', initBattleGrid(gridSize));
            player2 = new AI('AI Player', initBattleGrid(gridSize));
         } else {
            player1 = new Human('Player 1', initBattleGrid(gridSize));
            player2 = new Human('Player 2', initBattleGrid(gridSize));
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
   let winner = false;
   let shot;
   let gridCoord;
   let response;
   let isAI = !player2.isHuman;
   // console.log(isAI);
   // pressReturn();

   // place ships on battle grid
   randPlaceShips(player1);
   randPlaceShips(player2);

   // rotate shot calls between two players
   while (true) {
      // player 1 call shot
      console.log('\n\n');
      response = promptFor(`\tWait for ${player1.name} >> Press RETURN when READY or 'X' to quit game: `).toUpperCase();
      if (response === 'X') {
         break;
      }

      viewBattleGridPlayer(player1);
      viewBattleGridOpponent(player2);
      shot = callShot(player1, isValidShotCoord);
      gridCoord = convertShot2GridCoords(shot);
      isHit(gridCoord, player2);
      if (checkForWinner(player1, player2) === true) {
         break;
      }

      console.log('\n\n');
      response = promptFor(`\tWait for ${player2.name} >> Press RETURN when READY or 'X' to quit game: `).toUpperCase();
      if (response === 'X') {
         break;
      }

      // player 2 call shot
      viewBattleGridPlayer(player2);
      viewBattleGridOpponent(player1);
      if (player2.isHuman === false) {
         shot = callRandShot(isValidShotCoord)
      } else {
         shot = callShot(player2, isValidShotCoord);
      }

      gridCoord = convertShot2GridCoords(shot);
      isHit(gridCoord, player1);
      if (checkForWinner(player1, player2) === true) {
         break;
      }
   }
}



// check for game winner
const checkForWinner = (player1, player2) => {
   let winner = null;
   if (allSunkPlayer(player1, player2) === player1) {
      console.log('\n\tCongratulation! ' + player2.name + ', you are the winner!');
      winner = true;
   } else if (allSunkPlayer(player1, player2) === player2) {
      console.log('\n\tCongratulation! ' + player1.name + ', you are the winner!');
      winner = true;
   }
   return winner;
}


// Generate random name for player ships
const randomNamePlayerShips = (player, shipList) => {
   for (let i = 0; i < player.ships.length; i++) {
      player.ships[i].name = randShipName(shipList)
   }

}


// Prompt current player for shot using battle grid coordinates
const callShot = (player, validShotCallback) => {
   let shot = '';
   let loop = true;
   while (loop) {
      // playGameBanner();
      // showBattleGrid(player);    // display battle grid
      shot = promptForShotCoord(player);
      if (shot.length <= 3 && validShotCallback(shot)) {
         loop = false;
      }
   }
   return shot    // string containing called shot
}



// Call random shot coordinates
const callRandShot = (isValid) => {
   let loop = true;
   let row;
   let col;
   while (loop) {
      row = Math.floor(Math.random() * gridSize);
      col = Math.floor(Math.random() * gridSize);
      if (isValid([row, col]) === true) {
         loop = false;
      }
   }
   return [row, col]    // return grid coords
}



// Check if player entered valid shot coordinates
const isValidShotCoord = (shotCoord) => {
   const gridRows = 'A B C D E F G H I J K L M N O P Q R S T'.split(' ');
   const gridCols = gridSize;
   const len = shotCoord.length;
   let rowValue = shotCoord[0];
   let colValue = len === 3 ? parseInt(shotCoord.slice(len - 2, len)) : parseInt(shotCoord[1]);

   if (gridRows.includes(rowValue) && (colValue >= 1 && colValue <= gridCols)) {
      return true;
   }
   return false;  // return boolean
}



// Convert shot coordinates into battle grid coordinates
const convertShot2GridCoords = (shotCoord) => {  // 
   let row;
   let col;
   let len = shotCoord.length;
   let gridRows = 'A B C D E F G H I J K L M N O P Q R S T'.split(' ');
   row = gridRows.indexOf(shotCoord[0]); // convert row value
   col = (len === 3 ? parseInt(shotCoord.slice(len - 2, len)) : parseInt(shotCoord[1])) - 1;

   //console.log('\n\tE200 >> battle grid Coord:', `(${row},${col})`);
   return [row, col]    // array referencing battle grid row and column
}


const viewBattleGridPlayer = (player) => {
   const gridLabels = 'A B C D E F G H I J K L M N O P Q R S T'.split(" ");
   playGameBanner();
   console.log('\n' + cenText(player.name, 80));
   console.log('\n' + cenText('<<< Y O U R  B A T T L E  G R I D >>>', 80));
   console.log('\n\n\t   1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20');

   for (let i = 0; i < player.battleGrid.length; i++) {
      let row = '\t' + gridLabels[i];
      for (let j = 0; j < player.battleGrid[0].length; j++) {
         if (player.battleGrid[i][j] === '0') {
            row += '  *';
         } else if (player.battleGrid[i][j] === 'XX') {           // indicates miss
            row += ' ' + colorMissShot(player.battleGrid[i][j]);
         } else if (player.battleGrid[i][j].includes('X')) {      // indicates hit
            row += ' ' + colorHitShot(player.battleGrid[i][j]);
         } else {
            row += ' ' + colorShipNode(player.battleGrid[i][j]);   // indicates intact
         }
      }
      console.log(row);
   }
   // display legend
   console.log('\n\n' + cenText('*** SHIP LEGEND ***\n', 76));
   for (let i in player.ships) {
      if (player.ships[i].isSunk) {
         console.log('\t', colorHitShot(player.ships[i].id), '  - ', player.ships[i].name + ' (' + player.ships[i].type + ')');
      } else {
         console.log('\t', colorShipNode(player.ships[i].id), '  - ', player.ships[i].name + ' (' + player.ships[i].type + ')');
      }
   
   }
   pressReturn();
}



const viewBattleGridOpponent = (player) => {
   const gridLabels = 'A B C D E F G H I J K L M N O P Q R S T'.split(" ");
   playGameBanner();
   console.log('\n' + cenText("<<< O P P O N E N T'S  B A T T L E  G R I D >>>", 80));
   console.log('\n\n\t   1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20');

   for (let i = 0; i < player.battleGrid.length; i++) {
      let row = '\t' + gridLabels[i];
      for (let j = 0; j < player.battleGrid[0].length; j++) {
         if (player.battleGrid[i][j] === '0') {
            row += '  *';
         } else if (player.battleGrid[i][j] === 'XX') {           // indicates miss
            row += ' ' + colorMissShot('  ');
         } else if (player.battleGrid[i][j].includes('X')) {      // indicates hit
            row += ' ' + colorHitShot('  ');
         } else {
            row += '  *';   // indicates intact
         }
      }
      console.log(row);
   }
   console.log('\n');
}


// initialize player's battle grid
const initBattleGrid = (size) => {
   let grid = new Array(size); // create an empty array of length n
   for (var i = 0; i < size; i++) {
      grid[i] = new Array(size); // make each element an array
      grid[i].fill('0');
   }

   //console.log(grid);
   return grid;   // return battle grid
}


// Place selected player ship on battle grid
const placeShip = (player, shipArrPos, gridCoord, orientation, isAnyNodeOccuppied) => {
   if (isAnyNodeOccuppied(player, gridCoord, player.ships[shipArrPos].size, orientation) === false) {
      if (orientation === 'vertical') {   // vertical ship placement
         for (let i = gridCoord[0]; i < (gridCoord[0] + player.ships[shipArrPos].size); i++) {
            player.battleGrid[i][gridCoord[1]] = player.ships[shipArrPos].id; // populate battle grid with ship id value
            player.ships[shipArrPos].locNodes.push([i, gridCoord[1]]);  // add grid coords to ship node props
            player.ships[shipArrPos].orientation = 'vertical';
         }

      } else if (orientation === 'horizontal') {   // horizontal ship placement
         for (let i = gridCoord[1]; i < (gridCoord[1] + player.ships[shipArrPos].size); i < i++) {
            player.battleGrid[gridCoord[0]][i] = player.ships[shipArrPos].id; // populate battle grid with ship id value
            player.ships[shipArrPos].locNodes.push([gridCoord[0], i]);  // add grid coords to ship node props
            player.ships[shipArrPos].orientation = 'horizontal';
         }
      }
      return true;   // ship placement was successful
   }
   return false;  // ship placement failed
}



// Randomly place ships on battle grid.
const randPlaceShips = (player) => {
   let success = false;
   let maxRowCol = gridSize;
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
// on a player's battle grid
const isAnyNodeOccuppied = (player, startNode, rangeSize, orientation) => {
   let occuppied = false;
   let count = 0;
   if (orientation === 'vertical') {
      for (let i = startNode[0]; i < (startNode[0] + rangeSize); i++) {
         count = i;
         if (i < gridSize) {
            if (player.battleGrid[i][startNode[1]] !== '0') {
               occuppied = true;
               break;
            }
         }
      }
   } else if (orientation === 'horizontal') {
      for (let i = startNode[1]; i < (startNode[1] + rangeSize); i++) {
         count = i;
         if (i < gridSize) {
            if (player.battleGrid[startNode[0]][i] !== '0') {
               occuppied = true;
               break;
            }
         }
      }
   }
   return count >= gridSize ? true : occuppied;  // returns true if grid range is out of bounds
}


// Check if player shot was a hit on opponent's battle grid
const isHit = (gridCoord, player) => {
   if (player.battleGrid[gridCoord[0]][gridCoord[1]] !== '0' && !player.battleGrid[gridCoord[0]][gridCoord[1]].includes('X')) {
      console.log('\n' + cenText('Boom! Your opponent has sustained some damage.', 80));
      markHit(gridCoord, player);   // mark hit on player's battle grid
      return true;
   } else {
      markMiss(gridCoord, player);  // mark hit on player's battle grid
      console.log('\n' + cenText('Duh! You missed!', 80));

   }
   return false;
}


// Mark shot as hit on opponent's battle grid
const markHit = (gridCoord, player) => {
   let gridValue = player.battleGrid[gridCoord[0]][gridCoord[1]];
   let ship = player.ships.find((ship) => ship.id === gridValue);

   ship.locHits.push(gridCoord);    // add grid coord to ship instance locHits props
   ship.hits += 1;   // increment ship instance hit indicator
   player.battleGrid[gridCoord[0]][gridCoord[1]] = player.battleGrid[gridCoord[0]][gridCoord[1]][0] + 'X' // mark player's battle grid with hit indicator

   // check whether ship is sunk
   if (isShipSunk(ship)) {
      ship.isSunk = true;
      console.log('\n'+ cenText(`You sank ${player.name}'s ${ship.type} the ${ship.name}.`,80))
   }
}



// Mark shot as miss on opponent's battle grid
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




// TODO: show battle grid for selected player
const showBattleGrid = (player) => {
   viewBattleGridOpponent(player);     // view opponent's battle grid
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

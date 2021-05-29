"use strict";

const { promptFor, pressReturn, cenText, indentText, appBanner, setupGameBanner, appTitle, playGameBanner, promptForPlayerName } = require('./helper');
const { shipList1, shipList2, randShipName } = require('../shiplist');
const AI = require('../classes/player/AI');
const Human = require('../classes/player/human');



// Run application and game simulation
const runApplication = () => {
   let player1;
   let player2;

   [player1, player2] = setupGame(player1, player2);
   //playGame(player1, player2);
   player2.ships.forEach(ship => ship.isSunk = true);
   //console.log('\n\t\tE300 >>', player1.ships);
   console.log('\n\t\tE301 >>', checkForWinner(player1, player2));
   //console.log('\n\n',player1.ships);
}



// Setup game parameters (ex. game grid, player info, solo or two player)
const setupGame = (player1, player2) => {
   let loop = true;
   while (loop) {
      setupGameBanner();
      console.log(indentText("Do you wish to play solo or with another person? "));
      let gameMode = promptFor(indentText("Enter 'S' for solo or 'P' for another person: ")).toUpperCase();
      if (gameMode === 'P' || gameMode === 'S') {  // create AI and human player instances as required
         if (gameMode === 'S') {
            player1 = new Human('Player 1', initGameGrid(20, []));
            player2 = new AI('AI Player', initGameGrid(20, []));
         } else {
            player1 = new Human('Player 1', initGameGrid(20, []));
            player2 = new Human('Player 2', initGameGrid(20, []));
         }

         randomNamePlayerShips(player1, shipList1);   // random name player 1 ships
         randomNamePlayerShips(player2, shipList2);   // random name player 2 ships
         loop = false;
         return [player1, player2]  // array containing AI/Human class instances
      }
   }

   player1.name = promptForPlayerName(player1.name);    // get name for player 1
   if (player2.isHuman) {
      player2.name = promptForPlayerName(player2.name);    // get name for player 2
   }

   console.log('\n' + indentText('E100 >> Player 1:'), player1, '\n\t\tE100 >> Player 2:', player2);

}


// Simulate game play
const playGame = (player1, player2) => {
   let shot = callShot(player1, isValidShotCoords);
   let gridCoords = convertShot2GridCoords(shot);

}



// TODO: place individual player ships on game grid
const placeShip = (player, gridCoord, orientation) => {
   /*
      Check if range game range is occuppied
      if occuppied
         return occuppied = true
      else
         add nodes to player's ship values
         return occupied = false
   */


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
      showGameGrid();    // display battle grid
      shot = promptFor('\t\t\t' + player.name + ' >> Call Shot (ex. F4, A1): ').toUpperCase();
      if (shot.length <= 3 && validShotCallback(shot)) {
         //console.log(shot);
         loop = false;
      }
   }
   return shot    // string containing called shot
}



// Check if player entered valid shot coordinates
const isValidShotCoords = (shotCoords) => {
   let gridRows = 'A B C D E F G H I J K L M N O P Q R S T'.split(' ');
   let gridCols = 20;
   let len = shotCoords.length;
   let rowValue = shotCoords[0];
   let colValue = len === 3 ? parseInt(shotCoords.slice(len - 2, len)) : parseInt(shotCoords[1]);
   // console.log(colValue);
   // pressReturn();

   if (gridRows.includes(rowValue) && (colValue >= 1 && colValue <= gridCols)) {
      return true;
   }
   return false;  // return boolean
}



// Convert shot coordinates into game grid coordinates
const convertShot2GridCoords = (shotCoords) => {  // 
   let row;
   let col;
   let len = shotCoords.length;
   let gridRows = 'A B C D E F G H I J K L M N O P Q R S T'.split(' ');
   row = gridRows.indexOf(shotCoords[0]); // convert row value
   col = (len === 3 ? parseInt(shotCoords.slice(len - 2, len)) : parseInt(shotCoords[1])) - 1;

   console.log('\n\tE200 >> Game Grid Coord:', `(${row},${col})`);
   return [row, col]    // array referencing game grid row and column
}


const displayBattleGrid = () => {
   const gridLabels = 'A B C D E F G H I J K L M N O P Q R S T'.split(" ");
   console.log('\t     1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20');
   for (let i in gridLabels) {
      console.log('\t', gridLabels[i], '  *'.repeat(20));
   }
   console.log('\n');
}


const initGameGrid = (rows, grid) => {
   if (rows > 0) {
      grid.push(['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']);
      initGameGrid(rows - 1, grid);
   }
   return grid;
}


// TODO: check if player shot was a hit on opponent's game grid
const checkForHit = (shotCoords, player) => {
   /*
      check opponent's game grid for hit
      if hit
         mark opponent's game grid with hit
         check if ship sunk
         display status message to console
      else
         mark miss
   */




}


// TODO: mark shot as hit on opponent's game grid
const markHit = (shotCoords, player) => {
   /*
      mark opponent's game grid with hit indicator
   */


}



// TODO: mark shot as miss on opponent's game grid
const markMiss = () => {
   /*
      mark opponent's game grid with hit indicator
   */


}





// TODO: display current game statistics (i.e, hits, misses, ships sunk, ships damaged, etc)
const displayGameStats = (player1, player2) => {
   /*
      display in game statistic (ex. hits, shots, misses, ships damaged, ships sunk, etc)
   */


}



// Check for game winner after each shot in which there was a hit.
const checkForWinner = (player1, player2) => {  // player instances
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
const showGameGrid = () => {
   displayBattleGrid();
}




// TODO: hide game grid for selected player
const hideGameGrid = () => {
   /*
      hide opponent's game grid on demand
   */


}



// TODO: build game grid with relavent markings and status indicators
const buildGameGrid = (player) => {
   /*
      build opponent's game grid
      populate node with hits, misses, ship placement
   */

   // return gameGrid;  
}




// TODO: randomly place ships on game grid.
const randPlaceShips = (player) => {
   /*
      random select shot coords and orientation
      check if shot coords are occuppied
         place ship
      else
         loop random select
   */



}





// TODO: check if ship has been sunk
const checkShipSunk = () => {
   /*
   
   */




}


module.exports.runApplication = runApplication;
module.exports.initGameGrid = initGameGrid;
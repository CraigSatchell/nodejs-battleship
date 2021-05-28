"use strict";

const { pressReturn } = require("./helper");
const Ship = require('./classes/ship/ship');

let gameGrid = [];



//gameGrid = initGameGrid(20, []);

//console.log(gameGrid);
let ship = new Ship('HSS Samuel');
console.log('\n\t\t', ship.name);

pressReturn('Press RETURN to Quit');
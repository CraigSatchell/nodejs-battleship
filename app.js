"use strict";

const { pressReturn } = require("./src/helper");
const Ship = require('./classes/ship/ship');
const { runApplication } = require('./src/gameLogic');

let gameGrid = [];

// Execute app
runApplication();

"use strict";
const cols = 10;
const rows = 16;
const cellSize = 20;
const board = document.getElementById('game-board');
const startPauseText = document.getElementById('start-pause');
const FIGURE_TYPES = {
    0: {
        color: "#F44336",
        matrix: [
            [1],
            [1],
            [1],
            [1]
        ]
    },
    1: {
        color: "#8BC34A",
        matrix: [
            [1, 1],
            [1, 1]
        ]
    },
    2: {
        color: "#FFEB3B",
        matrix: [
            [1, 1, 1],
            [0, 1, 0]
        ]
    },
    3: {
        color: "#9C27B0",
        matrix: [
            [0, 1, 1],
            [1, 1, 0]
        ]
    },
    4: {
        color: "#00BCD4",
        matrix: [
            [1, 1, 0],
            [0, 1, 1]
        ]
    },
    5: {
        color: "#03A9F4",
        matrix: [
            [0, 1],
            [0, 1],
            [1, 1]
        ]
    },
    6: {
        color: "#FF9800",
        matrix: [
            [1, 0],
            [1, 0],
            [1, 1]
        ]
    }
};
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const KEY_UP = 38;
const KEY_ENTER = 13;
let currentFigure = null;
let FILLED_CELLS = {};
let speed = 1000;
let mainSetInterval = 0;
let pause = true;
let gameOverStatus = false;







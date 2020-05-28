"use strict";

function Figures(key) {

    let figure = FIGURE_TYPES[key];
    let color = figure.color;
    let matrix = figure.matrix;
    let width = matrix[0].length;
    let height = matrix.length;
    let x = Math.floor(cols / 2) - Math.floor(width / 2);
    let y = 0;

    function iteration(p = true) {
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (!matrix[i][j]) continue;
                let cellX = j + x;
                let cellY = i + y;
                let cell = document.getElementById(`${cellY}-${cellX}`);
                if (p) {
                    cell.style.backgroundColor = color;
                } else {
                    cell.style.backgroundColor = "";
                }

            }

        }
    }

    this.paint = function () {
        iteration();

    };
    this.cancel = function () {
        iteration(false);

    };

    function canMove(fX, fY) {

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (!matrix[i][j]) continue;
                let cellX = j + x;
                let cellY = i + y;
                let newX = fX(cellX);
                let newY = fY(cellY);
                if (FILLED_CELLS.hasOwnProperty(`${newY}-${newX}`)) {
                    return false;
                }


            }
        }
        return true;
    }


    this.moveRight = function () {
        if (x + width >= cols || !canMove(x => x + 1, y => y)) {
            return;
        }
        this.cancel();
        x++;
        this.paint();

    };

    this.moveLeft = function () {
        if (x <= 0 || !canMove(x => x - 1, y => y)) {
            return;
        }
        this.cancel();
        x--;
        this.paint();

    };


    function gameOver() {
        gameOverStatus = true;
        startPauseText.innerText = 'Game Over!! Press Enter to start';
        startPauseText.style.color = '#de0f1d';
        clearInterval(mainSetInterval);
    }


    function isRowEmpty(y) {

        for (let i = 0; i < cols; i++) {
            if (FILLED_CELLS.hasOwnProperty(`${y}-${i}`)) {
                return false;
            }
        }

        return true;
    }

    function isRowFull(y) {

        for (let i = 0; i < cols; i++) {
            if (!FILLED_CELLS.hasOwnProperty(`${y}-${i}`)) {
                return false;
            }
        }

        return true;
    }


    function stop() {

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (!matrix[i][j]) continue;
                let cellX = j + x;
                let cellY = i + y;
                FILLED_CELLS[`${cellY}-${cellX}`] = color;

            }
        }
        if (!isRowEmpty(0)) return gameOver();
        checkFilledRows();

        paintNewPigure();
    }

    function checkFilledRows() {
        for (let i = rows; i >= y; i--) {

            if (isRowFull(i)) {

                removeCurrentRow(i);
            }

        }

    }

    function removeCurrentRow(y) {

        for (let key in FILLED_CELLS) {

            if (key.startsWith(y)) {
                let el = document.getElementById(key);
                el.style.backgroundColor = '';
                delete FILLED_CELLS[key];
            }
        }

        setTimeout(() => {
            increaseY(y)
        }, 1000);
    }

    function increaseY(y) {
        let newObj = {};

        for (let key in FILLED_CELLS) {
            let k = key.split('-');
            if (k[0] < y) {
                let el = document.getElementById(key);
                el.style.backgroundColor = '';
                k[0] = +k[0] + 1;
                let newKey = k.join('-');
                newObj[newKey] = FILLED_CELLS[key];

            }
        }
        FILLED_CELLS = newObj;
        paintNewBoard();

    }

    function paintNewBoard() {

        for (let key in FILLED_CELLS) {
            let el = document.getElementById(key);
            el.style.backgroundColor = FILLED_CELLS[key];

        }

    }

    this.moveDown = function () {
        if (y + height >= rows || !canMove(x => x, y => y + 1)) {
            stop();
            return;
        }
        this.cancel();
        y++;
        this.paint();

    };







}
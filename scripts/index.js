"use strict";

fillBoard();
window.onkeydown = function (e) {

    switch (e.keyCode) {
        case KEY_LEFT:
            currentFigure.moveLeft();
            break;
        case KEY_RIGHT:
            currentFigure.moveRight();
            break;
        case KEY_DOWN:
            currentFigure.moveDown();
            break;
        case KEY_UP:
            currentFigure.rotateF();
            break;
        case KEY_ENTER:
            startPause();
            break;
    }
};

function fillBoard() {
    board.querySelectorAll('*').forEach(n => n.remove());

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {

            let div = document.createElement('div');
            div.setAttribute("id", `${y}-${x}`);
            div.classList.add('cell');
            div.style.width = div.style.height = cellSize + 'px';
            board.appendChild(div);

        }
    }

    board.style.width = cols * cellSize + 4 + 'px';
    board.style.height = rows * cellSize + 4 + 'px';
    board.style.display = 'block';
    paintNewPigure();


}

function getNewFigure() {
    let randomIndex = getRandomElement(Object.keys(FIGURE_TYPES));
    currentFigure = new Figures(randomIndex);
}


function paintNewPigure() {
    getNewFigure();
    currentFigure.paint();
    return true;
}
function startPause() {

    if(gameOverStatus)
    {
        gameOverStatus = false;
        pause = true;
        FILLED_CELLS = {};
        fillBoard();
        startPause();

    }
    else
    {
        if(pause)
        {
            pause = false;

            mainSetInterval = setInterval(() => currentFigure.moveDown(), speed);
            startPauseText.innerText = 'Press Enter to Pause';
            startPauseText.style.color = '#d27777';

        }
        else
        {
            clearInterval(mainSetInterval);
            pause = true;
            startPauseText.innerText = 'Press Enter to Continue';
            startPauseText.style.color = '#a1c3de';
        }

    }


}
















function createSketchBoard(size) {

    const sketchContainer = document.querySelector('.sketch-container');

    for(let i = 1; i <= size; i++) {
        const grid = document.createElement('div');
        sketchContainer.appendChild(grid);
    }
}

createSketchBoard(16);
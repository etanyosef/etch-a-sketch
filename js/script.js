// set brush color
const brushColor = document.querySelector('.brush-color');
const txtColor = document.querySelector('.text-color');
color = brushColor.value;
txtColor.textContent = color;


// initialize sketch board
function createSketchBoard(size) {

    const sketchContainer = document.querySelector('.sketch-board');

    // generate grid on size
    for (let i = 1; i <= size; i++) {
        const xGrid = document.createElement('div');
        xGrid.classList.add('x-grid');
        sketchContainer.appendChild(xGrid);

        for (let i = 1; i <= size; i++) {
            const yGrid = document.createElement('div');
            yGrid.classList.add('grid');
            xGrid.appendChild(yGrid);
        }   
    }

    brush(color);
}
createSketchBoard(16);



// set size based on range input
const sizeInput = document.querySelector('.grid-size');
sizeInput.addEventListener('mouseup', getSize);
function getSize() {
    let size = sizeInput.value;

    const txtSize = document.querySelector('.text-size');
    txtSize.textContent = size;
    
    // clean sketchboard
    const sketchBoard = document.querySelector('.sketch-board');
    while(sketchBoard.firstChild) {
        sketchBoard.removeChild(sketchBoard.firstChild);
    }

    return createSketchBoard(size);
}


function brush(color) {
    // change grid color
    const grids = document.querySelectorAll('.grid');
    grids.forEach( grid => {
        grid.addEventListener('mouseover', () => {
            grid.style.backgroundColor = color;
        });
    });
}


// set brush color everytime user change the color on color picker
brushColor.addEventListener('input', () => {
    txtColor.textContent = brushColor.value;
    return brush(brushColor.value);
});


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
}
createSketchBoard(16);

// change grid color to black on mouseover on each grid
const grids = document.querySelectorAll('.grid');
grids.forEach( grid => {
    grid.addEventListener('mouseover', () => {
        grid.style.backgroundColor = 'black'
    });
});

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

function brush() {

}

const brushColor = document.querySelector('.brush-color');
brushColor.addEventListener('change', () => {
    console.log(brushColor.value)
});
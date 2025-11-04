// set brush color
const brushColor = document.querySelector('.brush-color');
const txtColor = document.querySelector('.text-color');
txtColor.textContent = brushColor.value;

let brushMode = 'Color';


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

    brush(brushColor.value);
}
createSketchBoard(16);



// set size based on range input
const sizeInput = document.querySelector('.grid-size');
sizeInput.addEventListener('input', getSize);
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
    if(brushMode === 'Random') {

        const grids = document.querySelectorAll('.grid');
        grids.forEach( grid => {
            grid.addEventListener('mouseover', () => {
                let red, green, blue;
                red = Math.floor(Math.random() * 255);
                green = Math.floor(Math.random() * 255);
                blue = Math.floor(Math.random() * 255);
                color = `rgb(${red}, ${green}, ${blue})`;
                grid.style.backgroundColor = color;
                // remove filter from inline css from grid
                grid.style.removeProperty('filter');
            });
        });

    } else if(brushMode === 'Color') {

        const grids = document.querySelectorAll('.grid');
        grids.forEach( grid => {
            grid.addEventListener('mouseover', () => {
                grid.style.backgroundColor = color;
                grid.style.removeProperty('filter');
            });
        });

    } else if(brushMode === 'Progressive Darkening') {
        let i = 0;
        const grids = document.querySelectorAll('.grid');
        grids.forEach( grid => {
            grid.addEventListener('mouseover', () => {
                // add .10 opacity everytime the user mouseover a grid until it reaches .90
                if (i != 90) {
                    i =+ i + 10;
                    grid.style.filter = `opacity(0.${i})`;
                }
                grid.style.backgroundColor = color;
            });
        });
    }

}


// set brush color everytime user change the color on color picker
brushColor.addEventListener('input', () => {
    txtColor.textContent = brushColor.value;
    // when user select on color picker, automatically switch to color mode from random mode
    // dont switch if user is in progressive darkening mode
    if (brushMode === 'Progressive Darkening') {
        progressiveDarkening();
    } else {
        colorMode();
    }
    return brush(brushColor.value);
});

const btnColor = document.querySelector('.btn-color');
btnColor.addEventListener('click', colorMode);

function colorMode() {
    brushMode = 'Color';
    brush(brushColor.value);
    btnColor.classList.add('active');
    btnRandomizeColor.classList.remove('active');
    btnProgressiveDarkening.classList.remove('active');
}

const btnRandomizeColor = document.querySelector('.btn-randomize-color');
btnRandomizeColor.addEventListener('click', () => {
    brushMode = 'Random';
    brush();
    btnColor.classList.remove('active');
    btnRandomizeColor.classList.add('active');
    btnProgressiveDarkening.classList.remove('active');
});

const btnProgressiveDarkening = document.querySelector('.btn-progressive-darkening');
function progressiveDarkening() {
    brushMode = 'Progressive Darkening';
    brush(brushColor.value);
    btnColor.classList.remove('active');
    btnRandomizeColor.classList.remove('active');
    btnProgressiveDarkening.classList.add('active');
}
btnProgressiveDarkening.addEventListener('click', progressiveDarkening);
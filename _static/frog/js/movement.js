const container = document.getElementById('container');
const pond = document.getElementById('pond');
const frog = document.getElementById('frog');
const frogInPond = document.getElementById('frog_success');

const containerRect = container.getBoundingClientRect();
// container is quadratic: length = height = width
// containerLength declares the maximum distance a frog can jump
const containerLength = containerRect.right - containerRect.left;

let splashAudio = new Audio();
let quakAudio = new Audio();
let reminderAudio = new Audio();

let noInteraction = true;

frog.addEventListener('click', getClickPosition, false);

function initializeJs(pathToSplashAudio, pathToQuakAudio, pathToReminderAudio) {
    splashAudio = new Audio(pathToSplashAudio);
    quakAudio = new Audio(pathToQuakAudio);
    reminderAudio = new Audio(pathToReminderAudio);
    randomizeFrogPosition();
    setTimeout(playReminder, 20000);
}

function randomizeFrogPosition() {
    const minX = 0;
    // frog should be a decent distance away from the pond
    // => shift top boundary to bottom
    const minY = Math.ceil(containerLength - 0.6 * containerLength);
    // frog is 15% the size of the container
    // => shift right boundary 15% to the left
    const max = Math.floor(containerLength - 0.15 * containerLength);
    
    // compute random X and Y coordinates for frog
    const randomX = Math.floor(Math.random() * (max - minX + 1) + minX);
    const randomY = Math.floor(Math.random() * (max - minY + 1) + minY);

    // position frog at random coordinates
    frog.style.left = randomX.toString() + "px";
    frog.style.top = randomY.toString() + "px";
    frog.style.visibility = "visible";
}

function getClickPosition(e) {
    frog.removeEventListener('click', getClickPosition);
    noInteraction = false;

    // coordinates of click position on frog
    const x = e.clientX;
    const y = e.clientY;

    // coordinates of frog box
    const frogRect = frog.getBoundingClientRect();
    const frogLeft = frogRect.left;
    const frogRight = frogRect.right;
    const frogTop = frogRect.top;
    const frogBottom = frogRect.bottom;

    // coordinates of frog center
    const middleX = (frogRight + frogLeft) / 2;
    const middleY = (frogBottom + frogTop) /2;

    // how far away is the click from the middle of the frog (as absolute value)?
    const leftOffsetToMiddle = middleX - x;
    const topOffsetToMiddle = middleY - y;
    // width and height of the frog
    const frogWidth = frogRight - frogLeft;
    const frogHeight = frogBottom - frogTop;
    // how far away is the click from the middle of the frog (relative to the frog size)?
    const percentageToLeft = leftOffsetToMiddle / (frogWidth / 2);
    const percentageToTop = topOffsetToMiddle / (frogHeight / 2);

    // how far should the frog jump:
    // frog jumps farther if the click is farther away from the middle of the frog
    const movementToLeft = Math.floor(percentageToLeft * containerLength);
    const movementToTop = Math.floor(percentageToTop * containerLength);

    // lets the frog jump
    const transform = `translate(${movementToLeft}px, ${movementToTop}px)`;
    moveFrog(transform);
}

const moveFrog = function (transformation){
    frog.style.transform = transformation;
    setTimeout(checkIfFrogIsInPond, 1400);
};

function checkIfFrogIsInPond() {
    // coordinates of pond box
    const pondRect = pond.getBoundingClientRect();
    const pondLeft = pondRect.left;
    const pondRight = pondRect.right;
    const pondTop = pondRect.top;
    const pondBottom = pondRect.bottom;

    // coordinates of settled frog box
    const frogRect = frog.getBoundingClientRect();
    const frogLeft = frogRect.left;
    const frogRight = frogRect.right;
    const frogTop = frogRect.top;
    const frogBottom = frogRect.bottom;

    // coordinates of settled frog center
    const frogCenterX = (frogRight + frogLeft) / 2;
    const frogCenterY = (frogBottom + frogTop) /2;

    // difficulty: how far can the center of the frog be outside of the pond box (absolute value)
    // 0 means frog center needs to be within the pond box
    // a lower value (e.g. -20) means the frog center can be 20px outside of the pond box
    const difficulty = - 20;

    // check whether frog center is within acceptable box
    if (frogCenterX <= pondLeft + difficulty ||
        frogCenterY >= pondBottom - difficulty ||
        frogCenterX >= pondRight - difficulty ||
        frogCenterY <= pondTop + difficulty) {
        quakAudio.play();
        frogInPond.value = 0;
        frog.style.backgroundColor = "#94CC00";
        frog.style.transform = "rotate(360deg)";
    } else {
        splashAudio.play();
        frogInPond.value = 1;
    }
    frog.style.opacity = "0";
    setTimeout(advanceToNextPage, 1500);
}

function playReminder() {
    if (noInteraction) {
        reminderAudio.play().then(() => {
            setTimeout(playReminder, 20000);
        }).catch(e => {
            console.log(e.message);
            setTimeout(playReminder, 20000);
        }); 
    }
}

function advanceToNextPage() {
  document.getElementById("form").submit();
}
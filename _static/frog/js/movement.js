const container = document.getElementById('container');
const pond = document.getElementById('pond');
const frog = document.getElementById('frog');
const frogInPond = document.getElementById('frog_success');

const containerRect = container.getBoundingClientRect();
// container is quadratic: length == height == width
// containerLength declares the maximum distance a frog can jump
const containerLength = containerRect.right - containerRect.left;

// coordinates of pond box
const pondRect = pond.getBoundingClientRect();
const pondLeft = pondRect.left;
const pondRight = pondRect.right;
const pondTop = pondRect.top;
const pondBottom = pondRect.bottom;

let splashAudio = new Audio();
let quakAudio = new Audio();
let reminderAudio = new Audio();

let noInteraction = true;
let isFirstTry = true;

// difficulty: how far can the center of the frog be outside of the pond box (absolute value)
// 0 means frog center needs to be within the pond box
// a lower value x means the frog center can be x px outside of the pond box (e.g. -20 -> 20px)
const difficulty = - 25;

const randomizeFrogPosition = () => {
    const minX = 0;
    // frog should be a decent distance (60%) away from the pond
    // => shift top boundary to bottom
    const minY = Math.ceil(containerLength - 0.6 * containerLength);
    // frog width needs to be taken into account when positioning by left coordinate
    // => shift right boundary to the left
    const max = Math.floor(containerLength - frog.offsetWidth);
    
    // compute random X and Y coordinates for frog
    const randomX = Math.floor(Math.random() * (max - minX + 1) + minX);
    const randomY = Math.floor(Math.random() * (max - minY + 1) + minY);

    // position frog at random coordinates
    frog.style.left = randomX.toString() + "px";
    frog.style.top = randomY.toString() + "px";
    frog.style.visibility = "visible";
}

const initializeJs = (pathToSplashAudio, pathToQuakAudio, pathToReminderAudio) => {
    splashAudio = new Audio(pathToSplashAudio);
    quakAudio = new Audio(pathToQuakAudio);
    reminderAudio = new Audio(pathToReminderAudio);
    randomizeFrogPosition();
    setTimeout(playReminder, 20000);
}

const getClickPosition = (e) => {
    frog.removeEventListener('click', getClickPosition);
    noInteraction = false;

    // coordinates of click position on frog
    const clickX = e.clientX;
    const clickY = e.clientY;

    // coordinates of frog box
    const frogRect = frog.getBoundingClientRect();
    const frogLeft = frogRect.left;
    const frogRight = frogRect.right;
    const frogTop = frogRect.top;
    const frogBottom = frogRect.bottom;

    // coordinates of frog center
    const middleX = (frogRight + frogLeft) / 2;
    const middleY = (frogBottom + frogTop) / 2;

    // how far away is the click from the middle of the frog (as absolute value)?
    const leftOffsetToMiddle = middleX - clickX;
    const topOffsetToMiddle = middleY - clickY;
    // width and height of the frog
    const frogWidth = frogRight - frogLeft;
    const frogHeight = frogBottom - frogTop;

    // how far away is the click from the middle of the frog (relative to the frog size)?
    const percentageToLeft = leftOffsetToMiddle / (frogWidth / 2);
    const percentageToTop = topOffsetToMiddle / (frogHeight / 2);

    // how far should the frog jump:
    // frog jumps farther if the click is farther away from the middle of the frog
    const movementToRight = Math.floor(percentageToLeft * containerLength);
    const movementToBottom = Math.floor(percentageToTop * containerLength);

    console.log(`movementToRight: ${movementToRight}`)
    console.log(`movementToBottom: ${movementToBottom}`)

    // lets the frog jump
    moveFrogNew(movementToRight, movementToBottom)
}

const moveFrogNew = (right, bottom) => {
    frog.style.left = (frog.offsetLeft + right) + "px";
    frog.style.top = (frog.offsetTop + bottom) + "px";
    setTimeout(proceedAfterMovement, 1400);
}

const proceedAfterMovement = () => {
    if (isFrogInPond()) {
        frogSucceeded();
    } else {
        frogMissed();
    }
}

const isFrogInPond = () => {
    // coordinates of settled frog box
    const frogRect = frog.getBoundingClientRect();
    const frogLeft = frogRect.left;
    const frogRight = frogRect.right;
    const frogTop = frogRect.top;
    const frogBottom = frogRect.bottom;

    console.log(`frogRight: ${frogRight}`)
    console.log(`frogBottom: ${frogBottom}`)

    // coordinates of settled frog center
    const frogCenterX = (frogRight + frogLeft) / 2;
    const frogCenterY = (frogBottom + frogTop) / 2;

    // check whether frog center is within acceptable box
    if (frogCenterX <= pondLeft + difficulty ||
        frogCenterY >= pondBottom - difficulty ||
        frogCenterX >= pondRight - difficulty ||
        frogCenterY <= pondTop + difficulty) {
        return false;
    } else {
        return true;
    }
}

const frogMissed = () => {
    if (!isFirstTry || hasFrogJumpedOutOfWindow()) {
        frogInPond.value = 0;
        animateFrogFail();
        setTimeout(advanceToNextPage, 1500);
    } else {
        frog.addEventListener('click', getClickPosition);
        animateFrogSecondTry();
        isFirstTry = false;
    }
}

const hasFrogJumpedOutOfWindow = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const frogRect = frog.getBoundingClientRect();
    return frogRect.top < -1 || frogRect.left < -1 || frogRect.right > windowWidth || frogRect.bottom > windowHeight;
}

const frogSucceeded = () => {
    frogInPond.value = 1;
    animateFrogSuccess();
    setTimeout(advanceToNextPage, 1500);
}

const animateFrogSecondTry = () => {
    frog.style.borderColor = 'blue';
}

const animateFrogFail = () => {
    quakAudio.play();
    frog.style.backgroundColor = "#94CC00";
    frog.style.transform = "rotate(360deg)";
    frog.style.opacity = "0";
}

const animateFrogSuccess = () => {
    splashAudio.play();
    frog.style.opacity = "0";
}

const playReminder = () => {
    if (noInteraction) {
        reminderAudio.play().then(() => {
            setTimeout(playReminder, 20000);
        }).catch(e => {
            console.log(e.message);
            setTimeout(playReminder, 20000);
        }); 
    }
}

const advanceToNextPage = () => {
  document.getElementById("form").submit();
}

frog.addEventListener('click', getClickPosition, false);
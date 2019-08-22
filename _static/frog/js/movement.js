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

frog.addEventListener('click', getClickPosition, false);

function initializeJs(pathToSplashAudio, pathToQuakAudio) {
    splashAudio = new Audio(pathToSplashAudio);
    quakAudio = new Audio(pathToQuakAudio);
    randomizeFrogPosition();
}

function randomizeFrogPosition() {
    // frog is 15% the size of the container
    const max = Math.floor(containerLength - 0.15 * containerLength);
    const minX = Math.ceil(containerLength - 0.85 * containerLength);
    const randomX = Math.floor(Math.random() * (max - minX + 1) + minX);

    // frog should be a decent distance away from the pond
    const minY = Math.ceil(containerLength - 0.6 * containerLength);
    const randomY = Math.floor(Math.random() * (max - minY + 1) + minY);

    console.log(randomX, randomY);
    frog.style.left = randomX.toString() + "px";
    frog.style.top = randomY.toString() + "px";
    frog.style.visibility = "visible";
}

function getClickPosition(e) {
    frog.removeEventListener('click', getClickPosition);
    const x = e.clientX;
    const y = e.clientY;
    console.log(x, y);

    const frogRect = frog.getBoundingClientRect();
    const frogLeft = frogRect.left;
    const frogRight = frogRect.right;
    const frogTop = frogRect.top;
    const frogBottom = frogRect.bottom;
    console.log(`Frog:\nleft: ${frogLeft}\nfrogTop: ${frogTop}\nright: ${frogRight}\nbottom: ${frogBottom}\n`);
    const frogWidth = frogRight - frogLeft;
    const frogHeight = frogBottom - frogTop;
    const middleX = (frogRight + frogLeft) / 2;
    const middleY = (frogBottom + frogTop) /2;
    console.log(`Frog center: ${middleX}, ${middleY}`);

    const leftOffsetToMiddle = middleX - x;
    const topOffsetToMiddle = middleY - y;

    const percentageToLeft = leftOffsetToMiddle / (frogWidth / 2);
    const percentageToTop = topOffsetToMiddle / (frogHeight / 2);
    console.log(`leftOffsetToMiddle: ${leftOffsetToMiddle}\ntopOffsetToMiddle: ${topOffsetToMiddle}`);
    console.log(`percentageToLeft: ${percentageToLeft}\npercentageToTop: ${percentageToTop}`);

    const movementToLeft = Math.floor(percentageToLeft * containerLength);
    const movementToTop = Math.floor(percentageToTop * containerLength);

    const transform = `translate(${movementToLeft}px, ${movementToTop}px)`;
    moveFrog(transform);
}

const moveFrog = function (transformation){
    console.log(transformation);
    frog.style.transform = transformation;
    setTimeout(checkIfFrogIsInPond, 1400);
};

function checkIfFrogIsInPond() {
    const pondRect = pond.getBoundingClientRect();
    const pondLeft = pondRect.left;
    const pondRight = pondRect.right;
    const pondTop = pondRect.top;
    const pondBottom = pondRect.bottom;
    const frogRect = frog.getBoundingClientRect();
    const frogLeft = frogRect.left;
    const frogRight = frogRect.right;
    const frogTop = frogRect.top;
    const frogBottom = frogRect.bottom;
    const frogCenterX = (frogRight + frogLeft) / 2;
    const frogCenterY = (frogBottom + frogTop) /2;

    if (frogCenterX <= pondLeft || frogCenterY >= pondBottom || frogCenterX >= pondRight || frogCenterY <= pondTop) {
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

function advanceToNextPage() {
  document.getElementById("form").submit();
}
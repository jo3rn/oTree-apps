const container = document.getElementById('container');
const frog = document.getElementById('frog');


const containerRect = container.getBoundingClientRect();
// container is quadratic: length = height = width
// containerLength declares the maximum distance a frog can jump
const containerLength = containerRect.right - containerRect.left;
console.log("container length: " + containerLength);


frog.addEventListener('click', getClickPosition, false);

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
};
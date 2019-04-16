const frog = document.getElementById('frog');

frog.addEventListener('click', getClickPosition, false);

function getClickPosition(e) {
    const x = e.clientX;
    const y = e.clientY;
    console.log(x, y);
    const rect = frog.getBoundingClientRect();
    const left = rect.left;
    const right = rect.right;
    const top = rect.top;
    const bottom = rect.bottom;
    console.log(`left: ${left}\ntop: ${top}\nright: ${right}\nbottom: ${bottom}`);
    const middleX = (right + left) / 2;
    const middleY = (bottom + top) /2;
    console.log(`middle: ${middleX}, ${middleY}`);
    const leftOffsetToMiddle = middleX - x;
    const topOffsetToMiddle = middleY - y;
    console.log(`leftOffsetToMiddle: ${leftOffsetToMiddle}\ntopOffsetToMiddle: ${topOffsetToMiddle}`);
}
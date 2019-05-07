const container = document.getElementById('container');
const pond = document.getElementById('pond');
const frog1 = document.getElementById('frog1');
const frog2 = document.getElementById('frog2');
const frog3 = document.getElementById('frog3');
const frog4 = document.getElementById('frog4');
const finger1 = document.getElementById('finger1');
const finger2 = document.getElementById('finger2');
const finger3 = document.getElementById('finger3');
const finger4 = document.getElementById('finger4');

const containerRect = container.getBoundingClientRect();
// container is quadratic: length = height = width
// containerLength declares the maximum distance a frog can jump
const containerLength = containerRect.right - containerRect.left;

let splashAudio = new Audio();
let quakAudio = new Audio();

function initializeJs(pathToSplashAudio, pathToQuakAudio, pathToIntro1) {
    splashAudio = new Audio(pathToSplashAudio);
    quakAudio = new Audio(pathToQuakAudio);
    frog1.style.left = (containerLength).toString() + "px";
    frog2.style.left = (containerLength - containerLength/3).toString() + "px";
    frog3.style.left = (containerLength - 2*containerLength/3).toString() + "px";
    frog4.style.left = (containerLength - 3*containerLength/3).toString() + "px";
    frog1.style.top = (containerLength/2).toString() + "px";
    frog2.style.top = (containerLength/2).toString() + "px";
    frog3.style.top = (containerLength/2).toString() + "px";
    frog4.style.top = (containerLength/2).toString() + "px";
    frog1.style.visibility = "visible";
    frog2.style.visibility = "visible";
    frog3.style.visibility = "visible";
    frog4.style.visibility = "visible";

    finger1.style.left = (containerLength).toString() + "px";
    finger2.style.left = (containerLength - containerLength/3).toString() + "px";
    finger3.style.left = (containerLength - 2*containerLength/3).toString() + "px";
    finger4.style.left = (containerLength - 3*containerLength/3).toString() + "px";

    finger4.style.left = (containerLength - 3*containerLength/3 + containerLength/50).toString() + "px";
    finger3.style.left = (containerLength - 2*containerLength/3 + containerLength/50).toString() + "px";
    finger2.style.left = (containerLength - containerLength/3 + containerLength/15).toString() + "px";
    finger1.style.left = (containerLength - containerLength/30).toString() + "px";

    const intro1Audio = new Audio(pathToIntro1);
    intro1Audio.play().then(() => {
        setTimeout(jumpFar, 24500);
        setTimeout(jumpABit, 25700);
        setTimeout(jumpLeft, 27400);
        setTimeout(jumpRight, 29600);
        setTimeout(advanceToNextPage, intro1Audio.duration * 1000);
    });
}

function jumpFar() {
    finger4.style.visibility = "visible";
    finger4.style.top = (containerLength/2 + containerLength/7).toString() + "px";
    setTimeout(function() {
        finger4.style.visibility = "hidden";
        frog4.style.transform = `translate(0px, -200px)`;
    }, 600)
}

function jumpABit() {
    finger3.style.visibility = "visible";
    finger3.style.top = (containerLength/2 + containerLength/11).toString() + "px";
    setTimeout(function() {
        finger3.style.visibility = "hidden";
        frog3.style.transform = `translate(0px, -50px)`;
    }, 600)
}

function jumpLeft() {
    finger2.style.visibility = "visible";
    finger2.style.top = (containerLength/2 + containerLength/15).toString() + "px";
    setTimeout(function() {
        finger2.style.visibility = "hidden";
        frog2.style.transform = `translate(-100px, 0px)`;
    }, 600)
}

function jumpRight() {
    finger1.style.visibility = "visible";
    finger1.style.top = (containerLength/2 + containerLength/15).toString() + "px";
    setTimeout(function() {
        finger1.style.visibility = "hidden";
        frog1.style.transform = `translate(100px, 0px)`;
    }, 600)
}

function advanceToNextPage() {
  document.getElementById("form").submit();
}
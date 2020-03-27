const container = document.getElementById('container');
const pond = document.getElementById('pond');
const frog1 = document.getElementById('frog1');
const frog2 = document.getElementById('frog2');
const frog3 = document.getElementById('frog3');
const frog4 = document.getElementById('frog4');
const frog5 = document.getElementById('frog5');
const frog6 = document.getElementById('frog6');
const frog7 = document.getElementById('frog7');
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
let introMovementAudio = new Audio();
let introSecondTryAudio = new Audio();
let introPracticeAudio = new Audio();

function initializeJs(pathToSplash, pathToQuak, pathToMovement, pathToSecondTry, pathToPractice) {
    splashAudio = new Audio(pathToSplash);
    quakAudio = new Audio(pathToQuak);
    introMovementAudio = new Audio(pathToMovement);
    introSecondTryAudio = new Audio(pathToSecondTry);
    introPracticeAudio = new Audio(pathToPractice);

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

    frog5.style.left = (containerLength / 2).toString() + "px";
    frog6.style.left = (containerLength / 2).toString() + "px";
    frog7.style.left = (containerLength / 2).toString() + "px";
    frog5.style.top = (containerLength - containerLength/3).toString() + "px";
    frog6.style.top = (containerLength - containerLength/3).toString() + "px";
    frog7.style.top = (containerLength - containerLength/3).toString() + "px";

    finger4.style.left = (containerLength - 3*containerLength/3 + containerLength/50).toString() + "px";
    finger3.style.left = (containerLength - 2*containerLength/3 + containerLength/50).toString() + "px";
    finger2.style.left = (containerLength - containerLength/3 + containerLength/15).toString() + "px";
    finger1.style.left = (containerLength - containerLength/30).toString() + "px";

    playIntro();
}

const playIntro = () => {
    introMovementAudio.play().then(() => {
        setTimeout(jumpFar, 24200);
        setTimeout(jumpABit, 25600);
        setTimeout(jumpLeft, 27300);
        setTimeout(jumpRight, 29400);
        setTimeout(playSecondTry, introMovementAudio.duration * 1000);
    }).catch(e => {
        showStartButtonOverlay(playIntro);
        console.log(e.message);
    });
};

const playSecondTry = () => {
    introSecondTryAudio.play().then(() => {
        jumpInPond();
        setTimeout(animateSuccess, 6100);
        setTimeout(jumpNotInPond, 8000);
        setTimeout(animateFail, 14300);
        setTimeout(jumpFirstTry, 19000);
        setTimeout(jumpSecondTry, 24500);
        setTimeout(playPractice, introSecondTryAudio.duration * 1000);
    })
};

const playPractice = () => {
    introPracticeAudio.play().then(() => {
        setTimeout(advanceToNextPage, introPracticeAudio.duration * 1000);
    })
};

function jumpFar() {
    finger4.style.visibility = "visible";
    finger4.style.top = (containerLength/2 + containerLength/7).toString() + "px";
    setTimeout(function() {
        finger4.style.visibility = "hidden";
        frog4.style.transform = `translate(0px, -200px)`;
    }, 900)
}

function jumpABit() {
    finger3.style.visibility = "visible";
    finger3.style.top = (containerLength/2 + containerLength/11).toString() + "px";
    setTimeout(function() {
        finger3.style.visibility = "hidden";
        frog3.style.transform = `translate(0px, -50px)`;
    }, 700)
}

function jumpLeft() {
    finger2.style.visibility = "visible";
    finger2.style.top = (containerLength/2 + containerLength/15).toString() + "px";
    setTimeout(function() {
        finger2.style.visibility = "hidden";
        frog2.style.transform = `translate(-100px, 0px)`;
    }, 700)
}

function jumpRight() {
    finger1.style.visibility = "visible";
    finger1.style.top = (containerLength/2 + containerLength/15).toString() + "px";
    setTimeout(function() {
        finger1.style.visibility = "hidden";
        frog1.style.transform = `translate(100px, 0px)`;
        frog1.style.visibility = "hidden";
        frog2.style.visibility = "hidden";
        frog3.style.visibility = "hidden";
        frog4.style.visibility = "hidden";
    }, 800)
}

function jumpInPond() {
    frog5.style.visibility = "visible";
    const toTop = "-" + (containerLength - containerLength/3 - 5) + "px";
    setTimeout(function() {
        frog5.style.transform = `translate(0px, ${toTop})`;
    }, 2200);
}

function animateSuccess() {
    frog5.style.opacity = "0";
}

function jumpNotInPond() {
    frog6.style.visibility = "visible";
    const toRight = (containerLength/6) + "px";
    const toTop = "-" + (containerLength/3) + "px";

    setTimeout(function() {
        frog6.style.transform = `translate(${toRight}, ${toTop})`;
    }, 2200);
}

function animateFail() {
    frog6.style.backgroundColor = "#94CC00";
    frog6.style.transform = "rotate(360deg)";
    frog6.style.opacity = "0";
}

function jumpFirstTry() {
    frog7.style.visibility = "visible";
    const toTop = "-" + (containerLength/3) + "px";
    setTimeout(function() {
        frog7.style.transform = `translate(0px, ${toTop})`;
        frog7.style.borderColor = 'blue';
    }, 1000);
}

function jumpSecondTry() {
    const toTop = "-" + (containerLength - containerLength/3 - 5) + "px";
    setTimeout(function() {
        frog7.style.transform = `translate(0px, ${toTop})`;
    }, 1000);

    setTimeout(function() {
        frog7.style.opacity = "0";
    }, 2500);
}

function advanceToNextPage() {
  document.getElementById("form").submit();
}
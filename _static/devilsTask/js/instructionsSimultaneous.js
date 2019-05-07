const audioPause = 400;
const instructionsArea = document.getElementById("instructionsArea");

let pathToDevilImg;
let pathToCoinImg;
let pathToQuestionMarkImg;

let hinterDenFeldernAudio = new Audio();
let erstWennAudio = new Audio();
let wennAberDasTeufelchenAudio = new Audio();
let insgesamtSiebenRunden2Audio = new Audio();

function initializeJs(
    pathToCoin,
    pathToDevil,
    pathToQuestionMark,
    passGutAufPath,
    hinterDenFeldernPath,
    erstWennPath,
    wennAberDasTeufelchenPath,
    insgesamtSiebenRunden2Path,
    ) {
    pathToDevilImg = pathToDevil;
    pathToCoinImg = pathToCoin;
    pathToQuestionMarkImg = pathToQuestionMark;

    const passGutAufAudio = new Audio(passGutAufPath);
    hinterDenFeldernAudio = new Audio(hinterDenFeldernPath);
    erstWennAudio = new Audio(erstWennPath);
    wennAberDasTeufelchenAudio = new Audio(wennAberDasTeufelchenPath);
    insgesamtSiebenRunden2Audio = new Audio(insgesamtSiebenRunden2Path);

    passGutAufAudio.play().then(() => {
        setTimeout(hinterDenFeldern, passGutAufAudio.duration * 1000 + audioPause)
    })
}

function hinterDenFeldern() {
    hinterDenFeldernAudio.play().then(() => {
        instructionsArea.style.visibility = "visible";
        setTimeout(markSomeFields, 15000);
        setTimeout(erstWenn, hinterDenFeldernAudio.duration * 1000 + audioPause)
    })
}

function markSomeFields() {
    let i = 1;
    function delayedLoop() {
        setTimeout(function() {
            const coin = document.getElementById(i.toString());
            coin.style.transition = "all 1s";
            coin.style.backgroundColor = "#FFC43D";
            i += 2;
            if (i< 10) {
                delayedLoop()
            }
        }, 750)
    }

    delayedLoop();
}

function erstWenn() {
    erstWennAudio.play().then(() => {
        setTimeout(showLock, 1200);
        setTimeout(revealSomeCoins, 4000);
        setTimeout(showQuestionMarksAgain, 9000);
        setTimeout(markSomeFields, 13000);
        setTimeout(wennAberDasTeufelchen, erstWennAudio.duration * 1000 + audioPause)
    })
}

function showLock() {
    const lock = document.getElementById("btnCheckSelection");
    lock.style.visibility = "visible";
    lock.style.transition = "all 0.8s";
    lock.style.height = "200px";
    lock.style.width = "200px";
    setTimeout(function() {
        lock.style.height = "100px";
        lock.style.width = "100px";

    }, 800)
}

function revealSomeCoins() {
    for (let i=1; i<11; i+=2) {
        const coin = document.getElementById(i.toString());
        coin.style.transition = "all 1s";
        coin.src = pathToCoinImg;
        coin.style.backgroundColor = "#90EE90";
    }
}

function showQuestionMarksAgain() {
    for (let i = 0; i < 10; i++) {
        const coin = document.getElementById(i.toString());
        coin.src = pathToQuestionMarkImg;
        coin.style.transition = "all 0.5s";
        coin.style.backgroundColor = "#FFF";
    }
}

function wennAberDasTeufelchen() {
    wennAberDasTeufelchenAudio.play().then(() => {
        setTimeout(revealSomeCoinsAndDevil, 1700);
        setTimeout(insgesamtSiebenRunden2, wennAberDasTeufelchenAudio.duration * 1000 + audioPause)
    })
}

function revealSomeCoinsAndDevil() {
    for (let i=1; i<11; i+=2) {
        const coin = document.getElementById(i.toString());
        coin.style.transition = "all 1s";
        if (i===3) {
            coin.src = pathToDevilImg;
            coin.style.backgroundColor = "#FFF";
        } else {
            coin.src = pathToCoinImg;
            coin.style.backgroundColor = "#f77474";
        }
    }
}

function insgesamtSiebenRunden2() {
    insgesamtSiebenRunden2Audio.play().then(() => {
        setTimeout(advanceToNextPage, insgesamtSiebenRunden2Audio.duration * 1000)
    })
}

function advanceToNextPage() {
  document.getElementById("form").submit();
}
const audioPause = 400;
const instructionsArea = document.getElementById("instructionsArea");

let pathToDevilImg;
let pathToCoinImg;
let pathToQuestionMarkImg;

let hinterDenFeldernAudio = new Audio();
let erstWennAudio = new Audio();
let wennAberDasTeufelchenAudio = new Audio();
let insgesamtSiebenRunden2Audio = new Audio();
let wennDuFragenHastAudio = new Audio();

function initializeJs(
    pathToCoin,
    pathToDevil,
    pathToQuestionMark,
    passGutAufPath,
    hinterDenFeldernPath,
    erstWennPath,
    wennAberDasTeufelchenPath,
    insgesamtSiebenRunden2Path,
    wennDuFragenHastPath,
    ) {
    pathToDevilImg = pathToDevil;
    pathToCoinImg = pathToCoin;
    pathToQuestionMarkImg = pathToQuestionMark;

    const passGutAufAudio = new Audio(passGutAufPath);
    hinterDenFeldernAudio = new Audio(hinterDenFeldernPath);
    erstWennAudio = new Audio(erstWennPath);
    wennAberDasTeufelchenAudio = new Audio(wennAberDasTeufelchenPath);
    insgesamtSiebenRunden2Audio = new Audio(insgesamtSiebenRunden2Path);
    wennDuFragenHastAudio = new Audio(wennDuFragenHastPath);

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
        }, 250)
    }

    delayedLoop();
}

function markFewFields() {
    const coin1 = document.getElementById("1");
    const coin5 = document.getElementById("5");
    coin1.style.transition = "all 1s";
    coin1.style.backgroundColor = "#FFC43D";
    coin5.style.transition = "all 1s";
    coin5.style.backgroundColor = "#FFC43D";
}

function erstWenn() {
    erstWennAudio.play().then(() => {
        setTimeout(showMagnifyingGlass, 1300);
        setTimeout(revealSomeCoins, 5200);
        setTimeout(showQuestionMarksAgain, 10500);
        setTimeout(markFewFields, 19000);
        setTimeout(markSomeFields, 20500);
        setTimeout(showMagnifyingGlass, 24500);
        setTimeout(wennAberDasTeufelchen, erstWennAudio.duration * 1000 + audioPause)
    })
}

function showMagnifyingGlass() {
    const magnifyingGlass = document.getElementById("btnCheckSelection");
    magnifyingGlass.style.visibility = "visible";
    magnifyingGlass.style.transition = "all 0.8s";
    magnifyingGlass.style.height = "230px";
    magnifyingGlass.style.width = "230px";
    setTimeout(function() {
        magnifyingGlass.style.height = "150px";
        magnifyingGlass.style.width = "150px";

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
        coin.style.backgroundColor = "rgba(0,0,0,0)";
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
        setTimeout(wennDuFragenHast, insgesamtSiebenRunden2Audio.duration * 1000 + audioPause)
    })
}

function wennDuFragenHast() {
    wennDuFragenHastAudio.play().then(() => {
        setTimeout(advanceToNextPage, wennDuFragenHastAudio.duration * 1000)
    })
}

function advanceToNextPage() {
  document.getElementById("form").submit();
}
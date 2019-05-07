const audioPause = 400;
const instructionsArea = document.getElementById("instructionsArea");

let pathToDevilImg;
let pathToCoinImg;
let pathToQuestionMarkImg;

let anleitungTalerAudio = new Audio();
let anleitungDevilAudio = new Audio();
let anleitungZweiterTeilAudio = new Audio();
let sichernSchlossTippenAudio = new Audio();
let insgesamtSiebenRundenAudio = new Audio();
let jetztDuAudio = new Audio();

function initializeJs(
    pathToCoin,
    pathToDevil,
    pathToQuestionMark,
    devilIntroPath,
    anleitungTalerPath,
    anleitungDevilPath,
    anleitungZweiterTeilPath,
    sichernSchlossTippenPath,
    insgesamtSiebenRundenPath,
    jetztDuPath,
    ) {
    pathToDevilImg = pathToDevil;
    pathToCoinImg = pathToCoin;
    pathToQuestionMarkImg = pathToQuestionMark;

    const devilIntroAudio = new Audio(devilIntroPath);
    anleitungTalerAudio = new Audio(anleitungTalerPath);
    anleitungDevilAudio = new Audio(anleitungDevilPath);
    anleitungZweiterTeilAudio = new Audio(anleitungZweiterTeilPath);
    sichernSchlossTippenAudio = new Audio(sichernSchlossTippenPath);
    insgesamtSiebenRundenAudio = new Audio(insgesamtSiebenRundenPath);
    jetztDuAudio = new Audio(jetztDuPath);

    const playPromise = devilIntroAudio.play();

    playPromise.then(() => {
        console.log(devilIntroAudio.duration);
        setTimeout(anleitungTaler, devilIntroAudio.duration * 1000 + audioPause)
    })
}

function anleitungTaler() {
    const playPromise = anleitungTalerAudio.play();
    playPromise.then(() => {
        instructionsArea.style.visibility = "visible";
        setTimeout(highlightCoins, anleitungTalerAudio.duration * 1000 - 2000);
        setTimeout(anleitungDevil, anleitungTalerAudio.duration * 1000 + audioPause)
    })
}

function highlightCoins() {
    for (let i = 0; i < 10; i++) {
        if (7 !== i) {
            const coin = document.getElementById(i.toString());
            coin.src = pathToCoinImg;
            coin.style.transition = "all 1.5s";
            coin.style.backgroundColor = "#90EE90";
        }
    }
}

function anleitungDevil() {
    anleitungDevilAudio.play().then(() => {
        setTimeout(showDevil, 5800, "7");
        setTimeout(showQuestionMarksAgain, 8800);
        setTimeout(anleitungZweiterTeil, anleitungDevilAudio.duration * 1000 + audioPause)
    })
}

function showDevil(position) {
    const devil = document.getElementById(position);
    devil.src = pathToDevilImg;
}

function showQuestionMarksAgain() {
    for (let i = 0; i < 10; i++) {
        const coin = document.getElementById(i.toString());
        coin.src = pathToQuestionMarkImg;
        coin.style.transition = "all 0.5s";
        coin.style.backgroundColor = "#FFF";
    }
}

function anleitungZweiterTeil() {
    anleitungZweiterTeilAudio.play().then(() => {
        setTimeout(highlightSomeCoins, 9500);
        setTimeout(showDevil, 19000, "9");
        setTimeout(markSomeCoinsAsLost, 23000);
        setTimeout(sichernSchlossTippen, anleitungZweiterTeilAudio.duration * 1000 + audioPause)
    })
}

function highlightSomeCoins() {
    let i = 1;
    function delayedLoop() {
        setTimeout(function() {
            coin = document.getElementById(i.toString());
            coin.src = pathToCoinImg;
            coin.style.transition = "all 1s";
            coin.style.backgroundColor = "#90EE90";
            i += 2;
            if (i< 9) {
                delayedLoop()
            }
        }, 1200)
    }

    delayedLoop();
}

function markSomeCoinsAsLost() {
    let i = 1;
    for (let i = 1; i<9; i+=2) {
        const coin = document.getElementById(i.toString());
        coin.style.transition = "all 1s";
        coin.style.backgroundColor = "#f77474";
    }
}

function sichernSchlossTippen() {
    showQuestionMarksAgain();
    sichernSchlossTippenAudio.play().then(() => {
        highlightSomeCoins();
        setTimeout(showLock, 5000);
        setTimeout(insgesamtSiebenRunden, sichernSchlossTippenAudio.duration * 1000 + audioPause)
    })
}

function showLock() {
    const lock = document.getElementById("btnCollectCoins");
    lock.style.visibility = "visible";
    lock.style.transition = "all 0.8s";
    lock.style.height = "200px";
    lock.style.width = "200px";
    setTimeout(function() {
        lock.style.height = "100px";
        lock.style.width = "100px";

    }, 800)
}

function insgesamtSiebenRunden() {
    showQuestionMarksAgain();
    insgesamtSiebenRundenAudio.play().then(() => {
        setTimeout(showDevilAtEverySpot, 24000);
        setTimeout(jetztDu, insgesamtSiebenRundenAudio.duration * 1000 + audioPause)
    })
}

function showDevilAtEverySpot() {
    let i = 0;
    function delayedLoop() {
        setTimeout(function() {
            const devil = document.getElementById(i.toString());
            devil.src = pathToDevilImg;
            devil.style.transition = "all 0.3s";
            if (i > 0) {
                const oldDevil = document.getElementById((i-1).toString());
                oldDevil.src = pathToQuestionMarkImg;
            }
            i++;
            if (i< 11) {
                delayedLoop()
            }
        }, 400)
    }

    delayedLoop();
}

function jetztDu() {
    jetztDuAudio.play().then(() => {
        setTimeout(advanceToNextPage, jetztDuAudio.duration * 1000)
    })
}

function advanceToNextPage() {
  document.getElementById("form").submit();
}
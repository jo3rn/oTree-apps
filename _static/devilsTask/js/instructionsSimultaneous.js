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
        setTimeout(erstWenn, hinterDenFeldernAudio.duration * 1000 + audioPause)
    })

}

function erstWenn() {
    erstWennAudio.play().then(() => {
        setTimeout(wennAberDasTeufelchen, erstWennAudio.duration * 1000 + audioPause)
    })
}

function wennAberDasTeufelchen() {
    wennAberDasTeufelchenAudio.play().then(() => {
        setTimeout(insgesamtSiebenRunden2, wennAberDasTeufelchenAudio.duration * 1000 + audioPause)
    })
}

function insgesamtSiebenRunden2() {
    insgesamtSiebenRunden2Audio.play().then(() => {
        setTimeout(advanceToNextPage, insgesamtSiebenRunden2Audio.duration * 1000)
    })
}

function advanceToNextPage() {
  document.getElementById("form").submit();
}
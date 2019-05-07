const audioPause = 300;
const instructionsArea = document.getElementById("instructionsArea");

let pathToDevilImg;
let pathToCoinImg;

let anleitungTalerAudio = new Audio();

function initializeJs(
    pathToCoin,
    pathToDevil,
    devilIntroPath,
    anleitungTalerPath,
    ) {
    pathToDevilImg = pathToDevil;
    pathToCoinImg = pathToCoin;

    const devilIntroAudio = new Audio(devilIntroPath);
    anleitungTalerAudio = new Audio(anleitungTalerPath);
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
        setTimeout(highlightCoin, anleitungTalerAudio.duration * 1000 - 2000);
        setTimeout(anleitungDevil, anleitungTalerAudio.duration * 1000 + audioPause)
    })
}

function highlightCoin() {
    const coin = document.getElementById("2");
    coin.src = pathToCoinImg;
    coin.style.backgroundColor = "#90EE90";
    coin.style.transition = "all 1.5s";
    coin.style.width = '150%';
}

function anleitungDevil() {

}
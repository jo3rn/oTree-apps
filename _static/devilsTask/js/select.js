let score = 0;
let pointsToAdd;
let randomDevil;
const startTime = new Date();
const btnCollect = document.getElementById("btnCollect");
const btnNewRound = document.getElementById("btnNewRound");
const coinGrid = document.getElementById("coinWrapper");
const imagesInCoinGrid = coinGrid.querySelectorAll("img");
const roundCollectedCoins = document.getElementById("round_collected_coins");
const roundClicks = document.getElementById("round_clicks");
const roundTime = document.getElementById("round_time");

let pathToDevilImg;
let pathToCoinImg;

let isModeOneByOne;
let isDevilClicked;

function initializeJs(numberOfCoins, pathToDevil, pathToCoin, oneByOneMode) {
    // random number between 0 and num_coins
    randomDevil = Math.floor(Math.random() * numberOfCoins);
    pointsToAdd = 0;

    pathToDevilImg = pathToDevil;
    pathToCoinImg = pathToCoin;

    isModeOneByOne = oneByOneMode;
    isDevilClicked = false;

    removeFieldEventListeners();
    addFieldEventListeners();

    showElement(btnCollect);
    btnCollect.addEventListener("click", collectPoints);
    btnNewRound.addEventListener("click", startNewRoundAfterDevil);
}

function addFieldEventListeners() {
    for (let i = 0; i < imagesInCoinGrid.length; i++) {
        let coin = imagesInCoinGrid[i];
        if (i === randomDevil) {
            coin.addEventListener("click", revealDevil);
        } else {
            coin.addEventListener("click", revealCoin);
        }
    }
}

function revealCoin() {
    if (!isDevilClicked) {
        pointsToAdd += 1;
    }
    this.removeEventListener("click", revealCoin);
    if (isModeOneByOne) {
        this.src = pathToCoinImg;
        this.style.backgroundColor = "#90EE90";
    } else {
        this.style.backgroundColor = "#FFC43D";
    }
}

function revealDevil() {
    pointsToAdd = 0;
    if (isModeOneByOne) {
        this.src = pathToDevilImg;
        removeFieldEventListeners();
        showElement(btnNewRound);
        hideElement(btnCollect);
    } else {
        this.style.backgroundColor = "#FFC43D";
        this.removeEventListener("click", revealDevil);
        isDevilClicked = true;
    }
}

function collectPoints() {
    hideElement(document.getElementById("btnCollect"));
    removeFieldEventListeners();
    trackTime();
    trackClicks();

    if (!isDevilClicked) {
        score += pointsToAdd;
    }

    roundCollectedCoins.value = score;
}

function startNewRoundAfterDevil() {
    trackTime();
    roundCollectedCoins.value = 0;
    trackClicks();
}

function trackTime() {
    roundTime.value = new Date() - startTime;
}

function trackClicks() {
    roundClicks.value = score;
}

function removeFieldEventListeners() {
    let coinImages = document.getElementsByClassName("coin");
    for (let i = 0; i < coinImages.length; i++) {
        coinImages[i].removeEventListener("click", revealCoin, false);
        coinImages[i].removeEventListener("click", revealDevil, false);
    }
}

function hideElement(element) {
    element.style.visibility = "hidden";
}

function showElement(element) {
    element.style.visibility = "visible";
}
let score = 0;
let clicks = 0;
let pointsToAdd;
let randomDevil;
const startTime = new Date();
const btnCollect = document.getElementById("btnCollectCoins");
const btnCheck = document.getElementById("btnCheckSelection");
const coinGrid = document.getElementById("coinWrapper");
const imagesInCoinGrid = coinGrid.querySelectorAll("img");
const roundCollectedCoins = document.getElementById("round_collected_coins");
const roundClicks = document.getElementById("round_clicks");
const roundTime = document.getElementById("round_time");

let pathToDevilImg;
let pathToCoinImg;

let coinAudio = new Audio();
let devilAudio = new Audio();

let isModeOneByOne;
let isDevilClicked = false;

function initializeJs(numberOfCoins, pathToDevil, pathToCoin, pathToCoinAudio, pathToDevilAudio, oneByOneMode) {
    // random number between 0 and num_coins
    randomDevil = Math.floor(Math.random() * numberOfCoins);
    pointsToAdd = 0;

    pathToDevilImg = pathToDevil;
    pathToCoinImg = pathToCoin;
    coinAudio = new Audio(pathToCoinAudio);
    devilAudio = new Audio(pathToDevilAudio);


    isModeOneByOne = oneByOneMode;
    isDevilClicked = false;

    removeFieldEventListeners();
    addFieldEventListeners();

    if (isModeOneByOne) {
        btnCollect.addEventListener("click", collectPoints);
        showElement(btnCollect);
    } else {
        btnCheck.addEventListener("click", checkSelection);
        hideElement(btnCollect);
        showElement(btnCheck);
    }
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
    clicks += 1;
    if (isModeOneByOne) {
        this.removeEventListener("click", revealCoin);
        this.src = pathToCoinImg;
        this.style.backgroundColor = "#90EE90";
    } else {
        if (!this.classList.contains("revealMe")) {
            this.classList.add("revealMe");
        } else {
            this.classList.remove("revealMe");
            pointsToAdd -= 1;
            return;
        }
    }

    pointsToAdd += 1;
}

function revealDevil() {
    clicks += 1;
    if (isModeOneByOne) {
        pointsToAdd = 0;
        this.src = pathToDevilImg;
        removeFieldEventListeners();
        startNewRoundAfterDevil();
        hideElement(btnCollect);
    } else {
        if (!this.classList.contains("revealMe")) {
            this.classList.add("revealMe");
        } else {
            this.classList.remove("revealMe");
        }
        isDevilClicked = !isDevilClicked;
    }
}

function collectPoints() {
	coinAudio.play();
    hideElement(btnCollect);
    removeFieldEventListeners();
    trackTimeAndClicks();
    score += pointsToAdd;
    roundCollectedCoins.value = score;
    setTimeout(advanceToNextPage, 2400);
}

function startNewRoundAfterDevil() {
    devilAudio.play();
    trackTimeAndClicks();
    roundCollectedCoins.value = 0;
    setTimeout(advanceToNextPage, 2400);
}

function checkSelection() {
    hideElement(btnCheck);
    removeFieldEventListeners();

    for (let i = 0; i < imagesInCoinGrid.length; i++) {
        let coin = imagesInCoinGrid[i];
        if (coin.classList.contains("revealMe")) {
            coin.src = pathToCoinImg;
            if (isDevilClicked) {
                coin.style.backgroundColor = "#f77474";
            } else {
                coin.style.backgroundColor = "#90EE90";
            }
        }
    }

    if (isDevilClicked) {
        let devil = imagesInCoinGrid[randomDevil];
        devil.style.backgroundColor = "#FFF";
        devil.src = pathToDevilImg;
        startNewRoundAfterDevil();
    } else {
        collectPoints();
    }
}

function trackTimeAndClicks() {
    roundTime.value = new Date() - startTime;
    roundClicks.value = clicks;
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

function advanceToNextPage() {
  document.getElementById("form").submit();
}
function removeCoinEventListeners() {
    let coinImages = document.getElementsByClassName("coin");
    for (let i = 0; i < coinImages.length; i++) {
        coinImages[i].removeEventListener("click", revealSecondCoin, false);
        coinImages[i].removeEventListener("click", revealDevil, false);
    }
}

function collectPoints() {
    hideElement(document.getElementById("btnCollect"));
    removeCoinEventListeners();
    let pointGrid = document.getElementById("pointWrapper");
    for (let i = 0; i < pointsToAdd; i++) {
        let point = document.createElement("div");
        point.classList.add("point");
        pointGrid.appendChild(point);
    }
    showElement(document.getElementById("btnNewRound"));
}

function hideElement(element) {
    element.style.visibility = "hidden";
}

function showElement(element) {
    element.style.visibility = "visible";
}
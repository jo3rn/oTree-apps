function removeCoinEventListeners() {
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
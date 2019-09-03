const audioPause = 400;
const reminderPause = 10000;

const objCoins = {
    left_1: document.getElementById('coin_left_1'),
    left_2: document.getElementById('coin_left_2'),
    left_3: document.getElementById('coin_left_3'),
    left_4: document.getElementById('coin_left_4'),
    left_5: document.getElementById('coin_left_5'),
    right_1: document.getElementById('coin_right_1'),
    right_2: document.getElementById('coin_right_2'),
    right_3: document.getElementById('coin_right_3'),
    right_4: document.getElementById('coin_right_4'),
    right_5: document.getElementById('coin_right_5'),
}
const selector = document.getElementById('selector');

const left_arrow = document.getElementById('arrow_left');
const right_arrow = document.getElementById('arrow_right');

const coinPairs = [
    [objCoins.left_1, objCoins.right_1],
    [objCoins.left_2, objCoins.right_2],
    [objCoins.left_3, objCoins.right_3],
    [objCoins.left_4, objCoins.right_4],
    [objCoins.left_5, objCoins.right_5],
]

let choices = 0;
let chosenScenario;
let audio1 = new Audio();
let audio2 = new Audio();
let audio3 = new Audio();
let audio4 = new Audio();
let audio5 = new Audio();
let audio6 = new Audio();
let audioCoinToday = new Audio();
const objCoinsLater = {
    audioCoinLater1: new Audio(),
    audioCoinLater2: new Audio(),
    audioCoinLater3: new Audio(),
    audioCoinLater4: new Audio(),
    audioCoinLater5: new Audio(),
}
let audioDecisionByArrow = new Audio();


function initializeJs(pathTo1, pathTo2, pathTo3,
    pathTo4, pathTo5, pathTo6, pathToCoinToday, pathToCoinLaterOne, 
    pathToCoinLaterTwo, pathToCoinLaterThree, pathToCoinLaterFour, pathToCoinLaterFive, pathToDecisionByArrow, scenario) {
    audio1 = new Audio(pathTo1);
    audio2 = new Audio(pathTo2);
    audio3 = new Audio(pathTo3);
    audio4 = new Audio(pathTo4);
    audio5 = new Audio(pathTo5);
    audio6 = new Audio(pathTo6);
    audioCoinToday = new Audio(pathToCoinToday);
    objCoinsLater.audioCoinLater1 = new Audio(pathToCoinLaterOne);
    objCoinsLater.audioCoinLater2 = new Audio(pathToCoinLaterTwo);
    objCoinsLater.audioCoinLater3 = new Audio(pathToCoinLaterThree);
    objCoinsLater.audioCoinLater4 = new Audio(pathToCoinLaterFour);
    objCoinsLater.audioCoinLater5 = new Audio(pathToCoinLaterFive);
    audioDecisionByArrow = new Audio(pathToDecisionByArrow);
    chosenScenario = scenario;
    play1();
}

const letArrowSlide = () => {
    show(selector);
    left_arrow.classList.remove(`arrow_${chosenScenario}`);
    right_arrow.classList.remove(`arrow_${chosenScenario}`);
    left_arrow.classList.add("arrow_5");
    right_arrow.classList.add("arrow_5")
    setTimeout(() => {
        left_arrow.classList.remove("arrow_5");
        right_arrow.classList.remove("arrow_5");
        left_arrow.classList.add("arrow_1");
        right_arrow.classList.add("arrow_1");
    }, 1000);
    setTimeout(() => {
        left_arrow.classList.remove("arrow_1");
        right_arrow.classList.remove("arrow_1");
        left_arrow.classList.add("arrow_5");
        right_arrow.classList.add("arrow_5");
    }, 2000);
    setTimeout(() => {
        left_arrow.classList.remove("arrow_5");
        right_arrow.classList.remove("arrow_5");
        left_arrow.classList.add("arrow_1");
        right_arrow.classList.add("arrow_1");
    }, 3000);
    setTimeout(() => {
        left_arrow.classList.remove("arrow_1");
        right_arrow.classList.remove("arrow_1");
        left_arrow.classList.add("arrow_5");
        right_arrow.classList.add("arrow_5");
    }, 4000);
    setTimeout(() => {
        left_arrow.classList.remove("arrow_5");
        right_arrow.classList.remove("arrow_5");
        left_arrow.classList.add("arrow_1");
        right_arrow.classList.add("arrow_1");
    }, 5000);
    setTimeout(() => {
        left_arrow.classList.remove("arrow_1");
        right_arrow.classList.remove("arrow_1");
        left_arrow.classList.add(`arrow_${chosenScenario}`);
        right_arrow.classList.add(`arrow_${chosenScenario}`);
    }, 6000);
}

const play1 = () => {
    audio1.play().then(() => {
        setTimeout(play2, audio1.duration * 1000 + audioPause)
    }).catch(e => {
        showStartButtonOverlay(play1);
        console.log(e.message);
    });
}

const play2 = () => {
    audio2.play().then(() => {
        show(objCoins.left_2);
        show(objCoins.right_2);
        setTimeout(flash.bind(null, objCoins.left_2), 9500);
        setTimeout(flash.bind(null, objCoins.right_2), 13500);
        setTimeout(play3, audio2.duration * 1000 + audioPause)
    })
}

const play3 = () => {
    audio3.play().then(() => {
        setTimeout(flash.bind(null, objCoins.left_2), 5000);
        setTimeout(flash.bind(null, objCoins.right_2), 6200);
        setTimeout(flash.bind(null, objCoins.left_2), 14000);
        setTimeout(play4, audio3.duration * 1000 + audioPause)
    })
}

const play4 = () => {
    audio4.play().then(() => {
        setTimeout(flash.bind(null, objCoins.right_2), 500);
        setTimeout(play5, audio4.duration * 1000 + audioPause)
    })
}

const play5 = () => {
    Object.values(objCoins).forEach(coin => {
        show(coin);
    });
    audio5.play().then(() => {        
        setTimeout(letArrowSlide, 20000);
        setTimeout(play6, audio5.duration * 1000 + audioPause)
    })
}

const play6 = () => {
    hide(selector);
    Object.values(objCoins).forEach(coin => {
        hide(coin);
    });
    audio6.play().then(() => {      
        setTimeout(playCoinDecision.bind(null, 1), audio6.duration * 1000 + audioPause)
    })
}

const playCoinDecision = (index) => {
    show(objCoins[`left_${index}`]);
    show(objCoins[`right_${index}`]);
    audioCoinToday.play().then(() => {
        setTimeout(flash.bind(null, objCoins[`left_${index}`]), 1500);
        setTimeout(
            () => {
                objCoinsLater[`audioCoinLater${index}`].play().then(() => {
                    setTimeout(flash.bind(null, objCoins[`right_${index}`]), 1000);
                    setTimeout(addCoinClickListener.bind(null, index), objCoinsLater[`audioCoinLater${index}`].duration * 1000);
                })
            },
            audioCoinToday.duration * 1000 + audioPause)
    })
}

const playDecisionByArrow = () => {
    audioDecisionByArrow.play().then(() => {
        letArrowSlide();
    })
}

const playReminder = () => {
    audioDecisionByArrow.play().then(() => {
        setTimeout(playReminder, playReminder.duration * 1000 + reminderPause)
    })
}

const registerSelection = (selected, notSelected, index) => {
    selected.classList.add('selected');
    selected.onclick = () => {return false;}
    notSelected.onclick = () => {return false;}
    document.getElementById(`choice_scenario_${index}`).value = selected.id;
    choices += 1;
    if (choices > 4) {
        playDecisionByArrow();
    } else {
        playCoinDecision(index+1);
    }
}

const addCoinClickListener = (index) => {
    coinPairs[index-1][0].onclick = () => {
        registerSelection(coinPairs[index-1][0], coinPairs[index-1][1], index);
    }
    coinPairs[index-1][1].onclick = () => {
        registerSelection(coinPairs[index-1][1], coinPairs[index-1][0], index);
    }
}

const show = (element) => {
    element.style.visibility = "visible";
}

const hide = (element) => {
    element.style.visibility = "hidden";
}

const flash = (element) => {
    element.style.transform = 'scale(2.5,2.5)';
    setTimeout(function(){element.style.transform = 'scale(1,1)';}, 500);
  }

const advanceToNextPage = () => {
    document.getElementById("form").submit();
}
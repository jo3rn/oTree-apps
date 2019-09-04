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
let audioIntro = new Audio();
let audioDasSpiel = new Audio();
let audioDuKannst = new Audio();
let audioDieTaler = new Audio();
let audioDuSpielst = new Audio();
let audioPassGut = new Audio();
let audioCoinTodayFirst = new Audio();
let audioCoinTodayOther = new Audio();
const objCoinsLater = {
    audioCoinLater1: new Audio(),
    audioCoinLater2: new Audio(),
    audioCoinLater3: new Audio(),
    audioCoinLater4: new Audio(),
    audioCoinLater5: new Audio(),
}
let audioDecisionByArrow = new Audio();
let audioReminder = new Audio();

let currentDecision = 1;


function initializeJs(pathToIntro, pathToDasSpiel, pathToDuKannst,
    pathToDieTaler, pathToDuSpielst, pathToPassGut, pathToCoinToday, pathToMoechtest, pathToCoinLaterOne, 
    pathToCoinLaterTwo, pathToCoinLaterThree, pathToCoinLaterFour, pathToCoinLaterFive, pathToDecisionByArrow, pathToReminder, scenario) {
    audioIntro = new Audio(pathToIntro);
    audioDasSpiel = new Audio(pathToDasSpiel);
    audioDuKannst = new Audio(pathToDuKannst);
    audioDieTaler = new Audio(pathToDieTaler);
    audioDuSpielst = new Audio(pathToDuSpielst);
    audioPassGut = new Audio(pathToPassGut);
    audioCoinTodayFirst = new Audio(pathToCoinToday);
    audioCoinTodayOther = new Audio(pathToMoechtest);
    objCoinsLater.audioCoinLater1 = new Audio(pathToCoinLaterOne);
    objCoinsLater.audioCoinLater2 = new Audio(pathToCoinLaterTwo);
    objCoinsLater.audioCoinLater3 = new Audio(pathToCoinLaterThree);
    objCoinsLater.audioCoinLater4 = new Audio(pathToCoinLaterFour);
    objCoinsLater.audioCoinLater5 = new Audio(pathToCoinLaterFive);
    audioDecisionByArrow = new Audio(pathToDecisionByArrow);
    audioReminder = new Audio(pathToReminder);
    chosenScenario = scenario;
    playIntro();
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
        left_arrow.classList.add("arrow_5");
        right_arrow.classList.add("arrow_5");
    }, 6000);
    setTimeout(() => {
        left_arrow.classList.remove("arrow_5");
        right_arrow.classList.remove("arrow_5");
        left_arrow.classList.add(`arrow_${chosenScenario}`);
        right_arrow.classList.add(`arrow_${chosenScenario}`);
    }, 7000);
}

const playIntro = () => {
    audioIntro.play().then(() => {
        setTimeout(playDasSpiel, audioIntro.duration * 1000 + audioPause)
    }).catch(e => {
        showStartButtonOverlay(playIntro);
        console.log(e.message);
    });
}

const playDasSpiel = () => {
    audioDasSpiel.play().then(() => {
        show(objCoins.left_2);
        show(objCoins.right_2);
        setTimeout(flash.bind(null, objCoins.left_2), 8000);
        setTimeout(flash.bind(null, objCoins.right_2), 12000);
        setTimeout(playDuKannst, audioDasSpiel.duration * 1000 + audioPause)
    })
}

const playDuKannst = () => {
    audioDuKannst.play().then(() => {
        setTimeout(flash.bind(null, objCoins.left_2), 6500);
        setTimeout(flash.bind(null, objCoins.right_2), 9000);
        setTimeout(flash.bind(null, objCoins.left_2), 14200);
        setTimeout(playDieTaler, audioDuKannst.duration * 1000 + audioPause)
    })
}

const playDieTaler = () => {
    audioDieTaler.play().then(() => {
        setTimeout(flash.bind(null, objCoins.right_2), 1000);
        setTimeout(playDuSpielst, audioDieTaler.duration * 1000 + audioPause)
    })
}

const playDuSpielst = () => {
    Object.values(objCoins).forEach(coin => {
        show(coin);
    });
    audioDuSpielst.play().then(() => {        
        setTimeout(flash.bind(null, objCoins.left_1), 11200);
        setTimeout(flash.bind(null, objCoins.left_2), 11400);
        setTimeout(flash.bind(null, objCoins.left_3), 11600);
        setTimeout(flash.bind(null, objCoins.left_4), 11800);
        setTimeout(flash.bind(null, objCoins.left_5), 12000);

        setTimeout(flash.bind(null, objCoins.right_1), 15000);
        setTimeout(flash.bind(null, objCoins.right_2), 15200);
        setTimeout(flash.bind(null, objCoins.right_3), 15400);
        setTimeout(flash.bind(null, objCoins.right_4), 15600);
        setTimeout(flash.bind(null, objCoins.right_5), 15800);
    
        setTimeout(letArrowSlide, 26000);

        setTimeout(playPassGut, audioDuSpielst.duration * 1000 + audioPause)
    })
}

const playPassGut = () => {
    hide(selector);
    Object.values(objCoins).forEach(coin => {
        hide(coin);
    });
    audioPassGut.play().then(() => {      
        setTimeout(playCoinDecision.bind(null, 1), audioPassGut.duration * 1000 + audioPause)
    })
}

const playCoinDecision = (index) => {
    currentDecision = index;
    show(objCoins[`left_${index}`]);
    show(objCoins[`right_${index}`]);

    let audioCoinToday = new Audio();
    if (index == 1) {
        audioCoinToday = audioCoinTodayFirst
    } else {
        audioCoinToday = audioCoinTodayOther
    }

    audioCoinToday.play().then(() => {
        if (index == 1) {
            setTimeout(flash.bind(null, objCoins[`left_${index}`]), 3400);
        } else {
            setTimeout(flash.bind(null, objCoins[`left_${index}`]), 1300);
        }
        
        setTimeout(
            () => {
                objCoinsLater[`audioCoinLater${index}`].play().then(() => {
                    setTimeout(flash.bind(null, objCoins[`right_${index}`]), 1000);
                    setTimeout(addCoinClickListener.bind(null, index), objCoinsLater[`audioCoinLater${index}`].duration * 1000);
                    if (index != 5) {
                        setTimeout(playReminder.bind(null, index), objCoinsLater[`audioCoinLater${index}`].duration * 1000 + reminderPause);
                    }   
                })
            },
            audioCoinToday.duration * 1000 + audioPause)
    })
}

const playDecisionByArrow = () => {
    audioDecisionByArrow.play().then(() => {
        letArrowSlide();
        setTimeout(advanceToNextPage, audioDecisionByArrow.duration * 1000 + 4000)
    })
}

const playReminder = (decision) => {
    if (decision == currentDecision) {
        audioReminder.play().then(() => {
            setTimeout(playReminder.bind(null, decision), audioReminder.duration * 1000 + reminderPause)
        })
    } 
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
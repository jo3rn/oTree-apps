const audioPause = 400;

const left_1 = document.getElementById('coin_left_1');
const left_2 = document.getElementById('coin_left_2');
const left_3 = document.getElementById('coin_left_3');
const left_4 = document.getElementById('coin_left_4');
const left_5 = document.getElementById('coin_left_5');
const right_1 = document.getElementById('coin_right_1');
const right_2 = document.getElementById('coin_right_2');
const right_3 = document.getElementById('coin_right_3');
const right_4 = document.getElementById('coin_right_4');
const right_5 = document.getElementById('coin_right_5');
const selector = document.getElementById('selector');

const left_arrow = document.getElementById('arrow_left');
const right_arrow = document.getElementById('arrow_right');

const coinPairs = [
    [left_1, right_1],
    [left_2, right_2],
    [left_3, right_3],
    [left_4, right_4],
    [left_5, right_5],
]

let choices = 0;
let chosenScenario;
let audio1 = new Audio();
let audio2 = new Audio();
let audio3 = new Audio();
let audio4 = new Audio();
let audio5 = new Audio();
let audio6 = new Audio();

function initializeJs(pathTo1, pathTo2, pathTo3,
    pathTo4, pathTo5, pathTo6, scenario) {
    audio1 = new Audio(pathTo1);
    audio2 = new Audio(pathTo2);
    audio3 = new Audio(pathTo3);
    audio4 = new Audio(pathTo4);
    audio5 = new Audio(pathTo5);
    audio6 = new Audio(pathTo6);
    chosenScenario = scenario;
    play1();
}

const letArrowSlide = () => {
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
        left_arrow.classList.add(`arrow_${chosenScenario}`);
        right_arrow.classList.add(`arrow_${chosenScenario}`);
    }, 4000);
}

const play1 = () => {
    audio1.play().then(() => {
        letArrowSlide();
        setTimeout(play2, audio1.duration * 1000 + audioPause)
    }).catch(e => {
        showStartButtonOverlay(play1);
        console.log(e.message);
    });
}

const play2 = () => {
    audio2.play().then(() => {
        show(left_2);
        show(right_2);
        setTimeout(play3, audio2.duration * 1000 + audioPause)
    })
}

const play3 = () => {
    audio3.play().then(() => {
        flash(left_2);
        setTimeout(play4, audio3.duration * 1000 + audioPause)
    })
}

const play4 = () => {
    audio4.play().then(() => {
        flash(right_2);
        setTimeout(play5, audio4.duration * 1000 + audioPause)
    })
}

const play5 = () => {
    audio5.play().then(() => {
        setTimeout(play6, audio5.duration * 1000 + audioPause)
    })
}

const play6 = () => {
    audio6.play().then(() => {
        hide(selector);
        show(left_1);
        show(left_3);
        show(left_4);
        show(left_5);
        show(right_1);
        show(right_3);
        show(right_4);
        show(right_5);
        //setTimeout(play6, audio6.duration * 1000 + audioPause)
    })
}

const registerSelection = (selected, notSelected, index) => {
    selected.classList.add('selected');
    selected.onclick = () => {return false;}
    notSelected.onclick = () => {return false;}
    document.getElementById('choice_scenario_' + (index + 1)).value = selected.id;
    choices += 1;
    if (choices > 4) {
        advanceToNextPage();
    }
}

coinPairs.forEach((pair, index) => {
    pair[0].onclick = () => {
        registerSelection(pair[0], pair[1], index);
    }
    pair[1].onclick = () => {
        registerSelection(pair[1], pair[0], index)
    }
})

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
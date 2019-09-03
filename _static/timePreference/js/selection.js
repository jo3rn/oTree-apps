const coinPairs = [
    [
        document.getElementById('coin_left_1'),
        document.getElementById('coin_right_1')
    ],
    [
        document.getElementById('coin_left_2'),
        document.getElementById('coin_right_2')
    ],
    [
        document.getElementById('coin_left_3'),
        document.getElementById('coin_right_3')
    ],
    [
        document.getElementById('coin_left_4'),
        document.getElementById('coin_right_4')
    ],
    [
        document.getElementById('coin_left_5'),
        document.getElementById('coin_right_5')
    ],
]

let choices = 0;
let introAudio = new Audio();

function initializeJs(pathToIntro) {
    introAudio = new Audio(pathToIntro);
    playIntro();
}

const playIntro = () => {
    introAudio.play().then(() => {

    }).catch(e => {
        showStartButtonOverlay(playIntro);
        console.log(e.message);
    });
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

const advanceToNextPage = () => {
    document.getElementById("form").submit();
}
console.log('JS OK');

const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const userScore = document.getElementById('user-score');
const computerScore = document.getElementById('computer-score');
const result = document.querySelector('.result');
const startMessage = 'Inserite qua il risultato'
let cpu;
let userNum;
let scoreUser = 0;
let scoreCpu = 0;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * max - min + 1) + min
}

// console.log(getRandomNumber(1, 3))



result.innerText = startMessage


rock.onclick = (e) => {
    userNum = 1
    startGame(userNum)
}

paper.onclick = (e) => {
    userNum = 2
    startGame(userNum)
}

scissors.onclick = (e) => {
    userNum = 3
    startGame(userNum)
}

function startGame(userNum) {
    result.innerText = startMessage
    cpu = getRandomNumber(1, 3);
    rockPaperScissors(userNum)
}


function rockPaperScissors(userNum) {

    if (userNum == cpu) {
        scoreUser++
        scoreCpu++
        result.innerText = 'Pareggio';

    }
    if (userNum == 1 && cpu == 2) {
        scoreCpu++
        result.innerText = 'Sconfitta'

    }
    if (userNum == 1 && cpu == 3) {
        scoreUser++
        result.innerText = 'Vittoria'
    }
    if (userNum == 2 && cpu == 1) {
        scoreUser++
        result.innerText = 'Vittoria'
    }
    if (userNum == 2 && cpu == 3) {
        scoreCpu++
        result.innerText = 'Sconfitta'
    }
    if (userNum == 3 && cpu == 1) {
        scoreCpu++
        result.innerText = 'Sconfitta'
    }
    if (userNum == 3 && cpu == 2) {
        scoreUser++
        result.innerText = 'Vittoria'
    }
    userScore.innerText = scoreUser;
    computerScore.innerText = scoreCpu;
}











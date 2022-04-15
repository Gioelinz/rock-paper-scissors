console.log('JS OK');

const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const userScore = document.getElementById('user-score');
const computerScore = document.getElementById('computer-score');
const result = document.querySelector('.result');
const startMessage = 'Inserite qua il risultato'
const userChoice = document.getElementById('user-choice')
const cpuChoice = document.getElementById('cpu-choice')
const storic = document.getElementById('storico-risultati')
const reset = document.getElementById('reset')
let cpu;
let userNum;
let scoreUser = 0;
let scoreCpu = 0;
let counter = 1;
let isClickable = false;


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * max - min + 1) + min
}

// console.log(getRandomNumber(1, 3))



result.innerText = startMessage
const audio = new Audio('sounds/clicksound.wav');

const rockIcon = `<div class="choice">
<img
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKfSURBVGhD7ZjJy81RGIA/GaPMItPOglhJFqzIEDZIypBhoZQkfYXwB1BCFhZ2UqSQsqCUJHMyZWnKkFhQyDw8z/nu6XeTm+m+9/Pdfk89fb/3/W7nnPeec+8957SUlJSUlDQj/bB722PHoBt2antMLMG7+A0/42kci5n/rrjpeBU/4Rs8jJvRAvRj1fML9H8W+AU/4BEcgu3KfPyKDvId+s7nQesG7IpD8WIll61+/R3sgtILq2e2IeSlsxUdyEA8Vck9weoBzULzFj4PO6Ovv4Hm9+ODyvN7PIa+AeEMQDt9maKCyWj+VooKauVXo/nsa3TZ+WyReabCGIl29jBFBePQfK1CzqWoYA6a11UmYBjeQ3Mu31BqFTIKzV9LUcEkNP9jIbnAx1i9FDeh+Z0pCqRWIQ5mPU5NUYG/J5fRAVaTCzmfooKFaP5QigKpVcifMhiv4NoUFcxG2z+RokDqVUgtGlbIcGyKQvpgUxQyCDt8IVPwPtqRfyMIL2QivkU7eYpLMYLQQnqjg7eDA+gGL4rQQlrRxs+im75IQgu5hDY+LUWxhBbiIcltuGeMaMIK8fNhw69SFE9YIZ4LnA1txHk7dGk9Qhsfk6JYQgvxYsHG16UoltBCFqGN38ToC4LQQnriM7SDuSYCCS1E1qAdXMfIWcln+eMpCsBvrHxtEzkrK9A+9qUoiOUYPSs70D68mQzDfZa3g1Gz4m9WnvUJJiKxADvyYOVpsZ54EWHbtzH62zFxBu3wKPYwUQe8HvJy23ZnmmgEI/A52ukF/JdffDeizoT3vra3HRvKaMzr2X3YSdyCi3HBb7gSd6NL1DZ0G0afd35KX9yD+d38W90xzMB2pz8uw114EN2b/cq9uBHHY0M+2CUlJSUldaSl5Tv4zOmPUWh7YwAAAABJRU5ErkJggg==" />
</div>`

const paperIcon = `<div class="choice">
<img
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALqSURBVGhD7ZlL6A1RHMevt5BHHnllgZL3TikkQpHHwsZjQVjYyiMrZYEsiIV3NmSDhUd/VixsbAhFeYfyWFD8Q17x+c6Zc5s7Hf1dM2fm3JpPfZpzbt3bfO+c38w5Z2oVFa3JGByPnaNeCzIOb+Pv2Cc4DVuKHngfL+AoHILH8Q0OwOAZFB9n4nfsG/UMXfE1rsVtqJCHcCoGQSfcjB9QQ+glnsEXmOYG/kINs33Yht9wHpbORvyE63ASbsEf+Lcgj7F31DPsxUemWS4PUCef5DC6guxEDa0kE1FXcmDUKxENldmmWWc0LjLNDtHNQEF0LBWdxAzTrDMFd5tmA5twjmnWSQbpFVsKriC63S41zQbmoh6QSWyQq/gTVV/nsfCh5grSDV1DZTgmC13YIHdQt215F89hobiCzMIrptnAEVxtmnVskORv6Pu6MoUOM1eQrNhwrqvqDVeQZopd05lT8dESTJBmil2z4vXx0RJMkGaKXYyNj5ZggjRT7CroV/HREkyQrAQTpCr2mGCCVMUek3uQLqiTXIOLsT+mcQXJSq5BpuND1A9qra01eDtuRS1vLUEHmY9f8BiqcEVP1JVRmINowwQd5BJqM2Fw1GtEJ/0ZtXkggg6iwruJWhf00wcptLRVmF0YdBChPap7qJ2P5B3FouH3FYMPIkbiU7yM3fVBioWofanggwg9rN7iaXRtRC/DvPd0vQQRk1F3seVRzz/egogDqJrRQ9I3XoMMRW2Nboh6fvEaRGxH1Utyl90H3oPo6f4M90c9f3gPIhagdgTT+715MgEVxE6PvKEXNJp6D4t6+bMEdZdMTk69oGWppjDS9dTPykm8aJr+GYHP8Rr20Qc5oTfA2i7VFKgwVIx623QLNa6zoj9Hb7TORr2C0VRfrwE0gdQbqf+5OnpRuhK1gNMV9jFc/5lV+A4/4nU8gUc7ULWgF6LvUQu2HaiNi9LRP7kCtehynbjLPajvuPYDKioqcqNW+wMkWMAxXNmXsgAAAABJRU5ErkJggg==" />
</div>`

const scissorsIcon = `<div class="choice">
<img
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATySURBVGhD7ZlprF9DGIevLWIJaoul9ogiog0iYg9iadQHS4JaW1uINqpI7QlfJITYI4hUIpEoidpCQkiIFkWJtWlQGjsVey3Pc+6dmnvunHvmnP8/+uX8kif3P3PmvGdmzjvvvHPuQKdOnTp16tSp0/+m1WEfuBRuHfo7FvqiVWEXOBk0fBGcCJtBr7Lje4N2n4Kf4J8S1h0ErbQhnAQPwldQNi5/w3NgR3K1GuwFM+EJWAZlm2/DLXAOPATWvwFZWgUmwBXwMiyH+AEfgIO6EW6AOfADeM22Z0NKdnwPmAGPw48Q27Xj74BudCxsDLG838H6jLWsqNLBcB8shfgBP4MzdgHsAClp+Br4C+zQEaAb7g7T4DH4HmK78i7cDsfDplCnL8H7yoMstB74oPgBH4MzcxSsDbmaDt7/LXwz9DvGt3k3uK42hyY6D7Rh30bI1/U82MCHz4Jx0Fa+hcUQOv4R3AMGhy2gqfSAi+E1CDZPgBG6ELz4HexoRR/k2tHmVUWpmVyfe8J1sBBC5+VzOA6S+gxspI/2S8EF7ihK9VoDDoXb4FOIO/813A9Hg+0qZWMHo4v1S0eCdp8sSmmtC86u0U9viDuva94M7hfZ/fJGR9xUG8A6gz9HaCfQ7ntF6T8ZlaaCofdXiDu/AIx646GVNHLt4M8sOYDr4Reo2pjWBEPwb6DPHwIvgaE5dNy9wCBjlNsOepZGLxv8WatTQZ8NnZFtIKWw9raER4Z+x/wOLuaHwYVtOHazrHrLtdJo7kDCRvksGFb9fQak5Bvw+n6gS00Bs4C54D5QzhYCvslP4BlwnZwLrpXaXM6bcwfijB0AkyE8eDakZL3XbZuS7ueub7Q0TJtH6aq6bLBdxqDwChjddNdhskHuQNRhoFsE48b2lFx3Xr+yKOXLDXVbMMUxszYLeBFSyarZyIqcy4qcgZhia/gP8J6rIayDnaGs08FrbSJilTYCXfVyCDnXTVCobiDmWafBm2DbP8EkUD0A1p1flIZLF/TaF+CCrsJ9RHvuK01k6uJ68nziW6wciGnCCxC7kYNxRoKMYtYblcraGsJ9OZhMNs3FHISDKdxLI6mBBB938ZnCuyjdE2J57LSNyWYxK5Ese83oZPpRhWHXBWxbN1AzbteVrmmGsBuk0vuQPbxflJCF1ECMKvtCXQrvTGrDIBDL/cV6Q3adxkDqWBujZ5iHedB7FXRx683rClnIWexVCtmzR1IXo1ofzLOsN4XPkXuL7T1G6A33gnuO7uxk6EJeDzgwN9IVuZiVvQzEN/chaMdj6DwIR1hDszt7nSaBHU0emIZk5qstvwnoKU7WMPU6ELUVPA3aitHtzAJGYz6EHOwUaC0NNN20qnQXxAPJxWBxFvQkDd05+LMn7Q/a8kPFJZCKUIFjwLdh+7egL2chjY3mm7ky/9GWZ4ocmeX6Jryn6UeIpMw0NTaxKLWX0Uk7bpK5ct/wnu2LUo/SNzW2CDaxoqX8SqIdY/yIiJKQx9y6SNVIJoOmInbC0Nnmk40yPLqXaMfw+zr4CSeF0SzsC05A3+Sb8Iufhv2o5mJtMyDtPArlzSuFzzkT+i7dwWw0PMjOLAEPO6lZTeEbcReOz+baMUIdDh7MxO9n5dys7zoQPK2Fj9Jt8AuJOZERbFdYqTLT9ZzscTTMZB3+38QEsFOnTp06jaKBgX8BYNbZ+2P3L60AAAAASUVORK5CYII=" />
</div>`
const titleResults = `<li class="title-results h1">Risultati</li>`




rock.onclick = (e) => {
    if (!isClickable) {
        userNum = 1
        startGame(userNum)
        userChoice.innerHTML = rockIcon
        counter++;
    }
}

paper.onclick = (e) => {
    if (!isClickable) {
        userNum = 2
        startGame(userNum)
        userChoice.innerHTML = paperIcon
        counter++;
    }
}

scissors.onclick = (e) => {
    if (!isClickable) {
        userNum = 3
        startGame(userNum)
        userChoice.innerHTML = scissorsIcon
        counter++;
    }
}

reset.onclick = (e) => {
    counter = 1
    scoreUser = 0
    scoreCpu = 0
    userScore.innerText = scoreUser;
    computerScore.innerText = scoreCpu;
    storic.innerHTML = titleResults
    result.innerText = 'Rigioca!'
}



function startGame(userNum) {

    isClickable = true
    audio.play();
    result.innerText = startMessage
    cpu = getRandomNumber(1, 3);


    switch (cpu) {
        case 1:
            cpuChoice.innerHTML = rockIcon;
            break;

        case 2:
            cpuChoice.innerHTML = paperIcon;
            break;
        default:
            cpuChoice.innerHTML = scissorsIcon;
            break;
    }

    switch (userNum) {
        case 1:
            userChoice.innerHTML = rockIcon;
            break;

        case 2:
            userChoice.innerHTML = paperIcon;
            break;
        default:
            userChoice.innerHTML = scissorsIcon;
            break;
    }

    rockPaperScissors(userNum)

    /* console.log(cpuChoice.innerHTML)
    console.log(userChoice.innerHTML) */

    if (counter < 2) storic.innerHTML = "";

    const node = document.createElement("li");
    storic.appendChild(node)
    node.innerHTML = `
        <span>Round: ${counter}</span> 
        <div class="d-flex align-items-center bruno justify-content-evenly">
        ${userChoice.innerHTML}
        <h5> ${result.innerText} </h5>
        ${cpuChoice.innerHTML}
        </div>
        `
    setTimeout(() => {
        isClickable = false
    }, 1500);
}



function rockPaperScissors(userNum) {
    /* Se utente e Cpu mettono lo stesso segno */
    if (userNum == cpu) {
        scoreUser++
        scoreCpu++
        result.innerText = 'Pareggio';
    }

    /* utente mette sasso e cpu mette carta */
    if (userNum == 1 && cpu == 2) {
        scoreCpu++
        result.innerText = 'Sconfitta'
    }

    /* utente mette sasso e cpu mette forbice */
    if (userNum == 1 && cpu == 3) {
        scoreUser++
        result.innerText = 'Vittoria'
    }

    /* utente mette carta e cpu mette sasso */
    if (userNum == 2 && cpu == 1) {
        scoreUser++
        result.innerText = 'Vittoria'
    }
    /* utente mette carta e cpu mette forbice */
    if (userNum == 2 && cpu == 3) {
        scoreCpu++
        result.innerText = 'Sconfitta'
    }
    /* utente mette forbice e cpu mette sasso */
    if (userNum == 3 && cpu == 1) {
        scoreCpu++
        result.innerText = 'Sconfitta'
    }
    /* utente mette forbice e cpu mette carta */
    if (userNum == 3 && cpu == 2) {
        scoreUser++
        result.innerText = 'Vittoria'
    }

    userScore.innerText = scoreUser;
    computerScore.innerText = scoreCpu;
}
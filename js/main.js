'use strict';

let guessCount = 1;
const maxCount = 7;
let randomNumber = Math.floor(Math.random() * 100) + 1;

const container = document.getElementById('container');
const numberInput = document.getElementById('number-input');
const submitButton = document.getElementById('submit-button');
const results = document.getElementById('results');
const message = document.getElementById('message');
let restartButton;

function checkGuess() {
    const guessNumber = Number(numberInput.value);
    
    if (Number.isNaN(guessNumber)) {
        return;
    }

    const li = document.createElement('li');
    if (guessNumber === randomNumber) {
        li.textContent = `${guessNumber}は正解です`;
        message.textContent = `Congrats!! ${guessNumber}は正解です`;
        message.classList.add('correct');
        finishGuess();
    } else {
        if (guessNumber > randomNumber) {
            li.textContent = `${guessNumber}より小さいです`;
        } else {
            li.textContent = `${guessNumber}より大きいです`;
        }

        if (guessCount === maxCount) {
            message.textContent = `Game Over!! 正解は${randomNumber}です！`;
            message.classList.add('incorrect');
            finishGuess();
        }
    }

    results.appendChild(li);
    numberInput.value = '';
    numberInput.focus();
    guessCount++;
}

submitButton.addEventListener('click', checkGuess);

function finishGuess() {
    numberInput.disabled = true;
    submitButton.disabled = true;
    restartButton = document.createElement('button');
    restartButton.textContent = 'リスタート';
    restartButton.addEventListener('click', restartGame);
    container.appendChild(restartButton);
}

function restartGame() {
    numberInput.disabled = false;
    submitButton.disabled = false;

    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }

    message.textContent = '';
    message.removeAttribute('class');
    restartButton.parentNode.removeChild(restartButton);
    guessCount = 1;
    randomNumber = Math.floor(Math.random() * 100) + 1;
}
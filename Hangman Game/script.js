
const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");


let currentWord;
let correctLetters;
let wrongGuessCnt;
const maxGuesses = 6;

const resetGame = () => {
    // Ressetting game variables and UI elements
    correctLetters = [];
    wrongGuessCnt = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCnt}.svg`;
    guessesText.innerText = `${wrongGuessCnt} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}


const getRandomWord = () => {

    //selecting a random word and hint from wordlist
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

const gameOver = (isVictory) => {
    // After game complete.. showing modal with relevant details
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}




const initGame = (button, clickedLetter) => {
    // Checking if clickedLetter is exist on the currentWord
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                const listItem = wordDisplay.querySelectorAll("li")[index];
                listItem.innerText = letter;
                listItem.classList.add("guessed");
            }
        });
    } else {
        //If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCnt++;
        hangmanImage.src = `images/hangman-${wrongGuessCnt}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCnt} / ${maxGuesses}`;


    // Calling gameOver function if any of these condition meets
    if(wrongGuessCnt === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

//create keyboard buttons dynamically and adding event listner
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
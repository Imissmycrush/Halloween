window.onload = function() {
    let wordsArray = [
      ["C", "A", "T", "S"],
      ["M", "O", "U", "S", "E"],
      ["J", "A", "V", "A", "S", "C", "R", "I", "P", "T"],
      ["P", "O", "T", "A", "T", "O"],
      ["U", "N", "D", "E", "F", "I", "N", "E", "D"],
      ["S", "P", "A", "G", "H", "E", "T"],
      ["W", "A", "Y"]
    ];
    let categoryArray = [
      ["The internet and Youtube would not be the same without them"],
      ["Touchpad ain't got nothing on me"],
      ["Love it or hate it, frontend devs need it"],
      ["This hangman game is..."],
      ["I'm declared, but don't have a value"],
      ["Somebody toucha my..."],
      ["You do not know de..."]
    ];
  
    document.getElementById("newGame").onclick = startNewGame;
  
    class Hangman {
      constructor() {
        this.random = Math.floor(Math.random() * wordsArray.length);
        this.wordToGuess = wordsArray[this.random];
        this.category = categoryArray[this.random];
        this.placeholderArray = Array(this.wordToGuess.length).fill("_");
        this.guessed = [];
        this.lives = 6;
      }
      setupNewWord() {
        const guessWrapper = document.getElementById("guessWrapper");
        const category = document.getElementById("categoryName");
  
        if (guessWrapper && category) {
          category.innerHTML = this.category;
          let placeholderP = document.createElement("p");
          placeholderP.setAttribute("id", "placeholderP");
          placeholderP.innerHTML = this.placeholderArray.join("");
          guessWrapper.appendChild(placeholderP);
  
          const userLetter = document.getElementById("userLetter");
          const guessButton = document.getElementById("guessButton");
  
          if (userLetter && guessButton) {
            userLetter.onkeypress = this.handleKeyPress.bind(this);
            guessButton.onclick = this.handleClick.bind(this);
          }
        }
      }
      handleClick() {
        const userLetterInput = document.getElementById("userLetter");
        const userLetter = userLetterInput?.value.toUpperCase();
        const placeholderP = document.getElementById("placeholderP");
        const warningText = document.getElementById("warningText");
        const wrongLetters = document.querySelector("#wrongLetters span");
  
        if (userLetter && !/[A-Z]/.test(userLetter)) {
          unhideElements("hidden", warningText);
          warningText.innerHTML = "Please enter a letter from A-Z";
        } else if (userLetter) {
          hideElements("hidden", warningText);
          if (this.wordToGuess.includes(userLetter) && !this.guessed.includes(userLetter)) {
            checkGuess(this.wordToGuess, userLetter);
            hideElements("hidden", warningText);
          } else if (!this.wordToGuess.includes(userLetter) && !this.guessed.includes(userLetter)) {
            unhideElements("hidden", wrongLetters.parentNode);
            wrongLetters.innerHTML += userLetter;
            this.lives--;
            hangerDraw(this.lives);
            hideLives(this.lives);
          } else {
            unhideElements("hidden", warningText);
            warningText.innerHTML = `Already typed ${userLetter}`;
          }
          if (!this.guessed.includes(userLetter)) this.guessed.push(userLetter);
  
          if (Array.from(placeholderP.innerHTML).indexOf("_") === -1) {
            gameOver(true);
          } else if (this.lives === 0) {
            gameOver();
          }
        }
        userLetterInput.value = "";
      }
      handleKeyPress(e) {
        if (e.keyCode === 13) document.getElementById("guessButton").click();
      }
    }
  
    function checkGuess(wordToGuess, userLetter) {
      const placeholderP = document.getElementById("placeholderP");
      if (placeholderP) {
        let placeholderArray = Array.from(placeholderP.innerHTML);
        placeholderArray = placeholderArray.map((el, i) =>
          wordToGuess[i] === userLetter ? userLetter : el
        );
        placeholderP.innerHTML = placeholderArray.join("");
      }
    }
  
    function gameOver(win) {
      const winMessage = document.getElementById("statusMessage");
      if (winMessage) {
        winMessage.innerHTML = win ? "You Win" : "Game Over";
        winMessage.style.color = win ? "green" : "rgb(239, 83, 80)";
      }
    }
  
    function hangerDraw(num) {
      const show = document.getElementById(`show${num}`);
      if (show) unhideElements("hidden", show);
    }
  
    function hideLives(num) {
      const life = document.getElementById(`life${num}`);
      if (life) hideElements("hiddenLife", life);
    }
  
    function hideElements(myclass, ...els) {
      els.forEach(el => el?.classList.add(myclass));
    }
  
    function unhideElements(myclass, ...els) {
      els.forEach(el => el?.classList.remove(myclass));
    }
  
    function startNewGame() {
      const btnWrapper = document.querySelector(".button-wrapper");
      const winMessage = document.getElementById("statusMessage");
      const wrongLetters = document.querySelector("#wrongLetters span");
      const warningText = document.querySelector("#warningText");
      const hiddenHangman = Array.from(document.querySelectorAll("svg .bodyPart"));
      const hiddenLives = Array.from(document.querySelectorAll(".lives"));
  
      hiddenHangman.forEach(bodyPart => hideElements("hidden", bodyPart));
      hiddenLives.forEach(life => unhideElements("hiddenLife", life));
  
      if (wrongLetters && btnWrapper && winMessage && warningText) {
        wrongLetters.innerHTML = "";
        unhideElements("hidden", btnWrapper);
        hideElements("hidden", wrongLetters.parentNode, warningText);
        winMessage.innerHTML = "Vanilla JavaScript Hangman Game";
        winMessage.style.color = "black";
      }
  
      const oldP = document.getElementById("placeholderP");
      if (oldP) oldP.remove();
  
      const startGame = new Hangman();
      startGame.setupNewWord();
    }
  
    startNewGame();
  };
  
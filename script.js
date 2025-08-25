document.addEventListener("DOMContentLoaded", function () {
  const cardAlphabet = "AABBCCDDEEFFGGHH".split("");

  // shuffle cards
  cardAlphabet.sort(() => Math.random() - 0.5);

  const container = document.getElementById("myContainer");
  let htmlToRepeat = "";

  for (let i = 0; i < cardAlphabet.length; i++) {
    htmlToRepeat += `
      <div class="flip-card" id="card${i + 1}" data-letter="${cardAlphabet[i]}">
        <div class="flip-card-inner">
          <div class="flip-card-front">?</div>
          <div class="flip-card-back">${cardAlphabet[i]}</div>
        </div>
      </div>
    `;
  }

  container.innerHTML = htmlToRepeat;

  let firstCard = null;
  let secondCard = null;
  let clickCount = 0;

  const flipCards = document.querySelectorAll(".flip-card");

  flipCards.forEach((card) => {
    card.addEventListener("click", function () {
      if (this.classList.contains("open")) {
        return;
      }
      this.classList.add("flipped");

      if (clickCount === 0) {
        firstCard = this;
        clickCount = 1;
      } else if (clickCount === 1) {
        secondCard = this;
        clickCount = 0;

        if (firstCard.dataset.letter === secondCard.dataset.letter) {
          firstCard.classList.add("open");
          secondCard.classList.add("open");
        } else {
          setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
          }, 800);
        }
      }

      if ([...flipCards].every((card) => card.classList.contains("open"))) {
        document.getElementById("gameBtn").innerHTML = `
        <h1>You Won! 🎉</h1>
        <button class="btn-reset">Play Again</button>
      `;
      }

      const resetBtn = document.querySelector(".btn-reset");
      resetBtn.addEventListener("click", function () {
        location.reload();
      });
    });
  });
});

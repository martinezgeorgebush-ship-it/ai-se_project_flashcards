import { hexToString, removeColorClasses } from "./colors.js";

function getCarouselTitleString(deck, index) {
  return `${deck.name} · ${index + 1}/${deck.cards.length}`;
}

function renderCarouselView(deck) {
  console.log(deck);
  const carouselSection = document.querySelector(".carousel");
  const carouselTitle = carouselSection.querySelector(".carousel__title");
  const carouselCard = carouselSection.querySelector(".carousel__card");
  const carouselCardText = carouselSection.querySelector(
    ".carousel__card-text",
  );
  const leftBtn = carouselSection.querySelector(".carousel__btn_type_left");
  const rightBtn = carouselSection.querySelector(".carousel__btn_type_right");
  const flipBtn = carouselSection.querySelector(".carousel__btn_type_flip");

  let currentIndex = 0;
  let showingQuestion = true;

  removeColorClasses(carouselCard);
  carouselCard.classList.add(`carousel__card_color_${hexToString(deck.color)}`);

  function updateDisplay() {
    const currentCard = deck.cards[currentIndex];
    if (showingQuestion) {
      carouselCardText.textContent = currentCard.question;
      carouselCard.classList.remove("carousel__card_color_white");
    } else {
      carouselCardText.textContent = currentCard.answer;
      carouselCard.classList.add("carousel__card_color_white");
    }
    carouselTitle.textContent = getCarouselTitleString(deck, currentIndex);
    leftBtn.classList.toggle("carousel__btn_disabled", currentIndex === 0);
    rightBtn.classList.toggle(
      "carousel__btn_disabled",
      currentIndex === deck.cards.length - 1,
    );
  }

  leftBtn.onclick = () => {
    if (currentIndex > 0) {
      currentIndex--;
      showingQuestion = true;
      updateDisplay();
    }
  };

  rightBtn.onclick = () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex++;
      showingQuestion = true;
      updateDisplay();
    }
  };

  flipBtn.onclick = () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  };

  updateDisplay();
  carouselSection.style.display = "flex";
}

export { renderCarouselView };

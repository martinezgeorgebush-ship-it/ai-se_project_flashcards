import { hexToString } from "./colors.js";

const homeSection = document.querySelector("#home");
const deckViewSection = document.querySelector("#deck-view");
const deckViewList = deckViewSection.querySelector(".gallery__list");
const deckViewTitle = deckViewSection.querySelector(".gallery__title");
const cardTemplate = document.querySelector("#card-template");
const notFoundSection = document.querySelector("#not-found");
const carouselSection = document.querySelector(".carousel");
const mainContent = document.querySelector(".page__main-content");

let currentDeck = null;

function createCardEl(card, colorName) {
  const cardEl = cardTemplate.content.firstElementChild.cloneNode(true);
  cardEl.className = `card card_color_${colorName}`;

  const title = cardEl.querySelector(".card__title");
  title.textContent = card.question;

  const deleteBtn = cardEl.querySelector(".card__btn_type_delete");
  deleteBtn.addEventListener("click", () => {
    cardEl.remove();
  });

  return cardEl;
}

function renderDeckView(deck) {
  currentDeck = deck;

  homeSection.style.display = "none";
  deckViewSection.style.display = "";
  notFoundSection.style.display = "none";
  carouselSection.style.display = "none";
  mainContent.classList.remove("page__main-content_location_carousel");

  deckViewTitle.textContent = deck.name;
  deckViewList.querySelectorAll(".card").forEach((el) => el.remove());

  deck.cards.forEach((card) => {
    const cardEl = createCardEl(card, hexToString(deck.color));
    deckViewList.append(cardEl);
  });
}

function getCurrentDeck() {
  return currentDeck;
}

export { renderDeckView, getCurrentDeck };

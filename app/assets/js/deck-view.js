import { hexToString } from "./colors.js";
import { openModal } from "./modal.js";
import { showView } from "./view.js";

const deckViewSection = document.querySelector("#deck-view");
const deckViewList = deckViewSection.querySelector(".gallery__list");
const deckViewTitle = deckViewSection.querySelector(".gallery__title");
const cardTemplate = document.querySelector("#card-template");

let currentDeck = null;

function createCardEl(card, colorName) {
  const cardEl = cardTemplate.content.firstElementChild.cloneNode(true);
  cardEl.className = `card card_color_${colorName}`;

  const title = cardEl.querySelector(".card__title");
  title.textContent = card.question;

  const deleteBtn = cardEl.querySelector(".card__btn_type_delete");
  deleteBtn.addEventListener("click", () => {
    openModal(() => {
      cardEl.remove();
    });
  });

  return cardEl;
}

function renderDeckView(deck) {
  currentDeck = deck;

  deckViewTitle.textContent = deck.name;
  deckViewList.querySelectorAll(".card").forEach((el) => el.remove());

  deck.cards.forEach((card) => {
    const cardEl = createCardEl(card, hexToString(deck.color));
    deckViewList.append(cardEl);
  });

  showView(deckViewSection, "");
}

function getCurrentDeck() {
  return currentDeck;
}

export { renderDeckView, getCurrentDeck };

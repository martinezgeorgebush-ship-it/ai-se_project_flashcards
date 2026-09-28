import { hexToString } from "./colors.js";
import { openModal } from "./modal.js";
import { showView } from "./view.js";

const deckViewSection = document.querySelector("#deck-view");
const deckViewList = deckViewSection.querySelector(".gallery__list");
const deckViewTitle = deckViewSection.querySelector(".gallery__title");
const cardTemplate = document.querySelector("#card-template");

let currentDeck = null;

/**
 * Builds a flashcard element from the card template, filled in with the card's question
 * and colored to match the deck, and wires up its delete button.
 * @param {Object} card - The card object containing question/answer data.
 * @param {string} colorName - The color name to apply to the card (e.g. "green").
 * @returns {HTMLElement} The completed card element.
 */

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

/**
 * Displays the given deck's cards in the deck view, replacing any cards shown before.
 * @param {Object} deck - The deck object to display.
 * @returns {void}
 */

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

/**
 * Returns the deck that is currently being viewed.
 * @returns {Object|null} The current deck, or null if none is set.
 */

function getCurrentDeck() {
  return currentDeck;
}

export { renderDeckView, getCurrentDeck };

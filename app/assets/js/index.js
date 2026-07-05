import { decks, getDeckByID } from "./decks.js";
import { renderCarouselView } from "./carousel.js";
import { renderDeckView, getCurrentDeck } from "./deck-view.js";
import { hexToString } from "./colors.js";

console.log(decks);

const deckTemplate = document.querySelector("#deck-template");
const homeSection = document.querySelector("#home");
const homeGalleryList = homeSection.querySelector(".gallery__list");
const notFoundSection = document.querySelector("#not-found");
const carouselSection = document.querySelector(".carousel");
const mainContent = document.querySelector(".page__main-content");
const deckViewSection = document.querySelector("#deck-view");

function createDeckEl(item) {
  const deckEl = deckTemplate.content.firstElementChild.cloneNode(true);

  const colorName = hexToString(item.color);
  deckEl.className = `card card_color_${colorName}`;

  const deckLink = deckEl.querySelector(".card__link");
  deckLink.href = `#deck/${item.id}`;

  deckEl.querySelector(".card__title").textContent = item.name;
  deckEl.querySelector(".card__count").textContent =
    `${item.cards.length} cards`;

  const deleteBtn = deckEl.querySelector(".card__btn_type_delete");
  deleteBtn.addEventListener("click", () => {
    deckEl.remove();
  });

  return deckEl;
}

function renderDeckEl(item) {
  const deckEl = createDeckEl(item);
  homeGalleryList.prepend(deckEl);
}

function renderView(hash) {
  homeSection.style.display = "none";
  notFoundSection.style.display = "none";
  carouselSection.style.display = "none";
  mainContent.classList.remove("page__main-content_location_carousel");
  deckViewSection.style.display = "none";
  if (hash === "#home" || hash === "") {
    homeSection.style.display = "";
    return;
  }

  if (hash.startsWith("#deck/")) {
    const deckId = hash.split("/")[1];
    const deck = getDeckByID(deckId);

    if (deck) {
      renderDeckView(deck);
      return;
    }
  }

  if (hash.startsWith("#carousel/")) {
    const deckId = hash.split("/")[1];
    const deck = getDeckByID(deckId);

    if (deck) {
      mainContent.classList.add("page__main-content_location_carousel");
      renderCarouselView(deck);
      return;
    }
  }

  notFoundSection.style.display = "block";
}

window.addEventListener("hashchange", () => {
  renderView(window.location.hash);
});

const practiceBtn = deckViewSection.querySelector(".gallery__practice-btn");

practiceBtn.addEventListener("click", () => {
  const currentDeck = getCurrentDeck();
  if (currentDeck) {
    window.location.hash = `#carousel/${currentDeck.id}`;
  }
});

decks.forEach(renderDeckEl);
renderView(window.location.hash);

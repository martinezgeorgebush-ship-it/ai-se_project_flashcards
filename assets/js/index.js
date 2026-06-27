import { decks, getDeckByID } from "./decks.js";
import { renderCarouselView } from "./carousel.js";
import { hexToString } from "./colors.js";

console.log(decks);

const deckTemplate = document.querySelector("#deck-template");
const decksList = document.querySelector(".decks__list");
const homeSection = document.querySelector("#home");
const notFoundSection = document.querySelector("#not-found");
const carouselSection = document.querySelector(".carousel");
const mainContent = document.querySelector(".page__main-content");

function createDeckEl(item) {
  const deckEl = deckTemplate.content.firstElementChild.cloneNode(true);

  const colorName = hexToString(item.color);
  deckEl.className = `deck deck_color_${colorName}`;

  const deckLink = deckEl.querySelector(".deck__link");
  deckLink.href = `#carousel/${item.id}`;

  deckEl.querySelector(".deck__title").textContent = item.name;
  deckEl.querySelector(".deck__count").textContent =
    `${item.cards.length} cards`;

  const deleteBtn = deckEl.querySelector(".deck__delete-btn");
  deleteBtn.addEventListener("click", () => {
    deckEl.remove();
  });

  return deckEl;
}

function renderDeckEl(item) {
  const deckEl = createDeckEl(item);
  decksList.prepend(deckEl);
}

function renderView(hash) {
  homeSection.style.display = "none";
  notFoundSection.style.display = "none";
  carouselSection.style.display = "none";
  mainContent.classList.remove("page__main-content_location_carousel");

  if (hash === "#home" || hash === "") {
    homeSection.style.display = "";
    return;
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

decks.forEach(renderDeckEl);
renderView(window.location.hash);

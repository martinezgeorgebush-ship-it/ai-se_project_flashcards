const homeSection = document.querySelector("#home");
const deckViewSection = document.querySelector("#deck-view");
const carouselSection = document.querySelector(".carousel");
const notFoundSection = document.querySelector("#not-found");

function showView(currentSection, display) {
  homeSection.style.display = "none";
  deckViewSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";
  currentSection.style.display = display;
}

export { showView };
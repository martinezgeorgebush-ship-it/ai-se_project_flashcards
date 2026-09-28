import {  fetchedDecks } from "./decks.js";
import { addDeck } from "./api.js";
import { renderDeckEl } from "./index.js";

const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;
const newDeckForm = document.querySelector("#new-deck-form");
const submitBtn = newDeckForm.querySelector(".new-deck-view__submit");
const textarea = newDeckForm.querySelector(".new-deck-view__textarea");
textarea.placeholder = `{
  "name": "Deck Name",
  "cards": [
    {
      "question": "Question",
      "answer": "Answer"
    }
  ]
}`;
const errorModal =document.querySelector("#error-modal");
const errorModalCloseBtn = errorModal.querySelector(".modal__btn_type_close");
const errorMessageEl = errorModal.querySelector(".modal__error");

errorModalCloseBtn.addEventListener("click",() =>{
 errorModal.classList.remove("modal_visible")
}
);

/**
 * Returns a consistent lowercase hex color string with a leading "#".
 * Accepts values with or without a leading "#". Returns "#64d583" as a
 * fallback if the value is missing or not a valid 6-digit hex.
 *
 * @param {string|undefined} color
 * @returns {string}
 */
function normalizeColor(color) {
  if (!color) return "#64d583";
  const hex = color.startsWith("#") ? color.slice(1) : color;
  if (!HEX_DIGITS.test(hex)) return "#64d583";
  return "#" + hex.toLowerCase();
}

export{showError};

/**
 * Displays the given error message in the error modal.
 * @param {string} message - The error message to show.
 * @returns {void}
 */

function showError(message) {
errorMessageEl.textContent = message;
errorModal.classList.add("modal_visible");
}

/**
 * Attempts to parse a string as JSON.
 * @param {string} jsonString - The string to parse.
 * @returns {Object|null} The parsed object, or null if the string isn't valid JSON.
 */

function parseJSON(jsonString) {
try{
  return JSON.parse(jsonString);
} catch (error) {
  return null;
}
}

/**
 * Validates that a name is a string between 2 and 80 characters long.
 * @param {string} name - The name to validate.
 * @returns {string|null} The valid name, or null if it fails validation.
 */

function validateName(name){
  if (typeof name !="string" || name.length < 2 || name.length > 80) {
    return null;
  }
  return name;
}
/**
 * Enables the "Create deck" submit button.
 * @returns {void}
 */

export function disableSubmitBtn() {
  submitBtn.disabled = false;
}

newDeckForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const values = Object.fromEntries(formData);
  const jsonData = parseJSON(values.deckData);
    if(jsonData === null){
   showError("Invalid JSON format"); 
   return;
  }

  if(validateName(jsonData.name) === null){
    showError("Name must be a string between 2 and 80 characters.");
    return;
  }
  
  if(!Array.isArray(jsonData.cards)) {
    showError("Cards must be an array");
    return;
  }

  const color = normalizeColor(values.color);
  if(typeof jsonData.color ==="string") {
    if(jsonData.color.toLowerCase() !== color) {
      showError("Select the correct color")
      return;
    }
  }
  

addDeck({
  color:color,
  name:jsonData.name,
  cards:jsonData.cards,
})
.then((newDeck) => {
  fetchedDecks.push(newDeck);
    renderDeckEl(newDeck);
  window.location.hash = "deck/" + newDeck._id;
});
});

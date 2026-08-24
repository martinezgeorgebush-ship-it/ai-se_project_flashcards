import { decks } from "./decks.js";

const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;
const newDeckForm = document.querySelector("#new-deck-form");
const submitBtn = newDeckForm.querySelector(".new-deck-view__submit");
const textarea = newDeckForm.querySelector(".new-deck-view__textarea");
const errorModal =document.querySelector("#error-modal");
const errorModalCloseBtn = errorModal.querySelector(".modal__btn_type_close");
const errorMessageEl = errorModal.querySelector(".modal__error");

errorModalCloseBtn.addEventListener("click",() =>{
 errorModal.classList.remove("modal_visible")
}
);
/*
 * Converts a string to a URL-safe slug: lowercase with any run of
 * non-alphanumeric characters replaced by a single hyphen, and no leading or
 * trailing hyphens.
 *
 * @param {string} str
 * @returns {string}
 */
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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

function showError(message) {
errorMessageEl.textContent = message;
errorModal.classList.add("modal_visible");
}

function parseJSON(jsonString) {
try{
  return JSON.parse(jsonString);
} catch (error) {
  return null;
}
}
function validateName(name){
  if (typeof name !="string" || name.length < 2 || name.length > 80) {
    return null;
  }
  return name;
}
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
  const id = slugify(jsonData.name) + Date.now();
  decks.push({
    id: id,
    color: color,
    name: jsonData.name,
    cards: jsonData.cards,
  });
    window.location.hash = "deck/" + id;
});


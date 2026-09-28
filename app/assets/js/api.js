const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";

const headers = {
  "Content-Type": "application/json",
  Authorization: "01a0c715-94d2-770d-9eb0-b9c314af27ba",
};

/**
 * Handles a fetch response: parses it as JSON if successful, or rejects with an error message.
 * @param {Response} res - The response object returned by fetch.
 * @returns {Promise<Object>} A promise that resolves to the parsed JSON data.
 */

function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(processResponse);
}

/**
 * Fetches all decks from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of deck objects.
 */

function getDecks() {
  return request(`${baseUrl}/decks`, { headers });
}

export { getDecks, deleteDeck, addDeck };

/**
 * Deletes a deck from the API by its ID.
 * @param {string} deckId - The ID of the deck to delete.
 * @returns {Promise<Object>} A promise that resolves to the API's response data.
 */

function deleteDeck(deckId) {
  return request(`${baseUrl}/decks/${deckId}`, {
    method: "DELETE",
    headers,
  });
}

/**
 * Creates a new deck via the API.
 * @param {Object} deckData - The deck data to send (name, color, cards).
 * @returns {Promise<Object>} A promise that resolves to the newly created deck object.
 */

function addDeck(deckData) {
  return request(`${baseUrl}/decks`, {
    method: "POST",
    headers,
    body: JSON.stringify(deckData),
  });
}

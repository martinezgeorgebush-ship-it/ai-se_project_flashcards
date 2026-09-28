const fetchedDecks = [];
/**
 * Finds a deck in fetchedDecks by its ID.
 * @param {string} deckId - The ID of the deck to look for.
 * @returns {Object|undefined} The matching deck object, or undefined if no deck has that ID.
 */
function getDeckByID(deckId) {
  return fetchedDecks.find((deck) => deck._id === deckId);
}

export { fetchedDecks, getDeckByID };

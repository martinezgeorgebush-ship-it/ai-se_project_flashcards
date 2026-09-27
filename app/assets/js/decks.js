const fetchedDecks = [];
function getDeckByID(deckId) {
  return fetchedDecks.find((deck) => deck._id === deckId);
}

export {  fetchedDecks , getDeckByID };

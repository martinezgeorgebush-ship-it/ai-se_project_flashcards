const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";

const headers = {
    "Content-Type": "application/json",
    Authorization:"01a0c715-94d2-770d-9eb0-b9c314af27ba"
}

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

  function getDecks(){
    return fetch(`${baseUrl}/decks`,{headers}) .then(processResponse);


  }

  export { getDecks, deleteDeck,addDeck};

  function deleteDeck(deckId) {
    return fetch(`${baseUrl}/decks/${deckId}`,{
      method: "DELETE",
      headers,
    }
      )
      .then(processResponse);
  }

  function addDeck(deckData) {
    return fetch (`${baseUrl}/decks`, {
      method:"POST",
      headers,
      body:JSON.stringify(deckData)
    }
  ).then(processResponse);
}
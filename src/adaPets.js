// Use Node-style imports for dependencies.
const axios = require('axios');
const result = require('./result.js');

const setResult = result.setResult;
const setError = result.setError;

const BASE_URL = 'http://localhost:3000/pets/';

// Option functions.
const listPets = () => {
  // Fill out as part of Wave 1.

  axios.get(BASE_URL)
    .then((response) => {
      setResult(response.data);
    })
    .catch((error) => {
      setError(error.message);
    })
};

const showDetails = (selectedPet) => {
  if (!selectedPet) {
    setError('You tried to show details for a pet without selecting it!');
    return;
  }

  // Fill out as part of Wave 2.
  axios.get(`${ BASE_URL }${ selectedPet }`)
    .then((response) => {
      setResult(response.data);
    })
    .catch((error) => {
      setError(error.message);
    });
};

const removePet = (selectedPet) => {
  if (!selectedPet) {
    setError('You tried to remove a pet without selecting it!');
    return;
  }

  // Fill out as part of Wave 3.
  axios.delete(`${ BASE_URL }${ selectedPet }`)
    .then((response) => {
      setResult(`Pet ${ selectedPet } Deleted with response code ${ response.code }`);
    })
    .catch((error) => {
      setError(`Failed to remove pet ${ selectedPet } with error message ${ error.message }`);
    })
};

const addPet = (petInfo) => {
  // Fill out as part of Wave 4.
  axios.post(BASE_URL, petInfo)
    .then((response) => {
      setResult(response.data);
    })
    .catch((error) => {
      setError(`Failed to add pet ${ petInfo.name } with message ${ error.message }`);
    });
};

// Use Node-style exports to export functions for tests and main.
module.exports = {
  listPets,
  showDetails,
  removePet,
  addPet
};

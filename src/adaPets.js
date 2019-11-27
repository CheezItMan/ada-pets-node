// Use Node-style imports for dependencies.
const axios = require('axios');
const result = require('./result.js');

const setResult = result.setResult;
const setError = result.setError;

const BASE_URL = "https://petdibs.herokuapp.com/pets/";

// Option functions.
const listPets = () => {
  axios.get(BASE_URL)
  .then((response) => {
    // const result = setResult
    // (response.data)
    // return result
    setResult(response.data)
  })
  .catch(() => {
    // const result = setError(`Bad Request`)
    // return result
    setError(`Bad Request`)
  });
}

const showDetails = (selectedPet) => {
  if (!selectedPet) {
    setError("You tried to show details for a pet without selecting it!");
    return;
  }

  axios.get(BASE_URL+selectedPet)
  .then((response) => {
    const result = setResult(response.data)
    return result
  })
  .catch(() => {
    const result = setError(`Failed to show details`)
    return result
  });
}

const removePet = (selectedPet) => {
  if (!selectedPet) {
    setError("You tried to remove a pet without selecting it!");
    return;
  }

  axios.delete(BASE_URL+selectedPet)
  .then((response) => {
    const result = setResult(response.data)
    return result
  })
  .catch(() => {
    const result = setError(`Failed to remove`)
    return result
  });
}

const addPet = (petInfo) => {

  // const petData = {
  //   name: 'george',
  //   age: 2,
  //   vaccinated: true
  // }

  axios.post(BASE_URL, petInfo)
  .then((response) => {
    const result = setResult(response.data)
    return result
  })
  .catch(() => {
    const result = setError(`failed to add pet`)
    return result
  });
  
}

// Use Node-style exports to export functions for tests and main.
module.exports = {
  listPets: listPets,
  showDetails: showDetails,
  removePet: removePet,
  addPet: addPet
}

const axios = require('axios'); // Import axios.
const MockAdapter = require('axios-mock-adapter'); // This is kind of like VCR.

// Import helper functions.
const {expectResult, expectError} = require('./helper.js');

// Import our function(s) for testing.
const adaPets = require('../src/adaPets.js');

const showDetails = adaPets.showDetails;

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

describe('Wave 2', () => {
  // Set up axios test responses.
  describe('showDetails', () => {
    it('Can show details for a pet', done => {
      // Arrange.
      // Set up what we want the API to return for this test.
      mock.onGet('http://localhost:3000/pets/3').reply(200, {
        id: 3,
        name: 'Cerberus',
        species: 'dog',
        age: 10000,
        owner: 'Hades'
      });

      // Assertions come first because they need to be ready before the function call.
      expectResult(result => {
        // Assert.
        expect(result).toBeInstanceOf(Object);

        expect(result.id).toBe(3);
        expect(result.name).toBe('Cerberus');
        expect(result.species).toBe('dog');
        expect(result.age).toBeGreaterThan(9000);
        expect(result.owner).toBe('Hades')

        done();
      });

      // Act.
      showDetails(3);
    });

    it('sets an error string when there is no selected pet', done => {
      expectError(error => {
        // Assert.
        expect(error.constructor).toBe(String);
        expect(error).toMatch('show details');
        expect(error).toMatch('select');

        done();
      });

      // Act.
      showDetails();
    });

    it('sets an error string when the response isn\'t successful', done => {
      // Arrange.
      // We want this to fail.
      mock.onGet('http://localhost:3000/pets/1000000').reply(404);

      expectError(error => {
        // Assert.
        expect(error).toMatch(/failed/i);
        expect(error).toMatch(/404/);

        done();
      });

      // Act.
      showDetails(1000000);
    });
  });
});

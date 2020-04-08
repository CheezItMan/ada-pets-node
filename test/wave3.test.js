const axios = require('axios'); // Import axios.
const MockAdapter = require('axios-mock-adapter'); // This is kind of like VCR.

// Import helper functions.
const {expectResult, expectError} = require('./helper.js');

// Import our function(s) for testing.
const adaPets = require('../src/adaPets.js');

const removePet = adaPets.removePet;

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

const fail = (error) => {
  throw new Error(`Test failed! ${ error }`);
};

describe('Wave 3', () => {
  // Set up axios test responses.
  describe('removePet', () => {
    it('Can remove a pet', done => {
      // Arrange.
      // Set up what we want the API to return for this test.
      mock.onDelete('http://localhost:3000/pets/3').reply(200);

      // Assertions come first because they need to be ready before the function call.
      expectResult(
        () => done() // No assertions.  We just care that it finished.
      );

      // Act.
      removePet(3);
    });

    it('sets an error string when there is no selected pet', done => {
      expectError(error => {
        // Assert.
        expect(error.constructor).toBe(String);
        expect(error).toMatch(/remove/i);
        expect(error).toMatch(/select/i);

        done();
      });

      // Act.
      removePet();
    });

    it('sets an error string when the response isn\'t successful', done => {
      // Arrange.
      // We want this to fail.
      mock.onDelete('http://localhost:3000/pets/1000000').reply(404);

      expectError(error => {
        // Assert.
        expect(error).toMatch(/failed/i);
        expect(error).toMatch(/remove/i);

        done();
      });

      // Act.
      removePet(1000000);
    });
  });
});

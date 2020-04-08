const axios = require('axios'); // Import axios.
const MockAdapter = require('axios-mock-adapter'); // This is kind of like VCR.

// Import helper functions.
const {expectResult, expectError} = require('./helper.js');

// Import our function(s) for testing.
const adaPets = require('../src/adaPets.js');

const listPets = adaPets.listPets;

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

describe('Wave 1', () => {
  // Set up axios test responses.
  describe('listPets', () => {
    it('Can successfully list pets', done => {
      // Arrange.
      // Set up what we want the API to return for this test.
      mock.onGet(/http:\/\/localhost:3000\/pets\/?/).reply(200, [
        {
          id: 1,
          name: 'Aries'
        },
        {
          id: 2,
          name: 'Pisces'
        }
      ]);

      // Assertions come first because they need to be ready before the function call.
      expectResult(result => {
        // Assert.
        expect(result.length).toBe(2);

        expect(result[0].id).toBe(1);
        expect(result[0].name).toBe('Aries');

        expect(result[1].id).toBe(2);
        expect(result[1].name).toBe('Pisces');

        done();
      });

      // Act.
      listPets();
    });

    it('sets an error string when the response isn\'t successful', done => {
      // Arrange.
      // We want this to fail.
      mock.onGet(/http:\/\/localhost:3000\/pets\/?/).reply(500);

      expectError(error => {
        // Assert.
        expect(error.constructor).toBe(String);

        done();
      });

      // Act.
      listPets();
    });
  });
});

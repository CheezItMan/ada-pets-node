const axios = require('axios'); // Import axios.
const MockAdapter = require('axios-mock-adapter'); // This is kind of like VCR.
const result = require('../src/result.js');
 // Import result handling.
const setHandlers = result.setHandlers;

// Import our function(s) for testing.
const adaPets = require('../src/adaPets.js');

const listPets = adaPets.listPets;

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

const fail = (error) => {
  throw new Error(`Test failed! ${error}`);
};

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
      setHandlers(
        result => {
          setTimeout(() => { // We need this to consistently display assertion errors.
            // Assert.
            expect(result.length).toBe(2);

            expect(result[0].id).toBe(1);
            expect(result[0].name).toBe('Aries');

            expect(result[1].id).toBe(2);
            expect(result[1].name).toBe('Pisces');

            done();
          });
        },
        fail
);

      // Act.
      listPets();
    });

    it("sets an error string when the response isn't successful", done => {
      // Arrange.
      // We want this to fail.
      mock.onGet(/https:\/\/localhost:3000\/pets\/?/).reply(500);

      setHandlers(
        fail, // Fail if we don't setError.
        error => {
          setTimeout(() => { // We need this to consistently display assertion errors.
            // Assert.
            expect(error.constructor).toBe(String);

            done();
          });
        }
      );

      // Act.
      listPets();
    });
  });
});

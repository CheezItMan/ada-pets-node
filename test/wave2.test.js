const axios = require('axios'); // Import axios.
const MockAdapter = require('axios-mock-adapter'); // This is kind of like VCR.
const result = require('../src/result.js');
 // Import result handling.
const setHandlers = result.setHandlers;

// b Import our function(s) for testing.
const adaPets = require('../src/adaPets.js');

const showDetails = adaPets.showDetails;

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

const fail = (error) => {
  throw new Error(`Test failed! ${error}`);
};

describe('Wave 2', () => {
  // Set up axios test responses.
  describe('showDetails', () => {
    it('Can show details for a pet', done => {
      // Arrange.
      // Set up what we want the API to return for this test.
      mock.onGet('http://localhost:3000/pets/3').reply(200, {
        id: 3,
        name: 'Cerberus',
        breed: 'dog',
        image: null,
        about: 'Three headed dog that guards the entrance to the underworld',
        age: 13700000000,
        owner: 'Hades'
      });

      // Assertions come first because they need to be ready before the function call.
      setHandlers(
        result => {
          setTimeout(() => { // We need this to consistently display assertion errors.
            // Assert.
            expect(result).toBeInstanceOf(Object);

            expect(result.id).toBe(3);
            expect(result.name).toBe('Cerberus');
            expect(result.breed).toBe('dog');
            expect(result.image).toBeNull();
            expect(result.about).toMatch('dog');
            expect(result.age).toBeGreaterThan(9000);
            expect(result.owner).toBe('Hades');

            done();
          });
        },
        fail
);

      // Act.
      showDetails(3);
    });

    it('sets an error string when there is no selected pet', done => {
      setHandlers(
        fail, // Fail if we don't setError.
        error => {
          setTimeout(() => { // We need this to consistently display assertion errors.
            // Assert.
            expect(error.constructor).toBe(String);
            expect(error).toMatch('show details');
            expect(error).toMatch('select');

            done();
          });
        }
      );

      // Act.
      showDetails();
    });

    it("sets an error string when the response isn't successful", done => {
      // Arrange.
      // We want this to fail.
      mock.onGet('https://localhost:3000/pets/1000000').reply(404);

      setHandlers(
        fail, // Fail if we don't setError.
        error => {
          setTimeout(() => { // We need this to consistently display assertion errors.
            // Assert.
            expect(error).toMatch(/failed/i);
            expect(error).toMatch(/details/i);

            done();
          });
        }
      );

      // Act.
      showDetails(1000000);
    });
  });
});

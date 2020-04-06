const axios = require('axios');                    // Import axios.
const MockAdapter = require('axios-mock-adapter'); // This is kind of like VCR.

// Import helper functions.
const {expectResult, expectError} = require('./helper.js');

// Import our function(s) for testing.
const adaPets = require('../src/adaPets.js');
const addPet = adaPets.addPet;

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

const fail = (error) => {
  throw new Error(`Test failed! ${error}`);
}

describe("Wave 4", () => {
  // Set up axios test responses.
  describe("addPet", () => {
    it("Can add a pet", done => {
      const reqData = {
        name: "Artemis",
        breed: "goddess",
        about: "Goddess of the hunt."
      }

      // Arrange.
      // Set up what we want the API to return for this test.
      mock.onPost(new RegExp("https://petdibs.herokuapp.com/pets/?"), reqData).reply(
        200,
        {
          id: 918,
          name: "Artemis",
          breed: "goddess",
          about: "Goddess of the hunt."
        }
      );

      // Assertions come first because they need to be ready before the function call.
      expectResult(result => {
        expect(result.id).not.toBeNull();
        expect(result.name).toBe("Artemis");
        expect(result.breed).toBe("goddess");
        expect(result.about).toMatch("hunt");

        done();
      });

      // Act.
      addPet(reqData);
    });

    it("sets an error string when the response isn't successful", done => {
      // Arrange.
      // We want this to fail.
      mock.onPost(new RegExp("https://petdibs.herokuapp.com/pets/?"), {name: "Zeus"}).reply(500);

      expectError(error => {
        // Assert.
        expect(error).toMatch(/failed/i);
        expect(error).toMatch(/add/i);

        done();
      });

      // Act.
      addPet({name: "Zeus"});
    });
  });
});

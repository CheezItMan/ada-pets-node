const axios = require('axios');                    // Import axios.
const MockAdapter = require('axios-mock-adapter'); // This is kind of like VCR.
const result = require('../src/result.js');        // Import result handling.
const setHandlers = result.setHandlers;

//b Import our function(s) for testing.
const adaPets = require('../src/adaPets.js');
const removePet = adaPets.removePet;

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

const fail = (error) => {
  throw new Error(`Test failed! ${error}`);
}

describe("Wave 3", () => {
  // Set up axios test responses.
  describe("removePet", () => {
    it("Can remove a pet", done => {
      // Arrange.
      // Set up what we want the API to return for this test.
      mock.onDelete("https://petdibs.herokuapp.com/pets/3").reply(204);

      // Assertions come first because they need to be ready before the function call.
      setHandlers(
        () => done(), // No assertions.  We just care that it finished.
        fail);

      // Act.
      removePet(3);
    });

    it("sets an error string when there is no selected pet", done => {
      setHandlers(
        // Fail if we don't setError.
        () => { throw new Error("Did not call setError!") },
        error => {
          setTimeout(() => {    // We need this to consistently display assertion errors.
            // Assert.
            expect(error.constructor).toBe(String);
            expect(error).toMatch("remove");
            expect(error).toMatch("select");

            done();
          })}
      );

      // Act.
      removePet();
    })

    it("sets an error string when the response isn't successful", done => {
      // Arrange.
      // We want this to fail.
      mock.onDelete("https://petdibs.herokuapp.com/pets/1000000").reply(404);

      setHandlers(
        // Fail if we don't setError.
        () => { throw new Error("Did not call setError!") },
        error => {
          setTimeout(() => {    // We need this to consistently display assertion errors.
            // Assert.
            expect(error).toMatch(/failed/i);
            expect(error).toMatch(/remove/i);

            done();
          })}
      );

      // Act.
      removePet(1000000);
    });
  });
});

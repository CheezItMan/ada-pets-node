module.exports = (() => {
  const {setHandlers} = require('../src/result.js'); // Import result handling.

  const resultFail = (error) => {
    throw new Error(`Test failed! ${error}`);
  }

  const errorFail = () => {
    throw new Error("Did not call setError!")
  }

  const expectResult = (body) => {
    setHandlers(
      result => {
        // We need to setTimeout to consistently display assertion errors.
        setTimeout(() => body(result))
      },
      resultFail);
  }

  const expectError = (body) => {
    setHandlers(
      errorFail,
      error => {
        // We need to setTimeout to consistently display assertion errors.
        setTimeout(() => body(error))
      }
    );
  }

  return {
    expectResult: expectResult,
    expectError: expectError
  }
})();

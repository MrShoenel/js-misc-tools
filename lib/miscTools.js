/**
 * @param {number} milliSeconds
 * @returns {Promise.<void>}
 */
const timeout = milliSeconds => new Promise((res, rej) => {
  setTimeout(res, milliSeconds);
});


/**
 * Function to wrap an async function so that it can be attempted multiple
 * times with an optional timeout in between.
 * 
 * @template T
 * @param {() => Promise.<T>} fn
 * @param {number} [maxNumTries] Optional. Defaults to 3.
 * @param {number} [timeoutMsecs] Optional. Defaults to -1. Give a positive
 * number to wait between attempts.
 * @returns {T}
 */
const attempt = async(fn, maxNumTries = 3, timeoutMsecs = -1) => {
  let tries = 0;

  while (tries < maxNumTries) {
    try {
      return await fn();
    } catch (e) {
      if (timeoutMsecs > 0) {
        await timeout(timeoutMsecs);
      }
    }
  }
  
  throw new Error(`Maximum amount of attempts reached.`);
};


module.exports = Object.freeze({
  timeout,
  attempt
});

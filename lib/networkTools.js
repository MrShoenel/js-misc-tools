const { Socket } = require('net');


/**
 * @param {string} host 
 * @param {number} port 
 * @param {number} [timeout]
 * @param {4|6} [family]
 * @returns {Promise.<void>}
 */
const pingPort = (host, port, timeout = 500, family = 4) => new Promise((resolve, reject) => {
  const socket = new Socket();

  const teardown = () => {
    socket.setTimeout(0);
    socket.removeAllListeners();
    socket.destroy();
  };

  socket.setTimeout(timeout, () => {
    teardown();
    reject('timeout');
  });

  socket.connect({
    port,
    host,
    family
  }, () => {
    teardown();
    resolve();
  });
});

/**
 * @param {string} host 
 * @param {number} port 
 * @param {number} [timeout]
 * @param {4|6} [family]
 * @returns {Promise.<boolean>}
 */
const tryPingPort = async(host, port, timeout = 500, family = 4) => {
  try {
    await pingPort(host, port, timeout, family);
    return true;
  } catch (_) {
    return false;
  }
};


module.exports = Object.freeze({
  pingPort,
  tryPingPort
});
const FTP = require('ftp')
, fs = require('fs')
, path = require('path');


/**
 * @param {FTP.Options} opts 
 * @returns {Promise.<FTP>}
 */
const connectFtp = opts => new Promise((resolve, reject) => {
  const client = new FTP();
  
  client.on('ready', () => {
    client.off('error', reject);
    resolve(client);
  }).on('error', err => {
    client.removeAllListeners('ready');
    reject(err);
  });

  client.connect(opts);
});


/**
 * @param {FTP} client
 * @param {string} directory
 * @param {boolean} [recursive] Optional. Defaults to true.
 * @returns {Promise.<FTP>}
 */
const mkdirFtp = (client, directory, recursive = true) => new Promise((resolve, reject) => {
  try {
    client.mkdir(directory, recursive, err => {
      if (err) {
        reject(err);
      } else {
        resolve(client);
      }
    });
  } catch (e) {
    reject(e);
  }
});

/**
 * @param {FTP} client
 * @param {string} localFile a path
 * @param {string} remoteFile an absolute remote path
 * @param {boolean} [mkdirP] Optional. Defaults to true. If true, will recursively create the directory for the target file.
 * @returns {Promise.<FTP>}
 */
const uploadFtpFile = (client, localFile, remoteFile, mkdirP = true) => new Promise(async(resolve, reject) => {
  try {
    if (mkdirP) {
      const folder = path.dirname(remoteFile);
      await mkdirFtp(client, folder, true);
    }

    const is = fs.createReadStream(path.resolve(localFile));
    client.put(is, remoteFile, err => {
      if (err) {
        reject(err);
      } else {
        resolve(client);
      }
    });
  } catch (e) {
    reject(e);
  }
});

/**
 * Shortcut function to open an FTP connection, push a file, conditionally
 * create the remote directory recursively before and finally to destroy
 * the connection.
 * 
 * @param {FTP.Options} opts 
 * @param {string} localFile a path
 * @param {string} remoteFile an absolute remote path
 * @param {boolean} [mkdirP] Optional. Defaults to true. If true, will recursively create the directory for the target file.
 * @returns {Promise.<void>}
 */
const connectFtpUploadClose = async(opts, localFile, remoteFile, mkdirP = true) => {
  const client = await connectFtp(opts);
  await uploadFtpFile(client, localFile, remoteFile, mkdirP);
  client.destroy();
};


module.exports = Object.freeze({
  mkdirFtp,
  connectFtp,
  uploadFtpFile,
  connectFtpUploadClose
});
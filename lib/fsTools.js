const fs = require('fs')
, fsX = require('fs-extra');


/**
 * Checks if a directory is readable and if so, returns the files and
 * directories in it (not recursively).
 * 
 * @param {string} dir
 * @returns {Promise.<Array.<string>>}
 */
const probeDir = async(dir) => new Promise((resolve, reject) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      reject(err);
    } else {
      resolve(files);
    }
  });
});

/**
 * Moves a file by copying it to the destination and then deleting the
 * original on success.
 * 
 * @param {string} src 
 * @param {string} dst 
 * @returns {Promise.<void>}
 */
const moveFileByCopy = (src, dst) => new Promise((resolve, reject) => {
  try {
    fsX.copyFile(src, dst, err => {
      if (err) {
        reject(err);
      } else {
        try {
          fs.unlinkSync(src);
        } catch (_) { }
        resolve();
      }
    });
  } catch (err) {
    reject(err);
  }
});

/**
 * Renames a file async.
 * 
 * @param {string} src 
 * @param {string} dst 
 * @returns {Promise.<void>}
 */
const renameFile = (src, dst) => new Promise((resolve, reject) => {
  fs.rename(src, dst, err => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});


/**
 * Deletes a file async.
 * 
 * @param {string} src
 * @returns {Promise.<void>}
 */
const unlinkFile = src => fsX.unlink(src);


module.exports = Object.freeze({
  probeDir,
  moveFileByCopy,
  renameFile,
  unlinkFile
});

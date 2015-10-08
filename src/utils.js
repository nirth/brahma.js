import fs from 'fs';
import os from 'os';
import {Sancus} from 'sancus';

/**
 * Returns os specific caret return for os.
 * @function
 * @param {String} osType - String, os type.
 * @returns {String} Returns caret return type specific for os.
 */
export const newLine = (osType) => {
  switch (osType.toLowerCase()) {
    case 'linux':
    case 'darwin':
      return '\n';
    case 'windows_nt':
      return '\r\n';
  }
};

/**
 * Utility takes string and turns it into a line, by appending caret reset.
 * @function
 * @param {String} value - String to be turned into a line.
 * @returns {String} Original value with caret return appended to it.
 */
export const line = (value) => `${value}${newLine(os.type())}`;

/**
 * Utility checkes if item is expired.
 * @function
 * @param {Number} createdAt - Epoch date when item was created.
 * @param {Number} duration - Duration of item.
 * @returns {Boolean} Returns true if item expired, i.e. exists longer than
 * specified duration.
 */
export const expired = (createdAt, duration) => {
  return (Date.now() - createdAt) > duration;
};

/**
 * Writes line of text to stream.
 * @function
 * @param {WriteStream} stream - Write file stream.
 * @param {String} value - String value to be written into file as a line.
 */
export const writeLine = (stream, value) => stream.write(line(value));

/**
 * Allows access to a directory, will create one if needed.
 * @function
 * @param {String} directoryName - Path to directory.
 * @returns {Promise} Promise that will be resolved once directory is created.
 */
const directory = (directoryName) => {
  const s = new Sancus();
  fs.mkdir(directoryName, (error, result) => {
    if (error === null || error === undefined || error.code === 'EEXIST') {
      s.resolve();
    } else {
      s.reject(error);
    }
  });
  return s.promise;
};

/**
 * Opens a file stream in specified directory, creates directory if needed.
 * @function
 * @param {String} directoryName - Path to directory where csv files should go.
 * @returns {Promise} Returns promise that will be resolved into {WriteStream}.
 */
export const openStream = (directoryName) => {
  const today = (new Date()).toISOString().split(':').join('');
  const fileName = `${directoryName}/${today}.csv`;
  const s = new Sancus();

  directory(directoryName)
    .then(() => {
      const stream = fs.createWriteStream(fileName);
      stream.once('open', (fileDescriptor) => {
        writeLine(stream,
          'Datetime,Epoch,Session,Category,Subcategory,Action,Item,Tags,Notes');
        s.resolve(stream);
      });
    })
    .catch((error) => {
      console.error(
        `Brahma:openStream unable to get directory ${directoryName}. ${error}`);
    });

  return s.promise;
};

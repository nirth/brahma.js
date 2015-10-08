import fs from 'fs';
import {Sancus} from 'sancus';
import {
  expired,
  openStream,
  writeLine
} from './utils';

export default class Brahma {
  constructor(directoryName = 'metrics', duration = 600000) {
    this._directoryName = directoryName;
    this._duration = duration;
    this._stream = null;
    this._streamOpenedAt = 0;
  }

  get currentStream() {
    const s = new Sancus();
    if (expired(this._streamOpenedAt, this._duration) ||
        this._stream === null) {
      if (this._stream !== null) {
        this._stream.end();
        this._stream = null;
      }

      openStream(this._directoryName)
        .then((stream) => {
          this._streamOpenedAt = Date.now();
          this._stream = stream;
          s.resolve(stream);
        })
        .catch((error) => {
          console.error(`Brahma.currentStream:failed to open stream ${error}`);
          s.reject(error);
        });
    } else {
      s.resolve(this._stream);
    }
    return s.promise;
  }

  write(location, section, category, action, item, tags, notes) {
    const line = [
      ((new Date()).toISOString()),
      (Date.now()),
      location,
      section,
      category,
      action,
      item,
      tags,
      notes.split(',').join('|')
    ].join(',');

    this.currentStream
      .then((stream) => writeLine(stream, line))
      .catch((error) => console.error(`Brahma.write:error ${error}`));
  }

  toString() {
    return '[Brahma]';
  }
}

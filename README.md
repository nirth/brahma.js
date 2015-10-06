Brahma. Minimal and extremely opinionated offline logging and metrics solution.
===
[![Build Status](https://travis-ci.org/nirth/brahma.js.svg?branch=master)](https://travis-ci.org/nirth/brahma.js)
[![Circle CI](https://circleci.com/gh/nirth/brahma.js.svg?style=svg)](https://circleci.com/gh/nirth/brahma.js)

### Summary
While most of the projects we work on are online and can use Internet sometimes
we encounter interesting offline projects for various expos, games etc. While
offline these apps still need logging, metrics or analytics and this library
aims to solve it.

Library designed to be non-configurable, drop-in solution, it suited my clients
in the past, so I decided to share it. If you need configurable offline logging
there are other solutions.

### How it works

Brahma will create directory if it doesn't exist already and will fill it up
with `csv` files as it goes, it will write them to a new line, but will lazily
create new `csv` file every hour (only if it needs to write something).
To avoid keeping file stream opened for a long time. CSV format is fixed to
following columns:

 * Date-time in ISO-8601, for entities who can't read EPOCH.
 * EPOCH so we have useful date-time format.
 * Category: Enough said.
 * Action: Enough said.
 * Tags: If category and action is not to describe.
 * Notes: Run out of tags?

### Usage

```javascript
// Import http, socket, logging etc.
import http from 'http';
import express from 'express';
import socketIo from 'socket.io';
import {metrics} from 'brahma';

// Initialise socket
const app = express();
const server = http.Server(app);
server.listen(7777);
const io = socketIo(server);
const metricsSocket = io.of('/metrics');

// Create meter function, that will do actual logging.
// Meter function will create new directory "metricsDirectory" and
// it will create new metrics file every ten minutes.
const meter = metrics('metricsDirectory');

metricsSocket.on('connection', (socket) => {
  // Every time socket receives event "meter"
  // it will log category, action and tags.
  socket('meter', ({category, action, tags}) => meter(category, action, tags));
});
```

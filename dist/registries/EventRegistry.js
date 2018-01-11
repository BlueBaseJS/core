'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eventemitter = require('eventemitter3');

exports.default = _eventemitter.EventEmitter; /**
                                               * All system filters are stored in this registry.
                                               * It is using [event emitter](https://github.com/primus/eventemitter3) to emit and add events.
                                               *
                                               */
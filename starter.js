'use strict';
var ds18b20 = require('ds18b20');
var config = require('./config');

var senseAndPost = require('./index');

function logger() {
  console.log.apply(console, arguments);
}

function repeater() {
  senseAndPost(ds18b20, config, function(err, res, body) {
    if (err) {
      logger('Had an error', err);
      return;
    }
    logger('Node is posted at %s/node/%s', config.baseUrl, body.nid);
    logger('Current temperature: %s', body.value);
    // Start over again in the defined interval.
    setTimeout(repeater.bind(null), config.interval * 1000 * 60);
  });
}

repeater();

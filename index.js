'use strict';
var request = require('request');

function sense(ds18b20, config, callback) {
  var sensor = config.sensor;
  ds18b20.temperature(sensor, function(err, value) {
    if (err) {
      callback(err);
      return;
    }
    // Send the data to the server.
    request.post(config.url, {
      headers: {
        'x-user-temp': config.apiKey
      },
      body: {
        temp: value
      },
      json: true
    }, function(requestError, res, body) {
      // For convenience, add the value into the body.
      body = body || {};
      body.value = value;
      callback(requestError, res, body);
    });
  });
}
module.exports = sense;

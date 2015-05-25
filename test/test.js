var http = require('http');

var should = require('should');

var sense = require('../index');
var config = {
  url: 'http://localhost:7777',
  apiKey: 'abc',
  sensor: Math.random() * 888
}

var temperature = Math.random() * 100;

var calledWithSensor;
var mockTemp = {
  temperature: function(sensor, callback) {
    calledWithSensor = sensor;
    callback(null, temperature);
  }
}

var nid = Math.random() * 10;

describe('Module functionality', function() {
  it('Should do as expected with the expected value', function(done) {
    // Start a mock server to return what Drupal would.
    var s = http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({nid: nid}));
    }).listen(7777, '127.0.0.1');
    sense(mockTemp, config, function(err, res, bod) {
      // Check that we have sent the expected value, used the expected
      // sensor and created the expected nid.
      calledWithSensor.should.equal(config.sensor);
      bod.nid.should.equal(nid);
      bod.value.should.equal(temperature);
      // Close the server.
      s.close();
      done(err);
    });
  });
  it('Should send back the value even if the server is a bad one', function(done) {
    // Reset sensor check.
    calledWithSensor = null;
    // Mock server that does not answer what Drupal should.
    var s = http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end();
    }).listen(7777, '127.0.0.1');
    sense(mockTemp, config, function(err, res, bod) {
      // Check that we have used the expected sensor and that we got the
      // expected values back from the callback.
      calledWithSensor.should.equal(config.sensor);
      should(bod.nid).equal(undefined);
      bod.value.should.equal(temperature);
      // Close mock server.
      s.close();
      done(err);
    });
  });
  it('Should do as expected on temperature error', function(done) {
    var errorMessage = 'Mock error';
    // Force the mock sensor to call callback with an error.
    mockTemp.temperature = function(sensor, callback) {
      callback(new Error(errorMessage));
    };
    sense(mockTemp, config, function(err) {
      err.should.not.equal(undefined);
      err.message.should.equal(errorMessage);
      done();
    });
  });
});

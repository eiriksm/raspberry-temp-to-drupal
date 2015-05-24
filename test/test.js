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
    var s = http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({nid: nid}));
    }).listen(7777, '127.0.0.1');
    sense(mockTemp, config, function(err, res, bod) {
      calledWithSensor.should.equal(config.sensor);
      bod.nid.should.equal(nid);
      bod.value.should.equal(temperature);
      s.close();
      done(err);
    });
  });
  it('Should send back the value even if the server is a bad one', function(done) {
    var s = http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end();
    }).listen(7777, '127.0.0.1');
    sense(mockTemp, config, function(err, res, bod) {
      calledWithSensor.should.equal(config.sensor);
      should(bod.nid).equal(undefined);
      bod.value.should.equal(temperature);
      s.close();
      done(err);
    });
  });
  it('Should do as expected on temperature error', function(done) {
    mockTemp.temperature = function(sensor, callback) {
      callback(new Error('Mock error'));
    };
    sense(mockTemp, config, function(err) {
      err.should.not.equal(undefined);
      done();
    });
  });
});

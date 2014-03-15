'use strict';
var request = require('supertest'),
expect = require('chai').expect,
helper = require('../helper.js'),
seed = require('../seedData'),
seedData = seed.data,
_ = require('lodash'),
app = require('../../../server');

var variablesEndpoint = '/api/research/variables/';

function getMapEndpoint(variableName) {
  return '/api/research/variables/' + variableName + '/map';
}

describe('Research controller', function () {
  describe('getVariables', function () {
    it('should be able to bring all the variables', function (done) {
      request(app).get(variablesEndpoint).expect(200)
      .end(helper.isBodyEqual(seedData.goesVariables, done));
    });
  });

  describe.skip('getDataForVariable', function() {
    it('should bring the latest data');
    it('should bring the latest data for a given latitude and longitude');
    it('should bring the data for a specified time range');
    it('should bring the data for a specified time range and location');
    it('should be able to bring the data in csv format');
  });

  describe('getMapForVariable', function() {

    it('should respond with 404 when the given variable is not supported', function(done) {
      request(app).get(getMapEndpoint('not a variable'))
      .expect('Content-Type', /json/)
      .expect(404, done);
    });

    describe('with no time range specified', function() {
      it('should bring the latest map data when a time range is not given', function(done) {
        var goesMaps = seedData.goesMaps;

        request(app).get(getMapEndpoint('rainfall'))
        .expect(200)
        .expect('Content-Type', /json/)
        .end(helper.isGoesBodyEqual(_.last(goesMaps), done));
      });
    });

    describe('with a time range specified', function () {
      it('should bring the maps for a specified time range');
    });
  });
});

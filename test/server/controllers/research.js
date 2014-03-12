'use strict';
var request = require('supertest'),
expect = require('chai').expect,
helper = require('../helper.js'),
seed = require('../seedData'),
seedData = seed.data,
app = require('../../../server');

var endpoint = '/api/research/variables/';

describe('Research controller', function () {
  describe('getVariables', function () {
    it('should be able to bring all the variables', function (done) {
      request(app).get(endpoint).expect(200)
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

  describe.skip('getMapForVariable', function() {
    it('should bring the latest map data');
    it('should bring the latest map data for a given latitude and longitude');
    it('should bring the map data for a specified time range');
    it('should bring the map data for a specified time range and location');
  });
});


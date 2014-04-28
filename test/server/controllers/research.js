'use strict';
var request = require('supertest'),
helper = require('../helper.js'),
seed = require('../seedData'),
seedData = seed.data,
_ = require('lodash'),
app = require('../../../server');

var variablesEndpoint = '/api/research/variables/';

function getMapEndpoint(variableName) {
  return '/api/research/variables/' + variableName + '/map';
}

function getDataEndpoint(variableName) {
  return '/api/research/variables/' + variableName + '/data';
}

describe('Research controller', function () {
  describe('getVariables', function () {
    it('should be able to bring all the variables', function (done) {
      request(app).get(variablesEndpoint).expect(200)
      .end(helper.isBodyEqual(seedData.goesVariables, done));
    });
  });

  describe('getDataForVariable', function() {
    // var options = seedData.goesDataOptions;
    // var goesData = seedData.goesData;

    describe('with no optional query parameters passed', function () {
      // it('should bring the latest data for the whole map', function(done) {
      //   request(app).get(getDataEndpoint('rainfall'))
      //   .expect('Content-Type', /json/)
      //   .expect(200)
      //   .end(helper.isGoesDataBodyEqual(seedData.goesData.slice(options.rowsPerDay * (options.days - 1)), done));
      // });

      it('should respond with a 404 for a not supported variable', function(done) {
        request(app).get(getDataEndpoint('notAvariable'))
        .expect('Content-Type', /json/)
        .expect(404, done);
      });
    });

    describe('with a time range specified', function () {
      it('should bring the data for a specified time range');
    });

    describe('with coordinates specified', function () {
      it('should bring the latest data for a given latitude and longitude');
    });

    describe('with both a timerange and coordinates specified', function () {
      it('should bring the data for a specified time range and location');
    });
    it('should be able to bring the data in csv format');
  });

  // describe('getMapForVariable', function() {

  //   it('should respond with 404 when the given variable is not supported', function(done) {
  //     request(app).get(getMapEndpoint('not a variable'))
  //     .expect('Content-Type', /json/)
  //     .expect(404, done);
  //   });

  //   describe('with no time range specified', function() {
  //     it('should bring the latest map data when a time range is not given', function(done) {
  //       var goesMaps = seedData.goesMaps;

  //       request(app).get(getMapEndpoint('rainfall'))
  //       .expect(200)
  //       .expect('Content-Type', /json/)
  //       .end(helper.isGoesBodyEqual([_.last(goesMaps)], done));
  //     });
  //   });

  //   describe('with just the startDate specified', function () {
  //     it('should bring the maps from the given start date until today', function(done) {
  //       request(app).get(getMapEndpoint('rainfall') + '?startDate=2014-01-01')
  //       .expect('Content-Type', /json/)
  //       .expect(200)
  //       .end(helper.isGoesBodyEqual(seedData.goesMaps, done));
  //     });

  //     it('should return an empty array for data in the future', function (done) {
  //       request(app).get(getMapEndpoint('rainfall') + '?startDate=2050-01-01')
  //       .expect('Content-Type', /json/)
  //       .expect(200, [], done);
  //     });

  //     it('should bring half the maps when the date is "2014-01-15"', function(done) {
  //       request(app).get(getMapEndpoint('rainfall') + '?startDate=2014-01-15')
  //       .expect('Content-Type', /json/)
  //       .expect(200)
  //       .end(helper.isGoesBodyEqual(seedData.goesMaps.slice(14), done));
  //     });

  //     it('should only bring the last one, since its the last date', function (done) {
  //       request(app).get(getMapEndpoint('rainfall') + '?startDate=2014-01-31')
  //       .expect('Content-Type', /json/)
  //       .expect(200)
  //       .end(helper.isGoesBodyEqual([_.last(seedData.goesMaps)], done));
  //     });

  //     describe('invalidly', function () {
  //       it('passing 13 as the month should return a 400', function (done) {
  //         request(app).get(getMapEndpoint('rainfall') + '?startDate=2014-13-15')
  //         .expect('Content-Type', /json/)
  //         .expect(400, done);
  //       });

  //       it('passing a name should still return a 400', function (done) {
  //         request(app).get(getMapEndpoint('rainfall') + '?startDate=ImNotvalid')
  //         .expect('Content-Type', /json/)
  //         .expect(400, done);
  //       });
  //     });
  //   });

  //   describe('with both startDate and endDate specified', function () {
  //     describe('with just the startDate being invalid', function() {
  //       it('passing 13 as the month should return a 400', function (done) {
  //         request(app).get(getMapEndpoint('rainfall') + '?startDate=2014-13-15&endDate=2014-05-01')
  //         .expect('Content-Type', /json/)
  //         .expect(400, done);
  //       });

  //       it('passing a name should still return a 400', function (done) {
  //         request(app).get(getMapEndpoint('rainfall') + '?startDate=ImNotvalid&endDate=2014-05-01')
  //         .expect('Content-Type', /json/)
  //         .expect(400, done);
  //       });
  //     });

  //     describe('with just the endDate being invalid', function() {
  //       it('passing 13 as the month should return a 400', function (done) {
  //         request(app).get(getMapEndpoint('rainfall') + '?startDate=2014-01-15&endDate=2014-13-01')
  //         .expect('Content-Type', /json/)
  //         .expect(400, done);
  //       });

  //       it('passing a name should still return a 400', function (done) {
  //         request(app).get(getMapEndpoint('rainfall') + '?startDate=2014-01-15&endDate=ImNotvalid')
  //         .expect('Content-Type', /json/)
  //         .expect(400, done);
  //       });
  //     });

  //     describe('with both dates being valid', function() {
  //       it('should bring the first half of the maps', function (done) {
  //         request(app).get(getMapEndpoint('rainfall') + '?startDate=2014-01-01&endDate=2014-01-15')
  //         .expect('Content-Type', /json/)
  //         .expect(200)
  //         .end(helper.isGoesBodyEqual(seedData.goesMaps.slice(0, 15), done));
  //       });

  //       it('should bring the second half of the maps', function (done) {
  //         request(app).get(getMapEndpoint('rainfall') + '?startDate=2014-01-15&endDate=2014-01-31')
  //         .expect('Content-Type', /json/)
  //         .expect(200)
  //         .end(helper.isGoesBodyEqual(seedData.goesMaps.slice(14), done));
  //       });

  //       it('should return an empty array when the time bounds are inverted', function(done) {
  //         request(app).get(getMapEndpoint('rainfall') + '?startDate=2014-04-15&endDate=2014-01-31')
  //         .expect('Content-Type', /json/)
  //         .expect(200, [], done);
  //       });

  //       it('should return an empty array when there is no data in the time range', function(done) {
  //         request(app).get(getMapEndpoint('rainfall') + '?startDate=2014-02-15&endDate=2014-03-31')
  //         .expect('Content-Type', /json/)
  //         .expect(200, [], done);
  //       });
  //     });
  //   });
  // });
});

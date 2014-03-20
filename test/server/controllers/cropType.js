'use strict';

var request = require('supertest'),
helper = require('../helper.js'),
seedData = require('../seedData').data,
app = require('../../../server');

describe('CropType controller', function() {
  it('should bring all the crop types stored', function(done) {
    request(app).get('/api/cropTypes')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(helper.isEqualWithoutIdAndTimestamps(seedData.cropTypes, done));
  });

  describe('get a specific crop type', function() {
    it('should bring a cropType with id 5', function(done) {
      request(app).get('/api/cropTypes/5')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(helper.isEqualWithoutIdAndTimestamps(seedData.cropTypes[4], done));
    });

    it('should return a 404', function(done) {
      request(app).get('/api/cropTypes/100000')
      .expect('Content-Type', /json/)
      .expect(404, done);
    });

    describe('crop data', function() {
      it('should get all the crop data', function(done) {
        request(app).get('/api/cropTypes/1/cropData')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(helper.isEqualWithoutIdAndTimestamps([seedData.defaultCropData[0]], done));
      });

      it('should respond with a 404 for a crop data not in the db', function(done) {
        request(app).get('/api/cropTypes/1000000/cropData')
        .expect('Content-Type', /json/)
        .expect(404, done);
      });

      describe('by id', function() {
        it('should return a crop data with id 1', function(done) {
          request(app).get('/api/cropTypes/1/cropData/1')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(helper.isEqualWithoutIdAndTimestamps(seedData.defaultCropData[0], done));
        });

        it('should return 404 for an id not in the db', function(done) {
          request(app).get('/api/cropTypes/1/cropData/3')
          .expect('Content-Type', /json/)
          .expect(404, done);
        });
      });
    });
  });
});

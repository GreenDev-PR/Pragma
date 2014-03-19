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
});

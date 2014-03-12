'use strict';
var request = require('supertest'),
expect = require('chai').expect,
helper = require('../helper.js'),
seed = require('../seedData'),
seedData = seed.data,
app = require('../../../server');

describe('Research controller', function () {
  describe('getVariables', function () {
    it('should be able to bring all the variables', function (done) {
      request(app).get('/api/research').expect(200)
      .end(helper.isBodyEqual(seedData.goesVariables, done));
    });
  });
});


'use strict';

var errors = require('errors');

errors.create({
  name: 'ValidationError',
  defaultMessage: 'Validation error',
  defaultExplanation: 'Some properties are not valid',
  defaultResponse: 'Resend the object with valid properties',
  code: 400,
  parent: errors.Http400Error
});

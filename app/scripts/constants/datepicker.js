'use strict';

angular.module('pragmaApp').constant('DATE_PICKER', {
  showWeeks: false,
  dateOptions: {
    'year-format': '\'yy\'',
    'starting-day': 1,
    'datepicker-append-to-body': true,
    'show-button-bar': false
  },
  minDate: '2009-01-01',
  format: 'MM/dd/yyyy'
});

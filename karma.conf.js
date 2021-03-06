// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html
// TODO mock google dep
module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'https://maps.googleapis.com/maps/api/js?sensor=false&libraries=weather,visualization',
      'app/bower_components/jquery/dist/jquery.js',
      'app/bower_components/underscore/underscore.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/restangular/dist/restangular.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/angular-google-maps/dist/angular-google-maps.js',
      'app/bower_components/angularjs-geolocation/src/geolocation.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/bower_components/highcharts-ng/dist/highcharts-ng.js',
      'app/bower_components/angular-ui-utils/jq.js',
      'app/bower_components/ngstorage/ngStorage.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-loading-bar/src/loading-bar.js',
      'app/scripts/*.js',
      'app/scripts/**/*.js',
      // 'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    captureTimeout: 10000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};

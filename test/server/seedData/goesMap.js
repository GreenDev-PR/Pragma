'use strict';

var moment = require('moment');
var mapDates = function(map) {
  map.dataDate = moment(map.dataDate).toString();
};

var rainfallMaps =[
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140101.jpg', 'dataDate': '2014-01-01'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140102.jpg', 'dataDate': '2014-01-02'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140103.jpg', 'dataDate': '2014-01-03'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140104.jpg', 'dataDate': '2014-01-04'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140105.jpg', 'dataDate': '2014-01-05'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140106.jpg', 'dataDate': '2014-01-06'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140107.jpg', 'dataDate': '2014-01-07'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140108.jpg', 'dataDate': '2014-01-08'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140109.jpg', 'dataDate': '2014-01-09'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140110.jpg', 'dataDate': '2014-01-10'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140111.jpg', 'dataDate': '2014-01-11'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140112.jpg', 'dataDate': '2014-01-12'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140113.jpg', 'dataDate': '2014-01-13'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140114.jpg', 'dataDate': '2014-01-14'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140115.jpg', 'dataDate': '2014-01-15'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140116.jpg', 'dataDate': '2014-01-16'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140117.jpg', 'dataDate': '2014-01-17'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140118.jpg', 'dataDate': '2014-01-18'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140119.jpg', 'dataDate': '2014-01-19'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140120.jpg', 'dataDate': '2014-01-20'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140121.jpg', 'dataDate': '2014-01-21'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140122.jpg', 'dataDate': '2014-01-22'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140123.jpg', 'dataDate': '2014-01-23'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140124.jpg', 'dataDate': '2014-01-24'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140125.jpg', 'dataDate': '2014-01-25'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140126.jpg', 'dataDate': '2014-01-26'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140127.jpg', 'dataDate': '2014-01-27'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140128.jpg', 'dataDate': '2014-01-28'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140129.jpg', 'dataDate': '2014-01-29'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140130.jpg', 'dataDate': '2014-01-30'},
  {'variableName':'rainfall', 'imagePath':'http://academic.uprm.edu/hdc/GOES-PRWEB_RESULTS/rainfall/rainfall20140131.jpg', 'dataDate': '2014-01-31'},
];

rainfallMaps.forEach(mapDates);

exports.goesMaps = rainfallMaps;



'use strict';

var moment = require('moment');
var mapDates = function(map) {
  map.dataDate = moment(map.dataDate).toISOString();
};

var rainfallMaps =[
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/01/OUTPUT/rainfall20140101.jpg', 'dataDate': '2014-01-01'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/02/OUTPUT/rainfall20140102.jpg', 'dataDate': '2014-01-02'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/03/OUTPUT/rainfall20140103.jpg', 'dataDate': '2014-01-03'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/04/OUTPUT/rainfall20140104.jpg', 'dataDate': '2014-01-04'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/05/OUTPUT/rainfall20140105.jpg', 'dataDate': '2014-01-05'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/06/OUTPUT/rainfall20140106.jpg', 'dataDate': '2014-01-06'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/07/OUTPUT/rainfall20140107.jpg', 'dataDate': '2014-01-07'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/08/OUTPUT/rainfall20140108.jpg', 'dataDate': '2014-01-08'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/09/OUTPUT/rainfall20140109.jpg', 'dataDate': '2014-01-09'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/10/OUTPUT/rainfall20140110.jpg', 'dataDate': '2014-01-10'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/11/OUTPUT/rainfall20140111.jpg', 'dataDate': '2014-01-11'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/12/OUTPUT/rainfall20140112.jpg', 'dataDate': '2014-01-12'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/13/OUTPUT/rainfall20140113.jpg', 'dataDate': '2014-01-13'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/14/OUTPUT/rainfall20140114.jpg', 'dataDate': '2014-01-14'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/15/OUTPUT/rainfall20140115.jpg', 'dataDate': '2014-01-15'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/16/OUTPUT/rainfall20140116.jpg', 'dataDate': '2014-01-16'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/17/OUTPUT/rainfall20140117.jpg', 'dataDate': '2014-01-17'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/18/OUTPUT/rainfall20140118.jpg', 'dataDate': '2014-01-18'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/19/OUTPUT/rainfall20140119.jpg', 'dataDate': '2014-01-19'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/20/OUTPUT/rainfall20140120.jpg', 'dataDate': '2014-01-20'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/21/OUTPUT/rainfall20140121.jpg', 'dataDate': '2014-01-21'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/22/OUTPUT/rainfall20140122.jpg', 'dataDate': '2014-01-22'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/23/OUTPUT/rainfall20140123.jpg', 'dataDate': '2014-01-23'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/24/OUTPUT/rainfall20140124.jpg', 'dataDate': '2014-01-24'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/25/OUTPUT/rainfall20140125.jpg', 'dataDate': '2014-01-25'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/26/OUTPUT/rainfall20140126.jpg', 'dataDate': '2014-01-26'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/27/OUTPUT/rainfall20140127.jpg', 'dataDate': '2014-01-27'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/28/OUTPUT/rainfall20140128.jpg', 'dataDate': '2014-01-28'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/29/OUTPUT/rainfall20140129.jpg', 'dataDate': '2014-01-29'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/30/OUTPUT/rainfall20140130.jpg', 'dataDate': '2014-01-30'},
  {'variableName':'rainfall', 'imagePath':'/DAILY_DATA/2014/01/31/OUTPUT/rainfall20140131.jpg', 'dataDate': '2014-01-31'}
];

rainfallMaps.forEach(mapDates);

exports.goesMaps = rainfallMaps;



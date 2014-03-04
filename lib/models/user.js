'use strict';

var db = null;

exports.init = function(database) {
  db = database;
};

/**
 * Gets a user by id
 * @param  {String} userId The id of the user.
 * @return {Promise}
 */
exports.get = function(userId) {
  return db.connect().then(function(conn) {
    return conn.client.queryP('SELECT * from pragma_farmer where name=$1', [userId]).then(function(result) {
      return result.rows;
    }).fin(conn.done);
  });
};

exports.create = function(user) {
  return db.connect().then(function(conn) {
    var args = [user.email, user.password, user.name, user.lastName, user.email, user.farmLatitude, user.farmLongitude];
    return conn.client.queryP('INSERT INTO pragma_farmer values ($1, $2, $3, $4, $5, $6, $7)', args)
      .then(function(result) {
        console.log('query result',result);
        return result;
      }, function(err) {
        console.log('query errr', err);
        return err;
      }).fin(conn.done);
  });
};
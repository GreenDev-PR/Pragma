'use strict';

var env = process.env;
module.exports = {
  env: 'production',
  db: {
    user: env.PRAGMA_DB_USER,
    password: env.PRAGMA_DB_PASSWORD,
    database: env.PRAGMA_DB,
    sequelize: {
      port: env.PRAGMA_DB_PORT,
      host: env.PRAGMA_DB_HOST,
      dialect: 'postgres',
      quoteIdentifiers: false,
      logging: function() {}
    }
  }
};

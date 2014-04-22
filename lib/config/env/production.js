'use strict';

module.exports = {
  env: 'production',
  db: {
    user: 'postgres',
    password: null,
    database: 'pragma_production',
    sequelize: {
      port: '5432',
      host:'localhost',
      dialect: 'postgres',
      quoteIdentifiers: false,
      logging: function() {}
    }
  }
};

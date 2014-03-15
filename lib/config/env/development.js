'use strict';

module.exports = {
  env: 'development',
  db: {
    user: 'postgres',
    password: null,
    database: 'pragma_development',
    sequelize: {
      port: '5432',
      host:'localhost',
      dialect: 'postgres',
      quoteIdentifiers: false
    }
  }
};

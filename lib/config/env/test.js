'use strict';

module.exports = {
  env: 'test',
  db: {
    user: 'postgres',
    password: null,
    database: 'pragma_test',
    sequelize: {
      port: '5432',
      host:'localhost',
      dialect: 'postgres'
    }
  }
};

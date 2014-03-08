'use strict';

module.exports = {
  env: 'test',
  db: {
    user: 'pragma',
    password: 'pragma_pwd',
    database: 'pragma_test',
    sequelize: {
      port: '5432',
      host:'localhost',
      dialect: 'postgres'
    }
  }
};

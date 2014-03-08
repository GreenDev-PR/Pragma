'use strict';

module.exports = {
  env: 'development',
  db: {
    user: 'pragma',
    password: 'pragma_pwd',
    database: 'pragma_development',
    sequelize: {
      port: '5432',
      host:'localhost',
      dialect: 'postgres'
    }
  }
};

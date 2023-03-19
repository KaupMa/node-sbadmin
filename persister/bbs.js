const Sequelize = require('sequelize');

const sequelize = new Sequelize('sbadmin', 'username', 'password', {
  host: 'localhost',
  dialect: 'mariadb'
});

const Bbs = sequelize.define('Bbs', {
  content: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  vote: {
    type: Sequelize.INTEGER
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});

module.exports = Bbs;

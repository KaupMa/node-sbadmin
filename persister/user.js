var mariadb = require('mariadb');
var dbConfig = require('../config.json').database;

var pool = mariadb.createPool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  connectionLimit: 5
});

var userModel = function () {

  var User = function() {};

  User.prototype.getAllUsers = function (callback) {
    pool.query('SELECT * FROM users', function (err, rows) {
      if (err) {
        callback('ERR-MARIADB', err);
      } else {
        callback(null, rows);
      }
    });
  };

  User.prototype.getUserById = function (id, callback) {
    pool.query('SELECT * FROM users WHERE id = ?', [id], function (err, rows) {
      if (err) {
        callback('ERR-MARIADB', err);
      } else {
        callback(null, rows[0]);
      }
    });
  };

  User.prototype.createUser = function (user, callback) {
    pool.query('INSERT INTO users SET ?', user, function (err, result) {
      if (err) {
        callback('ERR-MARIADB', err);
      } else {
        user.id = result.insertId;
        callback(null, user);
      }
    });
  };

  User.prototype.updateUser = function (id, user, callback) {
    pool.query('UPDATE users SET ? WHERE id = ?', [user, id], function (err) {
      if (err) {
        callback('ERR-MARIADB', err);
      } else {
        user.id = id;
        callback(null, user);
      }
    });
  };

  User.prototype.deleteUser = function (id, callback) {
    pool.query('DELETE FROM users WHERE id = ?', [id], function (err) {
      if (err) {
        callback('ERR-MARIADB', err);
      } else {
        callback(null);
      }
    });
  };

  return new User();
};

module.exports = userModel();

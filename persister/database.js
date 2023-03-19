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

var db = function() {
  var initFlag = false;
  return {
    config: function(addr, dbname, opts, callback) {
      if( !initFlag ){
        pool.getConnection()
          .then(conn => {
            console.log("MariaDB is connected");
            initFlag = true;
            conn.release();
            if (callback) callback(null);
          })
          .catch(err => {
            console.log("MariaDB error encountered [" + err + "]");
            if (callback) callback('ERR-MARIADB', 'mariadb - '+err.message);
          });
      } else {
        if (callback) callback(null);
      }
    }
  };
};

module.exports = db();

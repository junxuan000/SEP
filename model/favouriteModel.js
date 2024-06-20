var db = require('./databaseConfig.js');

var favouriteDB = {
    addFavourite: function (data) {
        return new Promise((resolve, reject) => {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    conn.end();
                    return reject(err);
                } else {
                    var memberId = data.memberId;
                    var sku = data.sku;
                    var sql = 'INSERT INTO favourite (memberId, sku) VALUES (?, ?)';
                    conn.query(sql, [memberId, sku], function (err, result) {
                        if (err) {
                            conn.end();
                            return reject(err);
                        } else {
                            conn.end();
                            return resolve({ success: true, message: "Item added to favourites successfully" });
                        }
                    });
                }
            });
        });
    },
    removeFavourite: function (memberId, sku) {
        return new Promise((resolve, reject) => {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    conn.end();
                    return reject(err);
                } else {
                    var sql = 'DELETE FROM favourite WHERE memberId = ? AND sku = ?';
                    conn.query(sql, [memberId, sku], function (err, result) {
                        if (err) {
                            conn.end();
                            return reject(err);
                        } else {
                            conn.end();
                            return resolve({ success: true, message: "Item removed from favourites successfully" });
                        }
                    });
                }
            });
        });
    }
};

module.exports = favouriteDB;

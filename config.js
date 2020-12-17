var mysql = require("mysql");

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123",
    database: "project",
    multipleStatements: true
});

module.exports = {
    executeQuery : function(query, callback) {
        pool.getConnection(function(err, connection) {
            if(err) {
                connection.release;
                console.log("Error connecting" + err);
                return;
            } else {
                connection.query(query, function(err, rows) {
                    connection.release();
                    if(!!err) console.log("Error executing " + err);
                    else {
                        console.log("Query Executed\n");
                        callback(null, rows);
                    }
                });
                connection.on("error", function(err) {
                    console.log("Error on " + err);
                });
            }
        });
    },
};
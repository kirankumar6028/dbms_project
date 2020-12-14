var mysql = require("mysql");

var pool = mysql.createPool({
    host: "freedb.tech",
    user: "freedbtech_athish_projects",
    password: "123098zxc",
    database: "freedbtech_Athish",
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
                        console.log("Query Executed");
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
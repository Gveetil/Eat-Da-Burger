const mysql = require("mysql")
require("dotenv").config()

/** This object represents the default database configuration */
const burgerDbConfig = {
    port: process.env.MYSQL_PORT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

/** Check for process.env.JAWSDB_URL first since this app is hosted on heroku */
const connection = mysql.createConnection(process.env.JAWSDB_URL || burgerDbConfig);

/** connect to the database */
connection.connect(function (err) {
    if (err) {
        console.error("Error connecting to database: " + err.stack);
        return;
    }
    console.log("Database connected as id: " + connection.threadId);
})

module.exports = connection;

const util = require("util")
const connection = require("./connection")

const query = util.promisify(connection.query).bind(connection);

/** 
 * This module executes all the database sql operations in the application
 */
const orm = {
    /** 
    * This function fetches all the data from a table  
    * @param {String} table the name of the table to get the data from
    * @param {String} orderByColumn the name of the column used to sort data by
    */
    selectAll: async (table, orderByColumn) => {
        const querySql = "SELECT * FROM ?? ORDER BY ??";
        return query(querySql, [table, orderByColumn]);
    },

    /**
    * This function adds a single row to a table in the database  
    * @param {String} table the name of the table to add to
    * @param {Object.<string, object>} values the data to be added
    */
    insertOne: async (table, values) => {
        const querySql = "INSERT INTO ?? SET ?";
        return query(querySql, [table, values]);
    },

    /**
     * This function updates a single row on a table in the database  
     * @param {String} table the name of the table to update
     * @param {Object.<string, object>} values the data to be updated  
     * @param {Object.<string, object>} filter the criteria used to filter rows being updated
     */
    updateOne: async (table, values, filter) => {
        const querySql = "UPDATE ?? SET ? WHERE ?";
        return query(querySql, [table, values, filter]);
    },

    /**
     * This function deletes rows from a table in the database  
     * @param {String} table the name of the table to delete from
     * @param {Object.<string, object>} filter the criteria used to filter rows being deleted
     */
    delete: async (table, filter) => {
        const querySql = "DELETE FROM ?? WHERE ?";
        return query(querySql, [table, filter]);
    },
}

module.exports = orm;
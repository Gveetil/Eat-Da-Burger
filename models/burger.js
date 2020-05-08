const orm = require("../config/orm")

const burgerTable = "burgers";
const colId = "id";
const colName = "burger_name";
const colDevoured = "devoured";

/** This module performs all burger-specific data operations */
const burger = {
    /** retrieve all burgers */
    fetchAll: async () => {
        return orm.selectAll(burgerTable, colId);
    },

    /** add a burger */
    add: async (burger_name, devoured) => {
        const values = {
            [colName]: burger_name,
            [colDevoured]: devoured
        };
        return orm.insertOne(burgerTable, values);
    },

    /** update a burger */
    update: async (id, devoured) => {
        const values = { [colDevoured]: devoured };
        const filter = { [colId]: id };
        return orm.updateOne(burgerTable, values, filter);
    },

    /** delete a burger */
    delete: async (id) => {
        const filter = { [colId]: id };
        return orm.delete(burgerTable, filter);
    }
}

module.exports = burger;
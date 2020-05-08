const express = require("express");
const burgerData = require("../models/burger")

const router = express.Router();

/** Error Message to be displayed if the main application page cannot be loaded up */
const pageRenderErrorMessage = `<h1>Something Broke!</h1><br> <h4>Internal Server Error: </h4>
                                Unable to load the Eat-Da-Burger page!`;

// Define routes and apis for burgers
router.get("*", renderBurgerPage);
router.post("/api/burger", addNewBurger);
router.put("/api/burger", updateBurger);
router.delete("/api/burger/:id", deleteBurger);

/** This method renders the eat-da-burger application web page */
async function renderBurgerPage(request, response) {
    try {
        const burgers = await burgerData.fetchAll();
        return response.render("index", { burgers });
    } catch (error) {
        console.log(`Error on load page: ${error.stack}`);
        return response.status(500).send(pageRenderErrorMessage);
    }
}

/** This method handles the api call to add a new burger */
async function addNewBurger(request, response) {
    try {
        const { body: { burger_name, devoured } } = request;
        const result = await burgerData.add(burger_name, devoured);

        return response.status(200).end();
    } catch (error) {
        console.log(`Error on add: ${error.stack}`);
        return response.status(500).send(error.message);
    }
}

/** This method handles the api call to update a burger */
async function updateBurger(request, response) {
    try {
        const { body: { id, devoured } } = request;
        const result = await burgerData.update(id, devoured);

        if (result.changedRows === 0) {
            // Invalid data 
            return response.status(404).send('Burger could not be updated - Please refresh your data.');
        }

        return response.status(200).end();
    } catch (error) {
        console.log(`Error on update: ${error.stack}`);
        // Server Failure
        return response.status(500).send(error.message);
    }
}

/** This method handles the api call to delete a burger */
async function deleteBurger(request, response) {
    try {
        const { id } = request.params;
        const result = await burgerData.delete(id);

        if (result.affectedRows === 0) {
            // Invalid ID 
            return response.status(404).send('Burger does not exist - Please refresh your data.');
        }

        return response.status(200).end();
    } catch (error) {
        console.log(`Error on delete: ${error.stack}`);
        // Server Failure
        return response.status(500).send(error.message);
    }
}

module.exports = router;
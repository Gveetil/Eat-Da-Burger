$(document).ready(function () {

    const $modalDialog = $(".modal");
    const $modalDialogText = $(".modal-text");

    // Event handler for the Create button 
    async function createNewBurgerClick() {
        event.preventDefault();
        // Validate
        const burgerName = $(".new-burger-name").val().trim();
        if (burgerName == "") {
            showModalDialog("Please enter a burger name!");
            return;
        };
        $(".new-burger-name").val("");

        // Save
        const newBurger = {
            burger_name: burgerName,
            devoured: 0
        };
        if (await saveBurger(newBurger))
            location.reload();
    }

    // Call API to save the burger 
    async function saveBurger(burger) {
        try {
            const result = await $.ajax({
                url: "/api/burger",
                data: burger,
                method: "POST"
            });
            return true;
        }
        catch (error) {
            const errorMessage = `Error: <br> ${error.statusText} <br> 
                                ${(error.responseText) ? error.responseText : ''}`;
            showModalDialog(errorMessage);
            return false;
        };
    };

    // Event handler for the Devour It button 
    async function devourBurgerClick() {
        var burgerId = $(this).data("id");

        // Update database
        const burger = {
            id: burgerId,
            devoured: 1
        };
        if (await updateBurger(burger))
            location.reload();
    };

    // Call API to update the burger 
    async function updateBurger(burger) {
        try {
            const result = await $.ajax({
                url: "/api/burger",
                data: burger,
                method: "PUT"
            });
            return true;
        }
        catch (error) {
            console.error(error);
            const errorMessage = (error.status == 404) ? error.responseText : error.statusText;
            showModalDialog(`Error: ${errorMessage}`);
            return false;
        };
    };

    // Event handler for the Delete button 
    async function deleteBurgerClick() {
        var burgerId = $(this).data("id");

        if (await deleteBurger(burgerId))
            location.reload();
    };

    // Call API to delete the burger 
    async function deleteBurger(burgerId) {
        try {
            const result = await $.ajax({
                url: `/api/burger/${burgerId}`,
                method: "DELETE"
            });
            return true;
        }
        catch (error) {
            console.error(error);
            const errorMessage = (error.status == 404) ? error.responseText : error.statusText;
            showModalDialog(`Error: ${errorMessage}`);
            return false;
        };
    };

    // Displays a modal dialog with the given message
    function showModalDialog(message) {
        $modalDialogText.html(message);
        $modalDialog.modal('show');
    };

    // Event Handlers
    $(".devour-burger").on("click", devourBurgerClick);
    $(".new-burger").on("click", createNewBurgerClick);
    $(".delete-burger").on("click", deleteBurgerClick);

});
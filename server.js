const express = require("express")
const handlebars = require("express-handlebars")

const PORT = process.env.PORT || 3000;

// configure express server
const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(express.static("public"));

// Set up Handlebars
server.engine('handlebars', handlebars({ defaultLayout: "main" }));
server.set('view engine', 'handlebars');

// Use burger router
const burgerRouter = require("./controllers/burgers_controller");
server.use(burgerRouter);

// Start the server 
server.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
});
const express = require("express");
const app = express();

// Routers
const hotelsRouter = require("./routers/hotelsRouter");
const restaurantsRouter = require("./routers/restaurantsRouter");

// Middlewares
app.use(express.json());

// Routers
app.use("/hotels", hotelsRouter);
app.use("/restaurants", restaurantsRouter);

// Routes
app.get("/", (_res, res) => {
	res.send(
		"use endpoint /hotels whith GET method to show all hotels \n use endpoint /hotels whith POST method to add a hotel \n use endpoint /hotels/:id whith GET method to show the hotel who correspond \n use endpoint /restaurants whith GET method to see the restaurant who correspond \n use use endpoint /restaurants/:id whith GET method to see the restaurant who correspond"
	);
});

app.get("*", (_req, res) => {
	res.status(404).send("Error 404 not found");
});

// Start server
app.listen(8000, () => console.log("Listening on port 8000..."));
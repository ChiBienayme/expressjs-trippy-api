const express = require("express");
const Joi = require("joi");
const router = express.Router();

const restaurantsData = require("../datas/restaurantsData.json");

const restaurants = Joi.object({
	restaurantName: Joi.string().alphanum().required(),
	address: Joi.string().alphanum().required(),
	city: Joi.string().alphanum().required(),
    country: Joi.string().alphanum().required(),
    stars: Joi.number().integer().min(1).max(5).strict().required(),
    cuisine: Joi.string().alphanum().required(),
    priceCategory: Joi.number().integer().min(1).max(3).strict().required(),
});

function validRestaurant(req, res, next) {
	const validation = restaurants.validate(req.body);

	if (validation.error) {
		return res.status(400).json({
			message: "Error 400",
			description: validation.error.details[0].message,
		});
	}
	next();
}

//Créer la route /restaurants qui retournera tous les restaurants (GET /restaurants)

router.get("/", (_req, res) => {
	if (restaurantsData.length > 0) {
		res.json(restaurantsData);
	} else {
		res.send("No restaurant");
	}
});


//Créer la route /restaurants/:id  (GET /restaurants/:id)
router.get("/:restaurantID", (req, res) => {
	const restaurants = restaurantsData.find((restaurant) => {
		return (
			restaurantrestaurantID ===
			req.params.restaurantID
		);
	});

	if (restaurants) {
		res.json(restaurants);
	} else {
		res.status(404).json({
			message: "Error 404 not found",
			description: "This restaurant does not exist",
		});
	}
});

// Ajouter la possibilité de créer un nouveau restaurant (POST /restaurants)
router.post("/", validRestaurant, (req, res) => {
	console.log("request received");

	restaurantsData.push(req.body);

	res.status(201).json({
		message: "Restaurant is added",
		restaurant: req.body,
	});
});

// Ajouter la possibilité de mettre à jour le nom d’un restaurant (PATCH /restaurants/:id)

// Ajouter la possibilité d’effacer un restaurant (DELETE /restaurants/:id)

module.exports = router;
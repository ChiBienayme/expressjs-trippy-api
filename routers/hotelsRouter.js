const express = require("express");
const Joi = require("joi");
const router = express.Router();

const hotelsData = require("../datas/hotelsData.json");

const schema = Joi.object({
	id: Joi.number().required(),
    name: Joi.string().alphanum().required(),
	address: Joi.string().required(),
	city: Joi.string().alphanum().required(),
    country: Joi.string().alphanum().required(),
    stars: Joi.number().integer().min(1).max(5).strict().required(),
    hasSpa: Joi.boolean().required(),
    hasPool: Joi.boolean().required(),
    priceCategory: Joi.number().integer().min(1).max(3).strict().required(),
});

// function validate Hotel
function validHotel(req, res, next) {
	const validation = schema.validate(req.body);

	if (validation.error) {
		return res.status(400).json({
			message: "Error 400",
			description: validation.error.details[0].message,
		});
	}
	next();
}

// function findHotel
function findHotel(req, _res, next) {
	const hotels = hotelsData[req.params.hotelID - 1];
	req.hotels = hotels;
	next();
};


// Créer la route /hotels qui retournera tous les hôtels (GET /hotels)
router.get("/", (_req, res) => {
	if (hotelsData.length > 0) {
		res.json(hotelsData);
	} else {
		res.send("No hotels");
	}
});

// Créer la route /hotels/:id  (GET /hotels/:id)
router.get("/:hotelID", findHotel, (req, res) => {
	const hotels = req.hotels;

	if (hotels) {
		res.json(hotels);
	} else {
		res.status(404).json({
			message: "Error 404 not found",
			description: "This hotel does not exist",
		});
	}
});

// Ajouter la possibilité de créer un nouvel hôtel (POST /hotels)
router.post("/", validHotel, (req, res) => {
	console.log("request received");

	hotelsData.push(req.body);

	res.status(201).json({
		message: "Hotel is added",
		hotel: req.body,
	});
});

// Ajouter la possibilité de mettre à jour le nom d’un hôtel (PATCH /hotels/:id) 
router.patch("/:hotelID", findHotel, (req, res) => {
  
    const hotels = req.hotels;

    hotels.name = req.body.name;

    res.json({
        message: "Name changed",
        hotelsData,
      });
});

// Ajouter la possibilité d’effacer un hôtel (DELETE /hotels/:id)

module.exports = router;
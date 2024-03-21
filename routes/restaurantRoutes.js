const express = require("express");
const { authToken } = require("../middleware/auth");
const upload = require("../middleware/fileUpload");
const { addRestaurant, getRestaurants, getSampleData } = require("../controllers/restaurantController");


const router = express.Router();

router.route('/add').post(authToken, upload.single('photograph'), addRestaurant);
router.route('/restaurants').get(getRestaurants);
router.route('/sample').get(getSampleData);


module.exports = router;

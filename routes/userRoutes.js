const express = require("express");
const router = express.Router();
const {getAllUsers, userRegister, userLogin, getUser, updateUser, deleteUser} = require("../controllers/userController");
const { authToken } = require("../middleware/auth");


router.route("/users").get(authToken, getAllUsers);

router.route("/register").post(userRegister);

router.route("/login").post(userLogin);

router.route("/user/:id").get(authToken, getUser).put(authToken, updateUser)
.delete(authToken, deleteUser);


module.exports = router
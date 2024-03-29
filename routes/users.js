// Routes for users

// Imported node module
const express = require("express");
const router = express.Router();

// Imported local utilities
const users = require("../controllers/users");
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const { checkReturnTo } = require("../middleware")

router.route("/register")
	.get(users.renderRegister)
	.post(catchAsync(users.register));

router.route("/login")
	.get(users.renderLogin)
	.post(checkReturnTo, passport.authenticate("local", {failureFlash: true, failureRedirect: "/login",}), users.login);

router.get("/logout", users.logout);

module.exports = router;

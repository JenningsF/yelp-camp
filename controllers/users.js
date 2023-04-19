// Controller for handling users routes

const User = require("../models/user");

// Displays user registration page
module.exports.renderRegister = (req, res) => {
	res.render("users/register");
};

// Registers new user through user registration page 
module.exports.register = async (req, res, next) => {
	try {
		const { email, username, password } = req.body;
		const user = new User({ email, username });
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, (err) => {
			if (err) return next(err);
			req.flash("success", "Welcome to Yelp Camp!");
			res.redirect("/campgrounds");
		});
	} catch (e) {
		req.flash("error", e.message);
		res.redirect("register");
	}
};

// Displays user login page
module.exports.renderLogin = (req, res) => {
	if (req.query.returnTo) {
		req.session.returnTo = req.query.returnTo;
	}
	res.render("users/login");
};

// User logs in through user login page
module.exports.login = (req, res) => {
	req.flash("success", "Welcome back!");
	const redirectUrl = res.locals.returnTo || "/campgrounds";
	res.redirect(redirectUrl);
};

// User logs out
module.exports.logout = (req, res, next) => {
	req.logout((err) => {
		if (err) return next(err);
		req.flash("success", "Goodbye!");
		res.redirect("/campgrounds");
	});
};

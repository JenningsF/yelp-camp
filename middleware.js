const Campground = require("./models/campground");
const Review = require("./models/review");
const { campgroundSchema, reviewSchema } = require("./schemas");
const ExpressError = require("./utils/ExpressError");

// Middleware to check if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.session.returnTo = req.originalUrl;
		req.flash("error", "You must be signed in!");
		return res.redirect("/login");
	}
	next();
};

// Middleware to validate a campground against it's schema
module.exports.validateCampground = (req, res, next) => {
	const { error } = campgroundSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

// Middlware to check if user is the author of a campground
module.exports.isAuthor = async (req, res, next) => {
	const { id } = req.params;
	const campground = await Campground.findById(id);
	if (!campground.author.equals(req.user._id)) {
		req.flash("error", "You do not have permission to do that!");
		return res.redirect(`/campgrounds/${id}`);
	}
	next();
};

// Middlware to check if user is the author of a review
module.exports.isReviewAuthor = async (req, res, next) => {
	const { id, reviewId } = req.params;
	const review = await Review.findById(reviewId);
	if (!review.author.equals(req.user._id)) {
		req.flash("error", "You do not have permission to do that!");
		return res.redirect(`/campgrounds/${id}`);
	}
	next();
};

// Middleware to validate a review against it's schema
module.exports.validateReview = (req, res, next) => {
	const { error } = reviewSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

// Middleware to pass the returnTo URL from session to locals
module.exports.checkReturnTo = (req, res, next) => {
	if (req.session.returnTo) {
		res.locals.returnTo = req.session.returnTo;
	}
	next();
};
// Main app for YelpCamp

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

// Imported node modules
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const methodOverride = require("method-override");
const { STATUS_CODES } = require("http");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

// Imported routes
const userRoutes = require("./routes/users");
const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");

// Imported User model and ExpressError utility
const User = require("./models/user");
const ExpressError = require("./utils/ExpressError");

// URL to MongoDB database used for prod or local database for dev
const databaseUrl = process.env.DB_URL || "mongodb://localhost:27017/yelp-camp";

// Connecting to mongoDB
main()
	.then(() => {
		console.log("Database connected");
	})
	.catch((err) => {
		console.log("Database connection error");
		console.log(err);
	});


async function main() {
	mongoose.set("strictQuery", true);
	await mongoose.connect(databaseUrl);
}

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(mongoSanitize());

// 
const secret = process.env.SECRET ||"thisshouldbeabettersecret";

const store = MongoStore.create({
	mongoUrl: databaseUrl,
	touchAfter: 24 * 3600					// Session is updated every 24 hours
})

store.on("error", function (e) {
	console.log("Session store Error", e);
})

// Creates cookie for session
const sessionConfig = {
	store,
	name: "session",
	secret,
	saveUninitialized: false,				// Don't create session until something stored
  	resave: false,							// Don't save session if unmodified
	cookie: {
		HttpOnly: true,
		// secure: true,
		maxAge: 1000 * 60 * 60 * 24,		// Cookie lasts for 24 hours
	},
};

app.use(session(sessionConfig));

app.use(flash());
app.use(helmet({ contentSecurityPolicy: false }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash alerts for successes and errors
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

// Routes for users, campgrounds, and reviews
app.use("/", userRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

// Renders home page
app.get("/", (req, res) => {
	res.render("home");
});

// Handles 404 error
app.all("*", (req, res, next) => {
	next(new ExpressError("Page Not Found", 404));
});

// Error handler
app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = "Something went wrong";
	res.status(statusCode).render("error", { err });
});

// App is listening on port for connections
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Serving to http://localhost:${port}/`);
});

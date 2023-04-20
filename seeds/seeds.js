const mongoose = require("mongoose");
const cities = require("./cities");												// Use for cities
const parks = require("./parks");												// Use for parks
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

main()
	.then(() => {
		console.log("Database connected");
	})
	.catch((err) => {
		console.log("Database connection error");
		console.log(err);
	});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

async function main() {
	await mongoose.connect("mongodb://localhost:27017/yelp-camp");
}

const seedDatabase = async () => {
	await Campground.deleteMany({});
	const numberOfCampgrounds = 150;											// Change the number of campgrounds created
	for (let i = 0; i < numberOfCampgrounds; i++) {
		const price = Math.floor(Math.random() * 20) + 10;
		// const randomNum = Math.floor(Math.random() * parks.length);			// Use for parks
		const randomNum = Math.floor(Math.random() * cities.length);			// Use for cities
		const { city, state, longitude, latitude } = cities[randomNum];			// Use for cities
		const camp = new Campground({
			title: `${sample(descriptors)} ${sample(places)}`,
			images: [
				{
					url: "https://res.cloudinary.com/dnooojjwn/image/upload/v1680717521/YelpCamp/uj8vnaw9iwbyg2uzrxln.jpg",
					filename: "YelpCamp/uj8vnaw9iwbyg2uzrxln",
				},
			],
			geometry: {															// Creates geometry data from cities
				type: "Point",
				coordinates: [`${longitude}`, `${latitude}`],
			},
			// geometry: parks[randomNum].geometry,								// Pulls geometry data from parks
			price,
			description:
				"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat eaque recusandae ipsam ut. Sit sint deserunt hic illum dolore libero, autem vel culpa distinctio nobis aliquam rem tempore atque? Quas.",
			// location: parks[randomNum].properties.Name,						// Use for parks
			location: `${city}, ${state}`,										// Use for cities
			author: "6439bcaacb9542b05c018149",
		});
		await camp.save();
	}
};

seedDatabase().then(() => {
	mongoose.connection.close();
	console.log("Connection closed, database seeded");
});

const mongoose = require("mongoose");
const cities = require("./cities");
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
	for (let i = 0; i < 50; i++) {
		const randomNum = Math.floor(Math.random() * 1000);
		const camp = new Campground({
			location: `${cities[randomNum].city}, ${cities[randomNum].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
		});
		await camp.save();
	}
};

seedDatabase().then(() => {
	mongoose.connection.close();
	console.log("Connection closed, database seeded");
});

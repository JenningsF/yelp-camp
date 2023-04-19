const mongoose = require("mongoose");
const cities = require("./cities");												// Uncomment if using cities instead of parks
const parks = require("./parks");
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
	for (let i = 0; i < 100; i++) {
		const randomNum = Math.floor(Math.random() * parks.length);
		// const randomNum = Math.floor(Math.random() * cities.length);			// Uncomment if using cities instead of parks
		const price = Math.floor(Math.random() * 20) + 10;
		// const { city, state, longitude, latitude } = cities[randomNum];		// Uncomment if using cities instead of parks
		const camp = new Campground({
			title: `${sample(descriptors)} ${sample(places)}`,
			images: [
				{
					url: "https://res.cloudinary.com/dnooojjwn/image/upload/v1680717521/YelpCamp/uj8vnaw9iwbyg2uzrxln.jpg",
					filename: "YelpCamp/uj8vnaw9iwbyg2uzrxln",
				},
			],
			// geometry: {														// Uncomment if using cities instead of parks
			// 	type: "Point",
			// 	coordinates: [`${longitude}`, `${latitude}`],
			// },
			geometry: parks[randomNum].geometry,
			price,
			description:
				"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat eaque recusandae ipsam ut. Sit sint deserunt hic illum dolore libero, autem vel culpa distinctio nobis aliquam rem tempore atque? Quas.",
			location: parks[randomNum].properties.Name,
			// location: `${city}, ${state}`,									// Uncomment if using cities instead of parks
			author: "6439bcaacb9542b05c018149",
		});
		await camp.save();
	}
};

seedDatabase().then(() => {
	mongoose.connection.close();
	console.log("Connection closed, database seeded");
});

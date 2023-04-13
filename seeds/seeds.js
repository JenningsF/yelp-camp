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
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: "632eb411eef24c7090289c50",
			location: `${cities[randomNum].city}, ${cities[randomNum].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			images: [
				{
					url: 'https://res.cloudinary.com/dnooojjwn/image/upload/v1680709364/YelpCamp/rzcavqydroov3rekuuhd.jpg',
					filename: 'YelpCamp/rzcavqydroov3rekuuhd',
				  },
				  {
					url: 'https://res.cloudinary.com/dnooojjwn/image/upload/v1680709367/YelpCamp/n2oorehhpvuebnr7blrs.jpg',
					filename: 'YelpCamp/n2oorehhpvuebnr7blrs',
				  }
			],
			description:
				"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat eaque recusandae ipsam ut. Sit sint deserunt hic illum dolore libero, autem vel culpa distinctio nobis aliquam rem tempore atque? Quas.",
			price,
		});
		await camp.save();
	}
};

seedDatabase().then(() => {
	mongoose.connection.close();
	console.log("Connection closed, database seeded");
});

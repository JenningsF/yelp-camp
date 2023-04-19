// Model for campground

const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

// Schema for images added to campground
const ImageSchema = new Schema({
	url: String,
	filename: String,
});

// Virtual property for image to display thumbnails when editing
ImageSchema.virtual("thumbnail").get(function () {
	return this.url.replace("/upload", "/upload/w_200");
});

// Option to allow virtual properties in CampgroundSchema
const opts = { toJSON: { virtuals: true } };

// Schema for campground
const CampgroundSchema = new Schema({
	title: String,
	images: [ImageSchema],
	geometry: {
		type: {
			type: String,
			enum: ["Point"],
			require: true,
		},
		coordinates: {
			type: [Number],
			required: true,
		},
	},
	price: Number,
	description: String,
	location: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: "Review",
		},
	],
}, opts);

// Virtual property to display pop up window on cluster map
CampgroundSchema.virtual("properties.popUpMarkup").get(function () {
	return `
	<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
	<p>${this.location}</p>`;
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
	if (doc) {
		await Review.deleteMany({
			_id: {
				$in: doc.reviews,
			},
		});
	}
});

module.exports = mongoose.model("Campground", CampgroundSchema);

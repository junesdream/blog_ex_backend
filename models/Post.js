import mongoose from "mongoose";
const Schema = mongoose.Schema;
// const { Schema } = mongoose;

const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			require: true,
			unique: true,
		},
		desc: {
			type: String,
			require: true,
		},
		photo: {
			type: String,
			require: true,
		},
		username: {
			type: String,
			require: true,
		},
		categories: {
			type: Array,
			require: false,
		},
	  },
	{ timestamps: true }
);

export default mongoose.model("Post", PostSchema);
 
import mongoose from "mongoose";
const Schema = mongoose.Schema;
// const { Schema } = mongoose;

const SnapSchema = new mongoose.Schema(
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
	},
	{ timestamps: true }
);

export default mongoose.model("Snap", SnapSchema);

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			require: true,
			unique: true,
		},
		email: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
		},
		profilePic: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

export default mongoose.model("User", UserSchema);

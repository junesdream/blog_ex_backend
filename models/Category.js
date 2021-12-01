import mongoose from "mongoose";
const Schema = mongoose.Schema;
// const { Schema } = mongoose;

const CategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
        }
	},
	{ timestamps: true }
);

export default mongoose.model("Category", CategorySchema);

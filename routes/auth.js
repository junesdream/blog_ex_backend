import express from "express";
const router = express.Router();
import User from "../models/User.js";
import bcrypt from "bcrypt";

//Register
router.post("/register", async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = new User({ username, email, password: hashedPassword });
		const user = await newUser.save();
		res.status(200).json(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

//Login
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		!user && res.status(400).json("Wrong credentials!");

		const validated = await bcrypt.compare(
			req.body.password,
			user.password
		);
		!validated && res.status(400).json("Wrong credentials!");

		const { password, ...others } = user._doc;
		res.status(200).json(others);
	} catch (err) {
		res.status(500).json(err);
	}
});

//Logins M
// router.post("/login", async (req, res) => {
// 	const { username, password } = req.body;

// 	try {
// 		const user = await User.findOne({ username });
// 		!user && res.status(400).json("Wroing credentials!");

// 		const validPassword = await bcrypt.compare(password, user.password);
// 		!validPassword && res.status(400).json("Wroing credentials!");

// 		const { password, ...other } = user._doc;
// 		res.status(200).json(other);
// 	} catch (error) {
// 		res.status(500).send(error);
// 	}
// });

export default router;

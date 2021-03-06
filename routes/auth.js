import express from "express";
const router = express.Router();
import User from "../models/User.js";
import bcrypt from "bcrypt";

//Register
router.post("/register", async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const salt = await bcrypt.genSalt(10);
		console.log("genSalt");
		const hashedPassword = await bcrypt.hash(password, salt);
		console.log("hashedPassword");
		const newUser = new User({ username, email, password: hashedPassword });
		console.log("newUser");
		const user = await newUser.save();
		console.log("userSaved");
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		if(error.code === 11000) { 
			res.status(403).send({ message: "User already exists"})	
		}
		res.status(500).send(error);
	}
});

//Login
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		console.log("findOne");
		!user && res.status(400).json("Wrong credentials!");

		const validated = await bcrypt.compare(
			req.body.password,
			user.password
		);
		console.log("compare");
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

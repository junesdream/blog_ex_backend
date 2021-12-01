import express from "express";
const router = express.Router();
import User from "../models/User.js";
import Post from "../models/Post.js";
import bcrypt from "bcrypt";

//Update
router.put("/:id", async (req, res) => {
	if (req.body.userId === req.params.id) {
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			req.body.paswword = await bcrypt.hash(req.body.password, salt);
		}
		try {
			const updateUser = await User.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			res.status(200).json(updateUser);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(400).json("unauthorized");
	}
});

// router.put('/:id', async (req, res) => {
//   const { id } = req.params
//   const { userId, password } = req.body
//   if (userId === id) {
//     if (password) {
//         const salt = await bcrypt.genSalt(10);
// 		password = await bcrypt.hash(password, salt);
//     }
//     try {
//       const user = await User.findByIdAndUpdate(id, { $set: req.body })
//       res.status(200).json("Account has been updated");
//     } catch (error) {
//       res.status(500).send(error)
//     }
//   } else {
//     res.status(403).json('unauthorized')
//   }
// })

//DELETE
router.delete("/:id", async (req, res) => {
	if (req.body.userId === req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			try {
				await Post.deleteMany({ username: user.username });
				await User.findByIdAndDelete(req.params.id);
				res.status(200).json("User has been deleted...");
			} catch (err) {
				res.status(500).json(err);
			}
		} catch (err) {
			res.status(400).json("User not foun!");
		}
	} else {
		res.status(401).json("unauthorized");
	}
});

//GET User

router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { password, ...others } = user._doc;
		res.status(200).json(others);
	} catch (err) {
		res.status(500).json(err);
	}
});

export default router;

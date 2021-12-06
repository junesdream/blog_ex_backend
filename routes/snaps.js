import express from "express";
const router = express.Router();
import User from "../models/User.js";
import Snap from "../models/Snap.js";
// import multer from "multer";

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		console.log("log from multer");
// 		console.log("file", file);
// 		console.log("req", req);
// 		cb(null, "../images");
// 	},
// 	filename: (req, file, cb) => {
// 		console.log("file2", file);
// 		cb(null, file.fieldname + "-" + Date.now());
// 	},
// });
// const fileFilter = (req, file, cb) => {
// 	return file.mimetype.split("/")[1].match(/^(png|jpeg|jpg)$/gi)
// 		? cb(null, true)
// 		: //throw an error if the mimetype is not an image, i.e. does not have extension jpg, jpeg or png
// 		  cb(new Error("please upload only jpeg/jpg/png files"), false);
// };

// const upload = multer({ storage: storage });

//Create snap

router.post("/", async (req, res) => {
	const newSnap = new Snap(req.body);
	try {
		const savedSnap = await newSnap.save();
		res.status(200).json(savedSnap);
	} catch (err) {
		res.status(500).json(err);
	}
});
// router.post("/new", upload.single("postpic"), async (req, res) => {
// 	console.log("hello");
// 	const newPost = new Post(req.body);
// 	console.log(req.body);
// 	try {
// 		const savedPost = await newPost.save();
// 		res.status(200).json(savedPost);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

//Update Snap
// router.put("/:id", async (req, res) => {
// 	try {
// 		const snap = await Snap.findById(req.params.id);
// 		if (snap.username === req.body.username) {
// 			try {
// 				const updatedSnap = await Snap.findByIdAndUpdate(
// 					req.params.id,
// 					{
// 						$set: req.body,
// 					},
// 					{ new: true }
// 				);
// 				res.status(200).json(updatedSnap);
// 			} catch (err) {
// 				res.status(500).json(err);
// 			}
// 		} else {
// 			res.status(401).json("Please update only your snap!");
// 		}
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

//Delete Post
// router.delete("/:id", async (req, res) => {
// 	try {
// 		const snap = await Snap.findById(req.params.id);
// 		if (snap.username === req.body.username) {
// 			try {
// 				await snap.delete();
// 				res.status(200).json("Snap has been deleted...");
// 			} catch (err) {
// 				res.status(500).json(err);
// 			}
// 		} else {
// 			res.status(401).json("You can delete only your snap!");
// 		}
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

//Get snap
// router.get("/:id", async (req, res) => {
// 	try {
// 		const snap = await Snap.findById(req.params.id);
// 		res.status(200).json(snap);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

//Get All Posts
router.get("/", async (req, res) => {
	try {
		let snaps;
		snaps = await Snap.find({ });
		res.status(200).json(snaps);
	} catch (err) {
		res.status(500).json(err);
	}
});

//Get All snaps
// router.get("/", async (req, res) => {
// 	const username = req.query.user;
// 	const catName = req.query.cat;
// 	try {
// 		let posts;
// 		if (username) {
// 			snaps = await Snap.find({ username });
// 		} else if (catName) {
// 			snaps = await Snap.find({
// 				categories: {
// 					$in: [catName],
// 				},
// 			});
// 		} else {
// 			snaps = await Snap.find();
// 		}
// 		res.status(200).json(snaps);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

export default router;

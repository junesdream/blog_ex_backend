import express from "express";
const router = express.Router();
import User from "../models/User.js";
import Post from "../models/Post.js";
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

//Create post
router.post("/", async (req, res) => {
	const newPost = new Post(req.body);
	try {
		const savedPost = await newPost.save();
		res.status(200).json(savedPost);
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

//Update Post
router.put("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.username === req.body.username) {
			try {
				const updatedPost = await Post.findByIdAndUpdate(
					req.params.id,
					{
						$set: req.body,
					},
					{ new: true }
				);
				res.status(200).json(updatedPost);
			} catch (err) {
				res.status(500).json(err);
			}
		} else {
			res.status(401).json("Please update only your post!");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

//Delete Post
router.delete("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.username === req.body.username) {
			try {
				await post.delete();
				res.status(200).json("Post has been deleted...");
			} catch (err) {
				res.status(500).json(err);
			}
		} else {
			res.status(401).json("You can delete only your post!");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

//Get Post
router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(200).json(post);
	} catch (err) {
		res.status(500).json(err);
	}
});

//Get All Posts
router.get("/", async (req, res) => {
	const username = req.query.user;
	const catName = req.query.cat;
	try {
		let posts;
		if (username) {
			posts = await Post.find({ username });
		} else if (catName) {
			posts = await Post.find({
				categories: {
					$in: [catName],
				},
			});
		} else {
			posts = await Post.find();
		}
		res.status(200).json(posts);
	} catch (err) {
		res.status(500).json(err);
	}
});

export default router;

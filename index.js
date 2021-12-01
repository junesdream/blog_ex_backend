import express from "express";
const app = express();
import "dotenv/config";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import categoryRoute from "./routes/categories.js";
import multer from "multer";
import path from "path";
import cors from "cors";
const __dirname = path.resolve();

const port = process.env.PORT || 8030;

app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		// useCreateIndex: true,
		// useFindfAndModify: true,
	})
	.then(() => console.log("Database connected"))
	.catch((e) => console.error(e));

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

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log("uploading file: ", file)
		cb(null, "images");
	},
	filename: (req, file, cb) => {
		console.log("uploading filename: ", req.body.name);
		cb(null, req.body.name);
	},
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
	console.log()
	res.status(200).json("file has benn uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.get("/", (req, res) => {
	res.send("Hi, alles klar?!");
});

app.get("/users", (req, res) => {
	res.send("I am User");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

//Das hat zur Fehlermeldung geführt, warum?
// mongoose.connect(process.env.MONGO_URL, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useCreateIndex: true,
// })
// .then(console.log("Connected to MOngDB"))
// .catch((err) => console.log(err));

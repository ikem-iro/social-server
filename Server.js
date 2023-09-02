require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const colors = require("colors");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { fileURLToPath } = require("url");
const connectDB = require("./dbConfig/db");
const errorHandler = require("./middleware/errorHandler");
const { register } = require("./controllers/auth");
const { createPost } = require("./controllers/posts");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/usersRoute");
const postRoute = require("./routes/postsRoute");
const verifyToken = require("./middleware/authenticator");

const app = express();

const port = process.env.PORT || 5001;
connectDB();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use(errorHandler);

app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", postRoute);

// FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

const start = () => {
  console.log(`Server is running`.blue.underline);
};

app.listen(port, start);

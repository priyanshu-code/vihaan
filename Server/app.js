require("dotenv").config();
require("express-async-errors");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");
const { registerUser } = require("./controllers/auth");
const app = express();

//config
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

//Custom Middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const authMiddleware = require("./middleware/auth");

//Connect
const connect = require("./db/connect");

//Route Imports
const authRoute = require("./routes/auth");
const patientRoute = require("./routes/patient");
const PORT = process.env.PORT || 5000;

//Routes

// register route
app.post("/api/v1/auth/register", upload.single("picture"), registerUser);

// auth route
app.use("/api/v1/auth", authRoute);
app.use("/api/v1", upload.single("picture"), authMiddleware, patientRoute);
// Incomplete route



app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);
app.listen(PORT, async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log(`Server listening at http://loaclhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});

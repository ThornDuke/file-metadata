var express = require("express");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const upload = multer({ dest: "./public/data/uploads" });

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/greetings", (req, res) => {
  res.send("Hallo you!");
});

app.use("/api/fileanalyse", upload.single("upfile"), (req, res, next) => {
  const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } =
    req.file;
  req.multerResponse = {
    name: originalname,
    type: mimetype,
    size,
  };
  next();
});

app.post("/api/fileanalyse", (req, res) => {
  response = req.multerResponse;
  res.json(response);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("\n|| \n|| Your app is listening on port " + port + "\n||");
});

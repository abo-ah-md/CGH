var path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

//the saved city search history
let ProjectData = {
  projectweatherData: {},
  projectimageData: {},
  projectgeoData: {},
};

let savedData = [];

app.use(cors());

//body Parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// server test route
app.get("/test", function (req, res) {
  res.json({
    status: 200,
  });
});

app.post("/saveimageData", (req, res) => {
  console.log(req.body);
  ProjectData.projectimageData.counterImg = req.body.preURL;

  res.send(ProjectData.projectimageData).status(200);
});

app.post("/savegeoData", (req, res) => {
  console.log(req.body);
  ProjectData.projectgeoData.latitude = req.body.latitude;
  ProjectData.projectgeoData.langtitude = req.body.langtitude;
  ProjectData.projectgeoData.cityName = req.body.cityName;
  ProjectData.projectgeoData.CuntryName = req.body.CuntryName;
  res.send(ProjectData.projectgeoData).status(200);
});

app.post("/saveweatherData", (req, res) => {
  console.log(req.body);
  ProjectData.projectweatherData.temp = req.body.temp;
  ProjectData.projectweatherData.feelTemp = req.body.feelTemp;
  ProjectData.projectweatherData.description = req.body.description;

  res.send(ProjectData.projectweatherData).status(200);
});

app.get("/showData", (req, res) => {
  console.log("data is sent", ProjectData);
  res.send(ProjectData).status(200);
});

app.listen(5000, function () {
  console.log("Example app listening on port 5000!");
});
app.get("/testdata", function (req, res) {
  res.json(ProjectData);
});

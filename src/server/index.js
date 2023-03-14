const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config()
const { response } = require("express");


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



const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);




app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// server test route
app.post  ("/test", async (req, res) => {
  try{
    const city= req.body.name
    const fromDate= req.body.fromDate
    const toDate= req.body.toDate

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: ` plan a trip from  ${fromDate} to ${} days visit to ${city} and make them timelined for each day like:  day 1 :make this and go to that  `, 
      temperature: 0,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: `[\n]`,
    })
    console.log(response.data.choices[0].text);
    return res.status(200).json({
      success:true,
      data:response.data.choices[0].text
    })
  }catch(er){
  return res.status(400).json({
    success:false,
    error:er.response
    ? er.reponse.data
    :"server error"
  })  
  }
 
 
 
 
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

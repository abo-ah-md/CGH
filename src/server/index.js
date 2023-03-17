const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();



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
app.get("/test", async (req, res) => {

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      //prompt: `plan a trip from  ${fromDate} to ${toDate} visit to ${city}
      //where my day start at ${startTime} and end at ${endTime} and make timeline for each day and show the distance between places to visit in the same day start each day from the hotel   like:  day 1 (date) :(Exclode hotel) make this in time and go to that and the distance between them.put it in html tags`,
      //prompt: ` plan a trip from  ${fromDate} to ${toDate} visit to ${city} and make them timelined for each day and show the distance between places to visit in the same day  like:  day 1 :make this and go to that  `,
      messages: [
        {
          role: "system",
          content: `you are a helpfull travel planner spicialized in planning trips in KSA  you always  consider to include saudi culture in your planning  `,
          role: "user",
          content: `plan a trip from  ${ProjectData.fromDate} to ${ProjectData.toDate}, to visit ${ProjectData.cityName},where my activities start at ${ProjectData.startTime} and end at ${ProjectData.endTime} ,and make timeline for each day and provide the time it takes to go from one place to the next place in your daily sechdule and here are the weather info ${ProjectData.weatherDatabyday} please consider those data in your planing if they are relevant to the traviling dates and show them as the reason of choosing the activity .put it in JSON format like your prevous 
            
{
  "2023-03-02": [
     date:"2023-03-02"
    "temp":"40°C"
    "advaice about the weather": you should wear somthing , and pick outdoor activity 
    {
      "activity": "Arrive in Riyadh",
      "time": "00:00"
    },
    {
      "activity": "Check-in at hotel",
      "time": "00:30",
      "duration": "00:30"
    },
    {
      "activity": "Visit Masmak Fort",
      "time": "10:00",
      "duration": "02:00",
      "travel": {
        "from": "hotel",
        "to": "Masmak Fort",
        "duration": "00:15"
      }
    },
    {
      "activity": "Lunch at AlMamlakah Mall",
      "time": "13:00",
      "duration": "01:00",
      "travel": {
        "from": "Masmak Fort",
        "to": "AlMamlakah Mall",
        "duration": "00:30"
      }
    },
    {
      "activity": "Visit Kingdom Centre Tower",
      "time": "15:00",
      "duration": "02:00",
      "travel": {
        "from": "AlMamlakah Mall",
        "to": "Kingdom Centre Tower",
        "duration": "00:20"
      }
    },
    {
      "activity": "Dinner at Al Faisaliah Tower",
      "time": "19:00",
      "duration": "02:00",
      "travel": {
        "from": "Kingdom Centre Tower",
        "to": "Al Faisaliah Tower",
        "duration": "00:30"
      }
    }
  ]
}`,
        },
      ],
    });
    const GPTResult = response.data.choices[0].message.content;
    console.log(GPTResult);
    return res.status(200).json(GPTResult);
  } catch (er) {
    console.log("***", er);
    return res.status(400).json();
  }
  
});

app.post("/savegeoData", (req, res) => {
  console.log(req.body);
  ProjectData.projectgeoData.latitude = req.body.latitude;
  ProjectData.projectgeoData.langtitude = req.body.langtitude;
  ProjectData.cityName = req.body.cityName;
  ProjectData.projectgeoData.CuntryName = req.body.CuntryName;
  ProjectData.fromDate= req.body.fromDate;
  ProjectData.toDate= req.body.toDate;
  ProjectData.startTime= req.body.startTime;
  ProjectData.endTime= req.body.endTime;
 
    res.send(ProjectData.projectgeoData).status(200);
});

app.post("/saveweatherData", (req, res) => {
  console.log(req.body);
  ProjectData.projectweatherData = req.body.weatherDatabyday;

  res.send(ProjectData.projectweatherData).status(200);
});

app.get("/showData", async (req, res) => {
  console.log("data is sent", ProjectData);

  
});

app.listen(5000, function () {
  console.log("Example app listening on port 5000!");
});
app.get("/testdata", function (req, res) {
  res.json(ProjectData);
});

const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const { response } = require("express");
const { google } = require('googleapis');


const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const GOOGLE_PRIVATE_KEY="AIzaSyDIPDyjxSQRMcNtYR5zmaLNFhWP3bs8Mbw"
const GOOGLE_CLIENT_EMAIL = "dalalfahadaa@gmail.com"
const GOOGLE_PROJECT_NUMBER = "1031519192032"
const GOOGLE_CALENDAR_ID = "dalalfahadaa@gmail.com"






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

app.get('/Calendar', (req, res) => {
  const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES
  );

  const calendar = google.calendar({
    version: 'v3',
    project: GOOGLE_PROJECT_NUMBER,
    auth: jwtClient
  });

  calendar.events.list({
    calendarId: GOOGLE_CALENDAR_ID,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (error, result) => {
    if (error) {
      res.send(JSON.stringify({ error: error }));
    } else {
      if (result.data.items.length) {
        res.send(JSON.stringify({ events: result.data.items }));
      } else {
        res.send(JSON.stringify({ message: 'No upcoming events found.' }));
      }
    }
  });
});



app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// server test route
app.post("/test", async (req, res) => {

  try {
    const city = req.body.name;
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;


    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      //prompt: `plan a trip from  ${fromDate} to ${toDate} visit to ${city} 
      //where my day start at ${startTime} and end at ${endTime} and make timeline for each day and show the distance between places to visit in the same day start each day from the hotel   like:  day 1 (date) :(Exclode hotel) make this in time and go to that and the distance between them.put it in html tags`,
      //prompt: ` plan a trip from  ${fromDate} to ${toDate} visit to ${city} and make them timelined for each day and show the distance between places to visit in the same day  like:  day 1 :make this and go to that  `,
      messages: [
        {
          "role": "system",
          "content": `you are a helpfull travel planner spicialized in planning trips in KSA  you always  consider to include saudi culture in your planning  `,
          "role": "user",
          "content": `plan a trip from  ${fromDate} to ${toDate}, to visit ${city},where my activities start at ${startTime} and end at ${endTime} ,and make timeline for each day and provide the time it takes to go from one place to the next place in your daily sechdule.put it in JSON format like your prevous 
            
{
  "2023-03-02": [
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

        }
      ]

    });
    const GPTResult = response.data.choices[0].message.content
    console.log(GPTResult);
    return res.status(200).send(GPTResult)
  } catch (er) {
    console.log("***", er)
    return res.status(400).json();
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

var path = require('path')
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()


//the saved city search history
let projectData = {};
//object stored data
let savedTrips = [];

app.use(cors());

//body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



app.use(express.static('dist'));



app.get('/', function (req, res) {
     res.sendFile('dist/index.html')
    
})

// server test route
app.get('/test', function(req, res) {
  res.json({
    status : 200
  })
})



app.post('/saveData', (req, res) => {
  
    projectData['name'] = req.body.name;
    projectData['CountryName'] = req.body.CountryName;
    projectData['temp'] = req.body.temp;
    projectData['feelTemp'] = req.body.feelTemp;
    projectData['description'] = req.body.description
    projectData['counterImg'] = req.body.counterImg;
   
    res.send(projectData);
  });
  app.get('/showData', (req, res) =>{
    console.log(projectData);
    res.send(projectData);
  });
// designates what port the app will listen to for incoming requests
app.listen(5051, function () {
    console.log('Example app listening on port 5051!')
})
app.get('/test', function (req, res) {
  res.send("the server is working")
})
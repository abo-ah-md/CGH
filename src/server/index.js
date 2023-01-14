var path = require('path')
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()


//the saved city search history
let ProjectData ={
  projectweatherData : {},
  projectimageData : {},
  projectgeoData : {}
}


let savedData=[];

 
app.use(cors());


//body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.json());



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



app.post('/saveimageData', (req, res) => {
   console.log(req.body);
  ProjectData.projectimageData.counterImg = req.body.data.preURL;
   
 //   res.send(projectimageData);
  });

  app.post('/savegeoData', (req, res) => {
    console.log(req.body);
    ProjectData.projectgeoData.name = req.body.data.name;
    ProjectData.projectgeoData.CountryName = req.body.data.CountryName;     
   //   res.send(projectgeoData);
    });


    app.post('/saveweatherData', (req, res) => {
      console.log(req.body);  
      ProjectData.projectweatherData.temp = req.body.data.temp;
      ProjectData.projectweatherData.feelTemp = req.body.data.feelTemp;
      ProjectData.projectweatherData.description = req.body.data.description;
       

      //  res.send(projectweatherData);
      });

  
 


  app.get('/showData', (req, res) =>{
    console.log(ProjectData);
    res.send(ProjectData);
    savedData[savedData.length]=ProjectData;
    ProjectData={ projectweatherData : {},
    projectimageData : {},
    projectgeoData : {}
  }
   
    
  //  console.log(projectweatherData,projectgeoData,projectimageData);
  //  res.send(projectweatherData,projectgeoData,projectimageData);
  });
// designates what port the app will listen to for incoming requests
app.listen(5051, function () {
    console.log('Example app listening on port 5051!')
})
app.get('/testdata', function (req, res) {
  
  res.json(ProjectData)
})
import { Geo } from "./geoAPI";
import { image } from "./pixAPI";
import { weather } from "./WeatherBit";

const formHandler = () =>{
    event.preventDefault();
    btn.addEventListener('click' , () =>{
        const county = document.getElementById("county").value;
        weather(county)
        .then((weatherData) =>{
            console.log(weatherData);

            postData("http://localhost:5051/saveweatherData" , {
                temp: weatherData.data[0].temp,
                feelTemp: weatherData.data[0].app_temp,
                description:weatherData.data[0].weather.description
            })
        });
        Geo(county).then((geodata) =>{
            console.log(geodata);
            postData("http://localhost:5051/savegeoData" , {
                name: geodata.geonames[0].toponymName,
                CountryName: geodata.geonames[0].countryName
            })
        })
        image(county)
        .then((data) =>{
            console.log(data);

            postData("http://localhost:5051/saveimageData" , {
                preURL: data.hits[0].webformatURL
            }).then(update())
        })
        


       
})


}
const update = async () => {
    
    const req = await fetch('http://localhost:5051/showData');
    try {
        const getData = await req.json()
       
            console.log( getData);
            // update new entry values
           
            if (getData.projectimageData.counterImg !== undefined ) {
                document.getElementById("img").src = getData.projectimageData.counterImg
            }
            if (getData.projectweatherData.temp !== undefined  && getData.projectweatherData.temp !== undefined && getData.projectweatherData.description !==undefined) {
                document.getElementById('temp').innerHTML = getData.projectweatherData.temp;
                document.getElementById("feelTemp").innerHTML = getData.projectweatherData.feelTemp;
                document.getElementById("description").innerHTML = getData.projectweatherData.description;
            }
                document.getElementById('name').innerHTML = getData.projectgeoData.name;
                document.getElementById("Countyname").innerHTML = getData.projectgeoData.CountryName;
               
        
        
       
    }
    
        
     catch (err) {
        console.log('error', err);
    }
}


const postData = async (url = '' , data = {} ) =>{
    const res = await fetch(url , {
        method: 'POST',
        credentials:"same-origin",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
           data

        })
    })
}
    /*
    try{
        const newData = await res.json();
        
        return newData;}
         catch (err){
        console.log(err);
    }
}
*/
export {formHandler}

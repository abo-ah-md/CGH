import { update } from "./updateWebsite";
import { Geo } from "./GeoAPI";
import { weather } from "./WeatherAPI";
import { Image } from "./imageAPI";
import { cal } from "./CalculatingTheDate";


/* fetching the datat from the API then using 
the coordnates from the preveous Geo api to 
fetch the weather data  sending it to server
 then fetching it from server and update the 
 page and showing the card */
const formHandler = async () => {
  // getting the User input
  const inputcity = document.getElementById("inputcity").value;
  //taking the dates
 await cal()
  try {
    let geodata = await Geo(inputcity);
    let ImageData = await Image(inputcity);
//getting the weather data using the coordinates from Geo API function 
    let weatherData = await weather(
      geodata.geonames[0].lng,
      geodata.geonames[0].lat
    );

    //displaying the fetched data
   await update();

   //showing the travel planning  card 
  let cardClass = document.getElementById("card")
  cardClass.classList.remove("hideCard")
  } catch (er) {
    console.log(er);
  }
 
};

//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////

export { formHandler };

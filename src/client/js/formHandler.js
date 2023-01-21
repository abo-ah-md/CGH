import { update } from "./updateWebsite";
import { Geo } from "./GeoAPI";
import { weather } from "./WeatherAPI";
import { Image } from "./imageAPI";
import { cal } from "./CalculatingTheDate";

const formHandler = async () => {
  const inputcity = document.getElementById("inputcity").value;
 await cal()
  try {
    let geodata = await Geo(inputcity);
    let ImageData = await Image(inputcity);

    let weatherData = await weather(
      geodata.geonames[0].lng,
      geodata.geonames[0].lat
    );

   await update();
  let cardClass = document.getElementById("card")
  cardClass.classList.remove("hideCard")
  } catch (er) {
    console.log(er);
  }
 
};

//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////

export { formHandler };

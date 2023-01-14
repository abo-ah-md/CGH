import img from "./media/world.png";

//import API's  
import{formHandler} from './js/formHandler'
import { getCountyName,Geo } from './js/geoAPI'
import { getWeather,weather } from './js/WeatherBit'
import { image,getImg } from './js/pixAPI'
import { Cal } from './js/CalculatingTheDate'
 // import all the styles all styles must bee scss
import "./style/styles.scss"
import "./style/grid.scss"
import "./style/mobile.scss"
// export the functionlty
export {
    image,
    Geo,
    weather,
    Cal,
    formHandler
}
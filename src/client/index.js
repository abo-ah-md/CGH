import img from "./media/burger.png";

//import API's  
import { getCountyName } from './js/geoAPI'
import { getWeather } from './js/WeatherBit'
import { getImg } from './js/pixAPI'
import { Cal } from './js/CalculatingTheDate'
 // import all the styles all styles must bee scss
import "./style/styles.scss"
import "./style/grid.scss"
import "./style/mobile.scss"
// export the functionlty
export {
    getCountyName ,
    getWeather,
    getImg,
    Cal
}
import img from "./media/world.png";

import { formHandler } from "./js/formHandler";
import { cal } from "./js/CalculatingTheDate";
import { update } from "./js/updateWebsite";
import { Geo } from "./js/GeoAPI";
import { weather } from "./js/WeatherAPI";
import { Image } from "./js/imageAPI";
// import all the styles all styles must bee scss
import "./style/styles.scss";
import "./style/mobile.scss";
// export the functionlty
export { cal, Image, formHandler, update, Geo, weather };

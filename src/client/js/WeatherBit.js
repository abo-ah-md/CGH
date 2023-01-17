const btn = document.getElementById("btn");
let url = 'http://api.weatherbit.io/v2.0/current?&city='
let key = "f2eaac0dbc164806862600c24068e26e";
// getting conrty names from Geo API
const weather = async (city) => {
    const res = await fetch(`${url}${city}&key=${key}`)
    try{
        const weatherData = await res.json();
      
        return weatherData;
    } catch (err){
        console.log('err' + err);
    }
}
export {weather}
const btn = document.getElementById("btn");
// getting conrty names from Geo API
const Geo = async (country) => {
    const res = await fetch(`http://api.geonames.org/searchJSON?maxRows=10&operator=OR&q=${country}&name=${country}&username=aboahmd`)

    try{
        const geodata = await res.json();
        return geodata;
    } catch (err){
        console.log('err' + err);
    }
}

export {Geo}
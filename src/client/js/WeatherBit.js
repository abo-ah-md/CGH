const btn = document.getElementById("btn");
let url = 'http://api.weatherbit.io/v2.0/current?&city='
let key = "f2eaac0dbc164806862600c24068e26e";
// getting conrty names from Geo API
const weather = async (city) => {
    const res = await fetch(`${url}${city}&key=${key}`)
    try{
        const data = await res.json();
      
        return data;
    } catch (err){
        console.log('err' + err);
    }
}
// posting data to server

const postData = async (url = '' , data = {} ) =>{
    
    const res = await fetch(url , {
        method: 'POST',
        credentials:'same-origin',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            temp:data.temp,
            feelTemp:data.feelTemp,
            description:data.description
        })
    });
    try{
        const newData = await res.json();
        return newData;
    } catch (err){
        console.log(err);
    }
}

//
const getWeather = () =>{
    btn.addEventListener('click' , () =>{
        const county = document.getElementById("county").value;
        weather(county)
        .then((data) =>{
            postData("http://localhost:5051/saveData" , {
                temp: data.data[0].temp,
                feelTemp: data.data[0].app_temp,
                description:data.data[0].weather.description
            })
        })
        .then(()=>{
            const update = async () => {
                const req = await fetch('http://localhost:5051/showData');
                try {
                    const getData = await req.json();
                    // update new entry values
                    if (getData.temp !== undefined  && getData.temp !== undefined && getData.description !==undefined) {
                        document.getElementById('temp').innerHTML = getData.temp;
                        document.getElementById("feelTemp").innerHTML = getData.feelTemp;
                        document.getElementById("description").innerHTML = getData.description;
                    }
                } catch (err) {
                    console.log('error', err);
                }
            };
        })
    })
}


export {getWeather};
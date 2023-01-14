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
/*
// posting data to server

const postData = async (url = '' , data = {} ) =>{
    const res = await fetch(url , {
        method: 'POST',
        credentials:'same-origin',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name:data.name,
            CountryName:data.CountryName
        })
    });
    try{
        const newData = await res.json();
        
        console.log(newData);
        return newData;}
         catch (err){
        console.log(err);
    }
}


//

const getCountyName = () =>{
    /*
    btn.addEventListener('click' , () =>{
        const county = document.getElementById("county").value;
        Geo(county)
        .then((geodata) =>{
            postData("http://localhost:5051/saveData" , {
                name: data.geonames[0].toponymName,
                CountryName: data.geonames[0].countryName
            })
        })
        .then(()=>{
           update()
        })
    })

    */



/*
const update = async () => {
    const req = await fetch('http://localhost:5051/showData');
    try {
        const getData = await req.json();
        // update new entry values
       
            console.log("sss");
            document.getElementById('name').innerHTML = getData.name;
            document.getElementById("Countyname").innerHTML = getData.CountryName;
        
    } catch (err) {
        console.log('error', err);
    }
}
*/




export {Geo}
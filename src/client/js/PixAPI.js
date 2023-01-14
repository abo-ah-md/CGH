const btn = document.getElementById("btn");
let url = `https://pixabay.com/api/?key=32618060-bd0271b93aa221540303c9942`

const image = async (img) => {
    const res = await fetch(`${url}&q=${img}&image_type=photo&pretty=true`)
    try{
        const data = await res.json();
        return data;
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
            counterImg:data.preURL,
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


const getImg = () =>{
    /*
    btn.addEventListener('click' , () =>{
        const county = document.getElementById("county").value;
        img(county)
        .then((data) =>{
            postData("http://localhost:5051/saveData" , {
                preURL: data.hits[0].webformatURL
            })
        })
        .then(()=>{
            update();
        })
    })
    



const update = async () => {
    const req = await fetch('http://localhost:5051/showData');
    try {
        const getData = await req.json();
        // update new entry values
        if (getData.counterImg !== undefined ) {
            document.getElementById("img").src = getData.counterImg
        }
    } catch (err) {
        console.log('error', err);
    }
};
*/
export { image }
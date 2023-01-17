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

export { image }
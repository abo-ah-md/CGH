export const update = async () => {
  try {
    const req = await fetch("http://localhost:5000/showData", {
      method: "GET",
      credentials: "same-origin",
    });
    const getData = await req.json();

    document.getElementById("img").src = getData.projectimageData.counterImg;

    if (
      getData.projectweatherData.temp !== undefined &&
      getData.projectweatherData.temp !== undefined &&
      getData.projectweatherData.description !== undefined
    ) {
      document.getElementById("temp").innerHTML =
        getData.projectweatherData.temp;
      document.getElementById("feelsTemp").innerHTML =
        getData.projectweatherData.feelTemp;
      document.getElementById("discribtion").innerHTML =
        getData.projectweatherData.description;
    }
    if (
      getData.projectgeoData.cityName != undefined &&
      getData.projectgeoData.CuntryName != undefined
    ) {
      document.getElementById("city").innerHTML =
        getData.projectgeoData.cityName;
      document.getElementById("country").innerHTML =
        getData.projectgeoData.CuntryName;
    }
  } catch (err) {
    console.log("error", err);
  }
};

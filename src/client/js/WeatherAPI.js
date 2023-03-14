
export let weather = async (langtitude,latitdude) => {
    try {
      let url = "http://api.weatherbit.io/v2.0/current?";
      let key = "267f6d9c0f954735963a93de4b326522";
  
      const res = await fetch(`${url}&lat=${latitdude}&lon=${langtitude}&key=${key}`, {
        method: "GET",
        credentials: "same-origin",
      });
      const weatherData = await res.json();
      
       fetch("http://localhost:5000/saveweatherData", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          temp: weatherData.data[0].temp,
          feelTemp: weatherData.data[0].app_temp,
          description: weatherData.data[0].weather.description,
        }),
      });
  
      return await weatherData;
    } catch (er) {
      console.log(er);
    }
  };
  
export let Geo = async (inputcity) => {
  try {
    const res = await fetch(
      `http://api.geonames.org/searchJSON?maxRows=10&operator=OR&q=${inputcity}&name=${inputcity}&username=aboahmd`,
      {
        method: "GET",
        credentials: "same-origin",
      }
    );

    let geodata = await res.json();

    await fetch("http://localhost:5000/savegeoData", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        langtitude: geodata.geonames[0].lng,
        latitude: geodata.geonames[0].lat,
        cityName: geodata.geonames[0].name,
        CuntryName: geodata.geonames[0].countryName,
      }),
    });
    return await geodata;
  } catch (er) {
    console.log(er);
  }
};

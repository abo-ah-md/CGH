export const Image = async (inputcity) => {
  let url = `https://pixabay.com/api/?key=32618060-bd0271b93aa221540303c9942`;
  try {
    const res = await fetch(
      `${url}&q=${inputcity}&image_type=photo&pretty=true`,
      {
        method: "GET",
        credentials: "same-origin",
      }
    );

    const data = await res.json();
    const ImgData = fetch("http://localhost:5000/saveimageData", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        preURL: data.hits[0].webformatURL,
      }),
    });
  } catch (er) {
    console.log(er);
  }
};

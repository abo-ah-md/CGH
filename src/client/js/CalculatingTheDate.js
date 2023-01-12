/*
calculat the date from now to the data selected
show date in page
show the compunt
*/
//vars
const btn = document.getElementById("btn");

const calc = () => {
  let expacted = document.getElementById("date").valueAsDate;
  let nowDate = document.getElementById("date").value;
  let date = new Date(expacted);
  let date2 = new Date();
  let difference = date.getTime() - date2.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  document.getElementById("counter").textContent = TotalDays;
  document.getElementById("showDate").innerHTML = nowDate;
};

const Cal = () => {
  btn.addEventListener("click", () => {
    calc();
  });
};

export { Cal };

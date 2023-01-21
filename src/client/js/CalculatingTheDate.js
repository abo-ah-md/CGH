export const cal = async ()  =>  {
  try{
  let DepartingDate = await document.getElementById("DepartingDate").value;
  let ReturnDate = await document.getElementById("ReturnDate").value;
  console.log(DepartingDate);
  console.log(ReturnDate);
   document.getElementById("ShowDepartingDate").innerHTML= DepartingDate;
   document.getElementById("ShowRetutnDate").innerHTML= ReturnDate;
  }
  catch(er){
    console.log(er);
  }
 
}
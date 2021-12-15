// const { default: axios } = require("axios");

    axios.get('/admin/dep')
     .then((resp)=>display(resp)).catch((err)=>{
       console.log('cant fetch to show');
     })

function display(resp){
  var z= '<table>'
  var a=1;
  for(var x in resp.data){
    if(a%2==0) {
      z+=`<td><input class="form-check-input" type="checkbox" id="${a}" name="department" value="${resp.data[x].dep_name}">
      <label class="form-check-label" for="${a}">${resp.data[x].dep_name}</label> </td></tr>`
    }
    else{
    z+=`<tr><td><input type="checkbox" id="${a}" name="department" value="${resp.data[x].dep_name}">
    <label for="${a}">${resp.data[x].dep_name}</label> </td>`
}
a++;
}
z+='</table>'
  document.querySelector('#labeled').innerHTML +=z;
}

/*
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
  <label class="form-check-label" for="flexCheckDefault">
    Default checkbox
  </label>
</div>
*/


// const { default: axios } = require("axios");

window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    axios.get('http://localhost:1337/dep')
     .then((resp)=>display(resp)).catch((err)=>{
       console.log('cant fetch to show');
     })
    })

function display(resp){
  var z= '<br><table>'
  var a=1;
  // console.log(resp.data);
  for(var x in resp.data){
    if(a%2==0) {
      z+=`<td><input type="checkbox" id="${a}" name="department" value="${resp.data[x].dep_name}">
      <label for="${a}">${resp.data[x].dep_name}</label> </td></tr>`
    }
    else{
    z+=`<tr><td><input type="checkbox" id="${a}" name="department" value="${resp.data[x].dep_name}">
    <label for="${a}">${resp.data[x].dep_name}</label> </td>`
}
a++;
}
z+='</table>'
console.log(z);
  document.querySelector('#labeled').innerHTML +=z;
}


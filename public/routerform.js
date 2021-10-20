// const { default: axios } = require("axios");

window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    axios.get('http://localhost:1337/dep')
     .then((resp)=>display(resp)).catch((err)=>{
       console.log('cant fetch to show');
     })
    })

function display(resp){
  var z= '<br>'
  var a=1;
  // console.log(resp.data);
  for(var x in resp.data){
    console.log(resp.data[x].dep_name);
    z+=`<input type="checkbox" id="${a}" name="department" value="${resp.data[x].dep_name}"></input>
    <label for="${a}"> ${resp.data[x].dep_name}</label><br>`
    a++;
  }
  document.querySelector('#labeled').innerHTML +=z;
}


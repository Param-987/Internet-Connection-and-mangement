
    axios.get('/router/dep')
     .then((resp)=> display(resp))
     .catch((err)=>{ console.log('cant fetch to show');
     })

function display(resp){
  var z= '<br><table>'
  var a=1;

  for(var x in resp.data){

      if(a%2==0) {
          z+=`<td><input type="radio" id="${a}" name="department" value="${resp.data[x].dep_name}">
          <label for="${a}">${resp.data[x].dep_name}</label> </td></tr>`
        }
        else{
        z+=`<tr><td><input type="radio" id="${a}" name="department" value="${resp.data[x].dep_name}">
        <label for="${a}">${resp.data[x].dep_name}</label> </td>`
    }
    a++;
  }
  z+='</table>'
  document.querySelector('#labeled').innerHTML +=z;
}


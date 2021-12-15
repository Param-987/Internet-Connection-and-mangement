var response;
    axios.get('/bbc/get')
     .then((resp)=>{ response  = resp;
       work(resp.data)
     }).catch((err)=>{
       console.log('cant fetch to show');
     })

function work(res){
    var iname = document.querySelector('#ispname');
    var z = ''
    for( x in res){
          z+= `<option value=${res[x].id}>${res[x].cname}</option>`
    }
    iname.innerHTML = z;
}
function func()
{ 
  var package = document.querySelector('input[type=radio][name=package]:checked').value;
  var isp = document.querySelector('#ispname').value
  var total = 0;
  var dur = document.querySelector('#dur').value
  for (x in response.data)
  {
    if(response.data[x].id== isp){
      if(package === 'monthly') total = response.data[x].monthly_cost * dur + response.data[x].setup_cost; 
      else if(package === 'annual') total = response.data[x].annual_cost * dur + response.data[x].setup_cost; 
      break;
    }  
    
  }
  document.querySelector('#cost').value = `₹${total}`;
}



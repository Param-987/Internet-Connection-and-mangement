
    axios.get('/router/get')
    .then((resp)=>{display(resp.data, resp.headers.control,'No router Installed') })
    .catch((err)=>console.log(err))


function display(res,ctrl,msg){
    var z='';
    if(res.length ==0) z +=`${msg}`
    var doc= document.querySelector('.main')
    var icon;
    var edit ;
    for( x in res){

        var paro = `'${res[x].rname}'`;
        var Mdate,rpdate,malfunct='';
        var ul = '<ul>'; 

        icon =`<button><a href="/router/delete/${res[x].rname}">
        <i class="fas fa-trash"></i></a></button>`
        edit = `<button onclick = fun(${paro})><i class="fas fa-edit"></i></button>`
        if(ctrl === 'user') {icon = '' ; edit = ''}
        z += `<div>
        <ul>
            <li>Router Name :  <span>${res[x].rname}</span></li>
            <li>Router Password: <span>${ res[x].rpassword }</span></li>
            <li>Department Install: <span>${ res[x].dep_install }</span></li>
            <li>Date of install: <span>${ (res[x].date_of_install).slice(0,10) }</span></li>
            </li>
        </ul>
        ${icon}${edit}
          
        <br>
    </div>`
    }
    doc.innerHTML = z;

   
}

function fun(x){
    var doc = document.querySelector('.hide')
    doc.style.display = 'inline-block';    
    axios.get(`/router/edit/${x}`)
    .then((resp)=>{ 
        var mdate,rd;
        document.getElementById('rname').value = resp.data[0].rname;
        document.getElementById('rpassword').value = resp.data[0].rpassword;
        document.getElementById('dep').value = resp.data[0].dep_install;
       document.querySelector('.Form').action = `/router/edit/update/${x}`
    })
    .catch((err)=>console.log(err))
    
}

function search(){
    var s = document.querySelector('#sear').value;
    axios.get(`/router/query?router=${s}`)
    .then((resp)=>{display(resp.data, resp.headers.control,'No router installed in that department...') })
    .catch((err)=>console.log(err))

}


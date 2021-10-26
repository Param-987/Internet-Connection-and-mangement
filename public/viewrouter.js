
window.addEventListener('load',(event)=>{
    axios.get('http://localhost:1337/router/get')
    .then((resp)=>display(resp.data))
    .catch((err)=>console.log(err))
})



function display(res){
    var z='';
    var doc= document.querySelector('.main')
    var icon;
    var edit ;
    for( x in res){

        var paro = `'${res[x].rname}'`;
        console.log(paro);
        var Mdate,rpdate,malfunct='';
        var ul = '<ul>'; 
        icon =`<button><a href="/router/delete/${res[x].rname}"><i class="fas fa-trash"></i></a></button>`
        edit = `<button onclick = fun(${paro})><i class="fas fa-edit"></i></button>`
        res[x].malfunction_date ? Mdate = (res[x].malfunction_date).slice(0,10) : Mdate ='Not Any'
        if(Mdate !== 'Not Any'){
            malfunct =`<li>Repaired Status: <span>${ res[x].rep_status }</span></li>`
            if(res[x].rep_status ==='Yes'){malfunct+=`<li>Repaired Date: <span>${ (res[x].rep_date).slice(0,10) }</span></li>`}
        }
        z += `<div>
        <ul>
            <li>Router Name :  <span>${res[x].rname}</span></li>
            <li>Router Password: <span>${ res[x].rpassword }</span></li>
            <li>Department Install: <span>${ res[x].dep_install }</span></li>
            <li>Date of install: <span>${ (res[x].Date_of_install).slice(0,10) }</span></li>
            <li>Malfunction date: <span>${ Mdate }</span></li>
            ${malfunct}
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
    doc.style.display = 'block';    
    axios.get(`http://localhost:1337/router/edit/${x}`)
    .then((resp)=>{ 
        var mdate,rd;
        document.getElementById('rname').value = resp.data[0].rname;
        document.getElementById('rpassword').value = resp.data[0].rpassword;
        document.getElementById('dep').value = resp.data[0].dep_install;
        document.getElementById('rname').value = resp.data[0].rname;
        document.getElementById('rs').value = resp.data[0].rep_status;
        if( resp.data[0].malfunction_date)  document.getElementById('Mdate').value = (resp.data[0].malfunction_date).slice(0,10);
        if( resp.data[0].rep_date)  document.getElementById('rd').value = (resp.data[0].rep_date).slice(0,10);
       document.querySelector('.Form').action = `/router/edit/update/${x}`
    })
    .catch((err)=>console.log(err))
    
}


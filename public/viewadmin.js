
window.addEventListener('load',(event)=>{
    axios.get('http://localhost:1337/admin/viewadmin/data')
    .then((resp)=>display(resp))
    .catch((err)=>console.log('data cant fetched'))
})



function display(resp){
    var z='';
    var {res1,res2} = resp.data;
    var doc= document.querySelector('.main')
    var icon;
    for( x in res1){
        var ul = '<ul>';
        let pass = '', edit = ''
        
        res1.length > 1 ? icon =`<button><a href="/admin/delete/${res1[x].emailid}"><i class="fas fa-trash"></i></a></button>`: icon =``;
        if(res1[x].emailid === resp.headers.emailid){ pass = `<li>Password : ${res1[x].password}</li>`;
        edit = `<button onclick = fun('${res1[x].emailid}')><i class="fas fa-edit"></i></button>` }
        for(y in res2){
            if(res1[x].emailid === res2[y].email){
                ul+=`<li>${res2[y].dep_head}</li>`
            }
        }
        ul+=`</u>`
        var str = res1[x].date_on;
        z += `<div>
        <ul>
            <li>Email Id :  <span>${ res1[x].emailid }</span></li>
            <li>Full Name: <span>${ res1[x].name }</span></li>
            ${pass}
            <li>Phone No: <span>${ res1[x].phone_no }</span></li>
            <li>Date on become admin: <span>${ str.slice(0,10) }</span></li>
            <li>Departments under control ${ul}
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
    axios.get(`http://localhost:1337/admin/edit/${x}`)
    .then((resp)=>{ 
        document.getElementById('email').value = resp.data[0].emailid;
        document.getElementById('name').value = resp.data[0].name;
        document.getElementById('phone').value = resp.data[0].phone_no;
        document.getElementById('password').value = resp.data[0].password;
        document.querySelector('.Form').action = `/admin/edit/update/${x}`
    })
    .catch((err)=>console.log(err))
    
    doc.style.display = 'block';
}
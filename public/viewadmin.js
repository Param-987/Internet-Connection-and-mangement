window.addEventListener('load',(event)=>{
    axios.get('http://localhost:1337/admin')
    .then((resp)=>display(resp))
    .catch((err)=>console.log('data cant fetched'))
})



function display(resp){
    var z='';

    var doc= document.querySelector('.main')
    const {res1,res2} = resp.data;
    var icon;
    var edit ;
    console.log(icon);
    for( x in res1){
        var ul = '<ul>'; 
        res1.length > 1 ? icon =`<a href="/admin/delete/${res1[x].emailid}"><i class="fas fa-trash"></i></a>`: icon =``;
        edit = `<a href="/admin/edit/${res1[x].emailid}"><i class="fas fa-edit"></i></a>`
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
            <li>Phone No: <span>${ res1[x].phone_no }</span></li>
            <li>Date on become admin: <span>${ str.slice(0,10) }</span></li>
            <li>Departments under control ${ul}
            </li>
        </ul>
        <span class="icons">${icon}</span><span clas="icons">${edit}</span>
          
        <br>
    </div>`
    }
    console.log(ul);
    doc.innerHTML = z;

   
}
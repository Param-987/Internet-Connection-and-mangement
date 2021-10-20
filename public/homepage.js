let pos = 0;
let a=0;

function slider(){
    document.querySelectorAll('.fuck')[0].style.backgroundColor="yellow";
}

function rightMove() {
    document.querySelectorAll('.fuck')[a+1].style.backgroundColor="yellow";
    document.querySelectorAll('.fuck')[a].style.backgroundColor="#9D9D9D";
   if(a>=0) document.querySelector('.goleft').removeAttribute('disabled')
 if(a==3) document.querySelector('.goright').setAttribute('disabled','true')

let id = null;
const elem = document.getElementById("out");
clearInterval(id);
id = setInterval(frame, 5);
function frame() {
if (pos == 1500*(a+1)) {  a++; console.log(a);
clearInterval(id);
} else {
pos+=10;
elem.style.right = pos + 'px';
}}}


function leftMove() {
    document.querySelectorAll('.fuck')[a-1].style.backgroundColor="yellow";
    document.querySelectorAll('.fuck')[a].style.backgroundColor="#9D9D9D";
if(a!=3) document.querySelector('.goright').removeAttribute('disabled')
if(a==0) document.querySelector('.goleft').setAttribute('disabled','true')
let id = null;
clearInterval(id);
id = setInterval(frame, 5);
function frame() {  
    if (pos == 1500*(a-1)) {   a--;console.log(a);
if(a==0) document.querySelector('.goleft').setAttribute('disabled','true')
clearInterval(id);
} else {
pos-=10;
document.getElementById("out").style.right = pos + 'px';
}
}
}
  axios
    .get("/bbc/data")
    .then((resp) => display(resp.data))
    .catch((err) => console.log(err));

function display(res) {
  var doc = document.querySelector(".main");
  var str = "";
  for (x in res) {
      var z,pack;
      res[x].package ==='monthly' ?  z='Months' :z = 'Years'
      res[x].package ==='monthly' ?  pack='Monthly' :pack = 'Annual'
    str +=`<table><tr>
        <td> Company Name : ${res[x].cname}</td>
        <td> Offer Name : ${res[x].offer}</td></tr><tr>
        <td> Internet Speed : ${res[x].dspeed}</td>
        <td> Setup Cost : ₹${res[x].setup_cost}</td></tr><tr>
        <td> Annual Cost : ₹${res[x].annual_cost}</td>
        <td> Monthly Cost : ₹${res[x].monthly_cost}</td></tr><tr>
        <td> Selected Package : ${pack}</td>
        <td> Plan Starts from : ${(res[x].date_from).slice(0,10)}</td></tr>
        <tr><td> Plan Expires at  : ${(res[x].date_to).slice(0,10)}</td>
        <td> Money Paid  : ${res[x].cost}</td></tr>
        <tr><td> Plan Expires at  : ${res[x].duration} ${z}</td></tr>
        </table><br><br><br> `;
  }
  doc.innerHTML = str;
}

var x = 0;
function func(id) {
  document.querySelector(".meter").disabled = false;
  setGaugeValue(gaugeElement, 0);
}
function now() {
  x = 0;
  document.querySelector(".meter").disabled = true;
  var id = setInterval(() => {
    x += 0.00667;
    setGaugeValue(gaugeElement, x);
    if (x >= 1) {
      func(id);
      clearInterval(id);
    }
  }, 87.1);
};
const gaugeElement = document.querySelector(".gauge");

function setGaugeValue(gauge, value) {
  if (value < 0 || value > 1) {
    return;
  }

  gauge.querySelector(".gauge__fill").style.transform = `rotate(${
    value / 2
  }turn)`;
  gauge.querySelector(".gauge__cover").textContent = `${Math.round(
    value * 101
  )}%`;
}

function render() {
  axios
    .get("http://localhost:1337/api/speed")
    .then((resp) => {
      document.querySelector(
        ".content"
      ).innerHTML = `Internet Speed is ${resp.data.toFixed(3)} mbps`;
      console.log(resp);
    })
    .catch((err) => {
      console.log(err);
    });
};

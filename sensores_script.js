var temperatureGauge;
var humidityGauge; 
var updateTime = 2000;

document.addEventListener("DOMContentLoaded", function(event) {
  temperatureGauge = new JustGage({
      id: "temperatureGauge",
      value: 24.5, // Sample value, replace with actual data
      min: 0,
      max: 50,
      title: "Temperatura",
      label: "Temperatura °C",
      valueMinFontSize : 26,
      labelMinFontSize : 18,
      minLabelMinFontSize: 18,
      maxLabelMinFontSize: 18,
      decimals: 1,
    });

  humidityGauge = new JustGage({
      id: "humidityGauge",
      value: 40.2, // Sample value, replace with actual data
      min: 0,
      max: 100,
      title: "Humedad",
      label: "Humedad %",
      valueMinFontSize : 26,
      labelMinFontSize : 18,
      minLabelMinFontSize: 18,
      maxLabelMinFontSize: 18,
      decimals: 1,
  });

});

//Function to request temperature data
function updateGauge(){
  fetch('http://esp-home.local/sensor?type=temp')
    .then( response => {
      return response.text()
    })
    .then(data => {
      temperatureGauge.refresh(data);
    })
    .catch(error => console.error('Error while fetching data: ',error));
}

//Function to request humidity data
function updateGaugeH(){
  fetch('http://esp-home.local/sensor?type=humi')
    .then( response => {
      return response.text()
    })
    .then(data => {
      humidityGauge.refresh(data);
    })
    .catch(error => console.error('Error while fetching data: ',error));
}

setInterval(updateGauge, updateTime);
setInterval(updateGaugeH,updateTime);
document.addEventListener("DOMContentLoaded", function(event) {
  var temperatureGauge = new JustGage({
      id: "temperatureGauge",
      value: 24, // Sample value, replace with actual data
      min: 0,
      max: 50,
      title: "Temperatura",
      label: "Temperatura °C",
      valueMinFontSize : 30,
      labelMinFontSize : 18,
    });

  var humidityGauge = new JustGage({
      id: "humidityGauge",
      value: 40, // Sample value, replace with actual data
      min: 0,
      max: 100,
      title: "Humedad",
      label: "Humedad %",
      valueMinFontSize : 30,
      labelMinFontSize : 18,
  });

  // Here, you can add code to update these gauges with real-time data if needed.
});
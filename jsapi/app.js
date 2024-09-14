document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    const apiKey = '';

    if (city === "") {
        alert("Por favor, ingresa el nombre de una ciudad.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.cod === "404") {
            alert("Ciudad no encontrada.");
            return;
        }
        
        // Actualizar la información en la página
        document.getElementById('cityName').innerText = `Clima en ${data.name}, ${data.sys.country}`;
        document.getElementById('temperature').innerText = `Temperatura: ${data.main.temp}°C`;
        document.getElementById('description').innerText = `Descripción: ${data.weather[0].description}`;
    })
    .catch(error => {
        console.error("Error al obtener el clima:", error);
    });
});
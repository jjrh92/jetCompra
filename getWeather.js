// Inicio

// Iniciar Marquesina con la libreria marqueefy y agregamos datos de libreria y api.

const marqueefyList = Array.prototype.slice.call (document.querySelectorAll ('.marqueefy'));

const marqueefyInstances = marqueefyList.map (m => {

  return new marqueefy.Marqueefy(m, {direction: 'left', speed: 37})

});

// Seccion de Luxon

const DateTime = luxon.DateTime;
const dt = DateTime.now();
const texto_marquesina = document.getElementById ("texto_marquesina");

// Seccion de WeatherAPI para mostrar informacion externa en nuestro sitio

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '50a1055ce9msh3e4c161c1e868a1p12e824jsn4becf68ba32c',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=iata%3AEZE', options)
	.then(response => response.json())
	.then(response => {
		
		// console.log (response)

		const p = document.createElement ('p');
		p.innerText = `El aeropuerto de Ezeiza se encuentra ubicado en ${response.location.country} en las coordenadas LAT ${response.location.lat} y LON ${response.location.lon}. La temperatura actual es de ${response.current.temp_c}°C. Vientos de ${response.current.wind_kph} Km/h en dirección ${response.current.wind_dir} con presión barométrica de ${response.current.pressure_mb} milibares.`;


		texto_marquesina.append(p);
	
	})
	.catch(err => console.error(err));


// Texto final de marquesina

texto_marquesina.innerText = "Bienvenid@ a JetCompra, hoy es " +dt.setLocale('es').toLocaleString(DateTime.DATE_FULL)+".";

// Fin

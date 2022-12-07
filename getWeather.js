// Seccion de Luxon

const DateTime = luxon.DateTime;
const dt = DateTime.now();
const texto_marquesina = document.getElementById ("texto_marquesina");

// Seccion de WeatherAPI para mostrar informacion externa en nuestro sitio

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '50a1055ce9msh3e4c161c1e868a1p12e824jsn4becf68ba32c',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
	}

};


fetch ('https://weatherapi-com.p.rapidapi.com/current.json?q=iata%3AEZE', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));



let metarEzeiza = 0;

// Texto final de marquesina

texto_marquesina.innerText = "Bienvenid@ a JetCompra, hoy es " +dt.setLocale('es').toLocaleString(DateTime.DATE_FULL)+". El metar en el aeropuerto de Ezeiza es "+metarEzeiza+ ".";


// Fin
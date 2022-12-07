// Inicio

// AVIONES

const productos = [
    // Civiles
    {
        id: "civ-01",
        titulo: "Gulfstream 5",
        imagen: "./media/civ/01.jpg",
        categoria: {
            nombre: "Civiles",
            id: "civiles",
        },
        precio: 5000
    },
    {
        id: "civ-02",
        titulo: "HA-420 HondaJet",
        imagen: "./media/civ/02.jpg",
        categoria: {
            nombre: "Civiles",
            id: "civiles",
        },
        precio: 3700
    },
    {
        id: "civ-03",
        titulo: "Boeing Business Jet",
        imagen: "./media/civ/03.jpg",
        categoria: {
            nombre: "Civiles",
            id: "civiles",
        },
        precio: 7700
    },
    {
        id: "civ-04",
        titulo: "Embraer Phenom 300",
        imagen: "./media/civ/04.jpg",
        categoria: {
            nombre: "Civiles",
            id: "civiles",
        },
        precio: 5300
    },

    // Militares
    {
        id: "mil-01",
        titulo: "Dassault Mirage 2000",
        imagen: "./media/mil/01.jpg",
        categoria: {
            nombre: "Militares",
            id: "militares",
        },
        precio: 9100
    },
    {
        id: "mil-02",
        titulo: "F-16 Block 15 OCU",
        imagen: "./media/mil/02.jpg",
        categoria: {
            nombre: "Militares",
            id: "militares",
        },
        precio: 14000
    },
    {
        id: "mil-03",
        titulo: "IA-58 PUCARÁ",
        imagen: "./media/mil/03.jpg",
        categoria: {
            nombre: "Militares",
            id: "militares",
        },
        precio: 8900
    },
    {
        id: "mil-04",
        titulo: "OV-10 Bronco",
        imagen: "./media/mil/04.jpg",
        categoria: {
            nombre: "Militares",
            id: "militares",
        },
        precio: 6500
    },
    // TurboHelices
    {
        id: "turbo-01",
        titulo: "King Air 350",
        imagen: "./media/turbo/01.jpg",
        categoria: {
            nombre: "Turbo",
            id: "turbo",
        },
        precio: 4900
    },
    {
        id: "turbo-02",
        titulo: "ATR 72",
        imagen: "./media/turbo/02.jpg",
        categoria: {
            nombre: "Turbo",
            id: "turbo",
        },
        precio: 5600
    },
    {
        id: "turbo-03",
        titulo: "Cessna SkyCourier",
        imagen: "./media/turbo/03.jpg",
        categoria: {
            nombre: "Turbo",
            id: "turbo",
        },
        precio: 4100
    },
    {
        id: "turbo-04",
        titulo: "Beechcraft Denali",
        imagen: "./media/turbo/04.jpg",
        categoria: {
            nombre: "Turbo",
            id: "turbo",
        },
        precio: 6800
    },
];

const contenedorProductos = document.querySelector ("#contenedor-productos");
const botonesCategorias = document.querySelectorAll (".boton-categoria");
const tituloPrincipal = document.querySelector ("#titulo-principal");
let botonesAgregar = document.querySelectorAll (".producto-agregar");
const numerito = document.querySelector ("#numerito");

function cargarProductos (productosElegidos) {

    function luegoDe2Segundos () {

        return new Promise (resolve => {

          setTimeout (() => {

            contenedorProductos.innerHTML = "";

            productosElegidos.forEach (producto => {
        
                const div = document.createElement ("div");
                div.classList.add ("producto");
                div.innerHTML = `
                    <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="producto-precio">$${producto.precio}</p>
                        <button class="producto-agregar" id="${producto.id}">Enviar al Hangar</button>
                    </div>
                `;
        
                contenedorProductos.append (div);
            })
        
            actualizarBotonesAgregar ();

            resolve ('Carga exitosa');

          }, 2000);

        });

      }
      
    async function llamarAsync () {

    console.log ('Cargando catalogo');
    const result = await luegoDe2Segundos ();
    console.log (result);

    }
      
    llamarAsync ();
    
}

cargarProductos (productos);

botonesCategorias.forEach (boton => {

    boton.addEventListener ("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove ("active"));
        e.currentTarget.classList.add ("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todas las Aeronaves";
            cargarProductos(productos);
        }

    })
});


function actualizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll (".producto-agregar");

    botonesAgregar.forEach (boton => {
        boton.addEventListener ("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem ("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse (productosEnCarritoLS);
    actualizarNumerito ();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito (e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find (producto => producto.id === idBoton);

    if(productosEnCarrito.some (producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;

    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push (productoAgregado);
    }

    actualizarNumerito ();

    localStorage.setItem ("productos-en-carrito", JSON.stringify (productosEnCarrito));

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Enviado al hangar'
      })
}

function actualizarNumerito () {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

// Efecto de cambio de color en el logo

let logo_img = document.getElementById ("logo_img");

logo_img.onmouseenter = () => {

logo_img.src = "./media/logo_.jpg"
  
}
  
logo_img.onmouseleave = () => {
  
logo_img.src = "./media/logo.jpg"
  
}

// Iniciar Marquesina con la libreria marqueefy y agregamos datos de libreria y api.

const marqueefyList = Array.prototype.slice.call (document.querySelectorAll ('.marqueefy'));

const marqueefyInstances = marqueefyList.map (m => {

  return new marqueefy.Marqueefy(m, {direction: 'left', speed: 60})

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

fetch('https://weatherapi-com.p.rapidapi.com/forecast.json?q=BUENOS%20AIRES&days=1&lang=ES&dt=2022-12-09', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

// Texto final de marquesina

texto_marquesina.innerText = "Bienvenid@ a JetCompra, hoy es " +dt.setLocale('es').toLocaleString(DateTime.DATE_FULL)+".";


// Fin


/*

PROTIPS DE TONY EN LA ULTIMA CLASE SE DEBE ENTREGAR.

Objetos y Arrays. Métodos de Arrays.
Funciones y condicionales.
Generación del DOM de forma dinámica. Eventos.
Sintaxis avanzada.
Al menos una librería de uso relevante para el proyecto.
Manejo de promesas con fetch. 
Carga de datos desde un JSON local o desde una API externa.

*/
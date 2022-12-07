// Inicio

const contenedorProductos = document.querySelector ("#contenedor-productos");
const botonesCategorias = document.querySelectorAll (".boton-categoria");
const tituloPrincipal = document.querySelector ("#titulo-principal");
let botonesAgregar = document.querySelectorAll (".producto-agregar");
const numerito = document.querySelector ("#numerito");

function cargarProductos (productosElegidos) {

    function luegoDe2Segundos () {

        return new Promise (resolve => {

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
    actualizarContadorCarrito ();
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

    actualizarContadorCarrito ();

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

function actualizarContadorCarrito () {
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
let productosEnCarrito = localStorage.getItem ("productos-en-carrito");
productosEnCarrito = JSON.parse (productosEnCarrito);
const contenedorCarritoVacio = document.querySelector ("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector ("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector ("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector ("#carrito-comprado");
let botonesEliminar = document.querySelectorAll (".carrito-producto-eliminar");
const botonVaciar = document.querySelector ("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector ("#total");
const botonComprar = document.querySelector ("#carrito-acciones-comprar");


function cargarProductosCarrito () {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add ("disabled");
        contenedorCarritoProductos.classList.remove ("disabled");
        contenedorCarritoAcciones.classList.remove ("disabled");
        contenedorCarritoComprado.classList.add ("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach (producto => {
    
            const div = document.createElement("div");
            div.classList.add ("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Aeronave</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    } else {
        contenedorCarritoVacio.classList.remove ("disabled");
        contenedorCarritoProductos.classList.add ("disabled");
        contenedorCarritoAcciones.classList.add ("disabled");
        contenedorCarritoComprado.classList.add ("disabled");

        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Tu hangar esta vacio, puedes volver al catalogo si deseas.',
            showConfirmButton: false,
            timer: 2500
          })
    }

    actualizarBotonesEliminar ();
    actualizarTotal ();
}

cargarProductosCarrito ();

function actualizarBotonesEliminar () {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach (boton => {
        boton.addEventListener ("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito (e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice (index, 1);
    cargarProductosCarrito ();

    localStorage.setItem ("productos-en-carrito", JSON.stringify (productosEnCarrito));

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha eliminado satisfactoriamente',
        showConfirmButton: false,
        timer: 700
      })

}

botonVaciar.addEventListener ("click", vaciarCarrito);
function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem ("productos-en-carrito", JSON.stringify (productosEnCarrito));
    cargarProductosCarrito ();

    Swal.fire({
        icon: 'success',
        title: 'Vaciar Hangar',
        text: 'Su hangar ha sido vaciado correctamente!',
        footer: '<a href="index.html">Volver al catálogo?</a>'
      })
}


function actualizarTotal () {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener ("click", comprarCarrito);
function comprarCarrito () {

    productosEnCarrito.length = 0;
    localStorage.setItem ("productos-en-carrito", JSON.stringify (productosEnCarrito));
    
    contenedorCarritoVacio.classList.add ("disabled");
    contenedorCarritoProductos.classList.add ("disabled");
    contenedorCarritoAcciones.classList.add ("disabled");
    contenedorCarritoComprado.classList.remove ("disabled");

    Swal.fire ({
    
        icon: 'success',
        title: 'Se ha realizado la compra.',
        text: 'Felices vuelos.',
        allowOutsideClick: false,
        allowEnterKey: true,
        
      });

}

// Efecto de cambio de color en el logo

let logo_img = document.getElementById ("logo_img");

logo_img.onmouseenter = () => {

logo_img.src = "./media/logo_.jpg"
  
}
  
logo_img.onmouseleave = () => {
  
logo_img.src = "./media/logo.jpg"
  
}

// Iniciar Marquesina

const marqueefyList = Array.prototype.slice.call (document.querySelectorAll ('.marqueefy'));

const marqueefyInstances = marqueefyList.map (m => {

  return new marqueefy.Marqueefy(m, {direction: 'left', speed: 77})

});

// Cosas de Luxon para agregar a la marquesina

const DateTime = luxon.DateTime;
const dt = DateTime.now();
const texto_marquesina = document.getElementById ("texto_marquesina");
texto_marquesina.innerText = "Bienvenid@ a JetCompra, hoy es " +dt.setLocale('es').toLocaleString(DateTime.DATE_FULL)+".";
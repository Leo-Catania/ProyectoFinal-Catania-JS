
let productos = [
    { id: 1, nombre: "Resistencia", precio: 100, cantidad: 100, imagen: "../imagenes/resistencia.jpeg" },
    { id: 2, nombre: "Diodo", precio: 100, cantidad: 100, imagen: "../imagenes/diodo.jpg" },
    { id: 3, nombre: "Capacitor", precio: 100, cantidad: 100, imagen: "../imagenes/capacitor.jpg" },
    { id: 4, nombre: "Inductor", precio: 100, cantidad: 100, imagen: "../imagenes/inductor.jpg" }
];

const columnas = document.getElementsByClassName("container-papa-columna");
const divCarrito = document.getElementById("carrito");

// Renderizar los productos en sus columnas
productos.forEach((producto, index) => {
    const divProducto = document.createElement("div");
    divProducto.classList.add("producto");

    divProducto.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${producto.imagen}" class="card-img-top" alt="...">
            <div class="card-body d-flex justify-content-center">
                <h4>${producto.nombre}</h4>
            </div>
            <ul class="list-group list-group-flush">
                <div class="card-body d-flex justify-content-center">
                    <p class="m-2">Precio: $${producto.precio}</p>
                    <p class="m-2">Cantidad: ${producto.cantidad}</p>
                </div>
            </ul>
            <div class="card-body d-flex justify-content-center">
                <a href="#" class="btn btn-primary boton-comprar">Comprar</a>
            </div>
        </div>
    `;

    if (columnas[index]) {
        columnas[index].appendChild(divProducto);
    }
});

function mostrarTotal(carrito) {
    const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);

    let divTotal = document.getElementById("total-carrito");
    if (!divTotal) {
        divTotal = document.createElement("div");
        divTotal.id = "total-carrito";
        divTotal.classList.add("col-lg-6");
        divCarrito.appendChild(divTotal);
    }

    divTotal.innerHTML = `
        <div class="">
            <div class="card producto-div" style="width: 25rem;">    
                <div class="card-body d-flex justify-content-center align-items-center">
                    <h5>Total: $${total}</h5>
                </div>
            </div>
        </div>
    `;
}

function renderizarCarrito() {
    divCarrito.innerHTML = "";
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoGuardado.forEach((producto, index) => {
        const productoEnCarrito = document.createElement("div");
        productoEnCarrito.classList.add("producto-en-carrito");
        productoEnCarrito.innerHTML = `
            <div class="card producto-div" style="width: 25rem;">    
                <div class="card-body d-flex justify-content-center align-items-center">
                    <h4>${producto.nombre}</h4>
                    <p class="m-2">Precio: $${producto.precio}</p>
                    <a href="#" class="btn btn-danger boton-eliminar" data-index="${index}">X</a>
                </div>
            </div>
        `;
        divCarrito.appendChild(productoEnCarrito);
    });

    mostrarTotal(carritoGuardado);
    const botonesEliminar = document.getElementsByClassName("boton-eliminar");

    for (let i = 0; i < botonesEliminar.length; i++) {
        botonesEliminar[i].addEventListener("click", function (e) {
            
            
            Swal.fire({
                title: "¿Estas seguro?",
                text: "No podras recuperar esto",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, borralo!",
                cancelButtonText: "Cancelar"
                }).then((result) => {
                if (result.isConfirmed) {
                    e.preventDefault();
                    const index = parseInt(this.getAttribute("data-index"));
                    carritoGuardado.splice(index, 1);
                    localStorage.setItem("carrito", JSON.stringify(carritoGuardado));
                    renderizarCarrito();
                    Swal.fire({
                        title: "Borrado!",
                        text: "Tu producto ha sido eliminado.",
                        icon: "success"
    });
}
});
        });
    }
    
}

// Escuchar clicks en botones "Comprar" dinámicamente
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("boton-comprar")) {
        e.preventDefault();
        const index = Array.from(document.getElementsByClassName("boton-comprar")).indexOf(e.target);
        const producto = productos[index];
        Swal.fire({
            title: "Agregado al carrito!!!",
            icon: "success",
            draggable: true
            });

        const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
        carritoActual.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carritoActual));
        renderizarCarrito(); // Volver a renderizar
    }
});

// Renderizar el carrito al cargar la página
renderizarCarrito();
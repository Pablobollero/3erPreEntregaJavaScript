// Clase que define un servicio
class Servicio{
    constructor(id,nombre,valor,img){
        // Propiedades del servicio
        this.id = id
        this.nombre = nombre
        this.cantidad = 1
        this.valor = valor
        this.img = img
    }
}

// Clase que maneja el carrito de compras
class Carrito{
    constructor(){
        // Lista de servicios en el carrito
        this.listaCarrito = []
    }
    // Métodos para interactuar con el Local Storage
    obtenerLocalStorage(){
        this.listaCarrito = JSON.parse(localStorage.getItem("listaCarrito")) || []
    }
    guardarEnStorage(){
        let listaCarritoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito", listaCarritoJSON)
    }
    guardarPersonaEnStorage(persona) {
        localStorage.setItem("persona", JSON.stringify(persona));
    }

    cargarPersonaDesdeStorage() {
        const personaJSON = localStorage.getItem("persona");
        return JSON.parse(personaJSON);
    }

    mostrarDatosPersonaEnFormulario() {
        const persona = this.cargarPersonaDesdeStorage();
        if (persona) {
            document.getElementById("inputName").value = persona.nombre;
            document.getElementById("inputSurname").value = persona.apellido;
            document.getElementById("inputEmail").value = persona.email;
        }
    }

    // Agregar un servicio al carrito
    agregar(agregarServicio){
        let servicioEncontrado = this.listaCarrito.some(servicio => servicio.id == agregarServicio.id)
        if(servicioEncontrado){
        let servicio = this.listaCarrito.find(servicio => servicio.id == agregarServicio.id)
        servicio.cantidad++
    }else{
        this.listaCarrito.push(agregarServicio)
    } 
    }
    // Eliminar un servicio del carrito
    eliminar(servicioAQuitar) {
        let servicio = this.listaCarrito.find(servicio =>servicio.id == servicioAQuitar)
        let indice = this.listaCarrito.indexOf(servicio)
        this.listaCarrito.splice(indice,1)
    }
    // Mostrar servicios en el carrito
    mostrarServicios() {
        let contenedorCarrito = document.getElementById(`contenedorCarrito`)
        contenedorCarrito.innerHTML = ""
        let costoTotal = 0; // Variable para calcular el costo total
    
        this.listaCarrito.forEach(servicio => {
            let valorTotal = servicio.valor * servicio.cantidad; // Calcula el valor total por producto
            costoTotal += valorTotal; // Agrega el valor total al costo total
    
            contenedorCarrito.innerHTML += 
            `<div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${servicio.img}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${servicio.nombre}</h5>
                        <p class="card-text">Cantidad: <button id="minus-${servicio.id}" class="btn btn-secondary btn-sm"><i class="fa-solid fa-minus" style="color: #ff0400;"></i></button>  ${servicio.cantidad}  <button id="plus+${servicio.id}" class="btn btn-secondary btn-sm"><i class="fa-solid fa-plus" style="color: #4d9e42;"></i></button></p>
                        <p class="card-text">Precio: $${servicio.valor}</p>
                        <figure>
                        <button class="btn" id="eliminar-${servicio.id}"><img class="deleteIcon" src="../img/Icons/trash-can-regular.svg" alt="Delete Item Icon"></button>
                        <figcaption>Quitar del carrito</figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </div>`})
        // Muestra el  total en carrito
    const totalCarrito = document.getElementById("totalCarrito");
    totalCarrito.textContent = `Total en Carrito: $${costoTotal}`;
        // Evento eliminar
        this.listaCarrito.forEach(servicio => {
            let btnEliminar = document.getElementById(`eliminar-${servicio.id}`);

            btnEliminar.addEventListener("click", () => {
                this.eliminar(servicio);
                this.guardarEnStorage();
                this.mostrarServicios();
            });
        });

        // Evento minus
        this.listaCarrito.forEach(servicio => {
            let btnMinus = document.getElementById(`minus-${servicio.id}`);
            btnMinus.addEventListener("click", () => {
                if (servicio.cantidad > 1) {
                    servicio.cantidad--;
                    this.guardarEnStorage();
                    this.mostrarServicios();
                } else {
                    this.eliminar(servicio); // Elimina el producto si la cantidad llega a 0
                    this.guardarEnStorage();
                    this.mostrarServicios();
                }
            });
        });

        // Evento plus
        this.listaCarrito.forEach(servicio => {
            let btnPlus = document.getElementById(`plus+${servicio.id}`)
            btnPlus.addEventListener("click", () => {
                servicio.cantidad++;
                this.guardarEnStorage();
                this.mostrarServicios();
            });
        });
    }
    // Finalizar la compra
    finalizarCompra() {
        const FINALIZAR_COMPRA = document.getElementById("finalizarCompra");
        FINALIZAR_COMPRA.addEventListener("click", () => {
            let totalDeCompra = 0;
            this.listaCarrito.forEach(servicio => {
                totalDeCompra += servicio.valor * servicio.cantidad;
            });

            this.listaCarrito = [];
            localStorage.removeItem("listaCarrito");
            this.mostrarServicios();

            let contenedorCarrito = document.getElementById(`contenedorCarrito`);
            const totalCarrito = document.getElementById("totalCarrito");
            const persona = this.cargarPersonaDesdeStorage();

            if (totalDeCompra > 0) {
                contenedorCarrito.innerHTML += `<h3 id="mensajeDeCompra">FELICIDADES ${persona.nombre} COMPRA EXITOSA!</h3>\n\n<h4 id="costoDecompra">Costo Total: $${totalDeCompra}</h4>`;
                totalCarrito.style.display = "none";
                // Agregar evento al botón "Cerrar" para reiniciar y cerrar
            const seguirComprandoBtn = document.getElementById("seguirComprando");
            seguirComprandoBtn.textContent = "Cerrar";

            // Ocultar el botón "Finalizar Compra"
            FINALIZAR_COMPRA.style.display = "none";
    
            // Evento al botón "Cerrar"
            seguirComprandoBtn.addEventListener("click", () => {
                localStorage.clear(); // Remover todos los datos del Local Storage
                this.listaCarrito = []; // Limpiar el carrito en memoria
                this.mostrarServicios(); // Mostrar el carrito vacío en la página
                this.mostrarDatosPersonaEnFormulario(); // Limpiar el formulario en la página
                
                // Borrar los valores ingresados en los campos del formulario
                document.getElementById("inputName").value = "";
                document.getElementById("inputSurname").value = "";
                document.getElementById("inputEmail").value = "";
            });
            } else {
                contenedorCarrito.innerHTML += `<h3 id="mensajeDeCompra">${persona.nombre} AGREGUE PRODUCTOS PARA COMPRAR!</h3>`;
                totalCarrito.style.display = "none";
            }

            const cerrarModalBtn = document.getElementById("cerrarModal");
            if (cerrarModalBtn) {
                cerrarModalBtn.addEventListener("click", () => {
                    localStorage.removeItem("persona"); // Remover los datos del formulario del Local Storage
                    localStorage.removeItem("listaCarrito"); // Remover el carrito del Local Storage
                    this.listaCarrito = []; // Limpiar el carrito en memoria
                    this.mostrarServicios(); // Mostrar el carrito vacío en la página
                    this.mostrarDatosPersonaEnFormulario(); // Limpiar el formulario en la página
                });
            }
        });
    }}

// Clase que controla los productos y su renderización en la página
class ProductController{
    constructor(){
        // Lista de servicios disponibles
        this.listaServicios = []
    }
    // Agregar un servicio a la lista
    agregar(servicio){
        this.listaServicios.push(servicio)
    }
    // Renderizar servicios en el DOM
    renderizarServiciosDOM(){
        let contenedorServicios = document.getElementById("contenedorServicios")
        this.listaServicios.forEach(servicio => {
            contenedorServicios.innerHTML += `<div class="card rounded-5 bg-secondary bg-opacity-75">
            <img src="${servicio.img}" class="card-img-top mx-auto d-block imgServicio" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center">${servicio.nombre}</h5>
                <p class="card-text text-center">$${servicio.valor}</p>
                <button id="aC-${servicio.id}" class="btn btn-primary">Agregar al carrito</button>
            </div>
        </div>`
        })
        //Evento del boton agregar al carrito.
        this.listaServicios.forEach( servicio => {
            const btn = document.getElementById(`aC-${servicio.id}`)
            btn.addEventListener("click", () => {
                CARRITO.agregar(servicio)
                CARRITO.guardarEnStorage()
                CARRITO.mostrarServicios()
            })
        })
    }
}
// ... Código anterior ...

fetch('/js/datos.json') 
    .then(response => response.json())
    .then(data => {
        data.forEach(servicioData => {
            const servicio = new Servicio(
                servicioData.id,
                servicioData.nombre,
                servicioData.valor,
                servicioData.img
            );
            PRODCONTROLLER.agregar(servicio);
        });
    })
    .catch(error => {
        console.error('Error al cargar datos de servicios:', error);
    });

// Instancias de servicios
const SERV1 = new Servicio(1, "Acompañamiento", 30, "../img/Icons/acompaniamiento.svg")
const SERV2 = new Servicio(2, "Via Judicial", 35, "../img/Icons/viaJudicial.svg")
const SERV3 = new Servicio(3, "Asseverazioni", 40, "../img/Icons/asseverazioni.svg")
const SERV4 = new Servicio(4, "Control de Carpeta", 45, "../img/Icons/controlCarpeta.svg")

// Evento para capturar y guardar los datos de la persona
const formCreacionUsuario = document.getElementById("formCreacionUsuario");
formCreacionUsuario.addEventListener("submit", function(event) {
    event.preventDefault();

    const inputName = document.getElementById("inputName").value;
    const inputSurname = document.getElementById("inputSurname").value;
    const inputEmail = document.getElementById("inputEmail").value;

    const persona = {
        nombre: inputName,
        apellido: inputSurname,
        email: inputEmail
    };

    CARRITO.guardarPersonaEnStorage(persona);
    // Mostrar un mensaje o realizar alguna acción adicional si es necesario
});

// Instancia de Carrito
const CARRITO = new Carrito()
CARRITO.obtenerLocalStorage()
CARRITO.mostrarServicios()
CARRITO.finalizarCompra()
CARRITO.mostrarDatosPersonaEnFormulario();

// Instancia de ProductController
const PRODCONTROLLER = new ProductController()

PRODCONTROLLER.agregar(SERV1)
PRODCONTROLLER.agregar(SERV2)
PRODCONTROLLER.agregar(SERV3)
PRODCONTROLLER.agregar(SERV4)

PRODCONTROLLER.renderizarServiciosDOM()
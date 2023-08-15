class Servicio{
    constructor(id,nombre,valor,img){
        this.id = id
        this.nombre = nombre
        this.cantidad = 1
        this.valor = valor
        this.img = img
    }
}

class Carrito{
    constructor(){
        this.listaCarrito = []
    }
    obtenerLocalStorage(){
        this.listaCarrito = JSON.parse(localStorage.getItem("listaCarrito")) || []
    }
    guardarEnStorage(){
        let listaCarritoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito", listaCarritoJSON)
    }

    agregar(agregarServicio){
        let servicioEncontrado = this.listaCarrito.some(servicio => servicio.id == agregarServicio.id)
        if(servicioEncontrado){
        let servicio = this.listaCarrito.find(servicio => servicio.id == agregarServicio.id)
        servicio.cantidad++
    }else{
        this.listaCarrito.push(agregarServicio)
    } 
    }
    eliminar(servicioAQuitar) {
        let servicio = this.listaCarrito.find(servicio =>servicio.id == servicioAQuitar)
        let indice = this.listaCarrito.indexOf(servicio)
        this.listaCarrito.splice(indice,1)
    }
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
            let btnEliminar = document.getElementById(`eliminar-${servicio.id}`)

            btnEliminar.addEventListener("click", () => {
                this.eliminar(servicio)
                this.guardarEnStorage()
                this.mostrarServicios()
            })
        })
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
    //Evento al boton Finalizar Compra
    finalizarCompra(){
        const FINALIZAR_COMPRA = document.getElementById("finalizarCompra")
        FINALIZAR_COMPRA.addEventListener("click", () =>{
            
            let totalDeCompra = 0;
            this.listaCarrito.forEach(servicio => {
                totalDeCompra += servicio.valor * servicio.cantidad;
            });

            this.listaCarrito = []
            localStorage.removeItem("listaCarrito")
            this.mostrarServicios()

            let contenedorCarrito = document.getElementById(`contenedorCarrito`);
            // Oculta el total en carrito
            const totalCarrito = document.getElementById("totalCarrito");

            if (totalDeCompra > 0){
                contenedorCarrito.innerHTML += `<h3 id="mensajeDeCompra">COMPRA EXITOSA!</h3>\n\n<h4 id="costoDecompra">Costo Total: $${totalDeCompra}</h4>`;
            
            totalCarrito.style.display = "none";
            }else{
                contenedorCarrito.innerHTML += `<h3 id="mensajeDeCompra">AGREGUE PRODUCTOS PARA COMPRAR!</h3>`;
            
            totalCarrito.style.display = "none";
            }
        })
    }
}

class ProductController{
    constructor(){
        this.listaServicios = []
    }
    agregar(servicio){
        this.listaServicios.push(servicio)
    }
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

//INSTANCIA DE SERVICIO.
const SERV1 = new Servicio(1, "Acompañamiento", 30, "../img/Icons/acompaniamiento.svg")
const SERV2 = new Servicio(2, "Via Judicial", 35, "../img/Icons/viaJudicial.svg")
const SERV3 = new Servicio(3, "Asseverazioni", 40, "../img/Icons/asseverazioni.svg")
const SERV4 = new Servicio(4, "Control de Carpeta", 45, "../img/Icons/controlCarpeta.svg")

//INSTANCIA DE CARRITO ¦ PARA LOS PRODUCTOS QUE EL CLIENTE ELIJA
const CARRITO = new Carrito()
CARRITO.obtenerLocalStorage()
CARRITO.mostrarServicios()
CARRITO.finalizarCompra()

//INSTANCIA DE PRODUCTOCONTROLLER
const PRODCONTROLLER = new ProductController()

PRODCONTROLLER.agregar(SERV1)
PRODCONTROLLER.agregar(SERV2)
PRODCONTROLLER.agregar(SERV3)
PRODCONTROLLER.agregar(SERV4)

PRODCONTROLLER.renderizarServiciosDOM()
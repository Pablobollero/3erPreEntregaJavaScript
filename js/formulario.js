// Clase que representa un formulario de contacto
class ContactForm {
    constructor() {
        // Obtiene el elemento del formulario por su ID
        this.form = document.getElementById("formularioContacto");
        // Agrega un evento de escucha al formulario para capturar el envío
        this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
    }

    // Función que maneja el envío del formulario
    handleFormSubmit(event) {
        event.preventDefault(); // Previene el comportamiento predeterminado del formulario

        // Obtiene los valores de los campos del formulario
        const email = document.getElementById("inputEmail4").value;
        const address = document.getElementById("inputAddress").value;
        const city = document.getElementById("inputCity").value;
        const country = document.getElementById("inputPais").value; // Corregido aquí
        const zipCode = document.getElementById("inputCp").value;

        // Crea un objeto con los datos de contacto
        const contactData = {
            email,
            address,
            city,
            country,
            zipCode
        };

        // Almacena los datos de contacto en el Local Storage
        this.storeContactData(contactData);
        // Muestra un modal de confirmación
        this.showConfirmationModal();
        // Reinicia el formulario
        this.form.reset();
    }

    // Función para almacenar los datos de contacto en el Local Storage
    storeContactData(data) {
        // Obtiene los datos almacenados previamente o crea un arreglo vacío
        const storedData = JSON.parse(localStorage.getItem("contactData")) || [];
        // Agrega los nuevos datos al arreglo
        storedData.push(data);
        // Guarda el arreglo actualizado en el Local Storage
        localStorage.setItem("contactData", JSON.stringify(storedData));
    }

    // Función para mostrar el modal de confirmación
    showConfirmationModal() {
        // Obtiene el elemento del modal de confirmación por su ID
        const confirmationModal = document.getElementById("confirmationModal");
        // Crea una instancia de Modal de Bootstrap para el modal de confirmación
        const modal = new bootstrap.Modal(confirmationModal);
        // Muestra el modal
        modal.show();
    }
}

// Crea una instancia de la clase ContactForm para manejar el formulario de contacto
const contactForm = new ContactForm();
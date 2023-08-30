// Clase ContactForm que maneja la funcionalidad del formulario de contacto
class ContactForm {
    constructor() {
        // Obtenemos el formulario y agregamos un evento para manejar su envío
        this.form = document.getElementById("formularioContacto");
        this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
    }

    // Función que maneja el envío del formulario
    handleFormSubmit(event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        // Obtener los valores de los campos del formulario
        const email = document.getElementById("inputEmail").value;
        const name = document.getElementById("inputName").value;
        const query = document.getElementById("inputQuery").value;
        const country = document.getElementById("inputPais").value;

        // Verificar si los campos están vacíos
        if (!email || !name || !query || !country) {
            this.showWarningModal(); // Mostrar modal de advertencia
        } else {
            // Crear objeto con los datos del contacto
            const contactData = {
                email,
                name,
                query,
                country,
            };
            
            this.storeContactData(contactData); // Almacenar los datos en el Local Storage
            this.showConfirmationModal(); // Mostrar modal de confirmación
            this.form.reset(); // Limpiar el formulario
        }
    }

    // Almacenar los datos del contacto en el Local Storage
    storeContactData(data) {
        const storedData = JSON.parse(localStorage.getItem("contactData")) || [];
        storedData.push(data);
        localStorage.setItem("contactData", JSON.stringify(storedData));
    }

    // Mostrar el modal de confirmación
    showConfirmationModal() {
        const confirmationModal = document.getElementById("confirmationModal");
        const modal = new bootstrap.Modal(confirmationModal);
        modal.show();
    }

    // Mostrar el modal de advertencia
    showWarningModal() {
        const warningModal = document.getElementById("warningModal");
        const modal = new bootstrap.Modal(warningModal);
        modal.show();
    }
}

// Crear una instancia de ContactForm para manejar la funcionalidad del formulario de contacto
const contactForm = new ContactForm();
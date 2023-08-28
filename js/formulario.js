class ContactForm {
    constructor() {
        this.form = document.getElementById("formularioContacto");
        this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const email = document.getElementById("inputEmail").value;
        const name = document.getElementById("inputName").value;
        const query = document.getElementById("inputQuery").value;
        const country = document.getElementById("inputPais").value;

        if (!email || !name || !query || !country) {
            this.showWarningModal();
        } else {
            const contactData = {
                email,
                name,
                query,
                country,
            };
            
            this.storeContactData(contactData);
            this.showConfirmationModal();
            this.form.reset();
        }
    }

    storeContactData(data) {
        const storedData = JSON.parse(localStorage.getItem("contactData")) || [];
        storedData.push(data);
        localStorage.setItem("contactData", JSON.stringify(storedData));
    }

    showConfirmationModal() {
        const confirmationModal = document.getElementById("confirmationModal");
        const modal = new bootstrap.Modal(confirmationModal);
        modal.show();
    }

    showWarningModal() {
        const warningModal = document.getElementById("warningModal");
        const modal = new bootstrap.Modal(warningModal);
        modal.show();
    }
}

const contactForm = new ContactForm();
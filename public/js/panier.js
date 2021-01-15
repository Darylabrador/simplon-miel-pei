window.addEventListener("DOMContentLoaded", (event) => {
    let generalUrl = location.origin;

    let config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };

    var messageFlash = new bootstrap.Toast(document.getElementById('messageFlash'));

    const flash = (message, success = true) => {
        let toastContainer = document.getElementById('messageFlash');
        let bodyToast = document.getElementById('bodyToast');
        if (success) {
            toastContainer.classList.add('bg-success');
            bodyToast.textContent = message;
        } else {
            toastContainer.classList.add('bg-danger');
            bodyToast.textContent = message;
        }
        bodyToast.classList.add('text-white');
        messageFlash.show()
    }

})
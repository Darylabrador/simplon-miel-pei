window.addEventListener("DOMContentLoaded", (event) => {
    let generalUrl      = location.origin;
    let checkResetUrl   = `${generalUrl}/api/reset/request`;
    let resetUrl        = `${generalUrl}/api/reset/password`;
    let resetToken      = document.getElementById("resetToken").value;
    let resetContainer  = document.getElementById("resetContainer");

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

    const postAction = async (ask = true, dataSend, form) => {
        try {  
            if(ask) {
                const requestAsk     = await axios.post(checkResetUrl, dataSend);
                const requestAskData = requestAsk.data;
                if (requestAskData.success) {
                    flash(requestAskData.message)
                    form.reset();
                }
            } else {
                const requestReset     = await axios.post(resetUrl, dataSend);
                const requestResetData = requestReset.data;
                if (requestResetData.success){
                    flash(requestResetData.message)
                    form.reset();
                }
            }
        } catch (error) {
            flash('Une erreur est survenue', false)
        }
    }

    const resetFormAction = (ask = true, resetToken = null) => {
        let resetForm = document.getElementById('resetForm');
        resetForm.addEventListener('submit', evt => {
            evt.preventDefault();
            let dataSend = {};

            if (ask) {
                let resetMailValue = document.getElementById('resetMail').value;
                dataSend = { resetMail: resetMailValue };
                postAction(true, dataSend, resetForm);
            } else {
                let newPasswordValue = document.getElementById("newPassword").value;
                let newPasswordConfirmValue = document.getElementById("newPasswordConfirm").value;
                dataSend = {
                    newPassword: newPasswordValue,
                    newPasswordConfirm: newPasswordConfirmValue,
                    resetToken
                };
                postAction(false, dataSend, resetForm);
            }
        });
    }

    if (resetToken == "" ) {
        resetContainer.innerHTML = `
        <div class="w-50 mx-auto p-3" style="min-width: 350px !important;" id="reset">
            <h4 class="text-center text-danger mt-2"> Réinitialiser votre mot de passe </h4>
            <hr class="mt-0"> 
            <p class="text-center mt-3 mb-4">
                Vous avez oublié votre mot de passe ?
                <br> Ne vous inquiétez pas, vous pouvez le réinitialiser en indiquant votre adresse e-mail ci-dessous, la démarche à suivre vous sera envoyer par email !
            </p>
            <form id="resetForm">
                <input type="email" class="form-control" id="resetMail" placeholder="Votre adresse email">
                <div class="d-flex justify-content-end mt-4">
                    <a href="${generalUrl}" class="btn btn-secondary mx-2"> Retour </a>
                    <button type="submit" class="btn btn-primary">Réinitialiser</button>
                </div>
            </form>
        </div>`;
        resetFormAction();
    } else {
        resetContainer.innerHTML = `
        <div class="w-50 mx-auto p-3" style="min-width: 350px !important;" id="reset">
            <h4 class="text-center text-danger mt-2"> Réinitialiser votre mot de passe </h4>
            <hr class="mt-0"> 
            <p class="text-center mt-3 mb-4">
                Vous avez oublié votre mot de passe ? Ne vous inquiétez pas, vous pouvez le Réinitialiser en indiquant votre adresse e-mail ci-dessous. <br>
            </p>
            <form id="resetForm">
                <input type="password" class="form-control mb-3" id="newPassword" placeholder="Mot de passe">
                <input type="password" class="form-control" id="newPasswordConfirm" placeholder="Confirmation mot de passe">
                <div class="d-flex justify-content-end mt-4">
                     <a href="${generalUrl}" class="btn btn-secondary mx-2"> Retour </a>
                    <button type="submit" class="btn btn-primary">Réinitialiser</button>
                </div>
            </form>
        </div>`;
        resetFormAction(false, resetToken);
    }
});
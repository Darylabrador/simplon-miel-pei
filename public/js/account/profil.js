window.addEventListener("DOMContentLoaded", (event) => {
    let generalUrl         = location.origin;
    let identityUrl        = `${generalUrl}/api/reset/name`;
    let passwordUrl        = `${generalUrl}/api/reset/passwordAccount`;

    let formIdentity       = document.getElementById("formIdentity");
    let formChangePassword = document.getElementById("formChangePassword");
    
    let editContent = document.querySelectorAll('.editContent');
    let editBtn     = document.querySelectorAll('.editBtn');
    let submitBtn   = document.querySelectorAll('.submitBtn');
    let cancelBtn   = document.querySelectorAll('.cancelBtn');

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

    const getIdentity = async () => {
        try {
            let verifyUrl = `${location.origin}/api/verify`;
            const check = await axios.get(verifyUrl, config);
            const checkData = check.data.data;
            let identityInfo = document.getElementById('editIdentity')
            if (identityInfo) {
                identityInfo.value = checkData.identity;
            }

            let profilNameEdited = document.getElementById('profilName');
            profilNameEdited.textContent = checkData.identity;
        } catch (error) {
            flash("Ressource indisponible", false)
        }
    }

    getIdentity();

    for (let i = 0; i < editBtn.length; i++){
        editBtn[i].addEventListener('click', evt => {
            editContent[i].classList.remove('d-none');
            submitBtn[i].classList.remove('d-none');
            cancelBtn[i].classList.remove('d-none');
            editBtn[i].classList.add('d-none');

            let childrenContent = editContent[i].children;
            for (let j = 0; j < childrenContent.length; j++){
                childrenContent[j].removeAttribute('readonly')
            }

            cancelBtn[i].addEventListener('click', evt => {
                editContent[i].classList.add('d-none');
                submitBtn[i].classList.add('d-none');
                cancelBtn[i].classList.add('d-none');
                editBtn[i].classList.remove('d-none');
            })
        });
    }


    formIdentity.addEventListener('submit', evt => {
        evt.preventDefault();
        let identityValue = document.getElementById('editIdentity').value;
        let dataSend = { identity: identityValue};
        axios.post(identityUrl, dataSend, config)
            .then(({data}) => {
                if(data.success) {
                    getIdentity();
                    flash(data.message)
                } else {
                    flash(data.message, false)
                }
            })
            .catch(err => flash("Ressource indisponible", false))
    });


    formChangePassword.addEventListener('submit', evt => {
        evt.preventDefault();
        let emailConfirmValue       = document.getElementById('emailConfirm');
        let newPasswordValue        = document.getElementById('newPassword');
        let newPasswordConfirmValue = document.getElementById('newPasswordConfirm'); 
        let dataSend = {
            email: emailConfirmValue.value,
            newPassword: newPasswordValue.value,
            newPasswordConfirm: newPasswordConfirmValue.value
        };
        axios.post(passwordUrl, dataSend, config)
            .then(({data}) => {
                if (data.success) {
                    formChangePassword.reset();
                    flash(data.message)
                } else {
                    flash(data.message, false)
                } 
            })
            .catch(err => flash("Ressource indisponible", false))
    });

});
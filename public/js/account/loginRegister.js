window.addEventListener("DOMContentLoaded", (event) => {
    let generalUrl  = location.origin;
    let rolesUrl    = `${generalUrl}/api/roles`;
    let loginUrl    = `${generalUrl}/api/login`;
    let registerUrl = `${generalUrl}/api/register`;

    let loginForm    = document.getElementById("loginForm");
    let registerForm = document.getElementById("registerForm");

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

    const getRoles = async (node) => {
        try {
            const requestRoles = await axios.get(rolesUrl);
            const requestRolesData = requestRoles.data.data;
            let selectOptions = `<option value="">Vous êtes un :</option>`;
            requestRolesData.forEach(roleInfo => {
                selectOptions += `<option value="${roleInfo.id}">${roleInfo.label}</option>`;
            })
            node.innerHTML = selectOptions; 
        } catch (error) {
            flash('Erreur : Récupérer les rôles', false)
        }
    }

    if(loginForm){
        let loginEmail      = document.getElementById('loginEmail');
        let loginPassword   = document.getElementById('loginPassword');

        loginForm.addEventListener('submit', evt => {
            evt.preventDefault();
            let dataSend = {
                email    : loginEmail.value,
                password : loginPassword.value
            }
            axios.post(loginUrl, dataSend)
                .then(({data}) => {
                    if(data.success) {
                        localStorage.setItem('token', data.token);
                        loginForm.reset();
                        location.href = '/';
                    } else {
                        flash(data.message, false)
                    }
                })
                .catch(err => flash("Erreur : Veuillez réessayer plus tard", false))
        })
    }

    if (registerForm) {
        let registerIdentity        = document.getElementById('registerIdentity');
        let registerEmail           = document.getElementById('registerEmail');
        let registerRole            = document.getElementById('registerRole');
        let registerPassword        = document.getElementById('registerPassword');
        let registerPasswordConfirm = document.getElementById('registerPasswordConfirm');
        
        getRoles(registerRole);

        registerForm.addEventListener('submit', evt => {
            evt.preventDefault();
            let dataSend = {
                identity: registerIdentity.value,
                email: registerEmail.value,
                role: registerRole.value,
                password: registerPassword.value,
                passwordConfirm: registerPasswordConfirm.value
            }
            axios.post(registerUrl, dataSend)
                .then(({data}) => {
                    if (data.success) {
                        flash(data.message)
                        registerForm.reset();
                    } else {
                        flash(data.message, false)
                    }
                })
                .catch(err => flash("Erreur : Veuillez réessayer plus tard", false))
        })
    }
});
window.addEventListener("DOMContentLoaded", (event) => {
    let generalUrl  = location.origin;
    let rolesUrl    = `${generalUrl}/api/roles`;
    let loginUrl    = `${generalUrl}/api/login`;
    let registerUrl = `${generalUrl}/api/register`;

    let loginForm    = document.getElementById("loginForm");
    let registerForm = document.getElementById("registerForm");

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
            console.log(error)
        }
    }

    const displayMessage = (type, message) => {
        let error = document.getElementById('error');
        error.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show mt-1" role="alert" style="margin-bottom: -40px !important;">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
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
                        displayMessage('danger', data.message);
                    }
                })
                .catch(err => displayMessage('danger', err))
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
                identity        : registerIdentity.value,
                email           : registerEmail.value,
                role            : registerRole.value,
                password        : registerPassword.value,
                passwordConfirm : registerPasswordConfirm.value
            }
            axios.post(registerUrl, dataSend)
                .then(({data}) => {
                    if (data.success) {
                        displayMessage('success', data.message);
                        registerForm.reset();
                    } else {
                        displayMessage('danger', data.message);
                    }
                })
                .catch(err => displayMessage('danger', err))
        })
    }
});
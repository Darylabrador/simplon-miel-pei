import { apiService } from '../../services/apiService.js';
import Password from 'vue-password-strength-meter';

export default {
    components: { Password },
    data() {
        return {
            valid: false,
            items: [],
            identity: '',
            email: '',
            role: '',
            password: '',
            passwordConfirm: '',
            message: '',
            passwordValid: false,
            identityRules: [
                v => !!v || 'Identité requise',
            ],
            emailRules: [
                v => !!v || 'Adresse e-mail requise',
                v => /.+@.+\..+/.test(v) || 'Adresse e-mail est invalide'
            ],
            passwordRules: [
                v => !!v || 'Mot de passe requis',
                v => v.length > 5 || '6 caractères minimuns',

            ],
            passwordConfirmRules: [
                v => !!v || 'Mot de passe requis',
                v => v.length > 5 || '6 caractères minimuns',
                v => v == this.password  || "Mot de passe n'est pas identique",
            ],
            loginPath: '/connexion'
        }
    },

    created() {
        this.getSelectRole()
    },

    methods: {
        async getSelectRole() {
            try {
                const requestRoles = await apiService.get(`${location.origin}/api/roles`);
                const requestRolesData = requestRoles.data.data;
                this.items = requestRolesData;
            } catch (error) {
                this.flashMessage.error({
                    title: error.msg,
                    time: 8000,
                })
            }
        },
        async validate() {
            try {
                this.$refs.form.validate()
                if (this.valid && this.passwordValid) {
                    let dataSend = {
                        identity: this.identity,
                        email: this.email,
                        role: this.role,
                        password: this.password,
                        passwordConfirm: this.passwordConfirm
                    }

                    const registerReq = await apiService.post(`${location.origin}/api/register`, dataSend);
                    const registerData = registerReq.data;
                    if(registerData.success) {
                        this.identity        = ''
                        this.email           = ''
                        this.role            = ''
                        this.password        = ''
                        this.passwordConfirm = ''
                        this.flashMessage.success({
                            title: registerData.message,
                            time: 8000,
                        })
                        this.$router.push(this.loginPath)
                    } else {
                        this.flashMessage.error({
                            title: registerData.message,
                            time: 8000,
                        })
                    }
                } else {
                    this.message = "Votre mot de passe n'est pas robuste";
                }
            } catch (error) {
                this.flashMessage.error({
                    title: error.msg,
                    time: 8000,
                })
            }
        },
        showScore(score) {
            if(score >= 3) {
                this.passwordValid = true;
            } else {
                this.passwordValid = false;
            }
        }
    }
}
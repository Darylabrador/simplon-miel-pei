import { apiService } from '../services/apiService.js';
import Password from 'vue-password-strength-meter';

export default {
    components: { 
        Password
    },

    data: () => ({
        valid: false,
        isValid: false,
        resetToken: '',
        isTokenExist: false,
        passwordValid: false,
        email: '',
        password: '',
        passwordConfirm: '',
        message: '',
        emailRules: [
            v => !!v || 'Adresse e-mail requise',
            v => /.+@.+\..+/.test(v) || 'Adresse e-mail est invalide',
        ],
        passwordRules: [
            v => !!v || 'Nouveau mot de passe requis',
            v => v.length > 5 || '6 caractères minimuns',
        ],
        passwordConfirmRules: [
            v => !!v || 'Mot de passe requis',
            v => v.length > 5 || '6 caractères minimuns',
        ],
        loginPath: "/connexion"
    }),


    created() {
        if (localStorage.getItem('mielTok')) {
            return this.$router.push('/')
        }
        if (this.$route.params.token) {
            this.resetToken = this.$route.params.token;
            this.isTokenExist = true;
        } else {
            this.resetToken = this.$route.params.token;
            this.isTokenExist = false;
        }
    },

    methods: {
        async sendEmail() {
            try {
                let dataSend = {
                    resetMail: this.email
                };

                const sendMailReq = await apiService.post(`${location.origin}/api/reset/request`, dataSend);
                const sendMailData = sendMailReq.data;

                if(sendMailData.success) {
                    this.flashMessage.success({
                        title: sendMailData.message,
                        time: 8000,
                    });
                    this.email =  '';
                    this.$router.push('/');
                } else {
                    console.log(error)
                    this.flashMessage.error({
                        title: sendMailData.message,
                        time: 8000,
                    });
                }
            } catch (error) {
                this.flashMessage.error({
                    title: error.msg,
                    time: 8000,
                });
            }
        },

        async validate() {
            try {
                this.$refs.form.validate()
                if (this.valid && this.passwordValid) {
                    let dataSend = {
                        newPassword: this.password,
                        newPasswordConfirm: this.passwordConfirm,
                        resetToken: this.resetToken
                    };

                    const resetPassReq = await apiService.post(`${location.origin}/api/reset/password`, dataSend);
                    const resetPassData = resetPassReq.data;

                    if(resetPassData.success) {
                        this.password = '';
                        this.passwordConfirm = '';
                        this.resetToken = '';  
                        this.$refs.form.resetValidation()
                        this.$router.push('/connexion');
                    } else {
                        this.flashMessage.error({
                            title: resetPassData.message,
                            time: 8000,
                        });
                    }
                }
            } catch (error) {
                console.log(error)
                this.flashMessage.error({
                    title: error.msg,
                    time: 8000,
                });
            }
        },
        showScore(score) {
            if (score >= 3) {
                this.passwordValid = true;
            } else {
                this.passwordValid = false;
            }
        }
    }
}
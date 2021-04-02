import { apiService } from '../../../services/apiService.js';
import EventBus from '../../../evt-bus.js';
import Password from 'vue-password-strength-meter';

export default {
    components: { Password },

    props: {
        dialog: {}
    },

    data() {
        return {
            valid: true,
            email: null,
            password: null,
            passwordConfirm: null,
            passwordValid: false,
            emailRules: [
                v => !!v || 'Adresse mail requise',
                v => /.+@.+\..+/.test(v) || 'Adresse mail est invalide',
            ],
            passwordRules: [
                v => !!v || 'Mot de passe requis',
                v => (!!v && v.length > 5) || '6 caractères minimuns',
            ],
            passwordConfirmRules: [
                v => !!v || 'Mot de passe requis',
                v => (!!v  && v.length > 5) || '6 caractères minimuns',
                v => (!!v  && v == this.password) || "Mot de passe n'est pas identique",
            ],
        }
    },

    watch: {
        password(val){
            if(val == null){
                this.password = '';
            }
        }
    },

    created() {

    },

    methods: {
        close() {
            this.email           = null;
            this.password        = null;
            this.passwordConfirm = null;
            this.passwordValid   = false;
            this.$refs.form.resetValidation();
            this.$emit('update:dialog', false);
        },
        async validate() {
            try {
                await this.$refs.form.validate()
                if (this.valid && this.passwordValid) {
                    let dataSend = {
                        email: this.email,
                        newPassword: this.password,
                        newPasswordConfirm: this.passwordConfirm
                    }
                    const resetPassReq = await apiService.post(`${location.origin}/api/reset/passwordAccount`, dataSend);
                    const resetPassData = resetPassReq.data;
                    
                    if(resetPassData.success) {
                        this.close();
                    } else {
                        this.flashMessage.error({
                            title: resetPassData.message,
                            time: 8000,
                        })
                    }
                }
            } catch (error) {
                this.flashMessage.error({
                    title: "Une erreur est survenue",
                    time: 8000,
                })
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
import { apiService } from '../services/apiService.js';

export default {
    data: () => ({
        valid: false,
        password: '',
        passwordRules: [
            v => !!v || 'Mot de passe requis',
        ],
        email: '',
        emailRules: [
            v => !!v || 'Adresse e-mail requise',
            v => /.+@.+\..+/.test(v) || 'Adresse e-mail est invalide',
        ],
        forgottenPath: "/reinitialisation",
        registerPath: "/inscription"
    }),

    created() {
        if (localStorage.getItem('mielTok')) {
            return this.$router.push('/')
        }
    },

    methods: {
        async validate() {
            try {
                this.$refs.form.validate()
                if (this.valid) {
                    let dataSend = {
                        email: this.email,
                        password: this.password
                    }
                    const loginReq = await apiService.post(`${location.origin}/api/login`, dataSend);
                    const loginData = loginReq.data;

                    if(loginData.success) {
                        localStorage.setItem('mielTok', loginData.token);
                        this.email      = "";
                        this.password   = "";
                        this.$emit('updateNavbar', true);
                        this.$router.push('/');
                    } else {
                        this.flashMessage.error({
                            title: loginData.message,
                            time: 8000,
                        })
                    }
                }
            } catch (error) {
                this.flashMessage.error({
                    title: error.msg,
                    time: 8000,
                })
            }
        },
    }
}
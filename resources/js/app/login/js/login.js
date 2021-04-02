import { apiService } from '../../services/apiService.js';
import EventBus from '../../evt-bus.js';

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
        async contentShoppingCart() {
            try {
                let defaultData = [];
                const shoppingCartReq = await apiService.get(`${location.origin}/api/shoppingcart`);
                const shoppingcartData = shoppingCartReq.data.data;
                if (shoppingcartData.length != 0) {
                    shoppingcartData.forEach(element => {
                        element.product.amountDefault = element.quantity;
                        defaultData.push(element.product)
                    });
                    this.$store.commit('addToCartInfo', defaultData);
                    EventBus.$emit('defaultData', true);
                }
            } catch (error) {
                console.error(error)
            }
        },
        async validate() {
            try {
                await this.$refs.form.validate()
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
                        this.$store.commit('connect', loginData);
                        this.$emit('updateNavbar', true);
                        if (loginData.role == 2) {
                            this.contentShoppingCart();
                        }
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
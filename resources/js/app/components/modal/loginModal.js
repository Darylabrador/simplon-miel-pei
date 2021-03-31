import { apiService } from '../../services/apiService.js';
import EventBus from '../../evt-bus.js';

export default {
    components: {

    },

    props: {
        dialog: {}
    },

    data() {
        return {
            valid: true,
            email: null,
            password: null,
            emailRules: [
                v => !!v || 'Adresse e-mail requise',
                v => /.+@.+\..+/.test(v) || 'Adresse e-mail est invalide',
            ],
            passwordRules: [
                v => !!v || 'Mot de passe requis',
            ],
        }
    },

    watch: {

    },

    created() {

    },

    methods: {
        close() {
            this.$emit('update:dialog', false);
            this.email    = null;
            this.password = null;
            this.$refs.form.resetValidation();
        },
        openRegister(){
            this.$emit('openRegister', true)
        },
        async contentShoppingCart() {
            try {
                let defaultData = [];
                const shoppingCartReq = await apiService.get(`${location.origin}/api/shoppingcart`);
                const shoppingcartData = shoppingCartReq.data.data;
                shoppingcartData.forEach(element => {
                    element.productInfo.amountDefault = element.quantity;
                    defaultData.push(element.productInfo)
                });
                this.$store.commit('addToCartInfo', defaultData);
                EventBus.$emit('defaultData', true);
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

                    if (loginData.success) {
                        localStorage.setItem('mielTok', loginData.token);
                        this.email    = "";
                        this.password = "";
                        this.$store.commit('connect', loginData);
                        EventBus.$emit('updateNavbar', true);
                        if (this.$store.state.userRole == 2) {
                            this.contentShoppingCart();
                        }
                        this.close();
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
        }
    }
}
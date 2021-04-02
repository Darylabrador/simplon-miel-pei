import { apiService } from '../../../services/apiService.js';
import EventBus from '../../../evt-bus.js';

export default {
    components: {

    },

    props: {
        dialog: {}
    },

    data() {
        return {
            valid: true,
            identity: this.$store.state.identity,
            identityRules: [
                v => !!v || 'Identité requise',
            ]
        }
    },

    watch: {

    },

    created() {
        this.identity = this.$store.state.identity;
    },

    methods: {
        close() {
            this.identity = this.$store.state.identity;
            this.$refs.form.resetValidation();
            this.$emit('update:dialog', false);
        },
        async validate() {
            try {
                await this.$refs.form.validate()
                if(this.valid) {
                    let dataSend = { identity: this.identity };
                    const profilReq = await apiService.post(`${location.origin}/api/reset/name`, dataSend);
                    const profilData = profilReq.data;

                    if (profilData.success) {
                        this.$store.commit('updateIdentity', this.identity)
                        this.close();
                    } else {
                        this.flashMessage.error({
                            title: profilData.message,
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
        }
    }
}
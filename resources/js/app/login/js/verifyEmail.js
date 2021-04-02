import { apiService } from '../../services/apiService.js';

export default {
    data() {
        return {
            loginPath: "/connexion",
            message: '',
            isVerified: false,
        }
    },

    
    created() {
        if (localStorage.getItem('mielTok')) {
            return this.$router.push('/')
        }
        if (!this.$route.params.token) {
            this.$router.push(this.loginPath)
        } else {
            this.verify(this.$route.params.token);
        }
    },

    methods: {
        async verify(verifyToken) {
            try {
                let dataSend = {
                    confirmToken: verifyToken
                };

                const verifyMailReq = await apiService.post(`${location.origin}/api/email/verification`, dataSend);
                const verifyData = verifyMailReq.data;

                if(verifyData.success) {
                    this.message = verifyData.message;
                } else {
                   this.message     = verifyData.message;
                   this.isVerified = true;     
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
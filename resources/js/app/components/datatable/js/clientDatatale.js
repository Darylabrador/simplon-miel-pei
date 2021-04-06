import { apiService } from "../../../services/apiService.js";
import EventBus from "../../../evt-bus.js";
import axios from "axios";

export default {
    components: {

    },

    props: {
        commands: {
            type: Array
        }
    },

    mounted() {

    },

    data() {
        return {
            search: '',
            detailDialog: false,
            selectItem: null,
            headers: [
                {
                    text: 'Commandes',
                    align: 'start',
                    filterable: true,
                    value: 'invoice.filename',
                },
                { text: 'Etats', value: 'state' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
        }
    },

    watch: {

    },

    created() {

    },

    methods: {
        refresh() {
            EventBus.$emit('refreshCommand')
        },
        detailCommand(item){
            this.detailDialog = true;
            this.selectItem = item;
        },
        closeDetail(){
            this.detailDialog = false;
            this.selectItem = null;
        },
        downloadPDF(responseData, filename) {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(new Blob([responseData], { type: 'application/pdf' }));
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        },
        async getInvoice(item) {
            try {
                let headers = {
                    responseType: 'arraybuffer',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem('mielTok')
                    }
                }
                const invoiceReq = await axios.get(`${location.origin}/api/order/${item.id}/pdf`, headers);
                const invoiceData = invoiceReq.data;
                await this.downloadPDF(invoiceData, item.invoice.filename);
            } catch (error) {
                this.flashMessage.error({
                    title: "PDF error",
                    time: 8000,
                })
            }
        }
    }
}
import { apiService } from "../../../services/apiService.js";
import EventBus from "../../../evt-bus.js";

var dateFormat = require("dateformat");

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
            confirmDialog: false,
            headers: [
                { text: 'Créer le', value: 'order.created_at', align: 'start', },
                {
                    text: 'Commandes',
                    filterable: true,
                    value: 'order.id',
                },
                { text: 'Adresse de livraison', value: 'order.delivery' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            orders: [],
            selectItem: null,
        }
    },

    watch: {

    },

    created() {
        this.producerDataForm()
    },

    methods: {
        refresh() {
            EventBus.$emit('refreshCommand')
            this.confirmDialog = false;
            this.detailDialog = false;
            this.selectItem = null;
        },
        closeDetail() {
            this.detailDialog = false;
            this.selectItem = null;
        },
        closeConfirm() {
            this.confirmDialog = false;
            this.selectItem = null;
        },
        getImageUrl(image) {
            return `${location.origin}/images/${image}`
        },
        producerDataForm(){
            let orders = [];
            this.commands.forEach(element => {
                let formated = {
                    order: element.order,
                    isOrderConfirm: element.confirmed
                }
                orders.push(formated)
            })

            let ordersOrdered = _.orderBy(orders, ['order.id'], ['desc']);
            let ordersUnique  = _.uniqBy(ordersOrdered, 'order.id');
            this.orders = ordersUnique;
        },
        orderDateFormat(date) {
            return dateFormat(date, "paddedShortDate")
        }, 
        detailCommand(item){
            this.detailDialog = true;
            let filtered = this.commands.filter(element => element.order.id == item.order.id)
            this.selectItem = filtered;
        },
        openConfirm(item) {
            this.confirmDialog = true;
            let filtered = this.commands.filter(element => element.order.id == item.order.id)
            this.selectItem = filtered;
        },
        async confirmManagement(){
            try {
                let orderRowId = [];
                this.selectItem.forEach(element => {
                    orderRowId.push(element.id)
                })
                await apiService.post(`${location.origin}/api/order/confirm`, { orderRowId });
                await this.refresh();
            } catch (error) {
                this.flashMessage.error({
                    title: "Order confirm error",
                    time: 8000,
                })
            }
        }
    }
}
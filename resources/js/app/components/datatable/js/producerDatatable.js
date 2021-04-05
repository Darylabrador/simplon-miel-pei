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
            selectItem: null,
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
            orders: []
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
        },
        closeDetail() {
            this.detailDialog = false;
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
            console.log(this.orders)
        },
        orderDateFormat(date) {
            return dateFormat(date, "paddedShortDate")
        }, 
        detailCommand(item){
            this.detailDialog = true;
            let filtered = this.commands.filter(element => element.order.id == item.order.id)
            this.selectItem = filtered;
            console.log(filtered)
        }
    }
}
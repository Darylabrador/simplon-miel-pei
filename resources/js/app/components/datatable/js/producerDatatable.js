import { apiService } from "../../../services/apiService.js";
import EventBus from "../../../evt-bus.js";


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
    }
}
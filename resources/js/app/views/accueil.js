import { apiService } from '../services/apiService.js';
import { latLng, Icon } from "leaflet";
import { LMap, LTileLayer, LMarker, LControl, LPopup, LTooltip, LIcon } from 'vue2-leaflet';

// Fix missing default icon
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LControl, 
        LPopup,
        LTooltip,
        LIcon
    },

    props: {

    },
    
    data() {
        return {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            center: [-21.1287074, 55.4627191],
            zoom: 10,
            markers: []
        }
    },

    watch: {

    },

    created() {
        this.getExploitations()
    },

    methods: {
        zoomUpdated(zoom) {
            this.zoom = zoom;
        },
        centerUpdated(center) {
            this.center = center;
        },
        resetZoom() {
            this.zoom  = 10;
            this.center = [-21.1287074, 55.4627191];
        },
        async getExploitations() {
            try {
                const exploitationsListReq = await apiService.get(`${location.origin}/api/exploitations`);
                const exploitationsData = exploitationsListReq.data.data;
                this.markers = exploitationsData;
            } catch (error) {
                this.flashMessage.error({
                    title: error.msg,
                    time: 8000,
                })
            }
        },
        async getBestProducts() {
            try {
                
            } catch (error) {
                this.flashMessage.error({
                    title: error.msg,
                    time: 8000,
                })
            }
        }
    }
}
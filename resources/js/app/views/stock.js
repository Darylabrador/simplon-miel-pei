import { apiService } from '../services/apiService.js';

export default {
    components: {

    },

    props: {

    },

    data() {
        return {
            stock: [],
            valid: true,
            isLoading: false,
            editedItem: null,
            addProdDialog: false,
            editProdDialog: false,
            editStockDialog: false,
            deleteProdDialog: false,
            prodName: null,
            prodPrice: null,
            prodQuantity: null,
            prodImage: null,
            search: '',
            headers: [
                {
                    text: 'Images',
                    align: 'start',
                    filterable: true,
                    value: 'produit.image',
                },
                { text: 'Produits', value: 'produit.name' },
                { text: "Prix", value: "produit.price" },
                { text: "Stock", value: "produit.quantity" },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            rules: [
                value => !value || value.size < 2000000 || 'Maximum 2 MB!',
            ],
            prodNameRules: [
                v => !!v || 'Nom du produit requis',
            ],
            prodPriceRules: [
                v => !!v || 'Prix requis',
            ],
        }
    },

    watch: {

    },

    created() {
        this.getStock();
    },

    methods: {
        refresh() {
            this.getStock();
        },
        closeAddProd(){
            this.addProdDialog  = false;
            this.prodName       = null;
            this.prodPrice      = null;
            this.prodPrice      = null;
            this.prodQuantity   = null;
            this.prodImage      = null;
            this.getStock();
        },
        closeEditProd() {
            this.editProdDialog = false;
            this.editedItem     = null;
            this.prodImage      = null;
            this.getStock();
        },
        closeEditStok() {
            this.editStockDialog = false;
            this.editedItem = null;
            this.getStock();
        },
        closeDelete() {
            this.deleteProdDialog = false;
            this.editedItem = null;
            this.getStock();
        },
        openAdd() {
            this.addProdDialog = true;
        },
        openEditProd(item) {
            this.editedItem = item;
            this.editProdDialog = true;
        },
        openEditStock(item) {
            this.editedItem = item;
            this.editStockDialog = true;
        },
        openDelete(item) {
            this.editedItem = item;
            this.deleteProdDialog = true;
        },
        getImageUrl(image) {
            return `${location.origin}/images/${image}`
        },
        inStock(quantity) {
            if (quantity == 0) {
                return false
            } else {
                return true
            }
        },
        async getStock() {
            try {
                const stockReq  = await apiService.get(`${location.origin}/api/products/gestion`);
                const stockData = stockReq.data.data;
                this.stock      = stockData;
                this.isLoading  = true;
            } catch (error) {
                this.flashMessage.error({
                    title: "Une erreur est survenue",
                    time: 8000,
                })
            }
        },
        async addProduct() {
            try {
                let formData = new FormData();
                formData.set('name', this.prodName);
                formData.set('price', this.prodPrice);
                formData.set('quantity', this.prodQuantity);
                formData.set('image', this.prodImage);

                const addProdReq = await apiService.post(`${location.origin}/api/product/add`, formData);
                const addProdData = addProdReq.data;

                if(addProdData.success) {
                    this.closeAddProd();
                } else {
                    this.flashMessage.error({
                        title: addProdData.message,
                        time: 8000,
                    })
                }
            } catch (error) {
                this.flashMessage.error({
                    title: "Une erreur est survenue",
                    time: 8000,
                })
            }
        },
        async editProd() {
            try {
                let formData = new FormData();
                formData.set('name', this.editedItem.produit.name);
                formData.set('price', this.editedItem.produit.price);
                formData.set('image', this.prodImage);

                const editProdReq = await apiService.post(`${location.origin}/api/product/${this.editedItem.produit.id}`, formData);
                const editProdData = editProdReq.data;

                if (editProdData.success) {
                    this.closeEditProd();
                } else {
                    this.flashMessage.error({
                        title: editProdData.message,
                        time: 8000,
                    })
                }
            } catch (error) {
                this.flashMessage.error({
                    title: "Une erreur est survenue",
                    time: 8000,
                })
            }
        },
        async editStock() {
            try {
                let dataSend = {
                    quantity: this.editedItem.produit.quantity
                }

                const editProdReq = await apiService.put(`${location.origin}/api/product/${this.editedItem.produit.id}/stock`, dataSend);
                const editProdData = editProdReq.data;

                if (editProdData.success) {
                    this.closeEditStok();
                } else {
                    this.flashMessage.error({
                        title: editProdData.message,
                        time: 8000,
                    })
                }
            } catch (error) {
                this.flashMessage.error({
                    title: "Une erreur est survenue",
                    time: 8000,
                })
            }
        },
        async deleteProd() {
            try {
                const deleteReq = await apiService.delete(`${location.origin}/api/product/${this.editedItem.produit.id}`);
                const deleteData = deleteReq.data;

                if (deleteData.success) {
                    this.closeDelete();
                } else {
                    this.flashMessage.error({
                        title: deleteData.message,
                        time: 8000,
                    })
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
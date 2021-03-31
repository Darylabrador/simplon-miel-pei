import { apiService } from '../services/apiService.js';

export default {
    components: {

    },

    props: {

    },

    data() {
        return {
            users: [],
            roles: [],
            valid: true,
            isLoading: false,
            isSuspend: false,
            message: '',
            search: '',
            editMailDialog: false,
            editRoleDialog: false,
            confirmDialog: false,
            headers: [
                {
                    text: 'Identité',
                    align: 'start',
                    filterable: true,
                    value: 'identity',
                },
                { text: 'Adresses mails', value: 'email' },
                { text: "Roles", value: "role.label" },
                { text: "Etats", value: "suspended" },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            emailRules: [
                v => !!v || 'Adresse e-mail requise',
                v => /.+@.+\..+/.test(v) || 'Adresse e-mail est invalide',
            ],
            editedItem: null
        }
    },

    watch: {

    },

    created() {
        this.roleList();
        this.userList();
    },

    methods: {
        refresh() {
            this.userList();
        },
        openConfirm(item, isOpen, isSuspend, message) {
            this.editedItem = item;
            this.isSuspend = isSuspend;
            this.confirmDialog = isOpen;
            this.message = message;
        },
        openEditRole(item, isOpen) {
            this.editedItem = item;
            this.editRoleDialog =  isOpen;
        },
        openEditMail(item, isOpen) {
            this.editedItem = item;
            this.editMailDialog = isOpen;
        },
        closeConfirm() {
            this.editedItem = null;
            this.isSuspend = false;
            this.confirmDialog = false;
            this.message = '';
        },
        closeEditMail() {
            this.editedItem = null;
            this.editMailDialog = false;
            this.$refs.form.resetValidation();
        },
        closeEditRole() {
            this.editedItem = null;
            this.editRoleDialog = false;
        },
        getColorRole(item) {
            switch (item.role.id) {
                case 2:
                    return "cyan lighten-2"
                    break;
                case 3:
                    return "teal lighten-1"
                    break;
                default:
                    break;
            }
        },
        getColorState(item) {
            switch (item.suspended) {
                case 1:
                    return "red darken-4"
                    break;
                default:
                    return "green darken-2"
                    break;
            }
        },
        getState(item) {
            switch (item.suspended) {
                case 1:
                    return "Suspendu"
                    break;
                default:
                    return "Actif"
                    break;
            }
        },
        async roleList() {
            try {
                const roleListReq = await apiService.get(`${location.origin}/api/roles`);
                const roleData = roleListReq.data.data;
                this.roles = roleData;
            } catch (error) {
                this.flashMessage.error({
                    title: "Une erreur est survenue",
                    time: 8000,
                })
            }
        },
        async userList() {
            try {
                const usersListReq = await apiService.get(`${location.origin}/api/gestion/users`);
                const usersListData = usersListReq.data.data;
                this.users = usersListData;
                this.isLoading = true;
            } catch (error) {
                this.flashMessage.error({
                    title: "Une erreur est survenue",
                    time: 8000,
                })
            }
        },
        async editRole() {
            try {
                let dataSend = {
                    roleId: this.editedItem.role.id
                }
                await apiService.put(`${location.origin}/api/gestion/user/role/${this.editedItem.id}`, dataSend);
                await this.userList();
                await this.closeEditRole();
            } catch (error) {
                this.flashMessage.error({
                    title: "Une erreur est survenue",
                    time: 8000,
                })
            }
        },
        async editMail() {
            try {
                await this.$refs.form.validate()
                if (this.valid) {
                    let dataSend = {
                        email: this.editedItem.email
                    }
                    await apiService.put(`${location.origin}/api/gestion/user/mail/${this.editedItem.id}`, dataSend);
                    await this.userList();
                    await this.closeEditMail();
                }
            } catch (error) {
                this.flashMessage.error({
                    title: "Une erreur est survenue",
                    time: 8000,
                })
            }
        },
        async suspend() {
            try {
                let dataSend = {
                    userId: this.editedItem.id,
                    suspend: true
                }
                await apiService.post(`${location.origin}/api/gestion/user/suspend`, dataSend)
                await this.userList();
                await this.closeConfirm()
            } catch (error) {
                this.flashMessage.error({
                    title: "Une erreur est survenue",
                    time: 8000,
                })
            }
        },
        async active() {
            try {
                let dataSend = {
                    userId: this.editedItem.id,
                    suspend: false
                }
                await apiService.post(`${location.origin}/api/gestion/user/suspend`, dataSend)
                await this.userList();
                await this.closeConfirm();
            } catch (error) {
                this.flashMessage.error({
                    title: "Une erreur est survenue",
                    time: 8000,
                })
            }
        },
    }
}
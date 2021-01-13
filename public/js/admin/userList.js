window.addEventListener("DOMContentLoaded", (event) => {
    let userList        = document.getElementById("userList");
    let generalUrl      = location.origin;
    let userListUrl     = `${generalUrl}/api/gestion/users`;
    let userSuspendUrl  = `${generalUrl}/api/gestion/user/suspend`;

    let compteur        = document.getElementById('compteur');
    let searchedWord    = document.getElementById('searchedWord');
    let searchedState   = document.getElementById('searchedState');
    let pagination      = document.getElementById('pagination');
    let errorInterface  = document.getElementById('errorInterface');
    let config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
    
    var currentPage     = "";
    let identActiv      = document.getElementById('identActiv');
    let identSuspend    = document.getElementById('identSuspend');
    let clientIdEmail   = document.getElementById('clientIdEmail');
    let clientIdRole    = document.getElementById('clientIdRole');

    var modalRole       = new bootstrap.Modal(document.getElementById('modalRole'))
    var modalMail       = new bootstrap.Modal(document.getElementById('modalMail'))
    var modalSuspend    = new bootstrap.Modal(document.getElementById('modalSuspend'))
    var modalActiv      = new bootstrap.Modal(document.getElementById('modalActiv'))
    
    const displayMessage = (node, type, message) => {
        node.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show mt-1" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    };

    const paginationBtnAction = (isPost = false, dataSend = null) => {
        if (isPost) {
            let btnPrev = document.getElementById('btnPrev');
            let btnNext = document.getElementById('btnNext');

            if (btnPrev) {
                btnPrev.addEventListener('click', evt => {
                    let prevUrl = evt.currentTarget.getAttribute('data-page');
                    switchPage(prevUrl, true, dataSend);
                });
            }

            if (btnNext) {
                btnNext.addEventListener('click', evt => {
                    let nextUrl = evt.currentTarget.getAttribute('data-page');
                    switchPage(nextUrl, true, dataSend);
                });
            }
        } else {
            let btnPrev = document.getElementById('btnPrev');
            let btnNext = document.getElementById('btnNext');

            if (btnPrev) {
                btnPrev.addEventListener('click', evt => {
                    let prevUrl = evt.currentTarget.getAttribute('data-page');
                    switchPage(prevUrl);
                });
            }

            if (btnNext) {
                btnNext.addEventListener('click', evt => {
                    let nextUrl = evt.currentTarget.getAttribute('data-page');
                    switchPage(nextUrl);
                });
            }
        }
    };

    const switchPage = async (page, search = false, dataSend = null) => {
        try {
            if (!search) {
                const requestGetTickets = await axios.get(page, config);
                const requestData = requestGetTickets.data.data;
                const requestLinks = requestGetTickets.data.links;
                const requestMeta = requestGetTickets.data.meta;
                outputHTML(requestData, requestLinks, requestMeta);
                outputPaginationContent(requestLinks);
                paginationBtnAction();
            } else {
                const requestSearch = await axios.post(page, dataSend, config);
                const requestData = requestSearch.data.data;
                const requestLinks = requestSearch.data.links;
                const requestMeta = requestSearch.data.meta;
                outputHTML(requestData, requestLinks, requestMeta);
                outputPaginationContent(requestLinks);
                paginationBtnAction(true, dataSend);
            }
        } catch (error) {
            displayMessage(errorInterface, 'danger', error);
        }
    };

    const outputPaginationContent = (paginationLinks) => {
        let outputPagination = "";

        if (paginationLinks.prev == null && paginationLinks.next == null) {
            pagination.innerHTML = outputPagination;
        }

        if (paginationLinks.prev != null && paginationLinks.next != null) {
            outputPagination = `
            <button type="button" id="btnPrev" class="btn bg-transparent" data-page="${paginationLinks.prev}">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </button>
            <button type="button" id="btnNext" class="btn bg-transparent" data-page="${paginationLinks.next}">
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </button>`;
            pagination.innerHTML = outputPagination;
        }

        if (paginationLinks.prev == null && paginationLinks.next != null) {
            outputPagination = `
            <button type="button" id="btnPrev" disabled class="btn bg-transparent">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </button>
            <button type="button" id="btnNext" class="btn bg-transparent" data-page="${paginationLinks.next}">
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </button>`;
            pagination.innerHTML = outputPagination;
        }

        if (paginationLinks.prev != null && paginationLinks.next == null) {
            outputPagination = `
            <button type="button" id="btnPrev" class="btn bg-transparent" data-page="${paginationLinks.prev}">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </button>
            <button type="button" id="btnNext" class="btn bg-transparent" disabled>
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </button>`;
            pagination.innerHTML = outputPagination;
        }
    };

    const outputHTML = (requestData, requestLinks, requestMeta) => {
        let userListContent = "";
        requestData.forEach(content => {
            let suspendu     = content.suspended == 0 ? 'Activer' : 'Suspendu';
            let suspenduIcon = content.suspended == 0 ? 'entypo:circle-with-cross' : 'ant-design:check-circle-outlined';
            let suspenduClass = content.suspended == 0 ? 'suspBtn' : 'activBtn';
            let suspenduClassColor = content.suspended == 0 ? 'danger' : 'success';

            userListContent += `
                    <tr>
                        <td> ${content.identity} </td>
                        <td> ${content.email} </td>
                        <td> ${content.role.label} </td>
                        <td> ${suspendu} </td>
                        <td> 
                            <button class="btn btn-outline-primary py-1 px-2 rounded-circle ml-2 btnRole" data-id="${content.id}"> 
                                <span class="iconify" data-inline="false" data-icon="mdi:account-edit-outline" style="font-size: 20px !important;"></span>
                            </button> 
                            <button class="btn btn-outline-secondary py-1 px-2 rounded-circle ml-2 btnEmail" data-id="${content.id}"> 
                                <span class="iconify" data-inline="false" data-icon="mdi:email-edit-outline" style="font-size: 20px !important;"></span>
                            </button> 
                            <button class="btn btn-outline-${suspenduClassColor} py-1 px-2 rounded-circle ml-2 ${suspenduClass}" data-id="${content.id}"> 
                                <span class="iconify" data-inline="false" data-icon="${suspenduIcon}" style="font-size: 20px !important;"></span>
                            </button> 
                        </td>
                    </tr>
                `;
        });
        userList.innerHTML = userListContent;
        compteur.textContent = `${requestMeta.current_page} / ${requestMeta.last_page}`;
        currentPage = requestMeta.current_page;

        let btnRole   = document.querySelectorAll('.btnRole');
        let btnEmail  = document.querySelectorAll('.btnEmail');
        let suspBtn   = document.querySelectorAll('.suspBtn');
        let activBtn  = document.querySelectorAll('.activBtn');

        if (btnRole) {
            btnRole.forEach(element => {
                element.addEventListener('click', evt => {
                    clientIdRole.value = evt.currentTarget.getAttribute('data-id');
                    modalRole.toggle();
                })
            })
        }
        
        if (btnEmail) {
            btnEmail.forEach(element => {
                element.addEventListener('click', evt => {
                    clientIdEmail.value = evt.currentTarget.getAttribute('data-id');
                    modalMail.toggle();
                })
            })
        }
        
        if (suspBtn) {
            suspBtn.forEach(element => {
                element.addEventListener('click', evt => {
                    modalSuspend.toggle();
                    identSuspend.value = evt.currentTarget.getAttribute('data-id');
                })
            })
        }

        if (activBtn){
            activBtn.forEach(element => {
                element.addEventListener('click', evt => {
                    modalActiv.toggle();
                    identActiv.value = evt.currentTarget.getAttribute('data-id');
                })
            })
        }
    }


    const searched = async (words, suspended) => {
        try {
            let dataSend = { words, suspended }
            const requestSearch = await axios.post(userListUrl, dataSend, config);
            const requestData = requestSearch.data.data;
            const requestLinks = requestSearch.data.links;
            const requestMeta = requestSearch.data.meta;
            outputHTML(requestData, requestLinks, requestMeta);
            outputPaginationContent(requestLinks);
            paginationBtnAction(true, dataSend);
        } catch (error) {
            displayMessage(errorInterface, 'danger', error);
        }
    };


    const getUserList = async (refresh = false, currentPage) => {
        try {
            let requestGetUserList;
            if(refresh) {
                requestGetUserList = await axios.get(`${generalUrl}/api/gestion/users?page=${currentPage}`, config);
            } else {
                requestGetUserList = await axios.get(userListUrl, config);
            }
            
            const requestData = requestGetUserList.data.data;
            const requestLinks = requestGetUserList.data.links;
            const requestMeta = requestGetUserList.data.meta;

            outputHTML(requestData, requestLinks, requestMeta);
            outputPaginationContent(requestLinks);

            searchedWord.addEventListener('keyup', evt => {
                let searchedWordValue = evt.currentTarget.value;
                searched(searchedWordValue, searchedState.value);
            });

            searchedState.addEventListener('change', evt => {
                let searchedStateValue = evt.currentTarget.value;
                searched(searchedWord.value, searchedStateValue);
            });

            paginationBtnAction();
        } catch (error) {
            displayMessage(errorInterface, 'danger', error);
        }
    }

    getUserList();

    let activForm   = document.getElementById('activForm');
    
    activForm.addEventListener('submit', evt => {
        evt.preventDefault();
        let dataSend = {
            userId: identActiv.value,
            suspend: false
        }
        axios.post(userSuspendUrl, dataSend, config)
        .then(({data})=> {
            if(data.success){
                identActiv.value = "";
                getUserList(true, currentPage)
                modalActiv.toggle();
                displayMessage(errorInterface, 'success', data.message)
            } else {
                displayMessage(errorInterface, 'danger', data.message)
            }
        })
        .catch(err => displayMessage(errorInterface, 'danger', error))
    });
    
    let suspendForm = document.getElementById('suspendForm');

    suspendForm.addEventListener('submit', evt => {
        evt.preventDefault();
        let dataSend = {
            userId: identSuspend.value,
            suspend: true
        }
        axios.post(userSuspendUrl, dataSend, config)
            .then(({data})=> {
                if (data.success) {
                    identSuspend.value = "";
                    getUserList(true, currentPage)
                    modalSuspend.toggle();
                    displayMessage(errorInterface, 'success', data.message)
                } else {
                    displayMessage(errorInterface, 'danger', data.message)
                }
            })
            .catch(err => displayMessage(errorInterface, 'danger', error))
    });


    let modifMailForm = document.getElementById('modifMailForm');
    modifMailForm.addEventListener('submit', evt => {
        evt.preventDefault();
        let id = clientIdEmail.value;
        let userEditMailUrl = `${generalUrl}/api/gestion/user/mail/${id}`;
        let clientModifMail = document.getElementById("clientModifMail");

        let dataSend = {
            email: clientModifMail.value
        }

        axios.put(userEditMailUrl, dataSend, config)
            .then(({ data }) => {
                if (data.success) {
                    getUserList(true, currentPage)
                    modalMail.toggle();
                    clientIdEmail.value = "";
                    displayMessage(errorInterface, 'success', data.message)
                } else {
                    displayMessage(errorInterface, 'danger', data.message)
                }
            })
            .catch(err => displayMessage(errorInterface, 'danger', error))
    });

    let modifRoleForm = document.getElementById('modifRoleForm');
    modifRoleForm.addEventListener('submit', evt => {
        evt.preventDefault();
        let id = clientIdRole.value;
        let userEditRoleUrl = `${generalUrl}/api/gestion/user/role/${id}`;
        let clientRoleChange = document.getElementById("clientRoleChange");

        let dataSend = {
            roleId: clientRoleChange.value
        }

        axios.put(userEditRoleUrl, dataSend, config)
            .then(({ data }) => {
                if (data.success) {
                    getUserList(true, currentPage)
                    modalRole.toggle();
                    displayMessage(errorInterface, 'success', data.message)
                } else {
                    displayMessage(errorInterface, 'danger', data.message)
                }
            })
            .catch(err => displayMessage(errorInterface, 'danger', error))
    });
})
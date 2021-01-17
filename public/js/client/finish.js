window.addEventListener("DOMContentLoaded", (event) => {
    let generalUrl = location.origin;
    let orderFinishUrl = `${generalUrl}/api/orders/finished`;

    let config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };

    let dataList     = document.getElementById('dataList');
    let compteur     = document.getElementById('compteur');
    let pagination   = document.getElementById('pagination');
    var currentPage  = 1;

    var messageFlash = new bootstrap.Toast(document.getElementById('messageFlash'));
    const flash = (message, success = true) => {
        let toastContainer = document.getElementById('messageFlash');
        let bodyToast = document.getElementById('bodyToast');
        if (success) {
            toastContainer.classList.add('bg-success');
            bodyToast.textContent = message;
        } else {
            toastContainer.classList.add('bg-danger');
            bodyToast.textContent = message;
        }
        bodyToast.classList.add('text-white');
        messageFlash.show()
    }

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
            flash('Erreur lors de la pagination', false)
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

    const downloadPDF = (filename, data) => {
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }
    
    const outputHTML = (requestData, requestLinks, requestMeta) => {
        let contentHTML = "";
        requestData.forEach(content => {
            contentHTML += `
                    <tr>
                        <td> ${content.order.invoice.filename} </td>
                        <td> ${content.order.created_at} </td>
                        <td> ${content.order.invoice.total} </td>
                        <td> 
                            <button class="btn btn-outline-danger py-1 px-2 rounded-circle ml-2 btnPDF" data-id="${content.order.id}"> 
                                <span class="iconify" data-inline="false" data-icon="bx:bxs-file-pdf" style="font-size: 20px !important;"></span>
                            </button> 
                        </td>
                    </tr>
                `;
        });
        dataList.innerHTML = contentHTML;
        compteur.textContent = `${requestMeta.current_page} / ${requestMeta.last_page}`;
        currentPage = requestMeta.current_page;

        let btnPDF = document.querySelectorAll('.btnPDF');
        if (btnPDF) {
            btnPDF.forEach(btn => {
                btn.addEventListener('click', evt => {
                    let id = evt.currentTarget.getAttribute('data-id');
                    let filename = evt.currentTarget.getAttribute('data-name');
                    axios.get(`${generalUrl}/api/order/${id}/pdf`, config)
                        .then(({ data }) => {
                            downloadPDF(filename, data)
                        })
                        .catch(err => flash('Une erreur est survenue', false));
                })
            })
        }
    }

    const getDataList = async (refresh = false, currentPage) => {
        try {
            let requestgetDataList;
            if (refresh) {
                requestgetDataList = await axios.get(`${generalUrl}/api/orders/finished?page=${currentPage}`, config);
            } else {
                requestgetDataList = await axios.get(orderFinishUrl, config);
            }

            const requestData = requestgetDataList.data.data;
            const requestLinks = requestgetDataList.data.links;
            const requestMeta = requestgetDataList.data.meta;

            outputHTML(requestData, requestLinks, requestMeta);
            outputPaginationContent(requestLinks);
            paginationBtnAction();
        } catch (error) {
            flash('Erreur : Initialisation raté', false)
        }
    }

    getDataList();

    let backMenuButton = document.getElementById('backMenuButton');
    backMenuButton.addEventListener('click', evt => {
        location.href = `${generalUrl}/dashboard/client/commandes`
    });
})
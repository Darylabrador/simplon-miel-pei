window.addEventListener("DOMContentLoaded", (event) => {
    let generalUrl    = location.origin;
    let addProductUrl = `${generalUrl}/api/product/add`;
    let productListUrl = `${generalUrl}/api/products/gestion`;

    let config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };

    let formAddProduct      = document.getElementById('formAddProduct');
    let addProductName      = document.getElementById('addProductName');
    let addProductPrice     = document.getElementById('addProductPrice');
    let addProductQuantity  = document.getElementById('addProductQuantity');
    let addProductFile      = document.getElementById('addProductFile');

    let errorInterface = document.getElementById('errorInterface');

    var modalAddProduct = new bootstrap.Modal(document.getElementById('modalAddProduct'))
    var modalEditProduct = new bootstrap.Modal(document.getElementById('modalEditProduct'))
    var modalStockProduct = new bootstrap.Modal(document.getElementById('modalStockProduct'))
    var modalDeleteProduct = new bootstrap.Modal(document.getElementById('modalDeleteProduct'))

    const displayMessage = (node, type, message) => {
        node.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show mt-1" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    };


    let productList     = document.getElementById('productList');
    let compteur        = document.getElementById('compteur');
    let searchedWord    = document.getElementById('searchedWord');
    let pagination      = document.getElementById('pagination');
    var currentPage     = "";

    let editProductId   = document.getElementById('editProductId');
    let stockProductId  = document.getElementById('stockProductId');
    let deleteProductId = document.getElementById('deleteProductId');

    let editProductName = document.getElementById('editProductName');
    let editProductPrice = document.getElementById('editProductPrice');
    let stockProductQuantity = document.getElementById('stockProductQuantity');


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

    const getSpecificData = async (id, isEdit = true) => {
        try {
            const request = await axios.get(`${generalUrl}/api/product/${id}`, config);
            const requestData = request.data.data;

            if (isEdit) {
                editProductName.value = requestData.produit.name;
                editProductPrice.value = requestData.produit.price;
            } else {
                stockProductQuantity.value = requestData.produit.quantity;
            }
        } catch(err) {
            displayMessage(errorInterface, 'danger', err);
        }
    }
    const outputHTML = (requestData, requestLinks, requestMeta) => {
        let contentHTML = "";
        requestData.forEach(content => {
            contentHTML += `
                    <tr>
                        <td> <img src="${generalUrl}/images/${content.produit.image}" style="max-width: 80px;">
                         </td>
                        <td> ${content.produit.name} </td>
                        <td> ${content.produit.price} </td>
                        <td> ${content.produit.quantity} </td>
                        <td> 
                            <button class="btn btn-outline-primary py-1 px-2 rounded-circle ml-2 btnEdit" data-id="${content.produit.id}"> 
                                <span class="iconify" data-inline="false" data-icon="clarity:edit-solid" style="font-size: 20px !important;"></span>
                            </button> 
                            <button class="btn btn-outline-secondary py-1 px-2 rounded-circle ml-2 btnStock" data-id="${content.produit.id}"> 
                                <span class="iconify" data-inline="false" data-icon="ic:outline-inventory-2" style="font-size: 20px !important;"></span>
                            </button> 
                            <button class="btn btn-outline-danger py-1 px-2 rounded-circle ml-2 btnDelete" data-id="${content.produit.id}"> 
                                <span class="iconify" data-inline="false" data-icon="bx:bxs-trash-alt" style="font-size: 20px !important;"></span>
                            </button> 
                        </td>
                    </tr>
                `;
        });
        productList.innerHTML = contentHTML;
        compteur.textContent = `${requestMeta.current_page} / ${requestMeta.last_page}`;
        currentPage = requestMeta.current_page;

        let btnEdit     = document.querySelectorAll('.btnEdit');
        let btnStock    = document.querySelectorAll('.btnStock');
        let btnDelete   = document.querySelectorAll('.btnDelete');

        if (btnEdit) {
            btnEdit.forEach(element => {
                element.addEventListener('click', evt => {
                    let idProd = evt.currentTarget.getAttribute('data-id')
                    editProductId.value = idProd;
                    getSpecificData(idProd)
                    modalEditProduct.toggle();
                })
            })
        }

        if (btnStock) {
            btnStock.forEach(element => {
                element.addEventListener('click', evt => {
                    let idProd = evt.currentTarget.getAttribute('data-id')
                    stockProductId.value = idProd;
                    getSpecificData(idProd, false)
                    modalStockProduct.toggle();
                })
            })
        }

        if (btnDelete) {
            btnDelete.forEach(element => {
                element.addEventListener('click', evt => {
                    let idProd = evt.currentTarget.getAttribute('data-id')
                    deleteProductId.value = idProd;
                    modalDeleteProduct.toggle();
                })
            })
        }
    }


    const searched = async (words) => {
        try {
            let dataSend = { words }
            const requestSearch = await axios.post(productListUrl, dataSend, config);
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


    const getDataList = async (refresh = false, currentPage) => {
        try {
            let requestgetDataList;
            if (refresh) {
                requestgetDataList = await axios.get(`${generalUrl}/api/products/gestion?page=${currentPage}`, config);
            } else {
                requestgetDataList = await axios.get(productListUrl, config);
            }

            const requestData = requestgetDataList.data.data;
            const requestLinks = requestgetDataList.data.links;
            const requestMeta = requestgetDataList.data.meta;
            outputHTML(requestData, requestLinks, requestMeta);
            outputPaginationContent(requestLinks);
            searchedWord.addEventListener('keyup', evt => {
                let searchedWordValue = evt.currentTarget.value;
                searched(searchedWordValue);
            });

            paginationBtnAction();
        } catch (error) {
            displayMessage(errorInterface, 'danger', error);
        }
    }

    getDataList();

    formAddProduct.addEventListener('submit', evt => {
        evt.preventDefault();
        let formData = new FormData();
        formData.set('name', addProductName.value);
        formData.set('price', addProductPrice.value);
        formData.set('quantity', addProductQuantity.value);
        formData.set('image', addProductFile.files[0]);

        axios.post(addProductUrl, formData, config)
            .then(({ data }) => {
                if (data.success) {
                    formAddProduct.reset();
                    displayMessage(errorInterface, 'success', data.message);
                    modalAddProduct.toggle();
                    getDataList(true, currentPage);
                } else {
                    displayMessage(errorInterface, 'danger', data.message)
                }
            })
            .catch(err => displayMessage(errorInterface, 'danger', err))
    });

    let formEditProduct = document.getElementById('formEditProduct');
    formEditProduct.addEventListener('submit', evt => {
        evt.preventDefault();
        let formData = new FormData();
        formData.set('name', editProductName.value);
        formData.set('price', editProductPrice.value);
        formData.set('image', editProductFile.files[0]);

        axios.post(`${generalUrl}/api/product/${editProductId.value}`, formData, config)
            .then(({ data }) => {
                if (data.success) {
                    formEditProduct.reset();
                    displayMessage(errorInterface, 'success', data.message);
                    modalEditProduct.toggle();
                    getDataList(true, currentPage);
                } else {
                    displayMessage(errorInterface, 'danger', data.message)
                }
            })
            .catch(err => displayMessage(errorInterface, 'danger', err))
    })

    let formStockProduct = document.getElementById('formStockProduct');
    formStockProduct.addEventListener('submit', evt => {
        evt.preventDefault();
        let dataSend = {
            quantity: stockProductQuantity.value
        }

        axios.put(`${generalUrl}/api/product/${editProductId.value}/stock`, dataSend, config)
            .then(({ data }) => {
                if (data.success) {
                    formStockProduct.reset();
                    displayMessage(errorInterface, 'success', data.message);
                    modalStockProduct.toggle();
                    getDataList(true, currentPage);
                } else {
                    displayMessage(errorInterface, 'danger', data.message)
                }
            })
            .catch(err => displayMessage(errorInterface, 'danger', err))
    })


    let formDeleteProduct = document.getElementById('formDeleteProduct');
    formDeleteProduct.addEventListener('submit', evt => {
        evt.preventDefault();
        axios.delete(`${generalUrl}/api/product/${deleteProductId.value}`, config)
            .then(({ data }) => {
                if (data.success) {
                    formDeleteProduct.reset();
                    displayMessage(errorInterface, 'success', data.message);
                    modalDeleteProduct.toggle();
                    getDataList(true, currentPage);
                } else {
                    displayMessage(errorInterface, 'danger', data.message)
                }
            })
            .catch(err => displayMessage(errorInterface, 'danger', err))
    })
})
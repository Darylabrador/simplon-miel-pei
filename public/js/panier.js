window.addEventListener("DOMContentLoaded", (event) => {
    let generalUrl = location.origin;
    let shoppingcartUrl = `${location.origin}/api/shoppingcart`;
    let confirmUrl = `${generalUrl}/api/shoppingcart/confirm`;

    let prodPanierContainer = document.getElementById('prodPanierContainer');
    
    let formCartEdit  = document.getElementById('formCartEdit');
    let cartProductId = document.getElementById('cartProductId');
    let cartQuantity  = document.getElementById('cartQuantity');

    let billingInfo = document.getElementById('billingInfo');
    let deliveryInfo = document.getElementById('deliveryInfo');
    let totalCommand = document.getElementById('totalCommand');
    let validationCommande = document.getElementById('validationCommande');

    let config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };

    var modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'))

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

    const verifLink = async () => {
        let defaultItem = document.querySelectorAll('.defaultItem');
        let menuLink = document.getElementById('menuLink');
        let cartLink = document.getElementById('cartLink');

        try {
            let verifyUrl = `${location.origin}/api/verify`;
            const check = await axios.get(verifyUrl, config);
            const checkData = check.data.data;
            menuLink.classList.remove('d-none');
            defaultItem.forEach(btn => {
                btn.remove();
            })

            if (checkData.role_id == 1 || checkData.role_id == 3) {
                location.href = '/'
            }

            if (checkData.role_id == 2) {
                cartLink.classList.remove('d-none');
            }

        } catch (error) {
            localStorage.clear();
            defaultItem.forEach(btn => {
                btn.classList.remove('d-none');
            })
            menuLink.remove();
        }
    }

    verifLink()

    const getSpecificData = async (id) => {
        try {
            const request = await axios.get(`${generalUrl}/api/welcome/product/${id}`, config);
            const requestData = request.data.data;
            cartQuantity.setAttribute('max', requestData.produit.quantity)
        } catch (err) {
            flash('Erreur : Données individuel', false)
        }
    }

    const getData = async  () => {
        try {
            const reqData = await axios.get(shoppingcartUrl, config);
            const data = reqData.data.data;
            var total = 0;
            let htmlInfo = "";
            if(data.length != 0) {
                data.forEach(info => {
                    htmlInfo += `
                    <div class="mt-2 bg-white card pb-3 cardInfo">
                        <div class="d-flex justify-content-end mr-3">
                            <button class="btn outline-0 border-0 btnDelete" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-id="${info.productInfo.id}">
                                <span class="iconify iconify-inactive" data-inline="false" data-icon="bx:bxs-trash-alt" style="font-size: 24px; color: red;"></span>
                            </button>
                        </div>
                        <div class="row mt-0">
                            <div class="ml-3 col-12 col-lg-3 col-md-5 pr-0">
                                <img class="img-fluid" src="${generalUrl}/images/${info.productInfo.image}" alt="${info.productInfo.name}" style="max-width: 200px !important; max-height: 200px !important;">
                            </div>
                            <div class="ml-3 col-12 col-lg-5 col-md-5">
                                <p class="my-0"> ${info.productInfo.name} </p>
                                <p class="my-0"> Prix unité : ${info.productInfo.price} €</p>
                                <p class="my-0"> Quantités : ${info.quantity} </p>
                                <button class="btn btn-primary border-0 quantityEdit mt-3 py-1 px-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-id="${info.productInfo.id}" data-value="${info.quantity}">
                                    Modifier
                                </button>
                            </div>
                        </div>
                    </div>`;

                    total += (info.quantity * info.productInfo.price);
                });

                prodPanierContainer.innerHTML = htmlInfo;
                totalCommand.textContent = total.toFixed(2);

                // last card margin
                let cardInfo = document.querySelectorAll('.cardInfo')
                cardInfo[cardInfo.length - 1].setAttribute('style', 'margin-bottom: 90px !important;')

                // actions
                let btnDelete       = document.querySelectorAll('.btnDelete');
                let quantityEdit    = document.querySelectorAll('.quantityEdit');

                if(btnDelete) {
                    btnDelete.forEach(btn => {
                        btn.addEventListener('click', evt => {
                            let idDelete = evt.currentTarget.getAttribute('data-id')
                            axios.delete(`${location.origin}/api/shoppingcart/${idDelete}`, config)
                                .then(({data}) => {
                                    if(data.success) {
                                        flash(data.message)
                                        getData();
                                    } else {
                                        flash(data.message, false)
                                    }
                                })
                                .catch(err => flash("Ressource indisponible", false))
                        })
                    })
                }

                if (quantityEdit) {
                    quantityEdit.forEach(editInfo => {
                        editInfo.addEventListener('click',evt => {
                            let id = evt.currentTarget.getAttribute('data-id')
                            let value = evt.currentTarget.getAttribute('data-value')
                            cartProductId.value = id
                            cartQuantity.value = value
                            getSpecificData(id)
                            modalEdit.toggle();
                        })
                    })
                }
            } else {
                prodPanierContainer.innerHTML = htmlInfo;
            }
        } catch (error) {
            flash("Ressource indisponible", false)
        }
    }


    getData();

    formCartEdit.addEventListener('submit', evt => {
        evt.preventDefault();
        let dataSend = {
            quantity: cartQuantity.value
        }
        axios.put(`${location.origin}/api/shoppingcart/${cartProductId.value}`, dataSend, config)
            .then(({ data }) => {
                if (data.success) {
                    cartProductId.value = "";
                    modalEdit.toggle();
                    flash(data.message)
                    getData();
                } else {
                    flash(data.message, false)
                }
            })
            .catch(err => flash("Ressource indisponible", false))
    })

    let btnClose = document.querySelectorAll('.closeModal');
    btnClose.forEach(btn => {
        btn.addEventListener('click', evt => {
            cartProductId.value = "";
            formCartEdit.reset();
            cartQuantity.removeAttribute('max')
        })
    })

    validationCommande.addEventListener('click', evt => {
        evt.stopPropagation
        let dataSend = {
            billing: billingInfo.value,
            delivery: deliveryInfo.value
        }

        axios.post(confirmUrl, dataSend, config)
            .then(({ data }) => {
                if (data.success) {
                    billingInfo.value = "";
                    deliveryInfo.value = "";
                    getData();
                    flash(data.message)
                } else {
                    flash(data.message, false)
                }
            })
            .catch(err => flash("Ressource indisponible", false))
        
    })
})
window.addEventListener("DOMContentLoaded", (event) => {
    let generalUrl = location.origin;
    let producerId = document.getElementById('producerId')
    let producerInfoUrl = `${generalUrl}/api/producer/${producerId.value}`;
    let directCommand = `${generalUrl}/api/shoppingcart/direct`;
    let addToCart = `${generalUrl}/api/shoppingcart/add`;

    let sheetName    = document.getElementById('sheetName');
    let prodContainer = document.getElementById('prodContainer');

    var modalCart    = new bootstrap.Modal(document.getElementById('modalCart'))
    var modalCommand = new bootstrap.Modal(document.getElementById('modalCommand'))
    var price;

    let formCommand          = document.getElementById('formCommand');
    let commandProdId        = document.getElementById('commandProdId');
    let commandProdName      = document.getElementById('commandProdName');
    let commandStockDispo    = document.getElementById('commandStockDispo');
    let commandStockQuantity = document.getElementById('commandStockQuantity');
    let commandStockTotal    = document.getElementById('commandStockTotal');
    let commandDelivery      = document.getElementById('commandDelivery');
    let commandBilling       = document.getElementById('commandBilling');


    let formCart = document.getElementById('formCart');
    let prodCartId = document.getElementById('prodCartId');
    let prodCartName = document.getElementById('prodCartName');
    let prodCartDispo = document.getElementById('prodCartDispo');
    let prodCartQuantity = document.getElementById('prodCartQuantity');
    let prodCartTotal = document.getElementById('prodCartTotal');


    let config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };

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

    const verifToken = async () => {
        let commandBtn = document.querySelectorAll('.commandBtn');
        let commandContainer = document.querySelectorAll('.commandContainer');
        let defaultItem = document.querySelectorAll('.defaultItem');
        let menuLink = document.getElementById('menuLink');
        let cartBtn = document.querySelectorAll('.cartBtn'); 
        let cartContainer = document.querySelectorAll('.cartContainer');

        try {
            let verifyUrl = `${location.origin}/api/verify`;

            const check = await axios.get(verifyUrl, config);
            const checkData = check.data.data;
            cartBtn.forEach(btn => {
                btn.classList.remove('d-none');
            })
            commandBtn.forEach(btn => {
                btn.classList.remove('d-none');
            })
            menuLink.classList.remove('d-none');
            defaultItem.forEach(btn => {
                btn.remove();
            })

            if (checkData.role_id == 1 || checkData.role_id == 3) {
                commandBtn.forEach(btn => {
                    btn.remove();
                })
                commandContainer.forEach(btn => {
                    btn.remove();
                })
                cartBtn.forEach(btn => {
                    btn.remove();
                })
                cartContainer.forEach(btn => {
                    btn.remove();
                })
            }

            if (checkData.role_id == 2) {
                cartLink.classList.remove('d-none');
            }
        } catch (error) {
            localStorage.clear();
            commandBtn.forEach(btn => {
                btn.remove();
            })
            commandContainer.forEach(btn => {
                btn.remove();
            })
            cartBtn.forEach(btn => {
                btn.remove();
            })
            cartContainer.forEach(btn => {
                btn.remove();
            }) 
            defaultItem.forEach(btn => {
                btn.classList.remove('d-none');
            })
            menuLink.remove();
        }
    }

    const getProdInfo = async (id, isCart = false) => {
        try {
            const requestProd = await axios.get(`${generalUrl}/api/welcome/product/${id}`, config);
            const requestProdData = requestProd.data.data;

            if(isCart) {
                prodCartName.textContent = requestProdData.produit.name;
                prodCartDispo.textContent = requestProdData.produit.quantity;
            } else {
                commandProdName.textContent = requestProdData.produit.name;
                commandStockDispo.textContent = requestProdData.produit.quantity;
            }
        } catch (error) {
            flash('Erreur : Information produit invididuel', false)
        }
    }


    const getProducerInfo = async () => {
        try {
            const reqProducerInfo = await axios.get(producerInfoUrl, config);
            const producerData = reqProducerInfo.data.data;

            if (producerData.length == 0){
                location.href = '/';
            }
            
            let bestProdCard = ``;

            producerData.forEach(prod => {
                bestProdCard += `
                <div class="card col-8 my-2 col-lg-3 col-md-4 px-0 mx-2">
                    <img src="${generalUrl}/images/${prod.produit.image}" class="card-img-top img-fluid" alt="${prod.produit.name}" style="max-height: 200px !important;">
                    <div class="card-body">
                        <h5 class="card-title my-0">${prod.produit.name}</h5>
                        <p class="card-text my-0">
                            Prix : ${prod.produit.price} € <br>
                            Stock : ${prod.produit.quantity}
                        </p>
                        <div class="d-flex justify-content-end">
                            <div class="cartContainer mr-3">
                                <button type="button" class="btn btn-secondary py-1 px-2 d-none cartBtn" data-id="${prod.produit.id}" data-price="${prod.produit.price}" data-quantity="${prod.produit.quantity}"> Ajouter au panier </button>
                            </div>
                            <div class="commandContainer">
                                <button type="button" class="btn btn-primary py-1 px-2 d-none commandBtn" data-id="${prod.produit.id}" data-price="${prod.produit.price}" data-quantity="${prod.produit.quantity}"> Commander </button>
                            </div>
                        </div>
                    </div>
                </div>`;
            })

            prodContainer.innerHTML = bestProdCard;
            sheetName.innerHTML = `${producerData[0].producteur.identity} <br> <span style="font-size: 15px !important;"> ${producerData[0].producteur.exploitations[0].address} </span>`;
            verifToken();


            let commandBtn = document.querySelectorAll('.commandBtn');
            if (commandBtn) {
                commandBtn.forEach(btn => {
                    btn.addEventListener('click', evt => {
                        let idProdCommand = evt.currentTarget.getAttribute('data-id');
                        price = evt.currentTarget.getAttribute('data-price');
                        commandStockTotal.textContent = evt.currentTarget.getAttribute('data-price');
                        commandStockQuantity.setAttribute('max', evt.currentTarget.getAttribute('data-quantity'))
                        commandProdId.value = idProdCommand;
                        modalCommand.toggle();
                        getProdInfo(idProdCommand)
                    })
                })
            }

            let cartBtn = document.querySelectorAll('.cartBtn');
            if (cartBtn) {
                cartBtn.forEach(btn => {
                    btn.addEventListener('click', evt => {
                        let idProdCart = evt.currentTarget.getAttribute('data-id');
                        price = evt.currentTarget.getAttribute('data-price');
                        prodCartTotal.textContent = evt.currentTarget.getAttribute('data-price');
                        prodCartQuantity.setAttribute('max', evt.currentTarget.getAttribute('data-quantity'))
                        prodCartId.value = idProdCart;
                        modalCart.toggle();
                        getProdInfo(idProdCart, true)
                    })
                })
            }
        } catch (error) {
            flash('Ressource indisponible', false)
        }
    }

    getProducerInfo();

    commandStockQuantity.addEventListener('change', evt => {
        let valueChosen = evt.currentTarget.value;
        commandStockTotal.textContent = (valueChosen * price).toFixed(2);
    })

    commandStockQuantity.addEventListener('keyup', evt => {
        let valueChosen = evt.currentTarget.value;
        commandStockTotal.textContent = (valueChosen * price).toFixed(2);
    })

    prodCartQuantity.addEventListener('change', evt => {
        let valueChosen = evt.currentTarget.value;
        prodCartTotal.textContent = (valueChosen * price).toFixed(2);
    })

    prodCartQuantity.addEventListener('keyup', evt => {
        let valueChosen = evt.currentTarget.value;
        prodCartTotal.textContent = (valueChosen * price).toFixed(2);
    })

    formCommand.addEventListener('submit', evt => {
        evt.preventDefault();
        let dataSend = {
            billing: commandBilling.value,
            delivery: commandDelivery.value,
            quantity: commandStockQuantity.value,
            product: commandProdId.value,
        }

        axios.post(directCommand, dataSend, config)
            .then(({ data }) => {
                if (data.success) {
                    modalCommand.toggle();
                    formCommand.reset();
                    flash(data.message);
                    price = undefined;
                    getProducerInfo();
                } else {
                    flash(data.message, false)
                }
            })
            .catch(err => flash('Une erreur est survenue', false))
    })


    formCart.addEventListener('submit', evt => {
        evt.preventDefault();

        let dataSend = {
            product: prodCartId.value,
            quantity: prodCartQuantity.value,
        }

        axios.post(addToCart, dataSend, config)
            .then(({ data }) => {
                if (data.success) {
                    modalCart.toggle();
                    formCart.reset();
                    flash(data.message);
                    price = undefined;
                    getProducerInfo();
                } else {
                    flash(data.message, false)
                }
            })
            .catch(err => flash('Une erreur est survenue', false))
    })

    let btnClose = document.querySelectorAll('.closeModal');
    btnClose.forEach(btn => {
        btn.addEventListener('click', evt => {
            price = undefined;
            commandStockTotal.textContent = 0;
            commandStockQuantity.removeAttribute('max');
            commandStockQuantity.value = 1;

            prodCartTotal.textContent = 0;
            prodCartQuantity.removeAttribute('max');
            prodCartQuantity.value = 1;
        })
    })
})
window.addEventListener("DOMContentLoaded", (event) => {
    let generalUrl = location.origin;
    let exploitationsUrl = `${generalUrl}/api/exploitations`;
    let bestProductUrl   = `${generalUrl}/api/products/best`;
    let directCommand    = `${generalUrl}/api/shoppingcart/direct`;

    let bestProdContainer = document.getElementById('bestProdContainer');
    let formCommand       = document.getElementById('formCommand');

    let commandProdId        = document.getElementById('commandProdId');
    let commandProdName      = document.getElementById('commandProdName');
    let commandStockDispo    = document.getElementById('commandStockDispo');
    let commandStockQuantity = document.getElementById('commandStockQuantity');
    let commandStockTotal    = document.getElementById('commandStockTotal');
    let commandDelivery      = document.getElementById('commandDelivery');
    let commandBilling       = document.getElementById('commandBilling');

    var modalCommand = new bootstrap.Modal(document.getElementById('modalCommand'))
    
    let config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
    
    var price;

    var messageFlash = new bootstrap.Toast(document.getElementById('messageFlash'));

    const flash = (message, success = true) => {
        let toastContainer = document.getElementById('messageFlash');
        let bodyToast      = document.getElementById('bodyToast');
        if(success) {
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
        let cartLink = document.getElementById('cartLink');
  
        try {
            let verifyUrl = `${location.origin}/api/verify`;
            const check = await axios.get(verifyUrl, config);
            const checkData = check.data.data;
            commandBtn.forEach(btn => {
                btn.classList.remove('d-none');
            })
            menuLink.classList.remove('d-none');
            defaultItem.forEach(btn => {
                btn.remove();
            })

            if (checkData.role_id == 1 || checkData.role_id == 3){
                commandBtn.forEach(btn => {
                    btn.remove();
                })
                commandContainer.forEach(btn => {
                    btn.remove();
                })
            }

            if (checkData.role_id == 2){
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

            defaultItem.forEach(btn => {
                btn.classList.remove('d-none');
            })
            menuLink.remove();
        }
    }

    const createMap = (lat, lon, zoom, data = null) => {
        // to reinit map
        var container = L.DomUtil.get('mapid');
        if (container != null) {
            container._leaflet_id = null;
        }

        // init view map
        var map = L.map('mapid').setView([lat, lon], zoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: 1,
            maxZoom: 20,
        }).addTo(map);

        // set marker
        let arrayMarker = [];
        for(let i = 0; i < data.length; i++){
            arrayMarker.push(L.marker([data[i].lattitude, data[i].longitude]).bindPopup(`<p style="margin: 0;">${data[i].owner} : <br> ${data[i].description}</p><b>${data[i].address}</b><br><a href="${location.origin}/fiche/producteur/${data[i].userId}">Voir la fiche producteur</a>`))
        }
        L.layerGroup(arrayMarker).addTo(map);
    }

    const getExploitations = async () => {
        try {
            const requestExploitations = await axios.get(exploitationsUrl);
            const requestExploitationsData = requestExploitations.data.data;
            createMap(-21.1287074, 55.4627191, 10, requestExploitationsData);
        } catch (error) {
            flash('Erreur : Initialisation de la carte', false)           
        }
    }

    
    const getProdInfo = async (id) => {
        try {
            const requestProd = await axios.get(`${generalUrl}/api/welcome/product/${id}`, config);
            const requestProdData = requestProd.data.data;
            commandProdName.textContent   = requestProdData.produit.name;
            commandStockDispo.textContent = requestProdData.produit.quantity;
        } catch (error) {
            flash('Erreur : Information produit invididuel', false)  
        }
    }


    const getBestProduct = async () => {
        try {
            const requestBestProds = await axios.get(bestProductUrl);
            const bestProdData = requestBestProds.data.data;
            let bestProdCard = ``;

            bestProdData.forEach(prod => {
                bestProdCard += `
                <div class="card col-8 my-2 col-lg-2 col-md-2 px-0">
                    <img src="${generalUrl}/images/${prod.produit.image}" class="card-img-top img-fluid" alt="${prod.produit.name}">
                    <div class="card-body">
                        <h5 class="card-title my-0">${prod.produit.name}</h5>
                        <p class="card-text my-0">
                            Prix : ${prod.produit.price} € <br>
                            Stock : ${prod.produit.quantity}
                        </p>
                        <div class="d-flex justify-content-end commandContainer">
                            <button type="button" class="btn btn-primary py-1 px-2 d-none commandBtn" data-id="${prod.produit.id}" data-price="${prod.produit.price}" data-quantity="${prod.produit.quantity}"> Commander </button>
                        </div>
                    </div>
                </div>`;
            })

            bestProdContainer.innerHTML = bestProdCard;
            let commandBtn = document.querySelectorAll('.commandBtn');

            if (commandBtn){
                commandBtn.forEach(btn => {
                    btn.addEventListener('click', evt => {
                        let idProdCommand = evt.currentTarget.getAttribute('data-id');
                        price     = evt.currentTarget.getAttribute('data-price');
                        commandStockTotal.textContent = evt.currentTarget.getAttribute('data-price');
                        commandStockQuantity.setAttribute('max', evt.currentTarget.getAttribute('data-quantity'))
                        commandProdId.value = idProdCommand;
                        modalCommand.toggle();
                        getProdInfo(idProdCommand)
                    })
                })
            }
            verifToken();
        } catch (error) {
            flash('Erreur : Initialisation des meilleurs produits', false)  
        }
    }

    getExploitations();
    getBestProduct();


    commandStockQuantity.addEventListener('change', evt => {
        let valueChosen = evt.currentTarget.value;
        commandStockTotal.textContent = (valueChosen * price).toFixed(2);
    })

    commandStockQuantity.addEventListener('keyup', evt => {
        let valueChosen = evt.currentTarget.value;
        commandStockTotal.textContent = (valueChosen * price).toFixed(2);
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
            .then(({data}) => {
                if(data.success) {
                    modalCommand.toggle();
                    formCommand.reset();
                    flash(data.message)  
                    price = undefined;
                    getBestProduct();
                } else {
                    flash(data.message, false)  
                }
            })
            .catch(err => flash('Une erreur est survenue', false)  )
    })

    let btnClose = document.querySelectorAll('.closeModal');
    btnClose.forEach(btn => {
        btn.addEventListener('click', evt => {
            price = undefined;
            commandStockTotal.textContent = 0;
            commandStockQuantity.removeAttribute('max');
            commandStockQuantity.value = 1;
        })
    })
   
})
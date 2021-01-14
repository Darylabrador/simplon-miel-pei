window.addEventListener("DOMContentLoaded", (event) => {
    let generalUrl = location.origin;
    let producerId = document.getElementById('producerId')
    let producerInfoUrl = `${generalUrl}/api/producer/${producerId.value}`;
    let sheetName    = document.getElementById('sheetName');
    let prodContainer = document.getElementById('prodContainer');

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
                                <button type="button" class="btn btn-secondary py-1 px-2 d-none cartBtn" data-id="${prod.produit.id}"> Ajouter au panier </button>
                            </div>
                            <div class="commandContainer">
                                <button type="button" class="btn btn-primary py-1 px-2 d-none commandBtn" data-id="${prod.produit.id}"> Commander </button>
                            </div>
                        </div>
                    </div>
                </div>`;
            })

            prodContainer.innerHTML = bestProdCard;
            sheetName.innerHTML = `${producerData[0].producteur.identity} <br> <span style="font-size: 15px !important;"> ${producerData[0].producteur.exploitations[0].address} </span>`;
            verifToken();

        } catch (error) {
            flash('Ressource indisponible', false)
        }
    }

    getProducerInfo()
})
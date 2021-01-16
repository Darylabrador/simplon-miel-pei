window.addEventListener("DOMContentLoaded", (event) => {
    let generalUrl = location.origin;
    let shoppingcartUrl = `${location.origin}/api/shoppingcart`;
    let prodPanierContainer = document.getElementById('prodPanierContainer');


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

    const getData = async  () => {
        try {
            const reqData = await axios.get(shoppingcartUrl, config);
            const data = reqData.data.data;
            let htmlInfo = "";
            if(data.length != 0) {
                data.forEach(info => {
                    htmlInfo += `
                    <div class="mt-2 bg-white card pb-3">
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
                                <input type="number" step="1" class="form-control quantityEdit" style="margin-top:45px; max-width: 150px;" value="${info.productInfo.quantity}"  data-id="${info.productInfo.id}">
                            </div>
                        </div>
                    </div>`;
                });

                prodPanierContainer.innerHTML = htmlInfo;

                let btnDelete       = document.querySelectorAll('.btnDelete');
                let quantityEdit    = document.querySelectorAll('.quantityEdit');
            }



            console.log(data)
        } catch (error) {
            console.log(error)
            flash("Ressource indisponible", false)
        }
    }

    getData();
})
window.addEventListener("DOMContentLoaded", (event) => {
    let generalUrl = location.origin;
    let exploitationsUrl = `${generalUrl}/api/exploitations`;
    let bestProductUrl   = `${generalUrl}/api/products/best`;

    let bestProdContainer = document.getElementById('bestProdContainer');

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
            arrayMarker.push(L.marker([data[i].lattitude, data[i].longitude]).addTo(map).bindPopup(`<p style="margin: 0;">${data[i].owner} : <br> ${data[i].description}</p><b>${data[i].address}</b><br><a href="#">Voir la fiche producteur</a>`))
        }
        L.layerGroup(arrayMarker).addTo(map);
    }

    const getExploitations = async () => {
        try {
            const requestExploitations = await axios.get(exploitationsUrl);
            const requestExploitationsData = requestExploitations.data.data;
            createMap(-21.1287074, 55.4627191, 10, requestExploitationsData);
        } catch (error) {
            console.log(error)            
        }
    }

    const getBestProduct = async () => {
        try {
            const requestBestProds = await axios.get(bestProductUrl);
            const bestProdData = requestBestProds.data.data;
            console.log(bestProdData)

            let bestProdCard = ``;

            bestProdData.forEach(prod => {
                bestProdCard += `
                <div class="card" style="width: 18rem;">
                    <img src="${generalUrl}/images/${prod.produit.image}" class="card-img-top img-fluid" alt="${prod.produit.name}">
                    <div class="card-body">
                        <h5 class="card-title my-0">${prod.produit.name}</h5>
                        <p class="card-text my-0">
                            Prix : ${prod.produit.price} € <br>
                            Stock : ${prod.produit.quantity}
                        </p>
                        <div class="d-flex justify-content-end">
                            <a href="#" class="btn btn-primary py-1 px-2">Commander</a>
                        </div>
                    </div>
                </div>`;
            })

            bestProdContainer.innerHTML = bestProdCard;
        } catch (error) {
            console.log(error)
        }
    }

    getExploitations();
    getBestProduct();

    
})
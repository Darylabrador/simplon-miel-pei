window.addEventListener("DOMContentLoaded", (event) => {
    let generalUrl         = location.origin;
    let setLocationInfoUrl = `${generalUrl}/api/exploitation/owner/add`;
    let getLocationInfoUrl = `${generalUrl}/api/exploitations/owner`;

    let config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };

    let searchForm = document.getElementById('searchForm')
    let searchLocation = document.getElementById('searchLocation')
    let resultSearch = document.getElementById('resultSearch')
    let description = document.getElementById('description')
    let validateBtn = document.getElementById('validateBtn')

    let startEditingBtn = document.getElementById('startEditingBtn')
    let stopEditionBtn = document.getElementById('stopEditionBtn')

    var apiResult;

    let errorInterface = document.getElementById('errorInterface');

    const displayMessage = (node, type, message) => {
        node.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show mt-1" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    };

    const createMap = (lat, lon, zoom, isLocated = false, data) => {
        // to reinit map
        var container = L.DomUtil.get('mapid');
        if (container != null) {
            container._leaflet_id = null;
        }

        var map = L.map('mapid').setView([lat, lon], zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: 1,
            maxZoom: 20,
        }).addTo(map);

        if(isLocated) {
        L.marker([lat, lon]).addTo(map)
            .bindPopup(`<p style="margin: 0;">Exploitation : <br> ${data[0].description}</p><b>${data[0].address}</b>`)
            .openPopup();
        }
    }

    const defaultInformation = async () => {
        try {
            const requestDefault     = await axios.get(getLocationInfoUrl, config);
            const requestDefaultData = requestDefault.data.data;
            if(requestDefaultData.length != 0) {
                searchLocation.value = requestDefaultData[0].address;
                description.value    = requestDefaultData[0].description;
                validateBtn.setAttribute("disabled", true)
                searchLocation.setAttribute('readonly', true)
                resultSearch.setAttribute('disabled', true)
                description.setAttribute('readonly', true)
                startEditingBtn.removeAttribute("disabled")
                createMap(requestDefaultData[0].lattitude, requestDefaultData[0].longitude, 13, true, requestDefaultData);
            } else {
                startEditingBtn.setAttribute("disabled", true)
                validateBtn.removeAttribute("disabled")
                searchLocation.removeAttribute('readonly')
                resultSearch.removeAttribute('disabled')
                description.removeAttribute('readonly')
                createMap(-21.1287074, 55.4627191, 9);
            }
        } catch (error) {
            displayMessage(errorInterface, 'danger', error)
        }
    }

    startEditingBtn.addEventListener('click', evt => {
        validateBtn.removeAttribute("disabled")
        searchLocation.removeAttribute('readonly')
        resultSearch.removeAttribute('disabled')
        description.removeAttribute('readonly')
        stopEditionBtn.classList.toggle('d-none')
        startEditingBtn.classList.toggle('d-none')
    })

    stopEditionBtn.addEventListener('click', evt => {
        validateBtn.setAttribute("disabled", true)
        searchLocation.setAttribute('readonly', true)
        resultSearch.setAttribute('disabled', true)
        description.setAttribute('readonly', true)
        stopEditionBtn.classList.toggle('d-none')
        startEditingBtn.classList.toggle('d-none')
    })

    searchLocation.addEventListener('keyup', evt => {
        let locationValue = evt.currentTarget.value;
        if(locationValue != "") {
            axios.get(`https://api-adresse.data.gouv.fr/search/?q=${locationValue}&type=housenumber&autocomplete=1` )
            .then(({data}) => {
                apiResult = data.features;
                let options = "";
                apiResult.forEach(element => {
                    options += `<option value="${element.properties.label}">${element.properties.label}</option>`
                })
                resultSearch.innerHTML = options;
            })
                .catch(err => displayMessage(errorInterface, 'danger', 'ressource indisponible'))
        } else {
            resultSearch.innerHTML = "";
        }
    });

    searchForm.addEventListener('submit', evt => {
        evt.preventDefault();
        let dataSend = {};

        if(apiResult) {
            let selectLocation = apiResult.filter(locate => locate.properties.label == resultSearch.value)
            dataSend = {
                description: description.value,
                address: selectLocation[0].properties.label,
                lattitude: selectLocation[0].geometry.coordinates[1],
                longitude: selectLocation[0].geometry.coordinates[0]
            }
        } else {
            dataSend = {
                description: description.value,
                address: "",
                lattitude: "",
                longitude: ""
            }
        }
        
        
        axios.post(setLocationInfoUrl, dataSend, config)
            .then(({data}) => {
                if(data.success) {
                    displayMessage(errorInterface, 'success', data.message)
                    searchForm.reset();
                    defaultInformation();
                    resultSearch.innerHTML = "";
                    stopEditionBtn.classList.toggle('d-none')
                    startEditingBtn.classList.toggle('d-none')
                } else {
                    displayMessage(errorInterface, 'danger', data.message)
                }
            })
            .catch(err => displayMessage(errorInterface, 'danger', err))
    });

    defaultInformation();
})
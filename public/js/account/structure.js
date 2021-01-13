const structureHtml = async () => {
    try {
        let verifyUrl = `${location.origin}/api/verify`;
        let config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
        const check = await axios.get(verifyUrl, config);
        const checkData = check.data.data;

        let profilName = document.getElementById('profilName');
        profilName.textContent = checkData.identity;

        const displayBtn = (node, remove = false) => {
            if (remove) {
                if (node) {
                    node.forEach(btn => {
                        btn.remove();
                    })
                }
            } else {
                if (node){
                    node.forEach(btn => {
                        btn.classList.remove('d-none');
                    })
                }
            }
        }

        let adm = document.querySelectorAll('.adm');
        let prod = document.querySelectorAll('.prod');

        switch (checkData.role_id) {
            case 1:
                displayBtn(adm)
                break;
            case 2:
                console.log('client')
                break;
            case 3:
                displayBtn(adm, true)
                displayBtn(prod)
                break;
            default:
                break;
        }

    } catch (error) {
        localStorage.clear();
        location.href = '/';
    }
}

structureHtml();
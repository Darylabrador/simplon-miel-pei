const verifToken = async () => {
    try {
        if (!localStorage.getItem('token')){
            location.href = '/';
        }
        
        let verifyUrl = `${location.origin}/api/verify`;
        let config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
        const check = await axios.get(verifyUrl, config);
        const checkData = check.data.data;
        
        let profilName = document.getElementById('profilName');
        if (profilName) {

            profilName.textContent = checkData.identity;
        }

    } catch (error) {
        localStorage.clear();
        location.href = '/';
    }
}

verifToken();
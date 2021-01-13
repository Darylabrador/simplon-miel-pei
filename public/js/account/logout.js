window.addEventListener("DOMContentLoaded", (event) => {
    let generalUrl = location.origin;
    let disconnectUrl = `${generalUrl}/api/logout`;
    let logout = document.getElementById('logout');
    let config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };

    const logoutAction = async () => {
        try {
            const disconnect = await axios.get(disconnectUrl,config);
            if (disconnect.data.success) {
                localStorage.clear();
                location.href = '/';
            }
        } catch (error) {
            console.error(error)
        }
    }

    logout.addEventListener('click', evt => {
        evt.stopPropagation();
        logoutAction();
    });
});
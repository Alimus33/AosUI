document.addEventListener('DOMContentLoaded', async () => {
    const notification = document.getElementById('notification');
    const connectButton = document.getElementById("connectButton");

    const updateButtonState = (isConnected) => {
        if (isConnected) {
            connectButton.innerText = "Already connected to Arconnect";
            connectButton.style.background = "#a5feff";
            connectButton.disabled = true;
        } else {
            connectButton.innerText = "Connect to Arconnect";
            connectButton.style.background = "";
            connectButton.disabled = false;
        }
    };

    const checkAndConnectWallet = async () => {
        try {
            if (!window.arweaveWallet) {
                notification.style.display = 'block';
                return;
            }

            const permissions = await window.arweaveWallet.getPermissions();
            if (permissions.includes('ACCESS_ADDRESS')) {
                updateButtonState(true);
            } else {
                await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION']);
                updateButtonState(true);
            }
        } catch (error) {
            console.error('Failed to connect to Arweave:', error);
            alert('Failed to connect to Arweave. Please try again.');
        }
    };

    await checkAndConnectWallet();

    connectButton.addEventListener('click', async () => {
        try {
            if (window.arweaveWallet) {
                await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION']);
                updateButtonState(true);
            } else {
                alert("Please install Arweave Wallet");
            }
        } catch (error) {
            console.error('Failed to connect to Arweave:', error);
            alert('Failed to connect to Arweave. Please try again.');
        }
    });
});

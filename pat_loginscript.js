// Check if MetaMask is installed and available
if (typeof window.ethereum !== 'undefined') {
    const loginButton = document.getElementById('login-button');

    // Event listener for the login button
    loginButton.addEventListener('click', async () => {
        try {
            // Request user authorization
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            // User has authorized, proceed with login
            const userAddress = accounts[0];
           // alert(`Logged in with MetaMask!\nEthereum Address: ${userAddress}`);
           window.location.href='pat_menu.html'

            // You can now use userAddress for authentication or other actions

        } catch (error) {
            // User rejected the request or MetaMask is locked
            alert('MetaMask login was not successful.');
        }
    });
} else {
    // MetaMask is not installed, display a message or alternative login options
    alert('MetaMask is not detected. Please install MetaMask and refresh the page to use this feature.');
}
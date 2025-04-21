// Replace the YOUR_CONTRACT_ADDRESS placeholder with the address of your deployed smart contract.
//const {web3} = require('web3');
// const contractAddress = '0x197bCF29b36971e5D45B0385C63dA76c16aE80bA';

// Create a new instance of the smart contract
//const abi = 
  //  [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"},{"internalType":"string","name":"_cid","type":"string"}],"name":"addRecord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"getCIDs","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"removeAllRecords","outputs":[],"stateMutability":"nonpayable","type":"function"}];

//const contract = new web3.eth.Contract(abi, contractAddress);

// Add a function to add a record to the smart contract
async function addRecord(cid, userAddress) {
    alert(`CID ${cid} is added to address ${userAddress}`);
    //await contract.methods.addRecord(userAddress, cid).send({ from: userAddress });
}

// Add a function to get the CIDs for the user's address
async function getCIDs(userAddress) {
    // const cids = await contract.methods.getCIDs(userAddress).call();
    // alert(`CIDs for address ${userAddress}: ${cids}`);
    // return cids;
}

// Add a function to remove all CIDs for the user's address
async function removeAllCIDs() {
    // await contract.methods.removeAllRecords(userAddress).send({ from: userAddress });
}

// Add an event listener to the logout button

// Implement the logout() function
async function logout() {
    // Remove the user's MetaMask address from the session storage
    sessionStorage.removeItem(userAddress);

    // Redirect the user to the login page
    window.location.href = 'index.html';
}

// document.getElementById('userAddressMessage').textContent = `You are logged in as ${sessionStorage.getItem(userAddress)}`;

// Update the paragraph element's text content whenever the user's MetaMask address changes
// window.addEventListener('storage', () => {
//     document.getElementById('userAddressMessage').textContent = `You are logged in as ${sessionStorage.getItem(userAddress)}`;
// });
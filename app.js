let web3;
let contract;

const contractAddress = "0x9d15eA22039bBC3fdCdDCEF48f9c08B1ff10BDAa";

// ✅ CORRECT ABI
const abi = [
  {
    "inputs": [],
    "name": "documentHash",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDocument",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_hash", "type": "string" }
    ],
    "name": "storeDocument",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

window.onload = async () => {

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);

    // ✅ modern way (instead of enable)
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } else {
    alert("Please install MetaMask");
    return;
  }

  contract = new web3.eth.Contract(abi, contractAddress);
};

// ✅ Store Hash
async function storeHash() {
  const accounts = await web3.eth.getAccounts();
  const hash = document.getElementById("hashInput").value;

  await contract.methods.storeDocument(hash).send({
    from: accounts[0]
  });

  alert("Hash stored successfully!");
}

// ✅ Get Hash
async function getHash() {
  const hash = await contract.methods.getDocument().call();
  document.getElementById("result").innerText = hash;
}
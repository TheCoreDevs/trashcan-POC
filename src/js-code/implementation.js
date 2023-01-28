import "../firebase/firebase.js";
import { ethers } from "ethers";

// A Web3Provider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page
const provider = new ethers.providers.Web3Provider(window.ethereum)

// MetaMask requires requesting permission to connect users accounts
await provider.send("eth_requestAccounts", []);

// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
const signer = provider.getSigner()

const trashcanABI = [
    'function cleanERC721(address[] tokens, uint[][] ids)',
    'function cleanERC1155(address[] tokens, uint[][] ids, uint[][] amounts)',
    'function cleanERC20(address[] memory tokens)'
]

const trashcanAddress = "";

const trashcanContract = new ethers.Contract(trashcanAddress, trashcanABI, provider);
const trashcanContractWithSigner = trashcanContract.connect(signer);

async function cleanERC721(tokens, ids) {
    trashcanContractWithSigner.cleanERC721(tokens, ids);
}

async function cleanERC1155(tokens, ids, amounts) {
    trashcanContractWithSigner.cleanERC1155(tokens, ids, amounts);
}

async function cleanERC20(tokens) {
    trashcanContractWithSigner.cleanERC20(tokens);
}
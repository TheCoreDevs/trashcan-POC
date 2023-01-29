import { ethers } from "ethers";

document.addEventListener("DOMContentLoaded", () => {

    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // MetaMask requires requesting permission to connect users accounts
    provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()

    const trashcanABI = [
        'function cleanERC721(address[] tokens, uint[][] ids)',
        'function cleanERC1155(address[] tokens, uint[][] ids, uint[][] amounts)',
        'function cleanERC20(address[] memory tokens)'
    ]

    const trashcanAddress = "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85"; // Add smart contract address here

    const trashcanContract = new ethers.Contract(trashcanAddress, trashcanABI, provider);
    const trashcanContractWithSigner = trashcanContract.connect(signer);

    window.cleanERC721 = async function() {
        const tokens = document.getElementById("tokens721").value.split(",");
        const ids = document.getElementById("ids721").value.split(",");
        try {
            await trashcanContractWithSigner.cleanERC721(tokens, ids);
            document.getElementById("status").innerHTML = "Tokens cleaned successfully!";
        } catch (err) {
            document.getElementById("status").innerHTML = "Error cleaning tokens: " + err;
        }
    }

    window.cleanERC1155 = async function() {
        const tokens = document.getElementById("tokens1155").value.split(",");
        const ids = document.getElementById("ids1155").value.split(",");
        const amounts = document.getElementById("amounts1155").value.split(",");
        try {
            await trashcanContractWithSigner.cleanERC1155(tokens, ids, amounts);
            document.getElementById("status").innerHTML = "Tokens cleaned successfully!";
        } catch (err) {
            document.getElementById("status").innerHTML = "Error cleaning tokens: " + err;
        }
    }

    window.cleanERC20 = async function() {
        const tokens = document.getElementById("tokens20").value.split(",");
        try {
            await trashcanContractWithSigner.cleanERC20(tokens);
            document.getElementById("status").innerHTML = "Tokens cleaned successfully!";
        } catch (err) {
            document.getElementById("status").innerHTML = "Error cleaning tokens: " + err;
        }
    }
});
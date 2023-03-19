const app = Vue.createApp({
    data: function() {
        return {
            hello: 'hello there',
            ethers: null,
            connectMsg: 'please connect metamask',
            provider: null,
            signer: null,
            ABI: [
                'function cleanERC721(address[] tokens, uint[][] ids)',
                'function cleanERC1155(address[] tokens, uint[][] ids, uint[][] amounts)',
                'function cleanERC20(address[] memory tokens)',
                'function price()'
            ],
            garbagecanAddress: "0xA293a43a975634a0A0bA803B7B4B45A336bb3f2D",
            garbagecanContractWithSigner: null,
            status: null
        }
    },
    methods: {
        async connectToMetaMask() {
            // Check if MetaMask is already connected
            if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
                // Use the modern dapp browsers or legacy dapp browsers
                this.provider = new ethers.providers.Web3Provider(window.ethereum || window.web3.currentProvider); // set provider
                await this.provider.send("eth_requestAccounts", []); // request accounts
                this.signer = this.provider.getSigner(); // set default signer
                this.mounted; // mount this page to vue
            } else {
                alert('Please install MetaMask!')
            }

            try {
                const garbagecanContract = new ethers.Contract(this.garbagecanAddress, this.ABI, this.provider);
                this.garbagecanContractWithSigner = garbagecanContract.connect(this.signer);
            } catch {
                alert("please connect wallet");
                return;
            }

            try {
                const address = await this.signer.getAddress();
                this.connectMsg = `connected address: ${address}`; // showcase connected address
            } catch (err) {
                console.error(err);
                alert('Error getting connected address!');
                return;
            }        
        },

        async cleanERC721Input() {
            const tokens = document.getElementById("tokens721").value.split(","); // split tokens input 
            const collectionsIds = document.getElementById("ids721").value.split("|"); // split ids input to collections

            let ids = [];
            for (let i = 0; i < collectionsIds.length; i++) { // split collections to seperate ids
                ids.push(collectionsIds[i].split(","))
            }

            // if (Array.isArray(ids[0])) {
            //    ids = [ids];
            // } // check first index if it is an array, if it is so all the indexes will be arrays too

            console.log(ids)


            try {
                await this.garbagecanContractWithSigner.cleanERC721(tokens, ids); // call the method
                this.status = "Tokens cleaned successfully!";
            } catch (err) {
                this.status = `Error cleaning tokens: ${err}`;
            }
        }
        

        
    },
    beforeMount() {
        this.connectToMetaMask()
    }
}).mount('#app')
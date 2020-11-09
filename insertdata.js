const Web3 = require('web3');
var fs=require('fs');

const contractaddress = '0x...';
const address= '0x...'
const privateKey = '';
const Url = 'http://localhost:8545';

var jsonFile='abi.json';
var abi=JSON.parse(fs.readFileSync(jsonFile));

const insertdata = async () => {
console.log('start:');
  const web3 = new Web3(Url);
  const networkId = await web3.eth.net.getId();
  const myContract = new web3.eth.Contract(abi,contractaddress);

  const tx = myContract.methods.injectXXX('555','2');
  const gas = await tx.estimateGas({from: address});
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(address);
 console.log('nonce:', nonce);
console.log('gas:', gas);
  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: contractaddress, 
      data,
      gas,
      gasPrice,
      nonce, 
      chainId: networkId
    },
    privateKey
  );

  console.log('Old data value:', await myContract.methods.getAllXXX().call());
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log('Transaction hash:', receipt.transactionHash);
  console.log('New data value:', await myContract.methods.getAllXXX().call());
}
insertdata();

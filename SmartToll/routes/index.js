var express = require('express');
var router = express.Router();
const json = require('../build/contracts/Buy.json');

const Web3 = require('web3');
const abi = json['abi'];

if (typeof web3 !== 'undefined') {
  const web3 = new Web3(web3.currentProvider);
} else {
//uncomment below line for ganache & geth deployment
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//uncomment below line for Rinkeby deployment
// const web3 = new Web3(new Web3.providers.WebsocketProvider("https://rinkeby.infura.io/v3/b51a1541916d4e3ab9d301ebd1bf7f29"));
// web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/b51a1541916d4e3ab9d301ebd1bf7f29"));
}
//============================================================
// place your contract address....
// contractAddress needs to be replaced after each deployment.

const contractAddress = "0x23D6Cdb076a380b2E11bb25Fc4C9Dc8B00042f8b";

var demoContract = new web3.eth.Contract(abi, contractAddress);
console.log('Server started, please open http://localhost:3000 in your browser!');

//Setting deployer address using truffle compile, for ganache and geth deployments.
var deployerAddress
web3.eth.getAccounts().then(e => {
	deployerAddress=e[0]; 
	console.log('Owner (deployer) Address: ' +deployerAddress)
});

/**
 * Loading the home page (index.ejs)
 **/
router.get('/', function (req, res, next) {
  res.render('index');
});
// to call registerContractor function
router.post('/conReg', function (req, res, next) {
	var contractorAddress = req.body.contractAdd
	demoContract.methods.registerContractor(contractorAddress).send({ from: deployerAddress, gas: 150000 }).then(function (value) {
  console.log('Registered contractor: ' + value.transactionHash);
  console.log(value);
	res.send("The contractor:" + contractorAddress + " has been registered! Transaction Hash: " + value.transactionHash);
  });
});

// to call registerUser function
router.post('/userReg', function (req, res, next) {
	var userAddress = req.body.add1
	var vehNum = req.body.vnum
  demoContract.methods.registerUser(userAddress, vehNum).send({ from: deployerAddress, gas: 150000 }).then(function (value) {
  console.log('Registered user: ' + value.transactionHash);
  console.log(value);
  res.send("The user:" + userAddress + " has been registered! Transaction Hash: " + value.transactionHash);
  });
});
// to call balanceOf function
router.post('/accBal', function (req, res, next) {
	var Balance = req.body.userBalAdd
  demoContract.methods.balanceOf(Balance).call().then(function (value1) {
  console.log('Account Balance: ' + value1);
  console.log(value1);
  res.send("Account balance of " + Balance + " is: "+ value1);
  });
});
// to call viewHistory function (toll payment receipts)
router.post('/viewHistory', function (req, res, next) {
	var userAddress = req.body.userAdd2
  demoContract.methods.viewHistory(userAddress).call().then(function (value1) {
	console.log('Toll history: ' + value1);
  res.send("Toll History: "+ value1);
  });
});
// to call viewUsers function (registered user details)
router.post('/viewUser', function (req, res, next) {
	var userAddress = req.body.regUsers
  demoContract.methods.viewUsers(userAddress).call().then(function (value2) {
	console.log('User Details:\nUser: ' + value2[0] + '\nVehicle Number: ' + value2[1] + '\n' +'User Balance: ' + value2[2]);
  res.send("User: " +value2['0'] + "\n" +"Vehicle Number: "+ value2['1'] + "\n" + "User Balance: " + value2['2']);
  });
});
// to call payToll function
router.post('/payToll', async function (req, res, next) {
  var userAddress = req.body.userAdd
  var etherValue = 0;
  await demoContract.methods.payToll(userAddress).send({ from: userAddress, gas: 150000, value: etherValue }).then(function (value) {
	console.log('Toll Payment: ' + value.transactionHash);
  res.send("The user: " + userAddress + " has paid Toll! Transaction Hash: " + value.transactionHash);
  });
});
// to call withdrawToken function
router.post('/withdrawTokens', async function (req, res, next) {
	var toWithdraw = req.body.withdrawCount
	var callingAddress = req.body.contractWithdraw
	//need to change the above from address by adding input address and replacing below also
  await demoContract.methods.withdrawToken(toWithdraw).send({ from: callingAddress, gas: 150000 }).then(function (value) {
	console.log('Token Withdraw: ' + value.transactionHash);
  res.send("The contractor:" + callingAddress + " has withdrawn " +toWithdraw+ " Tokens! Transaction Hash: " + value.transactionHash);
  });
});
// to call buyTokens function
router.post('/buyTokens', async function (req, res, next) {
	var userAddress = req.body.userAdd1
  var reqTokens = req.body.tokenCount1
  var etherValue = (reqTokens * 0.01);
  await demoContract.methods.buyTokens(userAddress, reqTokens).send({ from: userAddress, gas: 150000, value: web3.utils.toWei(etherValue.toString(), 'ether') }).then(function (value) {
	console.log('Token Purchase: ' + value.transactionHash);
  res.send("The user: " + userAddress + " has bought "+ reqTokens +" tokens! Transaction Hash: " + value.transactionHash);
  });
});

module.exports = router;

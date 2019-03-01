var express = require('express');
var router = express.Router();


const Web3 = require('web3');

if (typeof web3 !== 'undefined') {
  const web3 = new Web3(web3.currentProvider);
} else {
  //uncomment below line for ganache deployment
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  //uncomment below line for geth deployment
  // web3 = new Web3(new Web3.providers.IpcProvider("~/.ethereum/geth.ipc"));
  //uncomment below line for Rinkeby deployment
  // const web3 = new Web3(new Web3.providers.WebsocketProvider("https://rinkeby.infura.io/v3/b51a1541916d4e3ab9d301ebd1bf7f29"));
	// web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/b51a1541916d4e3ab9d301ebd1bf7f29"));
}
//============================================================
// place your contract address, abi and deployer address below....
// contractAddress needs to be replaced after each deployment.
// abi needs to be replaced if contracts have been modified since last deployment.
// deployer address needs to be hard-coded below (commented) if deployment not done in truffle.
const contractAddress = "0x23D6Cdb076a380b2E11bb25Fc4C9Dc8B00042f8b";
const abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x06fdde03"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "UserReg",
    "outputs": [
      {
        "name": "vehicleNum",
        "type": "string"
      },
      {
        "name": "userBalance",
        "type": "uint256"
      },
      {
        "name": "tollReset",
        "type": "uint256"
      },
      {
        "name": "userExists",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x14b225dd"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x18160ddd"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x313ce567"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "contractorExists",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x6b3eabd4"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x70a08231"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "contractorGlobal",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x75fb4048"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8da5cb5b"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x95d89b41"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xa9059cbb"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "withdrawAllowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xc0ee01bc"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event",
    "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_contractor",
        "type": "address"
      }
    ],
    "name": "registerContractor",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x2561a429"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_user",
        "type": "address"
      },
      {
        "name": "_vehicleNum",
        "type": "string"
      }
    ],
    "name": "registerUser",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x0ea126f9"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "payToll",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x5a1609c7"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "withdrawToken",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x50baa622"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "viewUsers",
    "outputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xac342c64"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_user",
        "type": "address"
      },
      {
        "name": "_tokens",
        "type": "uint256"
      }
    ],
    "name": "buyTokens",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function",
    "signature": "0x0752881a"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "viewHistory",
    "outputs": [
      {
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x189f158d"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "existContractor",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x5ab8fa21"
  }
];
var demoContract = new web3.eth.Contract(abi, contractAddress);
console.log('Server started, please open http://localhost:3000 in your browser!');
// if not using truffle to compile, hard-code deployer address below from Remix
// const deployerAddress = '0xb40b2584bf65137e32971f32a98705db78339008';
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
router.post('/payToll', function (req, res, next) {
  var userAddress = req.body.userAdd
  var etherValue = 0;
  demoContract.methods.payToll(userAddress).send({ from: userAddress, gas: 150000, value: etherValue }).then(function (value) {
	console.log('Toll Payment: ' + value.transactionHash);
  res.send("The user: " + userAddress + " has paid Toll! Transaction Hash: " + value.transactionHash);
  });
});
// to call withdrawToken function
router.post('/withdrawTokens', function (req, res, next) {
	var toWithdraw = req.body.withdrawCount
	var callingAddress = req.body.contractWithdraw
	//need to change the above from address by adding input address and replacing below also
  demoContract.methods.withdrawToken(toWithdraw).send({ from: callingAddress, gas: 150000 }).then(function (value) {
	console.log('Token Withdraw: ' + value.transactionHash);
  res.send("The contractor:" + callingAddress + " has withdrawn " +toWithdraw+ " Tokens! Transaction Hash: " + value.transactionHash);
  });
});
// to call buyTokens function
router.post('/buyTokens', function (req, res, next) {
	var userAddress = req.body.userAdd1
  var reqTokens = req.body.tokenCount1
  var etherValue = (reqTokens * 0.01);
  demoContract.methods.buyTokens(userAddress, reqTokens).send({ from: userAddress, gas: 150000, value: web3.utils.toWei(etherValue.toString(), 'ether') }).then(function (value) {
	console.log('Token Purchase: ' + value.transactionHash);
  res.send("The user: " + userAddress + " has bought "+ reqTokens +" tokens! Transaction Hash: " + value.transactionHash);
  });
});

module.exports = router;

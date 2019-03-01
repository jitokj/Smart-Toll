**# SmartToll**

A blockchain-based Tollbooth Management System

The Indian Govt. permits the contractor who has won the contract for building highways to setup toll booths on the highway once construction is completed, and collect toll from vehicles using the particular stretch of highway, for a designated period of time. There is currently no check in place to enforce this time limit, and often, there are contractors who keep illegally collecting toll many years after their contract has expired. The proposed solution is a blockchain network created with the time period set by the Govt., there will be no further transactions permitted on the network once the contract expires. The users (vehicle owners\drivers) who frequent the highway are able to purchase tokens in advance (prepaid) and the toll amount is deducted from their balance when they pass through the toll booths. The contractor is allowed to withdraw limited amounts from the toll collected, and once the contract expires, they can withdraw the entire remaining amount.


**Installation/Set-up instructions (ganache):**

1. Open the Dapp project folder in VS Code.
2. Open a terminal window in the project folder.
   $ npm install //(not required since node modules are provided)
3. Open another terminal window. Run ganache-cli.
   $ ganache-cli
4. Back in original terminal window, run truffle migrate.
   $ truffle migrate --reset
5. If there are changes in contract (contracts are compiled), copy ABI from Buy.json and replace in index.js file (line 24). Save file.
6. Copy deployed contract address (of Buy) from truffle migrate window and replace in index.js file (line 23). Save file.
7. In original terminal window, start server.
   $ npm start
8. Open a browser window. Go to https://localhost:3000
9. Copy individual addresses from ganache terminal and use the Dapp features.
10. For testing, open a terminal window, run test.
   $ npm test
11. The contract is set to expire in 6 minutes, if more time is needed to test the functionalities, change this in payToll function (line 60) and withdrawToken function (line 97).
12. Use CTRL+C to exit the project from respective terminal windows.

**Installation/Set-up instructions (geth):**

1. Open the Dapp project folder in VS Code. Comment ganache deployment details in truffle-config.js and uncomment geth deployment details. Save file.
2. Open a terminal window in the project folder.
   $ npm install //(not required since node modules are provided)
3. Open another terminal window inside geth folder.
   $ geth --identity "miner" --networkid 4002 --datadir ownerAccount --nodiscover --mine --rpc --rpcport "8545" --port "8191" --unlock 0 --password password.txt --ipcpath "~/.ethereum/geth.ipc" --rpccorsdomain "*" --rpcapi "db,eth,net,web3,personal"
4. Open another terminal window inside geth folder. Open geth console.
   $ geth attach
5. Start mining in geth console.
   $ miner.start()
6. Back in original terminal window, run truffle migrate.
   $ truffle migrate --reset
7. If there are changes in contract (contracts are compiled), copy ABI from Buy.json and replace in index.js file (line 24). Save file.
8. Copy deployed contract address (of Buy) from truffle migrate window and replace in index.js file (line 23). Save file.
9. In original terminal window, start server.
   $ npm start
10. Open a browser window. Go to https://localhost:3000
11. Copy individual addresses from 'Geth Account Details.txt' file and use the Dapp features.
12. Unlock respective accounts in geth console window using passwords given in the text file, when using 'Buy Tokens', 'Pay Toll', 'Withdraw Tokens' functions.
   $ personal.unlockAccount(eth.accounts[1])
13. To exit the project, stop the mining process in geth console window. Then give CTRL+C in other terminal windows to exit.
   $ miner.stop()
14. The contract is set to expire in 6 minutes, if more time is needed to test the functionalities, change this in payToll function (line 60) and withdrawToken function (line 97).

**Contract conditions:**

* Contractor needs to be registered first before registering users. Owner (account[0]) cannot be registered as contractor.
* Owner or contractor cannot be registered as User.
* User needs to buy tokens paying ether. Owner or contractor cannot buy tokens.
* Once the user has paid toll, they need to wait 1 minute before paying toll again.
* Contractor can withdraw tokens only if contract balance is greater than withdrawal limit (80 tokens), so at least two users need to pay toll (toll amount is 50 tokens). Contractor cannot withdraw greater than 80 tokens while contract is live. Once contract has expired, they can withdraw the whole contract balance.
* The contract terminates in 6 minutes, after which, toll payments are not possible. Contractor can still withdraw tokens if contract balance is greater than 0.
* Only contractor or owner can view Toll History (toll receipts of all payments made).
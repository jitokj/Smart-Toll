Decisions made while developing the contracts

ERC20 token was chosen for the project, as a fungible token was required for the project functionalities.
Ganache was chosen as the deployment test network, as 10 accounts are available immediately with 100 ethers each, allowing us to test all the different scenarios in the contract logic easily.
In the POC, the contract duration, or life of the contract, is set by the deployer (RTO or equivalent authority) at the time of the deployment. To make the contract easier to test, we have set the contract end date as 6 minutes from the deployment of the contract, so that the entire contract life cycle can be tested in a short time duration.
In the POC, a user needs to pay toll only once a day, if he/she travels through the same tollbooth before 00:00 a.m., they do not need to pay toll again. To simulate this scenario, we have set the duration as 1 minute, after which the user can pay toll again.
The user buys tokens with ether, we have not used any other payment gateway.
The contractor needs to be assigned (registered) by the deployer, before users can start paying toll in the toll booth.
The users needs to buy token with ether, before paying toll. The toll amount is set as 50 tokens, and the token value is set as 1 token = 0.01 ether.
The total supply of tokens is set as 50000 (equivalent of 500 ether). If any user attempts to buy tokens more than this amount, sufficient amount of tokens are minted (requested amount + 10000 tokens) to ensure that the transaction doesn’t fail.
The contractor can withdraw tokens from the contract balance (paid tolls), as long as there is sufficient balance, and the request is less than or equal to the withdrawal limit. The withdrawal limit is set as 80 tokens.
Once the contract expires, the contractor can withdraw the remaining contract balance in installments, or in one shot, the withdrawal limit does not apply in this scenario.
The owner cannot register as a user or contractor.
In the original POC, the users are registered by the RTO or equivalent at the time of registering the vehicles, and a database of all the registered vehicles in India are maintained to be referred to by the Dapp. We have chosen to register users with account address, without providing a sign-in page for the users due to time constraints. An alternative approach would have been to have a sign-in page for the users where they login with the vehicle number and password, and they purchase tokens and can view their transaction history. 
In the real-world application, there is an option to adjust the toll amount by the owner due to external reasons. We have not implemented that in the project, it could be done by having an additional function that has access restricted to the owner, which can be used to adjust the toll amount (where the toll amount is set as a global variable).
In the POC, we proposed an option where if the user has insufficient balance, they are allowed to go through one, and a notification is sent to them reminding them that they need to purchase tokens immediately to avoid getting a fine. We haven’t implemented this functionality due to time constraints.


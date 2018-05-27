## Install Truffle and Testrpc
    npm install truffle
    npm install testrpc
## Run testrpc twice to build two small test networks on your local, which represent Trade-Network and Token-Network.
    testrpc -p 8545
    testrpc -p 9545
## Truffle compile to compile the smart contract file in solidity.
    truffle compile
## Truffle migrate twice to deploy the contract on two networks.
    truffle migrate --network tradenetwork
    truffle migrate --network sharenetwork
## Run following code and then you could access the demo on localhost:8080.
    npm run dev
<a name="SECJS-RLP"></a>

* * *
## Smart Contract Demo
**This demo targets to test a rough and basic logic of smart contract in SEC. It is developed based on truffle framework. Smart Contracts are built in solidity. Test networks are built by testrpc on local. And frontend implementation is based on web3 framework.**

* [Smart Contract Demo](#Smart Contract Demo)
    * [Smart Contract](#SmartContractFile)
    * [Compile and Deploy](#CompileDeploy)
    * [Frontened](#Frontend)


* * *
<a name="Smart Contract"></a>

### Smart Contract

In this small demo, the smart conract targets to create transactions in blochchians when user buy something. We should consider two chains here -- trade chain and token chain. In different cases, the smart contract will be called in different way.


* * *
<a name="CompileDeploy"></a>
### Compile and Deploy
In truffle.js, we could define network settings (such as name and port), for smart contract deployment.

| Commands | Description |
| --- | --- |
| testrpc -p port | Build a small test blockchain network at the port of localhost |
| truffle compile | Compile smart contract |
| truffle migrate --network network-name | Deploy the smart contract on the corresponding network |


* * *
<a name="Frontened"></a>
### Frontened
Frotend implementation is based on web3 framework. It is used to interact with smart contracts. Please run following code on commander and then we could access the small demo on localhost:8080
```js
npm run dev
```

In the frontend, we could see, when user buy something normally with clicking on the yellow "Buy" button. If we checked the logs on two blockchain test networks, we could find that there will be a new transaction in trade-chain, but not in the token-chain.

If we click "Buy from share" (it is only a simple simulation for the behaviour -- buying something through others' shared link), we could find that the accounts' balance on shared-chain changes, the sharer gets some tokens as rewards. When we go to the logs, we could find that there will be one transaction on trade-chain and also one transaction on token-chain.
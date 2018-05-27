// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import Trade_artifacts from '../../build/contracts/Trade.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var Trade = contract(Trade_artifacts);
var Share = contract(Trade_artifacts);

var accounts_trade;
var account_buyer_trade;
var account_seller_trade;

var accounts_share;
var account_buyer_share;
var account_seller_share;
var account_giver;

var web3_trade = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var web3_share = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the Credit abstraction for Use.
    Trade.setProvider(web3_trade.currentProvider);
    Share.setProvider(web3_share.currentProvider);
    
    web3_trade.eth.getAccounts(function(err, accs) {
      var flag = "trade";

      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      accounts_trade = accs;
      account_seller_trade = accounts_trade[0];
      account_buyer_trade = accounts_trade[1];
      
      var buyerAddr = document.getElementById("buyerAddress");
      var showbuyerAddr = document.getElementById("showBuyerAddress");
      buyerAddr.value = account_buyer_trade;
      showbuyerAddr.innerHTML = account_buyer_trade;

      var showSellerAddr = document.getElementById("showSellerAddress");
      showSellerAddr.innerHTML = account_seller_trade;

      var buyerBalance = document.getElementById("buyerBalance");
      buyerBalance.innerHTML = self.getBalance(account_buyer_trade, flag);

      var sellerBalance = document.getElementById("sellerBalance");
      sellerBalance.innerHTML = self.getBalance(account_seller_trade, flag)

      Trade.deployed().then(function(instance) {
        var trade = instance;
        var contractAddr = document.getElementById("defaultTradeAddress");
        contractAddr.innerHTML = trade.address;
      }).catch(function(e) {
        console.log(e);
      });
    });

    web3_share.eth.getAccounts(function(err, accs) {
      var flag = "share";

      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      accounts_share = accs;
      account_seller_share = accounts_share[0];
      account_buyer_share = accounts_share[1];
      account_giver = accounts_share[2];

      var showbuyerAddr = document.getElementById("showBuyerShareAddress");
      showbuyerAddr.innerHTML = account_buyer_share;

      var showSellerAddr = document.getElementById("showSellerShareAddress");
      showSellerAddr.innerHTML = account_seller_share;

      var buyerBalance = document.getElementById("buyerShareBalance");
      buyerBalance.innerHTML = self.getBalance(account_buyer_share, "share");

      var sellerBalance = document.getElementById("sellerShareBalance");
      sellerBalance.innerHTML = self.getBalance(account_seller_share, flag)

      Share.deployed().then(function(instance) {
        var share = instance;
        var contractAddr = document.getElementById("defaultShareAddress");
        contractAddr.innerHTML = share.address;
      }).catch(function(e) {
        console.log(e);
      });
    });

  },

  getBalance: function(address, flag) {
    if (flag == "trade")
    {    
      return web3_trade.fromWei(web3_trade.eth.getBalance(address).toNumber(), 'ether');
    }
    else if  (flag == "share"){
      return web3_share.fromWei(web3_share.eth.getBalance(address).toNumber(), 'ether');
    }
    else {
      return error;
    }

  },

  setBuyObjectResult: function(flag) {
    var self = this
    var obj;

    if (flag == "trade"){
      Trade.deployed().then(function(instance) {
        obj = instance
      }).then(
          function(num){
              var buyerBalance = document.getElementById("buyerBalance");
              buyerBalance.innerHTML = self.getBalance(account_buyer_trade, flag);

              var sellerBalance = document.getElementById("sellerBalance");
              sellerBalance.innerHTML = self.getBalance(account_seller_trade, flag);
  
              var buyObjectResult = document.getElementById("buyObjectResult", flag);
              buyObjectResult.innerHTML = "Purchase Successful";
          });
    } else if (flag == "share")
    {
      Share.deployed().then(function(instance) {
        obj = instance
      }).then(
          function(num){
              var buyerBalance = document.getElementById("buyerShareBalance");
              buyerBalance.innerHTML = self.getBalance(account_buyer_share, flag);

              var sellerBalance = document.getElementById("sellerShareBalance");
              sellerBalance.innerHTML = self.getBalance(account_seller_share, flag);
  
              var buyObjectResult = document.getElementById("buyObjectResult", flag);
              buyObjectResult.innerHTML = "Purchase Successful";
          });
    } else {
      console.log("Error when Setting Status");
    }




  },

  //
  buyObject: function(){

    var self = this;
    var obj;
    var flag = "trade";
    var buyAmount;

    Trade.deployed().then(function(instance) {
        obj = instance;
        buyAmount = web3_trade.toWei(document.getElementById("buyAmount").value, "ether");

        return obj.buyObject(account_seller_trade, {from: account_buyer_trade, value: 0});
    }).then(function(){
        self.setBuyObjectResult(flag);
    }).catch(function(e) {
      console.log(e);
    });
  },

  buyShareObject: function(){

    var self = this;
    var obj;
    var flag = "share";
    var buyAmount;

    Share.deployed().then(function(instance) {
        obj = instance;
        buyAmount = web3_trade.toWei(document.getElementById("buyAmount").value, "ether");

        return obj.buyObject(account_seller_share, {from: account_giver, value: buyAmount/100});
    }).then(function(){
        self.setBuyObjectResult(flag);
    }).catch(function(e) {
      console.log(e);
    });

    Trade.deployed().then(function(instance) {
      obj = instance;
      buyAmount = web3_trade.toWei(document.getElementById("buyAmount").value, "ether");

      return obj.buyObject(account_seller_trade, {from: account_buyer_trade, value: 0});
    }).then(function(){
        self.setBuyObjectResult(flag);
    }).catch(function(e) {
      console.log(e);
    });

  }
};


window.addEventListener('load', function() {

  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});
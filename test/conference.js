var Conference = artifacts.require("./Conference.sol");

contract('Conference', function(accounts) {

  var Quato;  //限制人数为500
  var NumRegistrants;  //注册的人数刚开始为应该为0
  var Organizer; //组织者地址应该正确
  var organizer_address = accounts[0];
  var meta;

  it("Initial conference settings should match", function() {

    return Conference.deployed().then(function(instance){
        meta = instance;
        return meta.quota.call();
    }).then(function(quota){
        Quato = quota;
        return meta.organizer.call();
    }).then(function(organizer){
        Organizer = organizer;
        return meta.numSales.call();
    }).then(function(numSales){
        NumRegistrants = numSales;

        assert.equal(Quato, 100, "Quota doesn't match!");
        assert.equal(numSales, 0, "Registrants should be zero!");
        assert.equal(Organizer, organizer_address, "Owner doesn't match!");
    });
  });

  it("Should let you buy a ticket", function() {

    var user_address = accounts[1];
    var initialBalance;  //用户初始余额
    var newBalance;   //用户购买之后余额
    var newNumSales;  //买票人数
    var userPaid;  //付款的金额
    var difference;
    var meta;
    var amount = 2;
    var ticketPrice = web3.toWei(.05, 'ether');

    return Conference.deployed().then(function(instance){
          meta = instance;
          initialBalance = web3.eth.getBalance(user_address).toNumber();
          console.log(initialBalance);
          return meta.buyTicket(amount, {from: user_address});  //买票操作
    }).then(function(){
          newBalance = web3.eth.getBalance(user_address).toNumber();  //买票之后余额
          console.log(newBalance);
          difference = newBalance - initialBalance;
          return meta.numSales.call();
    }).then(function(numSales){
        newNumSales = numSales;
        return meta.registrantsPaid.call(user_address);
    }).then(function(registrantsPaid){
          userPaid = registrantsPaid.toNumber();

          assert.equal(userPaid, ticketPrice*amount, "Sender's paid but is not listed");
          assert.equal(difference, ticketPrice*amount, "Difference should be what was sent");
          assert.equal(newNumRegistrants, amount, "there should be some registrant");
    });
  });
});
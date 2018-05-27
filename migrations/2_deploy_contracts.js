var Trade = artifacts.require("./Trade.sol");

module.exports = function(deployer) {
  deployer.deploy(Trade);
};

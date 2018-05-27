module.exports = {
  networks: {
    tradenetwork: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    sharenetwork: {
      host: "localhost",
      port: 9545,
      network_id: "*" // match any network
    }
  }
}

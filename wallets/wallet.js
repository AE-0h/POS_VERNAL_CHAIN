const ChainUtil = require('../chainUtils');
const Transaction = require("./transaction");
const {INITAL_BALANCE} = require('../config');


class Wallet {
    constructor(secret) {
      this.balance = INITAL_BALANCE;
      this.keyPair = ChainUtil.genKeyPair(secret);
      this.publicKey = this.keyPair.getPublic("hex");
    }
  
    toString() {
      return `         WALLET
      🪹-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-🪹
      |   publicKey: ${this.publicKey.toString()}|
      |    balance  : ${this.balance}            |
      🪹-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-🪹`;   
    }
    sign(dataHash) {
      return this.keyPair.sign(dataHash).toHex();
    }

    createTransaction(to, amount, type, blockchain, transactionPool) {
      this.balance = this.getBalance(blockchain);
      if (amount > this.balance) {
        console.log(
          `Insufficient funds!!! ${amount} exceeds your current balance: ${this.balance}`
        );
        return;
      }
      let transaction = Transaction.newTransaction(this, to, amount, type);
      transactionPool.addTransaction(transaction);
      return transaction;
    }
  
    getBalance(blockchain) {
      return blockchain.getBalance(this.publicKey);
    }
  
    getPublicKey() {
      return this.publicKey;
    }

    
  }

  module.exports = Wallet;
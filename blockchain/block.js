
const SHA256 = require('crypto-js/sha256');
const ChainUtil = require('../chainUtils');

class Block {

    constructor(timestamp, lastHash, hash, data, validator, signature) {
      this.timestamp = timestamp;
      this.lastHash = lastHash;
      this.hash = hash;
      this.data = data;
      this.validator = validator;
      this.signature = signature;
    }
  
    toString() {
      return `     NEW BLOCK
     🥚=========================================🥚
     |    Timestamp : ${this.timestamp}         |
     |     Last Hash : ${this.lastHash}         |
     |     Hash      : ${this.hash}             |
     |     Data      : ${this.data}             |
     |     Validator : ${this.validator}        |
     |     Signature : ${this.signature}        |         
     🥚=========================================🥚
      `;   
    }

    static genesis() {

      let previousHash = null;
      return new this(`1656363054`, `${previousHash}`, `F0D5D285861E416779631DDBA16DCC1E2F95CD49C8AFF4D50D3B66D207371753`, []);
      }

    static hash(timestamp,lastHash,data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }
    
    static createBlock(lastBlock, data) {
        let hash;
        let timestamp = Date.now();
        const lastHash = lastBlock.hash;
        hash = Block.hash(timestamp, lastHash, data);
    
        return new this(timestamp, lastHash, hash, data);
      }
    static blockHash(block){
        const { timestamp, lastHash, data } = block;
        return Block.hash(timestamp,lastHash,data);
    }


  }

  module.exports = Block;
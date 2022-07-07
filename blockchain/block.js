
const SHA256 = require('crypto-js/sha256');
const ChainUtil = require("../chainUtils");


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
      return new this(`⚙️🥚⚙️`, `${previousHash}`, `F0D5D285861E416779631DDBA16DCC1E2F95CD49C8AFF4D50D3B66D207371753`, []);
      }

    static hash(timestamp,lastHash,data){
      return SHA256(JSON.stringify(`${timestamp}${lastHash}${data}`)).toString();
    }
    
    static createBlock(lastBlock, _data, wallet) {
      let hash;
      let timestamp = Date.now();
      const lastHash = lastBlock.hash;
      let data = [];
      data.push(_data);
      hash = Block.hash(timestamp, lastHash, data);
      // get the validators public key
      let validator = wallet.getPublicKey();
      // Sign the block
      let signature = Block.signBlockHash(hash, wallet);
      return new this(timestamp, lastHash, hash, data, validator, signature);
    }
    static blockHash(block){
        const { timestamp, lastHash, _data } = block;
        return Block.hash(timestamp,lastHash,_data);
    }

    static signBlockHash(hash, wallet) {
      return wallet.sign(hash);
    }
  
    static verifyBlock(block) {
      return ChainUtil.verifySignature(
        block.validator,
        block.signature,
        Block.hash(block.timestamp, block.lastHash, block.data)
      );
    }
  
    static verifyLeader(block, leader) {
      return block.validator == leader ? true : false;
    }

  }

  module.exports = Block;
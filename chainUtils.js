const EdDSA = require("elliptic").eddsa;
const eddsa = new EdDSA("ed25519");
const uuid = require("uuid/v4");
const SHA256 = require('crypto-js/sha256');

class ChainUtil {
    static genKeyPair(secret) {
      return eddsa.keyFromSecret(secret);
    }
    static id(){
        return uuid();
    }
    static hash(data){
      return SHA256(JSON.stringify(data)).toString();
    }
    static verifySignature(publicKey,signature,dataHash){
      return ec.keyFromPublic(publicKey).verify(dataHash,signature);
    }
   
  }
  module.exports = ChainUtil;
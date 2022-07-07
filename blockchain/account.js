class Account{
    contructor(){
        this.addresss = ['34b0b480d6cbc49b861cd0b2a62e7325ef9f34055cd72c9acd93b10795df26c8'];
        this.balance = {'34b0b480d6cbc49b861cd0b2a62e7325ef9f34055cd72c9acd93b10795df26c8': 100000000};
    }
    initialize(address){
        if(this.balance[address] == undefined){
            this.balance[address] = 0;
            this.addresses.push(address);
        }
    }

    transfer(from, to, amount){
        this.initialize(from);
        this.initialize(to);
        this.increment(to, amount);
        this.decrement(from, amount);
    }

    increment(to, amount){
        this.balance[to] += amount;
    }

    decrement(from, amount){
        this.balance[from] -= amount;
    }

    getBalance(address){
        this.initialize(address);
        return this.balance[address];
    }

    update(transaction) {
        let amount = transaction.output.amount;
        let from = transaction.input.from;
        let to = transaction.output.to;
        this.transfer(from, to, amount);
      }
    transferFee(block, transaction) {
        let amount = transaction.output.fee;
        let from = transaction.input.from;
        let to = block.validator;
        this.transfer(from, to, amount);
  }  
    
}
    module.exports = Account;

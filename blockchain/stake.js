class Stake{
    contructor(){
        this.addresss = ['34b0b480d6cbc49b861cd0b2a62e7325ef9f34055cd72c9acd93b10795df26c8'];
        this.balance = {'34b0b480d6cbc49b861cd0b2a62e7325ef9f34055cd72c9acd93b10795df26c8': 0};
    }

    initialize(address){
        if(this.balance[address] == undefined){
            this.balance[address] = 0;
            this.addresses.push(address);

        }
    }

    addStake(from, amount){
        this.initialize(from);
        this.balance[from] += amount;
    }

    getBalance(address){
        this.initialize(address);
        return this.balance[address];
    }

    getMax(addresses){
        let balance = -1;
        let leader;
        addresses.forEach(address => {
            if (this.getBalance(address) > balance) {
              leader = address;
            }
          });
          return leader;
    }
    update(transaction) {
        let amount = transaction.output.amount;
        let from = transaction.input.from;
        this.addStake(from, amount);
    }
}
    
    module.exports = Stake;

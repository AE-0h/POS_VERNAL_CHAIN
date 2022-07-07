class Validators {
    constructor() {
      this.list = ['34b0b480d6cbc49b861cd0b2a62e7325ef9f34055cd72c9acd93b10795df26c8'];
    }
  
    update(transaction) {
      if (transaction.amount == 30 && transaction.to == "0") {
        this.list.push(transaction.from);
        return true;
      }
      return false;
    }
  }
  
  module.exports = Validators;
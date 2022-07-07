class Validators {
    constructor() {
      this.list = ['34b0b480d6cbc49b861cd0b2a62e7325ef9f34055cd72c9acd93b10795df26c8'];
    }
  
    update(transaction) {
      if (transaction.output.amount >= 25 && transaction.output.to == "0") {
        this.list.push(transaction.input.from);
        console.log("New Validator:", transaction.input.from);
        return true;
      }
      return false;
    }
  }
  
  module.exports = Validators;
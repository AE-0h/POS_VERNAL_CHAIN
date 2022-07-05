require('dotenv').config();
const express = require('express');
const Blockchain = require('../blockchain/blockchain');
const P2pServer = require('./p2pserver.js');
const bodyParser = require('body-parser');
const Wallet = require('../wallets/wallet');
const TransactionPool = require('../wallets/transaction-pool');


//get the port from the user or set the default port
const HTTP_PORT = process.env.HTTP_PORT || 3001;

//create a new app
const app  = express();

//using the body parser middleware
app.use(bodyParser.json());

// create a new blockchain instance
const blockchain = new Blockchain();
// create a new transaction pool
const transactionPool = new TransactionPool();
// create a new p2pserver
const p2pserver = new P2pServer(blockchain, transactionPool);
// create a new wallet
const wallet = new Wallet(Date.now().toString());


//EXPOSED APIs

//api to get the blocks
app.get('/blocks',(req,res)=>{

    res.json(blockchain.chain);

});

app.get('/transactions',(req,res)=>{
    res.json(transactionPool.transactions);
  });

//api to add blocks
app.post('/mine',(req,res)=>{
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);
    p2pserver.syncChain();

    res.redirect('/blocks');

});

app.post("/transact", (req, res) => {
  const { to, amount, type } = req.body;
  const transaction = wallet.createTransaction(
    to,
    amount,
    type,
    blockchain,
    transactionPool
  );
  p2pserver.broadcastTransaction(transaction);
  res.redirect("/transactions");
});
// app server configurations

app.listen(HTTP_PORT,()=>{
    console.log(`AD ASTAR 🐸!! Listening on port ${HTTP_PORT}`);
});

p2pserver.listen(); // starts the p2pserver


const Block = require('./block')
const Blockchain = require('./blockchain')
const blockchain = new Blockchain()

var express = require('express')
var app = express()



/*
Server side
*/
app.listen(8000, function () {
  console.log('Blockchain Web Api running on the port 8000');
});

const bodyParser = require('body-parser')
app.use(bodyParser.json())

/*
Endpoint Get  / display all the functionality
*/
app.get('/', (req, res) => res.status(404).json([
  {
    "endpoint": "http://127.0.0.1:8000",
    "method": "GET",
    "message": "The information about all endpoints"
  },
  {
    "endpoint": "http://127.0.0.1/block/{height}",
    "method": "GET",
    "message": "Get the block by height"
  },
  {
    "endpoint": "http://127.0.0.1/block",
    "method": "POST",
    "message": "Create a new block"
  },
  {
    "endpoint": "http://127.0.0.1/blockchain",
    "method": "GET",
    "message": "Get all the blocks stored in the blockchain"
  }
]))

/*
Endpoint GET /block/{height}
*/
app.get('/block/:height', async function (req, res) {
  try{
    const blockheight = await blockchain.getBlockHeight()
    if (req.params.height >= blockheight) {
      res.status(404).json({
    	"status": 404,
    	"message": "Current blockchain height is，valid value is [0, " + blockheight + ")."
      })
    } else {
      const response = await blockchain.getBlock(req.params.height)
      res.send(response)
    }
  } catch (error) {
    res.status(404).json({
    	"status": 404,
    	"message": "The block height " + req.params.height + " can't be found in current Blockchain."
    })
  }
})

/*
Endpoint POST /block
*/
app.post('/block', async function (req, res) {
  if (req.body.body === '' || req.body.body === undefined) {
    res.status(400).json({
    	"status": 400,
    	"message": "The block body information must not be blank."
    })
  }
  
  // add the post block by body info
  await blockchain.addBlock(new Block(req.body.body))
  
  // get block height
  const blockheight = await blockchain.getBlockHeight()

  // reply the post request with new added block
  try {
    const response = await blockchain.getBlock(blockheight - 1)
    res.send(response)
  } catch (err) {
  	console.log(err)
  }
})

/*
Endpoint GET /blockchain
*/
app.get('/blockchain', async function (req, res) {
  try{
    const chain = await blockchain.getChain()
    res.json({
 	  "success": true,
 	  "message": chain
    })
  } catch (error) {
    res.status(500).json({
    	"success": false,
    	"message": "Get blockchain information failed."
    })
  }
})
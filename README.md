# Blockchain Data

Blockchain has the potential to change the way that the world approaches data. Develop Blockchain skills by understanding the data model behind Blockchain by developing your own simplified private blockchain.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Installing Node and NPM is pretty straightforward using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].

### Configuring your project

- Use NPM to initialize your project and create package.json to store project dependencies.
```
npm init
```
- Install crypto-js with --save flag to save dependency to our package.json file
```
npm install crypto-js --save
```
- Install level with --save flag
```
npm install level --save
```
- Install express with --save flag
```
npm install express --save
```

## Testing

To test code:
```
node index.js
```

## Endpoint 

### GET http://localhost:8000
```
[
{"endpoint":"http://127.0.0.1:8000","method":"GET","message":"The information about all endpoints"},{"endpoint":"http://127.0.0.1/block/{height}","method":"GET","message":"Get the block by height"},{"endpoint":"http://127.0.0.1/block","method":"POST","message":"Create a new block"},{"endpoint":"http://127.0.0.1/blockchain","method":"GET","message":"Get all the blocks stored in the blockchain"}
]
```

### Endpoint GET http://localhost:8000/block/{height}
```
{
"hash":"ec2944b23940b8aeff21572e2ebf52cc242688dbe42242373c574291dac8b67d",
"height":0,"body":"First block in the chain - Genesis block","time":"1536583828","previousBlockHash":""
}
```

### Endpoint POST http://localhost:8000/block/
Post a new block with cur command:
```
curl -X "POST" "http://localhost:8000/block"  -H 'Content-Type: application/json'  -d $'{"body": "Testing block with test string data"}'
```

Got a response like below:
```
{
"hash":"a9d8bce52e1008960dea46c3b7a8bc32371718d62c4fcb69db9d5310bfb187c4",
"height":1,"body":"Testing block with test string data",
"time":"1536584026","previousBlockHash":"ec2944b23940b8aeff21572e2ebf52cc242688dbe42242373c574291dac8b67d"
}
```

### Endpoint GET http://localhost:8000/blockchain

```
{
"success":true,"message":[{"hash":"ec2944b23940b8aeff21572e2ebf52cc242688dbe42242373c574291dac8b67d","height":0,"body":"First block in the chain - Genesis block","time":"1536583828","previousBlockHash":""},{"hash":"a9d8bce52e1008960dea46c3b7a8bc32371718d62c4fcb69db9d5310bfb187c4","height":1,"body":"Testing block with test string data","time":"1536584026","previousBlockHash":"ec2944b23940b8aeff21572e2ebf52cc242688dbe42242373c574291dac8b67d"}]
}
```

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync('calc.proto');
const grpcObject = grpc.loadPackageDefinition(packageDef);
const calculator = grpcObject.calculator;


const client = new calculator.CalculatorService('localhost:30000', grpc.credentials.createInsecure());
let command = process.argv[2];
let p1 = process.argv[3];
let p2 = process.argv[4];

switch (command) {
    case 'add':
        doAddition(p1, p2);
        break;
    case 'cub':
        doCubition(p1);
        break;
    case 'hel':
        doHello(p1);
        break;
    case 'rand':
        doRand(p1);
        break;
}

function doAddition(a, b) {
    a = parseInt(a);
    b = parseInt(b);
    client.Add({ a, b }, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            const answer = res.c;
            console.log(`Sum of ${a} and ${b} is ${answer}`);
        }
    });
}

function doCubition(a) {
    a = parseInt(a);

    client.Cub({ x: a }, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            const answer = res.y;
            console.log(`Cube of ${a} is ${answer}`);
        }
    });
}

function doHello(a) {
    client.Hel({ name: a }, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`${a} sent to server`);
        }
    });
}


function doRand(n) {
    client.Rand({ n }, (err, res) => {
        if(err) {
            console.log(err)
        }
        else {
            console.log(`Hi ${n}, your request for random numbers has been sent to server`)
        }
    })     
}

// function doRand (n) {
//     let call = client.Rand({n:n})
//     call.on('data', (res) => {
//         console.log('res>>>', res, n)
//     })
// }




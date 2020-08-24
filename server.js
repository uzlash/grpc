const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync('calc.proto');
const grpcObject = grpc.loadPackageDefinition(packageDef);
const calculator = grpcObject.calculator;

const server = new grpc.Server();
server.bind('0.0.0.0:30000', grpc.ServerCredentials.createInsecure());

server.addService(calculator.CalculatorService.service, {
    Add: sumNumbers,
    Cub: doCube,
    Hel: doHello,
    Rand: doRandom
});

function sumNumbers(call, callback) {
    const a = call.request.a;
    const b = call.request.b;
    console.log(a, b);
    const c = a + b;
    console.log('sum >>> ', c);
    callback(null, { c })
}

function doCube(call, callback) {
    const { x } = call.request;
    const y = x * x * x;
    callback(null, { y })
}

function doHello(call, callback) {
    const { name } = call.request;
    console.log(`Got ${name} from Client !`);
    callback(null, {})
}

function doRandom(call, callback) {
    const { n } = call.request;
    const y = Math.ceil(Math.random() * 10)
    setTimeout(function(){
        // console.log('y>>>', y);
        console.log(`Hello ${n}, your random number is ${ y }`)
        doRandom(call, callback);
        }, 1000);
    callback(null, { y })
}

console.log('server listening on port 30000');
server.start();
const { createClient } = require('redis');
const client = createClient();
client.on('error', (error) => console.log('Redis Client Error', error));
client.on('error', function (error) {
    console.log(error);
    process.exit(1);
})
client.on('connect', function () {
    console.log("Connect Redis");
})
client.on('ready', function () {
    console.log("Redis to ready");
})

module.exports = client;
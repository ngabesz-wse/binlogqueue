'use strict';

const express = require('express');
var amqp = require('amqp');
var redis = require("redis");


var redisClient = redis.createClient({host:'redis'});
var connection = amqp.createConnection({ host: 'rabbitmq' });

console.log('waiting for messages!');

connection.on('error', function(e) {
  console.log("Error from amqp: ", e);
});

connection.on('ready', function () {
  connection.queue('maxwell', function (q) {
      q.bind('#');
    
      q.subscribe(function (message) {
        console.log(message);
        // var d = JSON.parse(message.value);
        // redisClient.set(d.database +':'+ d.table, d.data.id,redis.print);
      });
  });
});

process.on('SIGINT', function() {
    conection.disconnect();
    process.exit();
});
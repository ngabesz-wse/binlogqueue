'use strict';

const express = require('express');
var kafka = require('kafka-node');

var redis = require("redis");
var redisClient = redis.createClient({host:'redis'});

var HighLevelConsumer = kafka.HighLevelConsumer;
var Client = kafka.Client;

var client = new Client('zookeeper:2181');
var topics = [{
    topic: 'maxwell'
}];

var options = {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: 'utf8'
};
var consumer = new HighLevelConsumer(client, topics, options);

console.log('waiting for messages!');

consumer.on('message', function(message) {

    var d = JSON.parse(message.value);
    redisClient.set(d.database +':'+ d.table, d.data.id,redis.print);

});

consumer.on('error', function(err) {
    console.log('error', err);
});

process.on('SIGINT', function() {
    consumer.close(true, function() {
        process.exit();
    });
});
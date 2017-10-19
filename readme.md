Grant access to database:

```
GRANT ALL on maxwell.* to 'maxwell'@'%' identified by 'XXXXXX';
GRANT SELECT, REPLICATION CLIENT, REPLICATION SLAVE on *.* to 'maxwell'@'%';
```

Kafka:
```bash
docker-compose up -d
```

RabbitMQ:
```bash
docker-compose -f docker-compose.rabbit.yml up -d
```

Both containers have: PhpMyAdmin and RedisCommadner.

* PhpMyAdmin: `http://localhost:8081`
* RedisCommander: `http://localhost:8082`

For RabbitMQ, we have a management client: `http://localhost:8083`
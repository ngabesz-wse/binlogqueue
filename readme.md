Change ip address to yours in docker-compose.yml:
```
KAFKA_ADVERTISED_HOST_NAME: [your-ip]
```

Start a kafka producer daemon:

```
docker run -it --rm zendesk/maxwell bin/maxwell --user=$MYSQL_USERNAME --password=$MYSQL_PASSWORD --host=$MYSQL_HOST --producer=kafka --kafka.bootstrap.servers=$KAFKA_HOST:$KAFKA_PORT
```

Grant access to database:

```
GRANT ALL on maxwell.* to 'maxwell'@'%' identified by 'XXXXXX';
GRANT SELECT, REPLICATION CLIENT, REPLICATION SLAVE on *.* to 'maxwell'@'%';
```
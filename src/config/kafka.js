const kafka = require('kafka-node')
    Producer = kafka.Producer
    KeyedMessage= kafka.KeyedMessage
    client = new kafka.KafkaClient({kafkaHost: process.env.KAFKA_HOST})
    producer=new Producer(client)
    km = new KeyedMessage(client)

export default client
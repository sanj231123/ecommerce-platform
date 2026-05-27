const amqp = require("amqplib");

let channel;

async function connectRabbitMQ() {

  try {

    const connection = await amqp.connect(
      process.env.RABBITMQ_URL
    );

    channel = await connection.createChannel();

    await channel.assertQueue(
      "order.notifications"
    );

    console.log("RabbitMQ Connected");

  } catch (err) {

    console.log(err);

  }

}

function getChannel() {

  return channel;

}

module.exports = {
  connectRabbitMQ,
  getChannel
};

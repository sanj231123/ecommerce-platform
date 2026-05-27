const amqp = require("amqplib");

let channel;

async function connectRabbitMQ() {

  while (true) {

    try {

      const connection =
        await amqp.connect(
          "amqp://rabbitmq:5672"
        );

      channel =
        await connection.createChannel();

      await channel.assertQueue(
        "order.notifications"
      );

      console.log(
        "RabbitMQ Connected"
      );

      break;

    } catch (err) {

      console.log(
        "❌ RabbitMQ not ready, retrying..."
      );

      await new Promise(resolve =>
        setTimeout(resolve, 5000)
      );

    }

  }

}

function getChannel() {

  return channel;

}

module.exports = {
  connectRabbitMQ,
  getChannel
};

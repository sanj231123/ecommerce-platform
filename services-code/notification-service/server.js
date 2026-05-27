require("dotenv").config();

const express = require("express");

const {
  connectRabbitMQ
} = require("./rabbitmq");

const consumeMessages = require("./consumer");

const app = express();

async function startServer() {

  await connectRabbitMQ();

  await consumeMessages();

  app.listen(5008, () => {

    console.log(
      "Notification Service Running"
    );

  });

}

startServer();

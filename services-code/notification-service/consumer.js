const { getChannel } = require("./rabbitmq");
const sendEmail = require("./mailer");

async function consumeMessages() {

  const channel = getChannel();

  channel.consume(
    "order.notifications",

    async (msg) => {

      try {

        const data = JSON.parse(
          msg.content.toString()
        );

        console.log("Message:", data);

        if (data.type === "ORDER_PLACED") {

          await sendEmail(
            data.email,
            "Order Placed",
            `Your order #${data.orderId} placed successfully`
          );

          console.log(
            `Email sent to ${data.email}`
          );
        }

        channel.ack(msg);

      } catch (err) {

        console.error(
          "Email Error:",
          err.message
        );

        channel.ack(msg);
      }

    }

  );

}

module.exports = consumeMessages;

import { emailer } from "../lib/emailer"
import connectToRabbitMQ from "./rabbitmq"

const consumeMessages = async () => {
  const { channel, queueName } = await connectToRabbitMQ()
  channel.consume(
    queueName,
    async (message) => {
      if (message !== null) {
        try {
          const emailData = JSON.parse(message.content.toString())
          await emailer(emailData)
          console.log("Email sent success")
          channel.ack(message)
        } catch (err: unknown) {
          console.error("Error sending email:", err)
          channel.reject(message, false)
        }
      }
    },
    { noAck: true }
  )
}

export { consumeMessages }

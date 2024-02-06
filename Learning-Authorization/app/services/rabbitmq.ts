import amqp from "amqplib"

interface RabbitMQConnection {
  channel: amqp.Channel
  queueName: string
}

const connectToRabbitMQ = async (): Promise<RabbitMQConnection> => {
  try {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()
    const queueName = "email_queue"
    await channel.assertQueue(queueName, { durable: true })
    return { channel, queueName }
  } catch (err: any) {
    console.error("Error connecting to RabbitMQ:", err)
    throw err
  }
}

const sendMessageToQueue = async (message: object) => {
  const { channel, queueName } = await connectToRabbitMQ()
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  })
  console.log("Message sent to RabbitMQ: Success!")
}

export { sendMessageToQueue } // Export only sendMessageToQueue

// Optional: Export connectToRabbitMQ separately if needed
export default connectToRabbitMQ

import app from "./app"
import dotenv from "dotenv"
import { consumeMessages } from "./app/services/consumer"
dotenv.config()

const port = process.env.APP_PORT || 3000

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

server.on("ERROR", (err: Error) => {
  console.error(`Error:${err.message}`)
})

consumeMessages().catch((err: Error) => {
  console.error("Error consuming message:", err)
})

import express from "express"
import mainRoutes from "./app/routes/mainRoutes"

const app = express()
app.use(express.json())

app.use(mainRoutes)

export default app

import { Router } from "express"
import authRoute from "./authRoute"
import booksRoute from "./booksRoute"

const route = Router()

route.use("/auth", authRoute)
route.use("/book", booksRoute)

export default route

import { Router } from "express"
import authRoute from "./authRoute"
import bookRoute from "./bookRoute"
import authorRoute from "./authorRoute"

const route = Router()

route.use("/auth", authRoute)
route.use("/book", bookRoute)
route.use("/author", authorRoute)

export default route

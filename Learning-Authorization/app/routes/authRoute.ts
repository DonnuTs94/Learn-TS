import { Router } from "express"
import authController from "../controllers/authController"

const route = Router()

route.post("/register", authController.register)
route.post("/token", authController.token)

export default route

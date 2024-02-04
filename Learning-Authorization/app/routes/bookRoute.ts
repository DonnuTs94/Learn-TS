import { Router } from "express"
import { verifyToken } from "../middleware/authMiddleware"
import bookController from "../controllers/bookController"

const route = Router()

route.get("/", verifyToken, bookController.allBooks)

export default route

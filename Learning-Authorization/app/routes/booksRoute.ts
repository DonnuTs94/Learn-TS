import { Router } from "express"
import { verifyToken } from "../middleware/authMiddleware"
import booksController from "../controllers/booksController"

const route = Router()

route.get("/", verifyToken, booksController.allBooks)

export default route

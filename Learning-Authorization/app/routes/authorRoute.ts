import { Router } from "express"
import { verifyToken, authorizePermission } from "../middleware/authMiddleware"
import { Permission } from "../enum/authorization"
import authorController from "../controllers/authorController"

const route = Router()

route.post(
  "/",
  verifyToken,
  authorizePermission(Permission.ADD_AUTHOR),
  authorController.createAuthor
)

export default route

import { PrismaClient } from "@prisma/client"
import { Request, Response, NextFunction } from "express"
import { IValidateAuth } from "../interfaces/authInterface"

const prisma = new PrismaClient()

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error: IValidateAuth = {
    email: "",
    password: "",
  }

  const { email, password } = req.body

  if (!email) {
    error.email = "Email is required"
  }

  if (!password) {
    error.password = "Password is required"
  }

  if (Object.keys(error).length > 0) {
    return res.status(422).json(error)
  }

  next()
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({
      error: "Unauthorize",
    })
  }

  const checkTokenExist = await prisma.token.findFirst({
    where: {
      token,
    },
    include: {
      User: {
        select: {
          id: true,
          name: true,
          email: true,
          is_blocked: true,
          roleId: true,
        },
      },
    },
  })

  if (!checkTokenExist) {
    return res.status(401).json({
      message: "Invalid token",
    })
  }

  if (checkTokenExist.expired_at < new Date()) {
    return res.status(401).json({
      message: "Expired token",
    })
  }

  if (checkTokenExist.User?.is_blocked) {
    return res.status(401).json({
      message: "Blocked user",
    })
  }

  req.user = checkTokenExist.User || undefined

  next()
}

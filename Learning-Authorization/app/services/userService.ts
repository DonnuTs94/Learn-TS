import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
const prisma = new PrismaClient()

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const hashPassword = bcrypt.hashSync(password, 5)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      roleId: 1,
    },
  })
}

export const findEmail = async (email: string) => {
  const userData = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  return userData
}

export const createToken = async (userId: number, token: string) => {
  await prisma.token.create({
    data: {
      userId,
      token,
      expired_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  })
}

// export const checkUserData =

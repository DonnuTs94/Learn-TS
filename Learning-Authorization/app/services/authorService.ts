import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createAuthor = async (name: string) => {
  await prisma.author.create({
    data: {
      name,
    },
  })
}

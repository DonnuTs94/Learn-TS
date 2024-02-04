import { Request, Response } from "express"
import { IAuthor } from "../interfaces/authorInterface"
import { createAuthor } from "../services/authorService"

const authorController = {
  createAuthor: async (req: Request, res: Response) => {
    try {
      const { name }: IAuthor = req.body

      if (!name) {
        return res.status(422).json({
          message: "Name must be filled!",
        })
      }

      createAuthor(name)

      return res.status(200).json({
        message: "Success add new author!",
      })
    } catch (err: any) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

export default authorController

import { Request, Response } from "express"

const booksController = {
  allBooks: async (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: "Success",
      })
    } catch (err: any) {
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

export default booksController

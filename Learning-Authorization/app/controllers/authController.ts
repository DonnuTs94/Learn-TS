import { Request, Response } from "express"
import bcrypt from "bcrypt"
import randomString from "randomstring"
import fs from "fs"
import handlebars from "handlebars"

import { IUserForm, IValidateAuth } from "../interfaces/authInterface"
import { createToken, createUser, findEmail } from "../services/userService"
import { sendMessageToQueue } from "../services/rabbitmq"
import { consumeMessages } from "../services/consumer"
import { emailer } from "../lib/emailer"

const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password }: IUserForm = req.body

      await createUser(name, email, password)

      const rawHtml = fs.readFileSync("templates/sendOtp.html", "utf-8")
      const compiledHTML = handlebars.compile(rawHtml)
      const htmlResult = compiledHTML({
        name,
      })

      await emailer({
        to: email,
        html: htmlResult,
        subject: "Hello from Rabbit",
      })

      // const emailData = {
      //   to: email,
      //   subject: "Hello From Rabbit And NodeMailer",
      //   html: htmlResult,
      // }

      // sendMessageToQueue(emailData)

      // consumeMessages().catch((err: Error) => {
      //   console.error("Error consuming message:", err)
      // })

      return res.status(200).json({
        message: "Success register new user!",
      })
    } catch (err: any) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },

  token: async (req: Request, res: Response) => {
    try {
      const { password, email }: IValidateAuth = req.body

      const userLogin = await findEmail(email)

      if (!userLogin) {
        return res.status(400).json({
          message: "Invalid credentials",
        })
      }

      if (userLogin.is_blocked === true) {
        return res.json({
          message: "User is blocked",
        })
      }

      const passwordIsValid = bcrypt.compareSync(password, userLogin.password)

      if (!passwordIsValid) {
        return res.status(400).json({
          message: "Invalid credential",
        })
      }

      const token = randomString.generate()

      await createToken(userLogin.id, token)

      return res.status(200).json({
        message: "Login success",
        token,
      })
    } catch (err: any) {
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

export default authController

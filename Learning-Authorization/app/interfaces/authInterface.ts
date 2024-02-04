export interface IUserForm {
  name: string
  email: string
  password: string
}

export interface IRoles {
  ADMINISTRATOR: string
  REGULAR_USER: string
}

export interface IValidateAuth {
  email: string
  password: string
}

export interface IUser {
  id: number
  name: string
  email: string
  is_blocked: boolean
  roleId: number | null
}

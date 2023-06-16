export interface IUser {
  _id: string
  name: string
  username: string
  country: string
  bio: string
  link: string
  image: string
  views: number
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IUserInput {
  name: string
  username: string
  country: string
  bio: string
  link: string
  image: string
}

export interface IArticle {
  _id: string
  user: string
  title: string
  url: string
  tags: string[]
  description: string
  body: string
  image: string
  views: number
  likes: number
  comments: number
  edited: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

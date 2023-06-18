export interface IUser {
  _id: string
  name: string
  username: string
  country: string
  bio: string
  link: string
  image: string
  views: number
  createdAt: Date
  updatedAt: Date
  __v: number
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
  createdAt: Date
  updatedAt: Date
  __v: number
}

export interface IComment {
  _id: string
  user: string
  parentArticle: string
  body: string
  likes: number
  replies: number
  edited: boolean
  createdAt: Date
  updatedAt: Date
  __v: number
}

export interface IReply {
  _id: string
  user: string
  parentArticle: string
  parentComment: string
  body: string
  likes: number
  edited: boolean
  createdAt: Date
  updatedAt: Date
  __v: number
}

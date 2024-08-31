import {Article,Comment,User} from '@prisma/client'



export type CommentWithUser = Comment & {user : User}

export type ArticleUserComment = Article & {comments : CommentWithUser[] }

export interface Iparams {
  params : {
    id : string
  }
}

export interface IRegister {
  email: string;
  username: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IupdateUser {
  newEmail?: string;
  newUsername?: string;
  newPassword?: string;
}

export interface Ijwtpayload {
  id: number;
  email: string;
  isAdmin: boolean;
}

export interface IuserJwtPayload {
  id : number ,
  email : string ,
  isAdmin : boolean ,
  iat : Date ,
  exp : Date
}

export interface Icomment {
  text : string
  articleId : number
}

export interface Ieditcomment {
  newText : string
}

export interface IeditArticle {
  newTitle  :string ,
  newDescription : string ,
}


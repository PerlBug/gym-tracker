import { Request,Response } from "express";
import {Connection} from 'mongoose'
export interface ILogin{
  email: string,
  password: string
}

export interface IContextType{
  req: Request,
  res: Response,
  payload?: {id: string},
  dbConn: Connection
}
import * as bcrypt from 'bcryptjs';
import {sign, verify} from 'jsonwebtoken'
import {Request} from 'express';
import { IContextType } from '../types';
import { UnauthorizedError } from 'type-graphql';
const secret: string = process.env.JWT_SECRET as string;
const refreshSecret: string = process.env.REFRESH_SECRET as string;


/* Returns payload with user based on auth header */
export async function getAuthPayload(req: Request): Promise<{id: string} | undefined>{
  let payload;
  const auth = req.headers['authorization'];
  if(!auth){
    return payload;
  }

  try{
    const token = auth.split(' ')[1];
    payload = verify(token,  process.env.JWT_SECRET);
  }catch(err){
    console.log(err);
    return payload;
  }

  return payload;
}
/* returns userId from context, if does not exist, throws an unauthorized error */
export function getUserIdFromContext(context: IContextType){
  return context?.payload?.id
}

export function hashPassword(password: string){
  return bcrypt.hashSync(password);
}

export function isPasswordValid(password: string, hash: string){
  return bcrypt.compareSync(password, hash);
}

export async function createAccessToken(payload, expiry = '15m'){
  const token = await sign({...payload}, secret, {expiresIn: expiry});
  return token;
}

export async function createRefreshToken(payload, expiry = '7d'){
  const token = await sign({...payload}, refreshSecret, {expiresIn: expiry});
  return token;
}


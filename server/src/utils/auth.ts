import * as bcrypt from 'bcryptjs';
import {sign} from 'jsonwebtoken'

const secret: string = process.env.JWT_SECRET as string;

export function hashPassword(password: string){
  return bcrypt.hashSync(password);
}

export function isPasswordValid(password: string, hash: string){
  return bcrypt.compareSync(password, hash);
}

export async function signJwt(payload){
  const token = await sign({...payload}, secret, {expiresIn: '15m'});
  return token;
}
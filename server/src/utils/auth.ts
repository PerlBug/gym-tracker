const secret: string = process.env.SECRET as string;
import * as bcrypt from 'bcryptjs';


export function hashPassword(password: string){
  return bcrypt.hashSync(password);
}
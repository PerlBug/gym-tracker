
import { ApolloError } from "apollo-server";

/* Handles controller errors */

export function errorHandler(error: any, args?: any){
  const errorMsg = error.errors ? error?.errors[Object?.keys(error?.errors)?.[0]]?.properties?.message : undefined
  let duplicateError;
  if(error?.code === 11000){
    duplicateError = Object.keys(error?.keyValue)?.[0]
  }
  if(errorMsg){
    throw new ApolloError(errorMsg);
  }else if(duplicateError){
    throw new ApolloError(`${duplicateError} already exists`);
  }
  else{
    throw new ApolloError(error.toString());
  }
 
}
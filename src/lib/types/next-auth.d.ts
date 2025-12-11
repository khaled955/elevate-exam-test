/* eslint-disable @typescript-eslint/no-empty-object-type */
//  types for next auth

import { User } from "next-auth";
import { AuthUser } from "./authentication";



declare module "next-auth" {
  
interface User {
    accessToken:string;
    user:AuthUser;

}


  interface Session extends Omit<User,"accessToken"> {
   
  }

  //  if there is any problem in type of session  other syntax

  //  interface Session {
  //  user:User["user"];
  // }



}



declare module "next-auth/jwt" {
    //  include in all User interface 
    //  must make import as it in adifferent module
  interface JWT  extends User{

  }
}






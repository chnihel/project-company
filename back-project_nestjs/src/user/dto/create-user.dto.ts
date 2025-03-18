/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
export class CreateUserDto {
    @ApiProperty({type:'string', description:'name'})

  @IsString()
  @IsNotEmpty()

  readonly name: string;
  @ApiProperty({type:'string', description:'username'})

  @IsString()
  @IsNotEmpty()
  readonly username: string;
  @ApiProperty({type:'string', description:'email'})

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

     code : string ;
    verify : boolean ;

  @ApiProperty({type:'string', description:'password'})

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
  @Matches(/[A-Z]/, { message: 'Le mot de passe doit contenir au moins une majuscule.' })
  @Matches(/[a-z]/, { message: 'Le mot de passe doit contenir au moins une minuscule.' })
  @Matches(/[0-9]/, { message: 'Le mot de passe doit contenir au moins un chiffre.' })
  @Matches(/[\W_]/, { message: 'Le mot de passe doit contenir au moins un caractère spécial.' })
   password: string;
     refreshToken: string;

}

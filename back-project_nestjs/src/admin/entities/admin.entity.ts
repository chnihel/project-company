/* eslint-disable prettier/prettier */

import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/entities/user.entity";
import * as argon2 from 'argon2'

@Schema()
export class Admin extends User {
  item: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

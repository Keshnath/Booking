import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator'; 
import { UserRole } from '../entities/user.entity'; 

export class RegisterDto { 
  @IsString() 
  @IsNotEmpty() 
  name!: string; 

  @IsEmail() 
  email!: string; 

  @IsString() 
  @MinLength(8) 
  password!: string; 

  @IsEnum(UserRole) // Fixed capitalization here
  role!: UserRole;  // Best practice: type this as the enum itself rather than a generic string
}

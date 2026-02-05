import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class SendContactDto {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  phone?: string;

  @IsNotEmpty()
  @MinLength(10)
  message!: string;
}

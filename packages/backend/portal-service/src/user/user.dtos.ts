import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserGet {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  username!: string;

  @ApiProperty()
  roles!: Array<string>;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class UserCreate {
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
  @ApiProperty()
  password!: string;

  @Matches(/^[a-zA-Z0-9]+$/)
  @MinLength(3)
  @ApiProperty()
  username!: string;

  @IsArray()
  @ApiProperty()
  roles!: Array<string>;
}

export class UserUpdate {
  @IsArray()
  @ApiProperty()
  roles!: Array<string>;
}

export class PasswordUpdate {
  @IsString()
  @ApiProperty()
  old!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(255)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
  @ApiProperty()
  new!: string;
}

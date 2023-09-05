import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProfileGet {
  @ApiProperty()
  userId!: string | null;

  @ApiProperty({ type: String, nullable: true })
  displayName!: string | null;

  @ApiProperty({ type: String, nullable: true })
  motd!: string | null;

  @ApiProperty()
  favoritePokemon?: Array<number>;

  @ApiProperty()
  badges?: Array<number>;

  @ApiProperty({ type: String, nullable: true })
  imageBase64Url?: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class ProfileUpdate {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, nullable: true, required: true })
  displayName!: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, nullable: true, required: true })
  motd!: string | null;

  @IsNumber(undefined, { each: true })
  @IsOptional()
  @ApiProperty({ type: [Number], required: true })
  favoritePokemon?: Array<number>;

  @IsNumber(undefined, { each: true })
  @IsOptional()
  @ApiProperty({ type: [Number], required: true })
  badges?: Array<number>;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, nullable: true, required: true })
  imageBase64Url?: string;
}

import { IsArray, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";



export class RickyMortyDto {
    @IsNotEmpty()
    @IsArray()
    params!: string[];

}
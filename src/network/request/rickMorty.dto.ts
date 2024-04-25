import { CancelTokenSource } from "axios";
import { IsArray, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";


export interface SearchBarNetworkProps {
    cancelToken: CancelTokenSource;
    queryParams: string;
}


export class RickyMortyDto {
    @IsNotEmpty()
    @IsArray()
    params!: string[];

}
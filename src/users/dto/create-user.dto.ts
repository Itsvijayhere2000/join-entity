import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    Name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    

}

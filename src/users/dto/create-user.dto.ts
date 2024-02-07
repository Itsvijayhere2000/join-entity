import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    Name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    roleId:number

    @ApiProperty()
    otp:number;
}
export class CreateTaskDto{
    @ApiProperty()
    userId: number;

    @ApiProperty()
    projectName: string;

    @ApiProperty()
    Task: string;
    
    @ApiProperty()
    startDate: Date;

    @ApiProperty()
    endDate: Date;

    @ApiProperty()
    status: number;


}
export class CreateStatusDto{
    @ApiProperty()
    status: string;

}
export class CreateRoleDto{
    @ApiProperty()
    role: string;

}
export class CreateLoginDto{
    @ApiProperty()
    email:string;
    @ApiProperty()
    password:string;
}

export class VerifyDto{


    @ApiProperty()
    otp:number
}

export class forgotDto{
    @ApiProperty()
    email:string;
}

export class changepassDto{
    @ApiProperty()
    otp:number;
    
}
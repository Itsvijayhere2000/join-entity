import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express'; 

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

 
  @Get('getAllTask')
  async getAllTask(@Res() res: Response, @Req() req: Request)

  {
    try {
    let data= await this.usersService.getAllTask()
    res.status(HttpStatus.OK).json({
      success: true,
      data: data,
    })
    }
    catch (error){
      console.log(error);
      
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success:false,
        message:'Error In Getting User Data'
      })


      
    }
  }
  @Post('createuser')
  async createuser(@Req() req:Request, @Res() res:Response, @Body() data:CreateUserDto){
    try{
      
      data['createdBy']=1
     const user= await this.usersService.creatuser(data);
     console.log('user',user);
     res.status(HttpStatus.OK).json({
      message:'THE STATUS CREATED SUCCESSFULLY'
    });
  }
    catch(error){
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:'Somthing went worng'
      });
      

    }
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express'; 
import { EmailService } from 'src/email/email.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly emailService:EmailService,
    ) {}

 
  @Get('getAllTask')
  async getAllTask(@Res() res: Response, @Req() req: Request)

  {
    try {
    let data= await this.usersService.getAllTask()

    // await this.emailService.sendMail()
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


  @Get('getAllrole')
  async getAllrole(@Req() req:Request,@Res() res:Response){
    try{
const data=await this.usersService.getAllrole()
res.status(HttpStatus.OK).json({
  success:true,
  data:data,
})
    }
    catch(error){
res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
  success:false,
  message:'error in getting role data'
})
    }
  }

  @Get('getAllstatus')
  async getAllstatus(@Req() req:Request,@Res() res:Response){
    try{
const data=await this.usersService.getAllstatus()
res.status(HttpStatus.OK).json({
  success:true,
  data:data,
})
    }
    catch(error){
res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
  success:false,
  message:'error in getting status data'
})
    }
  }

  @Get('getAllusers')
  async getAllusers(@Req() req:Request,@Res() res:Response){
    try{
const data=await this.usersService.getAllusers()
res.status(HttpStatus.OK).json({
  success:true,
  data:data,
})
    }
    catch(error){
res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
  success:false,
  message:'error in getting users data'
})
    }
  }

  
}

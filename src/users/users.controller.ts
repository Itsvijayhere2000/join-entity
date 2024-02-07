import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus ,UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateLoginDto, CreateRoleDto, CreateStatusDto, CreateTaskDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express'; 
import { EmailService } from 'src/email/email.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

// @UseGuards(AuthGuard('jwt'))
// @ApiTags('admin')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly emailService:EmailService,
    ) {}

 
  @Get('getAllTask')
   @UseGuards(AuthGuard('jwt'))
  async getAllTask(@Res() res: Response, @Req() req: Request)
    
  {
    const userId = req['user']['userId'];
    console.log('dataa',userId);
    
    try {
    let data= await this.usersService.getAllTask()

    // await this.emailService.sendMail()
    res.status(HttpStatus.OK).json({
      success: true,
      data: data,
      
    })
    }
    catch (error){
    {
        console.log(error);
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success:false,
        message:'Error In Getting User Data'
      });
    }
    }
  }
  
  @Post('createuser')
  async createuser(@Req() req:Request, @Res() res:Response, @Body() data:CreateUserDto){
    try{
      
      data['createdBy']=1
     const user= await this.usersService.creatuser(data);
     console.log('user',user);
     res.status(HttpStatus.OK).json({
      message:'THE USER CREATED SUCCESSFULLY'
    });
  }
    catch(error){
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:'Somthing went worng'
      });
      

    }
  }

  @Post('createstatus')
  async createstatus(@Req() req:Request, @Res() res:Response, @Body() data:CreateStatusDto){
    try{
      
      data['createdBy']=1
     const user= await this.usersService.createstatus(data);
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
  @Post('createrole')
  async createrole(@Req() req:Request, @Res() res:Response, @Body() data:CreateRoleDto){
    try{
      
      data['createdBy']=1
     const user= await this.usersService.createrole(data);
     console.log('user',user);
     res.status(HttpStatus.OK).json({
      message:'THE ROLE CREATED SUCCESSFULLY'
    });
  }
    catch(error){
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:'Somthing went worng'
      });
      

    }
  }
  @Post('createtask')
  async createtask(@Req() req:Request, @Res() res:Response, @Body() data:CreateTaskDto){
    try{
      
      data['createdBy']=1
     const user= await this.usersService.createtask(data);
     console.log('user',user);
     res.status(HttpStatus.OK).json({
      message:'THE ROLE CREATED SUCCESSFULLY'
    });
  }
    catch(error){
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:'Somthing went worng'
      });
      

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

  @Post('login')
async login(@Req() req: Request, @Res() res: Response, @Body() data: CreateLoginDto) {
  try {
    const userResponse = await this.usersService.login(data);
    
    if (userResponse.message === 'Login successful') {
      res.status(HttpStatus.OK).json({
        message: 'Login successful',
        data: userResponse.user, // Sending user details in the response
        token:userResponse.accessToken
      });
    } else {
      res.status(HttpStatus.UNAUTHORIZED).json({
        message: userResponse.message
      });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Something went wrong. Login failed.'
    });
  }
}

}

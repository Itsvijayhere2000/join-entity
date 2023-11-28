import { Injectable } from '@nestjs/common';
import { CreateLoginDto, CreateRoleDto, CreateStatusDto, CreateTaskDto, CreateUserDto, VerifyDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles, Tasks, User,status } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { string } from 'yargs';

@Injectable()
export class UsersService {

  constructor(@InjectRepository (User)
   private userRepo: Repository<User>,
   @InjectRepository(Tasks)
   private taskRepo: Repository<Tasks>,
   @InjectRepository(Tasks)
   private statusrepo: Repository<status>,
   @InjectRepository(Roles)
   private roleRepo:Repository<Roles>,
   private jwtService: JwtService,
   ){
   

  }

 async getAllTask(){
    let data = await this.taskRepo
    .createQueryBuilder('task')
    .select(`task.id as taskId,task.userId as userId,task.projectName as project,task.task as task, task.status as status,u.Name as userName`)
    .leftJoin(User,'u','u.id = task.userId')
    .leftJoin(status,'s','s.id = task.status')
    .where('u.roleId =:roleId', { roleId: 1 })
    .execute()
    return data 
  }

  async creatuser(user:CreateUserDto):Promise<User>{
    let pwd =user.password
    pwd = await bcrypt.hash(pwd,10)
    user.password = pwd;
    return this.userRepo.save(user);
  }
  async createrole(role:CreateRoleDto):Promise<Roles>{
    return this.roleRepo.save(role)
  }

  async createtask(task:CreateTaskDto):Promise<Tasks>{
    
    return this.taskRepo.save(task);
  }
   async createstatus(status:CreateStatusDto):Promise<status>{
    return this.statusrepo.save(status)
   
 }

//    async createstatus(status:CreateStatusDto):Promise<Status>{
//     return this.statusrepo.save(status)
//    }
 


  async getAllrole(){
    let data = await this.roleRepo
    .createQueryBuilder('role')
    .select(`role.id as roleId,role.role as role`)
    .execute()
    return data
  }


   async getAllstatus(){
    const data = await this.statusrepo
    .createQueryBuilder('status')
    .select(`status.id as statusId,status.status as status`)
    .execute();
    return data;
   }


  async getAllusers(){
    const data = await this.userRepo
    .createQueryBuilder('user')
    .select(`user.id as userId,user.Name as name,user.email as email,r.id as roleId`)
    .leftJoin(Roles,'r','r.id=user.roleid')
    .execute();
    return data;
  }
  // async login(login:CreateLoginDto):Promise<string>{

  //   let emailverify=login.email
  //   console.log('emailverify',emailverify);
    
  //   let data= await this.userRepo
  //   .createQueryBuilder('user')
  //   .select('user.email as email ')
  //   .addSelect('user.password') 
  //   .where('user.email=:email',{email:emailverify})
  //   .getOne();
  // console.log(data,'data');
  
  //   if(data){
  //        console.log('dfdaaadadssa');
  //       let passwordCheck = await bcrypt.compare(
  //         login.password,
  //         data.password
  //       )         

  //       if (passwordCheck){
  //         console.log('sucess');
  //         return 'Login successful';
          
  //       }
  //       else {
  //         console.log('passwwronggg')
  //         return 'Password is incorrect. Login failed.';
  //       }
  //   }
  //   else{
  //     console.log('nope email')
  //     return 'Email not found. Login failed.';
  //   }
    
  // }

  async login(data) {
    try {
      let user = await this.userRepo.findOne({
        where: {
          email: data.email
        },
        loadRelationIds: true

      });
      console.log(user);
      
      if (user) {
        let passwordMatch = await bcrypt.compare(data.password, user.password);
  
        if (passwordMatch) {
          console.log('Login successful');
          let payload = {
            userName: user.Name, // Adjust to the actual property name in your user object
            roleId: user.roleId,
            email: user.email,
            userId: user.id
          };
          let accessToken = this.jwtService.sign(payload);
  
          return { message: 'Login successful', user: payload, accessToken };
        } else {
          console.log('Incorrect password');
          return { message: 'Password is incorrect. Login failed.' };
        }
      } else {
        console.log('Email not found');
        return { message: 'Email not found. Login failed.' };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return { message: 'Something went wrong. Login failed.' };
    }
  }


  async signup(data:CreateUserDto){
let emailcheck=data.email;
console.log(emailcheck)
const user=await this.userRepo
.createQueryBuilder('user')
.select('user.email')
.where('user.email=:email',{email:emailcheck})
.getOne()
console.log(user)
if(user){

  console.log("email is existed")
}
else{

  console.log('email is not exist');
    const obj=new EmailService();
    let otpdb=await obj.sendMail();
    data['otp']=otpdb;
    this.userRepo.save(data);
    console.log(otpdb)
}
 
  }


  async verify(data:VerifyDto){
    // console.log(data)
    const user=await this.userRepo
.createQueryBuilder('user')
.select('user.id')
.where('user.otp=:otp',{otp:data.otp})
.getOne();
// console.log(user.id)
// console.log(user)

if(user){
  console.log(user)
  user['isActive']=1;
  this.userRepo.save(user);
  return "User verified successfully"
}
else{
  console.log('wrong otp')
}
}

  

 


}




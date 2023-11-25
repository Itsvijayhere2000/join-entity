import { Injectable } from '@nestjs/common';
import { CreateTaskDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles, Tasks, User,status } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {

  constructor(@InjectRepository (User)
   private userRepo: Repository<User>,
   @InjectRepository(Tasks)
   private taskRepo: Repository<Tasks>,
   @InjectRepository(status)
   private statusrepo: Repository<status>,@InjectRepository(Roles)
   private rolerepo: Repository<Roles>){

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
  // async createrole(role:CreateRoleDto){}

  async createtask(task:CreateTaskDto):Promise<Tasks>{
    
    return this.taskRepo.save(task);
  }
//    async createstatus(status:CreateStatusDto):Promise<Status>{
//     return this.statusrepo.save(status)
//    }
 


  async getAllrole(){
    let data = await this.rolerepo
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

}


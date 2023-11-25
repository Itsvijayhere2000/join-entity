import { Injectable } from '@nestjs/common';
import { CreateRoleDto, CreateStatusDto, CreateTaskDto, CreateUserDto } from './dto/create-user.dto';
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
   @InjectRepository(Tasks)
   private statusrepo: Repository<status>,
   @InjectRepository(Roles)
   private roleRepo:Repository<Roles>){

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
 }

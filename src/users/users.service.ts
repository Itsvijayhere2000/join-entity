import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Tasks, User,status } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository (User)
   private userRepo: Repository<User>,
   @InjectRepository(Tasks)
   private taskRepo: Repository<Tasks>,
   @InjectRepository(Tasks)
   private statusrepo: Repository<status>){

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
  async getuser(){}
}

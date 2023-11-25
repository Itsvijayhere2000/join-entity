import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User,Roles,Tasks,status } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService,EmailService],
  imports: [
    TypeOrmModule.forFeature([
      User,
      Roles,
      Tasks,
      status
    ])
  ]
})
export class UsersModule {}

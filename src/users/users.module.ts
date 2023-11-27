import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User,Roles,Tasks,status } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from 'src/jwt-strategy/jwt-strategy.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService,EmailService,JwtStrategyService],
  imports: [
    TypeOrmModule.forFeature([
      User,
      Roles,
      Tasks,
      status
    ]),
    JwtModule.register({
      secret: 'g25f87b6-7a31-4921-ba27-231a935e1148',
      signOptions: {
        expiresIn: '5d',
      },
    }),
   
  ],
  
})
export class UsersModule {}

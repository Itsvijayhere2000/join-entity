import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import {TyprOrmMod}
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { EmailService } from './email/email.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      extra: {
        connectionLimit: process.env.POOL_SIZE
      },
      // synchronize: true,
      autoLoadEntities: true,
    }),

    MailerModule.forRoot({
      transport:{
        host: process.env.MAIL_HOST,
        // service:'gmail',
        port:465,
        secure: true,
        auth:{
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
        tls: {
          ciphers: 'SSLv3',
        },
      },
     
      // defaults: {
      //   from: '"No Reply" <noreply@example.com>',
      // },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}

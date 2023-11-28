// email.service.ts
 
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import { User } from 'src/users/entities/user.entity';
import { getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class EmailService {

  async sendMail() {
    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "af8e23bb9d3ad4",
          pass: "646c799c99d832"
        }
      });
      const templatePath = '/home/finstein-emp/Desktop/project/backend/join-entity/src/email/otp.hbs';
       // Load the Handlebars template
       const templateFile = fs.readFileSync(templatePath, 'utf8');
       const template = handlebars.compile(templateFile);

         // Generate a random 6-digit OTP (you may have your own logic for this)
  const otp: number = Math.floor(100000 + Math.random() * 900000);


  //save otp
    
    const mailOptions = {
      from: 'abdulvijay6@gmail.com',
      to: 'abdulvijay6@gmail.com',
      subject: 'Verification Code',
      html: template({ otp }), 
    };
 
    try {
      const info = await transporter.sendMail(mailOptions);
    
      console.log('Message sent: %s', info.messageId);
      return otp;
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
 

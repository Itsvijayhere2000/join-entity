import { Injectable } from '@nestjs/common';
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {

    constructor (private mailService : MailerService){

    }

    async sendMail(){
        await this.mailService.sendMail({
            to:'kamal',
            from:'kamal@gmail.com',
            subject:'test',
            
        })
    }
}

import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: 'g25f87b6-7a31-4921-ba27-231a935e1148',
          passReqToCallback: true,
        });
      }
      async validate(req: Request, payload: any) {
        try {
            console.log('rrqqq',payload);
            
          // console.log('session:',req.headers.sessionid,'besession:',req.session.id);
          
        //   if (req.headers.sessionid == req.session.id) {
            return payload;
          // }
          // throw new UnauthorizedException();
        } catch (err) {
          return false;
        }
      }
}

import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: true,
          secretOrKey: process.env.JWTSECRETKEY,
          passReqToCallback: true,
        });
      }
      async validate(req: Request, payload: any) {
        try {
            console.log('rrqqq',req);
            
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

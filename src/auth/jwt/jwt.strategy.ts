import {PassportStrategy} from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtPayloadInterface} from "./jwt-payload.interface";
import {UsersService} from "../../users/users.service";
require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.APP_SECRET
        });
    }

    async validate(payload: JwtPayloadInterface) {
        const user = await this.usersService.getUserByEmail(payload.email);
        if (!user) {
            throw new UnauthorizedException('Not authorized');
        }
        return user;
    }
}
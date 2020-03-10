import { Module } from '@nestjs/common';
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt/jwt.strategy";
import {UsersModule} from "../users/users.module";
require('dotenv').config();

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        JwtModule.register({
            secret: process.env.APP_SECRET,
            signOptions: {
                expiresIn: 3600
            }
        }),
        UsersModule
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy
    ],
    exports: [JwtStrategy, PassportModule]
})

export class AuthModule {}

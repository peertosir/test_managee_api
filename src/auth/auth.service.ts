import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {JwtPayloadInterface} from "./jwt/jwt-payload.interface";
import {AuthDto} from "./dto/auth.dto";
import {UsersService} from "../users/users.service";
import {CreateUserDto} from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService
        ) {}


    async signUp(createUserDto: CreateUserDto): Promise<void> {
        return this.usersService.createUser(createUserDto);
    }


    async signIn(authDto: AuthDto): Promise<{accessToken: string}> {
        const email: string = await this.validatePassword(authDto);

        if (!email) {
            throw new UnauthorizedException("Invalid credentials")
        }
        const payload: JwtPayloadInterface = {email};

        const accessToken = this.jwtService.sign(payload);

        return {accessToken};
    }

    async validatePassword(authDto:AuthDto): Promise<string> {
        const {email, password} = authDto;
        const user = await this.usersService.getUserByEmail(email);
        if (user && await user.validatePassword(password)) {
            return user.email;
        }
        return null;
    }

}

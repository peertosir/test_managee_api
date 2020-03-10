import {ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Patch, UseInterceptors} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import {UsersService} from "./users.service";

@Controller('api/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(
        private usersService: UsersService
        ){}

    @Get('/:id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getUserById(id);
    }

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Patch('/:id')
    updateUser() {
    }

    @Patch('/:id/ban')
    banUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.usersService.banUser(id);
    }

}

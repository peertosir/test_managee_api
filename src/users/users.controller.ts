import {
    Body,
    ClassSerializerInterceptor,
    Controller, ForbiddenException,
    Get,
    Param,
    ParseIntPipe,
    Patch, Req, UnauthorizedException, UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import {AuthGuard} from "@nestjs/passport";
import { User } from './user.entity';
import { Request } from 'express';
import { AdminGuard } from '../common/guards/admin.guard';

@Controller('api/users')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get('/:id')
    getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.getUserById(id);
    }

    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Patch('/:id')
    updateUser(
      @Param('id', ParseIntPipe) id: number,
      @Req() request: Request,
      @Body() updateUserDto: UpdateUserDto): Promise<User> {
        const user: any = request.user;
        if (user.id === id) {
            return this.usersService.updateUser(id, updateUserDto);
        } else {
            throw new ForbiddenException('You have no permission to edit another user')
        }
    }

    @Patch('/:id/ban')
    @UseGuards(AdminGuard)
    banUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.usersService.banUser(id);
    }

}

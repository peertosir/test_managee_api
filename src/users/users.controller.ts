import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller('api/users')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get('/:id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getUserById(id);
    }

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Patch('/:id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Patch('/:id/ban')
    banUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.usersService.banUser(id);
    }

}

import {Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import {CreateUserDto} from "./dto/create-user.dto";
import {User} from "./user.entity";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserRepository) private userRepository:UserRepository) {}

    async createUser(createUserDto: CreateUserDto) {
        return await this.userRepository.createUser(createUserDto);
    }

    async updateUser(id:number, updateUserDto: UpdateUserDto) {
        const user = await this.getUserById(id);
        const {email, firstName, lastName} = updateUserDto;
        if (email) {
            user.email = email;
        }
        if (firstName) {
            user.firstName = firstName;
        }
        if (lastName) {
            user.lastName = lastName;
        }

        await user.save();
        return user
    }

    async getUserByEmail(user_email: string) {
        const result = await this.userRepository.getUserByEmail(user_email);
        if (!result) {
            throw new NotFoundException('User not found')
        }
        return result;
    }

    async getUsersById(users: number[]) {
        return await this.userRepository.findByIds(users);
    }

    async getUserById(user_id: number): Promise<User> {
        const result = await this.userRepository.findOne({id: user_id});
        if (!result) {
            throw new NotFoundException(`User with ID ${user_id} was not found`);
        }
        return result;
    }

    async getUsers() {
        return this.userRepository.find();
    }

    async banUser(id: number) {
        const user = await this.getUserById(id);
        if (user.banned) {
            throw new UnprocessableEntityException("User already banned");
        }
        user.banned = true;
        await user.save();
    }
}

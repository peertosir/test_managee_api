import {EntityRepository, Repository} from "typeorm";
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {ConflictException, InternalServerErrorException} from "@nestjs/common";
import * as bcrypt from 'bcrypt';


@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(createUserDto: CreateUserDto): Promise<void> {
        const {email, password} = createUserDto;

        const user = new User();
        user.salt = await bcrypt.genSalt();
        user.email = email;
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
        } catch(error) {
            if(error.code === '23505') {
                throw new ConflictException("User with this email already exists")
            } else {
                throw new InternalServerErrorException("Something went really wrong");
            }
        }
    }


    async getUserByEmail(email: string) {
        return await this.findOne({email});
    }


    private async hashPassword(password:string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

}
import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
      TypeOrmModule.forRoot(),
      AuthModule,
      UsersModule,
      ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

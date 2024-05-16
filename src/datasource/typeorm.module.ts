import { DataSource } from "typeorm";
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
    ],
    providers: [
        {
            provide: DataSource,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                try {                    
                    console.log(configService.get<string>('DATABASE_HOST'));
                    const dataSource = new DataSource({
                        type: 'postgres',
                        host: configService.get<string>('DATABASE_HOST'),
                        port: 5432,
                        username: configService.get<string>('DATABASE_USERNAME'),
                        password: configService.get<string>('DATABASE_PASSWORD'),
                        database: configService.get<string>('DATABASE_DATABASE_NAME'),
                        synchronize: true,
                        entities: [`${__dirname}/../**/**.entity{.ts,.js}`]
                    });
                    await dataSource.initialize();
                    console.log('Database connected successfuly');
                    return dataSource;
                } catch (error) {
                    console.log('Error connecting to database');
                    throw error;
                }
            },
        },
    ],
    exports: [DataSource]
})
export class TypeOrmModule {}
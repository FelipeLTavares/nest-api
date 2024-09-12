import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/entities/*.{js,ts}'],
    migrations: ['dist/database/migrations/*{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
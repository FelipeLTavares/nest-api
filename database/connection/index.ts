import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'database',
    entities: ['dist/**/entities/*.{js,ts}'],
    migrations: ['dist/database/migrations/*{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
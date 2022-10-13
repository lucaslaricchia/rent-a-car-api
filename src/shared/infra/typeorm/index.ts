import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.NODE_ENV === 'test' ? 'localhost' : 'database',
  port: 5432,
  username: 'docker',
  password: '1234',
  database: process.env.NODE_ENV === 'test' ? 'rentx_test' : 'rentx',
  migrations: ["src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["src/modules/**/entities/*.ts"],
});

dataSource.initialize();
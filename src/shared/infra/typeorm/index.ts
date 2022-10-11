import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: 'docker',
  password: '1234',
  database: 'rentx',
  migrations: ["src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["src/modules/**/entities/*.ts"],
});

dataSource.initialize();
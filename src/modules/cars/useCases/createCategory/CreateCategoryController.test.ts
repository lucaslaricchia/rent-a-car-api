import request from 'supertest';
import { app } from '@shared/infra/http/app';
import { dataSource } from '@shared/infra/typeorm';
import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

describe('CreateCategoryController', () => {
  beforeAll(async () => {
    await dataSource.initialize();
    await dataSource.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);
    await dataSource.query(`
      INSERT INTO users(id, name, email, password, "isAdmin", driver_license, created_at)
      VALUES('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'XXXXXX', 'now()')
    `);
  })

  afterAll(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
  })

  test('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin'
    });

    const { token } = responseToken.body;

    const response = await request(app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest",
    }).set({
      Authorization: `Bearer ${token}`
    });

    expect(response.status).toBe(201);
  });

  test('should not be able to create a new category with name duplicated name', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin'
    });

    const { token } = responseToken.body;

    await request(app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest",
    }).set({
      Authorization: `Bearer ${token}`
    });

    const response = await request(app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest",
    }).set({
      Authorization: `Bearer ${token}`
    });


    expect(response.status).toBe(400);
  });
})
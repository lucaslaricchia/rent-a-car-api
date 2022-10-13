import request from 'supertest';
import { app } from '@shared/infra/http/app';
import { dataSource } from '@shared/infra/typeorm';
import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

describe('ListCategoriesController', () => {
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

  test('Should be able to list all categories', async () => {
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
    
    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category Supertest");
  });
})
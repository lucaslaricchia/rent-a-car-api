import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { dataSource } from "..";

async function create() {
  await dataSource.initialize()
  const id = uuidV4();
  const password = await hash("admin", 8);
  await dataSource.query(`
    INSERT INTO users(id, name, email, password, "isAdmin", driver_license, created_at)
    VALUES('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'XXXXXX', 'now()')
  `);

  await dataSource.destroy();
}

create().then(() => console.log("User admin created!"));
import { Client } from 'pg';

const client = new Client({
  host: 'db',
  port: 5432,
  user: 'node_gmp',
  password: '123456',
  database: 'node_gmp'
});

async function connect() {
  try {
      await client.connect();
      console.log('Connected to PostgreSQL database');
      await SQLscript()
      console.log('Script executed');
  } catch (error) {
      console.error('Error connecting to PostgreSQL database', error);
  }
}

async function SQLscript() {
  await client.query(`
   CREATE TABLE IF NOT EXISTS Employee (
    id serial PRIMARY KEY,
    name character varying NOT NULL,
    joinDate TIMESTAMP WITH TIME ZONE NOT NULL);`
  );
  await client.query(`
    CREATE TABLE IF NOT EXISTS Hardware (
      "Serial" character varying PRIMARY KEY,
      os character varying NOT NULL,
      year integer NOT NULL,
      ram integer NOT NULL,
      employeeId integer,
      CONSTRAINT fk_employee FOREIGN KEY(employeeId) REFERENCES Employee(id));`
  );
  await client.query(`
   INSERT INTO Employee (name, joinDate)
   VALUES
   ('John Wick', '2021-01-14'),
   ('Alex Green', '2019-04-14')`
  );
  await client.query(`
   INSERT INTO Hardware
   VALUES
   ('serialNum1', 'MAC',2019,18),
   ('serialNum2', 'Windows', 2019, 36)`
  );
  const employee = await client.query(
    `SELECT id from Employee where name = $1`,
    ['John Wick']
  );
 console.log(employee.rows);

 await client.query(
    `UPDATE Hardware SET employeeId = $1 where "Serial" = $2`,
    [employee.rows[0].id, 'serialNum1']
 );
}

export { connect }
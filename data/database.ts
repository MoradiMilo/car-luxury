// first import the modules
import { Database as Driver } from "sqlite3";
import { open, Database } from "sqlite";
// then create & open the connection
export const dbFileName = 'car_luxury.db';
export class DB {

    public static async createDBConnection(): Promise<Database> {
        const db = await open({
            filename: `./${dbFileName}`,
            driver: Driver
        });
        await DB.ensureTableCreated(db); // Fix: Change method call from 'ensureTablesCreated' to 'ensureTableCreated'
        return db;
    }
    private static async ensureTableCreated(connection: Database): Promise<void> {
        await connection.run(
            `create table if not exists User(
            email text NOT NULL PRIMARY KEY,
            fullName TEXT NOT NULL,
            role text default 'user',
            password Text not null
            ) strict`
        );

    }
}
// first import the modules
import { Database as Driver } from "sqlite3";
import { open, Database } from "sqlite";
// then create & open the connection
export const dbFileName = './car_luxury.db';
export class DB {

    public static async createDBConnection(): Promise<Database> {
        const db = await open({
            filename: `./${dbFileName}`,
            driver: Driver
        });
        await DB.ensureTablesCreated(db);
        return db;
    }
    private static async ensureTablesCreated(connection:Database):Promise<void>{
        await connection.run(
            `create table if not exists User(
            email TEXT NOT NULL PRIMARY KEY,
            fullName TEXT NOT NULL,
            role TEXT default 'user',
            password TEXT NOT NULL
            ) strict`
            );
    }
}
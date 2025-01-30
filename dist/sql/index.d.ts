import { DataSource } from 'typeorm';
type DbConnectionParams = {
    username: string;
    password: string;
    host: string;
    database: string;
    port: number | string;
};
export declare const createSqlConnection: ({ username, password, host, database, port, }: DbConnectionParams) => Promise<DataSource>;
export {};

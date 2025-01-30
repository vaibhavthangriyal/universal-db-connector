import { DataSource } from 'typeorm';
type MongoConnectionParams = {
    username: string;
    password: string;
    host: string;
    database: string;
    port: number | string;
};
export declare const createMongoConnection: ({ username, password, host, database, port, }: MongoConnectionParams) => Promise<DataSource>;
export {};

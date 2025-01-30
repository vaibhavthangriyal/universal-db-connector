import { DataSource, DataSourceOptions } from 'typeorm';

const defaultPgConfig: DataSourceOptions = {
    type       : 'postgres',
    synchronize: false,
    ssl        :  {
        rejectUnauthorized: false,
    },
    logging    : true,
};

type DbConnectionParams = {
    username: string;
    password: string;
    host    : string;
    database: string;
    port    : number | string;
};


export const createSqlConnection = async ({
    username,
    password,
    host,
    database,
    port,
}: DbConnectionParams) => {
    try {

        const numericPort = typeof port === 'string' ? parseInt(port, 10) : port;
        if (isNaN(numericPort) || numericPort <= 0 || numericPort > 65535) {
            throw new Error('Invalid port number.');
        }

        if (!username || !password || !host || !database) {
            throw new Error('Missing required database connection parameters.');
        };

        const AppDataSource = new DataSource({
            ...defaultPgConfig,
            username,
            password,
            host,
            database,
            port: numericPort,
        });
        await AppDataSource.initialize();
        console.log('Data Source has been initialized!');
        return AppDataSource;
    } catch (error) {
        console.error("Error during Data Source initialization", error)
        throw error;
    }
};

